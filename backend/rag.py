from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

from .settings import get_settings

DOCS_ROOT = Path("docs")
COLLECTION_NAME = "textbook"
EMBED_MODEL = "all-MiniLM-L6-v2"
GROQ_MODEL = "llama-3.1-8b-instant"

load_dotenv()


@lru_cache(maxsize=1)
def _embedding_model() -> SentenceTransformer:
    return SentenceTransformer(EMBED_MODEL)


@lru_cache(maxsize=1)
def _qdrant_client() -> QdrantClient:
    settings = get_settings()
    if not settings.qdrant_url:
        raise RuntimeError("QDRANT_URL is not configured")
    return QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key)


@lru_cache(maxsize=1)
def _groq_client() -> OpenAI:
    settings = get_settings()
    if not settings.groq_api_key:
        raise RuntimeError("GROQ_API_KEY is not configured")
    return OpenAI(api_key=settings.groq_api_key, base_url="https://api.groq.com/openai/v1")


def _resolve_chapter_path(chapter_id: str) -> Path:
    normalized = chapter_id.strip().strip("/")
    candidate = DOCS_ROOT / f"{normalized}.mdx"
    if candidate.exists():
        return candidate

    fallback = DOCS_ROOT / normalized
    if fallback.exists() and fallback.suffix == ".mdx":
        return fallback

    raise FileNotFoundError(f"Chapter not found: {chapter_id}")


def _load_chapter_content(chapter_id: str) -> str:
    path = _resolve_chapter_path(chapter_id)
    return path.read_text(encoding="utf-8")


def _search_top_chunks(question: str, top_k: int = 3) -> list[dict]:
    embedding = _embedding_model().encode(question, normalize_embeddings=True).tolist()

    response = _qdrant_client().query_points(
        collection_name=COLLECTION_NAME,
        query=embedding,
        limit=top_k,
        with_payload=True,
    )

    chunks: list[dict] = []
    for hit in response.points:
        payload = hit.payload or {}
        chunks.append(
            {
                "text": str(payload.get("text", "")),
                "source": str(payload.get("source", "unknown")),
            }
        )
    return chunks


def _chat_completion(system_prompt: str, user_prompt: str, max_tokens: int | None = None) -> str:
    response = _groq_client().chat.completions.create(
        model=GROQ_MODEL,
        temperature=0.2,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content.strip()


def generate_answer(question: str, context_text: str | None = None) -> tuple[str, list[str]]:
    if context_text and context_text.strip():
        system_prompt = (
            "You are a robotics tutor for a Physical AI textbook. "
            "Answer using only the selected user context and keep response technically precise."
        )
        answer = _chat_completion(system_prompt, f"Question: {question}\n\nSelected Context:\n{context_text.strip()}")
        return answer, ["selected-context"]

    chunks = _search_top_chunks(question, top_k=3)
    if not chunks:
        return "I could not find relevant textbook context for that question.", []

    context_block = "\n\n".join(
        f"Source: {chunk['source']}\nContent: {chunk['text']}" for chunk in chunks
    )

    system_prompt = (
        "You are a grounded robotics tutor. "
        "Answer only from retrieved textbook context. If unsure, clearly say what is missing."
    )
    user_prompt = f"Question: {question}\n\nRetrieved Context:\n{context_block}"
    answer = _chat_completion(system_prompt, user_prompt)

    sources = [chunk["source"] for chunk in chunks if chunk["source"]]
    return answer, sources


def translate_chapter_urdu(chapter_id: str) -> str:
    chapter_excerpt = _load_chapter_content(chapter_id)[:3000]

    system_prompt = (
        "Translate the following robotics textbook excerpt to Urdu. "
        "Keep technical terms like ROS2, SLAM, LiDAR, Node, Topic, QoS in English. "
        "Translate only explanatory text. Do not repeat any phrase. "
        "Stop after translation is complete."
    )
    user_prompt = f"Robotics textbook excerpt:\n\n{chapter_excerpt}"

    return _chat_completion(system_prompt, user_prompt, max_tokens=2000)


def personalize_chapter(
    chapter_id: str,
    software_background: str,
    hardware_background: str,
    focus: str | None = None,
) -> str:
    chapter = _load_chapter_content(chapter_id)

    focus_line = f"Preferred Focus: {focus}\n" if focus else ""

    system_prompt = (
        "You are a robotics curriculum personalization assistant. "
        "Rewrite the chapter for the learner profile while preserving technical correctness. "
        "Keep structure and code blocks, but tune explanation depth, analogies, and emphasis."
    )
    user_prompt = (
        "Learner Profile:\n"
        f"- Software background: {software_background}\n"
        f"- Hardware background: {hardware_background}\n"
        f"{focus_line}\n"
        "Rewrite this chapter for this learner:\n\n"
        f"{chapter}"
    )

    return _chat_completion(system_prompt, user_prompt)
