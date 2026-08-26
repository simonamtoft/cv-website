import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';
import useAutoSequence from '../../../utils/useAutoSequence';
import useRevealProgress from '../../../utils/useRevealProgress';

// The seven control surfaces form a closed loop: Templates define the reference;
// Controllers act on the error; Rails and Throttles constrain the action; the
// Model produces output; and Sensors and Observers feed evidence back. Guides
// add feedforward knowledge before the controller acts.
const LEVERS = [
  {
    name: 'Guides',
    role: 'feedforward',
    loop: 'Feedforward enters before any result is available, biasing the controller toward known-good actions.',
    does: 'Supplies durable rules before the controller chooses an action.',
    fail: 'conventions have to be rediscovered in every session',
    example: 'an AGENTS.md that requires repository inspection and task-scoped changes',
  },
  {
    name: 'Sensors',
    role: 'feedback',
    loop: 'Feedback measures the model’s output and sends an observable signal back around the loop.',
    does: 'Turns the result of an action into evidence the controller can use.',
    fail: 'the agent cannot tell whether a plausible change actually works',
    example: 'a verifier that runs type-checking, linting, and tests, then returns the first failure',
  },
  {
    name: 'Rails',
    role: 'constraints',
    loop: 'Constraints remove prohibited commands from the controller’s available output before they reach the model.',
    does: 'Makes unsafe actions impossible regardless of what the model requests.',
    fail: 'a mistaken or hostile instruction can reach the host unchecked',
    example: 'a sandbox that confines writes and denies access to credential paths',
  },
  {
    name: 'Controllers',
    role: 'control logic',
    loop: 'Control logic combines the reference, guidance, and estimated state to decide the model’s next action.',
    does: 'Turns the task and current state into an ordered sequence of actions.',
    fail: 'complex work becomes one improvised, context-heavy conversation',
    example: 'a skill that gathers context, runs scripts, delegates review, and reports verification',
  },
  {
    name: 'Templates',
    role: 'reference',
    loop: 'The reference defines the desired output; feedback reveals the error between that target and the result.',
    does: 'Defines the concrete shape that the produced artifact should approach.',
    fail: 'the agent invents a new shape for the same artifact each time',
    example: 'a report template with required sections, file naming, and a validation command',
  },
  {
    name: 'Observers',
    role: 'state estimation',
    loop: 'State estimation combines output and sensor evidence to infer conditions the loop cannot measure directly.',
    does: 'Infers quality and risk that deterministic checks cannot measure directly.',
    fail: 'the generator’s assumptions and blind spots go unchallenged',
    example: 'an isolated reviewer that inspects the diff after automated checks pass',
  },
  {
    name: 'Throttles',
    role: 'saturation limits',
    loop: 'Saturation limits cap the size or duration of a command even when the controller asks for more.',
    does: 'Caps scope, resources, or autonomy and forces a pause at the limit.',
    fail: 'scope or autonomy expands silently during a diverging run',
    example: 'a clarification gate before widening scope, plus turn and budget caps on delegated runs',
  },
];

// Block rectangles keyed by lever index, positioned on a 440x220 control-loop
// canvas. Boxes are kept compact so the connecting wires read as real signal
// paths: forward path along y=81, feedback along y=191.
const BLOCKS = {
  4: { x: 4, y: 66, w: 56, h: 30 }, // Templates - reference input
  3: { x: 124, y: 66, w: 60, h: 30 }, // Controllers - control logic
  2: { x: 212, y: 66, w: 46, h: 30 }, // Rails - constraints
  6: { x: 286, y: 66, w: 54, h: 30 }, // Throttles - saturation limits
  0: { x: 128, y: 14, w: 52, h: 28 }, // Guides - feedforward (above path)
  1: { x: 336, y: 176, w: 54, h: 30 }, // Sensors - feedback
  5: { x: 146, y: 176, w: 58, h: 30 }, // Observers - state estimation
};

// Directed wires (SVG path d) tracing the loop, each ending in an arrowhead.
// `owner` is the block whose reveal brings the wire in, so the loop assembles
// along the signal path.
const WIRES = [
  { d: 'M60,81 L87,81', owner: 4 }, // Templates -> summing junction
  { d: 'M105,81 L124,81', owner: 3 }, // junction -> Controllers
  { d: 'M184,81 L212,81', owner: 2 }, // Controllers -> Rails
  { d: 'M258,81 L286,81', owner: 6 }, // Rails -> Throttles
  { d: 'M340,81 L374,81', owner: 6 }, // Throttles -> Model (plant)
  { d: 'M154,42 L154,66', owner: 0 }, // Guides -> Controllers (feedforward in)
  { d: 'M436,81 L440,81 L440,191 L390,191', owner: 1 }, // Model output -> feedback tap
  { d: 'M336,191 L204,191', owner: 5 }, // Sensors -> Observers
  { d: 'M146,191 L96,191 L96,90', owner: 5 }, // Observers -> summing junction (-)
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

// Autoplay traces the loop: reference -> controller -> limits -> feedback ->
// observer -> feedforward, ending back on Guides (the default).
const SEQUENCE = [4, 3, 2, 6, 1, 5, 0];

const HarnessController = () => {
  const view = useViewMode();
  // Present assembles the loop from deck key presses (steps != null); reading
  // autoplays on scroll and responds to clicks (steps == null).
  const steps = useSlideSteps();
  const present = steps != null;
  // Reading assembles the loop from the reference.
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
        {SEQUENCE.map((i) => {
          const lv = LEVERS[i];
          return (
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
          );
        })}
      </div>

      {!present && (
        <div className="harness-lever-detail" aria-live="polite">
          <h4>{lever.name}</h4>
          <p className="harness-detail-row">
            <strong>In the loop:</strong> {lever.loop}
          </p>
          <p className="harness-detail-row">
            <strong>Purpose:</strong> {lever.does}
          </p>
          <p className="harness-detail-row harness-detail-fail">
            <strong>Without it:</strong> {lever.fail}
          </p>
          <p className="harness-detail-row">
            <strong>Example:</strong> {lever.example}
          </p>
        </div>
      )}
    </div>
  );
};

export default HarnessController;
