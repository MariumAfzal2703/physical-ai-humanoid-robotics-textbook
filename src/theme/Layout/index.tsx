import React, { useState, useEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';

const Layout = (props) => {
  const [progress, setProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [AnimatedCanvasComponent, setAnimatedCanvasComponent] = useState(null);
  const [FloatingChatbotComponent, setFloatingChatbotComponent] = useState(null);

  // Only run effects on client side
  useEffect(() => {
    setMounted(true);

    // Dynamically import heavy components only on client
    import('../../components/AnimatedCanvas').then((mod) => {
      setAnimatedCanvasComponent(() => mod.default);
    });

    import('../../components/FloatingChatbot').then((mod) => {
      setFloatingChatbotComponent(() => mod.default);
    });

    // Scroll progress effect
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Smooth following for ring cursor
      setRingPosition(prev => ({
        x: prev.x + (e.clientX - prev.x) * 0.12,
        y: prev.y + (e.clientY - prev.y) * 0.12
      }));
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted]);

  return (
    <>
      <OriginalLayout {...props}>
        {props.children}
      </OriginalLayout>

      {/* Animated Background Canvas - only render on client side with dynamic import */}
      {mounted && AnimatedCanvasComponent && <AnimatedCanvasComponent />}

      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          transition: 'width 0.05s ease',
        }}
      />

      {/* Custom Cursor - only render on client side */}
      {mounted && cursorVisible && (
        <>
          <div
            className="custom-cursor-dot"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}
          />
          <div
            className="custom-cursor-ring"
            style={{
              left: `${ringPosition.x}px`,
              top: `${ringPosition.y}px`,
            }}
          />
        </>
      )}

      {/* Floating Chatbot - only render on client side with dynamic import */}
      {mounted && FloatingChatbotComponent && <FloatingChatbotComponent />}
    </>
  );
};

export default Layout;