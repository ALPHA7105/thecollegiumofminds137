import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

interface TypewriterQuestionCardProps {
  question: string;
  delay?: number;
  onClick?: () => void;
}

export const TypewriterQuestionCard: React.FC<TypewriterQuestionCardProps> = ({
  question,
  delay = 0,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  // Intersection observer to trigger typing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => setHasStarted(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasStarted, delay]);

  // Handle typing animation whenever `question` or `hasStarted` changes
  useEffect(() => {
    if (!hasStarted) return;

    setIsDone(false);
    setDisplayedText("");
    setIsRewriting(true);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= question.length) {
        setDisplayedText(question.slice(0, idx));
      } else {
        setIsDone(true);
        setIsRewriting(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [hasStarted, question]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      title="Click to flip question"
      className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between select-none ${
        isLight
          ? "bg-white/90 border border-sky-200/80 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/10"
          : "bg-obsidian-surface/50 border border-bronze-border/10 hover:bg-bronze-dim/10 hover:border-bronze/35"
      }`}
    >
      <span
        className={`absolute top-4 left-6 font-heading text-4xl leading-none select-none pointer-events-none ${
          isLight ? "text-sky-300/40" : "text-bronze/10"
        }`}
      >
        "
      </span>

      <p
        className={`text-sm font-light italic leading-relaxed pt-4 transition-colors min-h-[4.5rem] ${
          isLight
            ? "text-slate-800 group-hover:text-sky-950 font-normal"
            : "text-silver-muted group-hover:text-silver"
        }`}
      >
        {displayedText}
        {(!isDone || !displayedText) && (
          <span
            className={`inline-block w-1.5 h-4 ml-1 animate-pulse align-middle ${
              isLight ? "bg-sky-600" : "bg-bronze"
            }`}
          />
        )}
      </p>

      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between text-[10px] font-mono tracking-wider ${
          isLight
            ? "border-sky-100 text-slate-500"
            : "border-bronze-border/10 text-silver-dim"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span>INQUIRY</span>
          <RefreshCw
            size={11}
            className={`transition-transform duration-500 group-hover:rotate-180 ${
              isRewriting ? "animate-spin text-sky-600" : ""
            }`}
          />
        </div>

        <span
          className={`text-[9px] uppercase tracking-widest transition-colors ${
            isLight
              ? "text-sky-600 font-semibold group-hover:text-sky-700"
              : "text-bronze/70 group-hover:text-bronze"
          }`}
        >
          Click to Flip ↻
        </span>
      </div>
    </div>
  );
};
