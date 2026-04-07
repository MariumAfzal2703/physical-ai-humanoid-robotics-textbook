#!/bin/bash
# Script to prepare and deploy the backend to Render

echo "Deploying Physical AI & Humanoid Robotics Textbook Backend to Render"
echo "==================================================================="

echo ""
echo "Step 1: Verifying backend files..."
if [ -d "backend" ]; then
    echo "✓ Backend directory found"
else
    echo "✗ Backend directory not found!"
    exit 1
fi

echo ""
echo "Step 2: Checking backend files..."
cd backend
ls -la
echo ""

echo "Step 3: Testing if backend can run locally..."
# Check if we can run the backend
if python -c "import fastapi, uvicorn, qdrant_client, openai, psycopg2" 2>/dev/null; then
    echo "✓ Required Python packages are available"
else
    echo "! Required packages not found, but this is expected in deployment environment"
fi

echo ""
echo "Step 4: Verifying deployment files..."
if [ -f "Dockerfile" ]; then
    echo "✓ Dockerfile exists"
else
    echo "✗ Dockerfile missing"
fi

if [ -f "render.yaml" ]; then
    echo "✓ render.yaml exists"
else
    echo "✗ render.yaml missing"
fi

if [ -f "Procfile" ]; then
    echo "✓ Procfile exists"
else
    echo "✗ Procfile missing"
fi

if [ -f "requirements.txt" ]; then
    echo "✓ requirements.txt exists"
else
    echo "✗ requirements.txt missing"
fi

echo ""
echo "Step 5: Preparing deployment to Render..."
echo ""
echo "To deploy this backend to Render, you need to:"
echo ""
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' -> 'Web Service'"
echo "3. Connect to your GitHub repository"
echo "4. Select this repository (physical-ai-humanoid-robotics-textbook)"
echo "5. Set the root directory to 'backend'"
echo "6. Set runtime to 'Python'"
echo "7. Set environment to Python 3.11"
echo "8. Set name to 'textbook-backend' (or your choice)"
echo "9. Set branch to 'master'"
echo ""
echo "Build Command: pip install -r requirements.txt"
echo "Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo ""
echo "Then add these environment variables in the Render dashboard:"
echo "FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
echo "DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app"
echo "QDRANT_URL=[your qdrant url]"
echo "QDRANT_API_KEY=[your qdrant api key]"
echo "GROQ_API_KEY=[your groq api key]"
echo "NEON_DATABASE_URL=[your neon db connection string]"
echo "GITHUB_CLIENT_ID=[your github oauth client id]"
echo "GITHUB_CLIENT_SECRET=[your github oauth client secret]"
echo ""
echo "After deployment, update the frontend's .env file with your backend URL:"
echo "VITE_BACKEND_URL=https://[your-service-name].onrender.com"
echo "Then redeploy the frontend to Vercel."
echo ""

echo "Deployment preparation complete!"
echo "The backend is ready to be deployed to Render."
echo ""
echo "Would you like me to provide the exact Render deployment settings in a config file?"
select yn in "Yes" "No"; do
    case $yn in
        Yes )
            cat > ../render-deployment-config.txt << 'EOF'
Render Web Service Configuration:
==============================

Service Type: Web Service
Repository: MariumAfzal2703/physical-ai-humanoid-robotics-textb-sable
Root Directory: backend
Runtime: Python
Runtime Version: 3.11
Service Name: textbook-backend (or your choice)
Branch: master

Build Command:
pip install -r requirements.txt

Start Command:
uvicorn main:app --host 0.0.0.0 --port $PORT

Environment Variables:
FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app
DEPLOYED_FRONTEND_ORIGIN=https://physical-ai-humanoid-robotics-textb-sable.vercel.app
QDRANT_URL=[your qdrant url - get from https://cloud.qdrant.io]
QDRANT_API_KEY=[your qdrant api key]
GROQ_API_KEY=[your groq api key - get from https://console.groq.com]
NEON_DATABASE_URL=[your neon db connection string - get from https://neon.tech]
GITHUB_CLIENT_ID=[your github oauth client id - get from https://github.com/settings/apps]
GITHUB_CLIENT_SECRET=[your github oauth client secret]

Plan: Free tier available (Starter plan)
Region: Choose closest to your users (e.g., Frankfurt, Virginia)
EOF
            echo "Configuration saved to render-deployment-config.txt"
            break
            ;;
        No )
            echo "Okay, skipping config file creation."
            break
            ;;
    esac
done

cd ..
echo ""
echo "Next steps:"
echo "1. Complete the Render deployment using the above instructions"
echo "2. Once backend is deployed, update .env with the backend URL"
echo "3. Redeploy frontend to Vercel"
echo "4. Full RAG functionality will be enabled"