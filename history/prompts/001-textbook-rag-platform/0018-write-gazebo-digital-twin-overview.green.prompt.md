---
id: 0018
title: Write Gazebo Digital Twin Overview
stage: green
date: 2026-04-03
surface: agent
model: claude-sonnet-4-6
feature: 001-textbook-rag-platform
branch: master
user: Marium Afzal
command: Write docs/module-2-simulation/overview.mdx from scratch
labels: ["gazebo", "simulation", "ros2", "module-2", "digital-twin"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs/module-2-simulation/overview.mdx
tests:
 - wc -w docs/module-2-simulation/overview.mdx (recorded after write)
---

## Prompt

Write docs/module-2-simulation/overview.mdx from scratch. Topic: Gazebo Simulation — The Digital Twin.

HOOK: "You cannot crash a $150,000 humanoid robot to test if your navigation code works. You cannot flood a real kitchen with your robot's failed grasping attempts. Simulation exists so you can fail safely — a thousand times — before your robot touches the real world."

UNIQUE ANGLE: Contrast Gazebo Classic vs Gazebo Harmonic (new). Most tutorials use old Gazebo — explain what changed and why it matters.

COVER:
- The "sim-to-real gap" problem: why robots trained in simulation sometimes fail in reality
- Gazebo's physics engines: ODE, Bullet, DART — when to use which
- SDF (Simulation Description Format) vs URDF — key differences
- World files: building a kitchen/warehouse environment for your humanoid
- Sensors in simulation: RGB camera, depth camera, LiDAR, IMU — how to configure them
- ROS 2 ↔ Gazebo bridge: the gz_ros2_control package
- Headless simulation for CI/CD pipelines

CODE EXAMPLES:
1. A complete SDF world file with a room, table, and objects
2. ROS 2 launch file that starts Gazebo with a humanoid robot loaded
3. Python script to spawn objects into a running Gazebo simulation

MANDATORY STRUCTURE with all required sections.
MINIMUM 1200 words. Include a table: Gazebo Classic vs Gazebo Harmonic differences.

## Response snapshot

Rewrote the module overview chapter from scratch with the exact hook and required structure. Centered the chapter on digital twin workflow and practical transfer to real humanoid systems. Included Gazebo Classic vs Harmonic comparison table, sim-to-real gap mitigation strategy, ODE/Bullet/DART guidance, SDF vs URDF explanation, world modeling guidance, simulated sensor configuration, gz_ros2_control integration notes, headless CI/CD practices, and all three requested code examples (SDF world, ROS 2 launch, object spawning script).

## Outcome

- ✅ Impact: Module 2 overview now matches premium simulation-first curriculum depth and modern Gazebo direction.
- 🧪 Tests: Word count check executed after file write.
- 📁 Files: 1 file rewritten from scratch.
- 🔁 Next prompts: Continue remaining simulation chapters with same style and implementation depth.
- 🧠 Reflection: Kept focus on modern Gazebo migration context to avoid stale tutorial patterns.

## Evaluation notes (flywheel)

- Failure modes observed: None during rewrite.
- Graders run and results (PASS/FAIL): Not run.
- Prompt variant (if applicable): gazebo-harmonic-digital-twin-v1
- Next experiment (smallest change to try): Run lessons validator after the next two chapter rewrites to detect heading/format drift early.