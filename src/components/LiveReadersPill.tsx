import React, { useState, useEffect } from 'react';

const LiveReadersPill: React.FC = () => {
  const [readerCount, setReaderCount] = useState(183);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random fluctuation of ±2
      const fluctuation = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, or 2
      setReaderCount(prev => {
        const newValue = prev + fluctuation;
        // Keep the value between 170 and 215
        return Math.min(Math.max(newValue, 170), 215);
      });
    }, 3500); // Update every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'rgba(247,37,133,.06)',
        border: '1px solid rgba(247,37,133,.2)',
        borderRadius: '100px',
        padding: '8px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        margin: '24px auto',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.85rem',
        color: 'var(--muted)',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#22c55e',
          animation: 'blink 1.5s infinite',
        }}
      ></div>
      ● {readerCount} students currently reading
    </div>
  );
};

export default LiveReadersPill;