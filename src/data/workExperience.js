import React from 'react';
import Stibo_logo from '../assets/Stibo_logo.png';
import Terma_logo from '../assets/Terma_logo.svg';


const workExperience = [
  {
    jobTitle: "Senior Data Scientist",
    companyName: "Stibo Systems",
    start: "2025 May",
    end: "2026 Feb",
    text: <>
    As a Senior Data Scientist at <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a>, I led AI projects and helped shape Stibo Systems' machine learning strategy.
    My focus was on architecting end-to-end solutions that delivered measurable business impact while fostering a culture of technical excellence.
    I mentored data scientists, guided innovation initiatives, and ensured our AI products scaled effectively across global enterprises, including Fortune 500 companies.
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
    At <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a>, I shifted into a role focused on delivering AI-driven solutions for enterprise clients.
    I partnered with stakeholders to frame business challenges and rapidly prototype high-impact use cases, delivering production models.
    I led the implementation of a centralized Feature Store and standardized ML pipelines using MLflow and GitLab CI/CD,
    improving reproducibility and scalability. Alongside technical delivery, I mentored junior data scientists and collaborated with universities
    through the Stibo Systems Accelerator, advancing innovation and talent development.
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
    I started my career in <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>'s AI team, where I worked on projects that blended data engineering, visualization, and machine learning.
    I built ETL pipelines for anomaly detection in maritime surveillance systems, designed GIS-integrated dashboards to visualize live ship positions, and deployed computer
    vision models on embedded edge devices for real-time detection under resource constraints. These experiences taught me how to move from concept to operational solutions and sparked my passion for AI systems.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;