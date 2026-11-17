import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield } from "lucide-react";

interface Principle {
  numeral: string;
  title: string;
  description: string;
  tenet: string;
  tag: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  bodyColor: string;
  numeralColor: string;
  tenetBadgeBg: string;
  tenetBadgeText: string;
  accentDot: string;
  shadow: string;
}

const principles: Principle[] = [
  {
    numeral: "Ⅰ",
    title: "Primacy of the Question",
    description:
      "An unexamined answer is a premature conclusion. We evaluate intellectual progress not by the speed of agreement, but by the caliber and depth of the questions we dare to formulate.",
    tenet: "Epistemic Humility",
    tag: "Principle 01",
    bgColor: "bg-[#F7F4EE]", // Warm Alabaster Linen
    borderColor: "border-[#E8E2D6]",
    titleColor: "text-[#141413]",
    bodyColor: "text-[#3D3A36]",
    numeralColor: "text-[#8A8175]",
    tenetBadgeBg: "bg-black/5",
    tenetBadgeText: "text-[#141413]",
    accentDot: "bg-[#7C3AED]",
    shadow: "shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
  },
  {
    numeral: "Ⅱ",
    title: "Interdisciplinary Synthesis",
    description:
      "Intellectual silos breed dogmatic blindness. The most fertile insights emerge when theoretical physicists engage moral philosophers, and mathematicians converse with artists.",
    tenet: "Trans-Disciplinary",
    tag: "Principle 02",
    bgColor: "bg-[#EBF1EC]", // Pale Celadon Sage Mist
    borderColor: "border-[#D7E2D9]",
    titleColor: "text-[#0F1712]",
    bodyColor: "text-[#333E36]",
    numeralColor: "text-[#6F8274]",
    tenetBadgeBg: "bg-emerald-950/6",
    tenetBadgeText: "text-[#0F1712]",
    accentDot: "bg-[#059669]",
    shadow: "shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
  },
  {
    numeral: "Ⅲ",
    title: "Radical Independence",
    description:
      "Consensus is no guarantor of truth. We foster an environment of respectful dissent, fearless debate, and the intellectual courage to re-examine foundational axioms.",
    tenet: "Sovereign Cognition",
    tag: "Principle 03",
    bgColor: "bg-[#F1ECF7]", // Pale Lilac Quartz Parchment
    borderColor: "border-[#E0D5EB]",
    titleColor: "text-[#150F1E]",
    bodyColor: "text-[#3B3247]",
    numeralColor: "text-[#847299]",
    tenetBadgeBg: "bg-purple-950/6",
    tenetBadgeText: "text-[#150F1E]",
    accentDot: "bg-[#7C3AED]",
    shadow: "shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
  },
  {
    numeral: "Ⅳ",
    title: "Lifelong Fellowship",
    description:
      "Curiosity is neither a degree nor a finite project; it is an enduring posture toward existence. We cultivate a decentralized guild dedicated to mutual discovery.",
    tenet: "Perpetual Inquiry",
    tag: "Principle 04",
    bgColor: "bg-[#F7EFE6]", // Warm Sand Cashmere
    borderColor: "border-[#E8DCCF]",
    titleColor: "text-[#1C1309]",
    bodyColor: "text-[#423628]",
    numeralColor: "text-[#947F6A]",
    tenetBadgeBg: "bg-amber-950/6",
    tenetBadgeText: "text-[#1C1309]",
    accentDot: "bg-[#D97706]",
    shadow: "shadow-[0_25px_60px_rgba(0,0,0,0.6)]",
  },
];

interface StackCardProps {
  principle: Principle;
  index: number;
  total: number;
}

function StackCard({ principle, index, total }: StackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Alternating tilt degrees for organic physical card deck feel
  const tiltAngles = [-2.2, 1.8, -1.5, 0];
  const targetTilt = tiltAngles[index % tiltAngles.length];

  // As subsequent cards scroll in, previous cards shrink and tilt smoothly
  const targetScale = 1 - (total - index - 1) * 0.04; // e.g. 0.88, 0.92, 0.96, 1.0

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, targetTilt]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.82 + index * 0.06]);

  return (
    <div
      ref={cardRef}
      className="sticky top-28 sm:top-36 w-full mb-8 sm:mb-12 origin-top"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          opacity,
        }}
        className={`relative rounded-3xl p-8 sm:p-12 lg:p-14 ${principle.bgColor} border ${principle.borderColor} ${principle.shadow} overflow-hidden transition-all duration-300 hover:scale-[1.01]`}
      >
        {/* Subtle ambient light bloom inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Meta Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/8">
          <div className="flex items-center gap-3">
            <span className={`font-serif text-3xl sm:text-4xl ${principle.numeralColor} font-normal`}>
              {principle.numeral}
            </span>
            <div className="h-4 w-[1px] bg-black/15" />
            <span className="font-mono text-xs uppercase tracking-[3px] text-black/50 font-medium">
              {principle.tag}
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3.5 py-1 rounded-full ${principle.tenetBadgeBg} border border-black/8`}>
            <Shield size={12} className="opacity-60" />
            <span className={`font-mono text-[11px] ${principle.tenetBadgeText} font-semibold`}>
              {principle.tenet}
            </span>
          </div>
        </div>

        {/* Card Title & Prose */}
        <div className="max-w-3xl">
          <h3 className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-normal ${principle.titleColor} tracking-tight mb-5 leading-[1.14]`}>
            {principle.title}
          </h3>
          <p className={`font-sans font-light text-base sm:text-lg lg:text-xl ${principle.bodyColor} leading-relaxed`}>
            {principle.description}
          </p>
        </div>

        {/* Bottom Ledger & Verification Stamp */}
        <div className="mt-10 pt-6 border-t border-black/8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-black/45">
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wider">COLLEGIUM CONVICTION</span>
            <span>•</span>
            <span>CANONICAL AXIOM</span>
          </div>
          <div className="flex items-center gap-2 text-black/70">
            <span className={`w-1.5 h-1.5 rounded-full ${principle.accentDot}`} />
            <span className="uppercase tracking-widest text-[10px] font-medium">Guiding Tenet Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="principles"
      className="relative z-10 py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t border-white/10 bg-[#030303]"
      aria-label="What Drives Us"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-12 sm:mb-16">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
          03 / What Drives Us
        </span>
      </div>

      {/* Editorial Header */}
      <div className="mb-20 sm:mb-28">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F2EEE8] tracking-tight leading-[1.08] mb-6">
          Convictions that guide our inquiry.
        </h2>
        <p className="text-[#A5A19F] font-sans font-light text-base sm:text-xl leading-relaxed max-w-2xl">
          The Collegium of Minds is anchored not by bureaucratic rules, but by shared philosophical commitments. These tenets shape every debate, essay, and collaboration across our societies.
        </p>
      </div>

      {/* Shrink and Tilt Card Stack with Opaque Light Premium Color Shades */}
      <div className="relative pb-24">
        {principles.map((principle, index) => (
          <StackCard
            key={principle.numeral}
            principle={principle}
            index={index}
            total={principles.length}
          />
        ))}
      </div>
    </section>
  );
}
