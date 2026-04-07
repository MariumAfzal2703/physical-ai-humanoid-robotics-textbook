from fastapi import FastAPI

app = FastAPI(title="Physical AI Textbook Backend")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "Backend is running"}


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


@api_router.post("/chapters/{chapter_id:path}/translate-urdu", response_model=ChapterTransformResponse)
def translate_chapter(chapter_id: str) -> ChapterTransformResponse:
    try:
        content = rag.translate_chapter_urdu(chapter_id)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return ChapterTransformResponse(chapter_id=chapter_id, content=content)


@api_router.post("/auth/signup", response_model=AuthResponse)
def signup(payload: SignupRequest) -> AuthResponse:
    try:
        user_id, token = auth.signup(
            email=payload.email,
            password=payload.password,
            software_background=payload.software_background,
            hardware_background=payload.hardware_background,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return AuthResponse(user_id=user_id, token=token)


@api_router.post("/auth/signin", response_model=AuthResponse)
def signin(payload: SigninRequest) -> AuthResponse:
    try:
        user_id, token = auth.signin(email=payload.email, password=payload.password)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc
    return AuthResponse(user_id=user_id, token=token)


@api_router.post("/auth/oauth/{provider}", response_model=AuthResponse)
def oauth_signin(provider: str) -> AuthResponse:
    try:
        user_id, token = auth.oauth_signin(provider)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return AuthResponse(user_id=user_id, token=token)


@api_router.post("/auth/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(payload: ForgotPasswordRequest) -> ForgotPasswordResponse:
    # In a real implementation, this would send an email with a reset link
    # For now, we just return a generic success message to avoid leaking information
    # about whether the email exists in the system
    return ForgotPasswordResponse(message="If this email exists, a reset link has been sent")


@api_router.post("/chapters/{chapter_id:path}/personalize", response_model=ChapterTransformResponse)
def personalize_chapter(
    chapter_id: str,
    payload: ChapterActionRequest,
    authorization: str | None = Header(default=None),
) -> ChapterTransformResponse:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")

    token = authorization.replace("Bearer ", "", 1).strip()
    user = auth.get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        content = rag.personalize_chapter(
            chapter_id=chapter_id,
            software_background=user.software_background,
            hardware_background=user.hardware_background,
            focus=payload.focus,
        )
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    return ChapterTransformResponse(chapter_id=chapter_id, content=content)


app.include_router(api_router)
