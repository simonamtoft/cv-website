import React, { useEffect, useRef } from 'react';
import '../styles/Services.css';
import services from '../data/services';

const Services = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    const currentCards = cardRefs.current;
    currentCards.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (currentSection) observer.unobserve(currentSection);
      currentCards.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <h2>Services</h2>
      <p className="services-intro">
        I work across the full spectrum of data and AI — from strategy and solution design through
        to production delivery and the infrastructure to keep it running.
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="service-card"
            ref={el => cardRefs.current[index] = el}
          >
            <div className="service-card-icon">
              <i className={`fas ${service.icon}`} aria-hidden="true"></i>
            </div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-summary">{service.summary}</p>
            <ul className="service-card-details">
              {service.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
