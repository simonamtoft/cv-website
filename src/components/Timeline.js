import React, { useEffect, useCallback, useRef } from 'react';
import '../styles/Timeline.css';
import workExperience from '../data/workExperience';
import education from '../data/education';


const displayYear = (startYear, endYear) => {
  return (
    startYear === endYear || !endYear
      ? startYear
      : `${startYear} - ${endYear}`
  )
}


const Timeline = () => {
  const timelineItems = [...workExperience, ...education]
    .sort((a, b) => new Date(b.endYear) - new Date(a.endYear));

  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the item is visible
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
      observer.disconnect();
    };
  }, [timelineItems]); // Re-run effect if timelineItems change

  return (
    <div className="timeline">
      {timelineItems.map((item, index) => (
        <div 
          key={index} 
          className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`}
          ref={el => itemRefs.current[index] = el}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-date-text-container">
            <div className="timeline-number">
              {displayYear(item.startYear, item.endYear)}
            </div>
            <div className="timeline-content">
              <p>{item.text}</p>
            </div>
          </div>
          <div className="timeline-icon-container">
            <img src={item.icon} alt="Icon" className="timeline-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;