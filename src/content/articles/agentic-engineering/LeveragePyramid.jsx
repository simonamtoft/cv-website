import React, { useEffect, useState } from 'react';
import { useViewMode, useSlideSteps } from '../../../components/articles/Slide';

// The hierarchy of leverage as a pyramid: the widest tier at the base is the
// highest-leverage artifact (a bad line there propagates furthest), narrowing to
// a single line of code at the apex. Click a tier to read its blast radius.
// Recreates the talk deck's "Hierarchy of leverage" slide. Reused inline and
// full-screen.
//
// The "1 bad line = N" multipliers are illustrative orders of magnitude, not
// measured figures (surfaced in the caption) - the ordering is the point.
const TIERS = [
  {
    name: 'Code',
    mult: '1 bad line = 1 bad line of code',
    note: null,
    blast: 'A bad line of code is one line to fix - the narrowest blast radius.',
    dark: false,
  },
  {
    name: 'Plan',
    mult: '1 bad line = 10-100 bad lines of code',
    note: 'Wrong solution',
    blast: 'A wrong step in the plan sends the agent down a wrong solution for the whole task.',
    dark: false,
  },
  {
    name: 'Research',
    mult: '1 bad line = 1,000+ bad lines of code',
    note: 'Misunderstanding the system',
    blast: 'Misunderstanding the system poisons every decision that builds on it.',
    dark: false,
  },
  {
    name: 'Specification',
    mult: '1 bad line = 10,000+ bad lines of code',
    note: 'Wrong problem',
    blast: 'Specifying the wrong problem wastes the entire feature, however well it is built.',
    dark: true,
  },
  {
    name: 'Project context files (e.g. AGENTS.md)',
    mult: '1 bad line = 100,000+ bad lines of code',
    note: 'Core infrastructure',
    blast: 'Read every session and shaping every task - core infrastructure, and an attack surface.',
    dark: true,
  },
];

// Base is widest (highest leverage). Rendered top-down, so the array's apex
// (Code) is first; width grows toward the base.
const widthPct = (i) => 44 + i * 12;

// The pyramid is static and self-explanatory: all tiers are shown at once (no
// scroll build-up), with the base selected by default. Clicking a tier still
// swaps the blast-radius line below.
const LeveragePyramid = () => {
  const view = useViewMode();
  // Present drops the click affordance and the info below the dotted line; the
  // pyramid is static so it has no build steps (one press advances the slide).
  const steps = useSlideSteps();
  const present = steps != null;
  const [active, setActive] = useState(TIERS.length - 1);
  const tier = TIERS[active];
  useEffect(() => {
    steps?.reportStepCount(0);
  }, [steps]);

  return (
    <div className="leverage-pyramid" data-visual="leverage" data-view={view}>
      <div className="pyramid-wrap">
        <span className="pyramid-axis" aria-hidden="true">
          Higher leverage &rarr;
        </span>
        <div className="pyramid-stack">
          {TIERS.map((t, i) => (
            <button
              type="button"
              key={t.name}
              className={`pyramid-tier tier-${i}${t.dark ? ' tier-dark' : ''}${
                i === active ? ' active' : ''
              }`}
              style={{ width: `${widthPct(i)}%` }}
              aria-pressed={i === active}
              onClick={present ? undefined : () => setActive(i)}
            >
              <span className="pyramid-tier-name">{t.name}</span>
              <span className="pyramid-tier-mult">{t.mult}</span>
              {t.note && <span className="pyramid-tier-note">{t.note}</span>}
            </button>
          ))}
        </div>
      </div>
      {!present && (
        <>
          <p className="pyramid-blast" aria-live="polite">
            <strong>{tier.name.replace(/ \(.*\)$/, '')}:</strong> {tier.blast}
          </p>
          <p className="pyramid-caption">
            Illustrative orders of magnitude, not measured figures - the ordering is
            the point.
          </p>
        </>
      )}
    </div>
  );
};

export default LeveragePyramid;
