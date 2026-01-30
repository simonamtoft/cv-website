import React, { useEffect, useRef, useMemo, useState } from 'react';
import '../styles/Timeline.css';
import workExperience from '../data/workExperience';
import education from '../data/education';
import volunteering from '../data/volunteering';
import { formatDisplayRange, getComparableTime } from '../utils/dateFormatter';

const Timeline = () => {

  // sort earliest to latest, prefer month-aware start/end if provided
  // Memoized to prevent unnecessary re-sorts on every render
  const timelineItems = useMemo(
    () =>
      [...workExperience, ...education, ...volunteering].sort((a, b) => {
        const aStart = a.start ?? a.startYear;
        const bStart = b.start ?? b.startYear;
        return getComparableTime(aStart) - getComparableTime(bStart);
      }),
    []
  );

  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const currentItemRefs = itemRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = currentItemRefs.indexOf(entry.target);
          if (index !== -1) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              } else {
                newSet.delete(index);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the item is visible
      }
    );

    currentItemRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentItemRefs.forEach((ref) => {
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
          key={`${item.start ?? item.startYear}-${item.companyName || item.text?.toString().substring(0, 20)}`}
          className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'} ${visibleItems.has(index) ? 'is-visible' : ''}`}
          ref={el => itemRefs.current[index] = el}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-date-text-container">
          <div className="timeline-number">
            {formatDisplayRange(item.start ?? item.startYear, item.end ?? item.endYear)}
          </div>
            <div className="timeline-content">
              <p>{item.text}</p>
            </div>
          </div>
          <div className="timeline-icon-container">
            <img src={item.icon} alt="Icon" className="timeline-icon" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;