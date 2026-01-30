import React, { useEffect, useRef } from 'react';
import '../styles/Contact.css';
import config from '../config';

const Contact = () => {
  const contactRef = useRef(null);

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

    const currentRef = contactRef.current;
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
    <div className="contact" ref={contactRef}>
      <h2>Reach Out!</h2>
      <p>
        AI and machine learning are evolving fast, and the best ideas come from collaboration.
        Whether you're exploring AI-driven solutions, wanting to participate in next year's Driving AI event, or just want to chat
        about the future of data science, I'd love to hear from you!
      </p>
      <div className="contact-info">
        <p>
          <i className="fas fa-envelope" aria-label="Email"></i> Email: <a href={`mailto:${config.personalInfo.email}`}>{config.personalInfo.email}</a>
        </p>
        <p>
          <i className="fab fa-linkedin" aria-label="LinkedIn"></i> LinkedIn: <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer">{config.personalInfo.linkedIn.handle}</a>
        </p>
      </div>
      <p>
        Let's connect and build something exciting together!
      </p>
    </div>
  );
};

export default Contact;