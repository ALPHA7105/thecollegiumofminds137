import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, RotateCcw, Sparkles, HelpCircle, ArrowLeft } from "lucide-react";
import { useToast } from "../components/ui";
import { getPollVotes, submitVote, retractVote } from "../lib/db";
import { AmbientBackground, Navbar, Footer, ScrollReveal } from "./Home";

export const weeklyQuestions = [
  {
  id: "knowledge",
  question: "A machine can instantly give you the answer to any question, but you will never understand how it reached the answer. Would its answers count as knowledge?",
  options: [
    "Yes, if the answers are always correct",
    "No, understanding is necessary for knowledge",
    "It depends on how we define knowledge",
    "It would be a new form of knowledge"
  ]
},
{
  id: "identity",
  question: "A person's brain is gradually replaced with artificial parts that perfectly preserve their memories and personality. At what point, if any, do they stop being the same person?",
  options: [
    "They remain the same person throughout",
    "They stop being the same person after enough changes",
    "There is no meaningful point where identity changes",
    "Identity depends on more than the brain"
  ]
},
{
  id: "simulation",
  question: "You discover with absolute certainty that your universe is a simulation. Would that change the value or meaning of your life?",
  options: [
    "No, experiences remain meaningful regardless",
    "Yes, because reality itself has changed",
    "Meaning comes from consciousness, not origin",
    "The distinction between real and simulated becomes irrelevant"
  ]
},
{
  id: "time",
  question: "A scientist creates a device that lets you send information to your past self, but every message changes the future slightly. Would you use it?",
  options: [
    "Yes, because preventing mistakes is worth the risk",
    "No, because changing the past could create unknown consequences",
    "Only for small personal decisions",
    "Only if the effects could be predicted"
  ]
},
{
  id: "truth",
  question: "You discover a truth that would make humanity less happy, but understanding it could lead to future progress. Should it be revealed?",
  options: [
    "Yes, truth should never be hidden",
    "No, protecting humanity's wellbeing matters more",
    "It depends on the consequences of revealing it",
    "Truth and happiness should not be treated as opposites"
  ]
},
{
  id: "ai",
  question: "An AI creates a scientific theory that perfectly predicts reality, but no human can understand its reasoning. Should we accept the theory?",
  options: [
    "Yes, prediction is what matters most",
    "No, science requires human understanding",
    "Accept it temporarily while trying to understand it",
    "It would redefine what scientific knowledge means"
  ]
},
{
  id: "freedom",
  question: "A device can predict every choice you will ever make with 100% accuracy. Does knowing this change whether you are free?",
  options: [
    "No, prediction does not remove choice",
    "Yes, true freedom requires unpredictability",
    "Freedom depends on how choices are made, not whether they are predicted",
    "The concept of free will itself needs to change"
  ]
},
{
  id: "memory",
  question: "A technology allows you to erase painful memories while keeping all the lessons you learned from them. Would you use it?",
  options: [
    "Yes, memories are not necessary once lessons remain",
    "No, memories are part of who we become",
    "Only for certain experiences",
    "The emotional connection to memories matters more than the memories themselves"
  ]
},
{
  id: "civilization",
  question: "Humanity discovers a planet identical to Earth with an identical civilization. Should we contact them?",
  options: [
    "Yes, knowledge of another humanity is too important to ignore",
    "No, contact could harm both civilizations",
    "Only after studying them secretly first",
    "The decision depends on whether they are more or less advanced"
  ]
},
{
  id: "certainty",
  question: "Is absolute certainty ever possible?",
  options: [
    "Yes",
    "No",
    "Only in mathematics",
    "Only in personal experience"
  ]
},
];

export default function QuestionsPage() {
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

      toast({ title: "Vote Recorded", description: "Your perspective has been added to the collective record." });
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

      const newVotes = [...votes];
      if (newVotes[currentOption] > 0) {
        newVotes[currentOption] -= 1;
      }
      setVotes(newVotes);
      setVotedOption(null);

      localStorage.removeItem(`com_poll_voted_${pollId}`);

      toast({
        title: "Vote Retracted",
        description: "Your vote has been removed. You can now select another option."
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
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden pt-24 sm:pt-28 pb-0">
      <AmbientBackground />
      <Navbar />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <ScrollReveal className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-silver-dim hover:text-bronze text-xs font-heading tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </ScrollReveal>

        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-bronze animate-pulse" />
            <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
              Inquiry Platform
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-silver mb-4 tracking-tight">
            Question of the Week
          </h1>
          <p className="text-silver-muted text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Every week, the Collegium gathers to explore a new fundamental question. Cast your vote, explore live statistics, and engage in the collective discourse.
          </p>
        </ScrollReveal>

        {/* REAL VOTING POLL */}
        <ScrollReveal delay={100} className="mb-24 w-full">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Voting Options */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-heading font-semibold tracking-wider text-silver-muted uppercase mb-2">
                  {votedOption !== null ? "Thank you for voting" : "Cast your vote"}
                </h3>

                {activePoll?.options.map((opt, idx) => {
                  const isSelected = votedOption === idx;
                  const letter = optionLetters[idx] || String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={idx}
                      disabled={votedOption !== null}
                      onClick={() => handleVote(idx)}
                      className={`text-left text-sm font-light py-3.5 px-5 rounded-xl border transition-all flex items-center justify-between ${
                        votedOption !== null 
                          ? isSelected 
                            ? "bg-bronze/15 border-bronze text-bronze font-medium" 
                            : "bg-obsidian-light/10 border-bronze-border/5 text-silver-dim/70"
                          : "bg-obsidian-surface/60 border-bronze-border/10 text-silver hover:border-bronze/40 hover:bg-bronze-dim/10 hover:translate-x-1 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-bronze font-bold text-xs mt-0.5">{letter}.</span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-bronze" />}
                    </button>
                  );
                })}

                {votedOption !== null && (
                  <button
                    onClick={handleRetractVote}
                    className="mt-4 text-xs font-heading font-medium tracking-wider text-bronze hover:text-bronze-light transition-colors underline underline-offset-4 flex items-center gap-1.5 self-start cursor-pointer group"
                  >
                    <RotateCcw className="w-3 h-3 group-hover:-rotate-45 transition-transform duration-300" />
                    Remove Vote
                  </button>
                )}
              </div>

              {/* Live Results */}
              <div className="flex flex-col justify-center bg-obsidian-light/10 rounded-2xl p-6 border border-bronze-border/10">
                <h3 className="text-xs font-heading font-semibold tracking-wider text-silver-muted uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
                  Live Results
                </h3>
                <div className="flex flex-col gap-4">
                  {activePoll?.options.map((opt, idx) => {
                    const voteCount = votes[idx] || 0;
                    const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                    const letter = optionLetters[idx] || String.fromCharCode(65 + idx);

                    return (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-light text-silver-muted">
                          <span>{letter}. {opt}</span>
                          <span className="font-mono">{pct}% ({voteCount})</span>
                        </div>
                        <div className="w-full bg-obsidian/60 h-2.5 rounded-full overflow-hidden border border-bronze-border/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-bronze to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* DISCORD DISCUSSION COMMUNITY JOIN CARD */}
        <ScrollReveal delay={150} className="mb-24 w-full">
          <div className="border border-indigo-400/30 rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-indigo-950/40 via-obsidian-surface/60 to-obsidian light:from-violet-200 light:via-indigo-100 light:to-purple-50 shadow-xl shadow-indigo-950/20 light:shadow-indigo-300/30 text-center relative overflow-hidden group">
            <div className="absolute 
              top-0 
              right-0 
              w-[300px] 
              h-[300px]
              bg-indigo-500/10
              light:bg-white/50
              blur-[100px]
              rounded-full
              pointer-events-none" />
            
            <div className="inline-flex 
    items-center 
    gap-2.5

    border 
    border-indigo-500/40
    light:border-indigo-600/30

    bg-indigo-950/50
    light:bg-white/80

    backdrop-blur-md

    px-4 
    py-1.5 
    rounded-full 
    mb-6">
              <Sparkles className="w-4 h-4 text-indigo-300 light:text-indigo-600" />

              <span className="font-heading text-[11px] font-semibold tracking-[3px] uppercase text-indigo-100 light:text-indigo-800">
                Discussion Community
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver light:text-slate-900 mb-3">
              Join the CoM Discord
            </h2>
            <p className="text-silver-muted light:text-slate-600 text-sm sm:text-base font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Engage in real-time debates, share research papers, suggest future Question of the Week topics, and connect with thinkers across mathematics, physics, philosophy, and arts.
            </p>

            <a
              href="https://discord.gg/UrfMsFmXYH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1 group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discussion Community
            </a>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  );
}
