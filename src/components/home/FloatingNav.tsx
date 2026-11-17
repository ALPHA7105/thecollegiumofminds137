import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ModernCtaButton } from "../ui/ModernCtaButton";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, to: string) => {
    setOpen(false);
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

  const navLinks = [
    { label: "About", to: "/#about" },
    { label: "Disciplines", to: "/#disciplines" },
    { label: "Questions", to: "/#questions" },
    { label: "Library", to: "/library" },
    { label: "Discussions", to: "/#discussions" },
    { label: "Events", to: "/events" },
  ];

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex justify-center pointer-events-none w-full px-4 sm:px-0">
      <header
        className={`pointer-events-auto relative flex flex-col items-center transition-all duration-300 ${
          open ? "w-full max-w-[360px]" : "w-auto max-w-[95vw]"
        }`}
      >
        {/* Left Inverted Concave Corner Wing (Ivory/Cream ceiling fillet connection) */}
        {!open && (
          <div
            className="hidden sm:block absolute top-0 -left-[20px] w-[20px] h-[20px] overflow-visible pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" width="20" height="20" className="w-full h-full block">
              <path d="M 20 0 L 0 0 C 11.046 0 20 8.954 20 20 Z" fill="#F4F0EA" />
              <path
                d="M 0 0 C 11.046 0 20 8.954 20 20"
                fill="none"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}

        {/* Right Inverted Concave Corner Wing (Ivory/Cream ceiling fillet connection) */}
        {!open && (
          <div
            className="hidden sm:block absolute top-0 -right-[20px] w-[20px] h-[20px] overflow-visible pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" width="20" height="20" className="w-full h-full block">
              <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" fill="#F4F0EA" />
              <path
                d="M 20 0 C 8.954 0 0 8.954 0 20"
                fill="none"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}

        {/* Primary Navigation Capsule Bar — Sculptural Warm Ivory / Cream (#F4F0EA) */}
        <nav
          aria-label="Primary Navigation"
          className={`relative bg-[#F4F0EA] text-[#0A0A0A] border-b border-x border-black/8 transition-all duration-300 ${
            open
              ? "rounded-b-[20px] w-full p-4 shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
              : "rounded-b-[18px] px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.2)] flex items-center gap-6 md:gap-9"
          }`}
        >
          {/* Top Bar Row (Brand + Nav Links + CTA on Desktop; Brand + Toggle on Mobile) */}
          <div className="w-full flex items-center justify-between gap-4 sm:gap-8">
            {/* Left: Brand Identity Cluster (Squircle emblem + dark SemiBold wordmark) */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setOpen(false);
              }}
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="The Collegium of Minds Home"
            >
              <div className="w-[30px] h-[30px] rounded-[8px] overflow-hidden border border-black/10 bg-[#E8E3DB] flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-sm">
                <img
                  src="/logo.jpeg"
                  alt="CoM Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-sans text-[13px] sm:text-[14px] font-semibold tracking-[-0.02em] text-[#0A0A0A] group-hover:text-black transition-colors whitespace-nowrap">
                Collegium of Minds
              </span>
            </Link>

            {/* Desktop Center/Right Navigation Links (14px Medium, refined high-contrast dark tones) */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={(e) => handleLinkClick(e, item.to)}
                  className="font-sans text-[13px] lg:text-[14px] font-medium tracking-[-0.02em] text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors duration-150 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}

              {/* Action CTA Button (Carbon Black high-contrast inverted pill with Text Flip & Liquid Fill) */}
              <ModernCtaButton
                to="/#join"
                onClick={(e) => handleLinkClick(e, "/#join")}
                text="Join CoM"
                subText="Enter Guild"
                icon={<ArrowUpRight size={13} />}
                variant="dark"
                size="sm"
                className="ml-2 font-sans font-semibold tracking-[-0.02em]"
              />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1.5 rounded-lg text-[#0A0A0A]/75 hover:text-black hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black/20"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Expanded Menu (Ivory/Cream drawer with crisp dark typography) */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full flex flex-col gap-3.5 pt-4 pb-2 border-t border-black/8 mt-3"
              >
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={(e) => handleLinkClick(e, item.to)}
                    className="font-sans text-[14px] font-medium tracking-[-0.02em] text-[#0A0A0A]/80 hover:text-black py-1 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-2 w-full">
                  <ModernCtaButton
                    to="/#join"
                    onClick={(e) => handleLinkClick(e, "/#join")}
                    text="Join CoM"
                    subText="Enter Guild"
                    icon={<ArrowUpRight size={14} />}
                    variant="dark"
                    size="md"
                    className="w-full font-sans font-semibold tracking-[-0.02em]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </div>
  );
}
