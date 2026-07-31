import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';
import useAutoSequence from '../../../utils/useAutoSequence';
import useRevealProgress from '../../../utils/useRevealProgress';

// The seven-lever harness, drawn as a control-theory closed loop: a reference
// (Exemplars/setpoint) enters a summing junction, the controller (Scaffolds) and
// actuator limits (Rails/Throttles) drive the plant (the Model), and the output
// is fed back through a sensor (Sensors) and state observer (Mirrors) to the
// junction's negative input, with feedforward (Guides) added into the forward
// path. Each block is a control surface; click one to read its failure mode.
const LEVERS = [
  {
    name: 'Guides',
    role: 'feedforward',
    fail: 'rediscovers conventions every session',
    cc: 'CLAUDE.md + system prompt: short, specific, falsifiable, advisory only',
  },
  {
    name: 'Sensors',
    role: 'feedback',
    fail: 'repeats one lint error across 20 files',
    cc: 'PostToolUse hooks scoped to blast radius; a reviewer subagent on the diff',
  },
  {
    name: 'Rails',
    role: 'hard "cannot"',
    fail: 'rm -rf / DROP TABLE one turn from firing',
    cc: 'the sandbox is the boundary; permissions.deny and hooks judge intent inside it',
  },
  {
    name: 'Scaffolds',
    role: 'controller',
    fail: 'long sessions drift as context rots',
    cc: 'subagents / slash commands / skills - a subagent is a context firewall first',
  },
  {
    name: 'Exemplars',
    role: 'setpoint',
    fail: 'invents a new file layout every time',
    cc: 'pointer files to the canonical thing to copy, not prose - kept fresh',
  },
  {
    name: 'Mirrors',
    role: 'state observer',
    fail: 'confident wrongness goes unchallenged',
    cc: 'plan mode + extended thinking + writer/reviewer split',
  },
  {
    name: 'Throttles',
    role: 'saturation cap',
    fail: 'a diverging run burns the budget overnight ($400 by morning)',
    cc: '--max-turns, --max-budget-usd, --permission-mode escalated over a run',
  },
];

// Block rectangles keyed by lever index, positioned on a 440x220 control-loop
// canvas. Boxes are kept compact so the connecting wires read as real signal
// paths: forward path along y=81, feedback along y=191.
const BLOCKS = {
  4: { x: 6, y: 66, w: 50, h: 30 }, // Exemplars - setpoint (reference in)
  3: { x: 128, y: 66, w: 52, h: 30 }, // Scaffolds - controller
  2: { x: 212, y: 66, w: 46, h: 30 }, // Rails - limit
  6: { x: 286, y: 66, w: 54, h: 30 }, // Throttles - saturation
  0: { x: 128, y: 14, w: 52, h: 28 }, // Guides - feedforward (above path)
  1: { x: 336, y: 176, w: 54, h: 30 }, // Sensors - feedback sensor
  5: { x: 150, y: 176, w: 54, h: 30 }, // Mirrors - state observer
};

// Directed wires (SVG path d) tracing the loop, each ending in an arrowhead.
// `owner` is the block whose reveal brings the wire in, so the loop assembles
// along the signal path.
const WIRES = [
  { d: 'M56,81 L87,81', owner: 4 }, // Exemplars -> summing junction
  { d: 'M105,81 L128,81', owner: 3 }, // junction -> Scaffolds (controller)
  { d: 'M180,81 L212,81', owner: 2 }, // Scaffolds -> Rails
  { d: 'M258,81 L286,81', owner: 6 }, // Rails -> Throttles
  { d: 'M340,81 L374,81', owner: 6 }, // Throttles -> Model (plant)
  { d: 'M154,42 L154,66', owner: 0 }, // Guides -> Scaffolds (feedforward in)
  { d: 'M436,81 L440,81 L440,191 L390,191', owner: 1 }, // Model output -> feedback tap
  { d: 'M336,191 L204,191', owner: 5 }, // Sensors -> Mirrors
  { d: 'M150,191 L96,191 L96,90', owner: 5 }, // Mirrors -> summing junction (-)
];

const Block = ({ i, active, shown, onSelect, interactive }) => {
  const b = BLOCKS[i];
  const lv = LEVERS[i];
  const cx = b.x + b.w / 2;
  // In present the blocks are non-interactive (built by deck presses, not clicks).
  const interactiveProps = interactive
    ? {
        role: 'button',
        'aria-pressed': i === active,
        tabIndex: 0,
        onClick: () => onSelect(i),
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(i);
          }
        },
      }
    : {};
  return (
    <g
      className={`hc-block${i === active ? ' active' : ''}`}
      style={{ opacity: shown ? 1 : 0, pointerEvents: shown && interactive ? 'auto' : 'none' }}
      aria-label={lv.name}
      {...interactiveProps}
    >
      <rect className="hc-rect" x={b.x} y={b.y} width={b.w} height={b.h} rx="4" />
      <text className="hc-name" x={cx} y={b.y + b.h / 2 - 1} textAnchor="middle">
        {lv.name}
      </text>
      <text className="hc-role" x={cx} y={b.y + b.h / 2 + 8} textAnchor="middle">
        {lv.role}
      </text>
    </g>
  );
};

// Autoplay traces the loop: setpoint -> controller -> limits -> feedback ->
// observer -> feedforward, ending back on Guides (the default).
const SEQUENCE = [4, 3, 2, 6, 1, 5, 0];

const HarnessController = () => {
  const view = useViewMode();
  // Present assembles the loop from deck key presses (steps != null); reading
  // autoplays on scroll and responds to clicks (steps == null).
  const steps = useSlideSteps();
  const present = steps != null;
  // Reading assembles the loop from the setpoint.
  const [active, setActive] = useState(SEQUENCE[0]);
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
  const lever = LEVERS[displayActive];
  // Reading reveal is monotonic; present reveal follows the deck step (reversible).
  const { shown: readingShown } = useRevealProgress(SEQUENCE, active, false);
  const shown = present ? (i) => SEQUENCE.indexOf(i) <= steps.step : readingShown;

  return (
    <div className="harness-controller" data-visual="harness" ref={ref}>
      <svg
        className="harness-diagram"
        viewBox="0 0 440 220"
        role="group"
        aria-label="The harness as a closed control loop around the model"
      >
        <defs>
          <marker
            id="hc-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path className="hc-arrowhead" d="M0,1 L9,5 L0,9 z" />
          </marker>
        </defs>

        {WIRES.map((w) => (
          <path
            key={w.d}
            className="hc-wire"
            d={w.d}
            markerEnd="url(#hc-arrow)"
            style={{ opacity: shown(w.owner) ? 1 : 0 }}
          />
        ))}

        {/* Summing junction with + (reference) and - (feedback) inputs. */}
        <circle className="hc-sum" cx="96" cy="81" r="9" />
        <text className="hc-sign" x="88" y="73">
          +
        </text>
        <text className="hc-sign" x="101" y="101">
          &minus;
        </text>

        {/* Plant: the model in the forward path. */}
        <rect className="hc-plant" x="374" y="61" width="62" height="40" rx="6" />
        <text className="hc-plant-name" x="405" y="79" textAnchor="middle">
          Model
        </text>
        <text className="hc-plant-sub" x="405" y="91" textAnchor="middle">
          the plant
        </text>

        {Object.keys(BLOCKS).map((k) => (
          <Block
            key={k}
            i={Number(k)}
            active={displayActive}
            shown={shown(Number(k))}
            onSelect={select}
            interactive={!present}
          />
        ))}
      </svg>

      {/* Phone fallback: the loop is too dense to shrink, so list the surfaces. */}
      <div className="harness-grid-fallback">
        <div className="harness-core">
          <span className="harness-core-label">Model</span>
          <span className="harness-core-sub">the plant, closed-loop</span>
        </div>
        {LEVERS.map((lv, i) => (
          <button
            type="button"
            key={lv.name}
            className={`harness-lever${i === displayActive ? ' active' : ''}`}
            style={{ opacity: shown(i) ? 1 : 0 }}
            aria-pressed={i === displayActive}
            onClick={present ? undefined : () => select(i)}
          >
            <span className="harness-lever-name">{lv.name}</span>
            <span className="harness-lever-role">{lv.role}</span>
          </button>
        ))}
      </div>

      {!present && (
        <div className="harness-lever-detail" aria-live="polite">
          <h4>{lever.name}</h4>
          <p className="harness-detail-row">
            <strong>Role:</strong> {lever.role}
          </p>
          <p className="harness-detail-row harness-detail-fail">
            <strong>Missing -&gt;</strong> {lever.fail}
          </p>
          <p className="harness-detail-row">
            <strong>On Claude Code:</strong> {lever.cc}
          </p>
        </div>
      )}
    </div>
  );
};

export default HarnessController;
