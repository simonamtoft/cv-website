import React from 'react';
import { Link } from 'react-router';
import '../../styles/Article.css';
import '../../styles/Work.css';

// The project page at /work/:slug. Reuses the article reading layout, so an MDX
// body can embed a demo component that breaks out of the prose column with
// `grid-column: 1 / -1`, as article visuals do.
const WorkDetailView = ({ project }) => {
  const { frontmatter, cover, Body } = project;
  const { title, summary, industry, period, technologies } = frontmatter;

  return (
    <article className="article-reading case-study">
      <div className="article-topbar">
        <Link to="/work" className="article-back">
          <i className="fas fa-arrow-left"></i> Back to Work
        </Link>
      </div>
      <header className="article-header">
        <p className="article-kicker">
          {industry} - {period}
        </p>
        <h1 className="article-title">{title}</h1>
        <p className="article-dek is-revealed">{summary}</p>
        <ul className="case-tags" aria-label="Technologies">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <img src={cover} alt="" width="640" height="360" className="case-cover" />
      </header>

      <div className="article-body">
        <Body />
      </div>
    </article>
  );
};

export default WorkDetailView;
