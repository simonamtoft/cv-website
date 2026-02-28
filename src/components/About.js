import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import ProfilePicture from '../assets/profile.jpeg';
import config from '../config';
import aboutText from '../data/aboutText.js'

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
          <img src={ProfilePicture} alt={`${config.personalInfo.name} - ${config.personalInfo.title}`} className='profile-picture' loading="lazy"/>
        </div>
        <div className='about-text'>
          {aboutText}
        </div>
      </div>
    </section>
  );
};

export default About;