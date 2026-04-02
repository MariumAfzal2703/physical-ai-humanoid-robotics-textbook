---
id: 0001
title: plan artifacts generated
stage: plan
date: 2026-04-02
surface: agent
model: sonnet
feature: 001-textbook-rag-platform
branch: 001-textbook-rag-platform
user: mariumafzal2703
command: /sp.plan
labels: ["plan","research","data-model","contracts","quickstart","agent-context"]
links:
  spec: /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/plan.md
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/research.md
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/data-model.md
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/quickstart.md
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/specs/001-textbook-rag-platform/contracts/openapi.yaml
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/CLAUDE.md
  - /home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1/history/prompts/001-textbook-rag-platform/0001-plan-artifacts-generated.plan.prompt.md
tests:
  - Ran .specify/scripts/bash/update-agent-context.sh claude (PASS)
  - Validated generated artifact files exist and are readable (PASS)
---

## Prompt

/sp.plan
Build "Master Physical AI & Humanoid Robotics" textbook. Execute phases in strict order. Do not skip ahead.

PHASE 1 — REPO & TOOLING SETUP
1. Scaffold Docusaurus v3 in repo root with TypeScript config
2. Delete all default placeholder docs content
3. Create monorepo structure: /docs, /src/components, /backend, /scripts
4. Create /backend/requirements.txt:
   - fastapi
   - uvicorn
   - openai (for Agents SDK with Groq base_url)
   - google-generativeai
   - qdrant-client
   - python-dotenv
   - pydantic
5. Create both .env.example files (frontend + backend)
6. Create render.yaml in repo root
7. Create vercel.json in repo root
8. Verify Docusaurus builds with `npm run build` before proceeding

PHASE 2 — BOOK CONTENT (largest phase)
For each of the 4 modules, in order:
  a. Decide chapter count and lesson count using curriculum knowledge + web search
  b. Create docs/module-X/ directory
  c. Write every lesson as a complete MDX file — full prose, Python code block, Mermaid diagram, key takeaways
  d. After each module is complete, verify it renders in Docusaurus dev server

Generate sidebars.ts automatically from the docs folder structure.
Generate docusaurus.config.ts with:
  - title: "Master Physical AI & Humanoid Robotics"
  - correct GitHub repo URL
  - Mermaid plugin enabled (@docusaurus/theme-mermaid)

Do NOT proceed to Phase 3 until all 4 modules have complete content.

PHASE 3 — FASTAPI BACKEND
1. Write backend/main.py:
   - FastAPI app with CORS middleware
   - Import rag.py
   - POST /chat endpoint with Pydantic models
   - GET /health endpoint
2. Write backend/rag.py:
   - Gemini embedding function (text-embedding-004)
   - Qdrant query function (collection: textbook, top_k=5)
   - Groq LLM call via OpenAI Agents SDK (base_url=https://api.groq.com/openai/v1)
   - Context assembly: if context_text provided, prepend to retrieved chunks
   - Return answer string + list of source filenames
3. Test locally: uvicorn backend.main:app --reload
4. Verify /health returns 200
5. Verify /chat returns a valid response (mock env vars if needed)

PHASE 4 — INGESTION SCRIPT
1. Write scripts/ingest.py
2. Walk docs/ directory, read all .mdx files
3. Strip MDX syntax (imports, JSX tags, Mermaid blocks) before chunking
4. Chunk: 800 tokens, 100 overlap
5. Embed with Gemini text-embedding-004
6. Upsert to Qdrant collection `textbook` with payload: text, source, module
7. Print per-file progress + final vector count
8. Add README section: "Running the ingestion script"

PHASE 5 — CHAT WIDGET (Frontend)
1. Write src/components/ChatWidget.tsx:
   - Fixed bottom-right floating button
   - Slide-up chat panel on click
   - Message list with user/assistant distinction
   - Text input + send (Enter key + button)
   - Calls NEXT_PUBLIC_BACKEND_URL + /chat
   - Loading state while waiting for response
   - Error state if backend unreachable
2. Write src/components/SelectionPopup.tsx:
   - Listens for mouseup events on document
   - If selection length > 10 chars, show small "Ask about this" button near selection
   - On click: open ChatWidget, set context_text = selected text, focus input
3. Register both components in src/theme/Root.tsx so they appear on every page
4. Test: open book, select text, verify popup appears, verify chat sends context_text to backend

PHASE 6 — DEPLOYMENT WIRING
1. vercel.json — set outputDirectory to "build", framework to "docusaurus"
2. render.yaml — web service pointing to backend/, start command with $PORT
3. Add NEXT_PUBLIC_BACKEND_URL to Vercel environment variables section in README
4. Add all backend env vars to Render environment variables section in README
5. Write complete README.md:
   - Project overview
   - Monorepo structure diagram
   - Local dev setup (frontend + backend)
   - How to run ingestion script
   - How to deploy to Vercel (frontend)
   - How to deploy to Render (backend)
   - Environment variables reference table

PHASE 7 — FINAL VERIFICATION CHECKLIST
Run through every item. Fix before marking done.
[ ] npm run build completes without errors
[ ] All 4 modules visible in sidebar
[ ] Every lesson has prose + code block + Mermaid diagram + key takeaways
[ ] Mermaid diagrams render (not shown as raw text)
[ ] /health endpoint returns 200
[ ] /chat endpoint returns answer + sources
[ ] ChatWidget appears on every page
[ ] Selected text triggers "Ask about this" popup
[ ] context_text is sent correctly when using selection feature
[ ] ingest.py runs without errors on docs/ folder
[ ] render.yaml is valid
[ ] vercel.json is valid
[ ] README covers all setup steps
[ ] No hardcoded API keys anywhere
[ ] No placeholder/stub content in any lesson

## Response snapshot

Completed /sp.plan artifact generation for feature `001-textbook-rag-platform`:
- Filled implementation plan with technical context and constitution gates.
- Generated `research.md`, `data-model.md`, `quickstart.md`, and `contracts/openapi.yaml`.
- Ran and validated `.specify/scripts/bash/update-agent-context.sh claude` successfully.
- Confirmed generated artifact files exist and are readable.

## Outcome

- ✅ Impact: Planning package is ready for `/sp.tasks` with resolved technical context and explicit API/data contracts.
- 🧪 Tests: Artifact validation and agent-context update command passed.
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, contracts/openapi.yaml, CLAUDE.md.
- 🔁 Next prompts: Run `/sp.tasks` to generate dependency-ordered implementation tasks.
- 🧠 Reflection: Capturing contracts and data model at plan stage reduces ambiguity before coding.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): manual PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add endpoint-level acceptance tests immediately after task generation.
