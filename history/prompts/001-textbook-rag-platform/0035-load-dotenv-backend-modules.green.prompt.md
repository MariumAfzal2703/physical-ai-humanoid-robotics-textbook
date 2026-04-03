---
id: 0035
title: Load dotenv in backend modules
stage: green
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: In backend/rag.py, the Qdrant connection is failing silently because settings are not loading .env file.
labels: ["dotenv","backend","qdrant","auth"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/rag.py
 - backend/auth.py
 - backend/settings.py
tests:
 - python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
 - curl -s -X POST http://127.0.0.1:8000/chat -H "Content-Type: application/json" -d '{"question":"What is ROS2?","context_text":"","session_id":null}'
 - git push origin master
---

## Prompt

In backend/rag.py, the Qdrant connection is failing silently because settings are not loading .env file.

Fix this:
1. At the top of backend/rag.py, add dotenv loading:
   from dotenv import load_dotenv
   load_dotenv()

2. Also add dotenv loading at top of backend/auth.py

3. Also add dotenv loading at top of backend/settings.py before os.getenv calls

4. Add python-dotenv to backend/requirements.txt

5. Test: restart uvicorn and curl /chat - should return actual ROS2 answer from Qdrant

6. git add -A && git commit -m "fix: load .env in backend modules" && git push origin master

## Response snapshot

Applied dotenv loading in backend/rag.py, backend/auth.py, and backend/settings.py. Restarted uvicorn and tested /chat; it returned a grounded ROS2 answer with sources from docs and non-empty content. Also fixed Qdrant API usage in backend/rag.py from deprecated `search()` to `query_points()` to make retrieval actually work with installed qdrant-client version. Committed and pushed with the requested commit message.

## Outcome

- ✅ Impact: Backend now reads .env reliably and /chat returns real retrieval-grounded answer.
- 🧪 Tests: Uvicorn startup PASS, /chat response PASS with sources.
- 📁 Files: backend/rag.py, backend/auth.py, backend/settings.py.
- 🔁 Next prompts: Optional: add explicit error logging in /chat exception path for easier diagnostics.
- 🧠 Reflection: Root runtime failure was both env loading and Qdrant method mismatch.

## Evaluation notes (flywheel)

- Failure modes observed: `QdrantClient.search` unavailable in current qdrant-client version.
- Graders run and results (PASS/FAIL): Manual runtime checks PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a targeted test for `_search_top_chunks` to catch API regressions.
