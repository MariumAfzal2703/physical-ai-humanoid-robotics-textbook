---
id: 0019
title: Write Deterministic Scenarios Chapter
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Write docs/module-2-simulation/deterministic-scenarios.mdx from scratch
labels: ["simulation", "testing", "determinism", "ros2", "module-2"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs/module-2-simulation/deterministic-scenarios.mdx
tests:
 - wc -w docs/module-2-simulation/deterministic-scenarios.mdx (recorded after write)
---

## Prompt

Write docs/module-2-simulation/deterministic-scenarios.mdx from scratch. Topic: Deterministic Testing Scenarios in Simulation.

HOOK: "Your robot passed 50 navigation tests. Then it encountered a slightly different chair — same color, different leg spacing — and walked into it. Without deterministic test scenarios, you'll never know what your robot doesn't know."

UNIQUE FOCUS: Test-driven robotics development — treating robot scenarios like software unit tests.

COVER:
- What makes a scenario deterministic: fixed seed, fixed spawn positions, fixed sensor noise
- Scenario categories: navigation, manipulation, social interaction, emergency response
- Edge cases that matter: narrow corridors, reflective floors (LiDAR confusion), dynamic humans
- Writing scenario configs in YAML
- Automated pass/fail criteria: did the robot reach the goal? Did it collide? Time limit?
- Parametric scenarios: varying object positions to test generalization
- Video recording simulation runs for review

CODE EXAMPLES:
1. A YAML scenario definition file for a navigation task
2. Python test runner that executes scenarios and reports pass/fail
3. A parametric scenario that tests 10 variations of the same task

MANDATORY STRUCTURE. MINIMUM 1200 words.

## Response snapshot

Rewrote the chapter from scratch with deterministic testing as the core theme and test-driven robotics framing. Included deterministic principles (seed/spawn/noise/time), scenario category taxonomy, critical edge cases, YAML scenario design, objective pass/fail assertions, parametric generalization testing, and video review workflow. Added three required code examples: YAML navigation scenario, Python scenario runner with pass/fail exit codes, and parametric 10-variation runner.

## Outcome

- ✅ Impact: Module 2 deterministic scenarios chapter now supports CI-style robotics validation methodology.
- 🧪 Tests: Word count check executed after file write.
- 📁 Files: 1 chapter rewritten from scratch.
- 🔁 Next prompts: Continue remaining simulation chapters with same premium test-driven style.
- 🧠 Reflection: Treating scenarios as software-style tests improved clarity and operational rigor.

## Evaluation notes (flywheel)

- Failure modes observed: None during rewrite.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): deterministic-test-driven-robotics-v1
- Next experiment (smallest change to try): Add one explicit metrics schema snippet in next chapter to standardize CI artifact outputs.