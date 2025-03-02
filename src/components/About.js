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
            Growing up, my dad sparked my interest in mathematics and technology. I remember solving my first pair of
            simultaneous equations with him in 6th grade and later taking apart small electronic toys to see how they
            worked. That curiosity later led me to assembling my own PC and keyboards, giving me a better understanding
            of how different components work together.
          </p>
          <p>
            My early fascination led me to pursue a bachelor's degree in electrical engineering - a journey through math, 
            physics, and programming that eventually inspired me to complete a master’s in engineering mathematical
            modelling. This academic path taught me how to translate complex systems into practical, data-driven solutions.
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