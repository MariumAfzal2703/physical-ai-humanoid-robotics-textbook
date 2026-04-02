# Tasks: Physical AI Textbook and Assistant

**Input**: Design documents from `/specs/001-textbook-rag-platform/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Include targeted contract/integration tests for critical API and user flows from the specification.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3, US4)
- Every task includes explicit file path(s)

## Follow-up Progress Checklist

- [x] Phase 1 Setup complete
- [x] Phase 2 Foundational complete
- [x] Phase 3 US1 complete
- [x] Phase 4 US2 complete
- [x] Phase 5 US3 complete
- [x] Phase 6 US4 complete
- [x] Phase 7 Bonus A (Urdu) complete
- [x] Phase 8 Bonus B (BetterAuth) complete
- [x] Phase 9 Bonus C (Personalization) complete
- [x] Phase 10 Bonus D (Subagents/Skills evidence) complete
- [x] Phase 11 Final submission checklist complete

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project structure, core tooling, and deployment config.

- [ ] T001 Scaffold Docusaurus v3 app at repository root with TypeScript config in `docusaurus.config.ts` and `package.json`
- [ ] T002 Create monorepo directories `docs/`, `src/components/`, `src/theme/`, `backend/`, `scripts/`, and `tests/`
- [ ] T003 [P] Create backend dependency manifest in `backend/requirements.txt`
- [ ] T004 [P] Create frontend env template in `.env.example`
- [ ] T005 [P] Create backend env template in `backend/.env.example`
- [ ] T006 [P] Create Render service config in `render.yaml`
- [ ] T007 [P] Create Vercel static build config in `vercel.json`
- [ ] T008 Remove default placeholder docs/pages from `docs/` and `src/pages/` and keep only feature-relevant content
- [ ] T009 [P] Setup frontend test tooling (Vitest + Testing Library) in `package.json` and `vitest.config.ts`
- [ ] T010 Validate static build with `npm run build` from repository root and fix config issues in `docusaurus.config.ts`

**Setup checkpoint**: Build and frontend test tooling are configured.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared backend/frontend infrastructure required before user stories.

**⚠️ CRITICAL**: Complete this phase before user story work.

- [x] T011 Create backend app entrypoint skeleton and router registration in `backend/main.py`
- [x] T012 [P] Configure CORS middleware for localhost + deployed frontend origin in `backend/main.py`
- [x] T013 [P] Create backend settings loader for required env vars in `backend/settings.py`
- [x] T014 [P] Create Neon database connection + session utilities in `backend/db.py`
- [x] T015 [P] Create Qdrant + Gemini + Groq client setup helpers in `backend/clients.py`
- [x] T016 Create shared Pydantic schemas for chat/auth/chapter actions in `backend/schemas.py`
- [x] T017 [P] Create SQL schema/migration script for `users`, `chat_sessions`, `chat_messages`, and transformation logs in `backend/sql/init.sql`
- [x] T018 [P] Create reusable textbook content indexing helper module in `scripts/content_indexing.py`
- [x] T019 Create global frontend API helper for backend requests in `src/components/api.ts`
- [x] T020 Create global chat widget mount point in `src/theme/Root.tsx`
- [x] T021 Add OpenAI ChatKit integration proof task by wiring adapter/usage notes in `src/components/ChatWidget.tsx` and `README.md`

**Checkpoint**: Foundation ready; user stories can proceed.

---

## Phase 3: User Story 1 - Study Complete Robotics Curriculum (Priority: P1) 🎯 MVP

**Goal**: Publish complete multi-module textbook lessons with required quality elements.

**Independent Test**: Open built site and confirm all modules/lessons include prose + executable code + Mermaid diagram + key takeaways.

### Tests for User Story 1

- [x] T022 [P] [US1] Add content quality validator script for prose/code/mermaid/takeaways checks in `scripts/validate_lessons.py`
- [x] T023 [US1] Add content validation command wiring in `package.json`

### Implementation for User Story 1

- [x] T024 [P] [US1] Create Module 1 lesson files in `docs/module-1-ros2/`
- [x] T025 [P] [US1] Create Module 2 lesson files in `docs/module-2-simulation/`
- [x] T026 [P] [US1] Create Module 3 lesson files in `docs/module-3-isaac/`
- [x] T027 [P] [US1] Create Module 4 lesson files in `docs/module-4-vla/`
- [x] T028 [US1] Add capstone lesson in `docs/module-4-vla/capstone-autonomous-humanoid.mdx`
- [x] T029 [US1] Configure Mermaid support in `docusaurus.config.ts`
- [x] T030 [US1] Generate structured sidebar entries in `sidebars.ts`
- [x] T031 [US1] Run lesson quality validator and fix all failing lessons in `docs/module-*/**/*.mdx`

**Checkpoint**: User Story 1 complete and independently demoable.

---

## Phase 4: User Story 2 - Ask Questions from Any Page (Priority: P1)

**Goal**: Provide floating chatbot across pages with grounded answers, visible sources, and in-session history.

**Independent Test**: Open any lesson page, ask question, receive answer + source file list; prior messages remain visible.

### Tests for User Story 2

- [x] T032 [P] [US2] Add contract tests for `/health` and `/chat` in `tests/contract/test_chat_api.py`
- [x] T033 [P] [US2] Add integration test for chat history persistence in `tests/integration/test_chat_session_history.py`

### Implementation for User Story 2

- [x] T034 [US2] Implement `/health` endpoint in `backend/main.py`
- [x] T035 [US2] Implement chat retrieval/generation pipeline in `backend/rag.py`
- [x] T036 [US2] Implement `/chat` endpoint with fallback behavior in `backend/main.py`
- [x] T037 [US2] Implement chat session/message persistence in `backend/chat_store.py`
- [x] T038 [US2] Integrate persistence into `/chat` flow in `backend/main.py`
- [x] T039 [US2] Build floating widget UI in `src/components/ChatWidget.tsx`
- [x] T040 [US2] Connect widget to backend `/chat` and render source filename list in `src/components/ChatWidget.tsx`
- [x] T041 [US2] Ensure widget mounts globally via `src/theme/Root.tsx`

**Checkpoint**: User Story 2 works independently on any page.

---

## Phase 5: User Story 3 - Ask About Selected Text (Priority: P1)

**Goal**: Allow selected-text question flow that prioritizes highlighted context.

**Independent Test**: Select passage, click “Ask about this,” send question, and receive answer focused on selected text.

### Tests for User Story 3

- [x] T042 [P] [US3] Add frontend interaction test for selection popup in `tests/integration/test_selection_popup_flow.ts`
- [x] T043 [P] [US3] Add backend integration test for selected-context priority in `tests/integration/test_context_priority.py`

### Implementation for User Story 3

- [x] T044 [US3] Create text-selection popup component in `src/components/SelectionPopup.tsx`
- [x] T045 [US3] Wire popup click action to open chat and prefill context in `src/components/SelectionPopup.tsx`
- [x] T046 [US3] Integrate popup/widget state in `src/theme/Root.tsx`
- [x] T047 [US3] Update chat payload to include optional `context_text` in `src/components/ChatWidget.tsx`
- [x] T048 [US3] Prioritize selected context over retrieved chunks in `backend/rag.py`
- [x] T049 [US3] Enforce long-selection truncation guard in `src/components/SelectionPopup.tsx`

**Checkpoint**: User Story 3 independently functional.

---

## Phase 6: User Story 4 - Maintain Searchable Knowledge Base (Priority: P2)

**Goal**: One-time ingestion that indexes lessons with source/module metadata and progress reporting.

**Independent Test**: Run ingestion once and verify per-file progress plus non-zero indexed chunk count.

### Tests for User Story 4

- [x] T050 [P] [US4] Add ingestion parser/chunker unit tests in `tests/unit/test_ingest_chunking.py`
- [x] T051 [P] [US4] Add ingestion integration test with mocked services in `tests/integration/test_ingest_pipeline.py`

### Implementation for User Story 4

- [x] T052 [US4] Implement MDX discovery and cleanup in `scripts/ingest.py`
- [x] T053 [US4] Implement chunking logic (800 tokens, 100 overlap) in `scripts/ingest.py`
- [x] T054 [US4] Implement embedding + Qdrant upsert with payload `{text, source, module}` in `scripts/ingest.py`
- [x] T055 [US4] Add idempotent upsert strategy with deterministic IDs in `scripts/ingest.py`
- [x] T056 [US4] Add per-file progress logging and final indexed count in `scripts/ingest.py`
- [x] T057 [US4] Document one-time ingestion runbook in `README.md`

**Checkpoint**: User Story 4 ingestion is reliable and testable.

---

## Phase 7: Bonus A - Urdu Translation (+50)

- [x] T058 Implement chapter translation endpoint in `backend/main.py` and `backend/rag.py`
- [x] T059 Implement chapter Urdu button and in-page rendering in `src/components/ChapterActions.tsx`

## Phase 8: Bonus B - BetterAuth Signup/Signin (+50)

- [x] T060 Implement signup/signin endpoints and profile capture in `backend/main.py` and `backend/auth.py`
- [x] T061 Implement frontend auth forms with software/hardware background in `src/components/AuthPanel.tsx`

## Phase 9: Bonus C - Personalization (+50)

- [x] T062 Implement chapter personalization endpoint in `backend/main.py`
- [x] T063 Implement personalized chapter trigger UI in `src/components/ChapterActions.tsx`

## Phase 10: Bonus D - Subagents & Skills Evidence (+50)

- [x] T064 Add reusable subagent/skill evidence documentation in `history/prompts/` and `README.md`

---

## Phase 11: Final Polish & Submission

- [x] T065 Add deployment instructions for Vercel + Render + env vars in `README.md`
- [x] T066 Validate submission package checklist (repo URL, live URL, <=90s demo link, WhatsApp number) in `README.md`
- [x] T067 Run full verification from quickstart and record outcomes in `specs/001-textbook-rag-platform/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 → Phase 2 (blocking)
- Phase 2 → Phases 3–6 (story work)
- Phase 4 required before Phase 5
- Phase 3 required before Phase 6
- Phase 7 can start after Phase 4
- Phase 8 required before Phase 9
- Phase 10 can proceed once evidence exists
- Phase 11 after all required deliverables

### Parallel Opportunities

- Phase 1 tasks T003–T007 and T009 in parallel.
- Phase 2 tasks T013–T019 in parallel after T011/T012.
- US1 content tasks T024–T027 in parallel.
- Story test tasks marked [P] can run in parallel.

---

## Parallel Example: User Story 1

```bash
Task: "T024 [US1] Create Module 1 lesson files in docs/module-1-ros2/"
Task: "T025 [US1] Create Module 2 lesson files in docs/module-2-simulation/"
Task: "T026 [US1] Create Module 3 lesson files in docs/module-3-isaac/"
Task: "T027 [US1] Create Module 4 lesson files in docs/module-4-vla/"
```

## Parallel Example: User Story 2

```bash
Task: "T035 [US2] Implement chat retrieval/generation pipeline in backend/rag.py"
Task: "T039 [US2] Build floating widget UI in src/components/ChatWidget.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T042 [US3] Add frontend interaction test in tests/integration/test_selection_popup_flow.ts"
Task: "T043 [US3] Add backend context-priority test in tests/integration/test_context_priority.py"
```

## Parallel Example: User Story 4

```bash
Task: "T050 [US4] Add ingestion chunking tests in tests/unit/test_ingest_chunking.py"
Task: "T051 [US4] Add ingestion integration test in tests/integration/test_ingest_pipeline.py"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 + Phase 2.
2. Complete Phase 3 (US1).
3. Validate independent MVP textbook quality.

### Incremental Delivery

1. US1 textbook
2. US2 chatbot
3. US3 selected-text
4. US4 ingestion
5. Bonus phases A–D
6. Final submission packaging

### Notes

- All tasks use strict checklist format with IDs and file paths.
- [P] indicates safe concurrency when dependencies are met.
- Keep commits small and push after each logical completion block.
