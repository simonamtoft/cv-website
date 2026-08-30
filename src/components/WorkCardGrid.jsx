import React from 'react';

// Formats an author list into a human-readable string ("A", "A and B",
// "A, B, and C").
const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return null;
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

  const lastAuthor = authors[authors.length - 1];
  const otherAuthors = authors.slice(0, -1).join(', ');
  return `${otherAuthors}, and ${lastAuthor}`;
};

// Parses "YYYY MMM", "MMM YYYY", or bare "YYYY" into a Date for sorting.
const parseDate = (dateStr) => {
  const months = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };

  const parts = dateStr.split(' ');
  let year;
  let month;

  if (parts.length === 2) {
    if (isNaN(parts[0])) {
      // "MMM YYYY"
      month = months[parts[0]] || 1;
      year = parseInt(parts[1], 10);
    } else {
      // "YYYY MMM"
      year = parseInt(parts[0], 10);
      month = months[parts[1]] || 1;
    }
  } else {
    year = parseInt(dateStr, 10);
    month = 1;
  }

  return new Date(year, month - 1);
};

const workTypeDetails = {
  article: { icon: 'fa-file-alt', label: 'Article' },
  webinar: { icon: 'fa-video', label: 'Webinar' },
  conference: { icon: 'fa-chalkboard-teacher', label: 'Conference' },
  presentation: { icon: 'fa-display', label: 'Presentation' },
};

const WorkCard = ({ item }) => {
  const showRecordingLink = !!item.recording;
  const typeDetails = workTypeDetails[item.type];
  const isExternal = item.link?.startsWith('http');
  return (
    <div className={`work-card work-card-${item.type}`}>
      {item.link && (
        <a
          href={item.link}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="work-card-link"
          aria-label={item.title}
        ></a>
      )}
      <div className="work-card-header">
        <div className={`work-type-badge work-type-${item.type}`}>
          <i className={`fas ${typeDetails.icon}`}></i>
          <span>{typeDetails.label}</span>
        </div>
        {item.link && (
          <div className="work-link-indicator">
            <i className={`fas ${isExternal ? 'fa-external-link-alt' : 'fa-arrow-right'}`}></i>
          </div>
        )}
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

      {item.metrics && item.metrics.length > 0 && (
        <div className="work-metrics">
          {item.metrics.map((metric, mIndex) => (
            <span key={mIndex} className="work-metric">
              <i className={`fas ${metric.icon}`}></i>
              <span>{metric.value}</span>
            </span>
          ))}
        </div>
      )}

      {item.description && (
        <p className="work-description">{item.description}</p>
      )}

      {showRecordingLink && (
        <a
          href={item.recording}
          target="_blank"
          rel="noopener noreferrer"
          className="work-recording-link"
        >
          <i className="fas fa-play-circle"></i>
          <span>Watch recording</span>
        </a>
      )}

      {item.authors && (
        <p className="work-authors">
          <span className="authors-label">Authors: </span>
          {formatAuthors(item.authors)}
        </p>
      )}
    </div>
  );
};

// Shared card grid used by both /talks and the "Also published elsewhere"
// block on /writing. Renders items newest-first.
const WorkCardGrid = ({ items }) => {
  const sorted = [...items].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <div className="publications-events-container">
      {sorted.map((item, index) => (
        <WorkCard key={index} item={item} />
      ))}
    </div>
  );
};

export default WorkCardGrid;
