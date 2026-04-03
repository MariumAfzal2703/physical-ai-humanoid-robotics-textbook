---
id: 0016
title: Write Nodes Topics QoS Chapter
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Write docs/module-1-ros2/nodes-topics-qos.mdx from scratch
labels: ["ros2", "qos", "docs", "module-1"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs/module-1-ros2/nodes-topics-qos.mdx
tests:
 - Not run (content authoring request)
---

## Prompt

Write docs/module-1-ros2/nodes-topics-qos.mdx from scratch. Topic: Nodes, Topics, and QoS in ROS 2.

HOOK: "Your humanoid robot is navigating a warehouse. Its camera node publishes 30 frames/second. Suddenly, the network gets congested. Does your navigation system crash, freeze, or gracefully drop old frames and continue? That decision is QoS."

UNIQUE FOCUS: QoS (Quality of Service) is what separates toy ROS 2 code from production robot code. Make this the star of the chapter.

COVER WITH DEPTH:
- Node lifecycle: unconfigured → inactive → active → finalized (with state machine Mermaid diagram)
- Topic namespacing: /robot1/camera/image vs /robot2/camera/image — why namespacing prevents chaos in multi-robot systems
- QoS profiles in detail: RELIABLE vs BEST_EFFORT, VOLATILE vs TRANSIENT_LOCAL (use WhatsApp vs live stream analogy)
- The 6 QoS policies: history, depth, reliability, durability, deadline, liveliness
- When QoS mismatch causes silent communication failure (common beginner mistake)
- Publisher and subscriber with matching QoS profiles

CODE EXAMPLES:
1. A node that publishes robot velocity commands with RELIABLE QoS
2. A subscriber that receives sensor data with BEST_EFFORT QoS
3. How to check QoS compatibility with ros2 topic info -v

MANDATORY STRUCTURE with exact headings matching the template.
MINIMUM 1200 words. Include comparison table: RELIABLE vs BEST_EFFORT with robot use cases.

## Response snapshot

Rewrote the chapter from scratch with the required structure and emphasis on production QoS. Included: exact hook, lifecycle coverage with Mermaid state machine, multi-robot namespacing section, detailed QoS explanation with WhatsApp/live-stream analogy, all 6 QoS policies, silent mismatch diagnosis, RELIABLE-vs-BEST_EFFORT comparison table with use cases, three required code examples, practice exercises, and key takeaways.

## Outcome

- ✅ Impact: Module 1 QoS chapter now follows premium long-form instructional style with production-first focus.
- 🧪 Tests: Not run (request was chapter authoring only).
- 📁 Files: 1 chapter file rewritten from scratch.
- 🔁 Next prompts: Continue rewriting remaining MDX chapters in the same premium style.
- 🧠 Reflection: Prioritized strict requirement matching and production robotics framing over generic tutorial prose.

## Evaluation notes (flywheel)

- Failure modes observed: Initial write attempt failed because file was not read first; resolved by reading then rewriting.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): direct-constraint-premium-rewrite-v1
- Next experiment (smallest change to try): Run lesson validator after next chapter rewrite batch to catch heading/format drift early.