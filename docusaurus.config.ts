import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  title: 'Physical AI & Humanoid Robotics Textbook | Marium Afzal',
  tagline: 'From Code to Motion — Intelligence Meets Reality',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  markdown: {
    mermaid: false,
  },

  themes: [],

  plugins: [],

  url: 'https://physical-ai-humanoid-robotics-textb-sable.vercel.app',
  baseUrl: '/',

  organizationName: 'mariumafzal2703',
  projectName: 'PIAIC-Hackathons',

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
      }
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // SEO metadata
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      { name: 'description', content: 'Learn Physical AI and Humanoid Robotics with ROS 2, Gazebo, NVIDIA Isaac, and VLA Systems. AI-native textbook with Urdu translation, RAG chatbot, and personalized learning. By Marium Afzal, AI Engineer at PIAIC.' },
      { name: 'keywords', content: 'Physical AI, Humanoid Robotics, ROS 2, Gazebo, NVIDIA Isaac, VLA, Pakistan, PIAIC, Urdu, AI textbook, Marium Afzal' },
      { property: 'og:title', content: 'Physical AI & Humanoid Robotics Textbook | Marium Afzal' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Physical AI Textbook',
      logo: {
        alt: 'Physical AI Textbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Curriculum',
        },
        {
          label: 'Login',
          position: 'right',
          to: '/docs/intro?auth=1',
          className: 'navbar-login-trigger',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            {
              label: 'All Modules',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;