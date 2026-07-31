import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';
import useAutoSequence from '../../../utils/useAutoSequence';
import useRevealProgress from '../../../utils/useRevealProgress';

// The harness primitives, derived by working backwards from what a raw model
// cannot do on its own: each deficiency of "text in -> text out" names the piece
// that supplies it. Filesystem + Git is the foundational one the others lean on.
// Click a row to read what that primitive delivers. Reused inline and full-screen.
const PRIMITIVES = [
  {
    key: 'fs',
    deficiency: 'No durable state',
    name: 'Filesystem + Git',
    delivers: 'a workspace, an offload target, cross-session memory, free versioning',
    foundational: true,
    caption:
      'The foundational primitive - underrated because it is boring. Somewhere to keep work between turns, offload context that will not fit the window, collaborate across agents (each in its own Git worktree), and get versioning for free. Most other primitives point back at it.',
  },
  {
    key: 'tools',
    deficiency: 'Only a text generator',
    name: 'Tools (bash + code execution)',
    delivers: 'the ability to act, plus a general tool it extends itself',
    caption:
      'A raw model only produces text; tools are how it acts at all. Hand it a computer rather than pre-building one tool per action, and it writes the tools it needs on the fly - spending its intelligence on the decision, not the plumbing.',
  },
  {
    key: 'sandbox',
    deficiency: 'Unsafe, unscalable execution',
    name: 'Sandboxes',
    delivers: 'isolated, on-demand runs with good default tooling',
    caption:
      'Make that execution safe and repeatable, then ship the defaults - runtimes, test and git CLIs, a browser, logs, screenshots - that let the agent observe its own work instead of guessing at it.',
  },
  {
    key: 'memory',
    deficiency: 'Frozen knowledge',
    name: 'Memory + search',
    delivers: 'new knowledge without touching the weights',
    caption:
      'Memory files reloaded on edit, plus web search, documentation lookup, and retrieval over your own corpus (RAG), are the only way to add what the model does not know without retraining it.',
  },
  {
    key: 'subagents',
    deficiency: 'A single, serial window',
    name: 'Sub-agents + orchestration',
    delivers: 'context isolation and parallel work',
    caption:
      'Spin up a fresh agent with its own window for a scoped task, and only the result comes back - a context firewall that also lets independent work run in parallel.',
  },
];

// Autoplay walks the deficiencies top-down, ending on the last primitive.
const SEQUENCE = [0, 1, 2, 3, 4];

const Primitives = () => {
  const view = useViewMode();
  // In present the visual builds from deck key presses (steps != null); in the
  // reading essay it autoplays on scroll and responds to clicks (steps == null).
  const steps = useSlideSteps();
  const present = steps != null;
  // Reading starts with only the first row in and fills top-down as it plays or
  // is stepped.
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
  const prim = PRIMITIVES[displayActive];
  // Reading reveal is monotonic; present reveal follows the deck step (reversible).
  const { shown: readingShown } = useRevealProgress(SEQUENCE, active, false);
  const shown = present ? (i) => SEQUENCE.indexOf(i) <= steps.step : readingShown;

  return (
    <div className="primitives" data-visual="primitives" data-view={view} ref={ref}>
      <div className="prim-source">
        <span className="prim-source-name">Raw model</span>
        <span className="prim-source-sub">text in &rarr; text out</span>
        <span className="prim-source-q">What can&rsquo;t it do on its own?</span>
      </div>

      <div className="prim-rows">
        {PRIMITIVES.map((p, i) => (
          <button
            type="button"
            key={p.key}
            className={`prim-row${i === displayActive ? ' active' : ''}${
              shown(i) ? '' : ' prim-pending'
            }`}
            aria-pressed={i === displayActive}
            onClick={present ? undefined : () => select(i)}
          >
            <span className="prim-deficiency">{p.deficiency}</span>
            <span className="prim-arrow" aria-hidden="true">
              &rarr;
            </span>
            <span className="prim-primitive">
              <span className="prim-name">
                {p.name}
                {p.foundational && <span className="prim-tag">foundational</span>}
              </span>
              <span className="prim-delivers">{p.delivers}</span>
            </span>
          </button>
        ))}
      </div>

      {!present && (
        <p className="prim-caption" aria-live="polite">
          <strong>{prim.name}:</strong> {prim.caption}
        </p>
      )}
    </div>
  );
};

export default Primitives;
