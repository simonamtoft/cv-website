import React from 'react';
import { Lane } from './FeedbackLoops';

const HARNESS_LOOP = {
  eyebrow: 'Across sessions',
  steps: [
    { title: 'Friction in any session', note: 'A sandbox denial, unclear rule, or tool error' },
    { title: 'report_papercut', note: 'Appends to the untracked PAPERCUTS.md' },
    { title: 'Periodic review', note: 'Recurring entries; handled ones are deleted' },
    { title: 'Task, ledger entry, or reminder', note: 'Fix it, record why not, or warn at the call' },
    { title: 'Fix lands', note: 'Its reminder is retired' },
  ],
  loop: { from: 4, to: 0, label: 'The next papercut' },
};

const HarnessImprovement = () => (
  <figure className="feedback-loops" aria-labelledby="harness-improvement-caption">
    <Lane {...HARNESS_LOOP} />
    <figcaption id="harness-improvement-caption">
      Agents report friction as they work, and my own finds join at the review. I decide
      what each one becomes.
    </figcaption>
  </figure>
);

export default HarnessImprovement;
