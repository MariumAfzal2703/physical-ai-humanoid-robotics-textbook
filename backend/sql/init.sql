CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    software_background TEXT NOT NULL,
    hardware_background TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    question_text TEXT,
    answer_text TEXT,
    context_text TEXT,
    sources TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (question_text IS NOT NULL OR answer_text IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS chapter_transformation_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    lesson_id TEXT NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('translate_urdu', 'personalize')),
    input_excerpt TEXT,
    output_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
