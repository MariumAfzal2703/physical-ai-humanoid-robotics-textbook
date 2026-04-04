---
id: 0042
title: Vercel deployment fix for language switcher
stage: green
date: 2026-04-05
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Fix Vercel deployment by separating frontend from backend dependencies
labels: ["i18n","localization","deployment","vercel","bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - vercel.json
 - docusaurus.config.ts
 - i18n/ur/
tests:
 - Updated vercel.json to use static build only
 - Excluded backend dependencies from frontend deployment
 - Successful Vercel deployment with both English and Urdu locales
 - Local build and serve working correctly
---

## Prompt

Fix Vercel deployment issue where total dependency size exceeded Lambda limit (4952.86 MB vs 500 MB) by separating frontend from backend dependencies.

## Response snapshot

Successfully fixed Vercel deployment by updating vercel.json to use static build configuration that excludes backend dependencies. Changed from experimentalServices that bundled frontend and backend together to a static build that only deploys the Docusaurus frontend. Both English and Urdu locales now build and deploy successfully to Vercel.

## Outcome

- ✅ Impact: Fixed Vercel deployment with proper separation of concerns
- 🧪 Tests: npm run build successful, Vercel deployment completed without size errors
- 📁 Files: vercel.json updated to use static build
- 🔁 Next prompts: Test language switching functionality on live deployment
- 🧠 Reflection: Proper separation of frontend and backend deployments prevents dependency bloat

## Evaluation notes (flywheel)

- Failure modes observed: Lambda storage limit exceeded due to backend dependencies
- Graders run and results (PASS/FAIL): Vercel deployment PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add backend API as separate service