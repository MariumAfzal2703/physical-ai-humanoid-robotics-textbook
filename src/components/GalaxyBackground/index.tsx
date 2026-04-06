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

    // Very minimal GALAXY STARS — twinkling pink/purple/white
    const stars = Array.from({ length: 10 }, () => ({  // Highly reduced for build efficiency
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 0.8 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      col: ['#f72585', '#a855f7'][Math.floor(Math.random() * 2)],
    }));

    let frame = 0;
    let animId: number;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Stars only - removed all other elements for build efficiency
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.a)) * 0.5;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
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