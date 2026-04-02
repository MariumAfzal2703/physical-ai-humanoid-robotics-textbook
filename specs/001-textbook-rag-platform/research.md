# Research: Physical AI Textbook + RAG Platform

## Decision 1: Frontend delivery model
- **Decision**: Use Docusaurus v3 static export as the frontend delivery model.
- **Rationale**: Static hosting fits textbook content delivery, lowers operational complexity, and aligns with the project constitution and deployment constraints.
- **Alternatives considered**:
  - SSR frontend: rejected due to additional runtime complexity not needed for mostly static educational content.
  - Custom React app from scratch: rejected because Docusaurus already provides docs navigation, MDX support, and Mermaid integration.

## Decision 2: Backend API shape
- **Decision**: Build a single FastAPI service with focused endpoints (`/health`, `/chat`, auth/session endpoints, translation/personalization endpoints).
- **Rationale**: Single service keeps deployment and observability simple while covering all required user flows.
- **Alternatives considered**:
  - Multiple microservices: rejected as unnecessary complexity for this scope.
  - Serverless functions split by endpoint: rejected due to fragmented local dev and shared context handling complexity.

## Decision 3: Retrieval strategy
- **Decision**: Use Gemini embeddings (`text-embedding-004`) + Qdrant top-k retrieval (`k=5`) with selected-text context priority.
- **Rationale**: This directly satisfies functional requirements for grounded answers and selected-context-first behavior.
- **Alternatives considered**:
  - Keyword search only: rejected for lower semantic retrieval quality.
  - Larger `k` by default (10+): rejected due to extra token cost/latency without guaranteed quality gain.

## Decision 4: Answer generation strategy
- **Decision**: Use Groq-hosted `llama-3.3-70b-versatile` through OpenAI-compatible client/Agents SDK pattern.
- **Rationale**: Matches constitution requirements and provides consistent prompt orchestration for grounded answers.
- **Alternatives considered**:
  - Direct model providers not in constitution: rejected by project constraints.
  - Non-RAG direct generation: rejected because source-grounding and citation quality are required.

## Decision 5: Chat memory persistence
- **Decision**: Persist chat sessions and message turns in Neon Postgres.
- **Rationale**: Required by FR-016 and FR-018; enables follow-up questions with historical context.
- **Alternatives considered**:
  - In-memory session cache only: rejected as non-durable and unsuitable for deployed sessions.
  - Storing memory in vector DB payloads only: rejected due to poor relational querying for user/session management.

## Decision 6: Ingestion workflow
- **Decision**: One-time operator-run CLI ingestion from `docs/**/*.mdx`, with deterministic chunking and idempotent upsert to `textbook` collection.
- **Rationale**: Prevents deployment-time ingestion risk and aligns with constitution one-time-ingestion rule.
- **Alternatives considered**:
  - Ingest on every deploy: rejected due to unpredictability and quota risk.
  - Manual copy-paste content ingestion: rejected due to non-repeatability and high error risk.

## Decision 7: Chunking and cleaning approach
- **Decision**: Strip MDX/JSX/Mermaid syntax before embedding; chunk content to ~800 tokens with 100 overlap.
- **Rationale**: Preserves semantic continuity and reduces embedding noise from presentation syntax.
- **Alternatives considered**:
  - No overlap: rejected due to boundary-context loss.
  - Very small chunks (<300 tokens): rejected due to fragmented context and poorer answer composition.

## Decision 8: API contracts and validation
- **Decision**: Use Pydantic models on all request/response contracts, explicit error payloads, and visible source filename arrays for chat responses.
- **Rationale**: Satisfies constitution quality rules and FR-023 visibility requirements.
- **Alternatives considered**:
  - Loose JSON without schema: rejected due to weaker correctness and maintainability.

## Decision 9: Personalization and translation flow
- **Decision**: Implement chapter-level actions (`personalize`, `translate`) as explicit API operations, tied to authenticated user profile where required.
- **Rationale**: Matches FR-019 to FR-021 and preserves clear separation between base chapter content and transformed render output.
- **Alternatives considered**:
  - Permanent overwrite of chapter files: rejected to avoid destructive content mutation.
  - Client-only transformation without backend: rejected because LLM execution and profile-aware logic require secure server handling.

## Decision 10: Deployment and CORS policy
- **Decision**: Allow CORS for deployed frontend origin plus localhost dev origin; deploy frontend to Vercel and backend to Render.
- **Rationale**: Required by FR-010 and deployment constraints.
- **Alternatives considered**:
  - Wildcard CORS: rejected due to avoidable security exposure.
  - Same-origin-only policy: rejected because frontend/backend are hosted separately.

## Clarifications resolved
All major technical unknowns in planning context are now resolved through explicit stack decisions in the constitution and spec.
