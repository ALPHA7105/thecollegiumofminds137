import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Asteroid3D } from "./Asteroid3D";

gsap.registerPlugin(useGSAP);

export function DeepSpaceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const astronautWrapperRef = useRef<HTMLDivElement>(null);
  const asteroid1Ref = useRef<HTMLDivElement>(null);
  const asteroid2Ref = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the hero track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero text stays locked in position (opacity 1.0, y: 0) while astronaut falls into deep space
  // Gently fades only at the very end (0.75 -> 1.0) as the page transitions to the next section
  const textOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.75, 1.0],
    [1.0, 1.0, 0.15]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.0, 0.75, 1.0],
    [0, 0, -20]
  );

  // Minimal scroll indicator fades out immediately upon scrolling
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.12],
    [1.0, 0.0]
  );
  const indicatorY = useTransform(
    scrollYProgress,
    [0.0, 0.12],
    [0, 14]
  );

  // Background 4K Deep Space subtle parallax drift
  const bgY = useTransform(
    scrollYProgress,
    [0.0, 1.0],
    [0, 35]
  );

  // Earth Globe Scroll Synchronization
  // Earth sinks and recedes into the distance as user scrolls downward into deep space
  const earthScrollY = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.75, 1.0],
    [0, 90, 240, 380]
  );
  const earthScrollScale = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.75, 1.0],
    [1.0, 0.94, 0.84, 0.74]
  );
  const earthScrollOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.55, 0.85, 1.0],
    [1.0, 0.95, 0.45, 0.12]
  );

  // Cinematic Astronaut Plunge into the Abyss
  // Unhurried descent: visibly falls downward and into deep space beside the stationary text
  // Completely sharp throughout (zero blur)
  const astronautScale = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.55, 0.85],
    [1.0, 0.75, 0.35, 0.04]
  );
  const astronautY = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.55, 0.85],
    [0, 160, 440, 800]
  );
  const astronautX = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.55, 0.85],
    [0, -25, -75, -160]
  );
  const astronautRotate = useTransform(
    scrollYProgress,
    [0.0, 0.30, 0.85],
    [0, -3, -12]
  );
  const astronautOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.65, 0.85],
    [1.0, 1.0, 0.7, 0.0]
  );

  // Asteroid scroll depths
  const asteroid1ScrollY = useTransform(scrollYProgress, [0.0, 0.85], [0, 260]);
  const asteroid2ScrollY = useTransform(scrollYProgress, [0.0, 0.85], [0, 400]);

  // GSAP 3D Interactive Mouse Parallax & Celestial Orbit (scoped with useGSAP)
  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      // High-performance quickTo setters for 60fps responsiveness
      const earthRotX = gsap.quickTo(earthRef.current, "rotateX", { duration: 1.2, ease: "power2.out" });
      const earthRotY = gsap.quickTo(earthRef.current, "rotateY", { duration: 1.2, ease: "power2.out" });
      const earthShiftX = gsap.quickTo(earthRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const earthShiftY = gsap.quickTo(earthRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const astroRotX = gsap.quickTo(astronautWrapperRef.current, "rotateX", { duration: 0.9, ease: "power2.out" });
      const astroRotY = gsap.quickTo(astronautWrapperRef.current, "rotateY", { duration: 0.9, ease: "power2.out" });
      const astroShiftX = gsap.quickTo(astronautWrapperRef.current, "x", { duration: 0.9, ease: "power2.out" });
      const astroShiftY = gsap.quickTo(astronautWrapperRef.current, "y", { duration: 0.9, ease: "power2.out" });

      const ast1ShiftX = gsap.quickTo(asteroid1Ref.current, "x", { duration: 1.3, ease: "power2.out" });
      const ast1ShiftY = gsap.quickTo(asteroid1Ref.current, "y", { duration: 1.3, ease: "power2.out" });

      const ast2ShiftX = gsap.quickTo(asteroid2Ref.current, "x", { duration: 1.5, ease: "power2.out" });
      const ast2ShiftY = gsap.quickTo(asteroid2Ref.current, "y", { duration: 1.5, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
        const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

        // Earth 3D mass parallax (immense celestial sphere feel)
        earthRotX(-normY * 5);
        earthRotY(normX * 7);
        earthShiftX(normX * 16);
        earthShiftY(normY * 12);

        // Astronaut 3D parallax (closer foreground layer)
        astroRotX(-normY * 9);
        astroRotY(normX * 11);
        astroShiftX(normX * 24);
        astroShiftY(normY * 18);

        // Asteroids differential depth
        ast1ShiftX(normX * -30);
        ast1ShiftY(normY * -22);

        ast2ShiftX(normX * -16);
        ast2ShiftY(normY * -14);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Continuous subtle celestial axial wobble on Earth
      gsap.to(earthRef.current, {
        rotateZ: 3.5,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: heroScopeRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#020202]"
      aria-label="Hero — Beyond What We Know"
    >
      {/* Sticky Fullscreen Pinned Environment */}
      <div
        ref={heroScopeRef}
        style={{ perspective: "1200px" }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#020202]"
      >
        {/* 1. 4K Cinematic Deep-Space Background Layer (Near-pure black, ultra-minimal) */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: bgY }}
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/deep-space-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-85 scale-105"
            loading="eager"
            draggable={false}
          />
          {/* Subtle deep-space atmospheric vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020202]/30 to-[#020202]/85 pointer-events-none" />
        </motion.div>

        {/* 2. Earth Globe 3D Celestial Layer (Lower-Left Corner Anchor) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: earthScrollY,
                  scale: earthScrollScale,
                  opacity: earthScrollOpacity,
                }
          }
          className="absolute -bottom-[14%] -left-[18%] xs:-bottom-[18%] xs:-left-[14%] sm:-bottom-[26%] sm:-left-[12%] md:-bottom-[28%] md:-left-[10%] lg:-bottom-[24%] lg:-left-[7%] xl:-bottom-[20%] xl:-left-[5%] z-10 pointer-events-none select-none"
        >
          <div
            ref={earthRef}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[280px] h-[280px] xs:w-[360px] xs:h-[360px] sm:w-[580px] sm:h-[580px] md:w-[700px] md:h-[700px] lg:w-[840px] lg:h-[840px] xl:w-[960px] xl:h-[960px] flex items-center justify-center"
          >
            {/* Atmospheric Cyan/Blue Rim Glow around illuminated curve */}
            <div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_68%_32%,rgba(56,189,248,0.22),transparent_65%)] blur-[50px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Earth Globe Image (photorealistic Eastern Hemisphere) */}
            <img
              src="/assets/earth-globe.png"
              alt="Planet Earth from orbit"
              className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_24px_60px_rgba(0,0,0,0.95)]"
              loading="eager"
              draggable={false}
            />

            {/* Spherical Crescent Depth Mask & Limb Ring */}
            <div
              className="absolute inset-0 rounded-full border border-sky-400/25 shadow-[inset_-30px_-30px_70px_rgba(0,0,0,0.9),0_0_90px_rgba(56,189,248,0.2)] pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* 3. Layered 3D Floating Asteroids / Space Debris */}
        {/* Asteroid 1: Upper Right Depth Plane */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: asteroid1ScrollY }}
          className="absolute top-[14%] right-[6%] sm:top-[16%] sm:right-[18%] lg:right-[22%] z-15 pointer-events-none select-none"
        >
          <div ref={asteroid1Ref}>
            <Asteroid3D size={52} rotationDuration={32} className="sm:w-16 sm:h-16" />
          </div>
        </motion.div>

        {/* Asteroid 2: Lower Right Foreground Plane */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: asteroid2ScrollY }}
          className="absolute bottom-[18%] right-[4%] sm:bottom-[22%] sm:right-[10%] lg:right-[14%] z-25 pointer-events-none select-none"
        >
          <div ref={asteroid2Ref}>
            <Asteroid3D size={36} rotationDuration={24} reverse className="sm:w-11 sm:h-11" />
          </div>
        </motion.div>

        {/* 4. Main Hero Composition Wrapper (Clean, Majestic Typography) */}
        <div className="relative my-auto w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 lg:gap-8 pt-14 sm:pt-20 lg:pt-0 z-20">
          
          {/* Confident Typographic Left Column (Stationary during plunge) */}
          <motion.div
            style={shouldReduceMotion ? {} : { opacity: textOpacity, y: textY }}
            className="flex-1 text-left max-w-3xl xl:max-w-4xl select-none"
          >
            {/* Brand Eyebrow: "Collegium of Mind" in Georgia Bold + Regular */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl md:text-3xl lg:text-[2.25rem] text-[#E5E0D8] tracking-[-0.02em] mb-1.5 sm:mb-4"
              style={{ fontFamily: "Georgia, 'Cormorant Garamond', serif" }}
            >
              <span className="font-bold text-[#F2EEE8]">Collegium</span>{" "}
              <span className="font-normal text-[#E5E0D8]/85 italic">of Mind</span>
            </motion.div>

            {/* Primary Headline: "Beyond What \n we Know." in custom Mileast serif */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] xl:text-[7.25rem] tracking-tight text-[#F2EEE8] leading-[0.98] sm:leading-[0.96]"
              style={{ fontFamily: "'Mileast', Georgia, serif" }}
            >
              <span className="block whitespace-nowrap">Beyond What</span>
              <span className="block whitespace-nowrap">we Know.</span>
            </motion.h1>

            {/* Tagline Motto: "Think. Explore. Discover." in custom New York italic serif */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-8 text-xl sm:text-3xl md:text-4xl text-[#E5E0D8]/90 tracking-wide font-normal italic"
              style={{
                fontFamily: "'New York', 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Think. Explore. Discover.
            </motion.p>
          </motion.div>

          {/* Cinematic Astronaut Foreground Layer (z-30 — in front of text, falling into the abyss) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    x: astronautX,
                    y: astronautY,
                    scale: astronautScale,
                    opacity: astronautOpacity,
                    rotate: astronautRotate,
                  }
            }
            className="z-30 pointer-events-none flex justify-center items-center lg:absolute lg:right-4 xl:right-12 lg:top-1/2 lg:-translate-y-1/2"
          >
            <div
              ref={astronautWrapperRef}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Subtle natural idle float */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [-8, 8, -8],
                        rotate: [-0.6, 0.8, -0.6],
                      }
                }
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[180px] xs:w-[220px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px] aspect-[745/1000] flex items-center justify-center filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              >
                <img
                  src="/assets/astronaut-tight.png"
                  alt="Astronaut floating in deep space reaching forward"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  loading="eager"
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* 5. Minimalist Centered Scroll Indicator (Pure, Uncluttered) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: indicatorOpacity, y: indicatorY }
          }
          className="w-full flex flex-col items-center justify-center pb-8 z-20 pointer-events-none select-none"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={{
                y: [0, 6, 0],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 rounded-full bg-[#F2EEE8]"
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[3px] text-[#A3A3A3] mt-2.5 font-light">
            Scroll to explore
          </span>
        </motion.div>

      </div>
    </section>
  );
}
