from dataclasses import dataclass

import google.generativeai as genai
from openai import OpenAI
from qdrant_client import QdrantClient

from .settings import get_settings


@dataclass
class ClientBundle:
    qdrant: QdrantClient | None
    groq: OpenAI | None
    gemini_model: genai.GenerativeModel | None


def get_clients() -> ClientBundle:
    settings = get_settings()

    qdrant = None
    if settings.qdrant_url:
        qdrant = QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key)

    groq = None
    if settings.groq_api_key:
        groq = OpenAI(
            api_key=settings.groq_api_key,
            base_url="https://api.groq.com/openai/v1",
        )

    gemini_model = None
    if settings.google_api_key:
        genai.configure(api_key=settings.google_api_key)
        gemini_model = genai.GenerativeModel("gemini-1.5-flash")

    return ClientBundle(qdrant=qdrant, groq=groq, gemini_model=gemini_model)
