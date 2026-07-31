import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';
import useAutoSequence from '../../../utils/useAutoSequence';
import useRevealProgress from '../../../utils/useRevealProgress';

// The context window as the agent's working memory: a stack of what occupies it,
// from the vendor-fixed system instructions down to the live work log that fills
// (and rots) as the task runs. Click a band to read what it is. Recreates the
// talk deck's "Context window" slide. Reused inline and full-screen.
const BANDS = [
  {
    key: 'system',
    label: 'System instructions',
    tint: 'muted',
    lines: [
      "You are Claude Code, Anthropic's official CLI for Claude.",
      'Use dedicated tools: Read instead of cat, Edit instead of sed...',
    ],
    note: 'Fixed by the agent vendor. You do not author or control this.',
  },
  {
    key: 'tools',
    label: 'Tool descriptions',
    tint: 'olive',
    lines: [
      'Read, Edit, Bash, Grep, WebFetch, ... - each tool\'s name, schema, and description',
      'Injected up front so the model knows what it can call and when.',
    ],
    note: 'Every available tool\'s schema sits in the window - more tools means less room for everything else.',
  },
  {
    key: 'context',
    label: 'Context files',
    tint: 'terra',
    lines: [
      '# CLAUDE.md / .cursorrules / AGENTS.md / copilot-instructions.md',
      'Your conventions, preferences, and decisions - loaded every session.',
    ],
    note: 'The highest-leverage thing you author - and the one an attacker targets.',
  },
  {
    key: 'memory',
    label: 'Auto memory',
    tint: 'light',
    chips: ['user_preferences', 'project_knowledge', 'past_decisions'],
    note: 'Facts the agent persists across sessions on its own.',
  },
  {
    key: 'worklog',
    label: 'Work log',
    tint: 'gold',
    tokens: '~30K / 200K tokens',
    fill: 15,
    messages: [
      ['User', 'Add auth middleware to the /api/users endpoint'],
      ['Tool', 'invoke_skill("deploy-azure", { target: "staging" })'],
      ['Agent', 'Creating implementation plan: 4 files to modify...'],
    ],
    note: 'The live transcript. It fills as the task runs - and it is what rots.',
  },
];

// Autoplay walks top (system) -> bottom (work log), ending on the live log.
const SEQUENCE = [0, 1, 2, 3, 4];

const ContextWindow = () => {
  const view = useViewMode();
  // In present the visual builds from deck key presses (steps != null); in the
  // reading essay it autoplays on scroll and responds to clicks (steps == null).
  const steps = useSlideSteps();
  const present = steps != null;
  // Reading starts with only the first band in and fills top-down as it plays or
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
  // Present: the diagram is driven by the deck step; reveal is reversible so
  // stepping back un-reveals. Report how many build presses this visual has.
  useEffect(() => {
    steps?.reportStepCount(SEQUENCE.length - 1);
  }, [steps]);
  const displayActive = present ? SEQUENCE[Math.min(steps.step, SEQUENCE.length - 1)] : active;
  const band = BANDS[displayActive];
  // Reading reveal is monotonic (scrolling back never collapses); clicking a band
  // selects it for the note without hiding the bands already in.
  const { shown: readingShown } = useRevealProgress(SEQUENCE, active, false);
  const shown = present ? (i) => SEQUENCE.indexOf(i) <= steps.step : readingShown;

  return (
    <div className="context-window" data-visual="context-window" data-view={view} ref={ref}>
      <div className="cw-stack">
        {BANDS.map((b, i) => (
          <button
            type="button"
            key={b.key}
            className={`cw-band cw-${b.tint}${i === displayActive ? ' active' : ''}${
              shown(i) ? '' : ' cw-pending'
            }`}
            aria-pressed={i === displayActive}
            onClick={present ? undefined : () => select(i)}
          >
            <span className="cw-label">{b.label}</span>
            {b.tokens && <span className="cw-tokens">{b.tokens}</span>}

            {b.lines && (
              <span className="cw-lines">
                {b.lines.map((l) => (
                  <span key={l} className="cw-line">
                    {l}
                  </span>
                ))}
              </span>
            )}

            {b.chips && (
              <span className="cw-chips">
                {b.chips.map((c) => (
                  <span key={c} className="cw-chip">
                    {c}
                  </span>
                ))}
              </span>
            )}

            {b.fill != null && (
              <span className="cw-meter">
                <span className="cw-meter-fill" style={{ width: `${b.fill}%` }} />
              </span>
            )}

            {b.messages && (
              <span className="cw-messages">
                {b.messages.map(([role, text]) => (
                  <span key={role} className="cw-message">
                    <span className="cw-role">{role}</span>
                    <span className="cw-msg-text">{text}</span>
                  </span>
                ))}
              </span>
            )}
          </button>
        ))}
      </div>
      {!present && (
        <p className="cw-note" aria-live="polite">
          <strong>{band.label}:</strong> {band.note}
        </p>
      )}
    </div>
  );
};

export default ContextWindow;
