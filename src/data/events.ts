export interface Event {
  id: string;
  title: string;
  type: 'Debate' | 'Seminar' | 'Workshop' | 'Salon' | 'Symposium' | 'Initiative';
  date: string;
  time: string;
  location: string;
  emoji: string;
  summary: string;
  description: string;
  speaker?: string;
  capacity?: string;
  status: 'upcoming' | 'completed';
}

export const eventsData: Event[] = [
  {
    id: "astronomy",
    title: "Entropy and the Cosmos",
    type: "Seminar",
    date: "July 12, 2026",
    time: "4:00 pm IST / 2:30 pm GST",
    location: "Virtual - https://meet.google.com/vst-kqez-shp",
    emoji: "🌠",
    summary: "Explore the fascinating relationship between entropy and the cosmos in this engaging astronomy class. Dive into entropy microstates and a Q&A session with fellow astronomy enthusiasts",
    description: "Blast off to a cosmic adventure! 🚀 Join our astronomy class today! 🌌",
    speaker: "Aryan Kumar",
    capacity: "None",
    status: "upcoming"
  },

]

/*
export const eventsData: Event[] = [
  {
    id: "evt_mind_machine",
    title: "The Ghost in the Silicon: Conciousness & AI",
    type: "Debate",
    date: "July 14, 2026",
    time: "18:00 UTC",
    location: "Virtual (Discord Auditorium)",
    emoji: "🧠",
    summary: "A rigorous panel debate questioning whether artificial general intelligence can ever possess authentic subjective experience.",
    description: "Join us as we host two external researchers and our own Development Team Leads to dissect the physicalist vs. dualist perspectives on machine learning. Is consciousness a property of complexity, or is there a fundamental biological barrier? This debate is open to all members, and audience voting will be live throughout the session.",
    speaker: "Moderated by Dr. Arthur Pendelton",
    capacity: 250,
    status: "upcoming"
  },
  {
    id: "evt_space_ethics",
    title: "Space-Age Ethics & Cosmopolitan Duty",
    type: "Seminar",
    date: "July 08, 2026",
    time: "17:00 UTC",
    location: "Virtual (Athens Hall)",
    emoji: "🚀",
    summary: "An exploration of human duty, resource allocation, and sovereignty as we transition to a multi-planetary species.",
    description: "Who owns the craters of the moon? Do earth-bound ethical contracts apply when a colony is light-minutes away? This seminar dives into space law, utilitarian distributions of celestial resources, and the philosophical frameworks necessary to avoid repeating terrestrial colonial mistakes.",
    speaker: "Elena Rostova & Cassandra Blake",
    capacity: 150,
    status: "upcoming"
  },
  {
    id: "evt_writing_collab",
    title: "Collaborative Epistemology Essay Sprints",
    type: "Workshop",
    date: "July 03, 2026",
    time: "15:00 UTC",
    location: "Online Collaborative Workspace",
    emoji: "✍️",
    summary: "A high-intensity, hands-on workshop focused on drafting community articles for the upcoming CoM Journal.",
    description: "This hands-on sprint will guide writers through co-authoring techniques. We will split into groups of three, formulate hypotheses regarding modern informational noise, and outline full papers. Exceptional outlines will be selected for priority review and publication in our next journal issue.",
    speaker: "Evelyn Reed",
    capacity: 50,
    status: "completed"
  },
  {
    id: "evt_crypto_state",
    title: "The Architecture of Network States",
    type: "Salon",
    date: "June 28, 2026",
    time: "19:00 UTC",
    location: "Virtual (The Library)",
    emoji: "🏛️",
    summary: "Analyzing Balaji Srinivasan's network state model and the future of physical-digital hybrid citizenship.",
    description: "Can clouds first build communities, and then buy land? In this intimate salon, we trace the history of micro-nations, digital sovereignty, and the viability of decentralized crowdfunding of physical land with custom legal boundaries.",
    speaker: "Zackary Vance",
    capacity: 80,
    status: "completed"
  },
  {
    id: "evt_generative_art",
    title: "Generative Systems & Post-Human Aesthetics",
    type: "Workshop",
    date: "June 20, 2026",
    time: "16:00 UTC",
    location: "Online Creative Lab",
    emoji: "👾",
    summary: "Coding visual and sonic models that grow dynamically based on community user telemetry.",
    description: "A specialized workshop where developers and artists collaborate. We will build basic cellular automata systems using p5.js and explore how decentralized algorithms mimic organic growth and create aesthetic values independent of human intent.",
    speaker: "Aria Sterling & Marcus Vance",
    capacity: 60,
    status: "completed"
  },
  {
    id: "evt_free_will",
    title: "Neuro-Determinism: Is Free Will An Illusion?",
    type: "Debate",
    date: "June 12, 2026",
    time: "18:00 UTC",
    location: "Virtual (Athens Hall)",
    emoji: "⚖️",
    summary: "Reconciling modern fMRI evidence with the classical concept of personal moral responsibility.",
    description: "If our choices are prepared by neural pathways seconds before we consciously experience them, where does guilt, merit, or justice reside? This debate interrogates compatibilist positions and the radical materialist worldview of the brain as a purely biochemical machine.",
    speaker: "Arthur Pendelton vs. Guest Philosopher Dr. Vance",
    capacity: 200,
    status: "completed"
  },
  {
    id: "evt_cyber_sovereignty",
    title: "Sovereignty in the Age of Dark Fiber",
    type: "Symposium",
    date: "June 05, 2026",
    time: "14:00 UTC",
    location: "Virtual (Discord)",
    emoji: "🔒",
    summary: "A symposium on cryptography, decentralized identity, and escaping digital surveillance panopticons.",
    description: "Our quarterly research symposium featuring four short paper presentations. Topics cover peer-to-peer routing protocols, end-to-end encrypted identity, and how micro-communities can safeguard their collaborative research from corporate scraping.",
    speaker: "Hosted by Silas Drake",
    capacity: 300,
    status: "completed"
  },
  {
    id: "evt_stoic_ai",
    title: "Stoicism for the Digital Nomad",
    type: "Salon",
    date: "May 25, 2026",
    time: "18:30 UTC",
    location: "Virtual (The Library)",
    emoji: "🧘",
    summary: "Applying ancient Epictetian principles to manage screen fatigue, social noise, and virtual anxiety.",
    description: "How does one maintain inner fortress (ataraxia) when bombarded with notifications and algorithms optimized for outrage? We explore practical mental exercises from Seneca, Epictetus, and Marcus Aurelius tailored specifically for the hyper-connected individual.",
    speaker: "Julian Thorne",
    capacity: 90,
    status: "completed"
  },
  {
    id: "evt_bio_hacking",
    title: "Somatic Sovereignty: CRISPR & The Future of Evolution",
    type: "Seminar",
    date: "May 18, 2026",
    time: "17:00 UTC",
    location: "Virtual (Athens Hall)",
    emoji: "🧬",
    summary: "A seminar assessing the bioethics of germline editing and the democratization of molecular biology.",
    description: "Should individuals have the absolute right to edit their own genomes? In this seminar, we examine the rapid rise of biohacking, the safety profiles of DIY CRISPR kits, and the ethical divide between human enhancement and genetic inequality.",
    speaker: "Elena Rostova",
    capacity: 120,
    status: "completed"
  }
];

*/