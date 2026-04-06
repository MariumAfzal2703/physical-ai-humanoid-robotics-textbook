import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  opacityChange: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const AnimatedCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initializeStars = () => {
      const stars: Star[] = [];
      const colors = ['#f72585', '#a855f7', '#ffffff', '#ec4899'];

      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0.3 + Math.random() * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.85,
          opacityChange: 0.002 + Math.random() * 0.006,
        });
      }
      starsRef.current = stars;
    };

    // Initialize nodes
    const initializeNodes = () => {
      const nodes: Node[] = [];

      for (let i = 0; i < 28; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          radius: 2.5,
          opacity: 0.4,
        });
      }
      nodesRef.current = nodes;
    };

    initializeStars();
    initializeNodes();

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach(star => {
        star.opacity += star.opacityChange;

        // Clamp opacity between 0 and 0.85
        if (star.opacity > 0.85) {
          star.opacity = 0.85;
          star.opacityChange = -Math.abs(star.opacityChange);
        } else if (star.opacity < 0) {
          star.opacity = 0;
          star.opacityChange = Math.abs(star.opacityChange);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 37, 133, ${node.opacity})`;
        ctx.fill();
      });

      // Draw connections between nearby nodes
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 190) {
            const alpha = (1 - distance / 190) * 0.28;

            // Create gradient for the line
            const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
            gradient.addColorStop(0, `rgba(247,37,133,${alpha})`);
            gradient.addColorStop(1, `rgba(168,85,247,${alpha})`);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedCanvas;