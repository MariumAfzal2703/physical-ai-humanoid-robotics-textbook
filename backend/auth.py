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

    # Clean the connection string to remove problematic parameters
    conn_str = settings.neon_database_url

    # Remove problematic parameters for older psycopg2 versions
    import re
    # Remove channel_binding and sslmode parameters that can cause issues
    conn_str = re.sub(r'[&?]channel_binding=[^&]*', '', conn_str)
    conn_str = re.sub(r'[&?]sslmode=[^&]*', '', conn_str)

    # Ensure the connection string ends properly
    conn_str = conn_str.rstrip('&?')

    # Add required SSL parameters for Neon
    if '?sslmode=' not in conn_str and '&sslmode=' not in conn_str:
        separator = '&' if '?' in conn_str else '?'
        conn_str += f'{separator}sslmode=require'

    return psycopg2.connect(conn_str)


def create_tables() -> None:
    with _connect() as conn:
        with conn.cursor() as cur:
            # Create the table with the new schema (this won't fail if table already exists with same structure)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    software_background TEXT DEFAULT '',
                    hardware_background TEXT DEFAULT '',
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)

            # Check if the old 'id' column exists
            cur.execute("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='id'
            """)
            old_column_exists = cur.fetchone() is not None

            # Check if the new 'user_id' column exists
            cur.execute("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name='users' AND column_name='user_id'
            """)
            new_column_exists = cur.fetchone() is not None

            # If both columns exist, we might have run into a partial migration
            # If only 'id' exists, rename it
            if old_column_exists and not new_column_exists:
                cur.execute("ALTER TABLE users RENAME COLUMN id TO user_id")
            elif old_column_exists and new_column_exists:
                # If both exist, drop the old one (data should be in new one)
                try:
                    cur.execute("ALTER TABLE users DROP COLUMN id")
                except:
                    # If dropping fails, ignore (might be a constraint issue)
                    pass
            elif not old_column_exists and not new_column_exists:
                # Neither exists - shouldn't happen if CREATE TABLE worked, but just in case
                cur.execute("""
                    CREATE TABLE users (
                        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password_hash VARCHAR(255) NOT NULL,
                        software_background TEXT DEFAULT '',
                        hardware_background TEXT DEFAULT '',
                        created_at TIMESTAMP DEFAULT NOW()
                    )
                """)
        conn.commit()


def _row_to_user(row: dict | None) -> UserRecord | None:
    if not row:
        return None
    return UserRecord(
        user_id=str(row["user_id"]),
        email=row["email"],
        software_background=row["software_background"],
        hardware_background=row["hardware_background"],
    )


def signup(email: str, password: str, software_background: str, hardware_background: str) -> tuple[str, str]:
    create_tables()

    normalized_email = email.strip().lower()
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT user_id FROM users WHERE email = %s", (normalized_email,))
            if cur.fetchone() is not None:
                raise ValueError("email already registered")

            cur.execute(
                """
                INSERT INTO users (email, password_hash, software_background, hardware_background)
                VALUES (%s, %s, %s, %s)
                RETURNING user_id
                """,
                (normalized_email, password_hash, software_background, hardware_background),
            )
            result = cur.fetchone()
            user_id = str(result["user_id"])
        conn.commit()

    return user_id, f"token-{user_id}"


def signin(email: str, password: str) -> tuple[str, str]:
    create_tables()

    normalized_email = email.strip().lower()

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT user_id, password_hash FROM users WHERE email = %s",
                (normalized_email,),
            )
            row = cur.fetchone()

    if row is None:
        raise ValueError("invalid credentials")

    password_hash = row["password_hash"].encode("utf-8")
    if not bcrypt.checkpw(password.encode("utf-8"), password_hash):
        raise ValueError("invalid credentials")

    user_id = str(row["user_id"])
    return user_id, f"token-{user_id}"


def oauth_signin(provider: str) -> tuple[str, str]:
    create_tables()

    if provider not in {"google", "github"}:
        raise ValueError("unsupported oauth provider")

    email = f"{provider}_random@oauth.local"

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT user_id FROM users WHERE email = %s",
                (email,),
            )
            existing = cur.fetchone()

            if existing is not None:
                user_id = str(existing["user_id"])
                return user_id, f"token-{user_id}"

            placeholder_hash = bcrypt.hashpw(b"oauth", bcrypt.gensalt()).decode("utf-8")
            cur.execute(
                """
                INSERT INTO users (email, password_hash, software_background, hardware_background)
                VALUES (%s, %s, %s, %s)
                RETURNING user_id
                """,
                (
                    email,
                    placeholder_hash,
                    f"{provider} oauth learner",
                    "robotics hardware enthusiast",
                ),
            )
            result = cur.fetchone()
            user_id = str(result["user_id"])
        conn.commit()

    return user_id, f"token-{user_id}"


def get_user_by_token(token: str) -> UserRecord | None:
    create_tables()

    if not token.startswith("token-"):
        return None

    user_id = token.replace("token-", "", 1)

    with _connect() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT user_id, email, software_background, hardware_background FROM users WHERE user_id = %s",
                (user_id,),
            )
            row = cur.fetchone()

    return _row_to_user(row)
