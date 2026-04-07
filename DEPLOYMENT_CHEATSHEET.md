# Physical AI & Humanoid Robotics Textbook - Deployment Quick Reference

## Pre-requisites
- Railway account: https://railway.app
- Netlify account: https://netlify.com
- API keys from: Qdrant, Neon, Groq, GitHub OAuth

## Deployment Order
1. Backend (Railway) → Get URL → Frontend (Netlify)

---

## BACKEND DEPLOYMENT (Railway)

### Via Web Dashboard:
1. Go to Railway dashboard
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo → CRITICAL: Enter "backend" in the Directory field
4. This ensures Railway only looks at the Python backend
5. Add environment variables:
```
FRONTEND_ORIGIN=https://your-site.netlify.app
DEPLOYED_FRONTEND_ORIGIN=https://your-site.netlify.app
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GROQ_API_KEY=your_groq_api_key
NEON_DATABASE_URL=your_neon_connection_string
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Via CLI:
```bash
cd backend/
railway login
railway init
railway up
```

### Get Backend URL:
- From Railway dashboard: `https://xxxx-production.up.railway.app`
- Test: `https://your-url.up.railway.app/health` → should return `{"status": "ok"}`

---

## FRONTEND DEPLOYMENT (Netlify)

### Update .env file:
```
VITE_BACKEND_URL=https://your-railway-url.up.railway.app
DOCS_SITE_URL=https://your-site.netlify.app
DEPLOYED_FRONTEND_ORIGIN=https://your-site.netlify.app
```

### Build:
```bash
npm run build:netlify
```

### Deploy to Netlify:
1. Go to Netlify dashboard
2. "Add new site" → "Drag and drop" → select `build/` folder
OR
```bash
netlify deploy --dir=build --prod
```

### Get Frontend URL:
- From Netlify: `https://your-site.netlify.app`

---

## ENVIRONMENT VARIABLES SUMMARY

### Backend (set in Railway):
- `FRONTEND_ORIGIN` - Your Netlify URL
- `DEPLOYED_FRONTEND_ORIGIN` - Your Netlify URL  
- `QDRANT_URL` - From Qdrant Cloud
- `QDRANT_API_KEY` - From Qdrant Cloud
- `GROQ_API_KEY` - From Groq Console
- `NEON_DATABASE_URL` - From Neon Tech
- `GITHUB_CLIENT_ID` - From GitHub OAuth App
- `GITHUB_CLIENT_SECRET` - From GitHub OAuth App

### Frontend (set in .env before building):
- `VITE_BACKEND_URL` - Your Railway backend URL
- `DOCS_SITE_URL` - Your Netlify URL
- `DEPLOYED_FRONTEND_ORIGIN` - Your Netlify URL

---

## REQUIRED EXTERNAL SERVICES

1. **Qdrant Cloud** - Vector database for RAG
   - URL: https://cloud.qdrant.io
   - Get: URL + API Key

2. **Neon PostgreSQL** - Database for users/chat history
   - URL: https://neon.tech
   - Get: Connection string

3. **Groq API** - AI inference
   - URL: https://console.groq.com
   - Get: API Key

4. **GitHub OAuth App** - Authentication
   - URL: https://github.com/settings/apps
   - Create OAuth App with callback: `https://your-site.netlify.app/api/auth/callback/github`
   - Get: Client ID + Client Secret

---

## TROUBLESHOOTING

### Backend Issues:
- Check Railway logs: `railway logs`
- Verify all environment variables are set
- Test health endpoint: `/health`

### Frontend Issues:
- Ensure `VITE_BACKEND_URL` is correct
- Check browser console for errors
- Verify build completed without errors

### Feature Issues:
- Chatbot: Verify backend URL connectivity
- Authentication: Check GitHub OAuth settings
- Personalization/Translation: Confirm backend API access

---

## VERIFICATION CHECKLIST

□ Backend deployed with health check returning `{"status": "ok"}`
□ Frontend deployed and accessible
□ Galaxy background animation working
□ Chatbot connects to backend and responds
□ Login/signup functionality working
□ Personalization features functional
□ Translation features working
□ All animations smooth and responsive
□ Mobile responsiveness verified