import React from 'react';

// Sources section rendered at the end of every article from its `sources`
// frontmatter (an ordered list of { title, url, note? }). Shared template so
// the section is consistent across pieces.
const Sources = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="article-sources" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading">Sources</h2>
      <ol>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            {source.note && <span className="source-note"> - {source.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Sources;
