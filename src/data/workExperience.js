import React from 'react';
import Stibo_logo from '../assets/Stibo_logo.png';
import Terma_logo from '../assets/Terma_logo.svg';


const workExperience = [
  {
    jobTitle: "Senior Data Scientist",
    companyName: "Stibo Systems",
    endYear: "now",
    startYear: "2025",
    text: <>
    In my role as Senior Data Scientist, I lead AI projects and contribute to the company's machine learning strategy. My responsibilities
    include architecting solutions and providing technical mentorship to junior data scientists.
    </>,
    icon: Stibo_logo
  }, {
    jobTitle: "Data Scientist",
    companyName: "Stibo Systems",
    endYear: "2025",
    startYear: "2022",
    text: <>
    As a Data Scientist at <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a>,
    I developed AI-driven solutions as part of innovation projects with our customers and internal stakeholders.
    My responsibilities included data engineering, deploying machine learning models, and implementing MLOps best practices with tools like MLflow,
    Azure, and GitLab CI/CD. I also contributed to the Stibo Systems Accelerator, supporting university students with their theses and
    the <a href="https://www.analytics.gatech.edu/curriculum/applied-analytics-practicum"  target="_blank" rel="noopener noreferrer">Georgia Tech advanced analytics practicum</a>.
    </>,
    icon: Stibo_logo
  }, {
    jobTitle: "Student Developer",
    companyName: "TERMA Group",
    endYear: "2022",
    startYear: "2020",
    text: <>
    As a student developer in the AI team at <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>,
    I worked on multiple projects, including developing ETL pipelines for data ingestion, creating a React-based website for visualizing live ship
    positions and directions using live GIS data, establishing a proof of concept for what later became
    the <a href="https://www.terma.com/news-events/news/news-archive/2023/ai-surveillance-spacecraft-successfully-passes-design-review/" target="_blank" rel="noopener noreferrer">BIFROST project</a>,
    and evaluating sensory data for anomaly detection.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;