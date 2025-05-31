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
            My journey into technology began with a fascination for mathematics and engineering, leading me to an electrical engineering background.
            My exposure to programming and machine learning during these studies ignited a strong interest in AI and data science, which I further
            pursued with a master's degree focused on the field.
          </p>
          <p>
            Today, I apply this foundation as a Data Scientist at Stibo Systems, where I focus on developing practical,
            scalable AI solutions that address real-world business challenges. My work involves leveraging technical expertise to translate complex
            requirements into effective strategies within an enterprise context.
          </p>
          <p>
            Beyond my professional role, I am actively involved in the Danish data science community. I am passionate about sharing knowledge and
            fostering growth, whether through mentoring at organizations like ReDI School, participating in community events, contributing to open
            source projects, or contributing to the organization of conferences. I also engage with academic institutions to help bridge the gap
            between theoretical learning and industry practice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;