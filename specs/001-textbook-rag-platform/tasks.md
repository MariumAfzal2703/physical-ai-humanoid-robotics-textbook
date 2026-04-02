# Tasks: Physical AI Textbook and Assistant

**Input**: Design documents from `/specs/001-textbook-rag-platform/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include targeted integration/contract tests for critical API and user flows because the spec defines explicit independent test criteria.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3, US4)
- Every task includes explicit file path(s)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project structure, core tooling, and deployment config.

- [ ] T001 Scaffold Docusaurus v3 app at repository root with TypeScript config in `docusaurus.config.ts` and `package.json`
- [ ] T002 Create monorepo directories `docs/`, `src/components/`, `src/theme/`, `backend/`, and `scripts/`
- [ ] T003 [P] Create backend dependency manifest in `backend/requirements.txt`
- [ ] T004 [P] Create frontend env template in `.env.example`
- [ ] T005 [P] Create backend env template in `backend/.env.example`
- [ ] T006 [P] Create Render service config in `render.yaml`
- [ ] T007 [P] Create Vercel static build config in `vercel.json`
- [ ] T008 Remove default placeholder docs/pages from `docs/` and `src/pages/` and keep only feature-relevant content
- [ ] T009 Validate static build with `npm run build` from repository root and fix config issues in `docusaurus.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared backend/frontend infrastructure required before user stories.

**⚠️ CRITICAL**: Complete this phase before any user story implementation.

- [ ] T010 Create backend app entrypoint skeleton and router registration in `backend/main.py`
- [ ] T011 [P] Configure CORS middleware for localhost + deployed frontend origin in `backend/main.py`
- [ ] T012 [P] Create backend settings loader for required env vars in `backend/settings.py`
- [ ] T013 [P] Create Neon database connection + session utilities in `backend/db.py`
- [ ] T014 [P] Create Qdrant + Gemini + Groq client setup helpers in `backend/clients.py`
- [ ] T015 Create shared Pydantic schemas for chat/auth/chapter actions in `backend/schemas.py`
- [ ] T016 [P] Create SQL schema/migration script for `users`, `chat_sessions`, `chat_messages`, and transformation logs in `backend/sql/init.sql`
- [ ] T017 [P] Create reusable textbook content indexing helper module in `scripts/content_indexing.py`
- [ ] T018 Create global frontend API helper for backend requests in `src/components/api.ts`
- [ ] T019 Create global chat widget mount point in `src/theme/Root.tsx`

**Checkpoint**: Foundation ready; user stories can proceed.

---

## Phase 3: User Story 1 - Study Complete Robotics Curriculum (Priority: P1) 🎯 MVP

**Goal**: Publish complete multi-module textbook lessons with required quality elements.

**Independent Test**: Open built site and confirm all modules/lessons include prose + executable code + Mermaid diagram + key takeaways.

### Tests for User Story 1

- [ ] T020 [P] [US1] Add content quality validator script for prose/code/mermaid/takeaways checks in `scripts/validate_lessons.py`
- [ ] T021 [US1] Add content validation command wiring in `package.json` scripts section

### Implementation for User Story 1

- [ ] T022 [P] [US1] Create Module 1 lesson files in `docs/module-1-ros2/`
- [ ] T023 [P] [US1] Create Module 2 lesson files in `docs/module-2-simulation/`
- [ ] T024 [P] [US1] Create Module 3 lesson files in `docs/module-3-isaac/`
- [ ] T025 [P] [US1] Create Module 4 lesson files in `docs/module-4-vla/`
- [ ] T026 [US1] Add capstone lesson covering voice command + planning + navigation + perception + manipulation in `docs/module-4-vla/capstone-autonomous-humanoid.mdx`
- [ ] T027 [US1] Configure Mermaid support and markdown pipeline in `docusaurus.config.ts`
- [ ] T028 [US1] Generate structured sidebar entries for all modules/lessons in `sidebars.ts`
- [ ] T029 [US1] Run lesson quality validator and fix all failing lessons in `docs/module-*/**/*.mdx`

**Checkpoint**: User Story 1 is complete and independently demoable.

---

## Phase 4: User Story 2 - Ask Questions from Any Page (Priority: P1)

**Goal**: Provide floating chatbot across pages with grounded answers, visible sources, and in-session history.

**Independent Test**: Open any lesson page, ask question, receive answer + source file list; prior messages remain visible.

### Tests for User Story 2

- [ ] T030 [P] [US2] Add contract tests for `/health` and `/chat` endpoints in `tests/contract/test_chat_api.py`
- [ ] T031 [P] [US2] Add integration test for chat history persistence in `tests/integration/test_chat_session_history.py`

### Implementation for User Story 2

- [ ] T032 [US2] Implement `/health` endpoint response model and handler in `backend/main.py`
- [ ] T033 [US2] Implement chat retrieval/generation pipeline in `backend/rag.py`
- [ ] T034 [US2] Implement `/chat` endpoint with request/response schemas and fallback behavior in `backend/main.py`
- [ ] T035 [US2] Implement chat session/message persistence with Neon writes/reads in `backend/chat_store.py`
- [ ] T036 [US2] Integrate session persistence into `/chat` flow in `backend/main.py`
- [ ] T037 [US2] Build floating widget UI (toggle, message list, input, loading/error states) in `src/components/ChatWidget.tsx`
- [ ] T038 [US2] Connect chat widget to backend `/chat` and render visible source filename list in `src/components/ChatWidget.tsx`
- [ ] T039 [US2] Ensure chat widget mounts globally on all pages through `src/theme/Root.tsx`

**Checkpoint**: User Story 2 works independently on any page.

---

## Phase 5: User Story 3 - Ask About Selected Text (Priority: P1)

**Goal**: Allow selected-text question flow that prioritizes highlighted context.

**Independent Test**: Select passage, click “Ask about this,” send question, and receive answer focused on selected text.

### Tests for User Story 3

- [ ] T040 [P] [US3] Add frontend interaction test for selection popup and prefill behavior in `tests/integration/test_selection_popup_flow.ts`
- [ ] T041 [P] [US3] Add backend integration test for selected-context priority behavior in `tests/integration/test_context_priority.py`

### Implementation for User Story 3

- [ ] T042 [US3] Create text-selection popup component with anchor positioning in `src/components/SelectionPopup.tsx`
- [ ] T043 [US3] Wire selection popup click action to open chat and prefill context template in `src/components/SelectionPopup.tsx`
- [ ] T044 [US3] Integrate popup and widget communication state in `src/theme/Root.tsx`
- [ ] T045 [US3] Update chat widget request payload to include optional `context_text` in `src/components/ChatWidget.tsx`
- [ ] T046 [US3] Update RAG context assembly to prioritize selected context over retrieved chunks in `backend/rag.py`
- [ ] T047 [US3] Enforce long-selection truncation/normalization guard before backend call in `src/components/SelectionPopup.tsx`

**Checkpoint**: User Story 3 is independently functional with context-priority responses.

---

## Phase 6: User Story 4 - Maintain Searchable Knowledge Base (Priority: P2)

**Goal**: Provide one-time ingestion that indexes all lessons with source/module metadata and progress reporting.

**Independent Test**: Run ingestion once and verify per-file progress plus non-zero indexed chunk count in `textbook` collection.

### Tests for User Story 4

- [ ] T048 [P] [US4] Add ingestion parser/chunker unit tests in `tests/unit/test_ingest_chunking.py`
- [ ] T049 [P] [US4] Add ingestion integration test with mocked embedding/vector services in `tests/integration/test_ingest_pipeline.py`

### Implementation for User Story 4

- [ ] T050 [US4] Implement MDX discovery and cleanup (strip imports/JSX/Mermaid) in `scripts/ingest.py`
- [ ] T051 [US4] Implement chunking logic (800 tokens, 100 overlap) in `scripts/ingest.py`
- [ ] T052 [US4] Implement embedding + Qdrant upsert with payload `{text, source, module}` in `scripts/ingest.py`
- [ ] T053 [US4] Add idempotent upsert strategy using deterministic IDs in `scripts/ingest.py`
- [ ] T054 [US4] Add per-file progress logging and final indexed count output in `scripts/ingest.py`
- [ ] T055 [US4] Document one-time ingestion runbook in `README.md`

**Checkpoint**: User Story 4 ingestion process is reliable and independently testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete mandatory bonus deliverables, deployment readiness, and submission packaging.

- [ ] T056 [P] Implement signup/signin endpoints and profile capture flow in `backend/main.py` and `backend/auth.py`
- [ ] T057 [P] Implement frontend auth screens/forms with software/hardware background capture in `src/components/AuthPanel.tsx`
- [ ] T058 Implement chapter personalization endpoint and frontend trigger button in `backend/main.py` and `src/components/ChapterActions.tsx`
- [ ] T059 Implement Urdu translation endpoint and frontend trigger button in `backend/main.py` and `src/components/ChapterActions.tsx`
- [ ] T060 Add reusable subagent/skill evidence documentation in `history/prompts/` and `README.md`
- [ ] T061 Add deployment instructions for Vercel + Render + env vars in `README.md`
- [ ] T062 Validate submission package checklist (repo URL, live URL, <=90s demo link, WhatsApp number) in `README.md`
- [ ] T063 Run full verification from quickstart and record outcomes in `specs/001-textbook-rag-platform/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all stories.
- **Phase 3 (US1)**: Depends on Phase 2; serves as MVP.
- **Phase 4 (US2)**: Depends on Phase 2; can proceed after or in parallel with late US1 content fixes.
- **Phase 5 (US3)**: Depends on US2 chat baseline + Phase 2.
- **Phase 6 (US4)**: Depends on US1 lesson corpus + Phase 2.
- **Phase 7 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: No story dependency after foundational.
- **US2 (P1)**: No story dependency after foundational.
- **US3 (P1)**: Depends on US2 widget and chat API.
- **US4 (P2)**: Depends on US1 lessons for ingestible content.

### Within Each User Story

- Test tasks first.
- Data/model and pipeline components before endpoint/UI wiring.
- Endpoint/service completion before final integration checks.

### Parallel Opportunities

- Setup tasks T003–T007 can run in parallel.
- Foundational tasks T012–T018 can run in parallel once T010/T011 are done.
- US1 module content tasks T022–T025 can run in parallel.
- US2 test tasks T030/T031 parallelize.
- US3 test tasks T040/T041 parallelize.
- US4 test tasks T048/T049 parallelize.
- Polish tasks T056/T057 can run in parallel before integration tasks T058/T059.

---

## Parallel Example: User Story 1

```bash
# Create module lesson sets in parallel:
Task: "T022 [US1] Create Module 1 lesson files in docs/module-1-ros2/"
Task: "T023 [US1] Create Module 2 lesson files in docs/module-2-simulation/"
Task: "T024 [US1] Create Module 3 lesson files in docs/module-3-isaac/"
Task: "T025 [US1] Create Module 4 lesson files in docs/module-4-vla/"
```

## Parallel Example: User Story 2

```bash
# Build backend and frontend chat pieces concurrently:
Task: "T033 [US2] Implement chat retrieval/generation pipeline in backend/rag.py"
Task: "T037 [US2] Build floating widget UI in src/components/ChatWidget.tsx"
```

## Parallel Example: User Story 3

```bash
# Selection flow tests in parallel:
Task: "T040 [US3] Add frontend interaction test in tests/integration/test_selection_popup_flow.ts"
Task: "T041 [US3] Add backend context-priority test in tests/integration/test_context_priority.py"
```

## Parallel Example: User Story 4

```bash
# Ingestion tests in parallel:
Task: "T048 [US4] Add ingestion chunking tests in tests/unit/test_ingest_chunking.py"
Task: "T049 [US4] Add ingestion integration test in tests/integration/test_ingest_pipeline.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) for full textbook coverage.
3. Validate lesson quality gates and static build.
4. Demo MVP textbook without blocking on later stories.

### Incremental Delivery

1. Deliver US1 (textbook content).
2. Deliver US2 (floating RAG chat + citations + history).
3. Deliver US3 (selected-text context flow).
4. Deliver US4 (one-time ingestion pipeline).
5. Deliver Phase 7 bonus/cross-cutting requirements.

### Parallel Team Strategy

- Developer A: textbook content (US1) + ingestion preparation.
- Developer B: backend APIs and persistence (US2/US4).
- Developer C: frontend widget and selection UX (US2/US3).
- Developer D: auth/personalization/translation and submission packaging (Phase 7).

---

## Notes

- All tasks follow strict checklist format with IDs and file paths.
- [P] tasks indicate safe concurrency when dependencies are satisfied.
- User story labels are only used in user story phases.
- Stop after each story checkpoint to verify independent operability.
