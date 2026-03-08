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
      <h2>Let's Talk</h2>
      <p className="contact-lead">
        Working on a data or AI challenge? I'm happy to have a direct conversation about
        what's feasible, what's not, and where to start.
      </p>
      <p>
        Whether you're scoping a new initiative, evaluating technical approaches, or looking
        for a speaker or collaborator - reach out.
      </p>
      <div className="contact-info">
        <p>
          <i className="fas fa-envelope" aria-label="Email"></i> <a href={`mailto:${config.personalInfo.email}`}>{config.personalInfo.email}</a>
        </p>
        <p>
          <i className="fab fa-linkedin" aria-label="LinkedIn"></i> <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer">linkedin.com/in/{config.personalInfo.linkedIn.handle}</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;