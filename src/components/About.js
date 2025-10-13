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
            I love tackling complex problems with data, machine learning and software engineering.
            My journey started in electrical engineering, but I quickly found my passion in building smart systems that make a real difference for businesses.
          </p>
          <p>
            As a Senior Data Scientist at Stibo Systems, I design and deliver scalable AI solutions that optimize processes and improve data quality
            for global enterprises. I enjoy turning complex challenges into practical results, and I am always looking for ways to help my team and clients succeed.
          </p>
          <p>
            Outside of work, I actively participate in the Danish data science community - organizing events, sharing ideas, and connecting with others who are curious about AI.
            Whether it is mentoring, collaborating on open-source projects, or bridging the gap between academia and industry, I am passionate about learning and helping others grow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;