# Deploying the Backend to Render

## Step 1: Prepare Your Repository

The backend is located in the `backend/` directory of this repository.

## Step 2: Create a Render Account

1. Go to [https://render.com](https://render.com) and create an account
2. Connect your GitHub account

## Step 3: Create a New Web Service

1. Click "New +" and select "Web Service"
2. Select your forked repository
3. Choose the `backend` directory
4. Set environment to "Python"
5. Set the runtime to Python 3.11

## Step 4: Configure the Web Service

- **Name**: `textbook-backend` (or your preferred name)
- **Region**: Choose a region close to your users
- **Branch**: `master`
- **Plan**: Starter (free tier available)

## Step 5: Set Environment Variables

Click on "Advanced" and add the following environment variables:

```
FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app
DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here
GROQ_API_KEY=your_groq_api_key_here
NEON_DATABASE_URL=your_neon_db_connection_string_here
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

## Step 6: Build and Start Commands

- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Step 7: Deploy

Click "Create Web Service" and Render will automatically deploy your backend.

## Step 8: Update Frontend Configuration

After your backend is deployed, update the `VITE_BACKEND_URL` in your `.env` file:

```
VITE_BACKEND_URL=https://your-textbook-backend.onrender.com
```

Then redeploy your frontend to Vercel.

## Required Services

Before deploying, you'll need to set up:

1. **Qdrant Cloud** - Get your URL and API key from [https://cloud.qdrant.io](https://cloud.qdrant.io)
2. **Neon PostgreSQL** - Get your connection string from [https://neon.tech](https://neon.tech)
3. **Groq API** - Get your API key from [https://console.groq.com](https://console.groq.com)
4. **GitHub OAuth App** - Register your app at [https://github.com/settings/apps](https://github.com/settings/apps)