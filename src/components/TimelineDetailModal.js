import React, { useEffect } from 'react';
import '../styles/TimelineDetailModal.css';

const TimelineDetailModal = ({ isOpen, onClose, item }) => {
  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="modal-header">
          {item.jobTitle && <h2 id="modal-title">{item.jobTitle}</h2>}
          {item.degree && <h2 id="modal-title">{item.degree}</h2>}
          {item.companyName && <h3>{item.companyName}</h3>}
          {item.institution && <h3>{item.institution}</h3>}
          <p className="modal-dates">{item.start} - {item.end}</p>
        </div>

        <div className="modal-body">
          <div className="modal-description">{item.text}</div>

          {/* Projects section for work experience */}
          {item.projects && item.projects.length > 0 && (
            <div className="modal-projects">
              <h3>Key Projects</h3>
              {item.projects.map((project, idx) => (
                <div key={idx} className="project-card">
                  <div className="project-header">
                    <h4>{project.name}</h4>
                    {project.years && <span className="project-years">{project.years}</span>}
                  </div>
                  <p>{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Coursework table for education */}
          {item.courses && item.courses.length > 0 && (
            <div className="modal-courses">
              <h3>Coursework</h3>
              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Course No.</th>
                    <th>Course</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.courses.map((course, idx) => (
                    <tr key={idx}>
                      <td className="course-number">{course.number || '—'}</td>
                      <td>{course.name}</td>
                      <td>{course.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineDetailModal;
