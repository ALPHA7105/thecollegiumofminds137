import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, ArrowRight, Sparkles, RefreshCw, Dices, Smile } from "lucide-react";
import { useToast } from "@/components/ui";
import { getPollVotes, submitVote, retractVote } from "../../lib/db";
import { weeklyQuestions } from "../../pages/Questions";

export const ALL_QUESTIONS = [
  "Is consciousness computable, or does it require something beyond physical matter?",
  "What actually transpires beyond an event horizon, and could information ever be preserved?",
  "Will human civilization maintain agency in the presence of recursive artificial superintelligence?",
  "Was mathematics discovered embedded in nature or invented by the human neural architecture?",
  "What is intelligence — and does our current biological definition capture its transfinite forms?",
  "Could spacetime itself emerge from entanglement and quantum information?",
  "Does time flow continuously, or is the arrow of time an entropic illusion of finite observers?",
  "Are fundamental physical constants universal, or local artifacts of an inflationary multiverse?",
  "Can ethics ever be formulated with mathematical or scientific objectivity?",
  "Could our universe be an internally self-simulating mathematical structure?",
  "What defines the precise physical boundary between inert chemistry and conscious biology?",
  "Will humanity ever formulate a unified Theory of Everything, or are descriptions infinite?",
  "If trees fall in an unobserved universe, does quantum decoherence still make a sound?",
  "Is the past physically real, or merely a configuration stored in the present?",
  "Could dark matter be the gravitational imprint of a neighboring brane universe?",
];

const FUNNY_QUIPS = [
  "Consulting Socrates in the underworld...",
  "Schrödinger's cat is deciding...",
  "Dividing by zero... please hold",
  "Pondering aggressively...",
  "Asking the simulation admin...",
  "Rolling a 20-sided quantum die...",
  "Arguing with René Descartes...",
  "Flipping the multiverse coin...",
  "Bending spacetime around this card...",
  "Simulating 42 alternate timelines...",
  "Waking up the philosopher king...",
  "Entropy temporarily running backward...",
  "Consulting an alien superintelligence...",
  "Recalculating universal constants...",
];

export function InquiriesSection() {
  const { toast } = useToast();
  const [activeQuestions, setActiveQuestions] = useState<string[]>(ALL_QUESTIONS.slice(0, 6));
  const [shufflingCards, setShufflingCards] = useState<{ [key: number]: boolean }>({});
  const [cardQuips, setCardQuips] = useState<{ [key: number]: string }>({});
  const [isRollingAll, setIsRollingAll] = useState(false);

  const [pollIndex, setPollIndex] = useState(0);
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  const activePoll = weeklyQuestions[pollIndex] || weeklyQuestions[0];

  useEffect(() => {
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyQuestions.length;
    setPollIndex(weekIndex);

    if (weeklyQuestions[weekIndex]) {
      const pollId = weeklyQuestions[weekIndex].id;
      const numOptions = weeklyQuestions[weekIndex].options.length;

      const savedVote = localStorage.getItem(`com_poll_voted_${pollId}`);
      setVotedOption(savedVote ? parseInt(savedVote, 10) : null);

      getPollVotes(pollId, numOptions).then(setVotes);
    }
  }, []);

  // Funny unique card shuffle handler
  const handleShuffleCard = (cardIdx: number) => {
    if (shufflingCards[cardIdx]) return;

    // Pick random funny contemplation quip
    const randomQuip = FUNNY_QUIPS[Math.floor(Math.random() * FUNNY_QUIPS.length)];
    setCardQuips((prev) => ({ ...prev, [cardIdx]: randomQuip }));
    setShufflingCards((prev) => ({ ...prev, [cardIdx]: true }));

    // Find a new question
    const unused = ALL_QUESTIONS.filter((q) => !activeQuestions.includes(q));
    const pool = unused.length > 0 ? unused : ALL_QUESTIONS;
    const nextQ = pool[Math.floor(Math.random() * pool.length)];

    // Swap question mid-spin
    setTimeout(() => {
      setActiveQuestions((prev) => {
        const updated = [...prev];
        updated[cardIdx] = nextQ;
        return updated;
      });
    }, 280);

    // End animation & clear quip
    setTimeout(() => {
      setShufflingCards((prev) => ({ ...prev, [cardIdx]: false }));
    }, 750);

    setTimeout(() => {
      setCardQuips((prev) => {
        const copy = { ...prev };
        delete copy[cardIdx];
        return copy;
      });
    }, 1400);
  };

  // Funny "Shake the Cosmos" master button (staggered domino ripple across all cards)
  const handleShuffleAll = () => {
    if (isRollingAll) return;
    setIsRollingAll(true);

    activeQuestions.forEach((_, idx) => {
      setTimeout(() => {
        handleShuffleCard(idx);
      }, idx * 90);
    });

    setTimeout(() => {
      setIsRollingAll(false);
    }, 1200);
  };

  const handleVote = async (optionIdx: number) => {
    if (votedOption !== null || !activePoll) return;

    const pollId = activePoll.id;
    try {
      await submitVote(pollId, optionIdx);

      const newVotes = [...votes];
      newVotes[optionIdx] = (newVotes[optionIdx] || 0) + 1;
      setVotes(newVotes);
      setVotedOption(optionIdx);

      localStorage.setItem(`com_poll_voted_${pollId}`, optionIdx.toString());

      toast({
        title: "Perspective Recorded",
        description: "Your vote has been added to the collective inquiry record.",
      });
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "Unable to record vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRetractVote = async () => {
    if (votedOption === null || !activePoll) return;

    const pollId = activePoll.id;
    const currentOption = votedOption;

    try {
      await retractVote(pollId, currentOption);

      const newVotes = [...votes];
      if (newVotes[currentOption] > 0) {
        newVotes[currentOption] -= 1;
      }
      setVotes(newVotes);
      setVotedOption(null);

      localStorage.removeItem(`com_poll_voted_${pollId}`);

      toast({
        title: "Vote Retracted",
        description: "Your choice has been cleared. You may reconsider and vote again.",
      });
    } catch (err) {
      toast({
        title: "Retraction Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const totalVotes = votes.reduce((sum, v) => sum + v, 0);
  const optionLetters = ["A", "B", "C", "D", "E"];

  return (
    <section
      id="questions"
      className="relative z-10 py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10"
      aria-label="Questions Worth Exploring"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
              04 / Questions Worth Exploring
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F2EEE8] tracking-tight">
            Inquiries at the frontier.
          </h2>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <p className="text-[#A5A19F] font-sans font-light text-sm sm:text-base max-w-md leading-relaxed md:text-right">
            The ultimate frontiers of knowledge cannot be easily resolved; they are playgrounds to be pursued.
          </p>

          {/* Master "Roll the Multiverse" Action Button */}
          <button
            onClick={handleShuffleAll}
            disabled={isRollingAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A78BFA]/40 bg-[#A78BFA]/10 hover:bg-[#A78BFA] hover:text-[#0A0A0A] text-[#A78BFA] text-xs font-mono transition-all duration-300 shadow-[0_0_15px_rgba(167,139,250,0.2)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] cursor-pointer active:scale-95 group"
          >
            <motion.span
              animate={isRollingAll ? { rotate: [0, 180, 360, 540, 720] } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Dices size={14} className="group-hover:rotate-45 transition-transform" />
            </motion.span>
            <span>Roll the Multiverse 🎲</span>
          </button>
        </div>
      </div>

      {/* Prominent Editorial Questions Grid with Funny Kinetic 3D Jelly Shuffle */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 sm:mb-28">
        {activeQuestions.map((q, idx) => {
          const isShuffling = Boolean(shufflingCards[idx]);
          const currentQuip = cardQuips[idx];

          return (
            <motion.div
              key={idx}
              onClick={() => handleShuffleCard(idx)}
              animate={
                isShuffling
                  ? {
                      scaleX: [1, 1.26, 0.76, 1.14, 0.96, 1],
                      scaleY: [1, 0.64, 1.24, 0.9, 1.04, 1],
                      rotate: [0, -10, 372, 356, 360],
                      y: [0, -32, 10, -3, 0],
                    }
                  : {
                      scaleX: 1,
                      scaleY: 1,
                      rotate: 0,
                      y: 0,
                    }
              }
              transition={{ duration: 0.72, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96 }}
              className="group p-8 rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-[#A78BFA]/40 transition-colors duration-300 cursor-pointer flex flex-col justify-between min-h-[240px] relative overflow-visible shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
            >
              {/* Comedic Floating Thought Bubble Pill */}
              <AnimatePresence>
                {currentQuip && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.75 }}
                    animate={{ opacity: 1, y: -16, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.75 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className="absolute -top-3 left-6 right-6 z-30 pointer-events-none flex justify-center"
                  >
                    <div className="px-3 py-1 rounded-full bg-[#A78BFA] text-[#0A0A0A] font-mono text-[10px] font-bold shadow-[0_0_20px_rgba(167,139,250,0.8)] border border-white/40 flex items-center gap-1.5 truncate max-w-full">
                      <Sparkles size={11} className="flex-shrink-0 animate-spin" />
                      <span className="truncate">{currentQuip}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Question Particles upon Shuffle */}
              {isShuffling && (
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  <motion.span
                    initial={{ opacity: 1, y: 30, x: 20, scale: 0.8 }}
                    animate={{ opacity: 0, y: -60, x: -30, scale: 1.4 }}
                    transition={{ duration: 0.7 }}
                    className="absolute top-1/2 left-1/4 font-serif text-2xl text-[#A78BFA] font-bold"
                  >
                    ?
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 1, y: 40, x: -20, scale: 0.6 }}
                    animate={{ opacity: 0, y: -70, x: 40, scale: 1.5 }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                    className="absolute top-1/2 right-1/4 font-serif text-xl text-white font-bold"
                  >
                    ¿
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 1, y: 20, x: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -50, x: 10, scale: 1.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute top-1/3 left-1/2 text-sm text-[#A78BFA]"
                  >
                    ✦
                  </motion.span>
                </div>
              )}

              {/* Card Meta Top */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#716E6B] group-hover:text-[#A78BFA] transition-colors">
                  Inquiry {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <motion.div
                  animate={isShuffling ? { rotate: [0, 360, 720] } : {}}
                  transition={{ duration: 0.72 }}
                >
                  <RefreshCw
                    size={13}
                    className="text-[#716E6B] group-hover:text-[#A78BFA] transition-colors"
                  />
                </motion.div>
              </div>

              {/* Question Text with 3D Barrel Flip Transition */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={q}
                  initial={{ opacity: 0, y: 12, rotateX: 60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -12, rotateX: -60 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-lg sm:text-xl text-[#F2EEE8] group-hover:text-white transition-colors leading-relaxed"
                >
                  "{q}"
                </motion.p>
              </AnimatePresence>

              {/* Card Bottom CTA */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#716E6B]">
                <span className="group-hover:text-[#A78BFA] transition-colors flex items-center gap-1.5">
                  <span>Click to shuffle</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">🎲</span>
                </span>
                <span className="text-[#F2EEE8] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Spin</span>
                  <ArrowRight size={11} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QUESTION OF THE WEEK INTERACTIVE LIVE POLL */}
      <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#0B0B0B] border border-white/12 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15">
              <Sparkles size={13} className="text-[#A78BFA]" />
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#A3A3A3]">
                Inquiry of the Week
              </span>
            </div>
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F2EEE8] leading-snug max-w-3xl">
            "{activePoll?.question || ""}"
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#A5A19F] mb-4">
              {votedOption !== null ? "Your ballot has been cast" : "Select your perspective"}
            </h4>

            {activePoll?.options.map((opt, idx) => {
              const isSelected = votedOption === idx;
              const letter = optionLetters[idx] || String.fromCharCode(65 + idx);

              return (
                <button
                  key={idx}
                  disabled={votedOption !== null}
                  onClick={() => handleVote(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                    votedOption !== null
                      ? isSelected
                        ? "bg-[#A78BFA]/15 border-[#A78BFA]/50 text-[#F2EEE8]"
                        : "bg-[#101010]/50 border-white/5 text-[#716E6B]"
                      : "bg-[#101010] border-white/10 hover:border-white/30 hover:bg-[#141414] text-[#F2EEE8] cursor-pointer"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-mono text-xs font-semibold mt-0.5 ${isSelected ? "text-[#A78BFA]" : "text-[#A3A3A3]"}`}>
                      {letter}.
                    </span>
                    <span className="font-sans text-sm sm:text-base font-light leading-relaxed">
                      {opt}
                    </span>
                  </div>
                  {isSelected && <Check size={18} className="text-[#A78BFA] flex-shrink-0" />}
                </button>
              );
            })}

            {votedOption !== null && (
              <button
                onClick={handleRetractVote}
                className="mt-4 text-xs font-mono text-[#A3A3A3] hover:text-[#F2EEE8] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw size={12} />
                <span>Withdraw vote to reconsider</span>
              </button>
            )}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#A5A19F]">
                  Live Deliberation
                </span>
                <span className="font-mono text-xs text-[#A3A3A3]">
                  {totalVotes} {totalVotes === 1 ? "Fellow" : "Fellows"} voted
                </span>
              </div>

              <div className="space-y-4">
                {activePoll?.options.map((opt, idx) => {
                  const voteCount = votes[idx] || 0;
                  const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                  const letter = optionLetters[idx] || String.fromCharCode(65 + idx);

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#A5A19F]">
                        <span className="font-mono text-[#F2EEE8]">{letter}.</span>
                        <span className="font-mono text-[11px]">{pct}% ({voteCount})</span>
                      </div>
                      <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#8061CF] to-[#A78BFA] rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#716E6B]">Weekly Synchronous Poll</span>
              <a
                href="#discussions"
                className="font-sans text-[#F2EEE8] hover:text-[#A78BFA] transition-colors flex items-center gap-1"
              >
                Enter salon discussion <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
