import React from 'react';
import Stibo_logo from '../assets/Stibo_logo.png';
import Terma_logo from '../assets/Terma_logo.svg';


const workExperience = [
  {
    jobTitle: "Senior Data Scientist",
    companyName: "Stibo Systems",
    start: "2025 May",
    end: "now",
    text: <>
    Today, I lead AI projects and help shape Stibo Systems' machine learning strategy.
    My focus is on architecting end-to-end solutions that deliver measurable business impact while fostering a culture of technical excellence.
    I continue to mentor, guide innovation initiatives, and ensure our AI products scale effectively across global enterprises.
    </>,
    icon: Stibo_logo
  }, {
    jobTitle: "Data Scientist",
    companyName: "Stibo Systems",
    start: "2022 Nov",
    end: "2025 Apr",
    text: <>
    At <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a>, I shifted into a role focused on delivering AI-driven solutions for enterprise clients.
    I partnered with stakeholders to frame business challenges and rapidly prototype high-impact use cases.
    I led the implementation of a centralized Feature Store to accelerate model deployment and standardized ML pipelines using MLflow and GitLab CI/CD,
    improving reproducibility and scalability. Alongside technical delivery, I mentored junior data scientists and collaborated with universities
    through the Stibo Systems Accelerator, advancing innovation and talent development.
    </>,
    icon: Stibo_logo
  }, {
    jobTitle: "Student Developer",
    companyName: "TERMA Group",
    start: "2020 Jul",
    end: "2022 Jun",
    text: <>
    I started my career in <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>'s AI team, where I worked on projects that blended data engineering, visualization, and machine learning.
    I built ETL pipelines for anomaly detection, designed GIS-integrated dashboards to visualize live ship positions, and deployed computer
    vision models on edge devices for real-time detection. These experiences taught me how to move from concept to operational solutions and sparked my passion for AI systems.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;