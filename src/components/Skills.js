import React, { useEffect, useRef } from 'react';
import '../styles/Skills.css';
import skills from '../data/skills';

const Skills = () => {
  const skillsRef = useRef(null);

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

    const currentRef = skillsRef.current;
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
    <section className="skills" ref={skillsRef}>
      <h2>Technical Skills</h2>
      <div className="skills-container">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skill-tags">
              {skillList.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
