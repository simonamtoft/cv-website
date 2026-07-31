import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import config from '../../config';
import { SlideContext, ViewModeProvider, PRESENT_COMPONENTS } from './Slide';
import '../../styles/Article.css';
import '../../styles/ArticlePresentation.css';

// The presentation deck at /writing/:slug/present. Renders the same compiled MDX
// body as the reading view, but injects PresentSlide so each authored <Slide>
// becomes a full-screen deck section. A full-screen fixed overlay covers the
// persistent Nav/Footer without touching root.jsx.
const ArticlePresentationView = ({ article }) => {
  const navigate = useNavigate();
  const { slug, Body, frontmatter } = article;

  const [slideIds, setSlideIds] = useState([]);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const deckRef = useRef(null);

  // Slides register in mount order, which equals document order for a static
  // MDX tree, so slideIds is the deck order.
  // shortcut: registration order == document order for a static MDX tree; add a
  // compareDocumentPosition sort only if slides ever reorder dynamically.
  const register = useCallback((id) => {
    setSlideIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }, []);
  const unregister = useCallback((id) => {
    setSlideIds((ids) => ids.filter((x) => x !== id));
  }, []);

  const total = slideIds.length;
  const currentId = slideIds[index] ?? null;

  // Nav reads live state through refs (state can change after the key handler is
  // bound - slides register on mount, step advances per press), so mirror the
  // latest values rather than close over stale ones.
  const indexRef = useRef(0);
  indexRef.current = index;
  const stepRef = useRef(0);
  stepRef.current = step;
  const slideIdsRef = useRef([]);
  slideIdsRef.current = slideIds;
  // slideId -> build-step count reported by the visual on that slide. Mutated (no
  // re-render): counts are read only at nav time, and every slide mounts up front
  // so all counts are registered before the first navigation.
  const stepCountsRef = useRef({});
  const reportStepCount = useCallback((id, n) => {
    stepCountsRef.current[id] = n;
  }, []);

  // A press first walks the current slide's build steps; only past the last step
  // does it move to the next slide (which starts collapsed). Stepping back
  // reverses, then lands on the previous slide fully built.
  const go = useCallback((delta) => {
    const ids = slideIdsRef.current;
    const i = indexRef.current;
    const s = stepRef.current;
    const cnt = stepCountsRef.current[ids[i]] ?? 0;
    if (delta > 0) {
      if (s < cnt) {
        setStep(s + 1);
      } else if (i < ids.length - 1) {
        setIndex(i + 1);
        setStep(0);
      }
    } else if (delta < 0) {
      if (s > 0) {
        setStep(s - 1);
      } else if (i > 0) {
        setIndex(i - 1);
        setStep(stepCountsRef.current[ids[i - 1]] ?? 0);
      }
    }
  }, []);

  const exit = useCallback(() => navigate(`/writing/${slug}`), [navigate, slug]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, exit]);

  // Mark the deck ready (drops the pre-hydration first-slide CSS fallback) and
  // move focus into it so keyboard users are not left in the hidden nav.
  useEffect(() => {
    const el = deckRef.current;
    if (el) {
      el.setAttribute('data-ready', '');
      el.focus();
    }
  }, []);

  const ctx = useMemo(
    () => ({ currentId, register, unregister, step, reportStepCount }),
    [currentId, register, unregister, step, reportStepCount]
  );

  return (
    <div className="deck-overlay">
      <div className="deck" ref={deckRef} tabIndex={-1}>
        <SlideContext.Provider value={ctx}>
          <ViewModeProvider value="present">
            <Body components={PRESENT_COMPONENTS} />
          </ViewModeProvider>
        </SlideContext.Provider>
      </div>

      <div className="deck-watermark">
        <span className="deck-wm-name">{config.personalInfo.name}</span>
        <span className="deck-wm-meta">
          {frontmatter.title} &middot; amtoft.dev
        </span>
      </div>

      <div className="deck-chrome">
        <button
          type="button"
          className="deck-nav"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <span className="deck-counter">
          {total ? index + 1 : 0} / {total}
        </span>
        <button
          type="button"
          className="deck-nav"
          onClick={() => go(1)}
          disabled={index >= total - 1}
          aria-label="Next slide"
        >
          &#8250;
        </button>
        <button type="button" className="deck-exit" onClick={exit} aria-label="Exit presentation">
          Esc
        </button>
      </div>

      <div
        className="deck-progress"
        style={{ width: total ? `${((index + 1) / total) * 100}%` : '0%' }}
      />
    </div>
  );
};

export default ArticlePresentationView;
