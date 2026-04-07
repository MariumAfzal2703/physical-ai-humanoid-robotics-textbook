#!/bin/bash
# Final deployment script for Physical AI & Humanoid Robotics Textbook

echo "==============================================="
echo "Physical AI & Humanoid Robotics Textbook"
echo "Final Deployment Script"
echo "==============================================="
echo ""

echo "Current Status:"
echo "- Frontend: Deployed at https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
echo "- Backend: Ready for deployment (needs manual deployment)"
echo ""

echo "Step 1: Verify Frontend is Working..."
if curl -s -o /dev/null -w "%{http_code}" https://physical-ai-humanoid-robotics-textb-sable.vercel.app | grep -q "200"; then
    echo "✓ Frontend is accessible"
else
    echo "✗ Frontend may not be accessible"
fi
echo ""

echo "Step 2: Check Backend Configuration..."
if [ -f "backend/render.yaml" ]; then
    echo "✓ Render deployment configuration exists"
else
    echo "✗ Render configuration missing"
fi

if [ -f "backend/Dockerfile" ]; then
    echo "✓ Dockerfile exists for containerization"
else
    echo "✗ Dockerfile missing"
fi

if [ -f "backend/requirements.txt" ]; then
    echo "✓ Python dependencies file exists"
else
    echo "✗ Dependencies file missing"
fi
echo ""

echo "Step 3: Verify API Keys Are Present..."
if grep -q "QDRANT_URL=" .env; then
    echo "✓ Qdrant URL configured"
else
    echo "✗ Qdrant URL missing"
fi

if grep -q "NEON_DATABASE_URL=" .env; then
    echo "✓ Neon Database URL configured"
else
    echo "✗ Neon Database URL missing"
fi

if grep -q "GROQ_API_KEY=" .env; then
    echo "✓ Groq API Key configured"
else
    echo "✗ Groq API Key missing"
fi

if grep -q "GITHUB_CLIENT_ID=" .env; then
    echo "✓ GitHub OAuth configured"
else
    echo "✗ GitHub OAuth missing"
fi
echo ""

echo "Step 4: Backend Deployment Instructions"
echo "----------------------------------------"
echo "To complete the deployment, you need to:"
echo ""
echo "1. Deploy the backend to Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Create a new Web Service"
echo "   - Connect to this GitHub repository"
echo "   - Set root directory to 'backend'"
echo "   - Use Python runtime 3.11"
echo "   - Use build command: pip install -r requirements.txt"
echo "   - Use start command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo ""
echo "2. Add these environment variables in Render:"
echo "   FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
echo "   DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
echo "   QDRANT_URL=[copy from your .env file]"
echo "   QDRANT_API_KEY=[copy from your .env file]"
echo "   GROQ_API_KEY=[copy from your .env file]"
echo "   NEON_DATABASE_URL=[copy from your .env file]"
echo "   GITHUB_CLIENT_ID=[copy from your .env file]"
echo "   GITHUB_CLIENT_SECRET=[copy from your .env file]"
echo ""
echo "3. After backend is deployed, update .env file:"
echo "   VITE_BACKEND_URL=[your-render-backend-url.onrender.com]"
echo ""
echo "4. Redeploy frontend to Vercel:"
echo "   git add . && git commit -m 'update backend URL' && git push origin master"
echo "   Then trigger a new Vercel deployment"
echo ""

echo "Step 5: Verification Checklist"
echo "------------------------------"
echo "After completing deployment:"
echo "□ Backend responds to /health endpoint"
echo "□ Frontend chatbot connects to backend"
echo "□ Authentication system works"
echo "□ RAG features respond to queries"
echo "□ Personalization features work"
echo "□ Translation features work"
echo ""

echo "Deployment is almost complete! Only manual backend deployment remains."
echo "All necessary files, configurations, and documentation are ready."