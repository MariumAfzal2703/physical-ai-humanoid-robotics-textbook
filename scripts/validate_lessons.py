from __future__ import annotations

import re
import sys
from pathlib import Path

MODULE_GLOB = "docs/module-*/**/*.mdx"


def strip_fenced_blocks(text: str) -> str:
    return re.sub(r"```[\s\S]*?```", "", text)


def validate_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    prose_text = strip_fenced_blocks(text)
    prose_words = re.findall(r"[A-Za-z]{3,}", prose_text)

    issues: list[str] = []
    if len(prose_words) < 80:
        issues.append("missing substantial prose")
    if "```" not in text:
        issues.append("missing code block")
    if "```mermaid" not in text:
        issues.append("missing mermaid diagram")
    if not re.search(r"^##\s*(?:✅\s*)?Key Takeaways\b", text, flags=re.MULTILINE):
        issues.append("missing '## Key Takeaways' section")

    return issues


def main() -> int:
    files = sorted(Path(".").glob(MODULE_GLOB))
    if not files:
        print("No lesson files found under docs/module-*/")
        return 1

    failures: list[str] = []
    for file in files:
        issues = validate_file(file)
        if issues:
            failures.append(f"{file}: {', '.join(issues)}")

    if failures:
        print("Lesson quality validation failed:\n")
        for line in failures:
            print(f"- {line}")
        return 1

    print(f"Lesson quality validation passed for {len(files)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
