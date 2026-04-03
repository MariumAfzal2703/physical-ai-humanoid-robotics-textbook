from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

import bcrypt
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

from .settings import get_settings

load_dotenv()


@dataclass
class UserRecord:
    user_id: str
    email: str
    software_background: str
    hardware_background: str


_SQL_BOOTSTRAP = Path(__file__).resolve().parent / "sql" / "users.sql"


def _connect():
    settings = get_settings()
    if not settings.neon_database_url:
        raise RuntimeError("NEON_DATABASE_URL is not configured")
    return psycopg2.connect(settings.neon_database_url)


def _ensure_users_table() -> None:
    ddl = _SQL_BOOTSTRAP.read_text(encoding="utf-8")
    with _connect() as conn:
        with conn.cursor() as cur:
            cur.execute(ddl)
        conn.commit()


def _row_to_user(row: dict | None) -> UserRecord | None:
    if not row:
        return None
    return UserRecord(
        user_id=str(row["id"]),
        email=row["email"],
        software_background=row["software_background"],
        hardware_background=row["hardware_background"],
    )


def signup(email: str, password: str, software_background: str, hardware_background: str) -> tuple[str, str]:
    _ensure_users_table()

    normalized_email = email.strip().lower()
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user_id = str(uuid4())

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id FROM users WHERE email = %s", (normalized_email,))
            if cur.fetchone() is not None:
                raise ValueError("email already registered")

            cur.execute(
                """
                INSERT INTO users (id, email, password_hash, software_background, hardware_background)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (user_id, normalized_email, password_hash, software_background, hardware_background),
            )
        conn.commit()

    return user_id, f"token-{user_id}"


def signin(email: str, password: str) -> tuple[str, str]:
    _ensure_users_table()

    normalized_email = email.strip().lower()

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT id, password_hash FROM users WHERE email = %s",
                (normalized_email,),
            )
            row = cur.fetchone()

    if row is None:
        raise ValueError("invalid credentials")

    password_hash = row["password_hash"].encode("utf-8")
    if not bcrypt.checkpw(password.encode("utf-8"), password_hash):
        raise ValueError("invalid credentials")

    user_id = str(row["id"])
    return user_id, f"token-{user_id}"


def oauth_signin(provider: str) -> tuple[str, str]:
    _ensure_users_table()

    if provider not in {"google", "github"}:
        raise ValueError("unsupported oauth provider")

    email = f"{provider}-oauth@local.dev"

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT id FROM users WHERE email = %s",
                (email,),
            )
            existing = cur.fetchone()

            if existing is not None:
                user_id = str(existing["id"])
                return user_id, f"token-{user_id}"

            user_id = str(uuid4())
            placeholder_hash = bcrypt.hashpw(b"oauth", bcrypt.gensalt()).decode("utf-8")
            cur.execute(
                """
                INSERT INTO users (id, email, password_hash, software_background, hardware_background)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    user_id,
                    email,
                    placeholder_hash,
                    f"{provider} oauth learner",
                    "robotics hardware enthusiast",
                ),
            )
        conn.commit()

    return user_id, f"token-{user_id}"


def get_user_by_token(token: str) -> UserRecord | None:
    _ensure_users_table()

    if not token.startswith("token-"):
        return None

    user_id = token.replace("token-", "", 1)

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT id, email, software_background, hardware_background FROM users WHERE id = %s",
                (user_id,),
            )
            row = cur.fetchone()

    return _row_to_user(row)
