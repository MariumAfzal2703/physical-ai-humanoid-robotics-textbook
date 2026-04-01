---
id: 002
title: Gap Analysis Fixes Constitution Update
stage: constitution
date: 2026-04-02
surface: agent
model: claude-opus-4-5
feature: none
branch: master
user: mariumafzal2703
command: update the constitution with the fixes
labels: ["constitution","gap-analysis","neon","rag","curriculum","selected-text","submission"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/002-gap-analysis-fixes-constitution-update.constitution.prompt.md
tests:
  - none
---

## Prompt

Read ./Hackathon_I__Physical_AI___Humanoid_Robotics_Textbook.md and our sp.constitution, then do a gap analysis. Output only: ✅ COMPLIANT / ⚠️ RISK (with fix) / ❌ MISSING (with exact line to add to constitution)

[follow-up] update the constitution with the fixes

## Response snapshot

Constitution bumped from v1.0.0 → v1.1.0 (MINOR). Five gap-analysis fixes applied:

1. **Principle VIII rewritten** — "Out-of-Scope Hard Exclusions" → "Deferred Features — Explicit
   Scope Decisions". Bonus features (BetterAuth, personalisation, Urdu, subagents) are now
   explicitly deferred with scoring trade-off notes, not hard-banned. Neon DB documented as
   CONDITIONAL with TODO(NEON_DECISION) and TODO(BONUS_DECISION) gates.

2. **Technology Stack Constraints table** — Added Neon Serverless Postgres row marked CONDITIONAL.
   Env var `NEON_DATABASE_URL` documented as conditional addition.

3. **Content & Quality Standards — Curriculum coverage** — Added mandatory module/week coverage
   table (4 modules, 13 weeks). Lesson completeness gate now requires weekly topic coverage.

4. **Content & Quality Standards — Selected-text RAG contract** — Added explicit requirement:
   chatbot widget MUST accept optional `context` field; frontend MUST expose text-selection
   mechanism; marked as base-score deliverable per brief line 15.

5. **Governance — Submission checklist** — Added 8-item checklist with Nov 30 2025 deadline,
   covering repo access, Vercel deployment, chatbot, selected-text flow, demo video, form,
   and both TODO resolutions.

## Outcome

- ✅ Impact: All five gap-analysis findings addressed; constitution now fully aligned with
  hackathon brief base-score requirements; two explicit decision gates (Neon, bonus features)
  prevent silent scope creep.
- 🧪 Tests: Manual validation — no unresolved bracket tokens; version line matches report;
  dates ISO format; all principles use MUST/MUST NOT language.
- 📁 Files: .specify/memory/constitution.md (updated to v1.1.0),
  history/prompts/constitution/002-gap-analysis-fixes-constitution-update.constitution.prompt.md
- 🔁 Next prompts: Resolve TODO(NEON_DECISION); run /sp.specify to begin feature spec;
  run /sp.plan for architecture plan.
- 🧠 Reflection: Changing Principle VIII from hard exclusions to explicit deferrals was the
  most impactful fix — it preserves up to 200 bonus points as an option without committing to
  them, and makes the scoring trade-off visible in the governance document.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): manual review PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a v2.0.0 amendment pathway spec if Neon is adopted
