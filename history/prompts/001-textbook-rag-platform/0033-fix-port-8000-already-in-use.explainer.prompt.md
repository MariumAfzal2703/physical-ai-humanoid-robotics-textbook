---
id: 0033
title: Fix port 8000 already in use
stage: explainer
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Uvicorn startup address already in use
labels: ["backend","error-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

## Prompt

mariumafzal2703@DESKTOP-2IAFE2K:~$  cd ~/PIAIC-Hackathons/Hackathon-1
  python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
...
ERROR:    [Errno 98] error while attempting to bind on address ('127.0.0.1', 8000): address already in use

## Response snapshot

Explained that port 8000 is already in use because the backend is likely running in another terminal, or I left it running. Provided `fuser -k 8000/tcp` command to kill the existing process so they can run it freshly.

## Outcome

- ✅ Impact: User can clear port 8000 and restart server cleanly.
- 🧪 Tests: n/a
- 📁 Files: n/a
- 🔁 Next prompts: Run server again and then the test command.
- 🧠 Reflection: Typical port conflict during iterative backend testing.
