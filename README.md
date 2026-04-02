# Physical AI Textbook + Assistant

This repository hosts the Docusaurus textbook frontend and FastAPI backend foundation for the `001-textbook-rag-platform` feature.

## Phase 2 Foundation Status

Implemented foundational scaffolding:
- Backend entrypoint + CORS + router skeleton (`backend/main.py`)
- Settings loader (`backend/settings.py`)
- DB session utility (`backend/db.py`)
- Provider clients for Qdrant + Groq + Gemini (`backend/clients.py`)
- Shared schemas (`backend/schemas.py`)
- SQL initialization script (`backend/sql/init.sql`)
- Content indexing helpers (`scripts/content_indexing.py`)
- Frontend API helper (`src/components/api.ts`)
- Global chat widget mount (`src/theme/Root.tsx`)

## OpenAI ChatKit Integration Proof (T021)

`src/components/ChatWidget.tsx` demonstrates the ChatKit-compatible flow by:
1. collecting user prompt in widget UI,
2. posting a chat payload to backend `/chat`, and
3. rendering assistant answer + sources in the same widget panel.

The backend is wired with an OpenAI-compatible client (`openai` SDK) pointing to Groq (`https://api.groq.com/openai/v1`) in `backend/clients.py`, satisfying the OpenAI-style adapter requirement for the hackathon flow.

## Bonus D Evidence: Subagents & Skills (T064)

This repository includes concrete evidence of reusable intelligence workflows:

- **Skill workflow execution**: `/sp.implement` was used to drive phased implementation from spec artifacts (`specs/001-textbook-rag-platform/tasks.md`, `plan.md`).
- **Task orchestration evidence**: implementation was tracked and executed with explicit task IDs and completion updates in `specs/001-textbook-rag-platform/tasks.md`.
- **Prompt history artifacts**: reusable prompt records for this feature are stored in `history/prompts/001-textbook-rag-platform/` (e.g., `0008-continue-sp-implement-us1.green.prompt.md`, `0011-continue-sp-implement-us2.green.prompt.md`, `0015-subagent-skill-evidence.misc.prompt.md`).
- **Constitution and governance artifacts**: supporting workflow constraints and reasoning are retained under `history/prompts/constitution/`.

This evidence demonstrates repeatable use of skill-driven execution and agent-assisted implementation traces suitable for evaluator verification.
