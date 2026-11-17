import React, { useRef, useEffect, useState } from "react";
import { SocietyItem } from "./DisciplinesSection";
import { Compass, Eye, Sparkles, Maximize2, RotateCcw } from "lucide-react";

interface OrbitalSphereGalleryProps {
  disciplines: SocietyItem[];
  onSelectSociety: (society: SocietyItem) => void;
}

export function OrbitalSphereGallery({
  disciplines,
  onSelectSociety,
}: OrbitalSphereGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredItem, setHoveredItem] = useState<SocietyItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 540);

    // Preload image objects
    const loadedImages: { [key: string]: HTMLImageElement } = {};
    disciplines.forEach((d) => {
      const img = new Image();
      img.src = d.image;
      img.crossOrigin = "anonymous";
      loadedImages[d.index] = img;
    });

    // Touch & mouse tracking state
    const touch = {
      mouse: { x: 0, y: 0 },
      delta: { x: 0, y: 0 },
      velocity: { x: 0.0018, y: 0.0006 }, // default subtle tranquil drift
      isDown: false,
      last: { x: 0, y: 0 },
    };

    // Smooth focus reticle state (lerp)
    const focus = {
      x: 0,
      y: 0,
      s: 60,
      targetS: 60,
      alpha: 0,
      activeSociety: null as SocietyItem | null,
    };

    // 3D Sphere coordinates setup
    const numItems = disciplines.length;
    const radius = Math.min(width, height) * 0.44;
    const baseItemSize = Math.max(radius * 0.42, 85);

    // Golden spiral / spherical coordinate distribution
    const nodes = disciplines.map((d, i) => {
      // Golden ratio Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numItems);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      return {
        society: d,
        theta,
        phi,
        x: 0,
        y: 0,
        z: 0,
        ratio: 1,
        displayed: true,
      };
    });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 540;
    };
    window.addEventListener("resize", handleResize);

    // Mouse / Touch Event Listeners
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      touch.mouse.x = clientX - width / 2;
      touch.mouse.y = clientY - height / 2;

      if (touch.isDown) {
        const dx = clientX - touch.last.x;
        const dy = clientY - touch.last.y;
        touch.delta.x += dx * 0.004;
        touch.delta.y += dy * 0.004;
        touch.velocity.x = dx * 0.003;
        touch.velocity.y = dy * 0.003;
        touch.last.x = clientX;
        touch.last.y = clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      touch.isDown = true;
      setIsDragging(true);
      touch.last.x = e.clientX - rect.left;
      touch.last.y = e.clientY - rect.top;
    };

    const onMouseUp = () => {
      touch.isDown = false;
      setIsDragging(false);
    };

    const onWheel = (e: WheelEvent) => {
      touch.delta.x += e.deltaX * 0.0006;
      touch.delta.y += e.deltaY * 0.0006;
      touch.velocity.x += e.deltaX * 0.0003;
    };

    const onClick = (e: MouseEvent) => {
      if (focus.activeSociety) {
        onSelectSociety(focus.activeSociety);
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("click", onClick);

    // Main render loop
    const render = () => {
      // Natural inertia & subtle constant orbit
      if (!touch.isDown) {
        touch.delta.x += touch.velocity.x;
        touch.delta.y += touch.velocity.y;
        touch.velocity.x *= 0.96;
        touch.velocity.y *= 0.96;

        // Keep a minimum tranquil drift
        if (Math.abs(touch.velocity.x) < 0.0008) touch.velocity.x = 0.0012;
      }

      ctx.clearRect(0, 0, width, height);

      // Save context and center origin
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw faint architectural celestial background latitude rings
      ctx.strokeStyle = "rgba(167, 139, 250, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      let currentlyHoveredNode: (typeof nodes)[0] | null = null;

      // Update and sort nodes by 3D depth (Z-buffer)
      nodes.forEach((node) => {
        // Spherical rotation mathematics
        const rotX = node.theta + touch.delta.x;
        const rotY = node.phi + touch.delta.y;

        const x = Math.sin(rotY) * Math.cos(rotX) * radius;
        const y = Math.cos(rotY) * radius;
        const z = Math.sin(rotY) * Math.sin(rotX) * radius;

        node.x = x;
        node.y = y;
        node.z = z;

        // Distance attenuation & scale factor
        // Z ranges from -radius to +radius
        const normalZ = (z + radius) / (2 * radius); // 0 (far) to 1 (near)
        node.ratio = 0.55 + normalZ * 0.55; // 0.55 to 1.1 scale
        node.displayed = z > -radius * 0.75; // hide back-facing horizon
      });

      // Sort back-to-front so closer images render on top
      const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

      // Render each society node
      sortedNodes.forEach((node) => {
        if (!node.displayed) return;

        const size = baseItemSize * node.ratio;
        const img = loadedImages[node.society.index];

        ctx.save();
        ctx.translate(node.x, node.y);

        // Check hover intersection
        const halfSize = size / 2;
        const isHover =
          touch.mouse.x >= node.x - halfSize &&
          touch.mouse.x <= node.x + halfSize &&
          touch.mouse.y >= node.y - halfSize &&
          touch.mouse.y <= node.y + halfSize;

        if (isHover && (!currentlyHoveredNode || node.z > currentlyHoveredNode.z)) {
          currentlyHoveredNode = node;
        }

        // Draw node capsule/frame
        ctx.globalAlpha = Math.max(0.35, Math.min(node.ratio * 1.1, 1));

        // Rounded clipping region for image
        ctx.beginPath();
        const r = 14 * node.ratio;
        ctx.roundRect(-halfSize, -halfSize, size, size, r);
        ctx.clip();

        // Image or fallback
        if (img && img.complete) {
          ctx.drawImage(img, -halfSize, -halfSize, size, size);
        } else {
          ctx.fillStyle = "#121212";
          ctx.fillRect(-halfSize, -halfSize, size, size);
        }

        // Subtle dark vignette on each node
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fillRect(-halfSize, -halfSize, size, size);

        // Border ring
        ctx.restore();
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.beginPath();
        ctx.roundRect(-halfSize, -halfSize, size, size, 14 * node.ratio);
        ctx.strokeStyle =
          currentlyHoveredNode === node
            ? "#A78BFA"
            : "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = currentlyHoveredNode === node ? 2 : 1;
        ctx.stroke();

        // Label on node
        ctx.fillStyle = "#F2EEE8";
        ctx.font = `600 ${Math.max(9, 11 * node.ratio)}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(node.society.fieldCode, 0, halfSize - 8 * node.ratio);

        ctx.restore();
      });

      // Update Smooth Tracking Focus Reticle (CodePen drawFocus inspiration)
      if (currentlyHoveredNode) {
        canvas.style.cursor = "pointer";
        focus.targetS = baseItemSize * currentlyHoveredNode.ratio + 16;
        focus.x += (currentlyHoveredNode.x - focus.x) * 0.2;
        focus.y += (currentlyHoveredNode.y - focus.y) * 0.2;
        focus.s += (focus.targetS - focus.s) * 0.2;
        focus.alpha += (1 - focus.alpha) * 0.2;
        focus.activeSociety = currentlyHoveredNode.society;
        setHoveredItem(currentlyHoveredNode.society);
      } else {
        canvas.style.cursor = touch.isDown ? "grabbing" : "grab";
        focus.alpha += (0 - focus.alpha) * 0.15;
        if (focus.alpha < 0.05) {
          focus.activeSociety = null;
        }
      }

      // Draw Focus Reticle with corner crosshairs
      if (focus.alpha > 0.02) {
        ctx.save();
        ctx.globalAlpha = focus.alpha;
        ctx.strokeStyle = "#A78BFA";
        ctx.lineWidth = 1.5;

        const half = focus.s / 2;
        const corner = Math.min(14, focus.s * 0.2);

        // Top-Left corner
        ctx.beginPath();
        ctx.moveTo(focus.x - half, focus.y - half + corner);
        ctx.lineTo(focus.x - half, focus.y - half);
        ctx.lineTo(focus.x - half + corner, focus.y - half);
        ctx.stroke();

        // Top-Right corner
        ctx.beginPath();
        ctx.moveTo(focus.x + half - corner, focus.y - half);
        ctx.lineTo(focus.x + half, focus.y - half);
        ctx.lineTo(focus.x + half, focus.y - half + corner);
        ctx.stroke();

        // Bottom-Right corner
        ctx.beginPath();
        ctx.moveTo(focus.x + half, focus.y + half - corner);
        ctx.lineTo(focus.x + half, focus.y + half);
        ctx.lineTo(focus.x + half - corner, focus.y + half);
        ctx.stroke();

        // Bottom-Left corner
        ctx.beginPath();
        ctx.moveTo(focus.x - half + corner, focus.y + half);
        ctx.lineTo(focus.x - half, focus.y + half);
        ctx.lineTo(focus.x - half, focus.y + half - corner);
        ctx.stroke();

        // Target center pip
        ctx.fillStyle = "#A78BFA";
        ctx.fillRect(focus.x - 2, focus.y - 2, 4, 4);

        ctx.restore();
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("click", onClick);
    };
  }, [disciplines, onSelectSociety]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#050508] shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none"
    >
      {/* Top HUD Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-[#F2EEE8]">
            3D Constellation Observatory
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-[#716E6B] border border-white/10 px-2 py-0.5 rounded-full">
            Spherical Orbit
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#A3A3A3]">
          <span className="hidden md:inline text-[11px] text-[#716E6B]">
            {isDragging ? "Rotating Orbit..." : "Drag or Scroll to Orbit • Click to Inspect"}
          </span>
          <div className="flex items-center gap-1.5 text-[#A78BFA]">
            <Compass size={13} />
            <span>10 Societies</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Spherical Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-[520px] block cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Floating Info Badge */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl backdrop-blur-md bg-black/70 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 bg-black">
            {hoveredItem ? (
              <img
                src={hoveredItem.image}
                alt={hoveredItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#A78BFA]">
                <Sparkles size={16} />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-[#A78BFA] tracking-wider">
                {hoveredItem ? `${hoveredItem.fieldCode} • Society ${hoveredItem.index}` : "Explore Societies"}
              </span>
              {hoveredItem && (
                <span className="font-mono text-[10px] text-[#716E6B]">
                  {hoveredItem.coordinates}
                </span>
              )}
            </div>
            <h4 className="font-serif text-base sm:text-lg text-[#F2EEE8] font-normal leading-tight">
              {hoveredItem ? hoveredItem.name : "Hover any society to lock reticle"}
            </h4>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          {hoveredItem && (
            <button
              onClick={() => onSelectSociety(hoveredItem)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-[#A78BFA] text-[#0A0A0A] hover:bg-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Examine Details</span>
              <Maximize2 size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
