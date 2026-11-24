import React from 'react';
import { Link } from 'react-router';
import '../styles/PublicationsEvents.css';
import '../styles/Article.css';
import '../styles/Work.css';
import projects from '../data/work';
import useRevealOnScroll from '../utils/useRevealOnScroll';
import PageNav from './PageNav';

const Work = () => {
  const sectionRef = useRevealOnScroll();

  return (
    <>
      <section className="publications-events" ref={sectionRef}>
        <h2>Work</h2>
        <p className="case-intro">
          A selection of projects I have helped build. Most of this work is
          confidential, so client and employer names are left out. The problems
          and the engineering are described as they were.
        </p>

        <div className="case-grid">
          {projects.map(({ slug, frontmatter, cover }) => (
            <Link key={slug} to={`/work/${slug}`} className="essay-item case-card">
              <img
                src={cover}
                alt=""
                width="640"
                height="360"
                className="case-cover"
              />
              <p className="essay-meta">
                {frontmatter.industry} - {frontmatter.period}
              </p>
              <h3 className="essay-title">{frontmatter.title}</h3>
              <p className="essay-dek">{frontmatter.summary}</p>
              <ul className="case-tags" aria-label="Technologies">
                {frontmatter.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
      <PageNav />
    </>
  );
};

export default Work;
