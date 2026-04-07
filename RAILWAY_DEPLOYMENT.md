# Deploying the Backend to Railway - FIXED PROCEDURE

## IMPORTANT: Fix for Build Error

The error you encountered occurred because Railway was detecting the root directory's Node.js project instead of focusing on the Python backend. Here's the corrected procedure:

## Step 1: Prepare Your Repository

The backend is located in the `backend/` directory of this repository and is already containerized with Docker.

## Step 2: Create a Railway Account

1. Go to [https://railway.app](https://railway.app) and create an account
2. Install the Railway CLI: `npm install -g @railway/cli` (or login via web interface)

## Step 3: Deploy to Railway (CORRECTED FOR BUILD ERROR)

Due to the build error you encountered, follow this corrected procedure:

### Option A: Web Interface (Recommended)
1. Go to Railway dashboard: https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub Repo"
3. **IMPORTANT**: In the "Directory" field, enter: `backend`
4. Select your repository
5. This tells Railway to only look at the backend directory, ignoring the root Node.js project
6. Click "Deploy"

### Option B: CLI Method
1. Navigate to the backend directory: `cd backend/`
2. Login to Railway: `railway login`
3. Initialize in the backend directory: `railway init`
4. When prompted, select "Dockerfile" as the build method
5. Deploy: `railway up`

The key is ensuring Railway only sees the backend directory, not the root directory with the conflicting Node.js project.

## Step 4: Configure Variables in Railway

After deployment, go to the "Variables" section in Railway and add the following environment variables:

```
FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textbook.netlify.app
DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textbook.netlify.app
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here
GROQ_API_KEY=your_groq_api_key_here
NEON_DATABASE_URL=your_neon_db_connection_string_here
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

Note: Update the FRONTEND_ORIGIN and DEPLOYED_FRONTEND_ORIGIN to match your actual Netlify deployment URL.

## Step 5: Configure the Service

- **Service Type**: Web Service
- **Build Command**: `pip install -r requirements.txt` (if not using Docker)
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port ${PORT}`

Since the project has a Dockerfile, Railway will automatically use it for deployment.

## Step 6: Deploy

Push to your connected GitHub branch or use `railway up` to deploy.

## Step 7: Get Your Backend URL

After successful deployment, Railway will provide a URL like `https://your-project-name-production.up.railway.app`. Note this URL for frontend configuration.

## Step 8: Update Frontend Configuration

After your backend is deployed, update the `VITE_BACKEND_URL` in your `.env` file:

```
VITE_BACKEND_URL=https://your-project-name-production.up.railway.app
```

Then redeploy your frontend to Netlify.

## Required Services

Before deploying, you'll need to set up:

1. **Qdrant Cloud** - Get your URL and API key from [https://cloud.qdrant.io](https://cloud.qdrant.io)
2. **Neon PostgreSQL** - Get your connection string from [https://neon.tech](https://neon.tech)
3. **Groq API** - Get your API key from [https://console.groq.com](https://console.groq.com)
4. **GitHub OAuth App** - Register your app at [https://github.com/settings/apps](https://github.com/settings/apps)

## Railway Free Tier Information

Railway offers a generous free tier that includes:
- 500 hours per month (enough for continuous deployment)
- 1 GB Storage
- 512 MB RAM
- 2 vCPUs

This should be sufficient for the textbook backend during development and initial launch.