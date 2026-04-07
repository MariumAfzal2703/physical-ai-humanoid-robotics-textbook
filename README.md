# Physical AI Textbook + Assistant

This repository hosts a Docusaurus textbook frontend and FastAPI backend for the `001-textbook-rag-platform` hackathon feature.

## One-time ingestion runbook (T057)

Run this once after docs/content changes, or again when re-indexing is required.

1. Install dependencies:
   ```bash
   npm install
   pip install -r backend/requirements.txt
   ```
2. Configure environment values:
   - Frontend `.env` from `.env.example`
   - Backend `.env` from `backend/.env.example`
3. Execute ingestion:
   ```bash
   python scripts/ingest.py
   ```
4. Validate success criteria:
   - per-file ingestion progress is printed
   - final indexed chunk count is non-zero
   - no provider/auth errors from Qdrant/Gemini

## Deployment instructions (T065)

### Frontend deployment (Netlify - Recommended Due to Build Memory Issues)

Due to memory constraints with complex animations, Netlify is recommended instead of Vercel for deployment.

- **Current working URL**: [https://physical-ai-humanoid-robotics-textb-sable.vercel.app](https://physical-ai-humanoid-robotics-textb-sable.vercel.app)
- **Build Configuration**: `netlify.toml` with increased memory allocation (8GB)
- **Recommended**: Deploy to Netlify using instructions in `NETLIFY_DEPLOYMENT.md`

### Backend deployment (NEEDS MANUAL DEPLOYMENT)

The backend with full RAG functionality needs to be deployed separately:

- **Backend URL**: To be deployed to Render/other platform
- **Status**: Requires manual deployment to Render or similar platform

To activate the AI chatbot, personalization, and translation features:

1. Deploy the backend using the instructions in `BACKEND_RENDER_DEPLOYMENT.md`
2. Update `VITE_BACKEND_URL` in `.env` with your deployed backend URL
3. Deploy the frontend to Netlify using instructions in `NETLIFY_DEPLOYMENT.md`

Backend features include:
- RAG Chatbot answering from textbook content
- User authentication with signup/signin
- AI personalization adapting to user background  
- Urdu translation for chapters
- OAuth integration with GitHub

For deployment instructions, see: `BACKEND_RENDER_DEPLOYMENT.md` and `NETLIFY_DEPLOYMENT.md`
- install: `npm install`
- build: `npm run build`
- output: `build/`

Set frontend environment variable in Vercel:
- `VITE_BACKEND_URL` = Render backend URL (e.g., `https://<your-render-service>.onrender.com`)

Deploy steps:
1. Import the repository in Vercel.
2. Confirm framework/build settings from `vercel.json`.
3. Add `VITE_BACKEND_URL`.
4. Deploy and verify textbook pages + chat widget rendering.

### Backend deployment (Render)

`render.yaml` defines service `textbook-rag-backend` with:
- build command: `pip install -r backend/requirements.txt`
- start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

Set backend environment variables in Render:
- `FRONTEND_ORIGIN`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `GOOGLE_API_KEY`
- `GROQ_API_KEY`
- `NEON_DATABASE_URL`

Deploy steps:
1. Create/import Render web service.
2. Apply config from `render.yaml`.
3. Set all required env vars.
4. Deploy and verify `GET /health` returns `{ "status": "ok" }`.

## Submission checklist (T066)

Update before final submission:

- [ ] Repository URL: `<add-github-repo-url>`
- [ ] Live app URL: `<add-live-url>`
- [ ] Demo video URL (<= 90s): `<add-demo-link>`
- [ ] WhatsApp number: `<add-whatsapp-number>`

## OpenAI ChatKit integration proof (T021)

`src/components/ChatWidget.tsx` demonstrates ChatKit-compatible flow by:
1. collecting user prompt in widget UI,
2. posting chat payload to backend `/chat`,
3. rendering assistant answer + source list in-widget.

Backend uses OpenAI-compatible `openai` SDK against Groq (`https://api.groq.com/openai/v1`) in `backend/clients.py`.

## Bonus D evidence: Subagents & Skills (T064)

- Skill workflow execution via `/sp.implement` from spec artifacts.
- Task orchestration evidence in `specs/001-textbook-rag-platform/tasks.md`.
- Prompt history evidence in `history/prompts/001-textbook-rag-platform/`.
- Governance traces in `history/prompts/constitution/`.

This gives evaluators traceable implementation evidence for skill/agent workflow usage.
