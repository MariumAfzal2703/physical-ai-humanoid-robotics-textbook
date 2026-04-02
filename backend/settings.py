from dataclasses import dataclass
import os


@dataclass(frozen=True)
class Settings:
    frontend_origin: str
    deployed_frontend_origin: str
    neon_database_url: str | None
    qdrant_url: str | None
    qdrant_api_key: str | None
    google_api_key: str | None
    groq_api_key: str | None


_cached_settings: Settings | None = None


def get_settings() -> Settings:
    global _cached_settings

    if _cached_settings is None:
        _cached_settings = Settings(
            frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"),
            deployed_frontend_origin=os.getenv("DEPLOYED_FRONTEND_ORIGIN", ""),
            neon_database_url=os.getenv("NEON_DATABASE_URL"),
            qdrant_url=os.getenv("QDRANT_URL"),
            qdrant_api_key=os.getenv("QDRANT_API_KEY"),
            google_api_key=os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY"),
            groq_api_key=os.getenv("GROQ_API_KEY"),
        )

    return _cached_settings
