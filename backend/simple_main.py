from fastapi import FastAPI

app = FastAPI(title="Physical AI Textbook Backend")

@app.get("/health")
def health():
    return {"status": "ok"}

# Simple test endpoint
@app.get("/")
def root():
    return {"message": "Backend is running"}