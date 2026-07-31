import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';
import useAutoSequence from '../../../utils/useAutoSequence';
import useRevealProgress from '../../../utils/useRevealProgress';

// Expand context to plan, then reset to execute. The window grows through
// Bootstrap -> Explore -> Plan as the agent pulls context in, then
// compresses at the reset to a clean window carrying only what execution needs.
// The funnel builds up on scroll (reading) and is fully drawn in present; the
// phase names ride on the funnel itself. Recreates the talk deck's "Context
// flow" slide.
const PHASES = [
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    startEdge: 'Session start',
    chips: ['+ AGENTS.md', '+ Auto memory'],
    caption: 'the session opens with the standing context - AGENTS.md and auto memory.',
  },
  {
    key: 'explore',
    name: 'Explore',
    startEdge: 'Developer query',
    chips: ['+ Latest docs', '+ File grep & scan', '+ Subdirectory context'],
    caption: 'the developer query pulls in fresh docs, greps, and nearby files.',
  },
  {
    key: 'plan',
    name: 'Plan',
    startEdge: 'Plan mode',
    chips: ['+ Broad file reads', '+ User clarifications', '+ Edge case explorations'],
    caption: 'plan mode widens the window with broad reads, clarifications, and edge cases.',
  },
  {
    key: 'reset',
    name: 'Reset',
    startEdge: 'New session',
    endEdge: 'Ready to execute',
    chips: ['+ AGENTS.md', '+ Auto memory', '+ Plan file'],
    caption:
      'the reset - back to a clean window carrying only AGENTS.md, memory, and the plan, ready to execute.',
  },
];

// Funnel drawn as tiled segments (1000x400 viewBox, centre line y=200); each
// segment fades in as its phase is reached, so the funnel grows smoothly from a
// point at session start, out to the peak, then narrowing back to a point at
// "ready to execute". Shared vertical edges read as the phase dividers.
const SEGMENTS = [
  '30,194 250,140 250,260 30,206', // Bootstrap wedge
  '250,140 520,90 520,310 250,260', // Explore
  '520,90 770,40 770,360 520,310', // Plan
  '770,40 970,194 970,206 770,360', // Reset
];
// Column centres and edge x-positions as % of the viewBox width.
const COL_CENTRE = ['14%', '38.5%', '64.5%', '87%'];
const EDGE_LEFT = ['3%', '25%', '52%', '77%'];

// Autoplay builds the funnel Bootstrap -> ... -> Reset, ending fully expanded.
const SEQUENCE = [0, 1, 2, 3];

const ContextFlow = () => {
  const view = useViewMode();
  // Present builds from deck key presses (steps != null); reading autoplays on
  // scroll and responds to clicks (steps == null).
  const steps = useSlideSteps();
  const present = steps != null;
  // Reading starts collapsed (only Bootstrap in) and builds up as it plays or is
  // stepped.
  const [active, setActive] = useState(0);
  const { ref, cancel } = useAutoSequence({
    order: SEQUENCE,
    setIndex: setActive,
    enabled: !present,
  });
  const select = (i) => {
    cancel();
    setActive(i);
  };
  useEffect(() => {
    steps?.reportStepCount(SEQUENCE.length - 1);
  }, [steps]);
  const displayActive = present ? SEQUENCE[Math.min(steps.step, SEQUENCE.length - 1)] : active;
  // Reading reveal is monotonic; present reveal follows the deck step (reversible).
  const { shown: readingShown } = useRevealProgress(SEQUENCE, active, false);
  const shown = present ? (i) => SEQUENCE.indexOf(i) <= steps.step : readingShown;

  return (
    <div className="context-flow" data-visual="context-flow" data-view={view} ref={ref}>
      <div className="flow-stage">
        <svg
          className="flow-silhouette"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {SEGMENTS.map((pts, i) => (
            <polygon
              key={pts}
              className="flow-funnel"
              points={pts}
              style={{ opacity: shown(i) ? 1 : 0 }}
            />
          ))}
        </svg>

        {PHASES.map((p, i) => (
          <div
            key={p.key}
            className={`flow-col${shown(i) ? ' in' : ' out'}${
              i === displayActive ? ' active' : ''
            }`}
          >
            <span className="flow-phase-name" style={{ left: COL_CENTRE[i] }}>
              {p.name}
            </span>
            <button
              type="button"
              className="flow-chips"
              style={{ left: COL_CENTRE[i] }}
              aria-label={`${p.name} phase`}
              aria-pressed={i === displayActive}
              onClick={present ? undefined : () => select(i)}
            >
              {p.chips.map((c) => (
                <span key={c} className="flow-chip">
                  {c}
                </span>
              ))}
            </button>
            <span className="flow-edge" style={{ left: EDGE_LEFT[i] }}>
              {p.startEdge}
            </span>
            {p.endEdge && (
              <span className="flow-edge flow-edge-end">{p.endEdge}</span>
            )}
          </div>
        ))}
      </div>

      {!present && (
        <p className="flow-caption" aria-live="polite">
          <strong>{PHASES[displayActive].name}:</strong> {PHASES[displayActive].caption}
        </p>
      )}
    </div>
  );
};

export default ContextFlow;
