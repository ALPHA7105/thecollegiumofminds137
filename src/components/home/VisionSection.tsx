import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ModernCtaButton } from "../ui/ModernCtaButton";

const visionStats = [
  { value: "10+", label: "Months Active" },
  { value: "60+", label: "Members" },
  { value: "10", label: "Societies" },
  { value: "∞", label: "Ideas on the Table", isInfinity: true },
];

export function VisionSection() {
  return (
    <section
      id="vision"
      className="relative z-10 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto flex flex-col items-center justify-center text-center bg-[#030303]"
      aria-label="The Vision"
    >
      {/* 1. The 4 Metric Stats Strip / Ledger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto mb-14 sm:mb-20 border-y border-white/10 backdrop-blur-md bg-white/[0.02] rounded-xl sm:rounded-2xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {visionStats.map((stat) => (
            <div
              key={stat.label}
              className="py-7 sm:py-9 px-4 flex flex-col items-center justify-center text-center group"
            >
              <span
                className={`block font-serif text-[#F2EEE8] tracking-tight leading-none mb-2.5 ${
                  stat.isInfinity
                    ? "text-4xl sm:text-5xl text-[#A78BFA]"
                    : "text-3xl sm:text-4xl lg:text-5xl"
                }`}
              >
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[2px] uppercase text-[#A5A19F]/75 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. The Vision Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-4 py-1.5 rounded-full mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        <span className="font-mono text-[11px] font-semibold tracking-[3px] uppercase text-[#A78BFA]">
          The Vision
        </span>
      </motion.div>

      {/* 3. Heading: "Think. Explore. Discover." */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#F2EEE8] tracking-tight mb-6 leading-tight"
        style={{ fontFamily: "'New York', 'Instrument Serif', Georgia, serif" }}
      >
        Think. Explore. Discover.
      </motion.h2>

      {/* 4. Manifesto Description Prose */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#A5A19F] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10 text-balance"
      >
        The Collegium of Minds welcomes individuals passionate about exploring science, mathematics, philosophy, literature, history, technology, arts, and beyond. Here, ideas are shared, questions are celebrated, and minds come together to discover, discuss, and innovate.
      </motion.p>

      {/* 5. "More About Us" CTA Button with Text Flip & Liquid Fill */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <ModernCtaButton
          to="/#about"
          onClick={(e) => {
            const aboutElem = document.getElementById("about");
            if (aboutElem) {
              e.preventDefault();
              aboutElem.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", "/#about");
            }
          }}
          text="More About Us"
          subText="Explore"
          icon={<ArrowUpRight size={14} />}
          variant="ivory"
          size="md"
          className="px-7 py-3 font-sans font-semibold tracking-[-0.015em]"
        />
      </motion.div>
    </section>
  );
}
