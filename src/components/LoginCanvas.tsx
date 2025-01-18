import React, { useEffect, useRef } from "react";

const MedicalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = { x: 0, y: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      phase: number;
      color: string;
    }[] = [];

    function generateColor() {
      const colors = ["#66FFCC", "#FF66FF", "#00CCFF", "#FF9933", "#00FF99"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Initialize magic particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.sin(Math.random() * 2 * Math.PI) * 0.8,
        speedY: Math.cos(Math.random() * 2 * Math.PI) * 0.8,
        alpha: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        color: generateColor(),
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glowing particles
      particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.closePath();

        // Pulsating wave effect
        p.alpha = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 + index);

        // Move particles in a wave-like motion
        p.x += Math.sin(p.phase) * 1.5;
        p.y += Math.cos(p.phase) * 1.5;
        p.phase += 0.02;

        // Make particles interact with mouse
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 80) {
          p.x += dx * 0.05;
          p.y += dy * 0.05;
        }

        // Keep particles within screen bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw neural connections
        for (let j = index + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.closePath();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    // Update mouse position for interactivity
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="position-fixed top-0 start-0 w-100 h-100" />;
};

export default MedicalCanvas;
