<!--
SYNC IMPACT REPORT
==================
Version change: 1.1.0 → 2.0.0
Bump rationale: MAJOR — Neon DB confirmed (added to core stack, not conditional anymore);
all four bonus features confirmed and added as active principles; Principle VIII fully
rewritten from "deferred" to "active roadmap with sequence enforcement".

Modified principles:
  - IV. LLM & Embedding Stack — Neon DB added as confirmed session store
  - VIII. Deferred Features → Active Bonus Roadmap (major redefinition)

Amended sections:
  - Technology Stack Constraints: Neon row changed from CONDITIONAL to CONFIRMED
  - Content & Quality Standards: bonus feature quality gates added
  - Governance: submission checklist expanded; progress tracking section added;
    learning notes section added; phase-by-phase build plan added

Added sections:
  - IX. Bonus Features — Active Roadmap (new principle)
  - Build Phases & Progress Tracker
  - Learning Notes (what you are learning and why)

Removed sections: none

Templates requiring updates:
  ✅ .specify/templates/plan-template.md  — no change required
  ✅ .specify/templates/spec-template.md  — no change required
  ✅ .specify/templates/tasks-template.md — no change required

Deferred TODOs: none — all decisions resolved in this amendment.
-->

# Master Physical AI & Humanoid Robotics Textbook — Constitution

## Core Principles

### I. Monorepo Integrity

All source code, documentation, backend services, scripts, and configuration MUST reside in the
single GitHub repository `MariumAfzal2703/master-physical-ai-&-robotics-textbook`. No work may
be split across sibling repos. Every contributor MUST open PRs against this repository only.

**Rationale**: Single source of truth eliminates divergence and simplifies CI/CD, Vercel, and
Render configuration.

**Seekhne wali cheez**: Ek hi repo mein sab kuch rakhna professional projects ka standard
tareeqa hai — isse collaboration aur deployment dono asaan hote hain.

### II. Frontend — Static Docusaurus v3 Only

The frontend MUST be built with Docusaurus v3 and exported as a fully static site
(`docusaurus build` + static export). Server-Side Rendering (SSR) is explicitly prohibited.
Custom color/theme overrides are prohibited; the default Docusaurus theme MUST be used unchanged.
Deployment target is Vercel.

**Rationale**: Static export guarantees zero cold-start latency on Vercel free tier, eliminates
runtime Node.js surface area, and keeps the frontend purely a content delivery layer.

**Seekhne wali cheez**: Docusaurus ek React-based documentation framework hai. Static export
matlab HTML files generate hoti hain — koi server nahi chahiye, seedha CDN se serve hoti hain.
Yeh websites bohot fast hoti hain.

### III. Backend — FastAPI on Render (Single Service)

The backend MUST be implemented as a single FastAPI service located at `backend/main.py`.
Docker MUST NOT be introduced unless Render's free tier explicitly requires it. The service
MUST expose Pydantic-validated request/response models on every endpoint. Deployment target is
Render free tier.

**Rationale**: A single, Dockerless FastAPI service minimises operational complexity and stays
within Render free-tier resource limits.

**Seekhne wali cheez**: FastAPI Python ka sabse modern aur fast web framework hai. Pydantic
ka matlab hai ke har API request aur response ka ek defined structure hoga — yeh bugs
prevent karta hai aur automatic documentation bhi generate karta hai.

### IV. LLM & Embedding Stack (Non-Negotiable)

- **LLM**: Groq API, model `llama-3.3-70b-versatile`, invoked via the OpenAI Agents SDK
  (`base_url` set to the Groq endpoint; `api_key` from `GROQ_API_KEY`).
- **Embeddings**: Google Gemini `text-embedding-004` via the `google-generativeai` Python SDK.
  OpenAI embeddings are explicitly prohibited.
- **Vector DB**: Qdrant Cloud free tier. Exactly ONE collection named `textbook` MUST be used
  for the entire book. No additional collections are permitted.
- **Session DB**: Neon Serverless Postgres — CONFIRMED. Used to store RAG conversation history
  (user questions + AI answers per session). Env var: `NEON_DATABASE_URL`. All Neon access
  MUST be in `backend/` via Python with full type hints.

All canonical environment variables MUST be injected via environment and MUST NOT be hardcoded:
`GROQ_API_KEY`, `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `NEON_DATABASE_URL`.

**Rationale**: Fixing the full AI stack removes ambiguity. Neon stores conversation history
so the chatbot remembers what was asked earlier in a session — better UX, required for base score.

**Seekhne wali cheez**:
- **Groq** = bohot fast LLM inference service (Llama model run karta hai)
- **Gemini Embeddings** = text ko numbers (vectors) mein convert karta hai taake similar
  content dhundha ja sake
- **Qdrant** = vector database — yeh vectors store karta hai aur similarity search karta hai
- **Neon** = cloud Postgres database — SQL database, conversation history ke liye
- **RAG flow**: User sawal karta hai → Gemini se embedding banti hai → Qdrant se related
  text dhundha jata hai → Groq LLM jawab deta hai → Neon mein save hota hai

### V. Language Discipline

All backend code and all scripts MUST be written in Python with full type annotations. TypeScript
is restricted to Docusaurus/frontend configuration files only and MUST NOT appear in `backend/`
or `scripts/`. C++ is prohibited across the entire repository.

**Rationale**: A Python-only backend/scripts policy reduces context-switching, enforces a single
linting/testing toolchain, and makes type errors catchable at review time.

**Seekhne wali cheez**: Type hints Python mein yeh batate hain ke function kya receive karta
hai aur kya return karta hai. Example: `def search(query: str) -> list[str]:` — isse IDE
errors pakad leta hai code likhte waqt hi.

### VI. RAG Ingestion — One-Time CLI Only

Vector ingestion MUST occur exclusively via the CLI script `scripts/ingest.py`, which is run
once by a human operator. Auto-ingestion on deploy, on startup, or on any webhook trigger is
strictly prohibited. The script MUST be idempotent (safe to re-run without duplicating vectors).

**Rationale**: Auto-ingestion on deploy risks exceeding Qdrant free-tier quotas, introduces
unpredictable cold-start delays, and couples content authoring to deployment pipelines.

**Seekhne wali cheez**: Ingestion ka matlab hai book ka content chunks mein todna, har chunk
ki embedding banana, aur Qdrant mein store karna. Yeh ek baar hota hai — deploy pe nahi,
manually CLI se.

### VII. Diagrams — Mermaid in MDX Only

All diagrams MUST be expressed as Mermaid blocks embedded directly in `.mdx` files. Binary
image files (PNG, SVG, JPG, etc.) are prohibited as a substitute for diagrams. Mermaid diagrams
MUST render correctly inside Docusaurus using the standard Mermaid plugin.

**Rationale**: Text-based diagrams are version-controlled, diff-friendly, and require no external
tooling to update.

**Seekhne wali cheez**: Mermaid ek diagram language hai jo text se diagrams banati hai.
Example:
```
graph LR
  User --> Chatbot --> Qdrant --> LLM --> Answer
```
Yeh code ek flowchart ban jata hai automatically Docusaurus mein.

### VIII. Deferred Features — Hard Excluded for Now

The following are permanently excluded from this project's scope and MUST NOT be added:

- Custom Docusaurus color or theme overrides
- Any auth library other than BetterAuth (if BetterAuth is added per Principle IX)
- Any relational DB other than Neon (Neon is confirmed in Principle IV)

**Rationale**: Scope boundaries prevent feature creep and protect the submission deadline.

### IX. Bonus Features — Active Roadmap (Confirmed, Sequenced)

All four bonus features are confirmed for implementation, in strict sequence. No bonus feature
may begin before its dependency is complete. Each bonus feature MUST have its own feature spec
(`/sp.specify`) before implementation starts.

**Sequence and dependency chain:**

```
Phase 1 (Base — MUST complete first):
  Book content + Docusaurus + RAG chatbot + Neon + Selected-text UI
  ↓
Phase 2 (Bonus A — +50 pts):
  Urdu Translation button per chapter
  → No dependency on auth. Can start right after Phase 1.
  ↓
Phase 3 (Bonus B — +50 pts):
  BetterAuth Signup/Signin
  → User must answer background questions at signup (stored in Neon).
  ↓
Phase 4 (Bonus C — +50 pts):
  Personalisation
  → DEPENDS on BetterAuth (Phase 3). Cannot start before Phase 3 is complete.
  → Uses stored user background to adapt chapter content via LLM.
  ↓
Phase 5 (Bonus D — +50 pts):
  Claude Code Subagents & Agent Skills
  → Can run parallel to Phase 4 if time permits.
  → Used during book content generation, not in the deployed app.
```

**Rules for each bonus feature:**
- Urdu Translation: A button MUST appear at the top of each chapter. On click, the full
  chapter content MUST be translated via the Groq LLM and displayed in-place. No separate
  Urdu MDX files — translation happens client-side via API call.
- BetterAuth: Signup form MUST ask software background (languages known) and hardware
  background (GPU/no GPU). Answers MUST be stored in Neon under the user's profile.
- Personalisation: When a logged-in user opens a chapter, a "Personalise" button MUST appear.
  On click, the LLM rewrites the chapter intro and code examples to match the user's background.
- Subagents/Skills: Claude Code subagents MUST be used during the book-writing phase to
  generate and review lesson content. Evidence of subagent use MUST be documented in the repo.

## Technology Stack Constraints

| Layer | Technology | Status | Constraint |
|---|---|---|---|
| Frontend | Docusaurus v3 | ✅ Confirmed | Static export only; default theme |
| Hosting (FE) | Vercel | ✅ Confirmed | Free tier; no SSR |
| Backend | FastAPI (Python ≥ 3.11) | ✅ Confirmed | Single service; Pydantic models mandatory |
| Hosting (BE) | Render | ✅ Confirmed | Free tier; no Docker unless required |
| LLM | Groq `llama-3.3-70b-versatile` | ✅ Confirmed | Via OpenAI Agents SDK, Groq base_url |
| Embeddings | Gemini `text-embedding-004` | ✅ Confirmed | Via `google-generativeai` SDK only |
| Vector DB | Qdrant Cloud | ✅ Confirmed | One collection: `textbook` |
| Session DB | Neon Serverless Postgres | ✅ Confirmed | Conversation history + user profiles |
| Auth | BetterAuth | ⏳ Phase 3 | Only when Phase 1 + 2 complete |
| Diagrams | Mermaid | ✅ Confirmed | Embedded in MDX; no image files |
| Language | Python (backend/scripts) | ✅ Confirmed | Full type hints; no C++ |

**Canonical environment variables (never hardcode any of these):**
```
GROQ_API_KEY          ← Groq LLM access
GEMINI_API_KEY        ← Google embeddings
QDRANT_URL            ← Qdrant Cloud endpoint
QDRANT_API_KEY        ← Qdrant Cloud auth
NEON_DATABASE_URL     ← Neon Postgres connection string
BETTER_AUTH_SECRET    ← Added in Phase 3 only
```

## Content & Quality Standards

Every lesson file MUST satisfy all of the following before merge:

1. **Concept explanation** — A clear, non-placeholder explanation of the topic written from
   domain knowledge (no Lorem Ipsum; no stub content).
2. **Code example** — At least one complete, runnable Python or ROS 2 code snippet illustrating
   the concept.
3. **Mermaid diagram** — At least one Mermaid diagram that visually represents a key concept,
   data flow, or system relationship in the lesson.

FastAPI endpoints MUST have Pydantic request and response models. All Python code MUST include
type hints on function signatures and return types.

The RAG pipeline (`backend/rag.py`) MUST be tested manually against the live Qdrant collection
before the ingestion script is marked complete.

**Curriculum coverage**: The textbook MUST cover all four modules. Each week MUST have at
least one lesson file:

| Module | Weeks | Topic |
|---|---|---|
| 1 — ROS 2 Fundamentals | 1–5 | Physical AI intro, nodes, topics, services, rclpy, URDF |
| 2 — Gazebo & Unity Simulation | 6–7 | Physics sim, SDF/URDF, sensors, Unity visualisation |
| 3 — NVIDIA Isaac Platform | 8–10 | Isaac Sim, Isaac ROS, VSLAM, Nav2, sim-to-real |
| 4 — VLA & Conversational Robotics | 11–13 | Humanoid kinematics, Whisper voice, LLM→ROS 2 actions |

**Selected-text RAG contract**: The RAG chatbot widget MUST accept an optional `context` field
containing user-selected text from the page. When `context` is present, the RAG pipeline MUST
prioritise that passage over retrieved Qdrant chunks. The Docusaurus frontend MUST expose a
floating action button on text selection to pass selected text to the chatbot.
This is a **base-score deliverable**.

## Build Phases & Progress Tracker

Track every phase below. Update status as work completes.

### Phase 1 — Base (100 points) 🎯

| # | Task | Status | Notes |
|---|---|---|---|
| 1.1 | GitHub repo created + monorepo structure | ⬜ Todo | |
| 1.2 | Docusaurus v3 installed + Vercel deployed | ⬜ Todo | |
| 1.3 | Module 1 lessons (Weeks 1–5) written | ⬜ Todo | ROS 2 |
| 1.4 | Module 2 lessons (Weeks 6–7) written | ⬜ Todo | Gazebo & Unity |
| 1.5 | Module 3 lessons (Weeks 8–10) written | ⬜ Todo | NVIDIA Isaac |
| 1.6 | Module 4 lessons (Weeks 11–13) written | ⬜ Todo | VLA & Whisper |
| 1.7 | FastAPI backend setup + Render deployed | ⬜ Todo | |
| 1.8 | Qdrant collection `textbook` created | ⬜ Todo | |
| 1.9 | Gemini embeddings pipeline working | ⬜ Todo | |
| 1.10 | `scripts/ingest.py` written + run | ⬜ Todo | |
| 1.11 | Groq RAG pipeline working (`rag.py`) | ⬜ Todo | |
| 1.12 | Neon DB connected — conversation history | ⬜ Todo | |
| 1.13 | Chatbot widget embedded in Docusaurus | ⬜ Todo | |
| 1.14 | Selected-text → chatbot flow working | ⬜ Todo | |
| 1.15 | Demo video recorded (≤ 90 seconds) | ⬜ Todo | |
| 1.16 | Submission form submitted | ⬜ Todo | |

### Phase 2 — Bonus A: Urdu Translation (+50 pts) 🌙

| # | Task | Status | Notes |
|---|---|---|---|
| 2.1 | `/sp.specify` for Urdu feature | ⬜ Todo | After Phase 1 done |
| 2.2 | Groq translation API endpoint in FastAPI | ⬜ Todo | |
| 2.3 | "Urdu" button added to each chapter | ⬜ Todo | |
| 2.4 | Translation renders in-place on click | ⬜ Todo | |

### Phase 3 — Bonus B: BetterAuth (+50 pts) 🔐

| # | Task | Status | Notes |
|---|---|---|---|
| 3.1 | `/sp.specify` for BetterAuth feature | ⬜ Todo | After Phase 2 done |
| 3.2 | BetterAuth installed + configured | ⬜ Todo | |
| 3.3 | Signup form with background questions | ⬜ Todo | |
| 3.4 | User profile stored in Neon | ⬜ Todo | |
| 3.5 | Login/logout working | ⬜ Todo | |

### Phase 4 — Bonus C: Personalisation (+50 pts) 🎓

| # | Task | Status | Notes |
|---|---|---|---|
| 4.1 | `/sp.specify` for Personalisation feature | ⬜ Todo | After Phase 3 done |
| 4.2 | "Personalise" button per chapter | ⬜ Todo | |
| 4.3 | LLM rewrites content using user background | ⬜ Todo | |
| 4.4 | Personalised content renders in-place | ⬜ Todo | |

### Phase 5 — Bonus D: Subagents & Skills (+50 pts) 🤖

| # | Task | Status | Notes |
|---|---|---|---|
| 5.1 | Claude Code subagents used during book writing | ⬜ Todo | Document evidence |
| 5.2 | Agent Skills defined for content review | ⬜ Todo | |
| 5.3 | Subagent usage documented in repo | ⬜ Todo | |

**Status legend**: ⬜ Todo → 🔄 In Progress → ✅ Done → ❌ Blocked

## Learning Notes

Yeh section tumhare liye hai — har cheez jo is project mein seekhoge, woh yahan explain ki
gayi hai taake samajh aaye kya ho raha hai aur kyun.

### RAG Kya Hai? (Retrieval-Augmented Generation)

```
Normal LLM:
  User: "ROS 2 mein topic kya hota hai?"
  LLM: Generic jawab (apni training se)

RAG-powered LLM:
  User: "ROS 2 mein topic kya hota hai?"
  Step 1: Query ki embedding banti hai (Gemini)
  Step 2: Qdrant mein similar text dhundha jata hai (book ke chapters se)
  Step 3: Woh relevant text LLM ko context mein diya jata hai
  Step 4: LLM jawab deta hai SIRF book ke content ke basis pe (Groq)
  Step 5: Jawab Neon mein save hota hai (conversation history)
```

Faida: Chatbot SIRF tumhari book ki baat karta hai, random cheezein nahi bolata.

### Embeddings Kya Hoti Hain?

Text ko numbers mein convert karna. Example:
```
"ROS 2 node" → [0.23, -0.45, 0.78, ...]  (768 numbers ka array)
"Robot Operating System node" → [0.21, -0.43, 0.76, ...]  (almost same!)
```
Similar meaning wale words ke numbers bhi similar hote hain — isi se Qdrant relevant
content dhundh pata hai.

### Neon (Postgres) Kab Use Hoga?

```
User conversation:
  Turn 1: "ROS 2 kya hai?" → Jawab → Neon mein save
  Turn 2: "Iska nodes se kya talluq hai?" → Neon se pichla context lo → Better jawab

User profile (Phase 3 ke baad):
  Signup pe: "Mujhe Python aati hai, GPU nahi hai"
  Chapter open karo: "Personalise" dabao → LLM GPU wale examples hata ke CPU examples de
```

### Docusaurus MDX Kya Hai?

MDX = Markdown + JSX (React components). Normal Markdown (`.md`) mein sirf text hota
hai. MDX (`.mdx`) mein tum React components bhi embed kar sakte ho — jaise chatbot widget,
Urdu button, personalise button — seedha content ke saath.

## Governance

This constitution supersedes all other project guidelines, conventions, and ad-hoc decisions.
Any perceived conflict between this document and another guide is resolved in favour of this
constitution.

**Amendment procedure**:
1. Open a PR with the proposed change to this file.
2. Provide a written rationale explaining why the change is necessary and what alternatives were
   rejected.
3. Increment `CONSTITUTION_VERSION` according to semver rules:
   - **MAJOR**: Removal or redefinition of an existing principle, or unblocking a new bonus phase.
   - **MINOR**: New principle or section added.
   - **PATCH**: Clarification, wording fix, progress tracker update, non-semantic refinement.
4. Update the Sync Impact Report HTML comment at the top of this file.

**Compliance review**: Every PR that touches `backend/`, `scripts/`, `docs/`, or
`docusaurus.config.ts` MUST include a checklist item confirming compliance with the relevant
principles above.

**Submission checklist** (all items MUST be complete before the Nov 30 2025 deadline):

**Phase 1 — Base (100 pts):**
- [ ] Public GitHub repo accessible at `MariumAfzal2703/master-physical-ai-&-robotics-textbook`
- [ ] All 13 weeks of lesson files present in `docs/`
- [ ] Every lesson has: concept explanation + code example + Mermaid diagram
- [ ] Docusaurus site live on Vercel
- [ ] FastAPI backend live on Render
- [ ] Qdrant collection `textbook` ingested via `scripts/ingest.py`
- [ ] RAG chatbot embedded and answering questions from book content
- [ ] Neon DB connected — conversation history saving per session
- [ ] Selected-text → chatbot flow working end-to-end
- [ ] Demo video ≤ 90 seconds recorded and publicly linked
- [ ] Submission form completed: <https://forms.gle/CQsSEGM3GeCrL43c8>

**Phase 2 — Urdu Translation (+50 pts):**
- [ ] Urdu button visible on every chapter page
- [ ] Translation renders in-place via Groq API on click

**Phase 3 — BetterAuth (+50 pts):**
- [ ] Signup/Signin working
- [ ] Background questions asked at signup and stored in Neon

**Phase 4 — Personalisation (+50 pts):**
- [ ] "Personalise" button visible to logged-in users
- [ ] Chapter content adapts to user background on click

**Phase 5 — Subagents/Skills (+50 pts):**
- [ ] Subagent usage documented and evidenced in repo

**Version**: 2.0.0 | **Ratified**: 2026-04-02 | **Last Amended**: 2026-04-02
