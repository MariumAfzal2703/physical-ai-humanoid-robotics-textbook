---
id: 0007
title: Explain commit pr skill
stage: explainer
date: 2026-04-02
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: 001-textbook-rag-platform
user: Marium Afzal
command: "Agar chaho to ab next step mein: sp.git.commit_pr chala ke PR bana deta hoon, yeh kis lea use krte hain??"
labels: ["explainer","git","pr"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/001-textbook-rag-platform/0007-explain-commit-pr-skill.explainer.prompt.md
tests:
 - none
---

## Prompt

Agar chaho to ab next step mein:
- sp.git.commit_pr chala ke PR bana deta hoon, yeh kis lea use krte hain??

## Response snapshot

Explained that `sp.git.commit_pr` is used to automate the full Git workflow (status/diff review, commit creation, push, PR creation with summary and test plan), especially when user wants a clean handoff for review.

## Outcome

- ✅ Impact: User now has clarity on when and why to use `sp.git.commit_pr`.
- 🧪 Tests: Not required for explanation-only response.
- 📁 Files: Added explainer PHR.
- 🔁 Next prompts: User can request PR creation or continue implementation phases.
- 🧠 Reflection: Keep skill explanations practical and decision-oriented.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): quick-explainer
- Next experiment (smallest change to try): Pair explanations with a concrete “when to use” checklist.
