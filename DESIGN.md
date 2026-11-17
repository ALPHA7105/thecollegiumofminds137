# DESIGN.md — The Collegium of Minds
## Phase Neo Design System & Visual Identity Specification

---

## 1. Brand Identity

**The Collegium of Minds (CoM)** is an independent intellectual guild and decentralized laboratory of ideas. It exists for curious thinkers, scholars, and lifelong learners who explore fundamental questions across theoretical physics, transfinite mathematics, philosophy of mind, cosmology, artificial intelligence, and literature.

CoM does not position itself as an academic institution or a generic technological blog. It embodies the atmosphere of a timeless digital observatory—a place of contemplation, depth, and discovery where inquiry precedes conformity.

### Core Brand Principles
- **Intellectual Curiosity:** The question takes precedence over hasty certainty.
- **Interdisciplinary Rigor:** Cross-pollination between disparate sciences and humanistic thought.
- **Authentic Fellowship:** A collaborative sanctuary for independent minds.
- **Atmospheric Restraint:** Sophistication communicated through negative space, refined typography, and purposeful motion.

---

## 2. Creative Direction

### The Visual Thesis
```
DARK EDITORIAL  ×  CINEMATIC MINIMALISM  ×  INTELLECTUAL EXPLORATION
```

The experience evokes:
- Contemplative stillness and deep-space gravity.
- Intellectual curiosity and exploration of the unknown.
- Precision, craftsmanship, and refined editorial elegance.
- Restraint over decorative excess: every pixel, transition, and word has intention.

### Creative References & Inspirations
- **Compact Floating Navigation:** Restrained horizontal pill capsule inspired by modern minimalist interfaces (e.g., Supaste), floating discreetly above the canvas.
- **Luxury Editorial Publishing:** Expressive high-contrast display serif typography, generous whitespace, asymmetric column balances, and quiet margins.
- **Cinematic Deep Space:** Pure carbon black vacuum with an isolated astronaut embarking into the unknown.
- **Restrained Motion Design:** Purposeful, scroll-linked spatial transformations; no arbitrary animations or kinetic noise.

---

## 3. Design Philosophy

### "Collegium of Minds is not another website trying to explain why it is interesting."

It invites the reader into an intellectual sanctuary through atmosphere and typography.
- **Black creates the atmosphere:** An uncompromising carbon black canvas eliminates digital distractions and focuses attention.
- **Typography establishes identity:** Large high-contrast display serif headlines project authority, intellectual gravitas, and timeless humanity.
- **The astronaut represents exploration:** A physical symbol of human curiosity venturing beyond the known perimeter of knowledge.
- **Purple provides personality:** Used exclusively as an accent—never as an overwhelming background flood.
- **Motion rewards curiosity:** Animations respond to user interaction rather than playing unprompted loops.
- **Minimalism creates meaning:** Generous negative space gives deep ideas room to resonate.

---

## 4. Colour Palette

Phase Neo establishes a strictly disciplined, predominantly monochromatic color hierarchy. Carbon black forms the foundation; warm off-white delivers optimal legibility; subtle purple is restricted strictly to tiny occasional interactive details.

### A. Core Semantic Tokens

| Token Name | Hex / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| **Primary Canvas** | `#030303` | Absolute carbon black background; deep-space void |
| **Secondary Background** | `#050505` | Footers, deep container baselines |
| **Surface Subtle** | `#0D0D0D` / `#101010` | Editorial cards, floating modal panels |
| **Surface Elevated** | `#141414` / `#171717` | Hovered cards, interactive pill states, input fills |
| **Primary Text** | `#F2EEE8` | Warm editorial off-white/cream; headlines, primary reading text |
| **Secondary Text** | `#A3A3A3` / `#A5A19F` | Neutral stone gray; body paragraphs, subheadings, excerpts |
| **Tertiary / Dim** | `#716E6B` | Tabular numerals, metadata labels, timestamps, disabled indicators |
| **Primary Border** | `rgba(255, 255, 255, 0.10)` | Hairline card dividers and capsule contours |
| **Subtle Border** | `rgba(255, 255, 255, 0.05)` | Secondary dividers, internal table rules |
| **Purple Accent** | `#A78BFA` | Selective interactive details (text selection, vote bar distribution fill) |
| **CTA Button** | `#F2EEE8` text `#030303` | High-contrast off-white pill for primary calls to action |

### B. Color Usage Rules
- **Carbon Black Dominance:** The canvas remains uncompromisingly carbon black (`#030303`).
- **Monochromatic Purity:** The website identity is monochromatic. The astronaut asset is the primary visual accent.
- **Strict Purple Removal:** No purple hero typography, no purple gradients, no purple glow effects, no purple-heavy buttons, and no purple borders.
- **Prohibited:**
  - Blue or cyan gradients.
  - Purple-dominated backgrounds or typography.
  - Neon glowing halos or excessive radial flares.
  - Heavy frosted glassmorphism.

---

## 5. Typography System

Typography is central to Phase Neo's confident identity. The system pairs an authoritative, bold geometric display with a clean interface sans-serif, an elegant secondary serif italic for selected editorial phrases, and a technical monospace.

### A. Font Families

1. **Hero Display Headline (`Mileast`):**
   - **Primary:** `Mileast` (custom serif font from assets)
   - **Role:** Main hero headline ("Beyond What\nWe Know.").
   - **Characteristics:** Expressive, high-fashion display serif with distinctive bracketed curls, swashes, and commanding presence in warm off-white `#F2EEE8`.

2. **Hero Brand Eyebrow (`Georgia`):**
   - **Primary:** `Georgia Bold` (700) + `Georgia Italic` (400)
   - **Role:** Eyebrow line above main headline ("Collegium of Mind").
   - **Characteristics:** Literary authority, balanced scale, establishing brand provenance.

3. **Hero Motto Tagline (`New York`):**
   - **Primary:** `New York` (Apple serif variable font from assets, Italic)
   - **Role:** Hero motto ("Think. Explore. Discover.").
   - **Characteristics:** Refined literary italic posture, warm off-white (`#E5E0D8`), meditative and timeless.

4. **Interface & Body Sans (`--font-sans`):**
   - **Primary:** `Inter Regular` (300/400), `Inter Medium` (500), `Inter SemiBold` (600)
   - **Role:** Body copy, navigational links, buttons, metadata labels, guideline prose.
   - **Characteristics:** Neutral geometry, open aperture, superior legibility across dark surfaces.

5. **Technical Monospace (`--font-mono`):**
   - **Primary:** `JetBrains Mono`, `ui-monospace`, `monospace`
   - **Role:** Index numbers (`01 / PHILOSOPHY`), timestamps, poll metrics.

### B. Type Scale & Optical Metrics

| Level | Font & Weight | Size (Mobile → Desktop) | Line Height | Tracking | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Eyebrow** | Georgia Bold + Italic | `1.25rem` (`20px`) → `2.25rem` (`36px`) | `1.1` | `-0.02em` | `#F2EEE8` |
| **Hero Headline** | Mileast Display Serif | `3rem` (`48px`) → `7.25rem` (`116px`) | `0.96` | `-0.02em` | `#F2EEE8` |
| **Hero Motto** | New York Italic | `1.5rem` (`24px`) → `2.5rem` (`40px`) | `1.20` | `+0.02em` | `#E5E0D8` (off-white) |
| **Section Title** | Instrument Serif (Normal) | `2rem` (`32px`) → `3.75rem` (`60px`) | `1.08` | `-0.02em` | `#F2EEE8` |
| **Editorial Quote** | Instrument Serif (Italic) | `1.25rem` (`20px`) → `1.75rem` (`28px`)| `1.40` | `normal` | `#F2EEE8` |
| **Body Large** | Inter (Light 300) | `1.0625rem` (`17px`) → `1.125rem` (`18px`)| `1.75` | `normal` | `#A3A3A3` |
| **Body Standard** | Inter (Light 300) | `0.875rem` (`14px`) → `0.9375rem` (`15px`)| `1.65` | `normal` | `#A3A3A3` |
| **Section Label** | JetBrains Mono (Medium) | `0.6875rem` (`11px`) → `0.75rem` (`12px`)| `1.0` | `+0.25em` (uppercase) | `#A3A3A3` |
| **Capsule Link** | Inter (Medium 500) | `0.75rem` (`12px`) | `1.0` | `+0.05em` | `#A3A3A3` → `#F2EEE8` |

---

## 6. Layout & Spacing System

The layout follows an editorial magazine architecture prioritizing generous vertical rhythm, intentional asymmetry, and strict container bounds.

### A. Grid & Metrics
- **Viewport Canvas:** Fluid width with responsive side gutters (`px-6 sm:px-10 lg:px-16`).
- **Standard Content Max-Width:** `max-w-7xl` (`1280px`).
- **Reading / Manifesto Max-Width:** `max-w-3xl` (`768px`) to ensure comfortable line lengths.
- **Section Spacing Cadence:** `py-28 sm:py-36`.
- **Dividers:** Hairline borders `border-t border-white/10`.

---

## 7. Navigation System — Supaste Reference Integration & Architecture

The CoM navigation directly adapts the architectural and structural patterns of the reference implementation (`inspiration/Supaste — Clipboard History Manager for Mac.html`), translated into CoM's carbon-black, warm off-white editorial design system.

### A. Architectural & Structural Foundations (Supaste Reference Adaptation)
- **Top-Anchored Capsule Suspension:** Pinned directly to the viewport ceiling (`position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: 50;`).
- **Inverted Concave Fillet Wings:** Symmetrical SVG corner ears at the top-left and top-right of the capsule (`width: 20px; height: 20px; position: absolute; top: 0;`).
  - Right wing: SVG path `M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z` (exact quarter-circle fillet radius of 20px).
  - Left wing: Matching inverted curve mirrored horizontally.
  - Seamlessly bridges the browser window ceiling down into the vertical capsule boundaries.
- **Capsule Contours & Radii:** Bottom corners feature smooth curvature (`border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;`).
- **Surface & Background:** Sculptural warm ivory/cream `#F4F0EA` with hairline border `border-b border-x border-black/8`, floating with high contrast against the carbon black void, supported by atmospheric depth shadows `shadow-[0_12px_36px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.2)]`.

### B. Proportions, Spacing & Alignment
- **Cluster Spacing:** `gap: 36px` to `40px` horizontal separation between the Left Brand Cluster, Central/Right Navigation Links, and the Action CTA Button.
- **Nav Link Spacing:** Clean `gap: 20px` to `24px` horizontal row.
- **Capsule Padding:** Desktop `py-2 sm:py-2.5 px-3.5 sm:px-4`; Mobile `p-4` when open.

### C. Component Typography & Hover Interactions
- **Brand Cluster (Left):**
  - **Emblem Frame:** 30×30px squircle with `border-radius: 8px` and hairline border `border border-black/10`, housing `/logo.jpeg` over `#E8E3DB` background.
  - **Wordmark:** "Collegium of Minds" in `Inter` (600 SemiBold), 13–14px, tracking `-0.02em`, deep charcoal `#0A0A0A` (`group-hover:text-black transition-colors`).
- **Navigational Links:**
  - **Type Scale:** `Inter` (500 Medium), 13–14px, tracking `-0.02em`.
  - **Resting State:** `#0A0A0A` at 70% opacity (`text-[#0A0A0A]/70`).
  - **Hover State:** Smooth transition to 100% opacity `#0A0A0A` / `#000000` (`transition-colors duration-150`).
- **Action CTA Button ("Join CoM"):**
  - **Proportions:** `padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; line-height: 1.4em;`
  - **Inverted Contrast Treatment:** High-contrast carbon black pill (`bg-[#0A0A0A] text-[#F4F0EA] hover:bg-black hover:text-white transition-all shadow-sm`) with subtle upward arrow glyph.

### D. Responsive & Mobile Behavior
- **Desktop (≥768px):** Horizontal ivory capsule bar hugging content width (`w-auto max-w-[95vw]`), flanked by ivory ceiling fillet wings.
- **Tablet (768px–1199px):** Balanced horizontal padding, full link accessibility.
- **Mobile (<768px):**
  - Collapsed State: Width contracts to `w-full max-w-[360px]` with logo on the left and a refined icon toggle button on the right.
  - Expanded State (Drawer): Adapts Supaste's vertical drawer variant (`framer-v-e7vfwq`). The ivory capsule itself smoothly unfolds downward via `AnimatePresence` into a rounded vertical panel (`rounded-b-[20px] p-4 bg-[#F4F0EA] border-t border-black/8`), stacking nav links with comfortable touch targets (14px Medium, tracking `-0.02em`, gap 14px) and placing the carbon-black CTA button full-width at the base.


---

## 8. Hero Composition & Deep-Space Departure Motion

1. **The Brand Eyebrow:** `Collegium` in `Georgia Bold` + `of Mind` in `Georgia Italic` (classical serif brand anchor above the headline).
2. **The Display Heading:** Set in `Mileast` (expressive, high-fashion custom serif, left-aligned, commanding, set in warm off-white `#F2EEE8`, leading `0.96`, tight tracking). Structured into two dedicated lines:
   - Line 1: `Beyond What` (rendered in a single unbroken line via `whitespace-nowrap`)
   - Line 2: `we Know.` (rendered in a single unbroken line via `whitespace-nowrap`)
3. **The Secondary Motto:** `Think. Explore. Discover.` in `New York` (`NewYorkItalic.ttf` authentic Apple serif variable italic, warm off-white `#E5E0D8`, tracking-wide, visually subordinate and reflective, no purple).
4. **The Astronaut Asset Layer (`z-30` Foreground):** Rendered using `/assets/astronaut-tight.png` (tightly cropped 745×1000 geometry eliminating empty horizontal transparent padding). Positioned at `z-30 pointer-events-none` in front of the typography layer (`z-10`), floating across the right-center composition (`lg:right-4 xl:right-12 lg:top-1/2 lg:-translate-y-1/2`). This eliminates screen edge cut-offs while achieving true 3D spatial depth where the astronaut reaches forward in front of the text without blocking text interaction.
5. **Mouse Scroll Indicator:** A delicate outlined mouse icon with an animated vertical inner scroll wheel and "SCROLL TO EXPLORE" label, centered near the bottom of the hero viewport, fading out smoothly on scroll.

### B. Cinematic Chapter Transition: Deep-Space Departure → Section Two Reveal

The transition between the Hero and Section Two (Our Philosophy) is engineered as a seamless, scroll-pinned cinematic sequence (`h-[330vh]` pinned viewport, ~230vh of active scroll travel):

1. **PHASE A — DEPARTURE (Scroll Progress `0.00 → 0.38`):**
   - **Hero Layer Dissolution:** Eyebrow and headline fade out (`opacity: 1.0 → 0.0`, `y: 0 → -42px`) between `0.00` and `0.22`. Scroll indicator fades by `0.06`.
   - **Cosmic Departure Plunge:** The astronaut visibly travels downward and inward into the cosmic vanishing point (`y: 0 → 680px`, `x: 0 → -180px`), scaling down exponentially (`scale: 1.0 → 0.04`), dissolving (`opacity: 1.0 → 0.0`, `filter: blur(0px) → blur(8px)`), and disappearing completely into the black void by `0.38`.

2. **PHASE B — THE ABYSS (Scroll Progress `0.38 → 0.54`):**
   - The screen is held in pure, deep carbon-black `#030303` void with subtle floating micro-stars.
   - Both Hero and Philosophy layers are invisible (`opacity: 0.0`).
   - This contemplative moment is sustained through 16% of scroll progress (~350px of natural scroll travel), creating visceral stillness before the next chapter emerges.

3. **PHASE C — STAGGERED REVEAL (Scroll Progress `0.54 → 0.86`):**
   - Section Two content emerges progressively from the darkness through restrained staggered reveals:
     - `0.54 → 0.64`: Section Indicator (`01 / Our Philosophy` + purple ambient dot, `opacity: 0 → 1`, `y: 24 → 0`).
     - `0.58 → 0.70`: Main Statement (`We do not gather to settle opinions...`, `opacity: 0 → 1`, `y: 36 → 0`).
     - `0.64 → 0.76`: Pull-Quote Card (`"Curiosity is not a casual pastime..."`, `opacity: 0 → 1`, `y: 36 → 0`).
     - `0.68 → 0.80`: Supporting Editorial Paragraphs (3 paragraphs, `opacity: 0 → 1`, `y: 36 → 0`).
     - `0.72 → 0.86`: Minimalist Ledger (`10 Societies`, `60+ Fellows`, `∞ Inquiries`, `opacity: 0 → 1`, `y: 24 → 0`).

4. **PHASE D — ARRIVAL & NATURAL HANDOVER (Scroll Progress `0.86 → 1.00+`):**
   - At `0.86`, the Philosophy section is in full command of the viewport with active pointer events.
   - At `1.00`, the sticky pin releases naturally without jump into the remaining normal document flow (Section C: Intellectual Disciplines).
   - Reverse scrolling naturally pulls the transition backward in reverse sequence.
   - Target anchor `#about` enables smooth navigation directly to the arrived Philosophy view.

---

## 9. Homepage Sections Architecture

1. **Section A — Hero:** Dual typography lines + independent astronaut deep-space departure.
2. **Section B — Our Philosophy:** The central manifesto ("We do not gather to settle opinions, but to venture beyond what we know"), pull-quote card, and 3-metric ledger.
3. **Section C — Intellectual Disciplines:** 10 numbered societies (`01` to `10`) in an editorial index table with lead provocative questions, fellow counts, and an interactive Society Detail Modal.
4. **Section D — What Drives Us:** 4 foundational convictions (Primacy of the Question, Interdisciplinary Synthesis, Radical Independence, Lifelong Fellowship).
5. **Section E — Questions Worth Exploring:** Dynamic 6-card inquiry shuffle grid + Question of the Week live vote with Firestore synchronization and real-time result distribution bars.
6. **Section F — What We're Thinking:** Curated lead treatise, secondary essay grid, CoM Monthly Notebook Gazette issues, and Substack enrollment.
7. **Section G — The Guild (Members):** Founder & Executive Director Sarvesh Kore featured profile with authentic photo, quote, and manifesto modal, plus Operations & Development council member dossiers.
8. **Digital Salon (Discussions):** Live Discord channel discussions and bulletin board feed.
9. **Section H — Join the Collegium:** Closing invitation with rotating marginalia reflections (Feynman, Sagan, Socrates, Russell, Curie), code of conduct, guideline agreement checkbox, and Google Form application action.
10. **Section I — Editorial Footer System (Supaste Reference Adaptation):**
    - **Ponder This Philosophical Strip:** Randomized thought prompt banner across the top (`bg-[#060606] border-b border-white/5 py-4`).
    - **4-Column Directory Layout (`max-w-[1200px]`):**
      - **Column 1 (Identity & Mission — flex: 2, 5-col span):** Squircle 30px emblem, wordmark, guild badge, Supaste-inspired dual-typography tagline (`Inter Bold` 30px "Think deeply." + `Instrument Serif Italic` 30px "Venture beyond."), mission description, 8px CTA pill ("Apply for Fellowship"), copyright line, and founder attribution row ("Conceived & Founded by" + Sarvesh Kore profile avatar link).
      - **Column 2 (Repository / Menu — flex: 1):** `Philosophy`, `Disciplines`, `Principles`, `Inquiries`, `Library`, `Discussions`, `Events`.
      - **Column 3 (Dialogue / Community — flex: 1):** `Discord Community`, `GitHub Repository`, `LinkedIn Portal`, `Email the Guild`, `Council Dossiers`, `Code of Conduct`.
      - **Column 4 (Dispatches & Records — flex: 1):** `Monthly Gazette`, `Digital Salon Bulletin`, `Question of the Week`, `Substack Dispatch`, `Fellowship Inquiries`, `Supporters & Patrons`.
    - **Monumental Watermark Typography (Supaste Reference Signature):** Full-width SVG display running across the bottom (`viewBox="0 0 1200 200"`), rendering `"COLLEGIUM OF MINDS"` in dark charcoal `#101010` / `rgba(255, 255, 255, 0.04)` with Inter 800 ExtraBold, -0.05em tight tracking, anchoring the footer with quiet sculptural authority.
    - **Responsive Scaling:** Desktop 4 columns (`max-w-[1200px]`, gap 48px); Tablet 2-tier (Column 1 top full width, Columns 2–4 in 3-column grid below); Mobile 1-column vertical flow with proportional watermark contraction.

---

## 9.B. Reference Adaptation Matrix — Supaste vs. CoM Specifics

| Design Dimension | Adapted from Supaste Reference | Designed Specifically for CoM |
| :--- | :--- | :--- |
| **Navbar Anchor & Shape** | Pinned to ceiling (`top: 0`), bottom rounded corners (18px radius), compact capsule proportions | High-contrast warm ivory/cream (`#F4F0EA`) palette eliminating dark canvas camouflage; hairline `border-b border-x border-black/8` |
| **Navbar Corner Ears** | Inverted concave quarter-circle SVG fillet arcs (20px) connecting ceiling to capsule | Matching warm ivory/cream SVG fills with subtle hairline contour stroke |
| **Brand Emblem** | Squircle icon geometry (30×30px, 8px radius) | CoM circular seal within squircle frame; deep charcoal "Collegium of Minds" wordmark |
| **Nav Links Typography** | 13–14px Medium, tracking `-0.02em`, 0.6 opacity resting → 1.0 hover | CoM route mappings with crisp charcoal `#0A0A0A`/70 resting → `#000000` hover |
| **Action CTA Button** | Small capsule button (8px radius, 12px 600 SemiBold) | Inverted high-contrast carbon black pill (`bg-[#0A0A0A] text-[#F4F0EA]`) with upward arrow |
| **Mobile Nav Drawer** | Seamless downward accordion/drawer expansion (`flex-col`, `p-4`) | Matching ivory/cream drawer panel with AnimatePresence transition and full-width carbon CTA |
| **Footer Structure** | 4-column asymmetric architecture (Column 1 flex-2, Columns 2–4 flex-1) | CoM institutional categories (Repository, Dialogue, Dispatches) |
| **Footer Tagline** | Dual-typography headline pairing: Bold Display + Italic Serif | "Think deeply. / *Venture beyond.*" philosophical pairing |
| **Footer Attribution** | Founder / author credit line with rounded avatar link | "Conceived & Founded by" + Sarvesh Kore avatar & profile link |
| **Footer Watermark** | Monumental SVG display typography running across the bottom | "COLLEGIUM OF MINDS" brandmark in tone-on-tone charcoal `#101010` |
| **Atmosphere & Color** | Structural layouts and component metrics | Carbon black `#030303`, warm off-white `#F2EEE8`, restrained `#A78BFA` purple accents |
| **Philosophical Banner** | — | "Ponder This" randomized thought prompt strip across footer top |
| **Hero & Motion** | — | Cinematic astronaut hero with "Deep-Space Departure" scroll-linked trajectory |


## 10. Motion Design System

Motion in CoM Phase Neo serves meaning and spatial orientation rather than ornamentation.

### A. Principles
- **Transform & Opacity First:** 100% GPU-accelerated properties (`translate3d`, `scale`, `opacity`).
- **No Heavy Blurs:** Blurring during motion causes frame drops; avoided completely.
- **Scroll Synchronization:** Key spatial movements are driven by native browser scroll position.
- **Reduced-Motion Support:** Evaluates `useReducedMotion()`. If preferred, transforms are simplified to direct static layout.

### B. Timing Curves
- **Standard Entrance:** `duration: 0.7s, ease: [0.16, 1, 0.3, 1]` (custom cubic bezier for fluid deceleration).
- **Hover Transitions:** `duration: 0.25s, ease: easeOut`.
- **Idle Float Cycle:** `duration: 8.5s, repeat: Infinity, ease: easeInOut`.

---

## 11. Interaction & Hover Conventions

- **Links & Buttons:**
  - Standard text link: Color transitions from `#A5A19F` to `#F2EEE8` or `#A78BFA`.
  - Capsule buttons: Hairline border shifts from `border-white/15` to `border-[#A78BFA]/50` with subtle background fill.
- **Editorial Cards:**
  - Resting state: `bg-[#0D0D0D] border border-white/10`.
  - Hover state: `border-[#A78BFA]/35 -translate-y-0.5`.
- **Question Cards:**
  - Clicking any inquiry card immediately triggers a shuffle animation, replacing it with an unshown philosophical prompt.

---

## 12. Responsive Behaviour

- **Large Desktop (≥1280px):** Full asymmetric split hero, horizontal editorial directory, 4-column council grid.
- **Laptop / Tablet (768px – 1024px):** Proportional typography scaling (`text-5xl` to `text-7xl`), 2-column council grid.
- **Mobile (<768px):**
  - Navigation contracts to compact pill with logo + title + hamburger.
  - Hero stacks typography vertically above the floating astronaut.
  - Display titles employ fluid responsive scaling.
  - Inquiry shuffle grid switches to single-column card stack.

---

## 13. Accessibility & Standards

- **Contrast Ratios:** Primary text (`#F2EEE8`) on carbon black (`#030303`) yields a 17.5:1 contrast ratio (exceeding WCAG AAA standard of 7:1).
- **Semantics:** Clean HTML5 landmark tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<blockquote>`, `<footer>`).
- **Keyboard Navigation:** All interactive elements (capsule links, modal close buttons, poll options, checkboxes) feature clear focus indicators and full keyboard accessibility.

---

## 14. Asset Specification

| Asset | Path | Format & Quality | Purpose |
| :--- | :--- | :--- | :--- |
| **Floating Astronaut** | `/assets/astronaut.png` | 1536×1024 Transparent PNG | Hero deep-space departure element |
| **Founder Photo** | `/team/sarvesh.png` | Square Photo (High-res) | Guild leadership profile |
| **Emblem Logo** | `/logo.jpeg` | Circular Avatar | Nav capsule & footer brandmark |
| **OpenGraph Image**| `/og-image.png` | 1200×630 PNG | Social preview meta-card |

---

## 15. Design Anti-Patterns

1. **NO Neon Glows:** Never introduce high-saturation electric cyan or magenta neon glow boxes.
2. **NO Gradient Backgrounds:** The background must never be a gradient wash; it remains carbon black `#030303`.
3. **NO Stock/AI Personas:** All member names, roles, quotes, and avatars represent genuine project contributors.
4. **NO Scroll Hijacking:** Wheel event interception is prohibited. Native scroll must always control page progression.
5. **NO Glassmorphism Clutter:** Never stack translucent glass panels with thick borders. Surfaces are opaque carbon (`#0D0D0D`) with fine hairline rules.
