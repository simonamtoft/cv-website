import React from 'react';
import { Link } from 'react-router';
import '../styles/PublicationsEvents.css';
import '../styles/Article.css';
import publicationsEvents from '../data/publicationsEvents';
import essays from '../data/articles';
import { formatDisplayDate, getComparableTime } from '../utils/dateFormatter';
import useRevealOnScroll from '../utils/useRevealOnScroll';
import PageNav from './PageNav';

const toEntries = () => [
  ...essays.map((essay) => ({
    id: essay.slug,
    kind: 'Essay',
    icon: 'fa-pen-nib',
    to: `/writing/${essay.slug}`,
    title: essay.frontmatter.title,
    blurb: essay.frontmatter.dek,
    date: essay.frontmatter.lastUpdated,
    meta: `Last updated ${formatDisplayDate(essay.frontmatter.lastUpdated)}`,
  })),
  ...publicationsEvents
    .filter((item) => item.type === 'article')
    .map((item) => ({
      id: item.link,
      kind: 'Article',
      icon: 'fa-file-alt',
      href: item.link,
      title: item.title,
      originalTitle: item.originalTitle,
      date: item.date,
      meta: [formatDisplayDate(item.date), item.venue].filter(Boolean).join(' · '),
    })),
].sort((a, b) => getComparableTime(b.date) - getComparableTime(a.date));

const Writing = () => {
  const sectionRef = useRevealOnScroll();
  const entries = toEntries();

  return (
    <>
      <section className="publications-events" ref={sectionRef}>
        <h2>Writing</h2>

        <div className="essays-list">
          {entries.map((entry) => {
            const content = (
              <>
                <div className="work-type-badge work-type-article">
                  <i className={`fas ${entry.icon}`}></i>
                  <span>{entry.kind}</span>
                </div>
                <h3 className="essay-title">{entry.title}</h3>
                {entry.blurb && <p className="essay-dek">{entry.blurb}</p>}
                {entry.originalTitle && (
                  <p className="essay-dek essay-original">{entry.originalTitle}</p>
                )}
                <p className="essay-meta">{entry.meta}</p>
              </>
            );
            return entry.to ? (
              <Link key={entry.id} to={entry.to} className="essay-item">
                {content}
              </Link>
            ) : (
              <a
                key={entry.id}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="essay-item"
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>
      <PageNav />
    </>
  );
};

export default Writing;
