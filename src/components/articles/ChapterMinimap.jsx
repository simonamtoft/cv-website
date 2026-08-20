import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const makeHeadingId = (title, usedIds) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'chapter';
  let id = base;
  let suffix = 2;

  while (usedIds.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(id);
  return id;
};

const ChapterMinimap = ({ bodyRef }) => {
  const [chapters, setChapters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return undefined;

    const headings = Array.from(body.querySelectorAll('h2'));
    if (headings.length < 2) return undefined;

    const usedIds = new Set(
      Array.from(document.querySelectorAll('[id]'), (element) => element.id)
    );
    headings.forEach((heading) => {
      if (!heading.id) heading.id = makeHeadingId(heading.textContent, usedIds);
    });

    let starts = [];
    let articleEnd = 0;

    const measure = () => {
      starts = headings.map(
        (heading) => heading.getBoundingClientRect().top + window.scrollY
      );
      articleEnd = body.getBoundingClientRect().bottom + window.scrollY;
      setChapters(
        headings.map((heading, index) => ({
          id: heading.id,
          title: heading.textContent,
          length: Math.max(1, (starts[index + 1] ?? articleEnd) - starts[index]),
        }))
      );
      updatePosition();
    };

    const updatePosition = () => {
      if (!starts.length) return;

      const readingLine = window.scrollY + window.innerHeight * 0.35;
      const nextActiveIndex = starts.findLastIndex((start) => start <= readingLine);
      setActiveIndex(Math.max(0, nextActiveIndex));

      const totalLength = Math.max(1, articleEnd - starts[0]);
      const nextProgress = ((readingLine - starts[0]) / totalLength) * 100;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    measure();
    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resizeObserver?.observe(body);
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', measure);
    };
  }, [bodyRef]);

  if (chapters.length < 2) return null;

  return createPortal(
    <nav className="chapter-minimap" aria-label="Article chapters">
      <div className="chapter-minimap-track">
        {chapters.map((chapter, index) => {
          const proximity = index - activeIndex;
          const stateClass =
            proximity === 0
              ? ' is-active'
              : proximity === -1
                ? ' is-previous'
                : proximity === 1
                  ? ' is-next'
                  : index < activeIndex
                    ? ' is-complete'
                    : '';

          return (
            <a
              key={chapter.id}
              className={`chapter-minimap-segment${stateClass}`}
              href={`#${chapter.id}`}
              style={{ flexGrow: chapter.length }}
              aria-current={proximity === 0 ? 'location' : undefined}
            >
              <span className="chapter-minimap-title">{chapter.title}</span>
            </a>
          );
        })}
        <span
          className="chapter-minimap-marker"
          style={{ top: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </nav>,
    document.body
  );
};

export default ChapterMinimap;
