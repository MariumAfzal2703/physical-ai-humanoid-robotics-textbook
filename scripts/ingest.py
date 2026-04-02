from __future__ import annotations

import hashlib
import os
from pathlib import Path

import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

from scripts.content_indexing import clean_mdx_text

DOCS_ROOT = Path("docs")
COLLECTION_NAME = "textbook"
CHUNK_SIZE = 800
CHUNK_OVERLAP = 100


def discover_mdx_files(root: Path = DOCS_ROOT) -> list[Path]:
    return sorted(path for path in root.rglob("*.mdx") if "node_modules" not in path.parts)


def parse_module_name(path: Path) -> str:
    for part in path.parts:
        if part.startswith("module-"):
            return part
    return "general"


def deterministic_id(source: str, chunk_index: int, text: str) -> str:
    payload = f"{source}:{chunk_index}:{text}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()[:32]


def chunk_by_tokens(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    tokens = text.split()
    if not tokens:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(tokens):
        end = min(len(tokens), start + chunk_size)
        chunks.append(" ".join(tokens[start:end]))
        if end == len(tokens):
            break
        start = max(0, end - overlap)
    return chunks


def build_chunks(path: Path) -> list[str]:
    raw = path.read_text(encoding="utf-8")
    cleaned = clean_mdx_text(raw)
    return [chunk for chunk in chunk_by_tokens(cleaned, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP) if chunk.strip()]


def ensure_collection(client: QdrantClient, vector_size: int) -> None:
    existing = {collection.name for collection in client.get_collections().collections}
    if COLLECTION_NAME in existing:
        return
    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
    )


def main() -> None:
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    if not qdrant_url or not gemini_key:
        raise RuntimeError("QDRANT_URL and GEMINI_API_KEY/GOOGLE_API_KEY are required")

    client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
    genai.configure(api_key=gemini_key)

    files = discover_mdx_files()
    total_chunks = 0
    created_collection = False

    for idx, file_path in enumerate(files, start=1):
      chunks = build_chunks(file_path)
      if not chunks:
          print(f"[{idx}/{len(files)}] {file_path}: skipped (no text chunks)")
          continue

      embeddings: list[list[float]] = []
      for chunk in chunks:
          vector_result = genai.embed_content(
              model="models/text-embedding-004",
              content=chunk,
              task_type="retrieval_document",
          )
          embeddings.append(vector_result["embedding"])


      if not created_collection and embeddings:
          ensure_collection(client, len(embeddings[0]))
          created_collection = True

      source = str(file_path).replace("\\", "/")
      module = parse_module_name(file_path)
      points: list[PointStruct] = []

      for chunk_index, (chunk, vector) in enumerate(zip(chunks, embeddings)):
          point_id = deterministic_id(source, chunk_index, chunk)
          points.append(
              PointStruct(
                  id=point_id,
                  vector=vector,
                  payload={
                      "text": chunk,
                      "source": source,
                      "module": module,
                  },
              )
          )

      client.upsert(collection_name=COLLECTION_NAME, points=points)
      total_chunks += len(points)
      print(f"[{idx}/{len(files)}] {file_path}: indexed {len(points)} chunks")

    print(f"Ingestion complete. Indexed chunks: {total_chunks}")


if __name__ == "__main__":
    main()
