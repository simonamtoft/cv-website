import React, { useLayoutEffect, useRef, useState } from 'react';

const CHANGE_LOOP = {
  eyebrow: 'Every change',
  steps: [
    { title: 'Turn changes project content', note: 'Markdown-only, aborted, and committing turns skip' },
    { title: 'Verifier changed?', note: 'A read-only reviewer must return CLEAR first' },
    { title: 'Run .agent/verify.sh', note: 'Or the Taskfile verify task' },
    { title: 'Release deferred review', note: 'Reviewers check the stated intent and report coverage' },
    { title: 'Final report', note: 'Summary, checks run, findings fixed or dismissed' },
  ],
  loop: { from: 2, to: 0, label: 'Fails: repair turn' },
};

const HARNESS_LOOP = {
  eyebrow: 'The harness itself',
  steps: [
    { title: 'Friction in any session', note: 'A sandbox denial, unclear rule, or tool error' },
    { title: 'report_papercut', note: 'Appends to one untracked file' },
    { title: 'Periodic review', note: 'Recurring entries only' },
    { title: 'Task or ledger entry', note: 'Fix the harness, or record why not' },
  ],
};

// Distance the return line keeps from the step boxes, in px.
const LOOP_OFFSET = 18;

// The steps reflow from a row (wide) to a column (narrow), so the return line is
// routed from measured box positions: under the row, or down the left gutter.
const loopGeometry = (track, fromEl, toEl) => {
  const origin = track.getBoundingClientRect();
  const from = fromEl.getBoundingClientRect();
  const to = toEl.getBoundingClientRect();
  const stacked = from.top >= to.bottom;

  if (stacked) {
    const x = Math.min(from.left, to.left) - origin.left - LOOP_OFFSET;
    const fromY = from.top + from.height / 2 - origin.top;
    const toY = to.top + to.height / 2 - origin.top;
    const fromX = from.left - origin.left;
    const toX = to.left - origin.left;
    return {
      stacked,
      path: `M ${fromX} ${fromY} H ${x} V ${toY} H ${toX - 2}`,
      arrow: `M ${toX - 8} ${toY - 4} L ${toX - 1} ${toY} L ${toX - 8} ${toY + 4}`,
      label: { x: x + 4, y: (fromY + toY) / 2, rotate: true },
    };
  }

  const y = Math.max(from.bottom, to.bottom) - origin.top + LOOP_OFFSET;
  const fromX = from.left + from.width / 2 - origin.left;
  const toX = to.left + to.width / 2 - origin.left;
  const fromY = from.bottom - origin.top;
  const toY = to.bottom - origin.top;
  return {
    stacked,
    path: `M ${fromX} ${fromY} V ${y} H ${toX} V ${toY + 2}`,
    arrow: `M ${toX - 4} ${toY + 8} L ${toX} ${toY + 1} L ${toX + 4} ${toY + 8}`,
    label: { x: (fromX + toX) / 2, y: y + 4, rotate: false },
  };
};

const ReturnLoop = ({ geometry, label: text }) => {
  const { path, arrow, label, stacked } = geometry;

  return (
    <svg className="fb-loop" aria-hidden="true" data-stacked={stacked || undefined}>
      <path d={path} />
      <path d={arrow} />
      <text
        x={label.x}
        y={label.y}
        textAnchor="middle"
        transform={label.rotate ? `rotate(-90 ${label.x} ${label.y})` : undefined}
      >
        &#8634; {text}
      </text>
    </svg>
  );
};

const Lane = ({ eyebrow, steps, loop }) => {
  const trackRef = useRef(null);
  const stepRefs = useRef([]);
  const [geometry, setGeometry] = useState(null);

  // Measured here rather than in ReturnLoop: a child's layout effect runs before
  // this component's refs are attached.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!loop || !track) return undefined;
    const measure = () => {
      const fromEl = stepRefs.current[loop.from];
      const toEl = stepRefs.current[loop.to];
      // A hidden presentation slide has no layout; wait until it is shown.
      if (track.offsetWidth === 0) return;
      setGeometry(loopGeometry(track, fromEl, toEl));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [loop]);

  return (
    <section className="fb-lane" aria-label={eyebrow}>
      <span className="fb-eyebrow">{eyebrow}</span>
      <div className={`fb-track${loop ? ' has-loop' : ''}`} ref={trackRef}>
        <ol className="fb-steps">
          {steps.map((step, index) => (
            <li
              className="fb-step"
              key={step.title}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
            >
              <strong>{step.title}</strong>
              <small>{step.note}</small>
              {loop?.from === index && (
                <span className="fb-sr-only">
                  {loop.label}, back to: {steps[loop.to].title}
                </span>
              )}
            </li>
          ))}
        </ol>
        {loop && geometry && <ReturnLoop geometry={geometry} label={loop.label} />}
      </div>
    </section>
  );
};

const FeedbackLoops = () => (
  <figure className="feedback-loops" aria-labelledby="feedback-loops-caption">
    <Lane {...CHANGE_LOOP} />
    <Lane {...HARNESS_LOOP} />
    <figcaption id="feedback-loops-caption">
      Verification and review run inside each task without me. The harness loop runs
      across sessions and changes the setup the other two depend on.
    </figcaption>
  </figure>
);

export default FeedbackLoops;
