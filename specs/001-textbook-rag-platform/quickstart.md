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
- `VITE_BACKEND_URL`

## 3.1) Verification outcomes (T067)

Verification run date: 2026-04-03

- ✅ `npm run test:run`
  - Result: 3/3 frontend integration tests passed.
- ✅ `python3 -m pytest`
  - Result: 8/8 contract/integration/unit tests passed.
- ✅ `npm run build`
  - Result: production build succeeded; static output generated in `build/`.

Observed warnings (non-blocking):
- Vite CJS Node API deprecation notice during tests.
- Python dependency support warnings (`google.api_core` Python 3.10 EOL timeline, requests dependency warning).
- `google.generativeai` deprecation warning in ingestion module.

Conclusion: quickstart verification checks pass for current repository state.

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
