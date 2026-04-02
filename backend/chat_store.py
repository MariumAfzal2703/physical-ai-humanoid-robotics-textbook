from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import uuid4


@dataclass
class ChatMessage:
    role: str
    text: str
    sources: list[str]
    created_at: str


@dataclass
class ChatSession:
    session_id: str
    messages: list[ChatMessage]
    updated_at: str


_sessions: dict[str, ChatSession] = {}


def create_or_get_session(session_id: str | None = None) -> ChatSession:
    now = datetime.now(timezone.utc).isoformat()

    if session_id and session_id in _sessions:
        session = _sessions[session_id]
        session.updated_at = now
        return session

    new_id = session_id or str(uuid4())
    session = ChatSession(session_id=new_id, messages=[], updated_at=now)
    _sessions[new_id] = session
    return session


def append_message(session_id: str, role: str, text: str, sources: list[str] | None = None) -> None:
    session = create_or_get_session(session_id)
    session.messages.append(
        ChatMessage(
            role=role,
            text=text,
            sources=sources or [],
            created_at=datetime.now(timezone.utc).isoformat(),
        )
    )
    session.updated_at = datetime.now(timezone.utc).isoformat()


def get_messages(session_id: str) -> list[ChatMessage]:
    session = _sessions.get(session_id)
    if not session:
        return []
    return session.messages
