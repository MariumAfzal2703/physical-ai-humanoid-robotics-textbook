import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  if (typeof window === 'undefined') return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on client side to avoid SSR issues during build
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Minimal static stars - no animation during build for efficiency
    const stars = Array.from({ length: 1 }, () => ({  // Just 1 star for minimal memory usage
      x: window.innerWidth * 0.5,  // Centered
      y: window.innerHeight * 0.5, // Centered
      r: 0.2,  // Small size
      col: '#f72585',  // Fixed color
    }));

    // Draw static stars only (no animation loop for build efficiency)
    function drawStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col;
        ctx.globalAlpha = 0.3;  // Low opacity for efficiency
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    drawStatic();

    // Only set up resize listener, no animation loop for build efficiency
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-bg"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}