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
    icon: TTC_logo
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
    icon: Stibo_logo
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
    icon: Stibo_logo
  }, {
    jobTitle: "Student Developer",
    companyName: "TERMA Group",
    start: "2020 Jul",
    end: "2022 Jun",
    text: <>
    I started my career in <a href="https://www.terma.com/" target="_blank" rel="noopener noreferrer">Terma</a>'s AI team, working on projects that blended data engineering, visualisation, and machine learning.
    I built ETL pipelines for anomaly detection in maritime surveillance systems, designed GIS-integrated dashboards to visualise live ship positions, and deployed computer vision models on embedded edge devices for real-time detection under tight resource constraints.
    It was where I first learned what it takes to move an AI idea from concept to something that runs in the field.
    </>,
    icon: Terma_logo
  }
];

export default workExperience;