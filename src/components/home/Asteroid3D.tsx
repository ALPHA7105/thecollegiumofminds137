import React from "react";
import { motion } from "framer-motion";

interface Asteroid3DProps {
  className?: string;
  size?: number;
  rotationDuration?: number;
  reverse?: boolean;
}

/**
 * Asteroid3D
 * Photorealistic multi-faceted deep-space chondrite asteroid with directional rim lighting
 * and smooth tumbling motion for layered cinematic depth.
 */
export const Asteroid3D: React.FC<Asteroid3DProps> = ({
  className = "",
  size = 72,
  rotationDuration = 28,
  reverse = false,
}) => {
  return (
    <motion.div
      animate={{
        rotate: reverse ? [-360, 0] : [0, 360],
        y: [-6, 6, -6],
        x: [-3, 3, -3],
      }}
      transition={{
        rotate: {
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        },
        y: {
          duration: rotationDuration * 0.45,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: {
          duration: rotationDuration * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{ width: size, height: size }}
      className={`relative select-none pointer-events-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Directional sunlight gradient (illuminated from upper-left/Earth direction) */}
          <radialGradient
            id="asteroidLight"
            cx="32%"
            cy="28%"
            r="65%"
            fx="28%"
            fy="24%"
          >
            <stop offset="0%" stopColor="#4A4744" />
            <stop offset="30%" stopColor="#2A2826" />
            <stop offset="65%" stopColor="#151413" />
            <stop offset="100%" stopColor="#080807" />
          </radialGradient>

          {/* Rim light highlight along illuminated ridge */}
          <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(240, 235, 225, 0.55)" />
            <stop offset="40%" stopColor="rgba(167, 139, 250, 0.25)" />
            <stop offset="70%" stopColor="transparent" />
          </linearGradient>

          {/* Crater depth shadow */}
          <radialGradient id="craterShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#050505" />
            <stop offset="75%" stopColor="#141312" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Base faceted asteroid body */}
        <path
          d="M 32 14 
             L 62 10 
             L 86 28 
             L 94 56 
             L 78 84 
             L 52 92 
             L 24 86 
             L 8 62 
             L 12 34 
             Z"
          fill="url(#asteroidLight)"
          stroke="url(#rimLight)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Facet ridges giving 3D polygonal geometry */}
        <path
          d="M 32 14 L 46 42 L 62 10"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="0.8"
          fill="rgba(255, 255, 255, 0.04)"
        />
        <path
          d="M 46 42 L 86 28"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="1"
        />
        <path
          d="M 46 42 L 66 64 L 94 56"
          stroke="rgba(0, 0, 0, 0.65)"
          strokeWidth="1"
          fill="rgba(0, 0, 0, 0.25)"
        />
        <path
          d="M 66 64 L 78 84 L 52 92"
          stroke="rgba(0, 0, 0, 0.7)"
          strokeWidth="1"
          fill="rgba(0, 0, 0, 0.35)"
        />
        <path
          d="M 46 42 L 34 68 L 52 92"
          stroke="rgba(0, 0, 0, 0.45)"
          strokeWidth="0.8"
        />
        <path
          d="M 12 34 L 46 42 L 24 86"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.8"
        />
        <path
          d="M 8 62 L 34 68"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="0.8"
        />

        {/* Impact Craters */}
        {/* Crater 1 (Illuminated side) */}
        <ellipse
          cx="38"
          cy="32"
          rx="6.5"
          ry="5"
          fill="url(#craterShadow)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.7"
          transform="rotate(-15 38 32)"
        />
        <path
          d="M 33 30 A 5 4 0 0 1 43 31"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.7"
          fill="none"
        />

        {/* Crater 2 (Lower face) */}
        <ellipse
          cx="54"
          cy="72"
          rx="5"
          ry="4"
          fill="url(#craterShadow)"
          stroke="rgba(0, 0, 0, 0.8)"
          strokeWidth="0.8"
          transform="rotate(25 54 72)"
        />

        {/* Micro crater 3 */}
        <circle
          cx="72"
          cy="42"
          r="2.8"
          fill="#0a0a09"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.5"
        />
      </svg>
    </motion.div>
  );
};
