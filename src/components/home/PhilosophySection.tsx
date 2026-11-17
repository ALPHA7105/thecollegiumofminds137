import React from "react";
import { ScrollHighlightAnnotations } from "./ScrollHighlightAnnotations";

export function PhilosophySection() {
  return (
    <section
      id="about"
      className="relative z-10 py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10 bg-[#030303]"
      aria-label="Our Philosophy"
    >
      {/* Editorial Section Indicator */}
      <div className="flex items-center gap-3 mb-12 sm:mb-16">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
          01 / Our Philosophy
        </span>
      </div>

      {/* Main Editorial Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 sticky top-28">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F2EEE8] leading-[1.08]">
            We do not gather to settle opinions, but to venture beyond what we know.
          </h2>

          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#080808] border border-white/10 shadow-xl">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F2EEE8] leading-relaxed">
              "Curiosity is not a casual pastime. It is an instinctual refusal to accept the boundaries of conventional consensus."
            </blockquote>
          </div>

          {/* Minimalist Ledger */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#F2EEE8] block">10</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#716E6B]">Societies</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#F2EEE8] block">60+</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#716E6B]">Fellows</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#A78BFA] block">∞</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#716E6B]">Inquiries</span>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Scroll Highlight Annotations with Spatial Theme Toggle */}
        <div className="lg:col-span-7">
          <ScrollHighlightAnnotations />
        </div>
      </div>
    </section>
  );
}
