export interface Speaker {
  name: string;
  role: string;
  emoji: string;
  bio: string;
  quote?: string;
}

export const speakerDetails: Record<string, Speaker> = {
  "Aryan Kumar": {
    name: "Aryan Kumar",
    role: "Speaker / Contributer",
    emoji: "🗣️",
    bio: "A 13 year old with a profound interest in astronomy and physics. YouTube channel: https://www.youtube.com/@aryansworld5781",
  },
  "Elena Rostova": {
    name: "Elena Rostova",
    role: "Research Lead / Neuro-philosopher",
    emoji: "🔬",
    bio: "Elena operates on the boundary of cognitive science, neuro-philosophy, and speculative inquiry. She conducts deep-dive investigations into emerging cognitive technologies and tools, providing the analytical foundation that supports CoM’s research initiatives.",
    quote: "Underneath every great initiative lies a mountain of quiet research."
  },
  "Cassandra Blake": {
    name: "Cassandra Blake",
    role: "Events Lead / Dialogue Curator",
    emoji: "🎤",
    bio: "An energetic coordinator who loves the spark of live dialogue. Cassandra curates and hosts our debates, guest lectures, educational workshops, and symposiums, turning abstract topics into vibrant, highly engaging community events.",
    quote: "The best ideas are born in the electric current of active conversation."
  },
  "Evelyn Reed": {
    name: "Evelyn Reed",
    role: "Publications Coordinator / Editor",
    emoji: "✍️",
    bio: "Evelyn is a creative writer and academic editor who oversees CoM’s journals, newsletters, and collaborative essay workshops. She helps researchers and community authors refine their hypotheses and publish clean, high-signal essays.",
    quote: "Writing is not just a tool for expression; it is the laboratory where thoughts are distilled."
  },
  "Zackary Vance": {
    name: "Zackary Vance",
    role: "Initiatives Lead / Network Theorist",
    emoji: "💡",
    bio: "Zackary believes in the power of structured collaborative experiments. He designs and coordinates our interactive projects, writing challenges, intellectual competitions, and decentralized micro-communities.",
    quote: "An initiative is a bridge from passive thought to active creation."
  },
  "Aria Sterling": {
    name: "Aria Sterling",
    role: "Website Coordinator / Frontend Architect",
    emoji: "🌐",
    bio: "A full-stack developer with a love for responsive geometry and clean, minimalist typography. Aria maintains the CoM website, publishing new articles, updating interactive components, and building CoM's digital tools.",
    quote: "A well-coded interface is like a clean, open window to the mind."
  },
  "Marcus Vance": {
    name: "Marcus Vance",
    role: "Media Coordinator / Sound Artist",
    emoji: "🎨",
    bio: "Marcus Vance is an audio designer and digital artist who curates CoM's media archives, podcasts, and aesthetic design. He explores algorithmic systems and sensory experiences that challenge conventional human perception.",
    quote: "In the space between sound and silence, we find the cadence of pure thought."
  },
  "Silas Drake": {
    name: "Silas Drake",
    role: "Outreach Coordinator",
    emoji: "🌱",
    bio: "Silas connects minds across conventional boundaries. He specializes in welcoming new members into our circle, gathering constructive feedback, and exploring intellectual collaborations with external societies, research labs, and universities.",
    quote: "Growth is not about volume; it is about cultivating fertile soil for ideas."
  },
  "Julian Thorne": {
    name: "Julian Thorne",
    role: "Documentation Coordinator / Archivist",
    emoji: "📚",
    bio: "Julian Thorne is an archivist specializing in digital preservation and historical record-keeping. He manages CoM's growing libraries, debate transcripts, organizational guidelines, and knowledge maps.",
    quote: "Without an archive, we are travelers in a dark forest without a map."
  },
  "Guest Philosopher Dr. Vance": {
    name: "Guest Philosopher Dr. Vance",
    role: "Guest Scholar / Professor of Cognitive Science",
    emoji: "🎓",
    bio: "Dr. Frederick Vance is an external researcher and cognitive scientist specializing in the cognitive neuroscience of decision-making. He is a frequent guest speaker and friendly debater at the Collegium.",
    quote: "What we call choice is often just the biological machinery singing its pre-recorded melody."
  }
};

// Map raw event speaker string to an array of speaker detail keys
export function resolveSpeakers(rawSpeakerString: string | undefined): Speaker[] {
  if (!rawSpeakerString) return [];
  
  const speakers: Speaker[] = [];
  
  // Clean prefix if any
  let cleanString = rawSpeakerString
    .replace(/^Moderated by /i, '')
    .replace(/^Hosted by /i, '');
    
  // Check common splitters: " & " or " vs. "
  const parts = cleanString.split(/\s+(?:&|vs\.)\s+/);
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (speakerDetails[trimmed]) {
      speakers.push(speakerDetails[trimmed]);
    } else {
      // Look for fuzzy matching
      const foundKey = Object.keys(speakerDetails).find(key => 
        trimmed.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(trimmed.toLowerCase())
      );
      if (foundKey) {
        speakers.push(speakerDetails[foundKey]);
      } else {
        // Create generic fallback
        speakers.push({
          name: trimmed,
          role: "Speaker / Contributor",
          emoji: "👤",
          bio: "A valued contributor and participant in the intellectual assemblies at the Collegium of Minds."
        });
      }
    }
  }
  
  return speakers;
}
