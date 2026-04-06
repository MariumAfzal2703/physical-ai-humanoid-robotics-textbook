import React from 'react';

const StatsRow: React.FC = () => {
  const stats = [
    { value: '14', label: 'Chapters' },
    { value: '4', label: 'Modules' },
    { value: 'اردو', label: 'Urdu' },
    { value: 'RAG', label: 'AI Chatbot' },
  ];

  return (
    <div
      style={{
        maxWidth: '750px',
        margin: '0 auto 40px',
        padding: '10px',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        background: 'rgba(8,0,16,.6)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeUp 0.8s ease forwards',
        opacity: 0,
        transform: 'translateY(22px)',
        animationDelay: '1s',
      }}
    >
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Hide scrollbar */}
        <style>{`
          div[style*="overflowX: auto"]::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                width: '130px',
                padding: '18px 12px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(247,37,133,.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  background: 'linear-gradient(90deg, #f72585, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.68rem',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {stat.label}
              </div>
            </div>

            {index < stats.length - 1 && (
              <div
                style={{
                  height: '100%',
                  width: '1px',
                  background: 'var(--border)',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatsRow;