import React, { createContext, useCallback, useContext, useEffect, useId, useMemo } from 'react';

// The authored <Slide> construct. It is never imported inside the MDX; instead
// it is injected via the compiled body's `components` prop (the MDX pipeline has
// no providerImportSource, so an un-imported capitalized tag resolves from
// there). This lets the same MDX source render two ways: transparent inline in
// the reading view, and a curated deck section in present mode. The author tags
// only the slide-worthy bits (a heading, a key list, a pull-quote, a visual) -
// the surrounding prose stays outside <Slide> and is reading-only.

// View-mode context: visuals read this (useViewMode) to render/size/behave
// differently in the reading essay vs the presentation deck. Foundation only -
// the per-visual dynamics (build steps, auto-play) land with the visuals
// themselves (ticket 5a).
const ViewModeContext = createContext('reading');
export const ViewModeProvider = ViewModeContext.Provider;
export const useViewMode = () => useContext(ViewModeContext);

// Reading view: transparent wrapper, tagged content appears inline. `title` is
// unused here (the essay carries its own prose headings).
export const ReadingSlide = ({ children }) => <>{children}</>;

export const SlideContext = createContext(null);

// Per-slide fragment context: a visual on a slide reads this to drive its
// build-up from key presses instead of autoplay/click. `step` is the deck's
// current step within THIS slide (0 unless the slide is current); the visual
// reports how many build steps it has via `reportStepCount` so the deck knows
// when the slide is fully built. `null` in the reading view (no PresentSlide),
// which the visuals use as the reading/present switch.
export const SlideStepContext = createContext(null);
export const useSlideSteps = () => useContext(SlideStepContext);

// Present view: a widescreen deck section. It registers itself with the deck on
// mount and shows only when it is the current slide. Visibility is CSS-driven so
// the node never unmounts - embedded interactive visuals keep their state across
// navigation. `title` becomes the slide heading (present-only chrome).
export const PresentSlide = ({ title, children }) => {
  const ctx = useContext(SlideContext);
  const id = useId();

  useEffect(() => {
    ctx.register(id);
    return () => ctx.unregister(id);
  }, [ctx, id]);

  const isCurrent = ctx.currentId === id;

  const reportStepCount = useCallback((n) => ctx.reportStepCount(id, n), [ctx, id]);
  const stepValue = useMemo(
    () => ({ isCurrent, step: isCurrent ? ctx.step : 0, reportStepCount }),
    [isCurrent, ctx.step, reportStepCount]
  );

  return (
    <section
      className={isCurrent ? 'deck-slide is-current' : 'deck-slide'}
      aria-label={title}
      aria-hidden={!isCurrent}
    >
      <div className="deck-slide-inner">
        {title && <h2 className="deck-slide-title">{title}</h2>}
        <div className="deck-slide-body">
          <SlideStepContext.Provider value={stepValue}>{children}</SlideStepContext.Provider>
        </div>
      </div>
    </section>
  );
};

export const READING_COMPONENTS = { Slide: ReadingSlide };
export const PRESENT_COMPONENTS = { Slide: PresentSlide };
