import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const phrases = [
    "From Code to Motion — Intelligence Meets Reality",
    "ROS 2 · Gazebo · NVIDIA Isaac · VLA Systems",
    "Bridging Digital Minds with Physical Worlds",
    "Theory → Simulation → Physical Deployment"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(56); // ms per character

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
          setTypingSpeed(56);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));
          setTypingSpeed(36);
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? typingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Match cursor blink rate

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '80px 20px 40px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Badge Pill */}
      <div
        style={{
          background: 'rgba(247,37,133,.08)',
          border: '1px solid rgba(247,37,133,.25)',
          color: 'var(--pink-soft)',
          borderRadius: '100px',
          padding: '5px 14px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeUp 0.6s ease forwards',
          opacity: 0,
          transform: 'translateY(22px)',
          animationDelay: '0.2s',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#f72585',
            animation: 'blink 1.5s infinite',
          }}
        ></div>
        AI-Native Textbook · Panaversity Hackathon I
      </div>

      {/* H1 Title */}
      <h1
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
          letterSpacing: '-2px',
          lineHeight: '1.05',
          margin: '0 0 24px',
          animation: 'fadeUp 0.7s ease forwards',
          opacity: 0,
          transform: 'translateY(22px)',
          animationDelay: '0.4s',
        }}
      >
        <span style={{ color: 'var(--text)' }}>Master Physical AI</span><br />
        <span
          style={{
            background: 'linear-gradient(135deg, #f72585, #a855f7, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >& Humanoid Robotics</span>
      </h1>

      {/* Typing Animation Line */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: 'var(--muted)',
          minHeight: '1.6rem',
          marginBottom: '24px',
          animation: 'fadeUp 0.7s ease forwards',
          opacity: 0,
          transform: 'translateY(22px)',
          animationDelay: '0.5s',
        }}
      >
        {currentText}
        <span
          style={{
            marginLeft: '4px',
            width: '2px',
            height: '1em',
            background: '#f72585',
            display: 'inline-block',
            animation: showCursor ? 'blink 1s infinite' : 'none',
          }}
        ></span>
      </div>

      {/* Author Credit */}
      <div
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.75rem',
          color: 'rgba(247,37,133,.65)',
          letterSpacing: '1px',
          marginBottom: '32px',
          animation: 'fadeUp 0.7s ease forwards',
          opacity: 0,
          transform: 'translateY(22px)',
          animationDelay: '0.7s',
        }}
      >
        Crafted with ❤️ by <span style={{ color: 'var(--pink)' }}>Marium Afzal</span> · AI Engineer · PIAIC
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          animation: 'fadeUp 0.7s ease forwards',
          opacity: 0,
          transform: 'translateY(22px)',
          animationDelay: '0.8s',
        }}
      >
        <button
          style={{
            background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(247,37,133,.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(247,37,133,.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(247,37,133,.3)';
          }}
        >
          🚀 Start Learning
        </button>
        <button
          style={{
            background: 'transparent',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink)';
            e.currentTarget.style.color = 'var(--pink)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--muted)';
          }}
        >
          📚 Explore Curriculum
        </button>
      </div>
    </section>
  );
};

export default HeroSection;