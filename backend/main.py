from fastapi import FastAPI

app = FastAPI(title="Physical AI Textbook Backend")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "Backend is running"}