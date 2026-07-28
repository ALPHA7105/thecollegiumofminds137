export interface RecognitionItem {
  id: string;
  name: string;
  role: string;
  reason: string;
  badge: 'Founder' | 'Writer' | 'Community' | 'Patron' | 'Researcher' | 'Speaker' | 'Contributor';
  isFeatured?: boolean;
  links: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const recognitionsData: RecognitionItem[] = [
  {
    id: "sarvesh-kore",
    name: "Sarvesh Kore",
    role: "Founder",
    reason: "Founded the Collegium of Minds and continues to lead its vision, publications, and technological development.",
    badge: "Founder",
    isFeatured: true,
    links: {
      website: "https://sarvesh-kore.vercel.app",
      linkedin: "https://linkedin.com/in/sarvesh-kore",
      github: "https://github.com/sarveshkore"
    },
  },
  {
    id: "cosmology-contributor",
    name: "Aria Thorne",
    role: "Essay Contributor",
    reason: "Recognized for publishing insightful articles on cosmology, dark matter, and theoretical physics.",
    badge: "Writer",
    isFeatured: true,
    links: {
      linkedin: "https://linkedin.com",
      website: "https://aria-thorne.org"
    },
  },
  {
    id: "community-lead",
    name: "Marcus Vance",
    role: "Community Builder",
    reason: "Helped grow discussions and fostered meaningful scholarly conversations across multiple societies.",
    badge: "Community",
    isFeatured: true,
    links: {
      website: "https://marcusvance.io",
      twitter: "https://twitter.com"
    },
  },
  {
    id: "quantum-researcher",
    name: "Dr. Elena Rostova",
    role: "Quantum Physics Fellow",
    reason: "Pioneered research on quantum entanglement thresholds and contributed foundational peer reviews.",
    badge: "Researcher",
    isFeatured: false,
    links: {
      website: "https://elena-rostova.phys",
      linkedin: "https://linkedin.com"
    },
  },
  {
    id: "symposium-speaker",
    name: "Julian K. Mercer",
    role: "Keynote Speaker",
    reason: "Delivered acclaimed lectures on consciousness mechanics and algorithmic philosophy at CoM Assemblies.",
    badge: "Speaker",
    isFeatured: false,
    links: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
  },
  {
    id: "founding-patron",
    name: "Sylvia Chen",
    role: "Founding Patron",
    reason: "Sustained early operations, academic grants, and digital archive preservation for the Collegium.",
    badge: "Patron",
    isFeatured: false,
    links: {
      website: "https://sylviachen.fund",
      linkedin: "https://linkedin.com"
    },
  },
  {
    id: "open-source-dev",
    name: "Liam O'Connor",
    role: "Systems Contributor",
    reason: "Built interactive web visualization nodes and real-time polling infrastructure for member symposia.",
    badge: "Contributor",
    isFeatured: false,
    links: {
      github: "https://github.com",
      twitter: "https://twitter.com"
    },
  },
  {
    id: "math-scribe",
    name: "Prof. Hiroshi Tanaka",
    role: "Mathematics Fellow",
    reason: "Author of the transfinite card series and regular editor of the CoM Notebook Gazette.",
    badge: "Writer",
    isFeatured: false,
    links: {
      website: "https://tanaka-math.org"
    },
  }
];
