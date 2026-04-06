import React from 'react';
import Link from '@docusaurus/Link';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 24px 36px',
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: '1200px',
      }}
    >
      {/* Logo and Name */}
      <div style={{ marginBottom: '16px' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"
            fill="url(#footer-gradient)"
          />
          <defs>
            <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <span
          className="footer-name"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '1.3rem',
            background: 'linear-gradient(90deg, #f72585, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Marium Afzal
        </span>
      </div>

      {/* Role Line */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.82rem',
          color: 'var(--muted)',
          marginBottom: '20px',
        }}
      >
        AI Engineer · CAARE Student · PIAIC · Aspiring Robotics Engineer · Free Palestine 🇵🇸
      </div>

      {/* Social Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {[
          { text: '💼 LinkedIn', url: 'https://www.linkedin.com/in/marium-afzal23' },
          { text: '🐙 GitHub', url: 'https://github.com/MariumAfzal2703' },
          { text: '📘 Facebook', url: 'https://web.facebook.com/profile.php?id=61579044938516' },
          { text: '🎮 Discord', url: 'https://discord.gg/V3y73PRF' },
          { text: '✉️ Email', url: 'mailto:mariumafzal.contact@gmail.com' },
        ].map((social, index) => (
          <Link
            key={index}
            to={social.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid var(--border)',
              padding: '7px 14px',
              borderRadius: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 500,
              color: 'var(--muted)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--pink)';
              e.currentTarget.style.color = 'var(--pink)';
              e.currentTarget.style.background = 'rgba(247,37,133,.06)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {social.text}
          </Link>
        ))}
      </div>

      {/* Built Line */}
      <div
        className="footer-built"
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.68rem',
          color: 'rgba(157,127,184,.45)',
          marginBottom: '12px',
        }}
      >
        Built with Claude Code & Spec-Kit Plus · Panaversity Hackathon I · 2026
      </div>

      {/* Copyright */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.72rem',
          color: 'rgba(157,127,184,.35)',
        }}
      >
        © 2026 Marium Afzal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;