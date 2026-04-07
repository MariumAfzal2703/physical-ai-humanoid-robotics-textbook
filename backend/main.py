from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Physical AI Textbook Backend")

# Configure CORS to allow Railway and any frontend origin
allowed_origins = [
    "https://physical-ai-humanoid-robotics-textbook-production-63b5.up.railway.app",  # Railway domain
    "http://localhost:3000",  # Local development
    "http://localhost:3001",  # Alternative local dev
    "http://localhost:8000",  # Local backend
]

# Add any custom frontend URL from environment variable
custom_frontend = os.getenv("FRONTEND_ORIGIN")
if custom_frontend:
    allowed_origins.append(custom_frontend)

deployed_frontend = os.getenv("DEPLOYED_FRONTEND_ORIGIN")
if deployed_frontend:
    allowed_origins.append(deployed_frontend)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "Backend is running"}