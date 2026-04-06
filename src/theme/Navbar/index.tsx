import React, { useState, useEffect } from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      setAuthToken(storedToken);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCurriculum = () => {
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="navbar-custom"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '62px',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          padding: '0 24px',
          gap: '8px',
          zIndex: 500,
        }}
      >
        {/* LEFT - Logo */}
        <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f72585" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span
              className="logo-wordmark"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                background: 'linear-gradient(90deg, #f72585, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginLeft: '8px',
                fontSize: '1.2rem',
              }}
            >
              PhysAI
            </span>
          </Link>
        </div>

        {/* CENTER - Nav Links (Hidden below 860px) */}
        <div className="nav-links nav-links-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={scrollToTop}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.83rem',
              padding: '6px 13px',
              borderRadius: '8px',
              border: '1px solid transparent',
              color: 'var(--muted)',
              background: 'transparent',
              cursor: 'pointer',
              marginRight: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'rgba(247,37,133,.07)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={scrollToCurriculum}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.83rem',
              padding: '6px 13px',
              borderRadius: '8px',
              border: '1px solid transparent',
              color: 'var(--muted)',
              background: 'transparent',
              cursor: 'pointer',
              marginRight: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'rgba(247,37,133,.07)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            📚 Curriculum
          </button>
          <Link
            to="/ur"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.83rem',
              padding: '6px 13px',
              borderRadius: '8px',
              border: '1px solid transparent',
              color: 'var(--purple-light)',
              background: 'transparent',
              textDecoration: 'none',
              marginRight: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'rgba(247,37,133,.07)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--purple-light)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            🌐 Urdu
          </Link>
          <Link
            to="/personalize"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.83rem',
              padding: '6px 13px',
              borderRadius: '8px',
              border: '1px solid transparent',
              color: 'var(--purple-light)',
              background: 'transparent',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'rgba(247,37,133,.07)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--purple-light)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            ✨ Personalize
          </Link>
        </div>

        {/* RIGHT - Buttons */}
        <div className="navbar-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--pink)';
              e.currentTarget.style.color = 'var(--pink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'inherit';
            }}
          >
            🌙
          </button>

          <Link
            to="/login"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              padding: '7px 14px',
              borderRadius: '6px',
              color: 'var(--muted)',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.83rem',
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
            👤 Sign In
          </Link>

          <Link
            to="/signup"
            style={{
              background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
              padding: '7px 14px',
              borderRadius: '6px',
              color: 'white',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.83rem',
              boxShadow: '0 0 16px rgba(247,37,133,.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(247,37,133,.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(247,37,133,.3)';
            }}
          >
            🚀 Sign Up
          </Link>

          {/* Hamburger menu - visible only below 860px */}
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            style={{
              width: '34px',
              height: '34px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'transparent',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu - slides down from nav on hamburger click */}
      {isMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '62px',
            width: '100%',
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(20px)',
            zIndex: 499,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            gap: '12px',
          }}
        >
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            style={{
              padding: '12px',
              textDecoration: 'none',
              color: 'var(--muted)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            🏠 Home
          </Link>
          <Link
            to="#curriculum"
            onClick={() => {
              scrollToCurriculum();
              setIsMenuOpen(false);
            }}
            style={{
              padding: '12px',
              textDecoration: 'none',
              color: 'var(--muted)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            📚 Curriculum
          </Link>
          <Link
            to="/ur"
            onClick={() => setIsMenuOpen(false)}
            style={{
              padding: '12px',
              textDecoration: 'none',
              color: 'var(--purple-light)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            🌐 Urdu
          </Link>
          <Link
            to="/personalize"
            onClick={() => setIsMenuOpen(false)}
            style={{
              padding: '12px',
              textDecoration: 'none',
              color: 'var(--purple-light)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            ✨ Personalize
          </Link>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <Link
              to="/login"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
                borderRadius: '6px',
                color: 'white',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Apply responsive styles via script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateHamburgerVisibility() {
                const hamburger = document.querySelector('.hamburger-menu');
                const navLinks = document.querySelector('.nav-links');

                if (window.innerWidth < 860) {
                  hamburger.style.display = 'block';
                  navLinks.style.display = 'none';
                } else {
                  hamburger.style.display = 'none';
                  navLinks.style.display = 'flex';
                }
              }

              updateHamburgerVisibility();
              window.addEventListener('resize', updateHamburgerVisibility);
            })();
          `
        }}
      />
    </>
  );
};

export default Navbar;