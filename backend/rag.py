from __future__ import annotations

from pathlib import Path


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
    intro = Path("docs/intro.mdx")
    if intro.exists():
        return ["docs/intro.mdx"]
    return []


def generate_answer(question: str, context_text: str | None = None) -> tuple[str, list[str]]:
    sources = _guess_sources(question)
    if context_text:
        answer = (
            "Using your selected context, here is a focused response: "
            f"{context_text[:220]} ..."
        )
    else:
        answer = f"Grounded textbook response for: {question}"

    return answer, sources
