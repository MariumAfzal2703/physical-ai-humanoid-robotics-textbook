from pydantic import BaseModel, EmailStr, Field


class ChatRequest(BaseModel):
    question: str = Field(min_length=1)
    context_text: str | None = None
    session_id: str | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]
    session_id: str


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    software_background: str = Field(default="")
    hardware_background: str = Field(default="")


class SigninRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    user_id: str
    token: str


class ChapterActionRequest(BaseModel):
    focus: str | None = None


class ChapterTransformResponse(BaseModel):
    chapter_id: str
    content: str
