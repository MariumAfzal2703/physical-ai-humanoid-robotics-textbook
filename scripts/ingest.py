from __future__ import annotations

import hashlib
import os
from pathlib import Path

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams
from sentence_transformers import SentenceTransformer

from scripts.content_indexing import clean_mdx_text

DOCS_ROOT = Path("docs")
COLLECTION_NAME = "textbook"
EMBED_MODEL = "all-MiniLM-L6-v2"
CHUNK_SIZE = 800
CHUNK_OVERLAP = 100


def discover_mdx_files(root: Path = DOCS_ROOT) -> list[Path]:
    return sorted(path for path in root.rglob("*.mdx") if "node_modules" not in path.parts)


def chunk_tokens(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    tokens = text.split()
    if not tokens:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(tokens):
        end = min(len(tokens), start + chunk_size)
        chunk = " ".join(tokens[start:end]).strip()
        if chunk:
            chunks.append(chunk)
        if end == len(tokens):
            break
        start = max(0, end - overlap)
    return chunks


def build_chunks(path: Path) -> list[str]:
    raw = path.read_text(encoding="utf-8")
    cleaned = clean_mdx_text(raw)
    return chunk_tokens(cleaned)


def deterministic_id(source: str, chunk_index: int, text: str) -> str:
    payload = f"{source}:{chunk_index}:{text}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()[:32]


def ensure_collection(client: QdrantClient, vector_size: int) -> None:
    existing_names = {c.name for c in client.get_collections().collections}
    if COLLECTION_NAME in existing_names:
        return

    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
    )


def main() -> None:
    load_dotenv()

    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")

    if not qdrant_url:
        raise RuntimeError("QDRANT_URL is required")

    files = discover_mdx_files()
    if not files:
        raise RuntimeError("No docs/**/*.mdx files found")

    embedder = SentenceTransformer(EMBED_MODEL)
    qdrant = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)

    total_chunks = 0
    collection_ready = False

    for idx, file_path in enumerate(files, start=1):
        chunks = build_chunks(file_path)
        if not chunks:
            print(f"[{idx}/{len(files)}] {file_path}: skipped (no chunks)")
            continue

        vectors = embedder.encode(chunks, normalize_embeddings=True).tolist()
        if not vectors:
            print(f"[{idx}/{len(files)}] {file_path}: skipped (no vectors)")
            continue

        if not collection_ready:
            ensure_collection(qdrant, len(vectors[0]))
            collection_ready = True

        source = str(file_path).replace("\\", "/")
        module = next((p for p in file_path.parts if p.startswith("module-")), "general")

        points: list[PointStruct] = []
        for chunk_index, (chunk, vector) in enumerate(zip(chunks, vectors)):
            points.append(
                PointStruct(
                    id=deterministic_id(source, chunk_index, chunk),
                    vector=vector,
                    payload={
                        "text": chunk,
                        "source": source,
                        "module": module,
                    },
                )
            )

        qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
        total_chunks += len(points)
        print(f"[{idx}/{len(files)}] {file_path}: indexed {len(points)} chunks")

    print(f"Ingestion complete. Indexed chunks: {total_chunks}")


if __name__ == "__main__":
    main()
