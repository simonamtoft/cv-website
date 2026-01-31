import React from 'react';
import DTU_logo from '../assets/DTU_logo.png';
import UMD_logo from '../assets/UMD_logo.png';

const education = [
  {
    degree: "MSc in Mathematical Modelling and Computation",
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
        name: "Introduction to Machine Learning",
        description: "Machine Learning studies representations and algorithms that allow machines to improve their performance on a task from experience. Broad overview of existing methods for machine learning and introduction to adaptive systems with emphasis on practical aspects of machine learning and data mining."
      }, {
        number: "ENEE 324",
        name: "Engineering Probability",
        description: "Axioms of probability, conditional probability and Bayes' rules, random variables, probability distribution and densities, functions of random variables, weak law of large numbers and central limit theorem. Introduction to random processes, correlation functions, spectral densities, and linear systems."
      }, {
        number: "ENEE 222",
        name: "Discrete Signal Analysis",
        description: "Discrete- and continuous-time signals, sampling of sinusoids, Discrete Fourier transform properties and applications, periodic signals and Fourier series, discrete-time linear filters in time and frequency domains."
      }, {
        number: "ENCE 320",
        name: "Introduction to Project Management",
        description: "Principles and techniques of managing engineering projects from initiation through planning, execution, monitoring & control, and closeout. Topics include estimating, budgeting, scheduling, resource allocation, quality management, leadership, and professional responsibility."
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
        number: "B01",
        name: "Bachelor Project",
        description: "Bachelor thesis project developing a Patmos instruction set simulator."
      },
      {
        number: "02180",
        name: "Introduction to Artificial Intelligence",
        description: "Basic notions and techniques in AI, focusing on symbolic AI, search algorithms, knowledge representation in logic, and inference techniques"
      },
      {
        number: "02105",
        name: "Algorithms and Data Structures 1",
        description: "Introduction to fundamental algorithms and data structures with focus on construction and analysis of efficient algorithms."
      },
      {
        number: "02161",
        name: "Software Engineering 1",
        description: "Introduction to software development covering requirements, UML design, testing, and small project implementation."
      },
      {
        number: "42611",
        name: "Philosophy of Science in Engineering",
        description: "Course covering philosophical and scientific foundations of engineering practice."
      },
      {
        number: "02601",
        name: "Introduction to Numerical Algorithms",
        description: "Introduction to numerical algorithms covering linear equations, interpolation, integration, and differential equations in Python."
      },
      {
        number: "10024",
        name: "Physics 1",
        description: "Foundational mechanics course covering kinematics, forces, Newton's laws, work, energy, and momentum."
      },
      {
        number: "31015",
        name: "Project - Electrical Engineering",
        description: "Project-based course involving hands-on electrical engineering work and technical implementation."
      },
      {
        number: "31300",
        name: "Applied Control Engineering",
        description: "Fundamental control engineering covering PID control, system modeling, stability analysis, and MATLAB/Simulink."
      },
      {
        number: "31605",
        name: "Continuous-Time Signals and Linear Systems",
        description: "Analysis of linear systems and AC circuits in time, Fourier, and Laplace domains with focus on filters and measurement systems."
      },
      {
        number: "01035",
        name: "Advanced Engineering Mathematics 2",
        description: "Advanced mathematics covering infinite series, Fourier series, and systems of differential equations."
      },
      {
        number: "02155",
        name: "Computer Architecture and Engineering",
        description: "In-depth study of processor organization, pipelines, cache memory, and runtime optimization."
      },
      {
        number: "02633",
        name: "Introduction to Programming and Data Processing",
        description: "Introductory programming course using Python covering fundamentals and data processing with NumPy."
      },
      {
        number: "31400",
        name: "Electromagnetism",
        description: "Fundamental electromagnetics covering electro- and magnetostatics, Maxwell's equations, and plane waves."
      },
      {
        number: "01005",
        name: "Advanced Engineering Mathematics 1",
        description: "Two-semester foundation course covering linear algebra, differential equations, multivariable calculus, and vector analysis. Served as teaching assistant for one year."
      },
      {
        number: "02102",
        name: "Introductory Programming",
        description: "Basic imperative and object-oriented programming concepts with focus on design and implementation."
      },
      {
        number: "02139",
        name: "Digital Electronics 2",
        description: "Design and implementation of digital circuits using hardware description languages (Chisel) and FPGA technology."
      },
      {
        number: "26027",
        name: "Basic Chemistry",
        description: "Foundational general chemistry course covering fundamental chemical concepts and principles."
      },
      {
        number: "30010",
        name: "Programming Project",
        description: "Practical microcontroller programming in C with focus on building and testing programs for embedded systems."
      },
      {
        number: "31003",
        name: "Electric Circuits 2",
        description: "Alternating current circuits, analog signals, passive components, filters, amplifiers, and transfer functions."
      },
      {
        number: "02138",
        name: "Digital Electronics 1",
        description: "Introduction to digital electronics covering combinatorial logic, finite state machines, and VHDL."
      },
      {
        number: "31001",
        name: "Electric Circuits 1",
        description: "Fundamentals of circuit analysis including Kirchhoff's laws, Thévenin's theorem, transients, and operational amplifiers."
      },
      {
        number: "31011",
        name: "Engineering Work - Electrical Engineering",
        description: "Practical engineering work and project-based learning in electrical engineering."
      },
      {
        number: "31012",
        name: "Engineering Work 2 - Electrical Engineering",
        description: "Continuation of practical engineering work with advanced electrical engineering projects."
      }
    ]
  }
]

export default education;