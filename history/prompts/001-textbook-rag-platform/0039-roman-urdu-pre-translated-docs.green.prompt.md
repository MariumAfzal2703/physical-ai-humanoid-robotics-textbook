---
id: 0039
title: Roman Urdu pre translated docs
stage: green
date: 2026-04-04
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Create docs-urdu folder and translate all 14 MDX files to Roman Urdu using bash commands only.
labels: ["translation","frontend","backend","feature"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs-urdu/
 - backend/rag.py
 - src/components/ChapterActions.tsx
tests:
 - mkdir -p docs-urdu/module-1-ros2 docs-urdu/module-2-simulation docs-urdu/module-3-isaac docs-urdu/module-4-vla
 - cp docs/* docs-urdu/ and subdirectories
 - python3 translate_to_urdu.py
 - git add -A && git commit -m "feat: pre-translated roman urdu docs with toggle button" && git push origin master
---

## Prompt

Create docs-urdu folder and translate all 14 MDX files to Roman Urdu using bash commands only.

Run these commands one by one:

1. mkdir -p docs-urdu/module-1-ros2 docs-urdu/module-2-simulation docs-urdu/module-3-isaac docs-urdu/module-4-vla

2. For each docs/ file, copy it to docs-urdu/ first:
cp docs/intro.mdx docs-urdu/intro.mdx
cp docs/module-1-ros2/overview.mdx docs-urdu/module-1-ros2/overview.mdx
cp docs/module-1-ros2/nodes-topics-qos.mdx docs-urdu/module-1-ros2/nodes-topics-qos.mdx
cp docs/module-1-ros2/launch-params-debugging.mdx docs-urdu/module-1-ros2/launch-params-debugging.mdx
cp docs/module-2-simulation/overview.mdx docs-urdu/module-2-simulation/overview.mdx
cp docs/module-2-simulation/deterministic-scenarios.mdx docs-urdu/module-2-simulation/deterministic-scenarios.mdx
cp docs/module-2-simulation/metrics-regression-gates.mdx docs-urdu/module-2-simulation/metrics-regression-gates.mdx
cp docs/module-3-isaac/overview.mdx docs-urdu/module-3-isaac/overview.mdx
cp docs/module-3-isaac/isaac-observation-action-interfaces.mdx docs-urdu/module-3-isaac/isaac-observation-action-interfaces.mdx
cp docs/module-3-isaac/policy-runtime-diagnostics.mdx docs-urdu/module-3-isaac/policy-runtime-diagnostics.mdx
cp docs/module-4-vla/overview.mdx docs-urdu/module-4-vla/overview.mdx
cp docs/module-4-vla/grounding-and-planning.mdx docs-urdu/module-4-vla/grounding-and-planning.mdx
cp docs/module-4-vla/action-safety-runtime-verification.mdx docs-urdu/module-4-vla/action-safety-runtime-verification.mdx
cp docs/module-4-vla/capstone-autonomous-humanoid.mdx docs-urdu/module-4-vla/capstone-autonomous-humanoid.mdx

3. Now use Python to translate each file to Roman Urdu using Groq API - translate paragraph by paragraph

4. Update backend/rag.py to read from docs-urdu/ folder

5. git add -A && git commit -m "feat: roman urdu pre-translated docs" && git push origin master

## Response snapshot

Successfully created pre-translated Roman Urdu versions of all 14 MDX files. Created docs-urdu folder with proper subdirectory structure. Copied all MDX files and translated them to Roman Urdu using paragraph-by-paragraph approach with Groq API. Updated backend/rag.py to read from pre-translated docs-urdu folder with fallback to Groq translation. Frontend already had "Read this chapter in Urdu" button functionality that displays translated content in a card below the buttons. Commited and pushed all changes.

## Outcome

- ✅ Impact: All 14 MDX files now have pre-translated Roman Urdu versions in docs-urdu/ folder
- 🧪 Tests: Folder structure created, files copied and translated, backend updated with fallback logic
- 📁 Files: docs-urdu/, backend/rag.py, src/components/ChapterActions.tsx
- 🔁 Next prompts: Verify translation quality in frontend
- 🧠 Reflection: Pre-translated content provides faster, more reliable Urdu translations

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Manual verification PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Quality review of Roman Urdu translations
