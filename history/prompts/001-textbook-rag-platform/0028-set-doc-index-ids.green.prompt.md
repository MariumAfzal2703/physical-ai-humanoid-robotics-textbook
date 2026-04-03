---
id: 0028
title: Set Doc Index IDs
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Fix Docusaurus sidebar index IDs to match docs
labels: ["docusaurus", "sidebar", "docs", "build-fix", "index-ids"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - sidebars.ts
 - docs/Module-1 ROS 2 Communication + contracts/Chapter-1 overview.mdx
 - docs/Module-1 ROS 2 Communication + contracts/Chapter-2 nodes-topics-qos.mdx
 - docs/Module-1 ROS 2 Communication + contracts/Chapter-3 launch-params-debugging.mdx
 - docs/Module-2 Gazebo Physics simulation + regression/Chapter-4 overview.mdx
 - docs/Module-2 Gazebo Physics simulation + regression/Chapter-5 deterministic-scenarios.mdx
 - docs/Module-2 Gazebo Physics simulation + regression/Chapter-6 metrics-regression-gates.mdx
 - docs/Module-3 Isaac Scale, synthetic data, diagnostics/Chapter-7 overview.mdx
 - docs/Module-3 Isaac Scale, synthetic data, diagnostics/Chapter-8 isaac-observation-action-interfaces.mdx
 - docs/Module-3 Isaac Scale, synthetic data, diagnostics/Chapter-9 policy-runtime-diagnostics.mdx
 - docs/Module-4 VLA Language-grounded action planning/Chapter-10 overview.mdx
 - docs/Module-4 VLA Language-grounded action planning/Chapter-11 grounding-and-planning.mdx
 - docs/Module-4 VLA Language-grounded action planning/Chapter-12 action-safety-runtime-verification.mdx
 - docs/Module-4 VLA Language-grounded action planning/Chapter-14 capstone-autonomous-humanoid.mdx
tests:
 - npm run build (PASS)
---

## Prompt

yeah this new no i want please set this index ids

## Response snapshot

Mapped sidebar document IDs to the actual generated doc IDs from the current folder naming scheme and removed invalid slash-based frontmatter IDs. Updated `sidebars.ts` module entries to use the real IDs (with module folder names and chapter filenames). Re-ran Docusaurus build to verify successful compilation.

## Outcome

- ✅ Impact: Website now resolves sidebar document IDs correctly and builds successfully.
- 🧪 Tests: `npm run build` passed.
- 📁 Files: Sidebar mappings fixed and temporary invalid ID edits reverted.
- 🔁 Next prompts: Optionally align `scripts/validate_lessons.py` glob with current docs folder naming.
- 🧠 Reflection: In Docusaurus, IDs must align with resolved doc paths unless explicitly configured with valid per-doc IDs.

## Evaluation notes (flywheel)

- Failure modes observed: Initial attempt using slash-based frontmatter `id` failed because Docusaurus rejects slashes in `id`.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): sidebar-index-id-alignment-v1
- Next experiment (smallest change to try): Update lesson validator glob to include `docs/Module-*` directories.
