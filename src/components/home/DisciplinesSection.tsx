import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Compass } from "lucide-react";

gsap.registerPlugin(useGSAP);

export interface SocietyItem {
  index: string;
  name: string;
  descriptor: string;
  leadQuestion: string;
  thesis: string;
  questions: string[];
  members: number;
  image: string;
}

export const disciplinesData: SocietyItem[] = [
  {
    index: "01",
    name: "Mathematics",
    descriptor: "The Ontology of Structure, Invariance & Transfinite Form",
    leadQuestion: "Is mathematics the fundamental architecture of the cosmos, or the cognitive syntax of the observer?",
    thesis: "Before stars ignited, pattern existed. We investigate the boundary where formal logic encounters the infinite, asking whether numbers are invented human symbols or the eternal fabric of reality.",
    questions: [
      "Was mathematics invented by human cognition or discovered in the cosmos?",
      "Can transfinite infinity possess an ontological boundary?",
      "Are there mathematical truths that algorithmic computation can never reach?"
    ],
    members: 28,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "02",
    name: "Theoretical Physics",
    descriptor: "Quantum Gravity, Gauge Symmetries & Emergent Spacetime",
    leadQuestion: "If spacetime is emergent, what fundamental substrate breathes fire into the equations?",
    thesis: "From the thermodynamic entropy of event horizons to quantum entanglement across cosmic voids, we probe the absolute limits of physical law, questioning the reality of time's unidirectional arrow.",
    questions: [
      "Can quantum information truly escape an evaporating black hole?",
      "Why does time flow inexorably forward and never backward?",
      "Is spacetime continuous at the Planck scale, or an emergent holographic network?"
    ],
    members: 32,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "03",
    name: "Philosophy of Mind",
    descriptor: "Phenomenology, Consciousness & The Metaphysics of Being",
    leadQuestion: "Can the redness of a rose or the ache of solitude ever be resolved into mechanical computation?",
    thesis: "Consciousness is the mirror wherein the universe contemplates itself. We scrutinize the hard problem of qualia, personal identity through biological mutation, and the boundary between physical computation and authentic inner experience.",
    questions: [
      "What preserves human identity across physical and cognitive transformation?",
      "Can subjective experience exist in a system composed purely of algorithmic switches?",
      "Is free will compatible with physical determinism or quantum randomness?"
    ],
    members: 21,
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "04",
    name: "Cosmology & Spacetime",
    descriptor: "Cosmic Inflation, Dark Energy & The Cosmological Horizon",
    leadQuestion: "What precedes the primordial expansion, and what truths remain eternally hidden beyond the event horizon?",
    thesis: "At the cosmic scale, silence reigns. We examine multiverse topologies, dark sector thermodynamics, and whether the ultimate fate of all matter is heat death, a big rip, or cyclic cosmological rebirth.",
    questions: [
      "Does the observable universe represent a localized bubble within an infinite multiverse?",
      "Could the cosmological constant point to new physics beyond general relativity?",
      "What was the state of the universe prior to cosmological inflation?"
    ],
    members: 27,
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "05",
    name: "Technology & AI",
    descriptor: "The Genesis of Synthetic Sentience & Cognitive Augmentation",
    leadQuestion: "Will artificial superintelligence amplify human contemplation, or render human meaning obsolete?",
    thesis: "We stand at the singular inflection point of artificial reason. Our inquiries address synthetic agency, algorithmic teleology, and the profound ontological distinction between statistical pattern synthesis and genuine comprehension.",
    questions: [
      "What cognitive threshold delineates genuine understanding from statistical imitation?",
      "Can artificial moral agency be codified without inheriting human evolutionary biases?",
      "What existential guardrails must precede the emergence of self-recursive intelligence?"
    ],
    members: 23,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "06",
    name: "Molecular Chemistry",
    descriptor: "Thermodynamics of Matter, Catalysis & Spontaneous Self-Assembly",
    leadQuestion: "What energetic laws govern the spontaneous self-organization of matter from chaos to complexity?",
    thesis: "Matter is not passive inert dust; it is dynamically organized energy. We explore non-equilibrium chemical thermodynamics, bio-molecular folding pathways, and how lifeless chemical bonds assemble into the living state.",
    questions: [
      "Can chemistry engineer room-temperature quantum coherent molecular materials?",
      "Why are certain catalytic pathways instantaneous while others span geological eons?",
      "Could non-carbon chemical systems sustain metabolic self-replication?"
    ],
    members: 21,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "07",
    name: "Evolutionary Biology",
    descriptor: "Morphogenesis, Genomic Information & The Logic of Living Systems",
    leadQuestion: "Is biological complexity an inevitable thermodynamic imperative, or a singular contingent accident?",
    thesis: "Life is an ongoing dialectic between informational code and physical entropy. We interrogate morphological adaptation, deep-time epigenetic resilience, and whether biological aging is an immutable constraint or an editable program.",
    questions: [
      "Is biological aging an unavoidable physical entropy or a reprogrammable genetic clock?",
      "Should humanity actively direct its own future germline genomic evolution?",
      "What universal thermodynamic principles govern self-organizing life?"
    ],
    members: 18,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "08",
    name: "Civilizations & History",
    descriptor: "Temporal Epistemology, Institutional Decay & The Cycles of Power",
    leadQuestion: "What structural vulnerabilities cause mature civilizations to fragment into oblivion?",
    thesis: "History is not a passive archive of antiquity, but the laboratory of human societal resilience. We analyze the lifespans of legal structures, the decay of epistemological consensus, and the preservation of truth across dark ages.",
    questions: [
      "Do historical trajectories follow cyclical laws, or are they chaotic collisions of contingencies?",
      "What systemic conditions allow intellectual institutions to outlast imperial collapses?",
      "How do distributed communications networks transform the political stability of nations?"
    ],
    members: 15,
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "09",
    name: "Literature & Semiotics",
    descriptor: "Narrative Hermeneutics, Archetypes & The Architecture of Meaning",
    leadQuestion: "Why do mythic narratives persist across millennia, surviving the death of the languages that birthed them?",
    thesis: "Language does not merely describe reality; it erects the perceptual architecture wherein thoughts take shape. We deconstruct poetic metaphor, symbolic representation, and how narrative coherence shields the conscious mind from nihilism.",
    questions: [
      "Can algorithmic language models author authentic literary art with genuine soul?",
      "Why is narrative fundamental to human sanity and social cohesion?",
      "What gives poetic meter its singular ability to convey the ineffable?"
    ],
    members: 22,
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    index: "10",
    name: "Complex Systems & Cybernetics",
    descriptor: "Non-Linear Dynamics, Emergent Networks & Strategic Decision Trees",
    leadQuestion: "How do simple local deterministic rules yield irreducible global intelligence?",
    thesis: "From neural webs to planetary financial flows, complex systems defy mechanistic reductionism. We investigate phase transitions, self-organized criticality, feedback latency, and resilience at the precipice of chaos.",
    questions: [
      "Are procedural game systems the ultimate modern medium for philosophical modeling?",
      "How do complex adaptive networks resist or succumb to catastrophic cascading failures?",
      "What defines the tipping threshold where simple interaction turns into collective consciousness?"
    ],
    members: 22,
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
  },
];

// Asymmetrical spatial orbital layout coordinates for floating gallery satellite cards
// Each slot represents an organic coordinate in the 3D space surrounding the center card
const orbitalSlots = [
  { x: -38, y: -24, z: -140, rot: -5, scale: 0.62, floatDur: 7.2 }, // Top-Left
  { x: 38, y: -22, z: -160, rot: 6, scale: 0.60, floatDur: 8.5 },  // Top-Right
  { x: -42, y: 26, z: -180, rot: 4, scale: 0.58, floatDur: 6.8 },  // Bottom-Left
  { x: 40, y: 28, z: -150, rot: -4, scale: 0.62, floatDur: 7.8 },  // Bottom-Right
  { x: -52, y: 2, z: -260, rot: -8, scale: 0.48, floatDur: 9.0 },  // Far Mid-Left
  { x: 52, y: 4, z: -250, rot: 7, scale: 0.50, floatDur: 8.2 },   // Far Mid-Right
  { x: -18, y: -36, z: -300, rot: 3, scale: 0.44, floatDur: 9.6 }, // High Top-Left
  { x: 20, y: -38, z: -320, rot: -4, scale: 0.42, floatDur: 10.2 }, // High Top-Right
  { x: 0, y: 40, z: -340, rot: 2, scale: 0.40, floatDur: 9.2 },    // Low Deep Center
];

export function DisciplinesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSociety, setActiveSociety] = useState<SocietyItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Track scroll across the pinned gallery track (400vh total height for silky pacing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0.0 -> 1.0) to society indices (0 -> 9) with smooth spring interpolation
  const continuousIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, disciplinesData.length - 1]
  );

  const smoothIndex = useSpring(continuousIndex, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
  });

  useEffect(() => {
    const unsubscribe = smoothIndex.on("change", (v) => {
      const rounded = Math.min(
        Math.max(Math.round(v), 0),
        disciplinesData.length - 1
      );
      if (rounded !== currentIndex) {
        setCurrentIndex(rounded);
      }
    });
    return () => unsubscribe();
  }, [smoothIndex, currentIndex]);

  // Programmatic jump to society index via scroll
  const jumpToSociety = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollTrackHeight = rect.height - window.innerHeight;
    const targetScroll = containerTop + (index / (disciplinesData.length - 1)) * scrollTrackHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const nextSociety = () => {
    if (currentIndex < disciplinesData.length - 1) {
      jumpToSociety(currentIndex + 1);
    }
  };

  const prevSociety = () => {
    if (currentIndex > 0) {
      jumpToSociety(currentIndex - 1);
    }
  };

  // GSAP 3D Interactive Cursor Parallax across the entire spatial stage
  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rotXTo = gsap.quickTo(stage, "rotateX", { duration: 1.2, ease: "power2.out" });
      const rotYTo = gsap.quickTo(stage, "rotateY", { duration: 1.2, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;

        rotXTo(-normY * 4.5);
        rotYTo(normX * 6.5);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef }
  );

  // Touch swipe support for mobile
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -45) nextSociety();
    else if (diff > 45) prevSociety();
  };

  const activeItem = disciplinesData[currentIndex];

  return (
    <section
      ref={containerRef}
      id="disciplines"
      className="relative w-full h-[400vh] bg-[#020202] text-[#F2EEE8] border-t border-white/8"
      aria-label="The Architecture of Inquiry"
    >
      {/* Sticky Fullscreen Spatial Gallery Theater */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#020202] px-4 sm:px-12 lg:px-20 py-5 sm:py-8 select-none"
      >
        
        {/* 1. Header Row (Minimalist Editorial Elegance) */}
        <div className="relative z-30 w-full max-w-6xl mx-auto flex items-end justify-between gap-4 sm:gap-6 pb-3 sm:pb-4 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[2.5px] sm:tracking-[3px] uppercase text-[#A78BFA]">
                02 / THE ARCHITECTURE OF INQUIRY
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#F2EEE8] tracking-tight">
              Ten Autonomous Guilds of Thought.
            </h2>
          </div>

          {/* Minimalist Society Index Counter */}
          <div className="font-mono text-xs text-[#A3A3A3] flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#A78BFA] font-medium text-xs sm:text-sm">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-white/40">{String(disciplinesData.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* 2. Three-Dimensional Spatial Orbit Stage */}
        <div
          ref={stageRef}
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          className="relative my-auto w-full max-w-6xl mx-auto h-[66vh] sm:h-[70vh] flex items-center justify-center"
        >
          {/* SATELLITE ORBITING GALLERY CARDS (Floating in periphery in 3D depth) */}
          {disciplinesData.map((society, idx) => {
            if (idx === currentIndex) return null; // Center card rendered separately below

            // Relative offset in sequence to map to consistent orbital coordinates
            const relativeOffset = (idx - currentIndex + disciplinesData.length) % disciplinesData.length;
            const slot = orbitalSlots[(relativeOffset - 1) % orbitalSlots.length];

            return (
              <motion.div
                key={society.index}
                initial={false}
                animate={{
                  x: `${slot.x}vw`,
                  y: `${slot.y}vh`,
                  z: slot.z,
                  rotate: slot.rot,
                  scale: slot.scale,
                  opacity: 0.45,
                }}
                whileHover={{
                  scale: slot.scale * 1.12,
                  opacity: 0.9,
                  rotate: 0,
                  z: slot.z + 80,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 24,
                  mass: 0.4,
                }}
                onClick={() => jumpToSociety(idx)}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 10 + Math.round(slot.scale * 10),
                }}
                className="absolute w-[220px] sm:w-[260px] aspect-[16/11] rounded-2xl overflow-hidden border border-white/12 bg-[#090909]/80 shadow-[0_16px_40px_rgba(0,0,0,0.85)] cursor-pointer group backdrop-blur-md hidden sm:block"
                aria-label={`Switch to Society ${society.index} — ${society.name}`}
              >
                {/* Natural floating idle wobble */}
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: slot.floatDur,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full relative"
                >
                  <img
                    src={society.image}
                    alt={society.name}
                    className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Satellite Card Overlay Info */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#A78BFA] bg-black/60 px-2 py-0.5 rounded-full border border-white/10 w-fit backdrop-blur-sm">
                      {society.index}
                    </span>

                    <div>
                      <h4 className="font-serif text-sm font-normal text-[#F2EEE8] group-hover:text-white transition-colors">
                        {society.name}
                      </h4>
                      <p className="font-sans text-[10px] text-[#A3A3A3] line-clamp-1 font-light mt-0.5">
                        {society.descriptor}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* CENTER STAGE SHOWCASE (The Active Society in Prominent Spotlight) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.index}
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 18,
                rotateY: -8,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateY: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.88,
                y: -18,
                rotateY: 8,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                zIndex: 35,
              }}
              className="relative w-full max-w-[92vw] sm:w-[540px] lg:w-[600px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#080808]/95 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(167,139,250,0.12)] backdrop-blur-xl"
            >
              {/* Heroic Cinematic Photo Banner */}
              <div className="relative h-36 xs:h-44 sm:h-56 w-full overflow-hidden bg-black">
                <motion.img
                  src={activeItem.image}
                  alt={activeItem.name}
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1.02 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/35" />

                {/* Society Index Pill */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                  <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[2px] sm:tracking-[2.5px] uppercase text-[#F2EEE8] bg-black/70 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/12 backdrop-blur-md">
                    SOCIETY {activeItem.index}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] bg-black/70 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/8 backdrop-blur-md">
                    {activeItem.members} Fellows
                  </span>
                </div>
              </div>

              {/* Showcase Body (Breathtaking Editorial Clarity) */}
              <div className="p-4 xs:p-6 sm:p-8">
                {/* Title & Descriptor */}
                <div className="mb-3 sm:mb-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="font-serif text-xl xs:text-2xl sm:text-3xl lg:text-[2rem] font-normal text-[#F2EEE8] tracking-tight"
                  >
                    {activeItem.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 }}
                    className="font-sans text-xs sm:text-sm text-[#A78BFA] font-light mt-0.5"
                  >
                    {activeItem.descriptor}
                  </motion.p>
                </div>

                {/* The Core Provocation Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-3 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.025] border border-white/8 mb-4 sm:mb-6 shadow-inner"
                >
                  <p className="font-serif italic text-xs xs:text-sm sm:text-lg text-[#F2EEE8] leading-snug sm:leading-relaxed">
                    "{activeItem.leadQuestion}"
                  </p>
                </motion.div>

                {/* Action Link to Full Society Dossier */}
                <div className="pt-2 flex items-center justify-between border-t border-white/8">
                  <button
                    onClick={() => setActiveSociety(activeItem)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-medium text-[#F2EEE8] hover:text-[#A78BFA] transition-colors cursor-pointer group"
                  >
                    <span>Read Full Society Dossier</span>
                    <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform text-[#A78BFA]" />
                  </button>

                  <span className="font-mono text-[9px] text-[#716E6B] uppercase tracking-wider hidden sm:inline">
                    CLICK SATELLITES TO ORBIT
                  </span>
                  <span className="font-mono text-[9px] text-[#716E6B] uppercase tracking-wider sm:hidden">
                    SWIPE / TAP ARROWS
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button
            onClick={prevSociety}
            disabled={currentIndex === 0}
            className={`flex absolute -left-1 sm:left-0 lg:left-4 z-40 w-8 h-8 sm:w-11 sm:h-11 rounded-full items-center justify-center border transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-10 cursor-not-allowed border-transparent bg-transparent"
                : "border-white/12 bg-black/75 text-[#F2EEE8] hover:border-[#A78BFA] hover:bg-[#A78BFA]/20 cursor-pointer backdrop-blur-md shadow-lg"
            }`}
            aria-label="Previous Society"
          >
            <ChevronLeft size={16} className="sm:hidden" />
            <ChevronLeft size={19} className="hidden sm:block" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextSociety}
            disabled={currentIndex === disciplinesData.length - 1}
            className={`flex absolute -right-1 sm:right-0 lg:right-4 z-40 w-8 h-8 sm:w-11 sm:h-11 rounded-full items-center justify-center border transition-all duration-300 ${
              currentIndex === disciplinesData.length - 1
                ? "opacity-10 cursor-not-allowed border-transparent bg-transparent"
                : "border-white/12 bg-black/75 text-[#F2EEE8] hover:border-[#A78BFA] hover:bg-[#A78BFA]/20 cursor-pointer backdrop-blur-md shadow-lg"
            }`}
            aria-label="Next Society"
          >
            <ChevronRight size={16} className="sm:hidden" />
            <ChevronRight size={19} className="hidden sm:block" />
          </button>
        </div>

        {/* 3. Bottom Progress Bar & Jump Dots */}
        <div className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between pt-4 border-t border-white/8 text-xs font-mono text-[#A3A3A3]">
          {/* Interactive Progress Dots */}
          <div className="flex items-center gap-1.5">
            {disciplinesData.map((d, i) => (
              <button
                key={d.index}
                onClick={() => jumpToSociety(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "w-6 bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to Society ${d.index}`}
              />
            ))}
          </div>

          <a
            href="#join"
            className="text-xs text-[#A3A3A3] hover:text-[#F2EEE8] transition-colors font-medium flex items-center gap-1.5"
          >
            <span>Petition for Fellowship →</span>
          </a>
        </div>

      </div>

      {/* Society Full Comprehensive Dossier Modal */}
      <AnimatePresence>
        {activeSociety && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveSociety(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#090909] border border-white/12 rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto relative shadow-[0_32px_80px_rgba(0,0,0,0.95)]"
            >
              {/* Modal Banner */}
              <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-black flex-shrink-0">
                <img
                  src={activeSociety.image}
                  alt={activeSociety.name}
                  className="w-full h-full object-cover filter brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/50" />
                
                <button
                  onClick={() => setActiveSociety(null)}
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[#A5A19F] hover:text-[#F2EEE8] p-2 rounded-full bg-black/60 border border-white/12 hover:border-white/30 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={15} />
                </button>

                <div className="absolute bottom-3 left-5 sm:left-6">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#A78BFA] bg-black/70 px-2.5 py-1 rounded-full border border-white/10">
                    Society {activeSociety.index}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-8">
                <div className="mb-5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F2EEE8]">
                    {activeSociety.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A78BFA] font-light mt-0.5">
                    {activeSociety.descriptor}
                  </p>
                </div>

                {/* Institutional Thesis */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/6 mb-6">
                  <p className="font-sans text-xs sm:text-sm text-[#E5E0D8] leading-relaxed font-light">
                    {activeSociety.thesis}
                  </p>
                </div>

                {/* Lines of Inquiry */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Frontier Lines of Inquiry</span>
                  </h4>
                  <div className="space-y-2">
                    {activeSociety.questions.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-black/60 border border-white/6 font-serif italic text-xs sm:text-sm text-[#E5E0D8] leading-relaxed"
                      >
                        "{q}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#716E6B]">
                    Active Fellows: <strong className="text-[#F2EEE8]">{activeSociety.members}</strong>
                  </span>
                  <a
                    href="#join"
                    onClick={() => setActiveSociety(null)}
                    className="font-sans font-medium uppercase tracking-wider text-[#A78BFA] hover:text-white transition-colors"
                  >
                    Petition for Fellowship →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
