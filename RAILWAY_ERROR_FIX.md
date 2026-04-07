# Railway Deployment Error Fix

## Error Encountered
```
ERROR: failed to build: failed to solve: secret ID missing for "" environment variable
```
AND/OR
```
Image of size 5.6 GB exceeded limit of 4.0 GB
```
AND/OR
```
Build timed out
```

## Root Causes
1. Railway detected the root directory's Node.js project and tried to install npm packages instead of focusing on the Python backend in the `backend/` directory.
2. Docker image exceeded 4GB limit due to unnecessary files being copied.
3. Build timeout due to slow pip installations of complex packages.

## Solutions

### Fix 1: Directory Configuration (Already Applied)
Ensure Railway is looking only at the backend directory, not the root directory.

### Fix 2: Image Size & Build Time Optimization (NEW)
I've added optimizations to reduce both image size and build time:

Files created/updated:
- `backend/.dockerignore` - Excludes unnecessary files from Docker build
- Updated `backend/Dockerfile` - Optimized multi-stage build with system deps
- `backend/Dockerfile.simple` - Alternative simple build (try this if timeout continues)
- Optimized build process to stay under 4GB limit and reduce build time

## If Timeout Persists:
If build still times out, try using the simple Dockerfile:
1. In Railway, go to Build settings
2. Change Dockerfile path to: `Dockerfile.simple`
3. This uses a single-stage build which is faster

The optimizations should fix both the timeout and image size issues.

### Immediate Fix
1. **Delete the current failed project** in Railway dashboard
2. **Recreate with correct settings**:

### Correct Deployment Process
1. Go to: https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub Repo"
3. **Crucial Step**: In the "Directory" field, enter: `backend`
4. Select your repository
5. This ensures Railway only looks at the Python backend

### Alternative: Create New Railway Project for Backend Only
If you continue having issues, create a temporary copy of just the backend:

```bash
# Create a new directory with only backend
mkdir textbook-backend-only
cp -r backend/* textbook-backend-only/
cd textbook-backend-only
```

Then connect this directory to a new Railway project.

### Verification
After fixing, your Railway project should:
- Show Python runtime detection
- Install packages from `requirements.txt`
- Use the Dockerfile in the backend directory
- Not try to install npm packages

### Environment Variables
Remember to set after successful deployment:
- `FRONTEND_ORIGIN` - Your Netlify URL
- `DEPLOYED_FRONTEND_ORIGIN` - Your Netlify URL  
- `QDRANT_URL` - From Qdrant Cloud
- `QDRANT_API_KEY` - From Qdrant Cloud
- `GROQ_API_KEY` - From Groq Console
- `NEON_DATABASE_URL` - From Neon Tech
- `GITHUB_CLIENT_ID` - From GitHub OAuth App
- `GITHUB_CLIENT_SECRET` - From GitHub OAuth App