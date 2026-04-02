from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    answer = f"Chat pipeline placeholder for: {payload.question}"
    return ChatResponse(answer=answer, sources=[], session_id=payload.session_id)


app.include_router(api_router)
