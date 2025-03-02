import React from 'react';
import DTU_logo from '../assets/DTU_logo.png';
import UMD_logo from '../assets/UMD_logo.png';

const education = [
  {
    text: <>
    MSc at the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a>, where I specialized in
    machine learning for computer vision and latent variable models. As an honorary student under <a href="https://www.dtu.dk/person/ole-winther?id=10167&entity=profile" target="_blank" rel="noopener noreferrer">Ole Winther</a>,
    I collaborated with Giorgio Giannone, gaining hands-on experience in advanced probabilistic modeling and machine learning techniques.
    My masters thesis focused on optimizing the inference time of generative models for image generation, specifically the denoising diffusion probabilistic models.
    </>,
    endYear: "2022",
    startYear: "2020",
    icon: DTU_logo
  }, {
    text: <>
    Exchange semester at the <a href="https://umd.edu/" target="_blank" rel="noopener noreferrer">University of Maryland, College Park</a>,
    where I took my first machine learning course, sparking my interest in AI and data science. The experience opened
    my eyes to new ideas and practical challenges, and I was honored to receive academic honors for the semester.
    </>,
    endYear: "2019 Fall",
    startYear: "2019 Fall",
    icon: UMD_logo
  }, {
    text: <>
    BSc in Electrical Engineering from the <a href="https://www.dtu.dk/english/" target="_blank" rel="noopener noreferrer">Technical University of Denmark (DTU)</a>.
    During my studies at DTU, I developed a strong foundation in physics and engineering principles while being
    introduced to programming - a field that quickly captured my interest. I also had the opportunity to serve as a
    teaching assistant in engineering mathematics for a year, which enriched my understanding and communication of
    complex concepts. I concluded my bachelor's degree with a thesis on the design and implementation of Chora, a
    web-based instruction set simulator of <a href="https://backend.orbit.dtu.dk/ws/portalfiles/portal/145805464/patmos.pdf" target="_blank" rel="noopener noreferrer">patmos</a>.
    </>,
    endYear: "2020",
    startYear: "2017",
    icon: DTU_logo
  }
]

export default education;