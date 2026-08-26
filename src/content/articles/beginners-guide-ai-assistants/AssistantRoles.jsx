import React from 'react';

const SIDES = [
  {
    title: 'You own',
    items: ['Goal', 'Context and evidence', 'Judgement', 'Decision', 'Verification'],
  },
  {
    title: 'The assistant helps',
    items: ['Explore', 'Structure', 'Draft', 'Challenge', 'Transform'],
  },
];

const AssistantRoles = () => (
  <figure className="bga-visual assistant-roles" aria-labelledby="assistant-roles-caption">
    <div className="ar-workspace">
      {SIDES.map((side, index) => (
        <section className={`ar-side ar-side-${index + 1}`} key={side.title}>
          <h4>{side.title}</h4>
          <ul>
            {side.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ))}
      <div className="ar-shared" aria-label="Shared working loop">
        <span>Conversation</span>
        <span>Iteration</span>
      </div>
    </div>
    <figcaption id="assistant-roles-caption">
      The assistant contributes to the work. You remain responsible for what the work is and whether to use it.
    </figcaption>
  </figure>
);

export default AssistantRoles;
