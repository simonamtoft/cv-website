import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { formatDisplayDate } from '../../utils/dateFormatter';
import useTypewriter from '../../utils/useTypewriter';
import Sources from './Sources';
import { READING_COMPONENTS, ViewModeProvider } from './Slide';
import '../../styles/Article.css';

// The reading visual-essay at /writing/:slug. Renders the compiled MDX body
// (which embeds its own interactive visuals inline) framed by an editorial
// header derived from frontmatter and a Sources section at the end. On entry
// the title types out; the dek and body then reveal, with body blocks fading
// in as they scroll into view.
const ArticleReadingView = ({ article }) => {
  const { frontmatter, Body } = article;
  const { title, dek, series, lastUpdated, sources, slug } = frontmatter;

  const { revealed, done } = useTypewriter(title, { speed: 42 });
  const chars = title.split('');
  const bodyRef = useRef(null);

  // Once the title has typed out, reveal each body block as it scrolls in
  // (same is-visible pattern used across the site). One-way; never un-reveals.
  useEffect(() => {
    if (!done) return undefined;
    const body = bodyRef.current;
    if (!body || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const blocks = Array.from(body.children);
    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [done]);

  return (
    <article className="article-reading">
      <div className="article-topbar">
        <Link to="/writing" className="article-back">
          <i className="fas fa-arrow-left"></i> Back to Writing
        </Link>
        <Link to={`/writing/${slug}/present`} className="article-present-link">
          <i className="fas fa-play"></i> Present
        </Link>
      </div>
      <header className="article-header">
        <p className="article-kicker">
          {series} - Last updated {formatDisplayDate(lastUpdated)}
        </p>
        <h1 className="article-title" aria-label={title}>
          <span aria-hidden="true">
            {chars.map((char, i) => (
              <span key={i} className={i < revealed ? 'char char--visible' : 'char'}>
                {char}
              </span>
            ))}
          </span>
        </h1>
        {dek && (
          <p className={`article-dek${done ? ' is-revealed' : ''}`}>{dek}</p>
        )}
      </header>

      <div ref={bodyRef} className="article-body">
        <ViewModeProvider value="reading">
          <Body components={READING_COMPONENTS} />
        </ViewModeProvider>
      </div>

      <Sources sources={sources} />
    </article>
  );
};

export default ArticleReadingView;
