import React from 'react';

const TechStackPills: React.FC = () => {
  const techStack = [
    '🤖 ROS 2 Humble', '🔥 Gazebo Sim', '⚡ NVIDIA Isaac Sim',
    '🎮 Unity 3D', '🐍 Python / rclpy', '🗺️ Nav2',
    '👁️ OpenAI Whisper', '🧠 Groq LLM', '🗄️ Qdrant Vector DB',
    '🐘 Neon PostgreSQL', '🔐 BetterAuth', '⚙️ FastAPI',
    '📦 Docusaurus 3', '🤖 Claude Code', '📋 Spec-Kit Plus'
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
        // built with
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
        Real Tools. Real Stack.
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {techStack.map((tech, index) => (
          <div
            key={index}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.8rem',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              padding: '8px 16px',
              borderRadius: '100px',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--pink)';
              e.currentTarget.style.color = 'var(--pink)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(247,37,133,.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackPills;