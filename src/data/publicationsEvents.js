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
    description: "I'm currently organizing this practitioner-focused AI conference, having recruited 50% of the speaker lineup and curating technical content on the latest models, practical case studies, and real-world deployment challenges",
  },
  {
    type: "conference",
    title: "Driving IT",
    date: "2025 Nov",
    link: "https://videos.ida.dk/playlist/dedicated/1_dzazyzy3/1_bhfea5je",
    venue: "IDA",
    description: "Denmark's premier IT conference spanning software development, AI, security, UX, and sustainability. As session chair for the AI track, I brought in roughly 18% of speakers for this 600+ attendee conference",
  },
  {
    type: "conference",
    title: "Driving AI",
    date: "2025 May",
    link: "https://videos.ida.dk/playlist/dedicated/1_i5sq6z3e/1_g71c2wiu",
    venue: "IDA",
    description: "I played a key role in shaping this inaugural practitioner-focused AI conference, sourcing nearly half of the speaker lineup and chairing one of the technical tracks",
  }
];

export default publicationsEvents;
