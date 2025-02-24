import React from 'react';
import DTU_logo from '../assets/DTU_logo.png';
import UMD_logo from '../assets/UMD_logo.png';

const education = [
  {
    text: <>
    MSc at the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a>, where I specialized in
    machine learning for computer vision and latent variable models. As an honorary student under <a href="https://www.dtu.dk/person/ole-winther?id=10167&entity=profile" target="_blank" rel="noopener noreferrer">Ole Winther</a>,
    I collaborated with Giorgio Giannone, gaining hands-on experience in advanced probabilistic modeling and machine learning techniques.
    My masters thesis focused on optimizing the infernece time of generative models for image generation, specifically the denoising diffusion probabilistic models.
    </>,
    endYear: "2022",
    startYear: "2020",
    icon: DTU_logo
  }, {
    text: <>
    During my exchange at the <a href="https://umd.edu/" target="_blank" rel="noopener noreferrer">University of Maryland, College Park</a>, I took my first
    machine learning course, sparking my passion for AI and data science.
    </>,
    endYear: "2019 Fall",
    startYear: "2019 Fall",
    icon: UMD_logo
  }, {
    text: <>
    BSc at the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a> in Electrical Engineering.
    During my time at DTU, I built a strong foundation in physics, exploring the fundamental principles that underpin
    electrical engineering. Along the way, I was introduced to programming, which quickly became a key area of interest.
    This exposure sparked my passion for software development, ultimately leading me to pursue it further.
    My studies not only provided me with technical knowledge but also shaped my problem-solving mindset, bridging the
    gap between hardware and software. I concluded my bachelor's degree with a thesis on the design and implementation 
    of <a href='https://amtoft.dev' target="_blank" rel="noopener noreferrer">Chora</a>, a web-based instruction set simulator
    of <a href="https://backend.orbit.dtu.dk/ws/portalfiles/portal/145805464/patmos.pdf" target="_blank" rel="noopener noreferrer">patmos</a>.
    </>,
    endYear: "2020",
    startYear: "2017",
    icon: DTU_logo
  }
]

export default education;