from pathlib import Path
from typing import Iterable


def iter_lesson_files(root: str = "docs") -> Iterable[Path]:
    docs_root = Path(root)
    return sorted(docs_root.rglob("*.mdx"))


def clean_mdx_text(raw_text: str) -> str:
    lines = [line for line in raw_text.splitlines() if not line.strip().startswith("import ")]
    return "\n".join(lines).strip()


def chunk_text(text: str, chunk_size: int = 3200, overlap: int = 400) -> list[str]:
    if not text:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + chunk_size)
        chunks.append(text[start:end])
        if end == len(text):
            break
        start = max(0, end - overlap)
    return chunks
