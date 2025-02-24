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
            My journey into AI and machine learning wasn’t just about crunching numbers - it was about solving real-world challenges with intelligent solutions. With a background in engineering mathematics, I’ve always been drawn to the intersection of logic and creativity. Today, as a Machine Learning Specialist at Stibo Systems, I transform complex business problems into scalable AI-driven solutions that power both internal operations and enterprise software.
          </p>
          <p>
            Beyond my work, I’m deeply embedded in Denmark’s data science community. Whether it’s participating in DDSC events, mentoring at ReDI School to help underrepresented groups break into tech, or curating thought-provoking discussions for the IDA Driving AI event, I thrive on sharing knowledge and shaping the future of AI. I also collaborate with top universities like Aarhus University and Georgia Tech, guiding thesis students through real-world AI challenges.
          </p>
          <p>
            For me, machine learning isn’t just about models and algorithms - it’s about impact. It’s about building systems that enhance decision-making, optimize data management, and ultimately, make technology more human-centered.
          </p>
          <p>
            Let’s connect and talk about AI, machine learning, and the exciting future ahead!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;