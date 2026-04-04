---
id: 0036
title: Fix Urdu translation and slash routes
stage: green
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Fix two issues in backend/rag.py ... and backend/main.py routes, then test, commit, push
labels: ["translation","routing","backend"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/rag.py
 - backend/main.py
tests:
 - python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
 - curl -X POST "http://127.0.0.1:8000/chapters/module-1-ros2/overview/translate-urdu" -H "Content-Type: application/json" -d '{}'
 - git push origin master
---

## Prompt

Fix two issues in backend/rag.py:

PROBLEM 1 — translate_chapter_urdu() is hallucinating (repeating "فیلڈ میں" endlessly):
- The chapter content being sent to Groq is too long
- Fix: only send first 3000 characters of chapter to Groq for translation
- Add clear prompt: "Translate the following robotics textbook excerpt to Urdu. Keep technical terms like ROS2, SLAM, LiDAR, Node, Topic, QoS in English. Translate only explanatory text. Do not repeat any phrase. Stop after translation is complete."
- Max tokens: 2000

PROBLEM 2 — chapter_id with slash not working in URL:
In backend/main.py, change both routes to accept path parameters:
- Change: @api_router.post("/chapters/{chapter_id}/translate-urdu")
- To: @api_router.post("/chapters/{chapter_id:path}/translate-urdu")
- Change: @api_router.post("/chapters/{chapter_id}/personalize")  
- To: @api_router.post("/chapters/{chapter_id:path}/personalize")

After fixing:
1. Restart uvicorn
2. Test: curl -X POST "http://127.0.0.1:8000/chapters/module-1-ros2/overview/translate-urdu" -H "Content-Type: application/json" -d '{}'
3. git add -A && git commit -m "fix: urdu translation quality and path parameter slash support" && git push origin master

## Response snapshot

Implemented translation guardrails in backend/rag.py by truncating excerpt to 3000 chars, using the exact anti-repetition prompt, and passing max_tokens=2000. Updated backend/main.py chapter routes to use {chapter_id:path}. Restarted server and tested slash-based translate endpoint successfully. Committed and pushed to master.

## Outcome

- ✅ Impact: Translation endpoint now handles long content more safely and slash chapter paths work in URLs.
- 🧪 Tests: Restart + translate endpoint curl passed.
- 📁 Files: backend/rag.py, backend/main.py.
- 🔁 Next prompts: Optional quality review of Urdu output tone/terminology.
- 🧠 Reflection: Path converter and bounded translation input directly address both failures.

## Evaluation notes (flywheel)

- Failure modes observed: long prompts caused repetitive Urdu output; non-path route params blocked slash IDs.
- Graders run and results (PASS/FAIL): Manual endpoint test PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add chunked translation for complete chapter coverage.
