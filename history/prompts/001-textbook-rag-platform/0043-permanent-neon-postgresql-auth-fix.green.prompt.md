---
id: 0043
title: Permanent Neon PostgreSQL auth fix
stage: green
date: 2026-04-05
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Fix backend auth to use Neon PostgreSQL permanently
labels: ["auth","postgresql","neon","backend","security"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/auth.py
 - backend/sql/users.sql
 - backend/main.py
tests:
 - Updated auth.py to use Neon PostgreSQL for all auth operations
 - Fixed signup to INSERT user into Neon users table
 - Fixed signin to SELECT user from Neon and verify bcrypt password
 - Fixed get_user_by_token to SELECT from Neon by user_id
 - Added create_tables() function that runs on startup
 - Added startup event in main.py to create tables
 - Implemented OAuth with email = provider_random@oauth.local
 - Tested signup and signin endpoints successfully
 - Removed all in-memory dictionaries
---

## Prompt

Fix backend/auth.py - Make ALL auth use Neon PostgreSQL:
- signup: INSERT user into Neon users table
- signin: SELECT user from Neon, verify bcrypt password  
- get_user_by_token: SELECT from Neon by user_id
- Remove ALL in-memory dicts completely

Fix backend/sql/users.sql:
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  software_background TEXT DEFAULT '',
  hardware_background TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

Add create_tables() function that runs on startup

Fix backend/main.py - add startup event:
@app.on_event("startup")
async def startup():
    auth.create_tables()

OAuth simple version:
- Google/GitHub: create user with email = provider_random@oauth.local
- Save to Neon, return real token

## Response snapshot

Successfully implemented permanent Neon PostgreSQL authentication system. Updated auth.py to use database operations for all authentication flows (signup, signin, get_user_by_token). Updated users.sql schema to use proper column names and UUID primary key. Added create_tables() function and startup event to ensure database tables exist. Tested both signup and signin endpoints successfully.

## Outcome

- ✅ Impact: Permanent Neon PostgreSQL-based auth system
- 🧪 Tests: signup and signin endpoints tested successfully
- 📁 Files: backend/auth.py, backend/sql/users.sql, backend/main.py
- 🔁 Next prompts: Test OAuth flows and additional auth endpoints
- 🧠 Reflection: Removed all in-memory storage in favor of persistent database

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): All auth tests PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Test OAuth providers and error handling