import React, { useEffect, useRef, useMemo, useState } from 'react';
import '../styles/Timeline.css';
import PageNav from './PageNav';
import workExperience from '../data/workExperience';
import education from '../data/education';
import volunteering from '../data/volunteering';
import { formatDisplayRange, getComparableTime } from '../utils/dateFormatter';
import TimelineDetailModal from './TimelineDetailModal';

const Timeline = () => {

  // Merge data sources and tag each item with its category
  // Memoized to prevent unnecessary re-sorts on every render
  const timelineItems = useMemo(
    () =>
      [
        ...workExperience.map(item => ({ ...item, category: 'work' })),
        ...education.map(item => ({ ...item, category: 'education' })),
        ...volunteering.map(item => ({ ...item, category: 'community' })),
      ].sort((a, b) => {
        const aStart = a.start ?? a.startYear;
        const bStart = b.start ?? b.startYear;
        return getComparableTime(bStart) - getComparableTime(aStart); // newest first
      }),
    []
  );

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = useMemo(
    () => activeFilter === 'all' ? timelineItems : timelineItems.filter(item => item.category === activeFilter),
    [timelineItems, activeFilter]
  );

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    if ((item.projects && item.projects.length > 0) ||
        (item.courses && item.courses.length > 0)) {
      setSelectedItem(item);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.05 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

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
  }, [filteredItems]); // Re-run effect if displayed items change

  // Reset visibility state when filter changes so IntersectionObserver re-fires cleanly
  useEffect(() => {
    setVisibleItems(new Set());
  }, [activeFilter]);

  const categoryLabel = {
    work: 'Work',
    education: 'Education',
    community: 'Community',
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'work', label: 'Work' },
    { value: 'education', label: 'Education' },
    { value: 'community', label: 'Community' },
  ];

  return (
    <>
      <h2 className="timeline-heading">Background</h2>
      <div className="timeline-filter" role="group" aria-label="Filter by category">
        {filters.map(f => (
          <button
            key={f.value}
            className={`timeline-filter-btn${f.value !== 'all' ? ` filter-${f.value}` : ''}${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
            aria-pressed={activeFilter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="timeline" ref={containerRef}>
        {filteredItems.map((item, index) => {
          const hasDetails = (item.projects?.length > 0) || (item.courses?.length > 0);
          const title = item.jobTitle || item.degree;
          const org = item.companyName || item.institution;
          return (
            <div
              key={`${item.start ?? item.startYear}-${item.companyName || item.institution || item.text?.toString().substring(0, 20)}`}
              className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'} ${visibleItems.has(index) ? 'is-visible' : ''} ${hasDetails ? 'has-details' : ''}`}
              ref={el => itemRefs.current[index] = el}
              onClick={hasDetails ? () => handleItemClick(item) : undefined}
              style={{ cursor: hasDetails ? 'pointer' : 'default' }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-date-text-container">
                <div className="timeline-number">
                  {formatDisplayRange(item.start ?? item.startYear, item.end ?? item.endYear)}
                </div>
                {(title || org) && (
                  <div className="timeline-title-block">
                    {title && <div className="timeline-job-title">{title}</div>}
                    {org && <div className="timeline-org-name">{org}</div>}
                  </div>
                )}
                <span className={`timeline-category-badge category-${item.category}`}>
                  {categoryLabel[item.category]}
                </span>
                <div className="timeline-content">
                  <p>{item.text}</p>
                  {hasDetails && <span className="view-details-hint">Click to view details</span>}
                </div>
              </div>
              <div className="timeline-icon-container">
                <div className="timeline-icon-frame">
                  <img src={item.icon} alt={org || 'Icon'} className="timeline-icon" loading="lazy" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <TimelineDetailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={selectedItem}
        />
      )}
      <PageNav />
    </>
  );
};

export default Timeline;
