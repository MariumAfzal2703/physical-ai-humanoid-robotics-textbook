from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import chat_store, rag
from .schemas import ChatRequest, ChatResponse
from .settings import get_settings

app = FastAPI(title="Physical AI Textbook Backend")
api_router = APIRouter()

settings = get_settings()
allowed_origins = [settings.frontend_origin]
if settings.deployed_frontend_origin:
    allowed_origins.append(settings.deployed_frontend_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api_router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@api_router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    session = chat_store.create_or_get_session(payload.session_id)
    chat_store.append_message(session.session_id, role="user", text=payload.question)

    try:
        answer, sources = rag.generate_answer(payload.question, payload.context_text)
    except Exception:
        answer = "I could not reach retrieval services right now. Please try again."
        sources = []

    chat_store.append_message(session.session_id, role="assistant", text=answer, sources=sources)

    return ChatResponse(answer=answer, sources=sources, session_id=session.session_id)


app.include_router(api_router)
