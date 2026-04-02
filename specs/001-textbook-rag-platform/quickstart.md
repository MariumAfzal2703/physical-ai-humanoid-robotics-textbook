# Quickstart: Physical AI Textbook + RAG Platform

## 1) Prerequisites
- Node.js (LTS) and npm
- Python 3.11+
- Access credentials for Groq, Gemini, Qdrant, and Neon

## 2) Repository setup
```bash
npm install
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

## 3) Environment configuration
Create backend environment file (example):
```bash
cp backend/.env.example backend/.env
```
Set required variables:
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `NEON_DATABASE_URL`
- `BETTER_AUTH_SECRET` (required when auth phase is active)

Create frontend environment file:
```bash
cp .env.example .env
```
Set:
- `NEXT_PUBLIC_BACKEND_URL`

## 4) Run frontend
```bash
npm run start
```
Expected: Docusaurus site loads with textbook docs and globally-available chat widget.

## 5) Run backend
```bash
uvicorn backend.main:app --reload
```
Checks:
- `GET /health` returns `{ "status": "ok" }`
- `POST /chat` returns `{ "answer": "...", "sources": ["..."] }`

## 6) Ingest textbook content
```bash
python scripts/ingest.py
```
Expected:
- per-file progress logs
- final indexed chunk count > 0

## 7) Verify selected-text workflow
1. Open any lesson page.
2. Highlight text > threshold length.
3. Click `Ask about this`.
4. Confirm chat input contains selected context framing.
5. Send question and verify response includes visible source filenames.

## 8) Build for production
```bash
npm run build
```
Expected output directory: `build/`

## 9) Deployment wiring
- Frontend: Vercel project uses static output from `build/`.
- Backend: Render web service starts `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.
- CORS allows Vercel origin + localhost development origin.
