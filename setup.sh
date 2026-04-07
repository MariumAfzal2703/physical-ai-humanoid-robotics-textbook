#!/bin/bash
# Setup script for Physical AI & Humanoid Robotics Textbook

echo "Physical AI & Humanoid Robotics Textbook - Setup Script"
echo "====================================================="

echo ""
echo "This script will help you:"
echo "1. Verify the frontend is working"
echo "2. Prepare for backend deployment"
echo "3. Provide deployment instructions"
echo ""

# Check if frontend is working
echo "Checking frontend status..."
if curl -s -o /dev/null -w "%{http_code}" https://physical-ai-humanoid-robotics-textb-sable.vercel.app | grep -q "200"; then
    echo "✓ Frontend is accessible at https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
else
    echo "! Frontend may not be accessible"
fi

echo ""
echo "Backend Setup Instructions:"
echo "---------------------------"
echo "1. The backend is located in the 'backend/' directory"
echo "2. To deploy the backend, follow the instructions in BACKEND_RENDER_DEPLOYMENT.md"
echo "3. You will need to set up these services:"
echo "   - Qdrant Cloud (vector database for RAG)"
echo "   - Neon PostgreSQL (authentication database)"
echo "   - Groq API key (for LLM)"
echo "   - GitHub OAuth app (for authentication)"
echo ""
echo "4. After deploying the backend:"
echo "   - Update VITE_BACKEND_URL in .env with your backend URL"
echo "   - Redeploy the frontend to Vercel"
echo ""

echo "Files created for deployment:"
echo "- backend/Dockerfile"
echo "- backend/docker-compose.yml"
echo "- backend/Procfile"
echo "- backend/render.yaml"
echo "- BACKEND_DEPLOYMENT.md"
echo "- BACKEND_RENDER_DEPLOYMENT.md"
echo "- deploy_backend.sh"
echo ""

echo "To run the deployment script: ./deploy_backend.sh"
echo ""

echo "Setup complete! Refer to the documentation for next steps."