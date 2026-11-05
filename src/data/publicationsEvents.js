import config from '../config';

const publicationsEvents = [
  // Example data structure - replace with actual content
  // {
  //   type: "article",
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
  }
];

export default publicationsEvents;
