// Each entry is either a group (a series or recurring event that owns its
// general description and its `events`) or a one-off talk with no `events`.
// Group events inherit the group's `type`. A group's `link` points to the
// recurring event's own page, which always shows the next edition; a group's
// `playlist` gathers the recordings of all its events.
const talks = [
  {
    type: "webinar",
    title: "Agentic Coding",
    originalTitle: "Kod med AI",
    playlist: "https://videos.ida.dk/playlist/dedicated/1_0rn33omh/1_e43bk1om",
    description: "A webinar series I organise, host and facilitate for IDA AI on building software with AI coding agents, from everyday workflows and prototyping to autonomous agents, harness engineering, and sandboxing. The series set a new IDA record for participants in a technical webinar.",
    events: [
      {
        title: "Session 5: A Secure Sandbox for Your Coding Agent",
        originalTitle: "Kod med AI (5): Sikker sandkasse til din kodeagent",
        date: "2026 Nov",
        link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-5-sikker-sandkasse-til-din-kodeagent-368803",
        venue: "IDA AI",
        description: "Allowlists, Docker, and dev containers to limit what a coding agent can access and do while it works unattended.",
        metrics: [
          { icon: "fa-users", value: "149 participants" },
        ],
      },
      {
        title: "Session 4: Harness Engineering",
        originalTitle: "Kod med AI (4): Harness Engineering",
        date: "2026 Aug",
        link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-4-harness-engineering-367935",
        venue: "IDA AI",
        description: "Harness engineering: designing the prompts, tools, sandbox, permissions, and feedback loops around a model as one control system for a real codebase.",
        metrics: [
          { icon: "fa-star", value: "9.0/10" },
          { icon: "fa-users", value: "58 participants" },
        ],
        recording: "https://videos.ida.dk/playlist/dedicated/1_0rn33omh/1_3th7c91p",
      },
      {
        title: "Session 3: Autonomous Coding Agents",
        originalTitle: "Kod med AI (3): Autonomous coding agents",
        date: "2026 Jun",
        link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-3-autonomous-coding-agents-366416",
        venue: "IDA AI",
        description: "Facilitated a discussion on background agents: Ralph loops, orchestration strategies, and systems that run unattended in production.",
        metrics: [
          { icon: "fa-star", value: "8.4/10" },
          { icon: "fa-users", value: "440 participants" },
        ],
        recording: "https://videos.ida.dk/playlist/dedicated/1_0rn33omh/1_dapgezhw",
      },
      {
        title: "Session 2: From Idea to Prototype",
        originalTitle: "Kod med AI (2): Fra idé til prototype",
        date: "2026 May",
        link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-2-fra-ide-til-prototype-366415",
        venue: "IDA AI",
        description: "Facilitated a hands-on session on getting from concept to working prototype with AI tools. Attendees singled out how well audience questions were brought into the conversation.",
        metrics: [
          { icon: "fa-star", value: "7.6/10" },
          { icon: "fa-users", value: "250 participants" },
        ],
        recording: "https://videos.ida.dk/playlist/dedicated/1_0rn33omh/1_vnb7u59n",
      },
      {
        title: "Session 1: Workflows That Actually Work",
        originalTitle: "Kod med AI (1): Workflows That Actually Work",
        date: "2026 May",
        link: "https://ida.dk/arrangementer-og-kurser/arrangementer/kod-med-ai-1-workflows-that-actually-work-366414",
        venue: "IDA AI",
        description: "Facilitated with speaker Jeppe Rasmussen: context engineering, structured agent instructions, and concrete tooling.",
        metrics: [
          { icon: "fa-star", value: "8.7/10" },
          { icon: "fa-users", value: "340 participants" },
        ],
        recording: "https://videos.ida.dk/playlist/dedicated/1_0rn33omh/1_e43bk1om",
      },
    ],
  },
  {
    type: "conference",
    title: "Driving IT",
    link: "https://ida.dk/driving-it",
    description: "IDA's main IT conference, spanning software development, AI, security, UX, and sustainability.",
    events: [
      {
        title: "Driving IT 2026",
        date: "2026 Nov",
        programme: "https://umbraco-api.ida.dk/media/jvpjol0e/driving-it-2026-program.pdf",
        venue: "IDA",
        description: "Hosted the main stage (Kongressalen), including the AI track.",
        metrics: [
          { icon: "fa-star", value: "8.6/10" },
          { icon: "fa-users", value: "345 registered" },
          { icon: "fa-microphone", value: "29 speakers" }
        ],
      },
      {
        title: "Driving IT 2025",
        date: "2025 Nov",
        recording: "https://videos.ida.dk/playlist/dedicated/1_dzazyzy3/1_bhfea5je",
        venue: "IDA",
        description: "Session chair for the AI track; brought in part of the speaker lineup.",
        metrics: [
          { icon: "fa-star", value: "9.0/10" },
          { icon: "fa-users", value: "351 participants" },
          { icon: "fa-microphone", value: "35 speakers" },
        ],
      },
    ],
  },
  {
    type: "conference",
    title: "Driving AI",
    link: "https://ida.dk/driving-ai",
    description: "A practitioner-focused AI conference on current models, practical case studies, and real-world deployment challenges.",
    events: [
      {
        title: "Driving AI 2026",
        date: "2026 May",
        recording: "https://ida.dk/driving-ai/driving-ai-genoplev-aarets-oplaeg",
        venue: "IDA",
        description: "Co-organised the conference: recruited around a third of the speakers, agreed topics and scoped talks, and curated the technical programme.",
        metrics: [
          { icon: "fa-star", value: "9.0/10" },
          { icon: "fa-users", value: "243 participants" },
          { icon: "fa-microphone", value: "31 speakers" },
        ],
      },
      {
        title: "Driving AI 2025",
        date: "2025 May",
        recording: "https://videos.ida.dk/playlist/dedicated/1_i5sq6z3e/1_g71c2wiu",
        venue: "IDA",
        description: "The inaugural edition. Sourced close to half of the speaker lineup and chaired one of the technical tracks.",
      },
    ],
  },
  {
    type: "conference",
    title: "IDA Youth Summit",
    date: "2026 Oct",
    link: "https://ida.dk/arrangementer-og-kurser/arrangementer/ida-youth-summit-2026-367866",
    venue: "IDA",
    description: "Hosted the evening programme of IDA's summit for young volunteers together with Klara Nybo Fischer-Nielsen.",
    metrics: [
      { icon: "fa-star", value: "9.0/10" },
      { icon: "fa-users", value: "68 participants" },
    ],
  },
];

export default talks;
