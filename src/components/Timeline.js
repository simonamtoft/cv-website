import React from 'react';
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

  return (
    <div className="timeline">
      {timelineItems.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-number">
            {displayYear(item.startYear, item.endYear)}
          </div>
          <div className="timeline-dot"></div>
          <div className="timeline-icon-container">
            <img src={item.icon} alt="Icon" className="timeline-icon" /> {/* Render the image */}
          </div>
          <div className="timeline-content">
            <div className="timeline-text">
              <p>{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;