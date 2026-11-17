import React, { useLayoutEffect, useRef, useState } from 'react';

const CHANGE_LOOP = {
  eyebrow: 'Every change',
  steps: [
    { title: 'Turn', note: 'I prompt; the agent works and runs targeted checks' },
    {
      title: 'Settle gate',
      note: 'Runs on uncommitted non-Markdown changes; read-only, Markdown-only, and commit-only runs skip',
    },
    {
      title: 'Verifier changed?',
      note: 'CLEAR runs it; otherwise I accept the edit or send it back',
      agents: [{ name: 'verifier-change-reviewer' }],
    },
    { title: 'Run .agent/verify.sh', note: 'Or the Taskfile verify task; after 3 repairs, a last failure is reported' },
    {
      title: 'Deferred review',
      note: 'Runs once after a pass, if requested',
      agents: [
        { name: 'correctness-reviewer' },
        { name: 'security-reviewer', condition: 'if security-relevant' },
      ],
    },
    { title: 'Commit locally', note: "quick-commit on the session's own edits, never pushed" },
    { title: 'Back to me', note: 'I steer the next turn' },
  ],
  paths: [
    { from: 3, to: 0, lane: 0, label: 'Fails: repair turn, up to 3' },
    { from: 4, to: 0, lane: 1, label: 'Findings: fix, re-verify' },
    { from: 5, to: 6, lane: 0, label: 'Waits if unfinished', branch: true },
  ],
};

// Distance the innermost side path keeps from the step boxes, in px.
const PATH_OFFSET = 18;
// Distance between stacked side-path lanes, in px; matches --fb-lane-gap.
const LANE_GAP = 26;
// Outer lanes meet their target box further from its centre so lanes never cross.
const ENTRY_SPREAD = 14;

// The steps reflow from a row (wide) to a column (narrow), so side paths are
// routed from measured box positions: under the row, or down the left gutter.
const pathGeometry = (track, fromEl, toEl, lane) => {
  const origin = track.getBoundingClientRect();
  const from = fromEl.getBoundingClientRect();
  const to = toEl.getBoundingClientRect();
  const stacked = from.top >= to.bottom || to.top >= from.bottom;
  const offset = PATH_OFFSET + lane * LANE_GAP;
  const entryShift = lane * ENTRY_SPREAD;

  if (stacked) {
    const x = Math.min(from.left, to.left) - origin.left - offset;
    const fromY = from.top + from.height / 2 - origin.top;
    const toY = to.top + to.height / 2 - origin.top - entryShift;
    const fromX = from.left - origin.left;
    const toX = to.left - origin.left;
    return {
      stacked,
      path: `M ${fromX} ${fromY} H ${x} V ${toY} H ${toX - 2}`,
      arrow: `M ${toX - 8} ${toY - 4} L ${toX - 1} ${toY} L ${toX - 8} ${toY + 4}`,
      label: { x: x + 4, y: (fromY + toY) / 2, rotate: true },
    };
  }

  const y = Math.max(from.bottom, to.bottom) - origin.top + offset;
  const fromX = from.left + from.width / 2 - origin.left;
  const toX = to.left + to.width / 2 - origin.left - entryShift;
  const fromY = from.bottom - origin.top;
  const toY = to.bottom - origin.top;
  return {
    stacked,
    path: `M ${fromX} ${fromY} V ${y} H ${toX} V ${toY + 2}`,
    arrow: `M ${toX - 4} ${toY + 8} L ${toX} ${toY + 1} L ${toX + 4} ${toY + 8}`,
    label: { x: (fromX + toX) / 2, y: y + 4, rotate: false },
  };
};

const SidePath = ({ geometry, label: text, branch }) => {
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
        {branch ? '\u21B7' : '\u21BA'} {text}
      </text>
    </svg>
  );
};

const StepAgents = ({ agents }) => (
  <ul className="fb-agents" aria-label="Subagents">
    {agents.map(({ name, condition }) => (
      <li key={name} className={condition ? 'is-optional' : undefined}>
        <span className="fb-agent-name">{name}</span>
        {condition && <small> {condition}</small>}
      </li>
    ))}
  </ul>
);

export const Lane = ({ eyebrow, steps, paths = [] }) => {
  const trackRef = useRef(null);
  const stepRefs = useRef([]);
  const [geometries, setGeometries] = useState(null);
  const laneCount = paths.length ? Math.max(...paths.map((p) => p.lane)) + 1 : 0;

  // Measured here rather than in SidePath: a child's layout effect runs before
  // this component's refs are attached.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!paths.length || !track) return undefined;
    const measure = () => {
      // A hidden presentation slide has no layout; wait until it is shown.
      if (track.offsetWidth === 0) return;
      setGeometries(
        paths.map((p) =>
          pathGeometry(track, stepRefs.current[p.from], stepRefs.current[p.to], p.lane),
        ),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [paths]);

  return (
    <section className="fb-lane" aria-label={eyebrow}>
      <span className="fb-eyebrow">{eyebrow}</span>
      <div
        className={`fb-track${laneCount ? ' has-loop' : ''}`}
        style={laneCount ? { '--fb-lanes': laneCount } : undefined}
        ref={trackRef}
      >
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
              {step.agents && <StepAgents agents={step.agents} />}
              {paths
                .filter((p) => p.from === index)
                .map((p) => (
                  <span className="fb-sr-only" key={p.label}>
                    {p.label}, {p.branch ? 'skips to' : 'back to'}: {steps[p.to].title}
                  </span>
                ))}
            </li>
          ))}
        </ol>
        {geometries &&
          paths.map((p, i) => (
            <SidePath key={p.label} geometry={geometries[i]} label={p.label} branch={p.branch} />
          ))}
      </div>
    </section>
  );
};

const FeedbackLoops = () => (
  <figure className="feedback-loops" aria-labelledby="feedback-loops-caption">
    <Lane {...CHANGE_LOOP} />
    <figcaption id="feedback-loops-caption">
      Verification and review both run inside each task without me. A failing check
      returns to the agent as a repair turn.
    </figcaption>
  </figure>
);

export default FeedbackLoops;
