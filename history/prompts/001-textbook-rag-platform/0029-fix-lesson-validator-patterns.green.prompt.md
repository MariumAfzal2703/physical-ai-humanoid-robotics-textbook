---
id: 0029
title: Fix Lesson Validator Patterns
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Update scripts/validate_lessons.py to match current docs and headings
labels: ["validator", "docs", "docusaurus", "quality-check"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/validate_lessons.py
tests:
 - npm run validate:lessons (FAIL: missing mermaid in 8 chapters)
---

## Prompt

yes

## Response snapshot

Updated lesson validator to match current docs folder naming and heading style. Changed glob from `docs/module-*/**/*.mdx` to `docs/Module-*/**/*.mdx`, and relaxed Key Takeaways heading detection to accept both `## Key Takeaways` and `## ✅ Key Takeaways`. Re-ran validation to confirm remaining failures are now only genuine missing mermaid diagrams in specific chapter files.

## Outcome

- ✅ Impact: Validator now targets the correct chapter path pattern and heading style.
- 🧪 Tests: Validator rerun; now reports only missing mermaid diagrams.
- 📁 Files: 1 script updated.
- 🔁 Next prompts: Add mermaid diagrams to flagged chapters or relax diagram requirement.
- 🧠 Reflection: Validation rules should track actual content conventions to avoid false negatives.

## Evaluation notes (flywheel)

- Failure modes observed: Original validator produced false failures from path and heading mismatch.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): lesson-validator-alignment-v1
- Next experiment (smallest change to try): Parameterize validator rules per chapter type (strict vs minimal mode).
