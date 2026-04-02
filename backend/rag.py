from __future__ import annotations

from pathlib import Path


DOCS_ROOT = Path("docs")


def _guess_sources(question: str) -> list[str]:
    q = question.lower()
    if "ros" in q:
        return ["docs/module-1-ros2/overview.mdx"]
    if "simulation" in q:
        return ["docs/module-2-simulation/overview.mdx"]
    if "isaac" in q:
        return ["docs/module-3-isaac/overview.mdx"]
    if "vla" in q or "vision" in q:
        return ["docs/module-4-vla/overview.mdx"]
    intro = DOCS_ROOT / "intro.mdx"
    if intro.exists():
        return ["docs/intro.mdx"]
    return []


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


def translate_chapter_urdu(chapter_id: str) -> str:
    chapter = _load_chapter_content(chapter_id)
    excerpt = chapter[:2200]
    return (
        "اردو ترجمہ (نمونہ)\n"
        "یہ اس باب کا اردو خلاصہ ہے تاکہ سیکھنے والا بنیادی خیال تیزی سے سمجھ سکے۔\n\n"
        f"{excerpt}"
    )


def generate_answer(question: str, context_text: str | None = None) -> tuple[str, list[str]]:
    if context_text and context_text.strip():
        selected = context_text.strip()
        answer = (
            "Focused on your selected passage, here is the explanation: "
            f"{selected[:400]}"
        )
        return answer, ["selected-context"]

    sources = _guess_sources(question)
    answer = f"Grounded textbook response for: {question}"
    return answer, sources
