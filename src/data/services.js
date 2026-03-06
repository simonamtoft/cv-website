/**
 * Services / Expertise data
 * Each service area describes what clients get, not a list of technologies.
 */

const services = [
  {
    id: "ml-predictive",
    icon: "fa-chart-line",
    title: "Machine Learning & Predictive Modelling",
    summary: "Structured data problems - classification, ranking, anomaly detection, value prediction - designed for production from the start.",
    details: [
      "Hierarchical and multi-label classification for complex taxonomies",
      "Ranking and recommendation models for enterprise workflows",
      "Anomaly detection with explainable outputs (SHAP)",
      "Confidence-aware predictions with clear acceptance guardrails",
    ],
  },
  {
    id: "genai-agentic",
    icon: "fa-robot",
    title: "Generative AI & Agentic Systems",
    summary: "LLM integration that goes beyond the demo - RAG pipelines, document intelligence, and agentic workflows built for real adoption.",
    details: [
      "RAG architecture design and implementation",
      "Document processing and schema extraction pipelines",
      "Agentic workflows with human-in-the-loop review",
      "Fine-tuning and embedding-based semantic matching",
    ],
  },
  {
    id: "mlops",
    icon: "fa-cogs",
    title: "MLOps & AI Engineering",
    summary: "The infrastructure that lets models move from notebook to production and stay there - reliably, reproducibly, and at scale.",
    details: [
      "Feature stores, model registries, and CI/CD pipelines for ML",
      "Cloud-native deployment on Azure with Terraform",
      "MLflow-based experiment tracking and model versioning",
      "Platform blueprints that shorten POC-to-production cycles",
    ],
  },
  {
    id: "ai-solution-design",
    icon: "fa-drafting-compass",
    title: "AI Solution Design & Delivery",
    summary: "End-to-end delivery from problem framing to working system - bridging business context and technical execution.",
    details: [
      "Problem framing and use-case scoping with stakeholders",
      "Rapid prototyping and feasibility assessment",
      "Solution architecture for scalable, maintainable AI systems",
      "Cross-functional collaboration between data, product, and engineering",
    ],
  },
  {
    id: "data-strategy",
    icon: "fa-map",
    title: "Data Strategy & Advisory",
    summary: "Strategic guidance on where AI can make a real difference - grounded in what's technically feasible and what gets adopted.",
    details: [
      "AI readiness assessment and roadmapping",
      "Data platform and governance recommendations",
      "Technology selection and architecture review",
      "Translating board-level ambition into actionable delivery plans",
    ],
  },
];

export default services;
