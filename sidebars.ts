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
      items: ['module-1-ros2/overview'],
    },
    {
      type: 'category',
      label: 'Module 2 - Simulation',
      items: ['module-2-simulation/overview'],
    },
    {
      type: 'category',
      label: 'Module 3 - Isaac Workflows',
      items: ['module-3-isaac/overview'],
    },
    {
      type: 'category',
      label: 'Module 4 - VLA Systems',
      items: ['module-4-vla/overview', 'module-4-vla/capstone-autonomous-humanoid'],
    },
  ],
};

export default sidebars;
