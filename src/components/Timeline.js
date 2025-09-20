import React, { useEffect, useRef } from 'react';
import '../styles/Timeline.css';
import workExperience from '../data/workExperience';
import education from '../data/education';
import volunteering from '../data/volunteering';


const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseFlexibleDate = (value) => {
  if (!value) return null;
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  if (lower === 'now') return new Date();

  // YYYY-MM or YYYY/MM or YYYY-MM-DD
  const isoMatch = lower.match(/^(\d{4})[-\/](\d{1,2})(?:[-\/](\d{1,2}))?$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = Math.min(Math.max(parseInt(isoMatch[2], 10), 1), 12) - 1;
    return new Date(year, month, 1);
  }

  // YYYY
  const yearOnly = lower.match(/^(\d{4})$/);
  if (yearOnly) {
    return new Date(parseInt(yearOnly[1], 10), 0, 1);
  }

  // "MMM YYYY" or "YYYY MMM"
  const monthNames = MONTH_NAMES.map((m) => m.toLowerCase());
  const monthYearA = lower.match(/^([a-z]{3,})\s+(\d{4})$/);
  if (monthYearA) {
    const mi = monthNames.indexOf(monthYearA[1].slice(0, 3));
    if (mi >= 0) return new Date(parseInt(monthYearA[2], 10), mi, 1);
  }
  const monthYearB = lower.match(/^(\d{4})\s+([a-z]{3,})$/);
  if (monthYearB) {
    const mi = monthNames.indexOf(monthYearB[2].slice(0, 3));
    if (mi >= 0) return new Date(parseInt(monthYearB[1], 10), mi, 1);
  }

  return null;
};

const formatDisplayDate = (value) => {
  if (!value) return '';
  if (typeof value === 'string' && value.trim().toLowerCase() === 'now') return 'Now';

  const parsed = parseFlexibleDate(value);
  if (!parsed) {
    // Fallback: show raw value
    return String(value);
  }

  // Detect if input had month granularity
  const text = String(value).trim();
  const hasMonth = /(\d{4}[-\/]\d{1,2})|(^[A-Za-z]{3,}\s+\d{4}$)|(^(\d{4})\s+[A-Za-z]{3,}$)|(\d{4}\s+(spring|fall))/i.test(text);
  if (hasMonth) {
    const month = MONTH_NAMES[parsed.getMonth()];
    const year = parsed.getFullYear();
    return `${month} ${year}`;
  }
  return String(parsed.getFullYear());
};

const formatDisplayRange = (startValue, endValue) => {
  const startText = formatDisplayDate(startValue);
  const endText = formatDisplayDate(endValue);
  if (!endValue || startText === endText) return startText;
  return `${startText} - ${endText}`;
};


const Timeline = () => {
  const getNumericalYear = (yearString) => {
    if (yearString === 'now') {
      return new Date().getFullYear();
    }
    
    // Check for semester suffix
    const yearParts = yearString.split(' ');
    const year = parseInt(yearParts[0], 10);
    
    if (yearParts.length > 1) {
      const semester = yearParts[1].toLowerCase();
      if (semester === 'spring') {
        return year + 0.0;
      } else if (semester === 'fall') {
        return year + 0.5;
      }
    }
    
    return year;
  };

  const getComparableTime = (value) => {
    const parsed = parseFlexibleDate(value);
    if (parsed) return parsed.getTime();
    if (typeof value === 'string') {
      const approx = getNumericalYear(value);
      if (!Number.isNaN(approx)) return new Date(Math.trunc(approx), 0, 1).getTime();
    }
    return Number.POSITIVE_INFINITY;
  };

  // sort earliest to latest, prefer month-aware start/end if provided
  const timelineItems = [...workExperience, ...education, ...volunteering]
    .sort((a, b) => {
      const aStart = a.start ?? a.startYear;
      const bStart = b.start ?? b.startYear;
      return getComparableTime(aStart) - getComparableTime(bStart);
    });

  const itemRefs = useRef([]);

  useEffect(() => {
    const currentItemRefs = itemRefs.current;
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
          key={index} 
          className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`}
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
            <img src={item.icon} alt="Icon" className="timeline-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;