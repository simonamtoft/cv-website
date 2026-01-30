/**
 * Central configuration file for personal information and site metadata
 */

export const config = {
  personalInfo: {
    name: "Simon Amtoft Pedersen",
    title: "Senior Data Scientist",
    subtitle: "MSc Engineering | Senior Data Scientist",
    email: "simon@amtoft.dev",
    linkedIn: {
      url: "https://www.linkedin.com/in/simonamtoft/",
      handle: "simonamtoft"
    },
    github: "https://github.com/SimonAmtoft"
  },
  siteMetadata: {
    title: "Simon Amtoft Pedersen - Senior Data Scientist & ML Engineer",
    description: "Senior Data Scientist at Stibo Systems specializing in machine learning, AI solutions, and data engineering. Building scalable ML systems for global enterprises.",
    keywords: ["Data Science", "Machine Learning", "AI", "Python", "MLOps", "Deep Learning", "Simon Amtoft Pedersen"],
    url: "https://amtoft.dev",
    image: "https://amtoft.dev/profile.jpeg"
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Resume", href: "#timeline" },
    { label: "Contact", href: "#contact" }
  ]
};

export default config;
