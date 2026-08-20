import React, { useEffect } from 'react';
import { useSlideSteps } from '../../../components/articles/Slide';

const LEVELS = [
  {
    key: 'local',
    title: 'Local checks',
    question: 'Is the change mechanically correct?',
    signals: ['Tests', 'Lint', 'Types'],
  },
  {
    key: 'harness',
    title: 'Harness feedback',
    question: 'Does it behave correctly in context?',
    signals: ['Hooks', 'Browser', 'Logs'],
  },
  {
    key: 'independent',
    title: 'Separate evaluation',
    question: 'Does another agent challenge it?',
    signals: ['Critic', 'Cross-model review'],
  },
  {
    key: 'human',
    title: 'Human review',
    question: 'Does it fit the system?',
    signals: ['Architecture', 'Integration seams'],
  },
];

const LevelIcon = ({ level }) => {
  if (level === 'local') {
    return (
      <svg viewBox="0 0 48 48" role="img" aria-label="Terminal with a passing check">
        <rect x="5" y="8" width="38" height="32" rx="6" />
        <path d="m12 18 5 4-5 4M21 27h8" />
        <path className="vl-icon-accent" d="m29 17 4 4 7-8" />
      </svg>
    );
  }

  if (level === 'harness') {
    return (
      <svg viewBox="0 0 48 48" role="img" aria-label="Closed feedback loop">
        <path d="M13 17a14 14 0 0 1 23-2" />
        <path d="m35 9 1 7-7-1" />
        <path d="M35 31a14 14 0 0 1-23 2" />
        <path d="m13 39-1-7 7 1" />
        <rect className="vl-icon-accent" x="19" y="18" width="10" height="12" rx="2" />
      </svg>
    );
  }

  if (level === 'independent') {
    return (
      <svg viewBox="0 0 48 48" role="img" aria-label="Two independent agents comparing work">
        <circle cx="14" cy="15" r="5" />
        <circle cx="34" cy="15" r="5" />
        <path d="M6 32c1-6 4-9 8-9s7 3 8 9M26 32c1-6 4-9 8-9s7 3 8 9" />
        <path className="vl-icon-accent" d="m18 36 4 4 9-10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Connected system seams">
      <rect x="5" y="8" width="14" height="12" rx="3" />
      <rect x="29" y="8" width="14" height="12" rx="3" />
      <rect x="17" y="30" width="14" height="12" rx="3" />
      <path d="M19 14h10M13 20l8 10M35 20l-8 10" />
      <circle className="vl-icon-accent" cx="24" cy="14" r="3" />
      <circle className="vl-icon-accent" cx="24" cy="26" r="3" />
    </svg>
  );
};

const VerificationLadder = () => {
  const steps = useSlideSteps();
  const present = steps != null;

  useEffect(() => {
    steps?.reportStepCount(LEVELS.length - 1);
  }, [steps]);

  return (
    <figure className="verification-ladder" aria-labelledby="verification-ladder-caption">
      <div className="vl-axis" aria-hidden="true">
        <span>Scope of risk</span>
        <svg viewBox="0 0 100 8" preserveAspectRatio="none">
          <path d="M0 4h96" />
          <path d="m92 1 5 3-5 3" />
        </svg>
      </div>

      <div className="vl-levels">
        {LEVELS.map((level, index) => {
          const shown = !present || index <= steps.step;
          return (
            <article
              className={`vl-level vl-level-${index + 1}${shown ? ' is-shown' : ''}`}
              aria-hidden={!shown}
              key={level.key}
            >
              <div className="vl-level-head">
                <span className="vl-number">{index + 1}</span>
                <LevelIcon level={level.key} />
              </div>
              <h4>{level.title}</h4>
              <p>{level.question}</p>
              <ul aria-label={`${level.title} examples`}>
                {level.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <figcaption id="verification-ladder-caption">
        Verification broadens as failures become less local and more expensive.
      </figcaption>
    </figure>
  );
};

export default VerificationLadder;
