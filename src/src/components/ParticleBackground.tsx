import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  alphaSpeed: number;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const particleCount = 90; 

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = random(0.6, 2.2);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: random(-0.05, 0.05),
          vy: random(-0.03, 0.03),
          radius,
          baseRadius: radius,
          alpha: random(0.2, 0.8),
          alphaSpeed: random(0.006, 0.008),
        });
      }
    };

    const drawParticle = (p: Particle) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 3
      );

      // soft beige + white glow
      gradient.addColorStop(0, `rgba(231,199,154,${p.alpha})`); // beige
      gradient.addColorStop(0.4, `rgba(255,255,255,${p.alpha * 0.9})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // move
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // twinkle
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.9 || p.alpha < 0.15) {
          p.alphaSpeed *= -1;
        }

        // subtle size pulsing
        p.radius = p.baseRadius * (0.8 + 0.4 * Math.sin(p.alpha * 5));

        drawParticle(p);
      });

      animationFrameId = requestAnimationFrame(update);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
