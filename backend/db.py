from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from .settings import get_settings


settings = get_settings()
_engine = create_engine(settings.neon_database_url) if settings.neon_database_url else None
SessionLocal = sessionmaker(bind=_engine, autoflush=False, autocommit=False) if _engine else None


@contextmanager
def get_db_session() -> Session:
    if SessionLocal is None:
        raise RuntimeError("NEON_DATABASE_URL is not configured")

    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
