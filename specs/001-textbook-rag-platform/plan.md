# Implementation Plan: Physical AI Textbook and Assistant

**Branch**: `001-textbook-rag-platform` | **Date**: 2026-04-02 | **Spec**: `/specs/001-textbook-rag-platform/spec.md`
**Input**: Feature specification from `/specs/001-textbook-rag-platform/spec.md`

## Summary

Deliver a full Physical AI & Humanoid Robotics textbook with an embedded RAG assistant, selected-text question flow, one-time ingestion pipeline, deployment-ready frontend/backend architecture, and confirmed bonus capabilities (Urdu translation, auth + learner profile capture, chapter personalization, and intelligence workflow evidence). The system uses Docusaurus for static textbook delivery and a FastAPI backend for retrieval, generation, persistence, and chapter transformations. The chat experience is aligned with OpenAI Agents/ChatKit-style embedded interaction requirements from the hackathon brief.

## Delivery Phases

1. Define scoring milestones: base deliverables (100 points) and bonus tracks (Subagents/Skills, BetterAuth signup/signin with background capture, chapter personalization, Urdu translation) as independently verifiable checkpoints.
2. Execute core platform path first (book + embedded RAG + selected-text + ingestion + deployment).
3. Execute bonus tracks in constitution sequence with explicit evidence collection for evaluation.
4. Run final submission readiness gates before delivery handoff.


## Technical Context

**Language/Version**: Python 3.11+ (backend/scripts), TypeScript/React (Docusaurus frontend integration)
**Primary Dependencies**: Docusaurus v3, FastAPI, Pydantic, OpenAI Agents/ChatKit-compatible integration pattern (Groq endpoint for model calls), google-generativeai, qdrant-client, BetterAuth, PostgreSQL driver/ORM for Neon
**Storage**: Qdrant Cloud (`textbook` collection) + Neon Postgres (chat history, learner profiles)
**Testing**: pytest (backend), API contract validation, manual end-to-end checks for widget/selection/ingestion/deployment wiring
**Target Platform**: Vercel (frontend static hosting, primary) or GitHub Pages-compatible static export path + Render (FastAPI service) + local development on Linux/WSL
**Project Type**: Web application (frontend + backend + scripts + docs content)
**Performance Goals**: Chat response usable for interactive reading flow; 90%+ sampled response grounding with citations; ingestion completes all eligible lesson files with non-zero indexed count
**Constraints**: Static frontend export, one-time manual ingestion (no auto-ingestion on deploy), strict source-citation visibility in chat, required support for selected-text priority, required signup/profile/personalization/Urdu workflows, no hardcoded secrets, published deployment must expose textbook + chatbot + implemented components in one evaluable URL

**Submission Readiness Gate**: Final package must include (1) public repo URL, (2) published deployment URL (GitHub Pages or Vercel), (3) demo video URL capped at 90 seconds, and (4) WhatsApp contact number for invite workflow.
**Scale/Scope**: Full multi-module textbook curriculum with lesson-level quality gates and deployment/submission artifacts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Monorepo Integrity**: PASS — all planned artifacts stay in the single repository.
- **II. Frontend Static Docusaurus**: PASS — plan targets Docusaurus v3 static output.
- **III. Backend FastAPI Single Service**: PASS — plan keeps a single FastAPI service.
- **IV. LLM & Embedding Stack**: PASS — Groq + Gemini + Qdrant + Neon included exactly as mandated.
- **V. Language Discipline**: PASS — backend/scripts in Python with typed contracts.
- **VI. One-Time Ingestion**: PASS — ingestion is explicit operator CLI flow.
- **VII. Mermaid in MDX**: PASS — diagrams remain Mermaid-based in lesson files.
- **VIII. Hard Exclusions**: PASS — no conflicting relational DB/auth stack planned.
- **IX. Bonus Roadmap Active**: PASS — spec requirements include all active bonus tracks.

**Post-design re-check**: PASS — data model, contracts, and quickstart remain consistent with all constitution gates.

## Project Structure

### Documentation (this feature)

```text
specs/001-textbook-rag-platform/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md                # produced by /sp.tasks
```

### Source Code (repository root)

```text
backend/
├── main.py
├── rag.py
├── requirements.txt
└── ...

scripts/
└── ingest.py

src/
├── components/
│   ├── ChatWidget.tsx
│   └── SelectionPopup.tsx
└── theme/
    └── Root.tsx

docs/
└── module-*/**/*.mdx

specs/
└── 001-textbook-rag-platform/

history/
└── prompts/
```

**Structure Decision**: Use a web-application split with Docusaurus-based frontend content/UI, FastAPI backend APIs, and dedicated scripts for one-time ingestion.

## Complexity Tracking

No constitution violations requiring exception tracking.