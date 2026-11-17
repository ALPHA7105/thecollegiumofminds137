import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LiquidRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ModernCtaButtonProps {
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  text: string;
  subText?: string; // Optional alternate text on flip
  icon?: React.ReactNode;
  variant?: "dark" | "ivory" | "purple" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

export const ModernCtaButton: React.FC<ModernCtaButtonProps> = ({
  to,
  href,
  onClick,
  text,
  subText,
  icon,
  variant = "dark",
  size = "md",
  className = "",
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<LiquidRipple[]>([]);
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  // Trigger liquid ripple from click location
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height) * 2.5;

    const newRipple: LiquidRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: diameter,
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 850);
  };

  // Variant styling
  const variantStyles = {
    dark: "bg-[#0A0A0A] text-[#F4F0EA] border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.7)]",
    ivory: "bg-[#F4F0EA] text-[#0A0A0A] border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
    purple: "bg-[#A78BFA] text-[#0A0A0A] border border-white/20 shadow-[0_4px_20px_rgba(167,139,250,0.35)] hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)]",
    glass: "bg-white/5 backdrop-blur-md text-[#F2EEE8] border border-white/12 hover:bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
  };

  // Size styling
  const sizeStyles = {
    sm: "text-[12px] px-3.5 py-1.5 rounded-[8px] h-[32px] gap-1.5",
    md: "text-[13px] px-4.5 py-2 rounded-[10px] h-[38px] gap-2",
    lg: "text-[14px] px-6 py-2.5 rounded-[12px] h-[44px] gap-2.5",
  };

  // Flip text second label (defaults to same text or provided subText)
  const flipLabel = subText || text;

  // Fluid wave color per variant
  const liquidFillColor =
    variant === "ivory"
      ? "bg-[#7C3AED] text-[#7C3AED]"
      : variant === "purple"
      ? "bg-[#0A0A0A] text-[#0A0A0A]"
      : "bg-[#6D28D9] text-[#6D28D9]";

  // Ripple color per variant
  const rippleBg =
    variant === "ivory"
      ? "bg-white/40"
      : variant === "purple"
      ? "bg-white/30"
      : "bg-white/20";

  const content = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-1.5 select-none transition-colors duration-300"
      animate={{
        scale: isHovered ? 1.01 : 1,
        color:
          isHovered && (variant === "ivory" || variant === "purple")
            ? "#F4F0EA"
            : undefined,
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Vertical Text Flip Container */}
      <span className="relative inline-block overflow-hidden h-[1.3em] leading-[1.3em] font-sans font-semibold tracking-[-0.015em]">
        {/* Layer 1: Normal state, slides up on hover */}
        <motion.span
          className="block whitespace-nowrap"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>

        {/* Layer 2: Hidden below, rolls up to center on hover */}
        <motion.span
          className="absolute inset-0 block whitespace-nowrap"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {flipLabel}
        </motion.span>
      </span>

      {/* Accompanying Icon with motion translation */}
      {icon && (
        <motion.span
          className="flex-shrink-0 flex items-center justify-center"
          animate={{
            x: isHovered ? 2 : 0,
            y: isHovered ? -2 : 0,
            rotate: isHovered ? 6 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {icon}
        </motion.span>
      )}
    </motion.span>
  );

  const sharedProps = {
    ref: buttonRef,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onPointerDown: handlePointerDown,
    "aria-label": ariaLabel || text,
    className: `relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
  };

  const liquidOverlay = (
    <>
      {/* Fluid Liquid Color Wave that flows in on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0"
        initial={false}
      >
        <motion.div
          className={`absolute inset-x-0 bottom-0 w-full h-[120%] ${liquidFillColor}`}
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1], // fluid meniscus liquid curve
          }}
        >
          {/* SVG fluid wave edge at the top of the rising liquid */}
          <svg
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
            className="absolute -top-[14px] left-0 w-full h-[16px] fill-current pointer-events-none"
          >
            <path d="M0 24 C 20 8, 45 20, 70 8 C 85 0, 95 16, 100 12 L 100 24 L 0 24 Z" />
          </svg>
        </motion.div>
      </motion.div>
      {/* Subtle organic fluid sheen on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background:
            variant === "ivory"
              ? "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.06), transparent 70%)"
              : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.12), transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Expanding Liquid Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
              opacity: 0.75,
              scale: 0,
            }}
            animate={{
              width: ripple.size,
              height: ripple.size,
              x: ripple.x - ripple.size / 2,
              y: ripple.y - ripple.size / 2,
              opacity: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.1, 0.8, 0.2, 1], // fluid meniscus liquid curve
            }}
            className={`absolute pointer-events-none rounded-full ${rippleBg} blur-[1px]`}
          />
        ))}
      </AnimatePresence>
    </>
  );

  // Interactive Morph Shape on tap/click with spring response
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.025 }}
        whileTap={{
          scale: 0.94,
          borderRadius: "16px",
          transition: { type: "spring", stiffness: 500, damping: 25 },
        }}
        className="inline-block"
      >
        <Link to={to} onClick={onClick} {...sharedProps}>
          {liquidOverlay}
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.025 }}
        whileTap={{
          scale: 0.94,
          borderRadius: "16px",
          transition: { type: "spring", stiffness: 500, damping: 25 },
        }}
        className="inline-block"
      >
        <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" {...sharedProps}>
          {liquidOverlay}
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.025 }}
      whileTap={{
        scale: 0.94,
        borderRadius: "16px",
        transition: { type: "spring", stiffness: 500, damping: 25 },
      }}
      {...sharedProps}
    >
      {liquidOverlay}
      {content}
    </motion.button>
  );
};
