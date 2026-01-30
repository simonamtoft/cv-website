import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import ProfilePicture from '../assets/profile.jpeg'

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = aboutRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="about" ref={aboutRef}>
      <div>
        <h2>About Me</h2>
      </div>
      <div className='about-content'>
        <div className='about-image'>
          <img src={ProfilePicture} alt="Simon Amtoft Pedersen - Senior Data Scientist" className='profile-picture' loading="lazy"/>
        </div>
        <div className='about-text'>
          <p>
            I love tackling complex problems with data, machine learning and software engineering.
            My journey began in electrical engineering, where I discovered a growing interest in software engineering - the ability to quickly iterate, experiment, and see immediate results. 
            That curiosity led me to machine learning, where I became fascinated by designing algorithms that learn from data and reveal insights beyond traditional approaches.
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