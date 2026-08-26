import React, { useState } from 'react';

const FIELDS = [
  {
    name: 'Goal',
    question: 'What should be different when the work is done?',
    example: 'Create a decision brief, not a general summary.',
    prevents: 'An answer that is readable but not useful.',
  },
  {
    name: 'Audience',
    question: 'Who will read or use the result?',
    example: 'The project team who attended the meeting.',
    prevents: 'The wrong tone, assumptions, or level of detail.',
  },
  {
    name: 'Context',
    question: 'What does the assistant need to know about the situation?',
    example: 'The team needs to confirm decisions and assign follow-up work.',
    prevents: 'Generic advice detached from the real situation.',
  },
  {
    name: 'Material',
    question: 'Which information should it use?',
    example: 'Use only the supplied meeting notes.',
    prevents: 'Invented facts or evidence from the wrong source.',
  },
  {
    name: 'Constraints',
    question: 'What must it include, avoid, or preserve?',
    example: 'Do not infer owners or deadlines. Stay under 500 words.',
    prevents: 'Hidden assumptions and missed requirements.',
  },
  {
    name: 'Output',
    question: 'What should the finished result look like?',
    example: 'Decisions, open questions, risks, and an action table.',
    prevents: 'A response in the wrong structure or format.',
  },
];

const BriefBuilder = () => {
  const [active, setActive] = useState(0);
  const field = FIELDS[active];

  return (
    <figure className="bga-visual brief-builder" aria-labelledby="brief-builder-caption">
      <div className="bb-layout">
        <div className="bb-fields" aria-label="Parts of a clear task brief">
          {FIELDS.map((item, index) => (
            <button
              type="button"
              className={index === active ? 'bb-field active' : 'bb-field'}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              key={item.name}
            >
              <span>{item.name}</span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
        <div className="bb-result" aria-live="polite">
          <p className="bb-kicker">A clear task brief</p>
          <h4>{field.name}</h4>
          <p className="bb-question">{field.question}</p>
          <dl>
            <div><dt>Example</dt><dd>{field.example}</dd></div>
            <div><dt>Prevents</dt><dd>{field.prevents}</dd></div>
          </dl>
        </div>
      </div>
      <figcaption id="brief-builder-caption">
        Select a field to see what it contributes. Simple tasks may need only a few of them.
      </figcaption>
    </figure>
  );
};

export default BriefBuilder;
