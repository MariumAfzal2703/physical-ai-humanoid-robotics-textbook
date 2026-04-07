#!/bin/bash
# Deployment script for Physical AI & Humanoid Robotics Textbook backend

echo "Physical AI & Humanoid Robotics Textbook - Backend Deployment Script"
echo "=================================================================="

echo ""
echo "Before running this script, ensure you have:"
echo "1. Set up Qdrant Cloud (vector database for RAG)"
echo "2. Set up Neon PostgreSQL (authentication database)"
echo "3. Obtained Groq API key"
echo "4. Configured GitHub OAuth app for authentication"
echo ""

read -p "Have you completed the prerequisites? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please complete the prerequisites before continuing."
    exit 1
fi

echo ""
echo "Creating production environment file..."

cat > .env.prod << 'EOF'
# Production environment variables for Physical AI & Humanoid Robotics Textbook Backend

# Frontend origins (for CORS)
FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app
DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app

# Database
NEON_DATABASE_URL=

# Vector database for RAG
QDRANT_URL=
QDRANT_API_KEY=

# LLM providers
GROQ_API_KEY=
GOOGLE_API_KEY=

# OAuth providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
EOF

echo "Production environment file created: .env.prod"
echo "Please fill in the required values in the .env.prod file."
echo ""
echo "For deployment to Render/Railway/Heroku:"
echo "1. Upload the backend/ directory"
echo "2. Set environment variables from .env.prod"
echo "3. Use 'uvicorn main:app --host 0.0.0.0 --port \$PORT' as the start command"
echo ""
echo "After deploying the backend, update the frontend's VITE_BACKEND_URL in .env"
echo "to point to your deployed backend URL, then redeploy the frontend."