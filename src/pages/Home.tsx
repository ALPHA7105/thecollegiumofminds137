import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, ArrowRight, Check, ArrowLeft, Sparkles, ExternalLink, 
  Play, Pause, ChevronLeft, ChevronRight, Send, MessageSquare, Award, Clock, HelpCircle, BookOpen, RotateCcw 
} from "lucide-react";
import { authClient } from "@/api/authClient";
import { useToast } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { getPageViews, incrementPageViews, getPollVotes, submitVote, retractVote } from "../lib/db";

// ============================================================================
// Articles data (was data/articles.js)
// ============================================================================
export const categoryColors: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  "The Physical World": { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/30', dot: 'bg-sky-400' },
  "Matter & Molecules": { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', dot: 'bg-purple-400' },
  "Life & Nature": { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', dot: 'bg-emerald-400' },
  "Mathematics": { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', dot: 'bg-amber-400' },
  "Philosophy": { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', dot: 'bg-yellow-400' },
  "Innovation & Technology": { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30', dot: 'bg-cyan-400' },
  "Space & Cosmology": { text: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', dot: 'bg-indigo-400' },
  "Humanity & Society": { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', dot: 'bg-rose-400' },
  "Arts & Expression": { text: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/30', dot: 'bg-fuchsia-400' },
};

export const articles = [
  {
    slug: 'secrets-of-game-design-part-1',
    title: 'The Secrets of Game Design (Part 1)',
    author: 'Joel Mendonca',
    category: 'Innovation & Technology',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    date: 'May 16, 2026',
    readTime: '8 min read',
    excerpt: 'This article is part of a series exploring the secrets of game design: the techniques, systems, and psychological tricks that shape how games keep players engaged, motivated, and coming back.',
    content: `Have you ever played a game for 'just 5 minutes' and ended up playing for hours? What makes video games so addictive, regardless of the available features? Today, I'll be sharing the secrets of game design that almost every dev uses to create long lasting and addictive gameplay.

## The Game Loop

Let's start with the simplest yet most effective systems, the gameloop. In simple terms, a gameloop is when players work on a goal, achieve the goal, and get rewarded. In RPG/Adventure based games, the goal is simply provided by the game itself. However, in sandbox games, you, the player, are meant to create your own minigoals and try to achieve them. A good game gives clean instructions or hints on the goal to be achieved, reducing confusion, making players spend hours on that game. After completing the goal, the player must get a reward. This is the most important part, as it decides if the player must spend their time completing the task. Some devs use a technique called "high risk, high reward", which, as the name suggests, makes the goal extremely risky, which upon completion, gives a very big reward. The gameloop must also be simple, and mustn't change drastically throughout gameplay stages. An example of this is Geometry Dash. In this game, regardless of your skill level, the main gameloop is to jump and avoid hitting obstacles. The loop is very easy to understand, but hard to master, making this a perfect example for a gameloop.

## Progression Systems

However, a good gameplay loop alone is not enough to keep players engaged for months or even years. This leads us to our second technique in game design, the progression system. This simple, yet powerful system is the key factor to any game's success. The way this works is as follows. Every player starts at the lowest level or status. Gradually, after unlocking certain objectives or completing certain tasks, the player's level/status must evolve based on their skill. Simple, right? However, the main thing that separates a bad progression system from an addictive one is the way dev's implement it. Let's talk about flow state for a second, as it's an important factor for a good progression system. Flow state is a mental state where a person's mind enters a deep focus mode. In order to achieve this, the person must balance the task difficulty. Making the task too easy results in boredom, and making it too hard results in frustration. A good game developer needs to learn how to balance the person's mood based on their level/status in the game. For dev's that are just starting on video game design, a good way to test it is to create a prototype as fast as possible, and send it to different people without any guidance. Then, watch how the players react to different mechanics, and note down which ones they like, which ones they don't, and which ones they get obsessed with. This only comes through years of experience, so don't feel discouraged if someone doesn't like your game idea.

## Finding Game Ideas

These above tips, however, only work when you have a clear game idea. If you're struggling to find good ideas for your game, the below tips will help. First, start brainstorming on your favorite game genre. My personal favorite is the sandbox genre. After that, do some research on the popularity of the genre. You may open steam or itch.io, and search up the genre. After this, try to mix different genres to create your game idea. For example, let's say you love horror games, but the current trend is sandbox. In that case, you can create an Open-World Horror RPG where a player is stuck in a liminal space and their goal is to create solutions on how to escape. The idea for my long-term project, Build, came when I first stumbled upon cookie clicker, and thought if I could merge an idle-based game with my favorite genre at the time, sandbox. Another thing that beginners tend to do is to overscope their idea. You must never overscope your game idea. Always start small, get immediate player feedback, and gradually add features.

## Conclusion

Game designing can never be taught by anyone. It comes from years of experience. I hope the above game designing techniques gave you all a good starting point and maybe inspired you to create your own games. Good luck on your gamedev journey!!

*Authored by: Joel Mendonca*`,
  },
  {
    slug: 'traveling-faster-than-light',
    title: 'Traveling Faster Than Light?',
    author: 'Sarvesh Kore',
    category: 'Space & Cosmology',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
    date: 'Nov 1, 2025',
    readTime: '17 min read',
    excerpt: 'A brief article on how real physics and speculative theories like the Alcubierre drive and Tri-Space model could make faster-than-light travel conceivable.',
    content: `## I. Introduction

Ever since humans first looked up at the stars, we've wondered how to reach them. The problem is simple in theory but stubborn in practice: the universe has a speed limit. According to Einstein's theory of relativity, nothing with mass can travel at the speed of light or faster because it would require infinite energy to accelerate to it, which makes interstellar travel seem almost impossible.

Yet, physicists have explored creative ways around this limit, from wormholes to bending spacetime, such as the Alcubierre warp drive, which suggests that while objects can't locally exceed the speed of light, spacetime itself might be manipulated to move them faster. This paper will explore the real physics behind faster-than-light travel, the challenges it faces, and the theoretical possibilities that scientists have proposed.

By understanding the physics behind such an idea, we will ask a fundamental question: Is traveling faster than light theoretically possible?

## II. The Speed Limit Of The Universe

One of the most astonishing discoveries in physics is that the universe has a speed limit: the speed of light. Nothing with mass can travel faster than this limit, which is about 299,792,458 meters per second (or roughly 186,000 miles per second). To put that into perspective, a beam of light could circle the Earth 7.5 times in just one second.

Einstein's Special Theory of Relativity explains why this limit exists. As an object moves faster, it gains energy and mass. The closer it gets to the speed of light, the more energy it needs to go faster. To actually reach light speed, a massive object would require infinite energy — clearly impossible.

This isn't just a theoretical restriction; it shapes everything we know about the universe. Even the fastest spacecraft we've built, like the Parker Solar Probe, travel only a tiny fraction of light speed. That's why stars feel so distant — traveling to even the nearest star would take tens of thousands of years with today's technology.

Understanding this "speed limit" is the first step in exploring why physicists have proposed creative, and sometimes mind-bending, ideas for faster-than-light travel. It's not just science fiction — it's the boundary that challenges human imagination and drives theoretical research.

## III. Early Concepts on FTL Travel

Humans have always dreamed of breaking the cosmic speed limit. Even before the mathematics of Einstein defined the ultimate speed, writers and scientists imagined ways to move faster than light. When we talk about faster-than-light (FTL) travel today, it's a mix of imagination and serious physics speculation.

One of the earliest theoretical ideas involves tachyons, hypothetical particles that always move faster than light. According to the theory, these particles would have imaginary mass and could transmit information faster than light. However, tachyons remain purely speculative — no one has ever observed one, and their existence could violate fundamental principles like causality, which is the idea that causes always precede effects. In other words, if tachyons existed, it might be possible to send a message backward in time, which opens a whole Pandora's box of paradoxes.

Another intriguing possibility comes from wormholes, also known as Einstein-Rosen bridges. Imagine spacetime as a stretched sheet (a very simplified version); a wormhole is like folding the sheet so that two distant points touch. If traversable, wormholes could connect two locations in space instantly. While the math allows for them, making a real, stable wormhole would require exotic matter with negative energy — something we don't know how to create in usable amounts. Wormholes remain a fascinating theoretical tool, showing how physics can push the limits of imagination without breaking its own rules.

Even within the constraints of relativity, physicists have proposed clever ways to "cheat" the speed limit without violating Einstein's laws. For example, instead of moving an object faster than light, you could move spacetime itself. This is the idea that eventually led to the concept of the warp drive, where a ship could sit inside a bubble of space that contracts in front of it and expands behind it. Locally, the ship never exceeds light speed — but the bubble carries it across vast distances faster than light could travel in normal space.

These early ideas show that the universe's speed limit is not necessarily a wall, but a challenge. Physicists are not saying faster-than-light travel is easy or even currently possible — only that the equations leave room for creative solutions. They also demonstrate the beauty of theoretical physics: by stretching what we know, we discover what might be possible, even if it seems impossible at first glance.

## IV. Alcubierre's Warp Drive

In 1994, a breakthrough idea appeared in the world of theoretical physics: the Alcubierre warp drive. Proposed by Mexican physicist Miguel Alcubierre, it offered a way to imagine faster-than-light travel without actually breaking Einstein's speed limit. The idea is elegant in its simplicity and mind-bending in its implications.

Instead of propelling a spaceship through space faster than light — which, as we've seen, is impossible for objects with mass — Alcubierre suggested that we could manipulate space itself. Imagine spacetime as a flexible fabric (again simplified). If you could contract space in front of a ship and expand it behind, you would create a "bubble" that carries the ship forward. Inside the bubble, the ship remains still relative to its immediate surroundings, so it never locally exceeds the speed of light. Yet from the outside, it would appear to zip across the cosmos at superluminal speeds.

Mathematically, the concept is grounded in Einstein's field equations of general relativity, which describe how matter and energy warp spacetime. Alcubierre showed that, at least on paper, a specific distortion of spacetime could move a region faster than light relative to distant observers. This sparked huge excitement, because it hinted that the ultimate speed limit might not be as absolute as once thought — at least when it comes to moving space, not objects within it.

Of course, there are major challenges. Early calculations suggested that the energy required to create a warp bubble was enormous, more than the mass-energy of the entire observable universe. Worse, the bubble would require exotic matter with negative energy density — a type of matter that, so far, may not exist in usable quantities. Later refinements by physicists, including attempts to reduce the energy requirements, showed that while the numbers are lower, the problem remains far beyond our current technology.

Beyond energy, there are other practical issues. Stabilizing the bubble, preventing catastrophic radiation buildup, and safely entering or exiting a warp bubble all remain unsolved. Yet even with these obstacles, the Alcubierre drive is a brilliant thought experiment. It shows how physics allows us to stretch our imagination without breaking its rules.

In short, the Alcubierre warp drive demonstrates a profound lesson: the universe may have limits, but those limits can inspire creative solutions. While we can't build a warp drive today, the concept forces us to ask what is theoretically possible, and in doing so, expands the boundary between science and imagination.

## V. Working Of The Warp Drive

The Alcubierre warp drive is fascinating because it reimagines what it means to travel through space. Instead of pushing a ship through the void, you manipulate the void itself. To understand how it works, let's break it down step by step.

**1. The Bubble**

At the heart of the drive is a warp bubble — a self-contained region of spacetime surrounding the spacecraft. The bubble acts like a protective shell: inside, normal physics still applies, so clocks tick regularly, light behaves as usual, and the crew feels no unusual acceleration. The magic happens outside the bubble.

Front of the bubble: Space is contracted. Distances shrink, so the ship is effectively closer to its destination than it appears from the outside.

Rear of the bubble: Space is expanded, stretching the path behind the ship. This creates a push, carrying the bubble forward.

**2. The Role of Exotic Matter**

To warp spacetime in this way, the bubble needs negative energy density, which can only be produced by what physicists call exotic matter. Unlike ordinary matter, which pulls spacetime inward (gravity), exotic matter can push spacetime outward, creating the expansion behind the bubble and contraction in front.

In practice, exotic matter might be related to Casimir effect particles, quantum vacuum fluctuations, or forms of negative energy predicted by quantum field theory.

Without exotic matter, the bubble would collapse, or the energy requirements would be infinite.

**3. Energy and Stability Challenges**

The energy required is enormous. Early calculations suggested more than the mass-energy of the observable universe. Later refinements, using different bubble geometries and more efficient spacetime distortions, brought the energy down dramatically — though it's still far beyond today's technology.

The bubble also requires careful shaping to avoid catastrophic radiation buildup at the front.

If the bubble collapses or is uneven, it could destroy the ship or cause a "shockwave" in surrounding space.

**4. Particles and Quantum Considerations**

Theoretical studies suggest that the bubble might involve:

Virtual particles from the quantum vacuum, whose energy can be manipulated to create negative pressure.

Exotic matter with negative mass, which could counteract gravity's pull and stabilize the bubble.

The precise mechanism is still speculative. Scientists can calculate the geometry of the warp field, the energy density needed, and the theoretical speed limits, but producing even a tiny bubble in the lab remains far beyond current technology, let alone a spaceship-wide bubble.

## VI. Science Meets Fiction

Even the most brilliant imagination needs guidance when it comes to believable science. Authors who want to include realistic faster-than-light travel often consult experts to ensure that their ideas don't completely break known physics. Christopher Paolini (author of 'To Sleep In A Sea Of Stars'), for example, worked with physicists Gregory Meholic, Richard Gautier, and H. David Froning Jr. to understand what might theoretically allow a ship to travel faster than light.

These experts helped translate abstract equations into concepts that could be visualized and explained in a narrative-friendly way. Their guidance included:

**Understanding Warp Mechanics**
- How a ship could sit safely inside a warp bubble
- What happens at the edges of a bubble where space stretches and contracts
- The energy and stability considerations required to maintain such a field

**Quantum Vacuum and Exotic Matter**
- How hypothetical negative energy could be produced or harnessed
- The theoretical particles and quantum effects needed to manipulate spacetime
- Safety challenges, like preventing harmful radiation at the bubble's boundary

**Limitations and Plausibility**
- How fast a bubble could theoretically move relative to the universe
- The effects of bubble collapse or misalignment
- Energy scaling: why even "small" bubbles require enormous power

**Bridging Theory and Storytelling**
- How to simplify these concepts so readers can understand without a physics degree
- How to create rules within a story that feel scientifically grounded
- Ensuring consistency: the bubble can't allow miracles that violate relativity

By working with these physicists, Paolini was able to create a system that feels real while remaining fictional. The process demonstrates that science fiction doesn't have to ignore science — it can use real physics as a framework for imagination, showing readers a universe that feels both thrilling and plausible.

This collaboration highlights an important principle for any exploration of faster-than-light travel: the boundary between theory and speculation is where imagination thrives. It's where physicists' equations meet the creative mind, allowing ideas like warp bubbles to inspire not just stories, but new ways of thinking about the cosmos.

## VII. Fictional Adaptation — The Markov Drive

Christopher Paolini's To Sleep in a Sea of Stars goes beyond simple "magic FTL" by building a propulsion system grounded in speculative physics ideas, consulting real physicists to make it internally consistent. The result is the Markov Drive, which moves ships through a Markov Bubble, a self-contained region that allows faster-than-light travel in a controlled way.

**1. Tri-Space Hypothesis**

At the heart of the Markov Drive is Gregory Meholic's Tri-Space Hypothesis. Paolini uses this idea to define three "luminal realms":

- Subluminal space — normal space governed by standard physics, where nothing can exceed the speed of light.
- Superluminal space — a realm where motion faster than light is possible.
- Luminal Space (The membrane/boundary) — a transitional layer separating subluminal and superluminal space.

This framework allows the story to maintain logical consistency: ships can move faster than light without violating causality, because transitions are carefully controlled at the boundary.

**2. Transluminal Energy Quanta (TEQs)**

Richard Gauthier contributed the concept of TEQs, special particles that can exist in both subluminal and superluminal regimes. These particles are essential because they:

- Carry energy and momentum across the membrane without breaking conservation laws.
- Allow the ship's systems to interface safely with superluminal space.
- Serve as the "building blocks" of the Markov Bubble, enabling controlled FTL movement.

TEQs are fictional but inspired by real physics reasoning: they give a plausible explanation for how matter can interact with a region where the normal speed of light no longer applies.

**3. Conditioned Electromagnetic Fields**

H. David Froning Jr.'s contribution comes in the form of conditioned EM fields, which Paolini adapts to:

- Stabilize the Markov Bubble around the ship.
- Maintain the correct shape and density of the bubble to allow smooth travel.
- Protect the ship from the extreme stresses of moving through superluminal space.

**4. Constraints and Safety**

Paolini integrates realistic constraints inspired by physics:

- Gravitational limits: Strong gravitational fields can distort or collapse the Markov Bubble, rendering certain regions of space hazardous for FTL travel.
- Energy and momentum conservation: The drive must carefully manage energy as it transitions across the membrane.
- Causality protection: The bubble's membrane ensures that time paradoxes do not occur, even though the ship moves faster than light.

**5. How the Drive Works**

- Ship preparation: The Markov Drive generates a subluminal "core" around the ship.
- Bubble formation: TEQs are manipulated with conditioned EM fields to expand a controlled region of superluminal space outside the core.
- Transition: The ship enters the superluminal bubble, moving faster than light relative to outside observers, while locally everything inside feels normal.
- Navigation: The bubble is steered via EM fields and careful energy modulation, keeping it stable and avoiding gravitational hazards.
- Exit: The ship transitions back into subluminal space at the target location, preserving momentum and avoiding time paradoxes.

**6. Plausibility vs Speculation**

- Grounded ideas: The tri-space model, energy/momentum conservation, gravitational limitations, and the notion of moving a bubble through space have analogs in theoretical physics (warp bubbles, Alcubierre drive).
- Highly speculative: TEQs, superluminal space, and conditioned EM fields are fictional constructs, because we have no experimental evidence or physical theory that allows particles or fields to maintain a stable FTL bubble.

## VIII. Evaluating Scientific Plausibility

The Markov Drive and its underlying theories represent a fascinating intersection between real physics and speculative imagination. To understand how plausible this system truly is, we can examine each of its major components — what is grounded in current physics, what extends existing theories, and what remains purely fictional.

**1. The Tri-Space Framework**

Gregory Meholic's idea of Tri-Space Hypothesis divides the universe into three luminal domains — subluminal, transluminal, and superluminal space.

*What's plausible:* The concept of regions with different spacetime properties has a loose foundation in general relativity. The Alcubierre metric, wormholes, and cosmological inflation all involve spacetime behaving differently under extreme conditions. The idea that such domains could exist mathematically is not impossible.

*What's speculative:* There is currently no experimental evidence that space has "layers" with distinct speed-of-light limits. In reality, light's speed is a constant property of spacetime itself, so separating "sub" and "super" luminal realms would require new physics beyond relativity.

**2. Transluminal Energy Quanta (TEQs)**

Richard Gauthier's TEQs are particles that can cross between subluminal and superluminal space.

*What's plausible:* Quantum field theory does allow for virtual particles and fluctuations that seem to appear and disappear across spacetime boundaries, so the concept of a "transitional" particle isn't entirely unreasonable.

*What's speculative:* TEQs directly violate known physical laws. No evidence supports the existence of matter or energy that can stably exist at both sublight and superlight regimes. Relativity predicts infinite energy requirements as objects approach light speed — so TEQs would require physics that can circumvent relativity entirely.

**3. Conditioned Electromagnetic Fields**

H. David Froning Jr.'s conditioned EM fields are a theoretical way to shape and stabilize a warp bubble.

*What's plausible:* Electromagnetic fields can affect spacetime curvature indirectly through energy density (Einstein's equations). In principle, extremely strong EM fields could distort local spacetime — though not nearly enough for travel effects.

*What's speculative:* Conditioning EM fields to produce precise spacetime warps or to sustain a stable FTL bubble is entirely hypothetical. The energy scales involved would likely be astronomical, far beyond what any known technology could generate.

**4. Bubble Stability and Energy Requirements**

*What's plausible:* Even theoretical models like the Alcubierre drive face immense energy challenges. Later refinements in physics suggest certain geometries could reduce energy demands, but it remains unfeasible with current understanding.

*What's speculative:* A "stable, navigable warp bubble" that allows a ship to move freely through space is not supported by any known physics. Any such bubble would likely collapse instantly or require negative energy densities that quantum mechanics does not permit in macroscopic quantities.

**5. Causality and Time**

One of the major theoretical risks of FTL travel is causality violation — the ability to send information or matter backward in time.

*What's plausible:* Paolini's universe cleverly sidesteps this by establishing strict rules at the membrane boundary between spaces. This makes narrative sense, and certain physics models (like tachyon field theories) also try to impose such constraints mathematically.

*What's speculative:* In real physics, any superluminal propagation leads to potential time paradoxes. No model so far has successfully allowed FTL without breaking causality, so these rules remain fictional but well-designed.

## IX. The Mirror And The Dream

If the Alcubierre drive represents humanity's technical boldness, then the questions it raises reveal our moral and philosophical maturity — or lack thereof. Faster-than-light travel would not merely be a triumph of physics; it would be a reshaping of destiny. Imagine what it means to move faster than light — to cross cosmic gulfs in an instant, to see the stars not as unreachable beacons but as new homes. Yet beneath that thrill lies a quiet unease: should we?

The ethics of FTL travel lie in its potential to redefine what it means to be human. If distance and time no longer separate us, how would we perceive responsibility, culture, or even belonging? Colonization, resource exploitation, and cosmic militarization could extend far beyond Earth, magnifying our existing flaws on a galactic scale. A civilization that can outrun light might also outrun its conscience. The moral dimension of such power cannot be ignored — for every equation that bends spacetime, there must be a philosophy that anchors humanity.

This is where science fiction performs its quiet miracle. Long before equations like Alcubierre's appeared, stories like Star Trek, Dune, and Interstellar gave shape to our cosmic yearning. They humanized the impossible — not by explaining it, but by imagining what it would mean. Science fiction is not merely escapism; it is a rehearsal for the future. It teaches us empathy before technology gives us power, and it forces us to ask the question that science alone cannot: what kind of beings should we become when we finally touch the stars?

Alcubierre's drive may one day move ships across spacetime, but fiction already moves minds across possibility. Between the laboratory and the imagination, humanity finds its true propulsion — not the warp of space, but the expansion of the soul.

## X. Conclusion

Miguel Alcubierre's equation was more than mathematics — it was an act of imagination disguised as physics. It dared to suggest that the ultimate barrier, the speed of light, might not be a wall but a window waiting to be opened. Yet beyond the science lies a truth both humbling and profound: every time humanity reaches for the impossible, we uncover not only new frontiers of space, but new dimensions of ourselves.

The warp drive reminds us that progress is not born from certainty but from wonder — from minds unafraid to blur the line between dream and discovery. Perhaps we will never ride a wave of bent spacetime to another star. Perhaps the Alcubierre Drive will remain forever a metaphor — a symbol of our refusal to accept limits. But even then, it will have served its greatest purpose: to remind us that the universe is vast, and curiosity is even vaster.

Science fiction gave the dream shape. Physics gave it language. And humanity gives it meaning. As we look toward the horizon of possibility — toward light-years yet untouched — we must remember that our greatest propulsion system has always been imagination itself. For it is not warp drives or engines that will carry us to the stars, but the enduring human will to try.

## XI. Bibliography

1. Meholic, Gregory V.: A Model of Spacetime and the Universe. Introduces the Tri-Space hypothesis, which divides the universe into subluminal, transluminal, and superluminal realms — the idea behind Paolini's Markov Drive. [PDF Link](https://kepleraerospace.com/wp-content/uploads/2023/03/Meholic-Tri-Space-A-Model-of-Spacetime-and-the-Universe-EstesPk-091318.pdf)

2. Paolini, Christopher: To Sleep in a Sea of Stars. A science fiction novel that builds on real theoretical physics (like Meholic's work) to imagine a plausible form of faster-than-light travel. [Fractalverse](https://fractalverse.net/)

3. Froning Jr., H. David: Faster Than Light: Warp Drive and Quantum Vacuum Power. A book exploring real physical principles that might enable FTL travel by using quantum vacuum energy and conditioned electromagnetic fields.

4. Alcubierre, Miguel: The Warp Drive: Hyper-Fast Travel within General Relativity. [arXiv](https://arxiv.org/pdf/gr-qc/0009013)

5. "How Does Faster-Than-Light Travel Work?" Fractalverse Wiki (Community-maintained). [Link](https://fractalverse.net/explore-the-universe/ftl-travel/)

*Authored by: Sarvesh Kore*`,
  },
  {
    slug: 'is-gravity-an-illusion',
    title: 'Is Gravity An Illusion?',
    author: 'Sarvesh Kore',
    category: 'The Physical World',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    date: 'Oct 17, 2025',
    readTime: '20 min read',
    excerpt: "An explanatory article that explores the true nature of gravity by using Einstein's General Theory of Relativity.",
    content: `## I. Introduction

Gravity feels simple. You drop something, it falls. You jump, you come back down. The apple falls from the tree. Earth pulls you toward its center. That's what we all learned. But if you really think about it, there's something strange. Why does everything fall at the same rate, even though it has different masses? Why do astronauts float in space, even though Earth's pull is still strong up there?

Einstein looked at these questions differently. Instead of asking, "What is pulling the apple?" he asked, "What if nothing is pulling at all?"

## II. Einstein's Happiest Thought

Einstein imagined the window cleaner of his patent office falling from the building's rooftop. Anything that man drops on his way — a bucket, his cleaning equipment, his cap — appear to float alongside him. Relative to him, nothing accelerates. He feels weightless.

This man is, what physicists call, an inertial observer. He is under no acceleration, no forces are acting on him, and all the laws of physics apply in his frame of reference, called the inertial frame of reference.

No up, no down. This scenario is just as if he were floating in empty space, far from any massive body.

This thought led to something profound: These two cases — the free falling man, and the man in deep space — are not just similar, they are exactly the same thing. This is what's known as the Equivalence Principle.

## III. The Equivalence Principle

The principle is simple in words, but mind-blowing in meaning: the effects of gravity and acceleration are indistinguishable if you only consider the experience of the observer. In other words, if you're inside a closed room and can't see outside, you wouldn't be able to tell whether the force you feel is because the room is standing still on Earth or because the room is being accelerated in deep space.

Imagine a person inside a rocket far from any planet. The rocket starts accelerating upward at 9.8 m/s² — the same acceleration experienced due to gravity on Earth. The person inside feels pressed against the floor of the rocket, just as we feel on Earth. It seems as though a force is pulling them toward the floor, but an observer in an inertial frame of reference sees the rocket accelerating toward the person. The "gravity" inside the rocket is therefore caused by the acceleration of the rocket, not by a mysterious force.

Now, consider the falling person from a rooftop. They feel weightless, as if there is no gravity at all, even though they are within Earth's gravitational field. To them, it is exactly like floating in empty space. This demonstrates that experiencing weight or weightlessness depends not solely on gravity, but on whether one is following a natural path through spacetime or being forced off it by something, like the ground or a rocket floor.

Whether you feel under the influence of gravity depends on your frame of reference. The astronaut in the rocket experiences a force toward the floor, while an external inertial observer sees the rocket accelerating toward the astronaut. Similarly, standing on Earth, we appear at rest relative to our surroundings, but we are not in an inertial frame, because, in simple terms, you are not weightless. To determine acceleration, we must compare ourselves with an inertial observer, such as a free-falling person. From this perspective, someone standing on Earth is accelerating upward at 9.8 m/s² relative to the free-falling observer.

You might think, "I'm not accelerating!" — but acceleration is always measured relative to something. If you compare yourself only to things around you, they seem stationary, but that's because your whole local frame is accelerating together. To know your true acceleration, you need to compare it to an inertial observer, someone who is not accelerating. Only then can you see that you are actually accelerating.

Einstein realized this equivalence between acceleration and gravity was the key to understanding the universe in a completely new way. Instead of thinking of gravity as a force that pulls objects, he thought about it as the curvature of spacetime itself. Objects aren't being pulled; they are moving along the straightest paths possible in curved spacetime, called geodesics.

So, the Equivalence Principle tells us something amazing: your experience of "gravity" is actually about your frame of reference — whether you are accelerating or moving naturally through spacetime. And this insight completely changed the way scientists look at the universe, laying the groundwork for Einstein's general theory of relativity.

## IV. The Rocket And The Planet

Now, let's take the Equivalence Principle a step further with a different thought experiment — a rocket flying through space near a planet. Imagine an astronaut inside this rocket, and a planet far away. The rocket moves at a constant velocity, smooth and steady, so our astronaut feels weightless. Nothing is pushing or pulling on them — they're floating freely.

From the perspective of someone far away, though, the story looks a little different. As the rocket drifts closer to a massive planet, its path appears to curve toward the planet. To the distant observer, it's almost like the planet is "pulling" the rocket in. But inside the rocket, the astronaut doesn't notice anything unusual. They keep floating, perfectly weightless, as if nothing has changed.

As the rocket keeps approaching the planet, it keeps accelerating. With respect to an outside observer. But the astronaut still feels weightless, as if he's moving with constant velocity in a straight line.

Einstein's idea is simple but powerful: the rocket's curved path near a planet isn't because a force is pulling it. It's because spacetime itself is curved by the planet's mass. The astronaut inside is actually moving in a straight line along a natural path in curved spacetime, called a geodesic. To an outside observer, the path looks curved, but for the astronaut, it's straight.

A good way to imagine this is the rubber sheet analogy: roll a marble across a stretched sheet with a heavy ball in the middle. The marble curves around the ball, not because it's being pulled, but because the sheet is warped. In real life, spacetime is like that sheet, and the planet's mass bends it. Unlike this analogy, there's no actual downward pull. Objects don't fall because they are "pulled" — they just follow the natural paths in curved spacetime. Mass bends spacetime, and objects move along these curves, called geodesics, which are the straightest possible paths in that curved space. So objects appear to move toward heavier masses, not because of a force, but because they are following the curved spacetime created by that mass.

Standing still on Earth isn't being at rest in an absolute sense; it's being pushed upward along a curve. That's why the floor pushes on your feet — it's forcing you off your natural, free-fall trajectory.

This shows that gravity isn't a force pulling things together. It's the shape of spacetime guiding how objects move. The astronaut feels like they're moving straight, while someone far away sees a curved path. Gravity, in Einstein's view, is geometry in action, not a mysterious invisible pull.

## V. Straight Lines on Curved Surfaces (Geodesics)

Alright, now let's get into something called geodesics, which might sound like a fancy math word, but it's actually pretty simple — and super important for understanding gravity. A geodesic is basically the straightest path you can take in a curved space. Sounds weird? Let me explain.

Think about the Earth. It's round, right? Now imagine two people standing on the equator, 100 km apart. They both start walking straight north toward the North Pole. If they keep walking "straight" according to the Earth's surface, they eventually meet at the Pole. To them, they're walking straight lines, but if you looked at a flat map, it might seem like they're curving toward each other.

This is exactly how objects move in curved spacetime. Objects like rockets, planets, or even light beams are moving along geodesics — straight paths — but because spacetime is curved by massive objects like planets or stars, their paths appear curved to outside observers.

Another way to think about it is like flying in an airplane. Pilots don't actually fly in perfectly straight lines over the globe. They follow what's called a great-circle route, which is the shortest distance between two points on a sphere. To us looking from above, the path looks curved, but for the plane, it's the most direct route — a straight line in curved space.

So, when astronauts orbit the Earth, they aren't really "falling" in the way we usually think. They are following geodesics in spacetime. The Earth's mass curves spacetime around it, and the astronauts move along these curved paths naturally. To them, it feels like they're floating in a straight line, weightless, even though from the Earth it looks like they're circling the planet.

In short, geodesics show us that what we call "gravity" is really about how spacetime is shaped and how objects naturally move in that shape. It's not a force pulling us down — it's the geometry of the universe guiding the path of everything in it.

## VI. Astronauts and Weightlessness

Let's dive into one of the coolest ways to understand Einstein's ideas: astronauts floating in space. When we see astronauts inside the International Space Station doing flips and floating pens around them, it looks like they're defying gravity. But what's really going on?

Here's the surprising part: they aren't feeling any force pulling them down. Yes, Earth is nearby and its mass curves spacetime, but the astronauts don't experience a "pull." In Einstein's view, gravity isn't a force at all — it's the effect of curved spacetime guiding the paths of objects. The astronauts are moving along these natural, straight paths called geodesics.

The ISS is moving sideways fast enough that, even though it's falling toward Earth, it keeps missing it — orbiting around it instead of crashing. Everything inside — the walls, the floor, and the astronauts themselves — is falling together at the same rate. This is why they feel weightless. Nothing is pushing or pulling on them in their frame of reference.

From the perspective of someone on Earth, it looks like the astronauts are orbiting and "falling" around the planet. But for the astronauts, they are simply following the straightest path possible through curved spacetime. They're not resisting a force; they're just moving naturally, guided by the shape of spacetime.

So, weightlessness isn't about escaping gravity. It's about moving along a geodesic in curved spacetime, where the illusion of gravity disappears. The astronauts' experience proves Einstein right: what we feel as gravity is not a force, but a natural consequence of spacetime's geometry.

## VII. The Rubber Sheet Analogy — A Misconception

You've probably seen that classic picture of a heavy ball placed on a stretched rubber sheet, with smaller balls rolling toward it. It's a neat image, right? That's how most people first try to imagine gravity in Einstein's theory: mass bends spacetime like a ball bending a sheet, and other objects "fall" toward the heavy mass. Simple enough — but here's the catch: this analogy can actually be misleading.

First, think about it: in the rubber sheet, the smaller balls roll toward the heavy one because of gravity — the force pulling them down onto the sheet. But wait a minute — in Einstein's universe, gravity isn't a force at all. The motion of planets, rockets, or astronauts is not caused by a pull; it's caused by the shape of spacetime.

Second, the rubber sheet is two-dimensional, but real spacetime is four-dimensional — three dimensions of space plus one of time. You can't really visualize that with a flat sheet stretched in your room. Objects in real spacetime aren't moving on a surface; they're moving along paths in a four-dimensional geometry. Thinking about a stretched sheet can make you imagine "falling down," but in reality, there is no "down" — there's just following a geodesic in curved spacetime.

Finally, the sheet analogy can trick your intuition. You might think mass "dents" spacetime and pulls objects into the dent. But in General Relativity, there's no dent and no pull. Objects are just moving straight in spacetime, and the curvature makes it look like a curved path from another perspective. The "pull" is only an illusion we experience because we're standing on the Earth and not following a geodesic ourselves, and so we are not an inertial observer. So we can't exactly say that things are accelerating towards a heavier mass, because it's not in your frame of reference. Things in your frame of reference appear stationary, but if it's not, then it appears to accelerate. So it's like this: you are accelerating, while those things are in uniform motion, so they appear to be accelerating. Weird right? Why are we accelerating? I'll come to that question in the next section.

As John Wheeler once put it: "Matter tells spacetime how to curve, and spacetime tells matter how to move."

So, while the rubber sheet is a fun way to introduce the idea, it fails to explain the real beauty of Einstein's theory. The true story isn't about balls rolling into dents because of a force — it's about the geometry of spacetime itself guiding objects naturally along paths. Once you understand that, you start to see why gravity feels so strange: to move without feeling it, you just have to follow a straight path in a curved universe.

## VIII. Acceleration vs Rest

Now let's tackle something that seems super weird at first: standing still on Earth is actually like accelerating. Sounds crazy, right? We usually think of acceleration as speeding up in a car or a rocket, and standing still is like… well, just standing still. But in Einstein's world, things are different.

Think about it this way: an astronaut in a rocket far from any planet, drifting in space, is following a straight-line path in spacetime. Nothing is pushing or pulling on them, and they feel weightless. That's what moving along a geodesic looks like.

Now if the rocket starts accelerating at 9.8 m/s², it will be the rocket that's accelerating into the astronaut, not the other way around. This is what an inertial observer will experience, like the astronaut. Though the astronaut will feel as if he's falling towards the floor of the rocket, in reality, the rocket is accelerating upwards and would hit him.

Now, imagine you're under free fall, which appears as if you're accelerating towards the ground at 9.8 m/s². But if you're under free fall, you will be called an inertial observer, which means you are not accelerating, and anything you see changing its position with respect to you is accelerating. So it would mean that it's actually the ground and things on that which are accelerating towards you, including any person standing still on the surface. In short, if an object appears stationary (with respect to you, as it's in your frame of reference), it's actually accelerating along with you. If an object is in free fall (appears to accelerate towards the surface of the earth), it's actually at rest because in that case it's following a geodesic, and is in an inertial frame of reference.

So, because the ground is pushing up on you, you are technically accelerating upward, even though it feels like you're at rest. The floor is creating a deviation from your natural straight path, and that's exactly why you feel your weight. The reaction force from the ground is what gives you that sense of gravity. So, in General Relativity, standing still on Earth isn't rest — it's a kind of constant upward acceleration.

Now, you might ask: "Wait, if everything on Earth is accelerating upward, shouldn't the whole planet be expanding or flying apart?" That's where the geodesic equation comes in. In curved spacetime, an object only "accelerates" when something prevents it from following a straight path. The Earth itself is made of matter that is already following its own natural geodesics. The geodesic equation shows that all of Earth's parts move in a way consistent with spacetime curvature, so the internal forces between atoms and molecules keep the planet stable. In other words, the Earth isn't expanding because the "acceleration" we feel is relative — it's our body reacting to the floor preventing our free fall, not some universal push on the entire planet. Also, the geodesic equation says that even though you're accelerating, it's possible for you not to change your spatial coordinates. Mathematically, we can describe this using the geodesic equation.

Here's the surprising part: this equation can show a nonzero "acceleration" term even when an object's spatial position (its r, or radius) doesn't actually change. In other words, the math says you're accelerating, but from your perspective, you're just sitting still, following the straightest possible path in space-time.

This flips our normal intuition on its head. On Earth, you think you're not moving, but really, your body is accelerating upward through spacetime at about 9.8 m/s² — the same rate a free-falling object would "naturally" accelerate toward the ground if nothing stopped it. Meanwhile, someone in free fall doesn't feel any force at all, even though their velocity relative to Earth is changing. They are actually an inertial observer, moving along a geodesic perfectly aligned with curved spacetime. So an inertial observer sees you accelerating upwards at 9.8 m/s², and so you are (remember that all laws of physics apply in the inertial frame of reference).

So, the big idea is this: rest and acceleration aren't what we usually think they are. Feeling weight isn't about standing still — it's about being prevented from moving along a straight line in spacetime. Gravity, then, isn't a force; it's the way spacetime guides everything, and the "force" you feel is just the floor (or the rocket) keeping you from following your natural path.

## IX. Why All Objects Fall at the Same Rate

Now let's tackle one of the strangest things you probably learnt in school: all objects fall at the same rate, no matter how heavy or light they are. Drop a feather and a hammer on Earth — okay, air resistance makes the feather slow down, but in a vacuum, they hit at the same time. Why does that happen?

In Newtonian physics, we usually explain it with two equations: the gravitational force equation (F=GMm/R²) and Newton's second law (F=ma). If you solve for acceleration (a=F/m), the mass of the falling object cancels out (a=GM/R²). That's why a heavy ball and a light ball accelerate equally — simple math. But this leaves a deeper mystery: why does the gravitational mass in the equation for gravitational force equal the inertial mass in Newton's second law?

Einstein noticed something amazing: this equality isn't just a coincidence — it hints that gravity isn't a force at all. Think about it: if all objects fall at the same rate regardless of their mass, maybe there isn't really a "pull" happening. Instead, objects are just following the straightest possible paths in curved spacetime. Their acceleration only appears when something stops them from following that natural path, like the floor pushing up when you stand still.

So in General Relativity, the reason all objects fall together isn't because a mysterious force acts equally on them — it's because they are all following geodesics, straight-line paths shaped by the curvature of spacetime. A feather, a hammer, or even a spaceship all move along these paths naturally. The only reason we notice "acceleration" is if something interferes with the geodesic, like the ground or a rocket floor.

This is super counterintuitive. For centuries, we thought heavier objects fell faster because "gravity pulls harder." Then we thought all objects move at the same rate because their acceleration doesn't depend on the object's mass. But Einstein showed us the truth: falling is just free motion in curved spacetime, and all objects obey the same rules. Weight, mass, or size doesn't change the path — spacetime does.

## X. The Proof

Alright, now comes the part that makes Einstein's ideas really stick: proof that gravity is an illusion and spacetime really curves. This is where theory meets observation — and it's kind of amazing.

Einstein predicted something wild: if a massive object like the Sun bends spacetime, then light passing near it should also bend. Remember, light always travels along geodesics — the straightest path in spacetime. But if spacetime is curved, then the "straight path" for light isn't straight in our usual sense; it looks curved to an outside observer. In other words, starlight passing near the Sun should appear slightly shifted from its normal position.

This was tested during the famous 1919 solar eclipse. Normally, the Sun's bright light would make it impossible to see stars near it. But during the eclipse, the Sun was blocked, and astronomers could see stars very close to its edge. They measured the positions of these stars and compared them to where they should be if space were flat. Lo and behold, the stars appeared shifted exactly as Einstein predicted. Light had curved around the Sun because spacetime itself was curved!

This observation was groundbreaking. It wasn't just a tiny experiment — it was proof that Newton's idea of gravity as a force pulling objects was incomplete. Instead, spacetime guides everything, and the "force" of gravity is really just a reaction we feel when something prevents us from following a natural path.

Later experiments confirmed this again and again: orbiting satellites, the bending of light by distant galaxies, and even the way GPS satellites need relativistic corrections to work properly. Every time, the results matched Einstein's predictions, proving that general relativity isn't just math — it's how the universe actually works.

So next time someone asks why astronauts float, or why planets move the way they do, you can say confidently: gravity isn't pulling them. They're just following the natural straight paths in a curved universe, exactly as Einstein predicted — and the proof is all around us, from starlight to satellites.

## XI. Conclusion

So, after all this, what can we really say about gravity? Well, it turns out that everything we thought we knew about gravity as a force is actually just an illusion. What we feel as weight, what we see as objects falling, even the orbit of planets — it's all spacetime doing its thing. Massive objects curve the universe around them, and everything naturally follows the paths dictated by that curvature.

Standing on Earth, we feel a push from the ground, and we call it gravity. Astronauts floating in orbit feel weightless, yet Earth's mass is still shaping their path through spacetime. A rocket accelerating in deep space creates the same sensation we feel as weight on the planet's surface. It's all about frames of reference, geodesics, and curved spacetime — the invisible stage where the universe plays its grandest performance.

Einstein's genius was in realizing that free fall is actually like being at rest, and what we experience as gravity is really just the universe guiding us along these natural paths. It's counterintuitive, mind-bending, and totally amazing. Suddenly, the universe isn't a bunch of invisible forces tugging on objects — it's a beautifully shaped stage where objects move along the paths spacetime gives them.

In the end, this changes the way we think about the universe. Gravity isn't something that acts on us; it's a property of the way spacetime interacts with matter. Every time you jump, every time a satellite orbits, every time light bends around a star, you're seeing Einstein's universe in action. And if that doesn't make you look at the world — and the cosmos — a little differently, I don't know what will.

So next time someone says "gravity pulls us down," you can smile and think: nope, we're just following the natural curves of spacetime — and that, my friends, is the real magic of Einstein's universe.

## XII. Bibliography

- [General Relativity — Wikipedia](https://en.wikipedia.org/wiki/General_relativity): Overview of Einstein's theory, spacetime curvature, and how gravity emerges from geometry.
- [Equivalence Principle — Wikipedia](https://en.wikipedia.org/wiki/Equivalence_principle): Explains why gravitational mass equals inertial mass, and how floating in deep space is the same as accelerated motion.
- [Geodesics in General Relativity — Wikipedia](https://en.wikipedia.org/wiki/Geodesics_in_general_relativity): How objects move on the straightest paths possible in curved spacetime.
- [Geodesic — Wikipedia](https://en.wikipedia.org/wiki/Geodesic): Mathematical and physical meaning of geodesics, beyond just relativity.
- [Mathematics of General Relativity — Wikipedia](https://en.wikipedia.org/wiki/Mathematics_of_general_relativity): More formal and detailed treatment of the equations used in GR.
- [General Relativity! Einstein's Equivalence Principle — YouTube](https://www.youtube.com/watch?v=zVIS_01GttQ): Visual introduction to the equivalence principle and its meaning.
- [What everyone gets wrong about gravity — Veritasium (YouTube)](https://www.youtube.com/watch?v=XRr1kaXKBsU): Best available explanation on this topic on YouTube so far.

*Authored by: Sarvesh Kore*`,
  },
  {
    slug: 'is-our-universe-a-hologram',
    title: 'Is Our Universe A Hologram?',
    author: 'CoM Members',
    category: 'Space & Cosmology',
    coverImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80',
    date: 'Nov 13, 2025',
    readTime: '5 min read',
    excerpt: 'A concise exploration of how modern physics hints that the universe might be encoded on a cosmic 2D surface.',
    content: `The holographic principle suggests the universe could be encoded like a hologram — a 3D reality from 2D information.

This article is coming soon. Stay tuned for the full deep dive into the holographic principle and what it means for our understanding of reality.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-law-that-builds-the-universe-entropy',
    title: 'The Law That Builds The Universe: Entropy',
    author: 'CoM Members',
    category: 'Matter & Molecules',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    date: 'Nov 23, 2025',
    readTime: '17 min read',
    excerpt: "An exploration of how a single physical principle drives the Universe's evolution, shaping time, complexity, and every process that unfolds around us.",
    content: `Discussing how entropy and early structure formation define time's arrow and the universe's evolution.

This article is coming soon. Stay tuned for the full exploration of entropy and its role in building the universe.

*Authored by: CoM Members*`,
  },
  {
    slug: 'is-our-universe-really-an-isolated-system',
    title: 'Is Our Universe Really An Isolated System?',
    author: 'CoM Members',
    category: 'Space & Cosmology',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
    date: 'Dec 29, 2025',
    readTime: '8 min read',
    excerpt: 'Is the universe truly isolated, or does the breakdown of global energy conservation challenge this assumption?',
    content: `Explores whether treating the cosmos as an isolated system holds when energy conservation isn't global.

This article is coming soon. Stay tuned for the full exploration of whether our universe is truly an isolated system.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-secret-code-of-plants-fibonacci-in-nature',
    title: 'The Secret Code of Plants: Fibonacci in Nature',
    author: 'CoM Members',
    category: 'Life & Nature',
    coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    date: 'Jan 10, 2026',
    readTime: '6 min read',
    excerpt: 'How spirals, leaf arrangements, and sunflower seeds reveal deep mathematical codes embedded in life.',
    content: `## The Secret Code of Plants: Fibonacci in Nature

Have you ever looked closely at a sunflower or a pinecone? If you count the spirals winding in clockwise and counterclockwise directions, you will almost always find consecutive numbers from the famous Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...).

This is not a coincidence; it is an optimized pattern of growth designed by evolution to maximize space and exposure to sunlight.

This article is coming soon. Stay tuned for a deep scientific exploration of phyllotaxis and the mathematical beauty of the natural world.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-infinities-beyond-infinity',
    title: 'The Infinities Beyond Infinity',
    author: 'CoM Members',
    category: 'Mathematics',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    date: 'Jan 22, 2026',
    readTime: '9 min read',
    excerpt: "An intuitive journey into Cantor's set theory, showing how some infinities are literally larger than others.",
    content: `## The Infinities Beyond Infinity

In school, we are taught that infinity is a single concept — a destination we can never reach. However, in the late 19th century, mathematician Georg Cantor shocked the academic world by proving that there are different "sizes" of infinity.

The infinity of real numbers (decimals) is strictly larger than the infinity of natural numbers (counting numbers).

This article is coming soon. Stay tuned for an elegant journey through Cantor's diagonal argument and the mind-bending world of transfinite math.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-limits-of-human-perception',
    title: 'The Limits of Human Perception',
    author: 'CoM Members',
    category: 'Philosophy',
    coverImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
    date: 'Feb 05, 2026',
    readTime: '7 min read',
    excerpt: 'Do we see reality as it truly is, or is our brain merely decoding a simplified user interface?',
    content: `## The Limits of Human Perception

We trust our eyes, our ears, and our touch to tell us what is real. But cognitive science and philosophy suggest our sensory experience is heavily filtered.

Our brains do not construct an objective 3D model of the universe; instead, they render a highly simplified, evolutionarily beneficial "desktop interface" of reality.

This article is coming soon. Stay tuned for a philosophical and cognitive examination of how we perceive the universe, and what lies beyond our senses.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-evolution-of-global-networks',
    title: 'The Evolution of Global Networks',
    author: 'CoM Members',
    category: 'Humanity & Society',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    date: 'Feb 18, 2026',
    readTime: '8 min read',
    excerpt: 'How hyper-connectivity shapes collective consciousness, empathy, and modern social structures.',
    content: `## The Evolution of Global Networks

For the first time in human history, billions of brains are wired together in a near-instantaneous global feedback loop. This network is not just a tool; it is a brand-new medium for human evolution, culture, and collective intelligence.

This article is coming soon. Stay tuned for a sociological and historical analysis of how digital networks are restructuring our communities, our relationships, and our minds.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-geometry-of-harmony-in-music',
    title: 'The Geometry of Harmony in Music',
    author: 'CoM Members',
    category: 'Arts & Expression',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
    date: 'Mar 02, 2026',
    readTime: '8 min read',
    excerpt: 'Exploring the mathematical symmetries and geometrical relationships behind musical chords and artistic masterpieces.',
    content: `## The Geometry of Harmony in Music

Music feels like pure emotion, but beneath the surface lies a rigid mathematical skeleton. From the Pythagorean tuning systems to the modern circle of fifths, the relationship between musical notes can be represented as high-dimensional geometric shapes.

This article is coming soon. Stay tuned for a captivating crossover of physics, mathematics, and musical composition, showing how geometry creates harmony.

*Authored by: CoM Members*`,
  }
];

// ============================================================================
// ScrollReveal
// ============================================================================
export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      } ${className}`}
      style={{ transitionDuration: "0.8s" }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// AmbientBackground
// ============================================================================
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let stars: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    let mathSymbols: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      size: number;
      alpha: number;
      angle: number;
      rotSpeed: number;
    }> = [];
    let mouse = { x: -1000, y: -1000 };

    const initStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = Math.max(Math.min(Math.floor((w * h) / 14000), 100), 30);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: 0,
        baseY: 0,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
      }));
      stars.forEach((s) => {
        s.baseX = s.x;
        s.baseY = s.y;
      });
    };

    const initMathSymbols = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const symbolPool = ['∑', '∫', 'π', '∞', 'φ', 'Δ', 'Ω', 'λ', 'ψ', 'θ', 'e=mc²', 'i²=-1', '∇', '𝜒', 'Ψ', 'Φ', 'ħ', '𝛿', '𝜕'];
      // Limit count on mobile vs desktop
      const count = Math.max(Math.min(Math.floor((w * h) / 50000), 15), 5);
      mathSymbols = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        text: symbolPool[Math.floor(Math.random() * symbolPool.length)],
        size: Math.random() * 10 + 11, // 11px to 21px
        alpha: Math.random() * 0.10 + 0.04, // extremely subtle (4% to 14% base opacity)
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initMathSymbols();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const connectionDistance = 120;
      const repulsionRadius = 110;
      const mouseInfluenceRadius = 200;

      // Draw math symbols first (background-most layer)
      for (let i = 0; i < mathSymbols.length; i++) {
        const sym = mathSymbols[i];

        // Drift slowly
        sym.x += sym.vx;
        sym.y += sym.vy;
        sym.angle += sym.rotSpeed;

        // Bounce/Wrap borders
        if (sym.x < -50) sym.x = w + 50;
        if (sym.x > w + 50) sym.x = -50;
        if (sym.y < -50) sym.y = h + 50;
        if (sym.y > h + 50) sym.y = -50;

        // Mouse repulsion on symbols
        const dx = sym.x - mouse.x;
        const dy = sym.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let currentAlpha = sym.alpha;
        let currentSize = sym.size;

        if (dist < mouseInfluenceRadius && dist > 0) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          const angle = Math.atan2(dy, dx);
          sym.x += Math.cos(angle) * force * 1.2;
          sym.y += Math.sin(angle) * force * 1.2;
          currentAlpha = Math.min(sym.alpha + force * 0.15, 0.35);
          currentSize = sym.size + force * 3;
        }

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.angle);
        ctx.font = `300 ${currentSize}px "JetBrains Mono", ui-monospace, Georgia, serif`;
        ctx.fillStyle = `rgba(34, 211, 238, ${currentAlpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sym.text, 0, 0);
        ctx.restore();
      }

      // Draw and connect stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionRadius && dist > 0) {
          const force = (repulsionRadius - dist) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          star.vx += Math.cos(angle) * force * 0.6;
          star.vy += Math.sin(angle) * force * 0.6;
        }

        star.vx += (star.baseX - star.x) * 0.007;
        star.vy += (star.baseY - star.y) * 0.007;
        star.vx *= 0.90;
        star.vy *= 0.90;
        star.x += star.vx;
        star.y += star.vy;
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const midX = (stars[i].x + stars[j].x) / 2;
            const midY = (stars[i].y + stars[j].y) / 2;
            const mouseDist = Math.sqrt(
              (midX - mouse.x) * (midX - mouse.x) +
              (midY - mouse.y) * (midY - mouse.y)
            );
            const mouseInf = Math.max(0, 1 - mouseDist / mouseInfluenceRadius);

            const baseOpacity = (1 - dist / connectionDistance) * 0.07;
            const opacity = Math.min(baseOpacity + mouseInf * 0.40, 0.55);

            ctx.strokeStyle = "rgba(34, 211, 238, " + opacity + ")";
            ctx.lineWidth = 0.4 + mouseInf * 0.4;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const mouseDist = Math.sqrt(
          (star.x - mouse.x) * (star.x - mouse.x) +
          (star.y - mouse.y) * (star.y - mouse.y)
        );
        const mouseInf = Math.max(0, 1 - mouseDist / mouseInfluenceRadius);
        const brightness = 0.20 + mouseInf * 0.80;
        const size = star.size + mouseInf * 1.3;

        if (mouseInf > 0.05) {
          ctx.fillStyle = "rgba(34, 211, 238, " + (mouseInf * 0.12) + ")";
          ctx.beginPath();
          ctx.arc(star.x, star.y, size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(255, 255, 255, " + brightness + ")";
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#060B18] via-[#080D1C] to-[#040810]" />
      <div className="fixed top-[8%] left-[12%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-cyan-500/5 blur-[130px] animate-float pointer-events-none z-0" />
      <div className="fixed bottom-[12%] right-[8%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-violet-500/5 blur-[110px] animate-float pointer-events-none z-0" style={{ animationDelay: "-3s" }} />
      <div className="fixed top-[45%] left-[45%] w-[300px] h-[300px] rounded-full bg-indigo-500/4 blur-[100px] animate-float pointer-events-none z-0" style={{ animationDelay: "-1.5s" }} />
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />
      <div className="fixed inset-0 z-[2] pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
    </>
  );
}

// ============================================================================
// LogoIcon
// ============================================================================
export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-bronze/40" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" className="text-bronze/30" />
      <path d="M50 22L74 40V68L50 82L26 68V40L50 22Z" stroke="currentColor" strokeWidth="2.2" className="text-bronze" />
      <path d="M50 32L66 44V60L50 70L34 60V44L50 32Z" stroke="currentColor" strokeWidth="1" className="text-bronze-light/50" />
      <circle cx="50" cy="50" r="4" fill="currentColor" className="text-bronze-light" />
    </svg>
  );
}

// ============================================================================
// Navbar
// ============================================================================
const navLinks = [
  { label: "About", to: "/#about" },
  { label: "Questions", to: "/#questions" },
  { label: "Library", to: "/library" },
  { label: "Join CoM", to: "/#join", cta: true },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("/#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        const id = to.replace("/#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", to);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled || open
          ? "bg-obsidian/90 backdrop-blur-xl border-bronze-border"
          : "bg-obsidian/0 border-bronze-border/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/c98e0fd61_The_Collegium_of_Minds_Logo.jpeg"
              alt="Collegium of Minds"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-1 ring-bronze-border group-hover:ring-bronze transition-all" />
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-semibold text-silver tracking-wide">
              Collegium of Minds
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.cta ? (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => handleLinkClick(e, l.to)}
                  className="font-heading text-xs font-semibold tracking-widest uppercase px-5 py-2.5 border border-bronze-border text-bronze rounded hover:bg-bronze-dim transition-all"
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => handleLinkClick(e, l.to)}
                  className="text-silver-muted text-sm font-light tracking-wide hover:text-bronze transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-bronze after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform"
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          className="md:hidden p-2 text-silver-muted hover:text-bronze transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#060B18]/95 backdrop-blur-xl border-b border-bronze-border">
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={(e) => {
                    handleLinkClick(e, l.to);
                    setOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    l.cta
                      ? "font-heading text-xs font-semibold tracking-widest uppercase text-bronze border border-bronze-border text-center hover:bg-bronze-dim"
                      : "text-silver-muted text-sm font-light hover:text-bronze hover:bg-bronze-dim/30"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ============================================================================
// HeroSection
// ============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-20 sm:pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/5f23d660a_generated_image.png"
          alt="Cosmic black hole"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/20 to-obsidian" />
      </div>

      <div className="absolute top-1/4 left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-bronze/5 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-bronze/3 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-5 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
          <span className="font-body text-xs font-medium tracking-widest uppercase text-bronze">
            Est. 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading font-bold leading-none mb-6"
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-silver tracking-tight">
            The Collegium
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4 font-light italic text-bronze tracking-wide">
            of Minds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-silver text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-6 opacity-90"
        >
          A community for curious thinkers and lifelong learners.
          Explore ideas, discuss fundamental questions, and collaborate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/library"
            className="group inline-flex items-center justify-center gap-2 bg-bronze/10 border border-bronze text-bronze px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 hover:shadow-lg hover:shadow-bronze/10 transition-all hover:-translate-y-0.5"
          >
            Explore Ideas
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="#join"
            className="inline-flex items-center justify-center gap-2 border border-silver-dim text-silver-muted px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:border-bronze-border hover:text-silver transition-all"
          >
            Join the Collective
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2 mt-6"
        >
          <span className="text-silver-dim text-[10px] tracking-[3px] uppercase font-light">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-bronze to-transparent animate-pulse-bronze" />
          <ChevronDown size={14} className="text-bronze/40 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// StatsStrip
// ============================================================================
const stats = [
  { value: "9+", label: "Months Active" },
  { value: "46+", label: "Members" },
  { value: "10", label: "Societies" },
  { value: "∞", label: "Ideas on the Table" },
];

function StatCell({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  return (
    <div className="text-center py-4 sm:py-6 px-4 border-b sm:border-b-0 sm:border-r border-bronze-border/30 last:border-0">
      <span
        className={`font-heading text-3xl sm:text-4xl font-bold text-bronze block mb-2 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {value}
      </span>
      <span className="text-silver-dim text-[10px] sm:text-xs tracking-[2px] uppercase font-light">
        {label}
      </span>
    </div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 border-y border-bronze-border/30 backdrop-blur-md bg-obsidian/20"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4">
        {stats.map((s, i) => (
          <StatCell key={i} {...s} inView={inView} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SectionDivider
// ============================================================================
function SectionDivider() {
  return (
    <div className="relative z-10 w-[60%] max-w-lg mx-auto h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />
  );
}

// ============================================================================
// VisionSection
// ============================================================================
function VisionSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
          <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
            The Vision
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-6 leading-tight">
          Think. Explore. Discover.
        </h2>

        <p className="text-silver-muted text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
          The Collegium of Minds welcomes individuals passionate about exploring
          science, mathematics, philosophy, literature, history, technology,
          arts, and beyond. Here, ideas are shared, questions are celebrated,
          and minds come together to discover, discuss, and innovate.
        </p>

        <a
          href="#about"
          className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5"
        >
          More About Us
        </a>
      </ScrollReveal>
    </section>
  );
}

// ============================================================================
// AboutSection
// ============================================================================
const societies = [
  { 
    icon: "🚀", 
    name: "Physics", 
    questions: [
      "Is spacetime an emergent property of quantum entanglement?",
      "Can we bridge General Relativity and Quantum Mechanics via string theory?",
      "Is time an objective reality or a thermodynamic illusion?"
    ], 
    members: 42 
  },
  { 
    icon: "🧪", 
    name: "Chemistry", 
    questions: [
      "Can self-assembling molecular structures lead to synthetic biological life?",
      "How can room-temperature superconductors redefine energy transmission?",
      "What are the limits of chemical catalysis in non-aqueous environments?"
    ], 
    members: 28 
  },
  { 
    icon: "🧬", 
    name: "Biology", 
    questions: [
      "Is the genetic code of life optimal, or is there a superior biochemical alternative?",
      "How close are we to reversing cellular senescence and biological aging?",
      "Could alien life utilize non-DNA information carriers?"
    ], 
    members: 35 
  },
  { 
    icon: "➗", 
    name: "Mathematics", 
    questions: [
      "Are prime numbers distributed randomly, or is there an underlying mathematical architecture?",
      "Is mathematical truth discovered or invented?",
      "What are the computational limits of Gödel's Incompleleness Theorems?"
    ], 
    members: 31 
  },
  { 
    icon: "🤔", 
    name: "Philosophy", 
    questions: [
      "Is consciousness computable or is it a non-algorithmic phenomenon?",
      "Does objective morality exist without an external anchor?",
      "What constitutes personal identity across time?"
    ], 
    members: 48 
  },
  { 
    icon: "💻", 
    name: "Technology", 
    questions: [
      "How will artificial general intelligence impact human intellectual monopoly?",
      "Are neural symbolic architectures the future of logical AI?",
      "Can fully decentralized consensus mechanisms solve global coordination?"
    ], 
    members: 56 
  },
  { 
    icon: "🌌", 
    name: "Cosmology", 
    questions: [
      "Is our universe a hologram projected from a transfinite boundary?",
      "What existed before the Big Bang in a cyclic cosmological model?",
      "Are we trapped in an isolated multiverse pocket?"
    ], 
    members: 39 
  },
  { 
    icon: "🏛️", 
    name: "Social Sciences", 
    questions: [
      "How do algorithmic feedback loops shape modern societal evolution?",
      "What are the historical tipping points of collapsing civilizations?",
      "Can decentralized autonomous structures replace modern governance?"
    ], 
    members: 24 
  },
  { 
    icon: "🎨", 
    name: "Arts & Literature", 
    questions: [
      "How does creative expression transfer high-dimensional emotional states?",
      "Is narrative structure hardcoded into human cognitive biology?",
      "Where is the boundary between synthetic art and genuine human sentiment?"
    ], 
    members: 29 
  },
];

function AboutSection() {
  const [selectedSociety, setSelectedSociety] = useState<typeof societies[0] | null>(null);

  return (
    <section id="about" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                About
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-8 leading-tight">
              Curiosity over<br />conformity.
            </h2>

            <div className="space-y-6 text-silver-muted text-sm sm:text-base font-light leading-relaxed max-w-xl">
              <p>
                The Collegium of Minds is not just a club—it is an open intellectual
                space for anyone driven by curiosity rather than conformity. It exists
                for those who believe that learning is a lifelong process, and that the
                most meaningful questions often have no immediate or final answers.
              </p>
              <p>
                CoM functions as a decentralized laboratory of ideas. It brings together
                individuals from different backgrounds, disciplines, and stages of life
                to explore thought without rigid boundaries. Here, science meets philosophy,
                technology intersects with society, and abstract theories are examined for
                their real-world relevance.
              </p>
              <p>
                From discussions on physics, space, and artificial intelligence to
                reflections on history, ethics, and human progress, CoM encourages depth
                over speed and understanding over memorization.
              </p>
            </div>

            <a
              href="#join"
              className="mt-10 inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5 group"
            >
              Get Involved
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={150}>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Our Societies
              </span>
            </div>

            <p className="font-heading text-lg sm:text-xl text-silver mb-6 italic">
              Explore our societies and find the one that matches your{" "}
              <span className="text-bronze font-semibold">interests</span>.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {societies.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSociety(s)}
                  className="group flex items-center gap-3 bg-obsidian-surface/60 border border-bronze-border/15 rounded-xl p-3.5 hover:bg-bronze-dim/20 hover:border-bronze/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left w-full focus:outline-none"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-heading text-sm font-semibold tracking-wide text-silver">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={200} className="mt-12">
        <div className="rounded-2xl overflow-hidden border border-bronze-border/20">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/ee4c7f57a_generated_image.png"
            alt="Scientific study environment with cosmic light"
            className="w-full h-48 sm:h-64 object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
          />
        </div>
      </ScrollReveal>

      {/* Society Details Modal */}
      {selectedSociety && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-obsidian border border-bronze-border/20 max-w-md w-full rounded-2xl overflow-hidden relative shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedSociety(null)}
              className="absolute top-4 right-4 text-silver-dim hover:text-silver text-xs font-mono uppercase bg-obsidian-surface px-2.5 py-1 rounded border border-bronze-border/10 cursor-pointer"
            >
              Close
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{selectedSociety.icon}</span>
              <h3 className="font-heading text-xl font-bold text-silver">
                {selectedSociety.name} Society
              </h3>
            </div>
            <div className="mb-6 space-y-3">
              <h4 className="text-[10px] font-heading font-semibold tracking-wider text-bronze uppercase">
                Questions We Discuss
              </h4>
              <ul className="space-y-3">
                {selectedSociety.questions.map((q, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-silver-muted font-light leading-relaxed">
                    <span className="text-bronze font-bold mt-0.5">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-bronze-border/10 flex items-center justify-between">
              <span className="text-[10px] font-heading font-semibold tracking-wider text-silver-dim uppercase">
                Society Size
              </span>
              <span className="font-heading text-sm font-bold text-silver">
                <span className="text-bronze font-mono mr-1">{selectedSociety.members}</span> Inquirers
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// QuestionsSection
// ============================================================================
const questions = [
  "Is consciousness computable, or does it require something beyond matter?",
  "What actually happens inside a black hole, and can we ever know?",
  "Can civilization survive the arrival of artificial superintelligence?",
  "Is mathematics discovered, or invented by the human mind?",
  "What is intelligence — and does our definition of it even make sense?",
  "Could spacetime itself emerge from information? What would that mean?",
];

const weeklyQuestions = [
  {
    id: "q_light",
    question: "If the speed of light is constant for all observers — what actually changes?",
    options: [
      "Time dilates (time slows down dynamically)",
      "Space contracts (lengths shrink physically)",
      "Both space and time warp in relational unison",
      "Our classical notion of simultaneity is shattered"
    ]
  },
  {
    id: "q_freewill",
    question: "Does free will exist, or is every decision predetermined by prior causes?",
    options: [
      "Determinism: Free will is a complete psychological illusion",
      "Compatibilism: Actions are predetermined but still qualify as free",
      "Libertarianism: The mind is genuinely undetermined and creative",
      "Quantum Symmetries: Fundamental indeterminacy allows true choice"
    ]
  }
];

function QuestionsSection() {
  const { toast } = useToast();
  const [pollIndex, setPollIndex] = useState(0);
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  const activePoll = weeklyQuestions[pollIndex];

  // Load poll for current week + user's vote + real vote counts
  useEffect(() => {
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyQuestions.length;
    setPollIndex(weekIndex);

    const pollId = weeklyQuestions[weekIndex].id;
    const numOptions = weeklyQuestions[weekIndex].options.length;

    // Check if user already voted this week
    const savedVote = localStorage.getItem(`com_poll_voted_${pollId}`);
    setVotedOption(savedVote ? parseInt(savedVote, 10) : null);

    // Fetch real votes from Firebase
    getPollVotes(pollId, numOptions).then((fetchedVotes) => {
      setVotes(fetchedVotes);
    });
  }, [pollIndex]);

  const handleVote = async (optionIdx: number) => {
    if (votedOption !== null) return;

    const pollId = activePoll.id;

    try {
      await submitVote(pollId, optionIdx);

      // Update local state
      const newVotes = [...votes];
      newVotes[optionIdx] = (newVotes[optionIdx] || 0) + 1;
      setVotes(newVotes);
      setVotedOption(optionIdx);

      // Save to localStorage so user can't vote again this week
      localStorage.setItem(`com_poll_voted_${pollId}`, optionIdx.toString());

      toast({
        title: "Vote Recorded",
        description: "Your perspective has been added to the collective record.",
      });
    } catch (err) {
      toast({
        title: "Vote Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleRetractVote = async () => {
    if (votedOption === null) return;

    const pollId = activePoll.id;
    const currentOption = votedOption;

    try {
      await retractVote(pollId, currentOption);

      // Update local state
      const newVotes = [...votes];
      if (newVotes[currentOption] > 0) {
        newVotes[currentOption] -= 1;
      }
      setVotes(newVotes);
      setVotedOption(null);

      // Remove from localStorage
      localStorage.removeItem(`com_poll_voted_${pollId}`);

      toast({
        title: "Vote Retracted",
        description: "Your vote has been removed. You can now select another option.",
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
    <section id="questions" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="text-center mb-14">
        <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
          <HelpCircle className="w-3.5 h-3.5 text-bronze animate-pulse" />
          <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
            Questions We Ask
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight leading-tight">
          This is what drives us.
        </h2>
        <p className="text-silver-muted text-sm sm:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
          The ultimate frontiers of science and philosophy cannot be conquered; they are playgrounds to be explored.
        </p>
      </ScrollReveal>

      <ScrollReveal className="mb-14 flex justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-bronze-border/30 shadow-lg shadow-bronze/5">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/cf60e2ea0_generated_image.png"
            alt="Silhouette gazing at blue planet in cosmic sky"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </ScrollReveal>

      {/* Grid of Standard Philosophical Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {questions.map((q, i) => (
          <ScrollReveal key={i} delay={i * 65}>
            <div className="group relative bg-obsidian-surface/50 border border-bronze-border/10 rounded-2xl p-7 sm:p-8 hover:bg-bronze-dim/10 hover:border-bronze/25 transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <span className="absolute top-4 left-6 font-heading text-4xl text-bronze/10 leading-none select-none">
                "
              </span>
              <p className="text-silver-muted text-sm font-light italic leading-relaxed pt-4 group-hover:text-silver transition-colors">
                {q}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* REAL VOTING POLL */}
      <ScrollReveal delay={100} className="mb-8 w-full">
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
                        : "bg-obsidian-surface/60 border-bronze-border/10 text-silver hover:border-bronze/40 hover:bg-bronze-dim/10 hover:translate-x-1"
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
                  Remove my vote & change option
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
    </section>
  );
}

// ============================================================================
// DiscussionsSection (Discord & Forum teaser)
// ============================================================================
/*
const recentDiscussions = [
  {
    channel: "#quantum-metaphysics",
    title: "Is Spacetime an Emergent Hologram?",
    lastActive: "4m ago",
    activeUser: "sarvesh_kore",
    replies: 58,
    votes: 42
  },
  {
    channel: "#philosophy-of-mind",
    title: "The Hard Problem: Inside the Computable Brain",
    lastActive: "12m ago",
    activeUser: "joel_mendonca",
    replies: 34,
    votes: 27
  },
  {
    channel: "#cosmology-debate",
    title: "Breakdowns in Energy Conservation in Expanding Spacetime",
    lastActive: "1h ago",
    activeUser: "entropy_pioneer",
    replies: 17,
    votes: 11
  },
  {
    channel: "#mathematical-art",
    title: "Fibonacci Spirals: Code Symmetries in Plant Growth",
    lastActive: "3h ago",
    activeUser: "nature_coder",
    replies: 45,
    votes: 31
  }
];

function DiscussionsSection() {
  const { toast } = useToast();

  const handleJoinSocial = (platform: string) => {
    toast({
      title: "Opening Invite Link",
      description: `Connecting you to our active ${platform} community portal.`
    });
  };

  return (
    <section className="relative z-10 py-20 bg-obsidian-surface/20 border-y border-bronze-border/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-bronze" />
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Connect & Discuss
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver tracking-tight leading-tight mb-4">
              Step inside our digital salon.
            </h2>
            <p className="text-silver-muted text-sm sm:text-base font-light leading-relaxed mb-8">
              True learning is dialogic. Our Discord servers and forum boards host continuous, high-fidelity debates on quantum physics, transfinite set theory, creative systems, and history. Connect with thousands of minds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleJoinSocial("Discord")}
                className="group inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#5865F2]/90 text-white px-6 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded shadow-lg shadow-[#5865F2]/20 transition-all hover:-translate-y-0.5"
              >
                Join CoM Discord
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => handleJoinSocial("Forum Board")}
                className="inline-flex items-center justify-center gap-2 border border-bronze text-bronze bg-bronze-dim px-6 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
              >
                Enter Bulletin Forum
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Forum Feed
            </h3>

            <div className="space-y-3">
              {recentDiscussions.map((disc, idx) => (
                <div 
                  key={idx}
                  className="glowing-card flex items-center justify-between p-4 bg-obsidian-surface/60 border border-bronze-border/10 rounded-xl"
                >
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <span className="text-[10px] font-mono text-bronze font-medium">{disc.channel}</span>
                    <h4 className="text-sm font-semibold text-silver truncate">{disc.title}</h4>
                    <p className="text-[10px] text-silver-dim/60">
                      Active {disc.lastActive} • by <span className="text-silver-muted font-mono">{disc.activeUser}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-silver-dim">
                    <div className="flex flex-col items-center">
                      <span className="text-silver font-semibold">{disc.replies}</span>
                      <span className="text-[8px] uppercase tracking-wider">replies</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-bronze-border/10 pl-4">
                      <span className="text-bronze font-semibold">{disc.votes}</span>
                      <span className="text-[8px] uppercase tracking-wider">upvotes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
*/
// ============================================================================
// LibrarySection (Featured Article Carousel & Live Counters)
// ============================================================================
function LibrarySection() {
  const { toast } = useToast();
  const carouselArticles = articles.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewsCount, setViewsCount] = useState(1482);

  // Increment and sync page views on mount
  useEffect(() => {
    incrementPageViews().then(() => {
      getPageViews().then(views => {
        if (views > 0) {
          setViewsCount(views);
        }
      });
    });
  }, []);

  // Auto-play controls
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselArticles.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, carouselArticles.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carouselArticles.length) % carouselArticles.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carouselArticles.length);
  };

  const activeArticle = carouselArticles[currentIndex];
  const colors = categoryColors[activeArticle.category] || categoryColors["The Physical World"];

  return (
    <section id="library" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-bronze-border/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
              <Award className="w-3.5 h-3.5 text-bronze animate-pulse" />
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                The Library & Media
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight leading-tight">
              What we're thinking.
            </h2>
          </div>
          <p className="text-silver-muted text-sm font-light max-w-xs leading-relaxed sm:text-right">
            Ideas and articles from our members — join us to share yours as well.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mb-10">
        <div className="rounded-2xl overflow-hidden border border-bronze-border/20 h-40 sm:h-52">
          <img
            src="https://media.base44.com/images/public/6a3a77e56b8f0a8608401d16/1fb8d0abe_generated_image.png"
            alt="Floating books and scrolls in blue cosmic space"
            className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-700"
          />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Featured Article Carousel Slider */}
        <ScrollReveal className="lg:col-span-8 bg-obsidian-surface/40 border border-bronze-border/15 rounded-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-md">
          {/* Subtle colored background halo based on current article */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-bronze/5 blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-heading font-semibold tracking-[3.5px] uppercase text-silver-dim flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-ping" />
              Featured Curator Pick
            </span>

            {/* Play/Pause control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze transition-colors"
              title={isPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>

          {/* Carousel Slide Container */}
          <div className="min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div>
                  {activeArticle.coverImage && (
                    <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-xl mb-6 border border-bronze-border/10">
                      <img 
                        src={activeArticle.coverImage} 
                        alt={activeArticle.title}
                        className="w-full h-full object-cover opacity-70"
                        referrerPolicy="no-referrer"
                      />
                      {/* elegant bottom fade mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-100" />
                    </div>
                  )}
                  <span className={`inline-block text-[9px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.text} ${colors.bg} ${colors.border} mb-4`}>
                    {activeArticle.category}
                  </span>
                  <Link to={`/library/${activeArticle.slug}`} className="group block">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-silver tracking-tight leading-tight group-hover:text-bronze transition-colors mb-3">
                      {activeArticle.title}
                    </h3>
                  </Link>
                  <p className="text-silver-muted text-sm font-light leading-relaxed max-w-2xl mb-6">
                    {activeArticle.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between border-t border-bronze-border/10 pt-4 gap-4 mt-auto">
                  <div className="flex items-center gap-4 text-xs text-silver-dim">
                    <span className="font-medium text-silver-muted">{activeArticle.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {activeArticle.readTime}
                    </span>
                  </div>

                  <Link
                    to={`/library/${activeArticle.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold tracking-widest uppercase text-bronze hover:text-bronze-light transition-colors"
                  >
                    Read Full Essay <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots & Manual buttons */}
          <div className="flex items-center justify-between mt-10 pt-4 border-t border-bronze-border/5">
            <div className="flex items-center gap-1.5">
              {carouselArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-6 bg-bronze" : "w-1.5 bg-silver-dim/30 hover:bg-bronze/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze hover:border-bronze/40 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-light/20 text-silver-dim hover:text-bronze hover:border-bronze/40 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Social Proof, Magazine & Founding Members */}
        <ScrollReveal className="lg:col-span-4 space-y-6">
          {/* Stats Bar */}
          <div className="border border-bronze-border/15 bg-obsidian-surface/40 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase mb-4">
              Curiosity Stats
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="flex flex-col gap-0.5 border-r border-bronze-border/10 pr-2">
                <span className="font-heading text-lg font-bold text-silver">{viewsCount.toLocaleString()}</span>
                <span className="text-[9px] text-silver-dim tracking-wider uppercase">Inquirers</span>
              </div>
              <div className="flex flex-col gap-0.5 pl-2">
                <span className="font-heading text-lg font-bold text-silver">{articles.length}</span>
                <span className="text-[9px] text-silver-dim tracking-wider uppercase">Articles</span>
              </div>
            </div>
          </div>

          {/* Share thoughts / Join card */}
          <div className="glowing-card border border-bronze border-bronze-border/20 bg-gradient-to-br from-bronze-dim/35 to-transparent p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-3 -right-3 p-4 bg-bronze/10 rounded-full border border-bronze/20">
              <MessageSquare className="w-5 h-5 text-bronze animate-pulse" />
            </div>
            <h3 className="font-heading text-sm font-bold text-silver tracking-wide mb-2 flex items-center gap-1.5">
              Share Your Perspective
            </h3>
            <p className="text-silver-muted text-xs font-light leading-relaxed mb-4">
              Have a speculative scientific theory, mathematical breakthrough, or philosophy question? Join our collective discussion, publish your thoughts, and review other inquiries.
            </p>
            <a
              href="#join"
              className="w-full inline-flex items-center justify-center gap-2 bg-bronze/10 border border-bronze text-bronze px-4 py-2 text-[10px] font-heading font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
            >
              Join the Collegium
            </a>
          </div>

          {/* CoM Notebook Teaser card */}
          <div className="border border-bronze-border/10 bg-obsidian-surface/20 p-6 rounded-2xl relative">
            <h3 className="text-xs font-heading font-semibold tracking-widest text-silver-dim uppercase mb-3 flex items-center gap-1.5">
              Monthly Gazette
            </h3>
            <h4 className="font-heading text-base font-bold text-silver mb-1 leading-tight">
              The CoM Notebook
            </h4>
            <p className="text-silver-muted text-xs font-light leading-relaxed mb-4">
              Explore past printed issues of our monthly curated publication. Features mathematical diagrams, art, and Spec-Sci paper drafts.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 text-xs text-silver hover:text-bronze transition-colors"
            >
              Browse Magazine Catalog <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={150}>
        <div className="flex justify-center mt-12">
          <Link
            to="/library"
            className="group inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all hover:-translate-y-0.5"
          >
            Open Complete Library Archives
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ============================================================================
// NewsletterSection (CoM Notebook subscription box)
// ============================================================================
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive"
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Enrollment Secured",
      description: "Redirecting you to the CoM Substack..."
    });
    setTimeout(() => {
      window.location.href = "https://thecollegiumofminds.substack.com/subscribe";
    }, 1200);
  };

  return (
    <section className="relative z-10 py-16 px-5 sm:px-8 max-w-4xl mx-auto">
      <div className="glass-panel border-bronze-border/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden glowing-card">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-40 bg-gradient-to-r from-transparent via-bronze to-transparent" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-bronze/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver tracking-tight">
            Subscribe to the CoM Substack Notebook
          </h2>
          <p className="text-silver-muted text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            Our premium weekly publication exploring transfinite mathematics, speculative physics, and foundational philosophy. Delivered directly to your inbox via our Substack newsletter.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-obsidian/75 border border-bronze-border/15 rounded-xl px-4 py-3 text-silver text-xs focus:border-bronze/40 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-bronze text-obsidian px-5 py-3 font-heading text-[10px] font-semibold tracking-widest uppercase rounded hover:bg-bronze-light transition-colors whitespace-nowrap"
              >
                Enroll on Substack
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bronze-dim border border-bronze-border/30 rounded-2xl p-4 mt-6 max-w-md mx-auto"
            >
              <p className="text-xs font-semibold text-bronze tracking-wide uppercase mb-1">✓ Connection Established</p>
              <p className="text-xs text-silver-muted font-light">Redirecting you to the CoM Substack...</p>
            </motion.div>
          )}
          <p className="text-[9px] text-silver-dim/60 font-mono mt-4">
            Zero noise. Zero spam. Pure conceptual signal. Powered by Substack.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// JoinSection
// ============================================================================
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfBE1mrrINeO_e-ZWEUQMgKJ0_H092IQ1NuFiA3A05PTUJg6A/viewform";
const GUIDELINES_URL = "https://docs.google.com/document/d/1XoxcR-ZKuqt6kvdyBPiHqpQ1Y7T_tWgGbE90ewQCzKY/edit?usp=sharing";

const educationalLevels = [
  "Student (Grade 5 or below)",
  "Student (Grade 6-8)",
  "Student (Grade 9-12)",
  "Student (College/University)",
  "Professional",
  "Rather not tell",
];

const perks = [
  { icon: "🔍", text: "Explore Ideas" },
  { icon: "🤝", text: "Meet curious thinkers" },
  { icon: "💡", text: "Ask Better Questions" },
  { icon: "🧠", text: "Intellectual Discussions" },
  { icon: "🗣️", text: "Debate & Discourse" },
  { icon: "🌍", text: "Diverse Perspectives" },
];

const steps = [
  { key: "name", label: "What's your name?", placeholder: "Full name" },
  { key: "social", label: "Discord username or WhatsApp number?", placeholder: "e.g. username#1234 or +1...", hint: "Helps us connect with you directly on social channels." },
  { key: "education", label: "What's your educational level?", options: educationalLevels },
  { key: "description", label: "Describe yourself.", placeholder: "Tell us about yourself...", textarea: true },
  { key: "guidelines", label: "Agreement to Community Guidelines", checkbox: true },
];

function JoinSection() {
  const { toast: toastFn } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ name: string; social: string; education: string; description: string; guidelines: boolean }>({ name: "", social: "", education: "", description: "", guidelines: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const canProceed = () => {
    if (current.key === "name") return form.name.trim().length > 0;
    if (current.key === "social") return form.social.trim().length > 0;
    if (current.key === "education") return form.education.length > 0;
    if (current.key === "guidelines") return form.guidelines === true;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await authClient.entities.MemberApplication.create({
        full_name: form.name,
        phone_number: form.social,
        educational_level: form.education,
        self_description: form.description,
        agreed_to_guidelines: form.guidelines,
      });
      setSubmitted(true);
      toastFn({ title: "Almost there!", description: "Click below to complete your application." });
    } catch {
      toastFn({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  if (submitted) {
    return (
      <section id="join" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="bg-obsidian-surface/60 border border-bronze/30 rounded-3xl p-10 sm:p-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-bronze/20 border-2 border-bronze flex items-center justify-center mb-8">
              <Check size={32} className="text-bronze" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver mb-4">
              Welcome to the Collegium.
            </h2>
            <p className="text-silver-muted font-light text-base max-w-md mx-auto mb-6">
              Your responses have been noted. To complete your application,
              please submit the official form below.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-7 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all"
            >
              Open Google Form
              <ArrowRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section id="join" className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-8">
              <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                Join
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-6 leading-tight">
              Become a founding member.
            </h2>

            <p className="text-silver-muted text-sm sm:text-base font-light leading-relaxed max-w-md mb-10">
              CoM is still in its earliest stage. Every member who joins now helps
              define its culture, projects, and future direction.
            </p>

            <div className="rounded-2xl overflow-hidden border border-bronze-border/20 mb-10">
              <img
                src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/f332e5f29_generated_f0498456.png"
                alt="Ancient open book with golden edges"
                className="w-full h-40 sm:h-48 object-cover opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <span className="text-base">{p.icon}</span>
                  <span className="text-silver-muted text-xs sm:text-sm font-light">{p.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollReveal delay={150}>
            <div className="bg-obsidian-surface/60 border border-bronze-border/20 rounded-3xl p-6 sm:p-10">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                    Apply to CoM
                  </span>
                  <span className="text-silver-dim text-[11px] font-light">
                    Step {step + 1} of {steps.length}
                  </span>
                </div>
                <div className="w-full h-0.5 bg-obsidian-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bronze to-bronze-light rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[280px] sm:min-h-[320px] flex flex-col">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-silver mb-8">
                  {current.label}
                </h3>

                <div className="flex-1">
                  {current.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setForm({ ...form, education: opt })}
                          className={`text-left px-4 py-3 rounded-xl border text-sm font-light transition-all ${
                            form.education === opt
                              ? "border-bronze bg-bronze/15 text-bronze"
                              : "border-bronze-border/15 text-silver-muted hover:border-bronze/30 hover:bg-bronze-dim/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : current.checkbox ? (
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setForm({ ...form, guidelines: !form.guidelines })}
                        className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          form.guidelines
                            ? "border-bronze bg-bronze/20"
                            : "border-bronze-border/30 hover:border-bronze/50"
                        }`}
                      >
                        {form.guidelines && <Check size={16} className="text-bronze" />}
                      </button>
                      <div className="text-silver-muted text-sm font-light leading-relaxed">
                        I confirm that I have read, understand, and agree to follow the{" "}
                        <a
                          href={GUIDELINES_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bronze hover:underline inline-flex items-center gap-1"
                        >
                          Community Guidelines
                          <ExternalLink size={12} />
                        </a>.
                      </div>
                    </div>
                  ) : current.textarea ? (
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder={current.placeholder}
                      className="w-full h-32 bg-obsidian-light/50 border border-bronze-border/15 rounded-xl px-5 py-4 text-silver text-sm font-light placeholder:text-silver-dim/40 focus:border-bronze/40 focus:outline-none transition-colors resize-none"
                    />
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={form[current.key as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [current.key]: e.target.value })}
                        placeholder={current.placeholder}
                        onKeyDown={(e) => e.key === "Enter" && canProceed() && next()}
                        className="w-full bg-obsidian-light/50 border border-bronze-border/15 rounded-xl px-5 py-4 text-silver text-sm font-light placeholder:text-silver-dim/40 focus:border-bronze/40 focus:outline-none transition-colors"
                      />
                      {current.hint && (
                        <p className="text-silver-dim text-xs font-light mt-3">{current.hint}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-bronze-border/10">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="flex items-center gap-2 text-silver-muted text-sm font-light hover:text-silver transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>

                  <button
                    onClick={next}
                    disabled={!canProceed() || submitting}
                    className="flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-6 py-2.5 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-bronze/30 border-t-bronze rounded-full animate-spin" />
                    ) : step === steps.length - 1 ? (
                      <>
                        <Sparkles size={14} />
                        Continue to Form
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Footer
// ============================================================================
const randomQuestions = [
  "If you could know the answer to one question, what would it be?",
  "Is there a fundamental limit to human knowledge?",
  "What would a perfect education system look like?",
  "Can beauty be reduced to mathematics?",
  "What will humans wonder about 1,000 years from now?",
  "Is there a thought that no mind has ever had?",
  "Does silence have a sound?",
  "What exists beyond the edge of the observable universe?",
];

const exploreLinks = [
  { label: "About CoM", href: "#about" },
  { label: "Questions We Ask", href: "#questions" },
  { label: "Library", to: "/library" },
  { label: "Join CoM", href: "#join" },
];

const connectLinks = [
  { label: "Instagram", href: "https://instagram.com", note: "coming soon" },
  { label: "LinkedIn", href: "https://linkedin.com", note: "coming soon" },
  { label: "Email the Club", href: "mailto:collegiumofminds@gmail.com" },
];

export function Footer() {
  const [randomQ, setRandomQ] = useState(randomQuestions[0]);

  useEffect(() => {
    setRandomQ(randomQuestions[Math.floor(Math.random() * randomQuestions.length)]);
  }, []);

  return (
    <footer className="relative z-10 border-t border-bronze-border/20 bg-obsidian/80">
      <div className="border-b border-bronze-border/10 py-6 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="font-heading text-[9px] font-semibold tracking-[3px] uppercase text-bronze/60 whitespace-nowrap">
            Ponder this
          </span>
          <p className="text-silver-muted text-sm font-light italic">"{randomQ}"</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://media.base44.com/images/public/6a3979ed4c8f30bd3eb32ea0/c98e0fd61_The_Collegium_of_Minds_Logo.jpeg"
              alt="Collegium of Minds"
              className="w-8 h-8 rounded-full ring-1 ring-bronze-border" />
              <span className="font-heading text-base font-bold text-silver">
                Collegium of Minds
              </span>
            </div>
            <p className="text-silver-dim text-xs tracking-wider uppercase font-light mb-4">
              Think. Explore. Discover.
            </p>
            <p className="text-silver-dim text-sm font-light leading-relaxed max-w-xs">
              A community for curious thinkers and lifelong learners. Where ideas
              are shared and questions are celebrated.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((l) =>
              <li key={l.label}>
                  {l.to ?
                <Link to={l.to} className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                      {l.label}
                    </Link> :
                <a href={l.href} className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                      {l.label}
                    </a>
                }
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((l) =>
              <li key={l.label}>
                  <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-silver-dim text-sm font-light hover:text-bronze transition-colors">
                    {l.label}
                    {l.note && <span className="text-silver-dim/40 text-xs ml-2">— {l.note}</span>}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-bronze-border/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <span className="text-silver-dim text-xs font-light">
            © 2025 Collegium of Minds. All rights reserved.
          </span>
          <span className="text-silver-dim text-xs font-light flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
            Always questioning
          </span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// Home page
// ============================================================================
export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden">
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <SectionDivider />
      <VisionSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <QuestionsSection />
      <SectionDivider />
      <LibrarySection />
      <SectionDivider />
      <NewsletterSection />
      <SectionDivider />
      <JoinSection />
      <Footer />
    </div>
  );
}
