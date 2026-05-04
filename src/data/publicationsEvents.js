import config from '../config';

const publicationsEvents = [
  // Example data structure - replace with actual content
  // {
  //   type: "article",           // "article" or "conference"
  //   title: "Article Title",    // Required - English title
  //   originalTitle: "Titre Original", // Optional - original title if not in English
  //   date: "2024 Nov",          // Required - format: "YYYY MMM" or "MMM YYYY"
  //   link: "https://...",       // Required - external URL
  //   venue: "Publication Name", // Optional - publisher/conference name
  //   description: "Brief summary", // Optional
  //   authors: ["First Author", "Second Author"], // Optional - array of author names
  // }
  {
    type: "webinar",
    title: "Agentic Coding (3): Autonomous Coding Agents",
    originalTitle: "Kod med AI (3): Autonomous coding agents",
    date: "2026 Jun",
    link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-3-autonomous-coding-agents-366416",
    venue: "IDA AI",
    description: "Third session in the Agentic Coding series. Facilitated a discussion on autonomous agents running in the background - Ralph loops, orchestration strategies, and building systems that run unattended in production.",
  },
  {
    type: "webinar",
    title: "Agentic Coding (2): From Idea to Prototype",
    originalTitle: "Kod med AI (2): Fra idé til prototype",
    date: "2026 May",
    link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-2-fra-ide-til-prototype-366415",
    venue: "IDA AI",
    description: "Second session in the Agentic Coding series. Facilitated a practical session on accelerating the journey from concept to working prototype using AI tools.",
  },
  {
    type: "webinar",
    title: "Agentic Coding (1): Workflows That Actually Work",
    originalTitle: "Kod med AI (1): Workflows That Actually Work",
    date: "2026 May",
    link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-1-workflows-that-actually-work-366414",
    venue: "IDA AI",
    description: "First session in the Agentic Coding series, hosted for IDA AI. Walked 339 registered practitioners through practical AI-assisted coding workflows - context engineering, structured agent instructions, and concrete tooling.",
  },
  {
    type: "article",
    title: "Open source is a strategic necessity in AI: This is how we join the race",
    originalTitle: "Open source er en strategisk nødvendighed i AI: Sådan kommer vi med i kapløbet",
    date: "2026 Feb",
    link: "https://pro.ing.dk/datatech/holdning/open-source-er-en-strategisk-noedvendighed-i-ai-saadan-kommer-vi-med-i-kaploebet",
    venue: "Ingeniøren",
    authors: ["Danni Dromi", "Kenneth Enevoldsen", "Kasper Groes Albin Ludvigsen", "Rasmus Aagaard", config.personalInfo.name, "Lishuai Jing"],
  },
  {
    type: "article",
    title: "AI's carbon footprint: What do we know, and what are we guessing",
    originalTitle: "AI's klimaaftryk: Hvad ved vi, og hvad gætter vi os til",
    date: "2025 Jan",
    link: "https://pro.ing.dk/datatech/holdning/ais-klimaaftryk-hvad-ved-vi-og-hvad-gaetter-vi-os-til",
    venue: "Ingeniøren",
    authors: ["Kasper Groes Albin Ludvigsen", "Danni Dromi", "Kenneth Enevoldsen", config.personalInfo.name],
  },
  {
    type: "conference",
    title: "Driving AI",
    date: "2026 May",
    link: "https://ida.dk/driving-ai",
    venue: "IDA",
    description: "Co-organising this practitioner-focused AI conference. Recruited around half of the speaker lineup and curated the technical programme around current models, practical case studies, and real-world deployment challenges.",
  },
  {
    type: "conference",
    title: "Driving IT",
    date: "2025 Nov",
    link: "https://videos.ida.dk/playlist/dedicated/1_dzazyzy3/1_bhfea5je",
    venue: "IDA",
    description: "Denmark's main IT conference, spanning software development, AI, security, UX, and sustainability. Served as session chair for the AI track and brought in a portion of the speakers for this 300+ attendee event.",
  },
  {
    type: "conference",
    title: "Driving AI",
    date: "2025 May",
    link: "https://videos.ida.dk/playlist/dedicated/1_i5sq6z3e/1_g71c2wiu",
    venue: "IDA",
    description: "Helped shape this inaugural practitioner-focused AI conference - sourcing close to half of the speaker lineup and chairing one of the technical tracks.",
  }
];

export default publicationsEvents;
