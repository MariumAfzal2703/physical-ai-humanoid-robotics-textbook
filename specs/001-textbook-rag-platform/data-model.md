# Data Model: Physical AI Textbook + RAG Platform

## Entity: Module
- **Purpose**: Groups lessons by curriculum area.
- **Fields**:
  - `id` (string, stable slug)
  - `title` (string)
  - `order_index` (integer, unique sequence)
  - `description` (string)
- **Relationships**:
  - One `Module` has many `Lesson` records.

## Entity: Lesson
- **Purpose**: Represents a chapter/lesson source in the textbook.
- **Fields**:
  - `id` (string, stable slug)
  - `module_id` (string, foreign key to Module)
  - `title` (string)
  - `source_path` (string, mdx path)
  - `has_prose` (boolean)
  - `has_code_example` (boolean)
  - `has_mermaid_diagram` (boolean)
  - `has_key_takeaways` (boolean)
- **Validation rules**:
  - All four quality booleans must be true before marking lesson complete.

## Entity: IndexedChunk
- **Purpose**: Retrieval unit stored in vector database.
- **Fields**:
  - `id` (string/uuid)
  - `text` (string)
  - `source` (string; filename or lesson id)
  - `module` (string; module identifier)
  - `chunk_index` (integer)
- **Validation rules**:
  - `text` must be non-empty after MDX cleanup.
  - `source` and `module` must always be present (traceability requirement).

## Entity: User
- **Purpose**: Authenticated learner profile for personalization.
- **Fields**:
  - `id` (uuid)
  - `email` (string, unique)
  - `password_hash` (string)
  - `software_background` (string)
  - `hardware_background` (string)
  - `created_at` (timestamp)
- **Validation rules**:
  - Email required and unique.
  - Background fields required at signup (FR-019).

## Entity: ChatSession
- **Purpose**: Conversation container for a learner session.
- **Fields**:
  - `id` (uuid)
  - `user_id` (uuid, nullable for guest mode if enabled)
  - `started_at` (timestamp)
  - `updated_at` (timestamp)
- **Relationships**:
  - One `ChatSession` has many `ChatMessage` rows.

## Entity: ChatMessage
- **Purpose**: Stores question/answer turns for continuity.
- **Fields**:
  - `id` (uuid)
  - `session_id` (uuid, foreign key)
  - `role` (enum: `user` | `assistant`)
  - `question_text` (string, nullable for assistant rows)
  - `answer_text` (string, nullable for user rows)
  - `context_text` (string, nullable)
  - `sources` (string array)
  - `created_at` (timestamp)
- **Validation rules**:
  - At least one of `question_text` or `answer_text` must be present.
  - `sources` array required for assistant responses (can be empty only in controlled fallback cases).

## Entity: ChapterTransformationRequest
- **Purpose**: Tracks translation/personalization actions.
- **Fields**:
  - `id` (uuid)
  - `user_id` (uuid)
  - `lesson_id` (string)
  - `operation` (enum: `translate_urdu` | `personalize`)
  - `input_excerpt` (string, optional)
  - `output_content` (text)
  - `created_at` (timestamp)

## State transitions

### Chat lifecycle
1. Session created.
2. User message saved.
3. Retrieval + generation executed.
4. Assistant message + sources saved.
5. Session timestamp updated.

### Lesson ingestion lifecycle
1. Discover MDX file.
2. Clean syntax.
3. Chunk with overlap.
4. Embed chunks.
5. Upsert vectors with metadata.
6. Report file completion + totals.
