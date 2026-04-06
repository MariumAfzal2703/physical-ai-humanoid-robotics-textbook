import React from 'react';

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: '💬',
      title: 'RAG AI Chatbot',
      description: 'Ask anything about the textbook. Powered by Qdrant vector search + Groq LLM for accurate answers.'
    },
    {
      icon: '🌐',
      title: 'Urdu Translation',
      description: 'Every chapter in Urdu via Groq AI. Technical terms like ROS2, SLAM stay in English.'
    },
    {
      icon: '✨',
      title: 'AI Personalization',
      description: 'Content adapts to your background. Beginner to Advanced — your pace, your level.'
    },
    {
      icon: '🔐',
      title: 'Secure Auth',
      description: 'Sign in with GitHub or Email via BetterAuth + Neon PostgreSQL.'
    }
  ];

  return (
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        className="section-tag"
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.9rem',
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        // why different
      </div>

      <h2
        className="section-title"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          textAlign: 'center',
          color: 'var(--text)',
          marginBottom: '32px',
        }}
      >
        Built Different.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '20px 16px',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div
              style={{
                fontSize: '1.8rem',
                marginBottom: '12px',
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text)',
                marginBottom: '12px',
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--muted)',
                lineHeight: '1.5',
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;