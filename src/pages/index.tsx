import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroSection from '../components/HeroSection';
import LiveReadersPill from '../components/LiveReadersPill';
import StatsRow from '../components/StatsRow';
import ModuleCards from '../components/ModuleCards';
import TechStackPills from '../components/TechStackPills';
import FeatureCards from '../components/FeatureCards';
import ReaderFeedback from '../components/ReaderFeedback';

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics Textbook`}
      description="Learn Physical AI and Humanoid Robotics with ROS 2, Gazebo, NVIDIA Isaac, and VLA Systems. Built with Claude Code & Spec-Kit Plus.">

      {/* Section Divider */}
      <div className="section-divider" />

      <HeroSection />

      <LiveReadersPill />

      <StatsRow />

      {/* Section Divider */}
      <div className="section-divider" />

      <ModuleCards />

      {/* Section Divider */}
      <div className="section-divider" />

      <TechStackPills />

      {/* Section Divider */}
      <div className="section-divider" />

      <FeatureCards />

      {/* Section Divider */}
      <div className="section-divider" />

      <ReaderFeedback />

    </Layout>
  );
}
