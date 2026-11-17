import React from "react";
import { MessageSquare, ExternalLink, ArrowRight } from "lucide-react";

export function DiscussionsSection() {
  const recentDiscussions = [
    {
      channel: "#quantum-metaphysics",
      title: "Is Spacetime an Emergent Hologram?",
      lastActive: "4m ago",
      activeUser: "sarvesh_kore",
      replies: 58,
      votes: 42,
    },
    {
      channel: "#philosophy-of-mind",
      title: "The Hard Problem: Inside the Computable Brain",
      lastActive: "12m ago",
      activeUser: "joel_mendonca",
      replies: 34,
      votes: 27,
    },
    {
      channel: "#cosmology-debate",
      title: "Breakdowns in Energy Conservation in Expanding Spacetime",
      lastActive: "1h ago",
      activeUser: "shatakshita",
      replies: 19,
      votes: 14,
    },
    {
      channel: "#mathematical-art",
      title: "Fibonacci Spirals: Code Symmetries in Plant Growth",
      lastActive: "3h ago",
      activeUser: "saumya_nl",
      replies: 45,
      votes: 31,
    },
  ];

  return (
    <section
      id="discussions"
      className="relative z-10 py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10"
      aria-label="Community Discussions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Salon Introduction */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
              Digital Salon
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F2EEE8] tracking-tight leading-tight">
            Step inside our collective discourse.
          </h2>

          <p className="font-sans font-light text-sm sm:text-base text-[#A5A19F] leading-relaxed">
            True understanding is dialogic. Our Discord channels and discussion rooms host continuous, high-fidelity explorations across theoretical physics, transfinite set theory, existential philosophy, and cognitive science.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="https://discord.gg/bEMYvJ7eU3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-lg shadow-[#5865F2]/20"
            >
              <span>Join CoM Discord</span>
              <ExternalLink size={13} />
            </a>
            <a
              href="https://thecollegiumofminds.substack.com/archive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#121212] border border-white/15 hover:border-white/40 text-[#F2EEE8] font-sans text-xs tracking-wider uppercase transition-colors"
            >
              <span>Bulletin Archive</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Right Column: Active Feed */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A5A19F]">
              Live Discourse Topics
            </span>
            <span className="font-mono text-xs text-[#A3A3A3]">Real-time Dialogue</span>
          </div>

          {recentDiscussions.map((d, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-[#0C0C0C] border border-white/10 hover:border-white/25 hover:bg-[#111111] transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-[70%]">
                <span className="font-mono text-[11px] text-[#A3A3A3] block">
                  {d.channel}
                </span>
                <h4 className="font-serif text-lg text-[#F2EEE8] truncate">
                  {d.title}
                </h4>
                <p className="font-mono text-[10px] text-[#716E6B]">
                  Active {d.lastActive} • by <span className="text-[#A5A19F]">{d.activeUser}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs text-[#716E6B] flex-shrink-0">
                <div className="text-right">
                  <span className="text-[#F2EEE8] font-medium block">{d.replies}</span>
                  <span className="text-[9px] uppercase tracking-wider">replies</span>
                </div>
                <div className="pl-4 border-l border-white/10 text-right">
                  <span className="text-[#F2EEE8] font-medium block">{d.votes}</span>
                  <span className="text-[9px] uppercase tracking-wider">votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
