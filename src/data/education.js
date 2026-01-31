import React from 'react';
import DTU_logo from '../assets/DTU_logo.png';
import UMD_logo from '../assets/UMD_logo.png';

const education = [
  {
    degree: "MSc in Electrical Engineering",
    institution: "Technical University of Denmark (DTU)",
    text: <>
    MSc at the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a>,
    specializing in machine learning for computer vision and latent variable models. As an honorary student under <a href="https://www.dtu.dk/person/ole-winther?id=10167&entity=profile" target="_blank" rel="noopener noreferrer">Ole Winther</a>,
    I took three research-level courses (30 ECTS), earning top grades (12/A) in all. I collaborated closely with Giorgio Giannone throughout my honorary student work,
    gaining hands-on experience in advanced probabilistic modeling and machine learning techniques.
    My master's thesis developed novel optimization techniques to accelerate inference in denoising diffusion probabilistic models for image generation.
    </>,
    start: "2020 Aug",
    end: "2022 Jun",
    icon: DTU_logo,
    courses: [
      {
        number: "02460",
        name: "Advanced Machine Learning",
        description: "Advanced course covering current research topics in generative modeling, deep generative models, geometric representations, and graph neural networks with focus on theoretical foundations"
      },
      {
        number: "02458",
        name: "Cognitive Modelling",
        description: "Probabilistic models of cognitive processes with proficiency in analyzing behavioral psychophysical experiments using signal detection theory and Bayesian modeling frameworks"
      },
      {
        number: "S01",
        name: "Convergence in Deep Generative Models",
        description: "Independent study course on convergence properties and theoretical foundations of deep generative models (honorary student work with Ole Winther)"
      },
      {
        number: "S01",
        name: "Recurrence and Attention in Latent Variable Models",
        description: "Independent study course on recurrent architectures and attention mechanisms in latent variable models for sequential data (honorary student work with Ole Winther)"
      },
      {
        number: "02514",
        name: "Deep Learning in Computer Vision",
        description: "Advanced deep learning methods and models for computer vision applications including image recognition, sequential data, generative models, and video understanding"
      },
      {
        number: "01617",
        name: "Introduction to Dynamical Systems",
        description: "Differential equations describing evolution of variables, focusing on long-term dynamics, stability analysis, phase portraits, bifurcation theory, and chaos"
      },
      {
        number: "02456",
        name: "Deep Learning",
        description: "Statistical machine learning, feed-forward and convolutional neural networks, error back-propagation, sequence modeling with Transformers, and practical deep learning with PyTorch"
      },
      {
        number: "02502",
        name: "Image Analysis",
        description: "Fundamental tools and techniques in image analysis with examples from industrial and medical domains, taught using Python for practical implementation"
      }
    ]
  }, {
    text: <>
    Exchange semester at the <a href="https://umd.edu/" target="_blank" rel="noopener noreferrer">University of Maryland, College Park</a>.
    Here, I took my first machine learning course, sparking my interest in AI and data science. The experience opened my eyes to new ideas and
    practical challenges, and I was honored to receive academic honors for the semester.
    </>,
    start: "2019 Sep",
    end: "2019 Dec",
    icon: UMD_logo,
    courses: [
      {
        number: "CMSC 422",
        name: "Introduction to Machine Learning"
      }, {
        number: "ENEE 324",
        name: "Engineering Probability"
      }, {
        number: "ENEE 222",
        name: "Discrete Signal Analysis"
      }, {
        number: "ENCE 320",
        name: "Introduction to Project Management"
      }
    ]
  }, {
    degree: "BSc in Electrical Engineering",
    institution: "Technical University of Denmark (DTU)",
    text: <>
    BSc in Electrical Engineering from the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a>.
    During my studies, I developed a strong foundation in physics and engineering principles and was introduced to programming,
    a field that quickly captured my interest. I served as a teaching assistant in engineering mathematics for one year, an experience that
    enriched my understanding and ability to communicate complex technical concepts. My bachelor's thesis focused on the design and implementation of Chora, a web-based instruction set simulator
    for <a href="https://backend.orbit.dtu.dk/ws/portalfiles/portal/145805464/patmos.pdf" target="_blank" rel="noopener noreferrer">patmos</a>.
    </>,
    start: "2017 Aug",
    end: "2020 Jul",
    icon: DTU_logo,
    courses: [
      {
        number: "02450",
        name: "Introduction to Machine Learning and Data Mining",
        description: "Foundational course covering supervised and unsupervised learning, data preprocessing, and model evaluation"
      },
      {
        number: "02180",
        name: "Introduction to Artificial Intelligence",
        description: "Basic notions and techniques in AI, focusing on symbolic AI, search algorithms, knowledge representation in logic, and inference techniques"
      },
      {
        number: "01005/01006",
        name: "Engineering Mathematics 1 & 2",
        description: "Advanced calculus, linear algebra, and differential equations. Served as teaching assistant for one year"
      }
    ]
  }
]

export default education;