# Physical AI & Humanoid Robotics Textbook - Backend Deployment Guide

## Deploying the Backend

The frontend is deployed on Vercel at: https://physical-ai-humanoid-robotics-textb-sable.vercel.app

The backend needs to be deployed separately. Here's how to deploy it:

### Option 1: Deploy to Render (Recommended)

1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Set the following environment variables in Render:
   - `FRONTEND_ORIGIN`: `https://physical-ai-humanoid-robotics-textb-sable.vercel.app`
   - `DEPLOYED_FRONTEND_ORIGIN`: `https://physical-ai-humanoid-robotics-textb-sable.vercel.app`
   - `QDRANT_URL`: Your Qdrant cluster URL
   - `QDRANT_API_KEY`: Your Qdrant API key
   - `GROQ_API_KEY`: Your Groq API key
   - `NEON_DATABASE_URL`: Your Neon PostgreSQL connection string
   - `GITHUB_CLIENT_ID`: GitHub OAuth client ID
   - `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret

4. Set the build command to: `pip install -r requirements.txt`
5. Set the start command to: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 2: Deploy to Railway

1. Install Railway CLI or connect via GitHub
2. Create a new project
3. Set environment variables as above
4. Set the start command to: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Deploy to Heroku

1. Create a new app on Heroku
2. Add the Python buildpack
3. Set environment variables as above
4. Use the Procfile in the backend directory

## Updating Frontend Configuration

After deploying the backend, update the frontend's `.env` file:

```
VITE_BACKEND_URL=<your-deployed-backend-url>
```

Then redeploy the frontend to Vercel.

## Required Services

You will need to set up the following services:

1. **Qdrant Cloud** - Vector database for RAG
2. **Neon PostgreSQL** - Authentication database
3. **Groq API** - LLM for RAG responses
4. **GitHub OAuth** - For authentication

## Environment Variables

The backend requires the following environment variables:

- `FRONTEND_ORIGIN` - URL of the frontend (for CORS)
- `DEPLOYED_FRONTEND_ORIGIN` - Additional allowed origin
- `QDRANT_URL` - Qdrant vector database URL
- `QDRANT_API_KEY` - Qdrant API key
- `GROQ_API_KEY` - Groq API key for LLM
- `NEON_DATABASE_URL` - PostgreSQL connection string
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret