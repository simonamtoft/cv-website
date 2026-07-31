import React from 'react';
import { Link } from 'react-router';
import '../styles/PublicationsEvents.css';
import '../styles/Article.css';
import publicationsEvents from '../data/publicationsEvents';
import essays from '../data/articles';
import { formatDisplayDate } from '../utils/dateFormatter';
import useRevealOnScroll from '../utils/useRevealOnScroll';
import WorkCardGrid from './WorkCardGrid';
import PageNav from './PageNav';

const Writing = () => {
  const sectionRef = useRevealOnScroll();
  const externalArticles = publicationsEvents.filter((item) => item.type === 'article');

  return (
    <>
      <section className="publications-events" ref={sectionRef}>
        <h2>Writing</h2>

        <div className="essays-list">
          {essays.map((essay) => (
            <Link key={essay.slug} to={`/writing/${essay.slug}`} className="essay-item">
              <h3 className="essay-title">{essay.frontmatter.title}</h3>
              <p className="essay-dek">{essay.frontmatter.dek}</p>
              <p className="essay-meta">
                Last updated {formatDisplayDate(essay.frontmatter.lastUpdated)}
              </p>
            </Link>
          ))}
        </div>

        <div className="section-divider">
          <span>Also published elsewhere</span>
        </div>

        <WorkCardGrid items={externalArticles} />
      </section>
      <PageNav />
    </>
  );
};

export default Writing;
