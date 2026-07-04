import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, ArrowRight, Check, ArrowLeft, Sparkles, ExternalLink, 
  Play, Pause, ChevronLeft, ChevronRight, Send, MessageSquare, Award, Clock, HelpCircle, BookOpen, RotateCcw 
} from "lucide-react";
import { authClient } from "@/api/authClient";
import { useToast } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { getPageViews, incrementPageViews, getPollVotes, submitVote, retractVote } from "../lib/db";
import { articles, categoryColors } from "../data/articles";

// ============================================================================
// Articles data (was data/articles.js)
// ============================================================================


// ============================================================================
// ScrollReveal
// ============================================================================
export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
      className={`transition-all duration-800 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
      style={{ transitionDuration: "0.8s" }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// AmbientBackground
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
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    let mathSymbols: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      size: number;
      alpha: number;
      angle: number;
      rotSpeed: number;
    }> = [];
    let mouse = { x: -1000, y: -1000 };

    const initStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = Math.max(Math.min(Math.floor((w * h) / 14000), 100), 30);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: 0,
        baseY: 0,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
      }));
      stars.forEach((s) => {
        s.baseX = s.x;
        s.baseY = s.y;
      });
    };

    const initMathSymbols = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const symbolPool = ['∑', '∫', 'π', '∞', 'φ', 'Δ', 'Ω', 'λ', 'ψ', 'θ', 'E=mc²', 'i²=-1', 'Ĥ|Ψ⟩ = E|Ψ⟩', 'F=ma', 'V=IR', 'E-hv', 'a² + b² = c²','∇', '𝜒', 'Ψ', 'Φ', 'ħ', '𝛿', '𝜕', 'Ω ', 'ω'];
      // Limit count on mobile vs desktop
      const count = Math.max(Math.min(Math.floor((w * h) / 50000), 15), 5);
      mathSymbols = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        text: symbolPool[Math.floor(Math.random() * symbolPool.length)],
        size: Math.random() * 10 + 11, // 11px to 21px
        alpha: Math.random() * 0.10 + 0.04, // extremely subtle (4% to 14% base opacity)
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initMathSymbols();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const connectionDistance = 120;
      const repulsionRadius = 110;
      const mouseInfluenceRadius = 200;

      // Draw math symbols first (background-most layer)
      for (let i = 0; i < mathSymbols.length; i++) {
        const sym = mathSymbols[i];

        // Drift slowly
        sym.x += sym.vx;
        sym.y += sym.vy;
        sym.angle += sym.rotSpeed;

        // Bounce/Wrap borders
        if (sym.x < -50) sym.x = w + 50;
        if (sym.x > w + 50) sym.x = -50;
        if (sym.y < -50) sym.y = h + 50;
        if (sym.y > h + 50) sym.y = -50;

        // Mouse repulsion on symbols
        const dx = sym.x - mouse.x;
        const dy = sym.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let currentAlpha = sym.alpha;
        let currentSize = sym.size;

        if (dist < mouseInfluenceRadius && dist > 0) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          const angle = Math.atan2(dy, dx);
          sym.x += Math.cos(angle) * force * 1.2;
          sym.y += Math.sin(angle) * force * 1.2;
          currentAlpha = Math.min(sym.alpha + force * 0.15, 0.35);
          currentSize = sym.size + force * 3;
        }

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.angle);
        ctx.font = `300 ${currentSize}px "JetBrains Mono", ui-monospace, Georgia, serif`;
        ctx.fillStyle = `rgba(34, 211, 238, ${currentAlpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sym.text, 0, 0);
        ctx.restore();
      }

      // Draw and connect stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionRadius && dist > 0) {
          const force = (repulsionRadius - dist) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          star.vx += Math.cos(angle) * force * 0.6;
          star.vy += Math.sin(angle) * force * 0.6;
        }

        star.vx += (star.baseX - star.x) * 0.007;
        star.vy += (star.baseY - star.y) * 0.007;
        star.vx *= 0.90;
        star.vy *= 0.90;
        star.x += star.vx;
        star.y += star.vy;
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const midX = (stars[i].x + stars[j].x) / 2;
            const midY = (stars[i].y + stars[j].y) / 2;
            const mouseDist = Math.sqrt(
              (midX - mouse.x) * (midX - mouse.x) +
              (midY - mouse.y) * (midY - mouse.y)
            );
            const mouseInf = Math.max(0, 1 - mouseDist / mouseInfluenceRadius);

            const baseOpacity = (1 - dist / connectionDistance) * 0.07;
            const opacity = Math.min(baseOpacity + mouseInf * 0.40, 0.55);

            ctx.strokeStyle = "rgba(34, 211, 238, " + opacity + ")";
            ctx.lineWidth = 0.4 + mouseInf * 0.4;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const mouseDist = Math.sqrt(
          (star.x - mouse.x) * (star.x - mouse.x) +
          (star.y - mouse.y) * (star.y - mouse.y)
        );
        const mouseInf = Math.max(0, 1 - mouseDist / mouseInfluenceRadius);
        const brightness = 0.20 + mouseInf * 0.80;
        const size = star.size + mouseInf * 1.3;

        if (mouseInf > 0.05) {
          ctx.fillStyle = "rgba(34, 211, 238, " + (mouseInf * 0.12) + ")";
          ctx.beginPath();
          ctx.arc(star.x, star.y, size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(255, 255, 255, " + brightness + ")";
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#060B18] via-[#080D1C] to-[#040810]" />
      <div className="fixed top-[8%] left-[12%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-cyan-500/5 blur-[130px] animate-float pointer-events-none z-0" />
      <div className="fixed bottom-[12%] right-[8%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-violet-500/5 blur-[110px] animate-float pointer-events-none z-0" style={{ animationDelay: "-3s" }} />
      <div className="fixed top-[45%] left-[45%] w-[300px] h-[300px] rounded-full bg-indigo-500/4 blur-[100px] animate-float pointer-events-none z-0" style={{ animationDelay: "-1.5s" }} />
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />
      <div className="fixed inset-0 z-[2] pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
    </>
  );
}

// ============================================================================
// LogoIcon
// ============================================================================
export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-bronze/40" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" className="text-bronze/30" />
      <path d="M50 22L74 40V68L50 82L26 68V40L50 22Z" stroke="currentColor" strokeWidth="2.2" className="text-bronze" />
      <path d="M50 32L66 44V60L50 70L34 60V44L50 32Z" stroke="currentColor" strokeWidth="1" className="text-bronze-light/50" />
      <circle cx="50" cy="50" r="4" fill="currentColor" className="text-bronze-light" />
    </svg>
  );
}

// ============================================================================
// Navbar
// ============================================================================
const navLinks = [
  { label: "About", to: "/#about" },
  { label: "Questions", to: "/#questions" },
  { label: "Library", to: "/#library" },
  { label: "Join CoM", to: "/#join", cta: true },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("/#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        const id = to.replace("/#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", to);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled || open
          ? "bg-obsidian/90 backdrop-blur-xl border-bronze-border"
          : "bg-obsidian/0 border-bronze-border/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/c98e0fd61_The_Collegium_of_Minds_Logo.jpeg"
              alt="Collegium of Minds"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-1 ring-bronze-border group-hover:ring-bronze transition-all" />
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-semibold text-silver tracking-wide">
              Collegium of Minds
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.cta ? (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => handleLinkClick(e, l.to)}
                  className="font-heading text-xs font-semibold tracking-widest uppercase px-5 py-2.5 border border-bronze-border text-bronze rounded hover:bg-bronze-dim transition-all"
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => handleLinkClick(e, l.to)}
                  className="text-silver-muted text-sm font-light tracking-wide hover:text-bronze transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-bronze after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform"
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          className="md:hidden p-2 text-silver-muted hover:text-bronze transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#060B18]/95 backdrop-blur-xl border-b border-bronze-border">
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => {
                    handleLinkClick(e, l.to);
                    setOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    l.cta
                      ? "font-heading text-xs font-semibold tracking-widest uppercase text-bronze border border-bronze-border text-center hover:bg-bronze-dim"
                      : "text-silver-muted text-sm font-light hover:text-bronze hover:bg-bronze-dim/30"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ============================================================================
// HeroSection
// ============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-20 sm:pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/5f23d660a_generated_image.png"
          alt="Cosmic black hole"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/20 to-obsidian" />
      </div>

      <div className="absolute top-1/4 left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-bronze/5 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-bronze/3 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-5 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
          <span className="font-body text-xs font-medium tracking-widest uppercase text-bronze">
            Est. 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading font-bold leading-none mb-6"
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-silver tracking-tight">
            The Collegium
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4 font-light italic text-bronze tracking-wide">
            of Minds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-silver text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-6 opacity-90"
        >
          A community for curious thinkers and lifelong learners.
          Explore ideas, discuss fundamental questions, and collaborate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/library"
            className="group inline-flex items-center justify-center gap-2 bg-bronze/10 border border-bronze text-bronze px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 hover:shadow-lg hover:shadow-bronze/10 transition-all hover:-translate-y-0.5"
          >
            Explore Ideas
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="#join"
            className="inline-flex items-center justify-center gap-2 border border-silver-dim text-silver-muted px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:border-bronze-border hover:text-silver transition-all"
          >
            Join the Collective
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2 mt-6"
        >
          <span className="text-silver-dim text-[10px] tracking-[3px] uppercase font-light">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-bronze to-transparent animate-pulse-bronze" />
          <ChevronDown size={14} className="text-bronze/40 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// StatsStrip
// ============================================================================
const stats = [
  { value: "10+", label: "Months Active" },
  { value: "60+", label: "Members" },
  { value: "9", label: "Societies" },
  { value: "∞", label: "Ideas on the Table" },
];

function StatCell({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  return (
    <div className="text-center py-4 sm:py-6 px-4 border-b sm:border-b-0 sm:border-r border-bronze-border/30 last:border-0">
      <span
        className={`font-heading text-3xl sm:text-4xl font-bold text-bronze block mb-2 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {value}
      </span>
      <span className="text-silver-dim text-[10px] sm:text-xs tracking-[2px] uppercase font-light">
        {label}
      </span>
    </div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 border-y border-bronze-border/30 backdrop-blur-md bg-obsidian/20"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4">
        {stats.map((s, i) => (
          <StatCell key={i} {...s} inView={inView} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SectionDivider
// ============================================================================
function SectionDivider() {
  return (
    <div className="relative z-10 w-[60%] max-w-lg mx-auto h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />
  );
}

// ============================================================================
// VisionSection
// ============================================================================
function VisionSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
          <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
            The Vision
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-6 leading-tight">
          Think. Explore. Discover.
        </h2>

        <p className="text-silver-muted text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
          The Collegium of Minds welcomes individuals passionate about exploring
          science, mathematics, philosophy, literature, history, technology,
          arts, and beyond. Here, ideas are shared, questions are celebrated,
          and minds come together to discover, discuss, and innovate.
        </p>

        <a
          href="#about"
          className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5"
        >
          More About Us
        </a>
      </ScrollReveal>
    </section>
  );
}

// ============================================================================
// AboutSection
// ============================================================================
const societies = [
  {
    icon: "🚀",
    name: "Physics",
    questions: [
      "If gravity disappeared for one second, what would happen?",
      "Can anything really travel faster than light?",
      "Why does time move forward and not backward?"
    ],
    members: 32
  },
  {
    icon: "🧪",
    name: "Chemistry",
    questions: [
      "Can chemistry solve the world's energy problem?",
      "Why are some reactions explosive while others are slow?",
      "Could we invent completely new materials that don't exist in nature?"
    ],
    members: 21
  },
  {
    icon: "🧬",
    name: "Biology",
    questions: [
      "Should humans edit their own genes?",
      "Could life exist without DNA?",
      "Why do living things age?"
    ],
    members: 18
  },
  {
    icon: "➗",
    name: "Mathematics",
    questions: [
      "Was mathematics invented or discovered?",
      "Can infinity have an end?",
      "Are there problems that computers can never solve?"
    ],
    members: 28
  },
  {
    icon: "🤔",
    name: "Philosophy",
    questions: [
      "What makes someone the same person over time?",
      "Can something be morally right if everyone thinks it's wrong?",
      "Do we really have free will?"
    ],
    members: 21
  },
  {
    icon: "💻",
    name: "Technology",
    questions: [
      "Will AI make humans more creative or less?",
      "Can technology solve every problem?",
      "What should AI never be allowed to do?"
    ],
    members: 23
  },
  {
    icon: "🌌",
    name: "Cosmology",
    questions: [
      "Is there anything beyond the observable universe?",
      "Could there be another Earth somewhere in space?",
      "Will the universe ever end?"
    ],
    members: 27
  },
  {
    icon: "🏛️",
    name: "Social Sciences",
    questions: [
      "What makes a society successful?",
      "Can one person really change history?",
      "How much does social media shape our opinions?"
    ],
    members: 15
  },
  {
    icon: "🎨",
    name: "Arts & Literature",
    questions: [
      "Can AI create true art?",
      "Why do stories matter to humans?",
      "What makes a piece of art timeless?"
    ],
    members: 22
  },
];

function AboutSection() {
  const [selectedSociety, setSelectedSociety] = useState<typeof societies[0] | null>(null);

  return (
    <section id="about" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                About
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-8 leading-tight">
              Curiosity over<br />conformity.
            </h2>

            <div className="space-y-6 text-silver-muted text-sm sm:text-base font-light leading-relaxed max-w-xl">
              <p>
                The Collegium of Minds is not just a club—it is an open intellectual
                space for anyone driven by curiosity rather than conformity. It exists
                for those who believe that learning is a lifelong process, and that the
                most meaningful questions often have no immediate or final answers.
              </p>
              <p>
                CoM functions as a decentralized laboratory of ideas. It brings together
                individuals from different backgrounds, disciplines, and stages of life
                to explore thought without rigid boundaries. Here, science meets philosophy,
                technology intersects with society, and abstract theories are examined for
                their real-world relevance.
              </p>
              <p>
                From discussions on physics, space, and artificial intelligence to
                reflections on history, ethics, and human progress, CoM encourages depth
                over speed and understanding over memorization.
              </p>
            </div>

            <a
              href="#join"
              className="mt-10 inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5 group"
            >
              Get Involved
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={150}>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Our Societies
              </span>
            </div>

            <p className="font-heading text-lg sm:text-xl text-silver mb-6 italic">
              Explore our societies and find the one that matches your{" "}
              <span className="text-bronze font-semibold">interests</span>.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {societies.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSociety(s)}
                  className="group flex items-center gap-3 bg-obsidian-surface/60 border border-bronze-border/15 rounded-xl p-3.5 hover:bg-bronze-dim/20 hover:border-bronze/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left w-full focus:outline-none"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-heading text-sm font-semibold tracking-wide text-silver">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={200} className="mt-12">
        <div className="rounded-2xl overflow-hidden border border-bronze-border/20">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/ee4c7f57a_generated_image.png"
            alt="Scientific study environment with cosmic light"
            className="w-full h-48 sm:h-64 object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
          />
        </div>
      </ScrollReveal>

      {/* Society Details Modal */}
      {selectedSociety && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-obsidian border border-bronze-border/20 max-w-md w-full rounded-2xl overflow-hidden relative shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedSociety(null)}
              className="absolute top-4 right-4 text-silver-dim hover:text-silver text-xs font-mono uppercase bg-obsidian-surface px-2.5 py-1 rounded border border-bronze-border/10 cursor-pointer"
            >
              Close
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{selectedSociety.icon}</span>
              <h3 className="font-heading text-xl font-bold text-silver">
                {selectedSociety.name} Society
              </h3>
            </div>
            <div className="mb-6 space-y-3">
              <h4 className="text-[10px] font-heading font-semibold tracking-wider text-bronze uppercase">
                Questions We Discuss
              </h4>
              <ul className="space-y-3">
                {selectedSociety.questions.map((q, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-silver-muted font-light leading-relaxed">
                    <span className="text-bronze font-bold mt-0.5">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-bronze-border/10 flex items-center justify-between">
              <span className="text-[10px] font-heading font-semibold tracking-wider text-silver-dim uppercase">
                Society Size
              </span>
              <span className="font-heading text-sm font-bold text-silver">
                <span className="text-bronze font-mono mr-1">{selectedSociety.members}</span> Inquirers
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// QuestionsSection
// ============================================================================
const questions = [
  "Is consciousness computable, or does it require something beyond matter?",
  "What actually happens inside a black hole, and can we ever know?",
  "Can civilization survive the arrival of artificial superintelligence?",
  "Is mathematics discovered, or invented by the human mind?",
  "What is intelligence — and does our definition of it even make sense?",
  "Could spacetime itself emerge from information? What would that mean?",
];

const weeklyQuestions = [
  {
    id: "q_progress",
    question: "Which has contributed more to humanity's progress?",
    options: [
      "Curiosity",
      "Necessity",
      "Competition",
      "Cooperation"
    ]
  },
  {
    id: "q_discovery",
    question: "Are the greatest discoveries made by asking better questions or finding better answers?",
    options: [
      "Better questions",
      "Better answers",
      "Both are equally important",
      "Neither — timing matters most"
    ]
  },
  {
    id: "q_truth",
    question: "If everyone believed something that wasn't true, would it still be wrong?",
    options: [
      "Yes",
      "No",
      "It depends on the situation",
      "I'm not sure"
    ]
  },
  {
    id: "q_future",
    question: "What will shape humanity's future the most?",
    options: [
      "Artificial Intelligence",
      "Scientific discoveries",
      "Education",
      "Human cooperation"
    ]
  },
  {
    id: "q_unknown",
    question: "What's more exciting?",
    options: [
      "Discovering something new",
      "Solving an old mystery",
      "Creating something original",
      "Teaching others what you know"
    ]
  },
  {
    id: "q_limit",
    question: "Which is humanity's greatest limitation?",
    options: [
      "Knowledge",
      "Time",
      "Imagination",
      "Cooperation"
    ]
  }
];
/*
function QuestionsSection() {
  const { toast } = useToast();
  const [pollIndex, setPollIndex] = useState(0);
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  const activePoll = weeklyQuestions[pollIndex];

  // Load poll for current week + user's vote + real vote counts
  useEffect(() => {
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyQuestions.length;
    setPollIndex(weekIndex);

    const pollId = weeklyQuestions[weekIndex].id;
    const numOptions = weeklyQuestions[weekIndex].options.length;

    // Check if user already voted this week
    const savedVote = localStorage.getItem(`com_poll_voted_${pollId}`);
    setVotedOption(savedVote ? parseInt(savedVote, 10) : null);

    // Fetch real votes from Firebase
    getPollVotes(pollId, numOptions).then((fetchedVotes) => {
      setVotes(fetchedVotes);
    });
  }, [pollIndex]);

  const handleVote = async (optionIdx: number) => {
    if (votedOption !== null) return;

    const pollId = activePoll.id;

    try {
      await submitVote(pollId, optionIdx);

      // Update local state
      const newVotes = [...votes];
      newVotes[optionIdx] = (newVotes[optionIdx] || 0) + 1;
      setVotes(newVotes);
      setVotedOption(optionIdx);

      // Save to localStorage so user can't vote again this week
      localStorage.setItem(`com_poll_voted_${pollId}`, optionIdx.toString());

      toast({
        title: "Vote Recorded",
        description: "Your perspective has been added to the collective record.",
      });
    } catch (err) {
      toast({
        title: "Vote Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };
*/

function QuestionsSection() {
  const { toast } = useToast();
  const [pollIndex, setPollIndex] = useState(0);
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  const activePoll = weeklyQuestions[pollIndex];

  useEffect(() => {
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyQuestions.length;
    setPollIndex(weekIndex);

    const pollId = weeklyQuestions[weekIndex].id;
    const numOptions = weeklyQuestions[weekIndex].options.length;

    const savedVote = localStorage.getItem(`com_poll_voted_${pollId}`);
    setVotedOption(savedVote ? parseInt(savedVote, 10) : null);

    getPollVotes(pollId, numOptions).then(setVotes);
  }, [pollIndex]);

  const handleVote = async (optionIdx: number) => {
    if (votedOption !== null) return;

    const pollId = activePoll.id;
    try {
      await submitVote(pollId, optionIdx);

      const newVotes = [...votes];
      newVotes[optionIdx] = (newVotes[optionIdx] || 0) + 1;
      setVotes(newVotes);
      setVotedOption(optionIdx);

      localStorage.setItem(`com_poll_voted_${pollId}`, optionIdx.toString());

      toast({ title: "Vote Recorded", description: "Thank you!" });
    } catch (err) {
      toast({ title: "Failed", description: "Try again.", variant: "destructive" });
    }
  };

  const handleRetractVote = async () => {
    if (votedOption === null) return;

    const pollId = activePoll.id;
    const currentOption = votedOption;

    try {
      await retractVote(pollId, currentOption);

      // Update local state
      const newVotes = [...votes];
      if (newVotes[currentOption] > 0) {
        newVotes[currentOption] -= 1;
      }
      setVotes(newVotes);
      setVotedOption(null);

      // Remove from localStorage
      localStorage.removeItem(`com_poll_voted_${pollId}`);

      toast({
        title: "Vote Retracted",
        description: "Your vote has been removed. You can now select another option.",
      });
    } catch (err) {
      toast({
        title: "Retraction Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const totalVotes = votes.reduce((sum, v) => sum + v, 0);
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <section id="questions" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
          <HelpCircle className="w-3.5 h-3.5 text-bronze animate-pulse" />
          <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
            Questions We Ask
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight leading-tight">
          This is what drives us.
        </h2>
        <p className="text-silver-muted text-sm sm:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
          The ultimate frontiers of science and philosophy cannot be conquered; they are playgrounds to be explored.
        </p>
      </ScrollReveal>

      <ScrollReveal className="mb-14 flex justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-bronze-border/30 shadow-lg shadow-bronze/5">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/cf60e2ea0_generated_image.png"
            alt="Silhouette gazing at blue planet in cosmic sky"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </ScrollReveal>

      {/* Grid of Standard Philosophical Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {questions.map((q, i) => (
          <ScrollReveal key={i} delay={i * 65}>
            <div className="group relative bg-obsidian-surface/50 border border-bronze-border/10 rounded-2xl p-7 sm:p-8 hover:bg-bronze-dim/10 hover:border-bronze/25 transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <span className="absolute top-4 left-6 font-heading text-4xl text-bronze/10 leading-none select-none">
                "
              </span>
              <p className="text-silver-muted text-sm font-light italic leading-relaxed pt-4 group-hover:text-silver transition-colors">
                {q}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* QUESTION OF THE WEEK LINK (REPLACED POLL) */}
      <ScrollReveal delay={100} className="mb-8 w-full">
        <div className="border border-bronze-border/30 rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-bronze-dim/30 via-obsidian-surface/40 to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 border-b border-bronze-border/10 pb-8 mb-8">
            <div className="flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[3px] uppercase text-bronze whitespace-nowrap bg-bronze-dim border border-bronze-border px-4 py-1.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-bronze animate-pulse" />
              <span>Question of the Week</span>
            </div>
            <p className="text-silver text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
              "{activePoll?.question || ""}"
            </p>
          </div>

          <div className="text-center py-4">
            <p className="text-silver-muted text-sm font-light mb-6">
              Our members are actively debating and voting on this question. Share your perspective and see live statistics on our interactive polling page.
            </p>
            <Link
              to="/questions"
              className="group inline-flex items-center justify-center gap-2 bg-bronze text-obsidian px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze-light hover:shadow-lg hover:shadow-bronze/20 transition-all hover:-translate-y-0.5"
            >
              Cast Your Vote
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ============================================================================
// DiscussionsSection (Discord & Forum teaser)
// ============================================================================
/*
const recentDiscussions = [
  {
    channel: "#quantum-metaphysics",
    title: "Is Spacetime an Emergent Hologram?",
    lastActive: "4m ago",
    activeUser: "sarvesh_kore",
    replies: 58,
    votes: 42
  },
  {
    channel: "#philosophy-of-mind",
    title: "The Hard Problem: Inside the Computable Brain",
    lastActive: "12m ago",
    activeUser: "joel_mendonca",
    replies: 34,
    votes: 27
  },
  {
    channel: "#cosmology-debate",
    title: "Breakdowns in Energy Conservation in Expanding Spacetime",
    lastActive: "1h ago",
    activeUser: "entropy_pioneer",
    replies: 17,
    votes: 11
  },
  {
    channel: "#mathematical-art",
    title: "Fibonacci Spirals: Code Symmetries in Plant Growth",
    lastActive: "3h ago",
    activeUser: "nature_coder",
    replies: 45,
    votes: 31
  }
];

function DiscussionsSection() {
  const { toast } = useToast();

  const handleJoinSocial = (platform: string) => {
    toast({
      title: "Opening Invite Link",
      description: `Connecting you to our active ${platform} community portal.`
    });
  };

  return (
    <section className="relative z-10 py-20 bg-obsidian-surface/20 border-y border-bronze-border/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-bronze" />
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Connect & Discuss
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver tracking-tight leading-tight mb-4">
              Step inside our digital salon.
            </h2>
            <p className="text-silver-muted text-sm sm:text-base font-light leading-relaxed mb-8">
              True learning is dialogic. Our Discord servers and forum boards host continuous, high-fidelity debates on quantum physics, transfinite set theory, creative systems, and history. Connect with thousands of minds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleJoinSocial("Discord")}
                className="group inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#5865F2]/90 text-white px-6 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded shadow-lg shadow-[#5865F2]/20 transition-all hover:-translate-y-0.5"
              >
                Join CoM Discord
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => handleJoinSocial("Forum Board")}
                className="inline-flex items-center justify-center gap-2 border border-bronze text-bronze bg-bronze-dim px-6 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
              >
                Enter Bulletin Forum
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Forum Feed
            </h3>

            <div className="space-y-3">
              {recentDiscussions.map((disc, idx) => (
                <div 
                  key={idx}
                  className="glowing-card flex items-center justify-between p-4 bg-obsidian-surface/60 border border-bronze-border/10 rounded-xl"
                >
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <span className="text-[10px] font-mono text-bronze font-medium">{disc.channel}</span>
                    <h4 className="text-sm font-semibold text-silver truncate">{disc.title}</h4>
                    <p className="text-[10px] text-silver-dim/60">
                      Active {disc.lastActive} • by <span className="text-silver-muted font-mono">{disc.activeUser}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-silver-dim">
                    <div className="flex flex-col items-center">
                      <span className="text-silver font-semibold">{disc.replies}</span>
                      <span className="text-[8px] uppercase tracking-wider">replies</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-bronze-border/10 pl-4">
                      <span className="text-bronze font-semibold">{disc.votes}</span>
                      <span className="text-[8px] uppercase tracking-wider">upvotes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
*/
// ============================================================================
// LibrarySection (Featured Article Carousel & Live Counters)
// ============================================================================
function LibrarySection() {
  const { toast } = useToast();
  const carouselArticles = articles.filter(a => a.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewsCount, setViewsCount] = useState(1482);

  // Increment and sync page views on mount
  useEffect(() => {
    incrementPageViews().then(() => {
      getPageViews().then(views => {
        if (views > 0) {
          setViewsCount(views);
        }
      });
    });
  }, []);

  // Auto-play controls
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselArticles.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, carouselArticles.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carouselArticles.length) % carouselArticles.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselArticles.length);
  };

  const activeArticle = carouselArticles[currentIndex];
  const colors = categoryColors[activeArticle.category] || categoryColors["The Physical World"];

  return (
    <section id="library" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-bronze-border/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <Award className="w-3.5 h-3.5 text-bronze animate-pulse" />
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                The Library & Media
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight leading-tight">
              What we're thinking.
            </h2>
          </div>
          <p className="text-silver-muted text-sm font-light max-w-xs leading-relaxed sm:text-right">
            Ideas and articles from our members — join us to share yours as well.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mb-10">
        <div className="rounded-2xl overflow-hidden border border-bronze-border/20 h-40 sm:h-52">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/1fb8d0abe_generated_image.png"
            alt="Floating books and scrolls in blue cosmic space"
            className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-700"
          />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Featured Article Carousel Slider */}
        <ScrollReveal className="lg:col-span-8 bg-obsidian-surface/40 border border-bronze-border/15 rounded-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-md">
          {/* Subtle colored background halo based on current article */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-bronze/5 blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-heading font-semibold tracking-[3.5px] uppercase text-silver-dim flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-ping" />
              Featured Curator Pick
            </span>

            {/* Play/Pause control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze transition-colors"
              title={isPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>

          {/* Carousel Slide Container */}
          <div className="min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div>
                  {activeArticle.coverImage && (
                    <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-xl mb-6 border border-bronze-border/10">
                      <img 
                        src={activeArticle.coverImage} 
                        alt={activeArticle.title}
                        className="w-full h-full object-cover opacity-70"
                        referrerPolicy="no-referrer"
                      />
                      {/* elegant bottom fade mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-100" />
                    </div>
                  )}
                  <span className={`inline-block text-[9px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.text} ${colors.bg} ${colors.border} mb-4`}>
                    {activeArticle.category}
                  </span>
                  <Link to={`/library/${activeArticle.slug}`} className="group block">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-silver tracking-tight leading-tight group-hover:text-bronze transition-colors mb-3">
                      {activeArticle.title}
                    </h3>
                  </Link>
                  <p className="text-silver-muted text-sm font-light leading-relaxed max-w-2xl mb-6">
                    {activeArticle.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between border-t border-bronze-border/10 pt-4 gap-4 mt-auto">
                  <div className="flex items-center gap-4 text-xs text-silver-dim">
                    <span className="font-medium text-silver-muted">{activeArticle.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {activeArticle.readTime}
                    </span>
                  </div>

                  <Link
                    to={`/library/${activeArticle.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold tracking-widest uppercase text-bronze hover:text-bronze-light transition-colors"
                  >
                    Read Full Essay <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots & Manual buttons */}
          <div className="flex items-center justify-between mt-10 pt-4 border-t border-bronze-border/5">
            <div className="flex items-center gap-1.5">
              {carouselArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 bg-bronze" : "w-1.5 bg-silver-dim/30 hover:bg-bronze/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze hover:border-bronze/40 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze hover:border-bronze/40 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Social Proof, Magazine & Founding Members */}
        <ScrollReveal className="lg:col-span-4 space-y-6">
          {/* Stats Bar */}
          <div className="border border-bronze-border/15 bg-obsidian-surface/40 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase mb-4">
              Curiosity Stats
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="flex flex-col gap-0.5 border-r border-bronze-border/10 pr-2">
                <span className="font-heading text-lg font-bold text-silver">{viewsCount.toLocaleString()}</span>
                <span className="text-[9px] text-silver-dim tracking-wider uppercase">Viewers</span>
              </div>
              <div className="flex flex-col gap-0.5 pl-2">
                <span className="font-heading text-lg font-bold text-silver">{articles.length}</span>
                <span className="text-[9px] text-silver-dim tracking-wider uppercase">Articles</span>
              </div>
            </div>
          </div>

          {/* Share thoughts / Join card */}
          <div className="glowing-card border border-bronze border-bronze-border/20 bg-gradient-to-br from-bronze-dim/35 to-transparent p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-3 -right-3 p-4 bg-bronze/10 rounded-full border border-bronze/20">
              <MessageSquare className="w-5 h-5 text-bronze animate-pulse" />
            </div>
            <h3 className="font-heading text-sm font-bold text-silver tracking-wide mb-2 flex items-center gap-1.5">
              Share Your Perspective
            </h3>
            <p className="text-silver-muted text-xs font-light leading-relaxed mb-4">
              Have a speculative scientific theory, mathematical breakthrough, or philosophy question? Join our collective discussion, publish your thoughts, and review other inquiries.
            </p>
            <a
              href="#join"
              className="w-full inline-flex items-center justify-center gap-2 bg-bronze/10 border border-bronze text-bronze px-4 py-2 text-[10px] font-heading font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
            >
              Join the Collegium
            </a>
          </div>

          {/* CoM Notebook Teaser card */}
          <div className="border border-bronze-border/10 bg-obsidian-surface/20 p-6 rounded-2xl relative">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase mb-3 flex items-center gap-1.5">
              Monthly Gazette
            </h3>
            <h4 className="font-heading text-base font-bold text-silver mb-1 leading-tight">
              The CoM Notebook
            </h4>
            <p className="text-silver-muted text-xs font-light leading-relaxed mb-4">
              Explore past printed issues of our monthly curated publication. Features mathematical diagrams, art, and Spec-Sci paper drafts.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-bronze transition-colors"
            >
              Browse Magazine Catalog <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={150}>
        <div className="flex justify-center mt-12">
          <Link
            to="/library"
            className="group inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5"
          >
            Open Complete Library Archives
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ============================================================================
// NewsletterSection (CoM Notebook subscription box)
// ============================================================================
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive"
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Enrollment Secured",
      description: "Redirecting you to the CoM Substack..."
    });
    setTimeout(() => {
      window.location.href = "https://thecollegiumofminds.substack.com/subscribe";
    }, 1200);
  };

  return (
    <section className="relative z-10 py-16 px-5 sm:px-8 max-w-4xl mx-auto">
      <div className="glass-panel border-bronze-border/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden glowing-card">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-40 bg-gradient-to-r from-transparent via-bronze to-transparent" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-bronze/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver tracking-tight">
            Subscribe to the CoM Substack Notebook
          </h2>
          <p className="text-silver-muted text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            Join the CoM Notebook to access published articles, written works, and selected community content in one place. It’s a simple archive of what CoM creates—collected, organized, and easy to revisit. Stay connected to the ideas worth keeping. Delivered directly to your inbox via our Substack newsletter.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-obsidian/75 border border-bronze-border/15 rounded-xl px-4 py-3 text-silver text-xs focus:border-bronze/40 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-bronze text-obsidian px-5 py-3 font-heading text-[10px] font-semibold tracking-widest uppercase rounded hover:bg-bronze-light transition-colors whitespace-nowrap"
              >
                Enroll on Substack
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bronze-dim border border-bronze-border/30 rounded-2xl p-4 mt-6 max-w-md mx-auto"
            >
              <p className="text-xs font-semibold text-bronze tracking-wide uppercase mb-1">✓ Connection Established</p>
              <p className="text-xs text-silver-muted font-light">Redirecting you to the CoM Substack...</p>
            </motion.div>
          )}
          <p className="text-[9px] text-silver-dim/60 font-mono mt-4">
            Zero noise. Zero spam. Pure conceptual signal. Powered by Substack.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// JoinSection
// ============================================================================
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBE1mrrINeO_e-ZWEUQMgKJ0_H092IQ1NuFiA3A05PTUJg6A/viewform";
const GUIDELINES_URL = "https://docs.google.com/document/d/1XoxcR-ZKuqt6kvdyBPiHqpQ1Y7T_tWgGbE90ewQCzKY/edit?usp=sharing";

const educationalLevels = [
  "Student (Grade 5 or below)",
  "Student (Grade 6-8)",
  "Student (Grade 9-12)",
  "Student (College/University)",
  "Professional",
  "Rather not tell",
];

const perks = [
  { icon: "🔍", text: "Explore Ideas" },
  { icon: "🤝", text: "Meet curious thinkers" },
  { icon: "💡", text: "Ask Better Questions" },
  { icon: "🧠", text: "Intellectual Discussions" },
  { icon: "🗣️", text: "Debate & Discourse" },
  { icon: "🌍", text: "Diverse Perspectives" },
];

const steps = [
  { key: "name", label: "What's your name?", placeholder: "Full name" },
  { key: "social", label: "Discord username or WhatsApp number?", placeholder: "e.g. username#1234 or +1...", hint: "Helps us connect with you directly on social channels." },
  { key: "education", label: "What's your educational level?", options: educationalLevels },
  { key: "description", label: "Describe yourself.", placeholder: "Tell us about yourself...", textarea: true },
  { key: "guidelines", label: "Agreement to Community Guidelines", checkbox: true },
];

function JoinSection() {
  const { toast: toastFn } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ name: string; social: string; education: string; description: string; guidelines: boolean }>({ name: "", social: "", education: "", description: "", guidelines: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const canProceed = () => {
    if (current.key === "name") return form.name.trim().length > 0;
    if (current.key === "social") return form.social.trim().length > 0;
    if (current.key === "education") return form.education.length > 0;
    if (current.key === "guidelines") return form.guidelines === true;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await authClient.entities.MemberApplication.create({
        full_name: form.name,
        phone_number: form.social,
        educational_level: form.education,
        self_description: form.description,
        agreed_to_guidelines: form.guidelines,
      });
      setSubmitted(true);
      toastFn({ title: "Almost there!", description: "Click below to complete your application." });
    } catch {
      toastFn({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  if (submitted) {
    return (
      <section id="join" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="bg-obsidian-surface/60 border border-bronze/30 rounded-3xl p-10 sm:p-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-bronze/20 border-2 border-bronze flex items-center justify-center mb-8">
              <Check size={32} className="text-bronze" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver mb-4">
              Welcome to the Collegium.
            </h2>
            <p className="text-silver-muted font-light text-base max-w-md mx-auto mb-6">
              Your responses have been noted. To complete your application,
              please submit the official form below.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
            >
              Open Google Form
              <ArrowRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section id="join" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Join
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-6 leading-tight">
              Become a founding member.
            </h2>

            <p className="text-silver-muted text-sm sm:text-base font-light leading-relaxed max-w-md mb-10">
              CoM is still in its earliest stage. Every member who joins now helps
              define its culture, projects, and future direction.
            </p>

            <div className="rounded-2xl overflow-hidden border border-bronze-border/20 mb-10">
              <img
                src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/f332e5f29_generated_f0498456.png"
                alt="Ancient open book with golden edges"
                className="w-full h-40 sm:h-48 object-cover opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <span className="text-base">{p.icon}</span>
                  <span className="text-silver-muted text-xs sm:text-sm font-light">{p.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollReveal delay={150}>
            <div className="bg-obsidian-surface/60 border border-bronze-border/20 rounded-3xl p-6 sm:p-10">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                    Apply to CoM
                  </span>
                  <span className="text-silver-dim text-[11px] font-light">
                    Step {step + 1} of {steps.length}
                  </span>
                </div>
                <div className="w-full h-0.5 bg-obsidian-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bronze to-bronze-light rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[280px] sm:min-h-[320px] flex flex-col">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-silver mb-8">
                  {current.label}
                </h3>

                <div className="flex-1">
                  {current.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setForm({ ...form, education: opt })}
                          className={`text-left px-4 py-3 rounded-xl border text-sm font-light transition-all ${
                            form.education === opt
                              ? "border-bronze bg-bronze/15 text-bronze"
                              : "border-bronze-border/15 text-silver-muted hover:border-bronze/30 hover:bg-bronze-dim/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : current.checkbox ? (
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setForm({ ...form, guidelines: !form.guidelines })}
                        className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          form.guidelines
                            ? "border-bronze bg-bronze/20"
                            : "border-bronze-border/30 hover:border-bronze/50"
                        }`}
                      >
                        {form.guidelines && <Check size={16} className="text-bronze" />}
                      </button>
                      <div className="text-silver-muted text-sm font-light leading-relaxed">
                        I confirm that I have read, understand, and agree to follow the{" "}
                        <a
                          href={GUIDELINES_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bronze hover:underline inline-flex items-center gap-1"
                        >
                          Community Guidelines
                          <ExternalLink size={12} />
                        </a>.
                      </div>
                    </div>
                  ) : current.textarea ? (
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder={current.placeholder}
                      className="w-full h-32 bg-obsidian-light/50 border border-bronze-border/15 rounded-xl px-5 py-4 text-silver text-sm font-light placeholder:text-silver-dim/40 focus:border-bronze/40 focus:outline-none transition-colors resize-none"
                    />
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={form[current.key as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [current.key]: e.target.value })}
                        placeholder={current.placeholder}
                        onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
                        className="w-full bg-obsidian-light/50 border border-bronze-border/15 rounded-xl px-5 py-4 text-silver text-sm font-light placeholder:text-silver-dim/40 focus:border-bronze/40 focus:outline-none transition-colors"
                      />
                      {current.hint && (
                        <p className="text-silver-dim text-xs font-light mt-3">{current.hint}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-bronze-border/10">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-silver-muted text-sm font-light hover:text-silver transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <button
                    onClick={next}
                    disabled={!canProceed() || submitting}
                    className="flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-6 py-2.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-bronze/30 border-t-bronze rounded-full animate-spin" />
                    ) : step === steps.length - 1 ? (
                      <>
                        <Sparkles size={14} />
                        Continue to Form
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Footer
// ============================================================================
const randomQuestions = [
  "If you could know the answer to one question, what would it be?",
  "Is there a fundamental limit to human knowledge?",
  "What would a perfect education system look like?",
  "Can beauty be reduced to mathematics?",
  "What will humans wonder about 1,000 years from now?",
  "Is there a thought that no mind has ever had?",
  "Does silence have a sound?",
  "What exists beyond the edge of the observable universe?",
];

const exploreLinks = [
  { label: "About CoM", href: "#about" },
  { label: "Questions We Ask", href: "#questions" },
  { label: "Library", to: "/library" },
  { label: "Join CoM", href: "#join" },
];

const connectLinks = [
  { label: "Instagram", href: "https://instagram.com", note: "coming soon" },
  { label: "LinkedIn", href: "https://linkedin.com", note: "coming soon" },
  { label: "Discord", href: "https://discord.gg/bEMYvJ7eU3" },
  { label: "Email the Club", href: "mailto:collegiumofminds@gmail.com" },
];

export function Footer() {
  const [randomQ, setRandomQ] = useState(randomQuestions[0]);

  useEffect(() => {
    setRandomQ(randomQuestions[Math.floor(Math.random() * randomQuestions.length)]);
  }, []);

  return (
    <footer className="relative z-10 border-t border-bronze-border/20 bg-obsidian/80">
      <div className="border-b border-bronze-border/10 py-6 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="font-heading text-[9px] font-semibold tracking-[3px] uppercase text-bronze/60 whitespace-nowrap">
            Ponder this
          </span>
          <p className="text-silver-muted text-sm font-light italic">"{randomQ}"</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/c98e0fd61_The_Collegium_of_Minds_Logo.jpeg"
              alt="Collegium of Minds"
              className="w-8 h-8 rounded-full ring-1 ring-bronze-border" />
              <span className="font-heading text-base font-bold text-silver">
                Collegium of Minds
              </span>
            </div>
            <p className="text-silver-dim text-xs tracking-wider uppercase font-light mb-4">
              Think. Explore. Discover.
            </p>
            <p className="text-silver-dim text-sm font-light leading-relaxed max-w-xs">
              A community for curious thinkers and lifelong learners. Where ideas
              are shared and questions are celebrated.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((l) =>
              <li key={l.label}>
                  {l.to ?
                <Link to={l.to} className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                      {l.label}
                    </Link> :
                <a href={l.href} className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                      {l.label}
                    </a>
                }
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((l) =>
              <li key={l.label}>
                  <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                    {l.label}
                    {l.note && <span className="text-silver-dim/40 text-xs ml-2">— {l.note}</span>}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-bronze-border/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <span className="text-silver-dim text-xs font-light">
            © 2025 Collegium of Minds. All rights reserved.
          </span>
          <span className="text-silver-dim text-xs font-light flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
            Always questioning
          </span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// Home page
// ============================================================================
export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden">
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <SectionDivider />
      <VisionSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <QuestionsSection />
      <SectionDivider />
      <LibrarySection />
      <SectionDivider />
      <NewsletterSection />
      <SectionDivider />
      <JoinSection />
      <Footer />
    </div>
  );
}
