import Stibo_logo from '../assets/Stibo_logo.png';
import Terma_logo from '../assets/Terma_logo.svg';
import TTC_logo from '../assets/TTC_logo.svg'

const workExperience = [
  {
    jobTitle: "Senior Consultant",
    companyName: "The Tech Collective",
    start: "2026 Mar",
    end: "Now",
    text: <>
    At <a href="https://www.thetechcollective.eu/" target="_blank" rel="noopener noreferrer">The Tech Collective</a> - part of Implement Consulting Group's Digital Transformation practice - I help organisations decide where AI is worth using, and then build it.
    I work with business leaders and product owners to identify and prioritise use cases, shape them into a roadmap and set realistic success metrics.
    Then I take the solutions from proof of concept to production, with the governance needed to run them safely.
    I also built Implement's Claude Code course and help teams adopt coding agents.
    </>,
    icon: TTC_logo,
    projects: [
      {
        name: "AI Roadmap and Use-Case PoCs for a Pension Provider",
        years: "2026",
        description: "Helped a pension provider identify, scope and prioritise AI use cases and turn them into a roadmap, then built proofs of concept for two of them. One transcribes and summarises calls and tags each by call type. The other helps claims handlers work through case files of more than 1,000 pages by summarising documents, building a timeline of events and removing duplicates.",
        technologies: ["AI Roadmap", "Use-Case Prioritisation", "Speech-to-Text", "Document Summarisation", "Generative AI"]
      },
      {
        name: "Evaluation Harness for Financial Services",
        years: "2026",
        description: "Led the design and build of a configurable harness that tests ranking and suggestion strategies against historical data. Its pre-launch metrics are aligned with real user experience, so changes can be gated before they reach production. It covers both a traditional ML approach and an agentic generative-AI approach.",
        technologies: ["Evaluation", "Ranking & Recommendation", "ML", "Agentic AI"]
      },
      {
        name: "CBAM Compliance Demo Platform",
        years: "2026",
        description: "Built a bilingual demo platform for EU carbon border adjustment (CBAM) reporting across a manufacturing supply chain in Asia. It orchestrates evidence collection, review and annual verification of embedded emissions across a multi-tier supplier network. It models the regulation end to end, from supplier responses to certificate-cost exposure and an exportable reporting dossier.",
        technologies: ["Regulatory Modelling", "Supply Chain", "Workflow Orchestration", "Bilingual UI"]
      },
      {
        name: "Claude Code Course, Implement AI Academy",
        years: "2026",
        description: "Created Implement Consulting Group's Claude Code course, with video lessons and Q&A, to teach colleagues across the company to use agentic coding tools in their daily work.",
        technologies: ["Claude Code", "Agentic Engineering", "Course Design", "Teaching"]
      }
    ]
  },
  {
    jobTitle: "Senior Data Scientist",
    companyName: "Stibo Systems",
    start: "2025 May",
    end: "2026 Feb",
    text: <>
    Promoted to Senior Data Scientist at <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a>, where I led AI projects and helped shape the company's ML direction.
    I architected end-to-end solutions running in production for Fortune 500 customers, set the technical bar for the data science team, and mentored junior data scientists.
    Alongside delivery, I drove the modernisation of the underlying ML platform - feature management, model registry, CI/CD, and infrastructure-as-code - to shorten the path from prototype to production.
    </>,
    icon: Stibo_logo,
    projects: [
      {
        name: "Agentic Onboarding MVP",
        years: "2025",
        description: "Prototyped a document-to-schema assistant that automatically extracts structured attributes from uploaded PDFs and proposes field mappings into target data models, reducing manual onboarding effort.",
        technologies: ["PDF Extraction", "Document Processing", "Schema Mapping", "Agentic AI"]
      },
      {
        name: "Anomaly Detection for Data Quality",
        years: "2024-2026",
        description: "Designed and implemented an explainable anomaly detection system for master data, delivering quantile-based outlier flagging and SHAP-powered explanations across varying feature types.",
        technologies: ["SHAP", "Quantile Methods", "FastAPI", "Model Explainability"]
      },
      {
        name: "ML Infrastructure Modernisation",
        years: "2025",
        description: "Architected a platform blueprint standardizing feature management, model registry, CI/CD, and Terraform-based cloud templates to shorten POC-to-production cycles and improve reproducibility across teams.",
        technologies: ["MLflow", "Terraform", "CI/CD", "Azure", "Feature Store"]
      }
    ]
  }, {
    jobTitle: "Data Scientist",
    companyName: "Stibo Systems",
    start: "2022 Nov",
    end: "2025 Apr",
    text: <>
    Joined <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a> to deliver AI-driven solutions for enterprise clients.
    I worked directly with stakeholders to frame business problems and prototype high-impact use cases, then took the most promising ones into production.
    I led the rollout of a centralised Feature Store and standardised ML pipelines on MLflow and GitLab CI/CD, improving reproducibility across teams.
    Alongside delivery, I mentored junior data scientists and collaborated with universities through the Stibo Systems Accelerator.
    </>,
    icon: Stibo_logo,
    projects: [
      {
        name: "Taxonomy Classification",
        years: "2023-2025",
        description: "Delivered hierarchical gradient-boosted models integrated into a Fortune 500 quick-service restaurant's onboarding workflow, materially reducing time-to-market. Production-integrated since January 2024.",
        technologies: ["Hierarchical Models", "XGBoost", "Production ML", "MLOps"]
      },
      {
        name: "AI-Driven Mapping Automation",
        years: "2023-2025",
        description: "Developed semantic modeling solution using fine-tuned transformer embeddings to automatically identify attribute alignments across data sources, delivering real-time recommendations that reduced manual mapping work and accelerated onboarding.",
        technologies: ["Transformer Embeddings", "Fine-tuning", "Semantic Matching", "Real-time Inference"]
      },
      {
        name: "Coding Co-Pilot",
        years: "2023-2025",
        description: "Built a RAG-based assistant for proprietary JavaScript rules, progressing from hosted UI pilot with practitioner feedback to VS Code extension prototype with roadmap toward fine-tuning for higher precision.",
        technologies: ["RAG Architecture", "VS Code Extensions", "JavaScript", "Embeddings"]
      },
      {
        name: "Unsupervised Industry Standards Classification",
        years: "2024-2025",
        description: "Architected an agentic classification capability mapping products to industry taxonomies (ETIM/ECLASS) using transformer embeddings with human-in-the-loop review, enabling standards alignment without labeled data.",
        technologies: ["Agentic AI", "Human-in-the-loop", "Industry Taxonomies", "Unsupervised Learning"]
      },
      {
        name: "Value Prediction",
        years: "2023-2024",
        description: "Implemented Azure-hosted inference API predicting missing attribute values from partial product records, delivering confidence-aware suggestions that improved data completeness with clearer guardrails for acceptance.",
        technologies: ["Azure OpenAI", "Confidence Scoring", "FastAPI", "Production ML"]
      },
      {
        name: "Documentation Chatbot",
        years: "2023",
        description: "Developed RAG-based chatbot for technical documentation using vector search and Azure OpenAI, enabling natural language querying of internal knowledge bases and reducing support overhead.",
        technologies: ["RAG Architecture", "Vector Search", "Azure OpenAI", "Documentation"]
      }
    ]
  }, {
    jobTitle: "Student Developer",
    companyName: "TERMA Group",
    start: "2020 Jul",
    end: "2022 Jun",
    text: <>
    I started my career in <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>'s AI team, working on projects that blended data engineering, visualisation, and machine learning.
    I built ETL pipelines for anomaly detection in maritime surveillance systems, designed GIS-integrated dashboards to visualise live ship positions, and deployed computer vision models on embedded edge devices for real-time detection under tight resource constraints.
    It was where I first learned what it takes to move an AI idea from concept to something that actually runs in the field.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;