import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ExternalLink } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBE1mrrINeO_e-ZWEUQMgKJ0_H092IQ1NuFiA3A05PTUJg6A/viewform";
const GUIDELINES_URL = "https://docs.google.com/document/d/1adrt8r6YjnJZtuwIJ3d55rQnJPfRKGN6tC5oipbRzhQ/edit";

const marginaliaQuotes = [
  { quote: "I'd rather have questions that can't be answered than answers that can't be questioned.", author: "Richard Feynman" },
  { quote: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { quote: "The whole problem with the world is that fools and fanatics are always so certain of themselves.", author: "Bertrand Russell" },
  { quote: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
  { quote: "Judge a person by their questions rather than by their answers.", author: "Voltaire" },
];

export function FellowshipSection() {
  const [agreed, setAgreed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % marginaliaQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="join"
      className="relative z-10 py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10"
      aria-label="Join the Collegium"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Philosophical Context & Rotating Quotes */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
                07 / Fellowship
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F2EEE8] tracking-tight leading-tight">
              Begin your intellectual voyage.
            </h2>
            <p className="font-sans font-light text-sm sm:text-base text-[#A5A19F] mt-4 leading-relaxed max-w-xl">
              The Collegium of Minds is a decentralized sanctuary for deep thought, creative scholarship, and rigorous debate. We invite thinkers, builders, and scholars to co-create the future of collaborative inquiry.
            </p>
          </div>

          {/* Rotating Marginalia Quote Card */}
          <div className="p-8 rounded-2xl bg-[#0C0C0C] border border-white/10 relative overflow-hidden min-h-[180px] flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[3px] text-[#A3A3A3] block mb-3">
              Marginalia Reflection
            </span>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <p className="font-serif italic text-lg sm:text-xl text-[#F2EEE8] leading-relaxed">
                  "{marginaliaQuotes[quoteIndex].quote}"
                </p>
                <footer className="font-mono text-xs text-[#716E6B] tracking-wider uppercase">
                  — {marginaliaQuotes[quoteIndex].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex gap-1.5 mt-6">
              {marginaliaQuotes.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === quoteIndex ? "w-6 bg-white/80" : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code of Conduct & Application Action */}
        <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#0C0C0C] border border-white/12 space-y-8">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EEE8] mb-3">
              What We Ask of Every Fellow
            </h3>
            <p className="font-sans font-light text-xs sm:text-sm text-[#A5A19F] leading-relaxed">
              CoM thrives when debates are rigorous, respectful, and unclouded by ego. We ask every member to embrace three core commitments:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#121212] border border-white/5 flex gap-4 items-start">
              <span className="font-serif text-sm text-[#A3A3A3] font-medium">Ⅰ.</span>
              <p className="text-xs sm:text-sm font-light text-[#A5A19F] leading-relaxed">
                <strong className="text-[#F2EEE8] font-normal block mb-0.5">Stay Curious:</strong>
                Question assumptions, examine first principles, and maintain the humility to update your mind.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121212] border border-white/5 flex gap-4 items-start">
              <span className="font-serif text-sm text-[#A3A3A3] font-medium">Ⅱ.</span>
              <p className="text-xs sm:text-sm font-light text-[#A5A19F] leading-relaxed">
                <strong className="text-[#F2EEE8] font-normal block mb-0.5">Think Critically:</strong>
                Ground speculative propositions in logical reasoning, evidence, and clear mental models.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121212] border border-white/5 flex gap-4 items-start">
              <span className="font-serif text-sm text-[#A3A3A3] font-medium">Ⅲ.</span>
              <p className="text-xs sm:text-sm font-light text-[#A5A19F] leading-relaxed">
                <strong className="text-[#F2EEE8] font-normal block mb-0.5">Respect the Thinker:</strong>
                Challenge arguments vigorously, but preserve dignity and mutual goodwill.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <a
                href={GUIDELINES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-[#F2EEE8] hover:underline flex items-center gap-1.5 font-mono"
              >
                <span>Read Community Guidelines</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                    agreed
                      ? "bg-[#F2EEE8] border-[#F2EEE8] text-[#030303]"
                      : "border-white/20 bg-[#141414] hover:border-white/40"
                  }`}
                >
                  {agreed && <Check size={14} className="stroke-[3]" />}
                </div>
              </div>
              <span className="font-sans font-light text-xs text-[#A5A19F] leading-relaxed">
                I have reviewed the ethos and agree to participate in accordance with our community standards.
              </span>
            </label>

            {/* Application CTA */}
            <a
              href={agreed ? GOOGLE_FORM_URL : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!agreed) e.preventDefault();
              }}
              className={`w-full py-4 px-6 rounded-full font-sans text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                agreed
                  ? "bg-[#F2EEE8] hover:bg-white text-[#030303] shadow-lg shadow-white/10 cursor-pointer"
                  : "bg-[#141414] border border-white/10 text-[#716E6B] cursor-not-allowed"
              }`}
            >
              <span>Apply for Fellowship</span>
              <ArrowRight size={14} />
            </a>

            {!agreed && (
              <p className="text-[11px] font-mono text-center text-[#716E6B]">
                Acknowledge the community guidelines above to activate the application form.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
