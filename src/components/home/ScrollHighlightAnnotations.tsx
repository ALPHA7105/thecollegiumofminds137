import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface Passage {
  lead: string;
  highlight: string;
  tail: string;
}

const philosophyPassages: Passage[] = [
  {
    lead: "The Collegium of Minds exists as an independent intellectual guild. It was created for thinkers, autodidacts, and researchers who recognize that ",
    highlight: "the most transformative breakthroughs occur when curiosity precedes conformity.",
    tail: " We refuse the false dichotomy between artistic intuition and scientific precision.",
  },
  {
    lead: "We inhabit an era saturated with fragmented data yet starved of deep contemplation. CoM functions as a decentralized laboratory of ideas—",
    highlight: "a calm, rigorous space where deep questions are celebrated rather than dismissed for lack of an immediate answer.",
    tail: " Real understanding requires patience and the discipline of silence.",
  },
  {
    lead: "Here, theoretical physics converses with philosophy of mind, pure mathematics intersects with generative technology, and biological emergence informs existential inquiries. ",
    highlight: "We believe understanding is a lifelong pursuit, and the horizon is always expanding.",
    tail: " Every inquiry answered is merely a doorway to ten deeper questions.",
  },
];

function MinimalPassage({ passage }: { passage: Passage }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -25% 0px", once: false });

  return (
    <p
      ref={ref}
      className="font-sans font-light text-base sm:text-lg lg:text-xl leading-relaxed text-[#A5A19F] transition-colors duration-500"
    >
      <span>{passage.lead}</span>
      <span
        className="relative inline rounded px-1.5 py-0.5 font-normal transition-all duration-500"
        style={{
          color: isInView ? "#FFFFFF" : "#A5A19F",
          backgroundColor: isInView ? "rgba(167, 139, 250, 0.22)" : "transparent",
          boxShadow: isInView ? "0 0 16px rgba(167, 139, 250, 0.25)" : "none",
          borderBottom: isInView ? "1.5px solid rgba(167, 139, 250, 0.6)" : "1.5px solid transparent",
        }}
      >
        {passage.highlight}
      </span>
      <span>{passage.tail}</span>
    </p>
  );
}

export function ScrollHighlightAnnotations() {
  return (
    <div className="space-y-8 sm:space-y-10 py-2">
      {philosophyPassages.map((passage, idx) => (
        <MinimalPassage key={idx} passage={passage} />
      ))}
    </div>
  );
}
