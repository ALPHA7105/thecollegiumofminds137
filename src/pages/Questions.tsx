import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, RotateCcw, Sparkles, HelpCircle, ArrowLeft } from "lucide-react";
import { useToast } from "../components/ui";
import { getPollVotes, submitVote, retractVote } from "../lib/db";
import { AmbientBackground, Navbar, Footer, ScrollReveal } from "./Home";

export const weeklyQuestions = [
  {
    id: "q_progress",
    question: "Which has contributed more to humanity's progress?",
    options: [
      "Curiosity",
      "Necessity",
      "Competition",
      "Cooperation"
    ]
  },
  {
    id: "q_discovery",
    question: "Are the greatest discoveries made by asking better questions or finding better answers?",
    options: [
      "Better questions",
      "Better answers",
      "Both are equally important",
      "Neither — timing matters most"
    ]
  },
  {
    id: "q_truth",
    question: "If everyone believed something that wasn't true, would it still be wrong?",
    options: [
      "Yes",
      "No",
      "It depends on the situation",
      "I'm not sure"
    ]
  },
  {
    id: "q_future",
    question: "What will shape humanity's future the most?",
    options: [
      "Artificial Intelligence",
      "Scientific discoveries",
      "Education",
      "Human cooperation"
    ]
  },
  {
    id: "q_unknown",
    question: "What's more exciting?",
    options: [
      "Discovering something new",
      "Solving an old mystery",
      "Creating something original",
      "Teaching others what you know"
    ]
  },
  {
    id: "q_limit",
    question: "Which is humanity's greatest limitation?",
    options: [
      "Knowledge",
      "Time",
      "Imagination",
      "Cooperation"
    ]
  }
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
            Question Of The Week
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
      </div>
      <Footer />
    </div>
  );
}
