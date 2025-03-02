import React from 'react';
import Stibo_logo from '../assets/Stibo_logo.png';
import Terma_logo from '../assets/Terma_logo.png';


const workExperience = [
  {
    jobTitle: "Data Scientist",
    companyName: "Stibo Systems",
    endYear: "now",
    startYear: "2022",
    text: <>
    I started my career as a Data Scientist at <a href="https://www.stibosystems.com/" target="_blank" rel="noopener noreferrer">Stibo Systems</a> in the
    Product Innovation team, where I specialized in natural language processing for text classification, ranking,
    and fine-grained classification challenges. My role involved collaborating closely with customers to design and
    implement cutting-edge machine learning solutions tailored to their business needs. This hands-on experience
    deepened my expertise in applied AI while reinforcing my passion for solving real-world problems with data.
    </>,
    icon: Stibo_logo
  }, {
    jobTitle: "Student Developer",
    companyName: "TERMA Group",
    endYear: "2022",
    startYear: "2020",
    text: <>
    As a student developer in the AI team at <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>, I worked on
    multiple projects, including developing ETL pipelines for data ingestion, creating a React-based website for
    visualizing live ship positions and directions using live GIS data, establishing a proof of concept for what later became
    the <a href="https://www.terma.com/news-events/news/news-archive/2023/ai-surveillance-spacecraft-successfully-passes-design-review/" target="_blank" rel="noopener noreferrer">BIFROST project</a>,
    and evaluating sensory data for anomaly detection.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;