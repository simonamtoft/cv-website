import React from 'react';
import '../styles/PublicationsEvents.css';
import publicationsEvents from '../data/publicationsEvents';
import useRevealOnScroll from '../utils/useRevealOnScroll';
import WorkCardGrid from './WorkCardGrid';
import PageNav from './PageNav';

const Talks = () => {
  const sectionRef = useRevealOnScroll();
  const talks = publicationsEvents.filter(
    (item) => item.type === 'webinar' || item.type === 'conference'
  );

  return (
    <>
      <section className="publications-events" ref={sectionRef}>
        <h2>Talks</h2>
        <WorkCardGrid items={talks} />
      </section>
      <PageNav />
    </>
  );
};

export default Talks;
