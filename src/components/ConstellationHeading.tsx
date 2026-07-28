import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  line: 1 | 2;
  size: number;
  angle: number;
  speed: number;
  driftRadius: number;
}

export interface ConstellationHeadingProps {
  line1: string;
  line2?: string;
  className?: string;
  line1ClassName?: string;
  line2ClassName?: string;
  align?: "center" | "left";
  cursorRadius?: number;
  as?: "h1" | "h2" | "h3" | "div";
}

export const ConstellationHeading: React.FC<ConstellationHeadingProps> = ({
  line1,
  line2,
  className = "",
  line1ClassName = "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  line2ClassName = "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  align = "center",
  cursorRadius = 95,
  as: Tag = "h2",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isLight = theme === "light";

  const [mousePos, setMousePos] = useState({
    x: -1000,
    y: -1000,
    active: false,
  });

  const mousePosRef = useRef(mousePos);
  mousePosRef.current = mousePos;

  const particlesRef = useRef<Particle[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000, active: false });
  };

  // Sample particles directly from rendered text elements
  useEffect(() => {
    const container = containerRef.current;
    const line1El = line1Ref.current;
    const line2El = line2Ref.current;
    if (!container || !line1El) return;

    const generateParticles = () => {
      const offscreen = document.createElement("canvas");
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (w === 0 || h === 0) return;

      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;

      const rect1 = line1El.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const l1Top = rect1.top - containerRect.top;
      const l1X = align === "center"
        ? rect1.left - containerRect.left + rect1.width / 2
        : rect1.left - containerRect.left;

      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "top";
      ctx.textAlign = align === "center" ? "center" : "left";

      // Draw Line 1 onto offscreen canvas
      const style1 = window.getComputedStyle(line1El);
      ctx.font = `${style1.fontStyle} ${style1.fontWeight} ${style1.fontSize} ${style1.fontFamily}`;
      ctx.fillText(line1, l1X, l1Top);

      let midY = l1Top + rect1.height;

      // Draw Line 2 if present
      if (line2 && line2El) {
        const rect2 = line2El.getBoundingClientRect();
        const l2Top = rect2.top - containerRect.top;
        const l2X = align === "center"
          ? rect2.left - containerRect.left + rect2.width / 2
          : rect2.left - containerRect.left;

        const style2 = window.getComputedStyle(line2El);
        ctx.font = `${style2.fontStyle} ${style2.fontWeight} ${style2.fontSize} ${style2.fontFamily}`;
        ctx.fillText(line2, l2X, l2Top);

        midY = (l1Top + l2Top + rect1.height) / 2;
      }

      // Sample pixels
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const sampled: Particle[] = [];
      const step = Math.max(12, Math.floor(w / 50)); // Responsive step size

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            const lineNum: 1 | 2 = y < midY ? 1 : 2;
            sampled.push({
              homeX: x,
              homeY: y,
              x,
              y,
              line: lineNum,
              size: Math.random() * 1.4 + 2.0,
              angle: Math.random() * Math.PI * 2,
              speed: (Math.random() * 0.008 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
              driftRadius: Math.random() * 14 + 8,
            });
          }
        }
      }

      particlesRef.current = sampled;
    };

    const timer = setTimeout(generateParticles, 120);
    window.addEventListener("resize", generateParticles);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", generateParticles);
    };
  }, [line1, line2, align]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const m = mousePosRef.current;

      if (m.active) {
        const mx = m.x;
        const my = m.y;
        const activeParticles: { x: number; y: number; p: Particle; dist: number }[] = [];

        // 1. Particle positions
        particlesRef.current.forEach((p) => {
          p.angle += p.speed;

          const dx = p.homeX - mx;
          const dy = p.homeY - my;
          const distFromCursor = Math.sqrt(dx * dx + dy * dy);

          if (distFromCursor <= cursorRadius) {
            const closeness = 1 - distFromCursor / cursorRadius;
            const currentDrift = p.driftRadius * (0.3 + 0.7 * closeness);
            p.x = p.homeX + Math.cos(p.angle) * currentDrift;
            p.y = p.homeY + Math.sin(p.angle) * currentDrift;

            activeParticles.push({ x: p.x, y: p.y, p, dist: distFromCursor });
          }
        });

        // 2. Render particle cores
        activeParticles.forEach(({ x, y, p, dist }) => {
          const closeness = Math.max(0, 1 - dist / cursorRadius);
          const alpha = 0.45 + closeness * 0.4;

          let colorRgb = "";
          if (isLight) {
            colorRgb = p.line === 1 ? "15, 23, 42" : "2, 132, 199";
          } else {
            colorRgb = p.line === 1 ? "255, 255, 255" : "33, 213, 237";
          }

          ctx.fillStyle = `rgba(${colorRgb}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // 3. Render constellation links
        for (let i = 0; i < activeParticles.length; i++) {
          for (let j = i + 1; j < activeParticles.length; j++) {
            const p1 = activeParticles[i];
            const p2 = activeParticles[j];

            const pdx = p1.x - p2.x;
            const pdy = p1.y - p2.y;
            const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pDist < 48) {
              const lineAlpha = (1 - pDist / 48) * 0.35;
              const isLine2 = p1.p.line === 2 || p2.p.line === 2;

              let strokeColor = "";
              if (isLight) {
                strokeColor = isLine2
                  ? `rgba(2, 132, 199, ${lineAlpha})`
                  : `rgba(15, 23, 42, ${lineAlpha})`;
              } else {
                strokeColor = isLine2
                  ? `rgba(33, 213, 237, ${lineAlpha})`
                  : `rgba(255, 255, 255, ${lineAlpha})`;
              }

              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isLight, cursorRadius]);

  const maskStyle: React.CSSProperties = mousePos.active
    ? {
        WebkitMaskImage: `radial-gradient(circle ${cursorRadius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent ${cursorRadius - 5}px, black ${cursorRadius}px)`,
        maskImage: `radial-gradient(circle ${cursorRadius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent ${cursorRadius - 5}px, black ${cursorRadius}px)`,
      }
    : {};

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative font-heading leading-tight cursor-default py-2 select-none ${alignClass} ${className}`}
    >
      {/* LAYER 1: BASE OUTLINE LAYER (Revealed inside cursor circle with transparent fill & stroke) */}
      <Tag className="aria-hidden:true pointer-events-none">
        <div
          ref={line1Ref}
          className={`block ${line1ClassName}`}
          style={{
            WebkitTextStroke: isLight ? "1.2px #0f172a" : "1.2px var(--color-silver)",
            color: "transparent",
          }}
        >
          {line1}
        </div>
        {line2 && (
          <div
            ref={line2Ref}
            className={`block ${line2ClassName}`}
            style={{
              WebkitTextStroke: isLight ? "1.2px #0284c7" : "1.2px #21D5ED",
              color: "transparent",
            }}
          >
            {line2}
          </div>
        )}
      </Tag>

      {/* LAYER 2: TOP SOLID FILL LAYER (Masked out inside cursor circle) */}
      <Tag
        style={maskStyle}
        className="absolute inset-0 py-2 pointer-events-none transition-[mask-image] duration-75"
      >
        <div
          className={`block ${line1ClassName} ${
            isLight ? "text-slate-900" : "text-silver"
          }`}
        >
          {line1}
        </div>
        {line2 && (
          <div
            className={`block ${line2ClassName} ${
              isLight ? "text-sky-600" : "text-[#21D5ED]"
            }`}
          >
            {line2}
          </div>
        )}
      </Tag>

      {/* LAYER 3: CONSTELLATION PARTICLES CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
    </div>
  );
};
