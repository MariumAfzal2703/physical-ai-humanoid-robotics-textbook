---
id: 001
title: Initial Project Constitution
stage: constitution
date: 2026-04-02
surface: agent
model: claude-opus-4-5
feature: none
branch: master
user: mariumafzal2703
command: /sp.constitution
labels: ["constitution","monorepo","docusaurus","fastapi","qdrant","groq","gemini","rag"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/001-initial-project-constitution.constitution.prompt.md
tests:
  - none
---

## Prompt

You are building "Master Physical AI & Humanoid Robotics" — a full Docusaurus v3 textbook deployed on Vercel, with an embedded RAG chatbot backend deployed on Render.

ABSOLUTE RULES (never violate these):
1. Monorepo: everything lives in GitHub repo `MariumAfzal2703/master-physical-ai-&-robotics-textbook`
2. Frontend: Docusaurus v3, deployed to Vercel, no SSR — static export only
3. Backend: FastAPI on Render free tier — single service, no Docker unless Render requires it
4. LLM: Groq API, model `llama-3.3-70b-versatile`, called via OpenAI Agents SDK (base_url=groq endpoint, api_key=GROQ_API_KEY)
5. Embeddings: Google Gemini `text-embedding-004` via `google-generativeai` Python SDK — never use OpenAI embeddings
6. Vector DB: Qdrant Cloud free tier — ONE collection named `textbook` for the entire book
7. Language: Python only for all backend/scripts — no TypeScript in backend, no C++
8. Diagrams: Mermaid only — embedded in MDX files, no image files for diagrams
9. Book content: Claude Code generates all chapter/lesson content using its own knowledge + web search — no placeholder Lorem Ipsum ever
10. RAG ingestion: one-time CLI script `scripts/ingest.py` — never auto-ingest on deploy
11. Neon DB: excluded entirely from this project
12. Auth/personalization/Urdu translation: out of scope — do not scaffold, do not mention
13. Styling: match Docusaurus default theme exactly — no custom color overrides
14. No bonus features: no subagents, no agent skills, no BetterAuth

ENVIRONMENT VARIABLES (never hardcode):
- GROQ_API_KEY
- GEMINI_API_KEY
- QDRANT_URL
- QDRANT_API_KEY

MONOREPO STRUCTURE (enforce strictly):
master-physical-ai-&-robotics-textbook/
├── docs/                  ← Docusaurus content (MDX)
├── src/                   ← Docusaurus custom components
├── static/
├── docusaurus.config.ts
├── sidebars.ts
├── backend/
│   ├── main.py            ← FastAPI app
│   ├── rag.py             ← RAG pipeline
│   ├── requirements.txt
│   └── .env.example
├── scripts/
│   └── ingest.py          ← one-time CLI ingestion script
├── package.json
└── .env.example

QUALITY STANDARDS:
- Every lesson must have: concept explanation, at least one Python/ROS 2 code example, at least one Mermaid diagram
- No stub content — if Claude Code writes a file, it must be complete
- FastAPI endpoints must have Pydantic request/response models
- All Python code must have type hints

## Response snapshot

Constitution v1.0.0 ratified at `.specify/memory/constitution.md` with 8 core principles:

I.   Monorepo Integrity — single repo, all PRs against it
II.  Frontend — Static Docusaurus v3 only; no SSR; default theme; Vercel
III. Backend — Single FastAPI service; no Docker unless required; Render; Pydantic models mandatory
IV.  LLM & Embedding Stack — Groq llama-3.3-70b-versatile via OpenAI Agents SDK; Gemini text-embedding-004 via google-generativeai; Qdrant Cloud one collection `textbook`; env vars never hardcoded
V.   Language Discipline — Python + type hints for backend/scripts; TypeScript in frontend config only; no C++
VI.  RAG Ingestion — One-time CLI `scripts/ingest.py` only; no auto-ingest; idempotent
VII. Diagrams — Mermaid in MDX only; no binary image files
VIII.Out-of-Scope Hard Exclusions — Neon DB, auth, personalisation, Urdu i18n, BetterAuth, subagents, custom theme overrides

Additional sections added: Technology Stack Constraints (reference table) and Content & Quality Standards (lesson checklist).

## Outcome

- ✅ Impact: Project constitution established; all 14 absolute rules encoded as enforceable, testable principles; template placeholders fully replaced; version 1.0.0 ratified.
- 🧪 Tests: No automated tests applicable for constitution; compliance reviewed manually via PR checklist.
- 📁 Files: .specify/memory/constitution.md (written), history/prompts/constitution/001-initial-project-constitution.constitution.prompt.md (this file)
- 🔁 Next prompts: Run /sp.specify to create feature spec; Run /sp.plan to generate implementation plan; Run /sp.tasks to generate task list.
- 🧠 Reflection: All 14 absolute rules mapped cleanly to 8 principle sections plus two supporting sections. No placeholders deferred except ratification date (set to today as first adoption).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): manual review PASS — no bracket tokens remaining, version line matches report, dates ISO format, principles use MUST/MUST NOT language
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): consider splitting Principle IV into separate LLM and Vector DB principles if the constitution grows to require finer-grained compliance checks
