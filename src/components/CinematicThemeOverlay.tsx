import React, { useEffect, useRef } from "react";
// Try to load the project's ThemeContext hook; if it's not present (e.g. during
// type-checking or a moved file), provide a safe fallback to avoid build errors.
import { useTheme } from "../lib/ThemeContext";

export const CinematicThemeOverlay: React.FC = () => {
  const { isTransitioning, transitionType } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  

  useEffect(() => {
    if (!isTransitioning || !transitionType) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const cx = w / 2;
    const cy = h / 2;

    let animId: number;
    const startTime = performance.now();
    const duration = 1300; // ms

    // Particles for transition
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(w, h) * 0.8;
      return {
        angle,
        dist,
        speed: Math.random() * 8 + 4,
        size: Math.random() * 3 + 1.5,
        color: Math.random() > 0.4 ? "34, 211, 238" : "245, 158, 11",
      };
    });

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, w, h);

      if (transitionType === "darkToLight") {
        // Phase 1 (0 -> 0.5): Stars spiral inward, core accumulates energy
        // Phase 2 (0.5 -> 1.0): Supernova explosion shockwave expands outward
        if (progress < 0.5) {
          const p1 = progress / 0.5; // 0 to 1
          // Dark vignetting intensifies
          ctx.fillStyle = `rgba(7, 9, 18, ${p1 * 0.6})`;
          ctx.fillRect(0, 0, w, h);

          // Particles spiral inward
          particles.forEach((pt) => {
            const currentDist = pt.dist * (1 - p1);
            pt.angle += 0.08 * (1 + p1 * 2);
            const x = cx + Math.cos(pt.angle) * currentDist;
            const y = cy + Math.sin(pt.angle) * currentDist;

            ctx.fillStyle = `rgba(${pt.color}, ${0.4 + p1 * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, pt.size * (1 + p1), 0, Math.PI * 2);
            ctx.fill();
          });

          // Energy core building
          const coreRadius = 20 + p1 * 60;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
          grad.addColorStop(0, "rgba(255, 255, 255, 1)");
          grad.addColorStop(0.4, "rgba(34, 211, 238, 0.9)");
          grad.addColorStop(1, "rgba(14, 165, 233, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Shockwave eruption
          const p2 = (progress - 0.5) / 0.5; // 0 to 1
          const maxRadius = Math.sqrt(w * w + h * h);
          const currentRadius = p2 * maxRadius * 1.2;

          // Shockwave circle
          const grad = ctx.createRadialGradient(cx, cy, Math.max(0, currentRadius - 120), cx, cy, currentRadius + 40);
          grad.addColorStop(0, "rgba(248, 250, 252, 0)");
          grad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
          grad.addColorStop(0.8, "rgba(34, 211, 238, 0.8)");
          grad.addColorStop(1, "rgba(248, 250, 252, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, currentRadius + 40, 0, Math.PI * 2);
          ctx.fill();

          // Full white-out flash fading away
          const flashAlpha = Math.max(0, (1 - p2) * 0.85);
          ctx.fillStyle = `rgba(248, 250, 252, ${flashAlpha})`;
          ctx.fillRect(0, 0, w, h);

          // Expanding particles
          particles.forEach((pt) => {
            const expDist = p2 * maxRadius * 0.9;
            const x = cx + Math.cos(pt.angle) * expDist;
            const y = cy + Math.sin(pt.angle) * expDist;

            ctx.fillStyle = `rgba(${pt.color}, ${Math.max(0, 1 - p2)})`;
            ctx.beginPath();
            ctx.arc(x, y, pt.size * (1 - p2 * 0.5), 0, Math.PI * 2);
            ctx.fill();
          });
        }
      } else {
        // Light to Dark: Black Hole Collapse
        if (progress < 0.5) {
          const p1 = progress / 0.5; // 0 to 1
          // Particles drain inward
          particles.forEach((pt) => {
            const currentDist = (1 - p1) * pt.dist;
            pt.angle -= 0.08 * (1 + p1);
            const x = cx + Math.cos(pt.angle) * currentDist;
            const y = cy + Math.sin(pt.angle) * currentDist;

            ctx.fillStyle = `rgba(2, 132, 199, ${0.3 + p1 * 0.5})`;
            ctx.beginPath();
            ctx.arc(x, y, pt.size, 0, Math.PI * 2);
            ctx.fill();
          });

          // Black hole singularity forming at center
          const singularityRadius = 30 + p1 * 80;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, singularityRadius);
          grad.addColorStop(0, "rgba(7, 9, 18, 1)");
          grad.addColorStop(0.6, "rgba(7, 9, 18, 0.8)");
          grad.addColorStop(1, "rgba(7, 9, 18, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, singularityRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Gravitational ripple & darkness expansion
          const p2 = (progress - 0.5) / 0.5; // 0 to 1
          const maxRadius = Math.sqrt(w * w + h * h);
          const currentRadius = p2 * maxRadius * 1.3;

          ctx.fillStyle = `rgba(7, 9, 18, ${Math.min(1, p2 * 1.2)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          // Gravitational ripple outline
          ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, 0.8 - p2)})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isTransitioning, transitionType]);

  if (!isTransitioning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99999] pointer-events-none"
    />
  );
};
