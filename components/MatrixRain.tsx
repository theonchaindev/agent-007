"use client";

import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEF";

export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 15;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let cols = Math.floor(canvas.width / SIZE);
    let drops: number[] = Array.from({ length: cols }, () => Math.random() * -60);
    let speeds: number[] = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.8);

    const onResize = () => {
      resize();
      cols = Math.floor(canvas.width / SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.8);
    };
    window.addEventListener("resize", onResize);

    let last = 0;
    let raf: number;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 45) return; // ~22fps
      last = t;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${SIZE}px 'Courier New', monospace`;

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * SIZE;
        if (y < 0) { drops[i] += speeds[i]; continue; }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Occasionally a bright head char
        if (Math.random() > 0.96) {
          ctx.fillStyle = "#CCFFCC";
        } else {
          ctx.fillStyle = "#00FF41";
        }

        ctx.fillText(char, i * SIZE, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -40;
        }
        drops[i] += speeds[i];
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0"
      style={{ opacity: 0.28 }}
    />
  );
}
