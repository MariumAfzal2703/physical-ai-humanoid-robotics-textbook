---
id: 0032
title: Single command smoke check
stage: explainer
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: hn do
labels: ["smoke-test","backend","verification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/001-textbook-rag-platform/0032-single-command-smoke-check.explainer.prompt.md
tests:
 - one-command curl smoke sequence provided
---

## Prompt

hn do

## Response snapshot

Provided a single shell command that runs health, signup, signin, and chat checks sequentially and prints pass/fail markers.

## Outcome

- ✅ Impact: User gets one-command verification path for backend behavior.
- 🧪 Tests: Combined API smoke checks included in one command.
- 📁 Files: No production code changes required.
- 🔁 Next prompts: Share command output if any step fails.
- 🧠 Reflection: User asked for concise direct command; response optimized for that workflow.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): package this as reusable make target if user wants.
