---
id: 0034
title: Fix python indentation error on terminal copy paste
stage: explainer
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: IndentationError: unexpected indent
labels: ["testing","error-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - test_backend.py
tests: []
---

## Prompt

File "<string>", line 2
    e=f'test_{int(time.time())}@example.com'; p='Pass1234!'; print('health:',requests.get(f'{b}/health',t
IndentationError: unexpected indent

## Response snapshot

The inline Python command failed because of terminal line-wrapping adding spaces/indentation when pasted. Created a `test_backend.py` file directly in the repo so the user can just run `python3 test_backend.py` without copy-pasting code into the terminal.

## Outcome

- ✅ Impact: Avoids all copy-paste format errors.
- 🧪 Tests: Script executes identical logic in a robust way.
- 📁 Files: test_backend.py created.
- 🔁 Next prompts: Output of the test script.
- 🧠 Reflection: Multi-line strings in CLI are brittle; always provide a script file if it exceeds a few words.
