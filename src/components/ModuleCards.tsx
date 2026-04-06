import React from 'react';

const ModuleCards: React.FC = () => {
  const modules = [
    {
      number: 'Module 01',
      icon: '🧠',
      title: 'ROS 2 — The Robotic Nervous System',
      description: 'Nodes, Topics, Services & Actions. Build the communication backbone of any humanoid robot using Python rclpy & C++ rclcpp.'
    },
    {
      number: 'Module 02',
      icon: '🌐',
      title: 'Gazebo & Unity — The Digital Twin',
      description: 'Physics simulation, LiDAR & depth camera emulation. Test your robot safely before touching real hardware.'
    },
    {
      number: 'Module 03',
      icon: '⚡',
      title: 'NVIDIA Isaac — The AI Brain',
      description: 'Isaac Sim, hardware-accelerated VSLAM, Nav2 bipedal path planning, and sim-to-real transfer techniques.'
    },
    {
      number: 'Module 04',
      icon: '🤖',
      title: 'VLA — Vision Language Action',
      description: 'Whisper voice commands → LLM planning → ROS 2 execution. The complete autonomous humanoid stack.'
    }
  ];

  return (
    <section id="curriculum" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
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
        // curriculum
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
        4 Modules. One Complete Journey.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '16px',
        }}
      >
        {modules.map((module, index) => (
          <div
            key={index}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(247,37,133,.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #f72585, #a855f7)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease',
              }}
              className="top-line"
            ></div>

            <div
              onMouseEnter={(e) => {
                const line = e.currentTarget.querySelector('.top-line') as HTMLElement;
                if (line) line.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                const line = e.currentTarget.querySelector('.top-line') as HTMLElement;
                if (line) line.style.transform = 'scaleX(0)';
              }}
            >
              <div
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.65rem',
                  color: 'var(--pink)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}
              >
                {module.number}
              </div>

              <div
                style={{
                  fontSize: '1.6rem',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                {module.icon}
              </div>

              <h3
                className="module-title"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                {module.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.82rem',
                  color: 'var(--muted)',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}
              >
                {module.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModuleCards;