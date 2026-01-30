import React, { useEffect, useRef } from 'react';
import '../styles/PublicationsEvents.css';
import publicationsEvents from '../data/publicationsEvents';

const PublicationsEvents = () => {
  const publicationsEventsRef = useRef(null);

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

    const currentRef = publicationsEventsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Helper function to format authors
  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return null;
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

    const lastAuthor = authors[authors.length - 1];
    const otherAuthors = authors.slice(0, -1).join(', ');
    return `${otherAuthors}, and ${lastAuthor}`;
  };

  // Parse date for sorting (simple parser for "YYYY MMM" or "MMM YYYY" format)
  const parseDate = (dateStr) => {
    const months = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };

    const parts = dateStr.split(' ');
    let year, month;

    if (parts.length === 2) {
      // Could be "YYYY MMM" or "MMM YYYY"
      if (isNaN(parts[0])) {
        // "MMM YYYY"
        month = months[parts[0]] || 1;
        year = parseInt(parts[1]);
      } else {
        // "YYYY MMM"
        year = parseInt(parts[0]);
        month = months[parts[1]] || 1;
      }
    } else {
      // Single year
      year = parseInt(dateStr);
      month = 1;
    }

    return new Date(year, month - 1);
  };

  // Sort items by date (most recent first)
  const sortedWork = [...publicationsEvents].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });

  return (
    <section className="publications-events" ref={publicationsEventsRef}>
      <h2>Publications & Events</h2>
      <div className="publications-events-container">
        {sortedWork.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`work-card work-card-${item.type}`}
          >
            <div className="work-card-header">
              <div className={`work-type-badge work-type-${item.type}`}>
                <i className={`fas ${item.type === 'article' ? 'fa-file-alt' : 'fa-chalkboard-teacher'}`}></i>
                <span>{item.type === 'article' ? 'Article' : 'Conference'}</span>
              </div>
              <div className="work-link-indicator">
                <i className="fas fa-external-link-alt"></i>
              </div>
            </div>

            <div className="work-title-container">
              <h3 className="work-title">{item.title}</h3>
              {item.originalTitle && (
                <p className="work-original-title">{item.originalTitle}</p>
              )}
            </div>

            <div className="work-metadata">
              <span className="work-date">{item.date}</span>
              {item.venue && (
                <>
                  <span className="work-separator">|</span>
                  <span className="work-venue">{item.venue}</span>
                </>
              )}
            </div>

            {item.description && (
              <p className="work-description">{item.description}</p>
            )}

            {item.authors && (
              <p className="work-authors">
                <span className="authors-label">Authors: </span>
                {formatAuthors(item.authors)}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default PublicationsEvents;
