import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1 - ROS 2 Foundations',
      items: [
        {
          type: 'doc',
          id: 'module-1-ros2/overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'module-1-ros2/nodes-topics-qos',
          label: 'Nodes, Topics, and QoS',
        },
        {
          type: 'doc',
          id: 'module-1-ros2/launch-params-debugging',
          label: 'Launch, Parameters, and Debugging',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 2 - Simulation',
      items: [
        {
          type: 'doc',
          id: 'module-2-simulation/overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'module-2-simulation/deterministic-scenarios',
          label: 'Deterministic Scenarios',
        },
        {
          type: 'doc',
          id: 'module-2-simulation/metrics-regression-gates',
          label: 'Metrics and Regression Gates',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 3 - Isaac Workflows',
      items: [
        {
          type: 'doc',
          id: 'module-3-isaac/overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'module-3-isaac/isaac-observation-action-interfaces',
          label: 'Observation and Action Interfaces',
        },
        {
          type: 'doc',
          id: 'module-3-isaac/policy-runtime-diagnostics',
          label: 'Policy Runtime Diagnostics',
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 4 - VLA Systems',
      items: [
        {
          type: 'doc',
          id: 'module-4-vla/overview',
          label: 'Overview',
        },
        {
          type: 'doc',
          id: 'module-4-vla/grounding-and-planning',
          label: 'Grounding and Planning',
        },
        {
          type: 'doc',
          id: 'module-4-vla/action-safety-runtime-verification',
          label: 'Action Safety and Runtime Verification',
        },
        {
          type: 'doc',
          id: 'module-4-vla/capstone-autonomous-humanoid',
          label: 'Capstone: Autonomous Humanoid',
        },
      ],
    }
  ],
};

export default sidebars;
