import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CosmicViewfinderProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeTarget?: string | null;
}

/**
 * CosmicViewfinder
 * Inspired by madetodisrupt.com's precision lens / observer HUD.
 * Tracks mouse position over the hero area, displaying real-time astronomical
 * coordinates (RA/DEC) and telemetry locks.
 */
export const CosmicViewfinder: React.FC<CosmicViewfinderProps> = ({
  containerRef,
  activeTarget,
}) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [coordinates, setCoordinates] = useState({ ra: "17h 45m 40s", dec: "-29° 00′ 28″" });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setMousePos({ x, y });
        setIsInside(true);

        // Compute simulated astronomical Right Ascension & Declination based on viewport position
        const raHours = Math.floor((x / rect.width) * 24);
        const raMinutes = Math.floor(((x / rect.width) * 1440) % 60);
        const decDegrees = Math.floor((1 - y / rect.height) * 180 - 90);
        const decMinutes = Math.abs(Math.floor(((1 - y / rect.height) * 10800) % 60));

        setCoordinates({
          ra: `${String(raHours).padStart(2, "0")}h ${String(raMinutes).padStart(2, "0")}m`,
          dec: `${decDegrees >= 0 ? "+" : ""}${decDegrees}° ${String(decMinutes).padStart(2, "0")}′`,
        });
      } else {
        setIsInside(false);
      }
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  if (!mousePos || !isInside) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-40 overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 300,
          mass: 0.15,
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Reticle Outer Circle with tick marks */}
        <div className="relative w-12 h-12 -ml-6 -mt-6 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300">
          {/* Center Crosshair Dot */}
          <div className="w-1 h-1 rounded-full bg-[#A78BFA]" />

          {/* 4 Cardinal Reticle Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />

          {/* Precision Telemetry Tag */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap flex flex-col font-mono text-[9px] text-[#E5E0D8]/70 tracking-widest uppercase bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 select-none shadow-xl">
            <div className="flex items-center gap-1.5 text-[8px] text-[#A78BFA]">
              <span className="w-1 h-1 rounded-full bg-[#A78BFA] animate-ping" />
              <span>{activeTarget || "OBSERVER // 3D"}</span>
            </div>
            <div className="text-[#A3A3A3] text-[8px] mt-0.5">
              RA {coordinates.ra} · DEC {coordinates.dec}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
