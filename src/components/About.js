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
            My early passion for mathematics and technology led me to pursue a bachelor's degree in electrical
            engineering, where I took courses in programming and machine learning. This sparked my interest in the
            field and led me to complete a master’s in mathematical modeling & computing, focusing on machine learning. 
          </p>
          <p>
            Today, I work as a Machine Learning Specialist at Stibo Systems, where I combine technical expertise with
            creative problem solving to develop scalable AI solutions. My role involves translating complex business
            challenges into efficient, AI-driven strategies that improve both internal operations and enterprise software.
          </p>
          <p>
            Alongside my professional work, I’ve become increasingly involved in Denmark’s data science community.
            Whether it’s mentoring at ReDI School, participating in DDSC events, or organizing the IDA Driving AI event,
            I’m committed to sharing knowledge and fostering a collaborative tech environment. Collaborating with
            institutions like Aarhus University, VIA University College, and Georgia Tech further allows me to guide
            students through real-world AI challenges, bridging the gap between academia and industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;