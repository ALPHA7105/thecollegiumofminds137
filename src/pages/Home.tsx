import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowUpRight, Calendar, User, Check, ArrowLeft, Sparkles, ExternalLink, 
  BookOpen, RotateCcw, Users, Linkedin, Github, Globe, Star, Mail, RefreshCw, X, Menu
} from "lucide-react";

import { FloatingNav } from "../components/home/FloatingNav";
import { DeepSpaceHero } from "../components/home/DeepSpaceHero";
import { VisionSection } from "../components/home/VisionSection";
import { PhilosophySection } from "../components/home/PhilosophySection";
import { DisciplinesSection } from "../components/home/DisciplinesSection";
import { PrinciplesSection } from "../components/home/PrinciplesSection";
import { InquiriesSection } from "../components/home/InquiriesSection";
import { PublicationsSection } from "../components/home/PublicationsSection";
import { GuildSection } from "../components/home/GuildSection";
import { DiscussionsSection } from "../components/home/DiscussionsSection";
import { FellowshipSection } from "../components/home/FellowshipSection";
import { EditorialFooter } from "../components/home/EditorialFooter";

// Re-export modular components for complete architectural backward compatibility
export { FloatingNav as Navbar } from "../components/home/FloatingNav";
export { EditorialFooter as Footer } from "../components/home/EditorialFooter";
export { GuildSection as TeamSection } from "../components/home/GuildSection";

// ============================================================================
// ScrollReveal
// ============================================================================
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// LogoIcon
// ============================================================================
export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden border border-white/20 ${className}`}>
      <img src="/logo.jpeg" alt="Collegium of Minds" className="w-full h-full object-cover" />
    </div>
  );
}

// ============================================================================
// AmbientBackground (Cinematic Minimal Deep Space Environment)
// ============================================================================
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;

    let stars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const initCanvas = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      // Sparse, ultra-delicate deep-space micro-particles (no clutter, no lines, no symbols)
      const starCount = Math.max(Math.min(Math.floor((w * h) / 32000), 40), 15);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        size: Math.random() * 0.9 + 0.3,
        alpha: Math.random() * 0.2 + 0.05,
      }));
    };

    const resize = () => {
      initCanvas();
    };

    initCanvas();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Render minimal, tranquil micro-stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 238, 232, ${s.alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}

// Fallback compatibility stubs for old imports
export function EventsSection() {
  return null;
}

export function RecognitionSection() {
  return null;
}

// ============================================================================
// Home Page — Phase Neo Master Experience
// ============================================================================
export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-[#F2EEE8] overflow-x-clip selection:bg-[#A78BFA]/25 selection:text-[#F2EEE8]">
      {/* Background Starfield Canvas */}
      <AmbientBackground />

      {/* Compact Floating Capsule Navigation */}
      <FloatingNav />

      {/* Section 01 — Hero: Beyond What We Know & Deep-Space Astronaut Departure */}
      <DeepSpaceHero />

      {/* Section 02 — The Vision: 4 Metrics & Think. Explore. Discover. Manifesto */}
      <VisionSection />

      {/* Section 03 — Our Philosophy: Full Manifesto & Negative Space (#about) */}
      <PhilosophySection />

      {/* Section C — Intellectual Disciplines: Editorial Directory & Societies */}
      <DisciplinesSection />

      {/* Section D — What Drives Us: 4 Core Convictions */}
      <PrinciplesSection />

      {/* Section E — Questions Worth Exploring: Shuffle Grid & Weekly Polling */}
      <InquiriesSection />

      {/* Section F — What We're Thinking: Curated Treatises, Notebook & Gazette */}
      <PublicationsSection />

      {/* Section G — Members: Founder Sarvesh Kore & Council Portfolios */}
      <GuildSection />

      {/* Digital Salon & Community Forum Feed */}
      <DiscussionsSection />

      {/* Section H — Join the Collegium: Closing Invitation & Application */}
      <FellowshipSection />

      {/* Section I — Editorial Footer: Ponder Prompts & Institutional Links */}
      <EditorialFooter />
    </div>
  );
}
