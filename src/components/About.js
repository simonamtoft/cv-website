import React from 'react';
import '../styles/About.css';
import ProfilePicture from '../assets/profile.jpeg'

const About = () => {
  return (
    <section className="about">
      <div>
        <h2>About Me</h2>
      </div>
      <div className='about-content'>
        <div className='about-image'>
          <img src={ProfilePicture} alt="profile" className='profile-picture'/>
        </div>
        <div className='about-text'>
          <p>
            Driven by a fascination for mathematics and engineering, my journey into technology began with an electrical engineering background.
            The programming and machine learning I encountered during my studies sparked a passion for AI and data science, which I pursued with
            a specialized master's degree.
          </p>
          <p>
            As a Senior Data Scientist at Stibo Systems, I now apply this foundation to develop practical, scalable AI solutions for
            real-world business challenges. I leverage deep technical expertise to translate complex requirements into effective,
            enterprise-level strategies. I also mentor team members to foster a culture of innovation and excellence.
          </p>
          <p>
            Beyond my professional role, I am actively involved in the Danish data science community. I am passionate about sharing knowledge and
            fostering growth, whether through organizing conferences like IDA's Driving AI and Driving IT, participating in community events,
            or contributing to open-source projects. I also engage with academic institutions to help bridge the gap between theoretical
            learning and industry practice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;