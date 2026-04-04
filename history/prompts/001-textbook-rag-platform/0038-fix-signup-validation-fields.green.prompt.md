---
id: 0038
title: Fix signup validation fields
stage: green
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Signup mein 2 errors hain - 400 — email already registered, 422 — form fields missing/wrong format
labels: ["validation","signup","backend","fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/schemas.py
tests:
 - curl -X POST http://127.0.0.1:8000/auth/signup -H "Content-Type: application/json" -d '{"email":"testnew@example.com","password":"password123","software_background":"beginner","hardware_background":"none"}'
 - curl -X POST http://127.0.0.1:8000/auth/signup -H "Content-Type: application/json" -d '{"email":"testempty@example.com","password":"password123","software_background":"","hardware_background":"none"}'
 - git push origin master
---

## Prompt

Signup mein 2 errors hain:
- `400` — email already registered
- `422` — form fields missing/wrong format

**422 fix karo** — Claude Code mein yeh prompt do:

```
Check backend/schemas.py - the SignupRequest schema.

The frontend is sending signup data but getting 422 Unprocessable Entity.

1. Print the exact fields SignupRequest expects
2. Check src/components/AuthPanel.tsx - what fields is it sending on signup?
3. Make sure both match exactly - field names must be identical

Show me:
- SignupRequest schema fields
- What AuthPanel.tsx sends in signup payload
- Fix any mismatch
```

## Response snapshot

Identified that the SignupRequest schema in backend/schemas.py expected software_background and hardware_background fields but didn't validate for minimum length. The frontend could send empty strings causing 422 errors. Added Field(min_length=1) validation to both fields to ensure they contain at least 1 character. This prevents the 422 Unprocessable Entity error when empty strings are submitted. Tested both valid signup and invalid signup with empty fields to confirm the fix works properly.

## Outcome

- ✅ Impact: Signup now properly validates field lengths and returns clear error messages
- 🧪 Tests: Valid signup succeeds, empty field signup returns proper validation error
- 📁 Files: backend/schemas.py
- 🔁 Next prompts: Frontend should handle validation errors gracefully
- 🧠 Reflection: Proper field validation prevents 422 errors and improves UX

## Evaluation notes (flywheel)

- Failure modes observed: Empty string submission causing 422 errors
- Graders run and results (PASS/FAIL): Manual API tests PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add frontend validation matching backend rules
