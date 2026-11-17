import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ModernCtaButton } from "../ui/ModernCtaButton";

const randomPrompts = [
  "If you could definitively answer one unresolved question, what would it be?",
  "Is there an insurmountable ceiling to human intellectual comprehension?",
  "What will thinkers wonder about ten centuries from today?",
  "Can subjective aesthetic beauty ever be fully translated into mathematics?",
  "Is there a thought that no conscious mind has ever formulated?",
  "Does absolute silence possess an acoustic topology of its own?",
  "What lies beyond the cosmological event horizon of our expanding universe?",
];

export function EditorialFooter() {
  const [prompt, setPrompt] = useState(randomPrompts[0]);

  useEffect(() => {
    setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
  }, []);

  const repoLinks = [
    { label: "Philosophy", to: "/#about" },
    { label: "Disciplines", to: "/#disciplines" },
    { label: "Principles", to: "/#principles" },
    { label: "Inquiries", to: "/#questions" },
    { label: "Library", to: "/library" },
    { label: "Discussions", to: "/#discussions" },
    { label: "Events", to: "/events" },
  ];

  const dialogueLinks = [
    { label: "Discord Community", href: "https://discord.gg/bEMYvJ7eU3", external: true, badge: "Active" },
    { label: "GitHub Repository", href: "https://github.com/CoM-137", external: true, badge: "Open" },
    { label: "LinkedIn Portal", href: "https://www.linkedin.com/company/the-collegium-of-minds/", external: true },
    { label: "Email the Guild", href: "mailto:collegiumofminds@gmail.com", external: true, badge: "Direct" },
    { label: "Founder's Dossier", to: "/#team" },
    { label: "Code of Conduct", to: "/#join" },
  ];

  const dispatchLinks = [
    { label: "Monthly Gazette", to: "/#library", meta: "Vol. IV" },
    { label: "Digital Salon Bulletin", to: "/#discussions" },
    { label: "Question of the Week", to: "/#questions", meta: "Live" },
    { label: "Substack Dispatch", to: "/#library" },
    { label: "Fellowship Inquiries", to: "/#join" },
    { label: "Supporters & Patrons", to: "/supporters" },
  ];

  return (
    <footer
      className="relative z-10 bg-[#F4F0EA] text-[#0A0A0A] border-t border-black/10 overflow-hidden"
      aria-label="Footer"
    >
      {/* Ponder This Contemplative Editorial Banner (Navbar-toned Cream) */}
      <div className="border-b border-black/8 py-4 px-6 sm:px-10 lg:px-16 bg-[#EBE6DF]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-[#525252] whitespace-nowrap font-medium">
              Ponder This
            </span>
          </div>
          <p className="font-serif italic text-[13px] sm:text-[14px] text-[#262626] truncate sm:text-right">
            "{prompt}"
          </p>
        </div>
      </div>

      {/* Main Directory (Column 1: Identity & Mission, Columns 2-4: Structured Directory Hub) */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Column 1: Identity, Dual Tagline, Mission, CTA & Leadership Credit */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            {/* Logo Row: squircle + brand name + badge */}
            <div className="flex items-center gap-3">
              <div className="w-[30px] h-[30px] rounded-[8px] overflow-hidden border border-black/15 bg-[#E8E3DB] flex-shrink-0 shadow-sm">
                <img
                  src="/logo.jpeg"
                  alt="CoM Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
                Collegium of Minds
              </span>
              <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#7C3AED] px-2 py-0.5 rounded border border-[#7C3AED]/25 bg-[#7C3AED]/10 font-medium">
                Guild
              </span>
            </div>

            {/* Dual Typography Tagline (Bold Display + Italic Serif) */}
            <div className="mt-1">
              <p className="font-sans font-bold text-[28px] sm:text-[32px] tracking-[-0.04em] text-[#0A0A0A] leading-[1.05]">
                Think deeply.
              </p>
              <p className="font-serif italic text-[28px] sm:text-[32px] text-[#262626] leading-[1.05] mt-0.5">
                Venture beyond.
              </p>
            </div>

            {/* Mission prose */}
            <p className="font-sans text-[13px] sm:text-[14px] text-[#403E3B] max-w-sm leading-[1.55] tracking-[-0.01em]">
              An independent intellectual guild for curious thinkers, scholars, and lifelong learners. Where foundational questions are celebrated and ideas explored beyond convention.
            </p>

            {/* Action CTA Button (Carbon Black high-contrast pill with Text Flip & Purple Liquid Fill) */}
            <ModernCtaButton
              to="/#join"
              text="Apply for Fellowship"
              subText="Join Guild"
              icon={<ArrowUpRight size={13} />}
              variant="dark"
              size="sm"
              className="mt-2 self-start font-sans font-semibold tracking-[-0.02em]"
            />

            {/* Copyright & Founder Row */}
            <div className="mt-4 pt-4 border-t border-black/8 w-full flex flex-col gap-2">
              <p className="text-[12px] text-[#716E6B] tracking-tight">
                © 2025–2026 The Collegium of Minds. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-[#403E3B]">
                <span>Conceived &amp; Founded by</span>
                <a
                  href="https://linkedin.com/in/sarveshkore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0A0A0A] hover:text-[#7C3AED] font-semibold transition-colors group"
                >
                  <div className="w-[20px] h-[20px] rounded-full overflow-hidden border border-black/20 flex-shrink-0 bg-[#E8E3DB]">
                    <img
                      src="/team/sarvesh.png"
                      alt="Sarvesh Kore"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="underline decoration-black/30 group-hover:decoration-[#7C3AED]">Sarvesh Kore</span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#403E3B]">
                <span>Phase neo — designed by</span>
                <a
                  href="https://github.com/vaidiklab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0A0A0A] hover:text-[#7C3AED] font-semibold transition-colors group"
                >
                  <span className="underline decoration-black/30 group-hover:decoration-[#7C3AED]">Vaidik Shree</span>
                  <ArrowUpRight size={11} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Directory Columns (Columns 2-4 unified in 3-column subgrid so they stay together) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 2: Repository */}
            <div className="flex flex-col gap-3">
              <h6 className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-black/45 uppercase mb-2">
                Repository
              </h6>
              <ul className="flex flex-col gap-2.5">
                {repoLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="font-sans text-[13px] sm:text-[14px] font-medium tracking-[-0.02em] text-[#403E3B] hover:text-[#0A0A0A] transition-colors duration-150 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Dialogue */}
            <div className="flex flex-col gap-3">
              <h6 className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-black/45 uppercase mb-2">
                Dialogue
              </h6>
              <ul className="flex flex-col gap-2.5">
                {dialogueLinks.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[13px] sm:text-[14px] font-medium tracking-[-0.02em] text-[#403E3B] hover:text-[#0A0A0A] transition-colors duration-150 inline-flex items-center gap-1.5 group"
                      >
                        <span>{item.label}</span>
                        {item.badge ? (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-black/5 border border-black/10 text-[#0A0A0A] group-hover:bg-[#7C3AED]/10 group-hover:text-[#7C3AED] group-hover:border-[#7C3AED]/20 transition-colors">
                            {item.badge}
                          </span>
                        ) : (
                          <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100" />
                        )}
                      </a>
                    ) : (
                      <Link
                        to={item.to!}
                        className="font-sans text-[13px] sm:text-[14px] font-medium tracking-[-0.02em] text-[#403E3B] hover:text-[#0A0A0A] transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Dispatches & Gazette */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h6 className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-black/45 uppercase mb-2">
                Dispatches
              </h6>
              <ul className="flex flex-col gap-2.5">
                {dispatchLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="font-sans text-[13px] sm:text-[14px] font-medium tracking-[-0.02em] text-[#403E3B] hover:text-[#0A0A0A] transition-colors duration-150 inline-flex items-center gap-1.5 group"
                    >
                      <span>{item.label}</span>
                      {item.meta && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#7C3AED] font-semibold">
                          {item.meta}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Bottom Watermark: Sized & Centered Letterpress Debossing in Warm Ivory */}
      <div
        className="w-full h-[80px] sm:h-[130px] md:h-[170px] lg:h-[210px] flex items-center justify-center overflow-hidden border-t border-black/[0.06] select-none pointer-events-none px-2 sm:px-6"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1600 160"
          className="w-full h-full max-w-[1300px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(0, 0, 0, 0.05)"
            stroke="rgba(0, 0, 0, 0.03)"
            strokeWidth="0.8"
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="800"
            letterSpacing="-0.035em"
            fontSize="106"
            className="transition-colors duration-300"
          >
            COLLEGIUM OF MINDS
          </text>
        </svg>
      </div>
    </footer>
  );
}
