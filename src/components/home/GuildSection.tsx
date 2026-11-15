import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ExternalLink } from "lucide-react";
import TeamAvatar from "../TeamAvatar";

export interface TeamMember {
  role: string;
  name: string;
  emoji?: string;
  image?: string;
  roleDesc: string;
  bio: string;
  quote?: string;
  links?: Array<{ type: string; url: string }>;
}

// Backwards compatibility stubs
export const operationsMembers: TeamMember[] = [];
export const developmentMembers: TeamMember[] = [];

export const founderData: TeamMember = {
  role: "Founder & Executive Director",
  name: "Sarvesh Kore",
  emoji: "🧠",
  image: "/team/sarvesh.png",
  roleDesc:
    "Founded the Collegium of Minds to build a sanctuary where curiosity survives without algorithmic noise, where difficult questions are welcomed, and where inquiry is practiced as a discipline.",
  bio:
    "A thinker and builder passionate about theoretical physics, cosmology, and frontend craftsmanship. Fascinated by quantum mechanics, the arrow of time, and the topology of spacetime, Sarvesh established CoM to assemble curious minds who refuse to accept conventional boundaries.",
  quote:
    "\"Civilizations are remembered for the questions they dared to pursue. We hope to ask a few worthy ones.\"",
  links: [
    { type: "website", url: "https://sarvesh-kore.vercel.app" },
    { type: "github", url: "https://github.com/ALPHA7105" },
    { type: "linkedin", url: "https://www.linkedin.com/in/sarvesh-kore-3284363a7/" },
    { type: "substack", url: "https://substack.com/@sarveshkore" },
  ],
};

export function GuildSection() {
  const [showFounderModal, setShowFounderModal] = useState(false);

  return (
    <section
      id="team"
      className="relative z-10 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10"
      aria-label="The Guild — Founder"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
              06 / The Guild
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F2EEE8] tracking-tight">
            The mind behind the Collegium.
          </h2>
        </div>
        <p className="text-[#A5A19F] font-sans font-light text-sm sm:text-base max-w-md leading-relaxed md:text-right">
          Stewarding an independent, decentralized sanctuary of ideas free from algorithmic noise.
        </p>
      </div>

      {/* Featured Founder Card */}
      <div
        onClick={() => setShowFounderModal(true)}
        className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#0C0C0C] border border-white/12 hover:border-[#A78BFA]/30 hover:bg-[#101010] transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4">
              <TeamAvatar
                image={founderData.image}
                name={founderData.name}
                size={74}
                className="rounded-full ring-2 ring-white/10 group-hover:ring-[#A78BFA]/40 transition-all"
              />
              <div>
                <span className="font-mono text-xs uppercase tracking-[3px] text-[#A78BFA] block">
                  {founderData.role}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EEE8] group-hover:text-white transition-colors">
                  {founderData.name}
                </h3>
              </div>
            </div>

            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F2EEE8] leading-relaxed">
              {founderData.quote}
            </blockquote>

            <p className="font-sans font-light text-sm sm:text-base text-[#A5A19F] leading-relaxed max-w-2xl">
              {founderData.roleDesc}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#F2EEE8] group-hover:text-[#A78BFA] transition-colors pt-2">
              <span>Read the Founder's Statement</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 p-6 rounded-2xl bg-[#141414] border border-white/8 text-xs">
            <span className="font-mono text-[#716E6B] uppercase tracking-wider">Direct Portals</span>
            {founderData.links?.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#A5A19F] hover:text-[#F2EEE8] flex items-center justify-between py-1 transition-colors"
              >
                <span className="capitalize">{link.type}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Statement Modal */}
      <AnimatePresence>
        {showFounderModal && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowFounderModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D0D0D] border border-white/15 rounded-3xl max-w-2xl w-full p-8 sm:p-10 relative shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowFounderModal(false)}
                className="absolute top-6 right-6 text-[#A5A19F] hover:text-[#F2EEE8] p-1.5 rounded-full border border-white/10 hover:border-white/25 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <TeamAvatar
                  image={founderData.image}
                  name={founderData.name}
                  size={64}
                  className="rounded-full ring-2 ring-white/20"
                />
                <div>
                  <span className="font-mono text-xs uppercase tracking-[3px] text-[#A78BFA]">
                    Founder & Executive Director
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EEE8]">
                    Sarvesh Kore
                  </h3>
                </div>
              </div>

              <blockquote className="font-serif italic text-xl text-[#F2EEE8] mb-6 p-4 rounded-xl bg-[#141414] border border-white/5">
                {founderData.quote}
              </blockquote>

              <div className="space-y-4 font-sans font-light text-sm sm:text-base text-[#A5A19F] leading-relaxed mb-8">
                <p>
                  "I didn't start the Collegium of Minds because the world lacked information. It lacked places where genuine curiosity could survive. A place where someone fascinated by black holes could debate a moral philosopher, where a programmer could collaborate with an artist, where difficult questions were welcomed instead of dismissed."
                </p>
                <p>
                  "CoM exists to become that sanctuary. In an attention economy built on fragmentation, we honor the deliberate slowness of contemplation. We do not demand compliance or uniformity; we require only the humility to ask and the rigor to investigate."
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono">
                {founderData.links?.map((link) => (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F2EEE8] hover:text-[#A78BFA] transition-colors capitalize flex items-center gap-1"
                  >
                    {link.type} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
