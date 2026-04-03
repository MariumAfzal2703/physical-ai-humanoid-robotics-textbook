---
id: 0023
title: Write Policy Runtime Diagnostics
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Write docs/module-3-isaac/policy-runtime-diagnostics.mdx from scratch
labels: ["isaac", "deployment", "sim-to-real", "runtime-diagnostics", "module-3"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs/module-3-isaac/policy-runtime-diagnostics.mdx
tests:
 - wc -w docs/module-3-isaac/policy-runtime-diagnostics.mdx (recorded after write)
---

## Prompt

Write docs/module-3-isaac/policy-runtime-diagnostics.mdx from scratch. Topic: Policy Deployment and Runtime Diagnostics.

HOOK: "Your robot trained for 10 GPU-hours. The policy looks great in simulation — 95% success rate. You deploy it to the real robot. It takes two steps and falls over. Welcome to the sim-to-real gap. This chapter teaches you how to survive it."

UNIQUE FOCUS: The diagnostic and debugging process after training — this is where most students get stuck and most tutorials end before covering it.

COVER:
- Exporting trained policies: PyTorch → ONNX → TensorRT for deployment
- Runtime inference pipeline: sensor → preprocessing → policy → postprocessing → actuator
- Sim-to-real transfer techniques: actuator net, domain randomization review, system identification
- Runtime diagnostics: what to log, how to visualize in real-time
- Common failure modes: policy drift, joint limit violations, unexpected sensor readings
- Safe deployment protocol: velocity limits, emergency stop integration, human override
- Monitoring with ROS 2 diagnostics and rqt

CODE EXAMPLES:
1. ONNX export script for a trained Isaac Lab policy
2. ROS 2 node that runs policy inference and publishes joint commands
3. Runtime diagnostic monitor with threshold alerts

MANDATORY STRUCTURE. MINIMUM 1200 words. Include failure mode diagnosis table.

## Response snapshot

Rewrote the chapter from scratch with post-training deployment diagnostics as the central narrative. Included export pipeline (PyTorch→ONNX→TensorRT), real-time inference dataflow, sim-to-real transfer hardening (actuator modeling, randomization audit, system ID), runtime logging strategy, failure mode diagnosis table, safe deployment protocol, and ROS 2 diagnostics/rqt monitoring guidance. Added all required code examples: ONNX exporter, inference ROS node, and runtime diagnostic alert monitor.

## Outcome

- ✅ Impact: Module 3 now covers the most critical deployment/debugging stage that beginners usually miss.
- 🧪 Tests: Word count check executed after rewrite.
- 📁 Files: 1 chapter file rewritten from scratch.
- 🔁 Next prompts: Continue remaining advanced chapters with same deployment-first rigor.
- 🧠 Reflection: Emphasizing diagnostic signals and containment procedures improves real-world safety readiness.

## Evaluation notes (flywheel)

- Failure modes observed: None during rewrite.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): isaac-runtime-diagnostics-v1
- Next experiment (smallest change to try): Add one compact deployment-state machine diagram in next runtime chapter for quick operator mental model.