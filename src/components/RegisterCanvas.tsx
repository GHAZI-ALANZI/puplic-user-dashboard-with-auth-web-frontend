import React, { useEffect, useRef } from "react";

const RegisterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let energyRings: { x: number; y: number; radius: number; speed: number; color: string }[] = [];
    let floatingNodes: { x: number; y: number; size: number; dx: number; dy: number; color: string }[] = [];

    function randomColor() {
      const colors = ["#FF66FF", "#66FFCC", "#00CCFF", "#FF9933", "#00FF99"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Generate energy rings
    for (let i = 0; i < 6; i++) {
      energyRings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 30,
        speed: Math.random() * 0.5 + 0.2,
        color: randomColor(),
      });
    }

    // Generate floating nodes
    for (let i = 0; i < 50; i++) {
      floatingNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        dx: Math.random() * 1.5 - 0.75,
        dy: Math.random() * 1.5 - 0.75,
        color: randomColor(),
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pulsating energy rings
      energyRings.forEach((ring, index) => {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}AA`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = ring.color;
        ctx.stroke();
        ctx.closePath();

        // Pulsating effect
        ring.radius += ring.speed;
        if (ring.radius > 150 || ring.radius < 30) {
          ring.speed *= -1;
        }
      });

      // Draw floating glowing nodes
      floatingNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.closePath();

        node.x += node.dx;
        node.y += node.dy;

        if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return <canvas ref={canvasRef} className="position-fixed top-0 start-0 w-100 h-100" />;
};

export default RegisterCanvas;
