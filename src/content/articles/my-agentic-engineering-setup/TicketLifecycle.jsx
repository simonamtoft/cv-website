import React from 'react';

const STAGES = [
  {
    stage: 'Create',
    writes: 'Scope, acceptance criteria, dependencies',
    note: 'From the board, a conversation, or a parent task',
  },
  {
    stage: 'Plan',
    writes: 'Implementation plan',
    note: 'Status moves to In Progress',
  },
  {
    stage: 'Implement',
    writes: 'Implementation notes',
    note: 'Appended as the work goes, in one or more sessions',
  },
  {
    stage: 'Verify',
    writes: 'Checked criteria',
    note: 'The criteria also become the review intent',
  },
  {
    stage: 'Finalize',
    writes: 'Final summary',
    note: 'Status moves to Done',
  },
];

const TicketLifecycle = () => (
  <figure className="ticket-lifecycle" aria-labelledby="ticket-lifecycle-caption">
    <span className="tl-eyebrow">One Backlog.md task, many sessions</span>
    <ol className="tl-steps">
      {STAGES.map(({ stage, writes, note }) => (
        <li className="tl-step" key={stage}>
          <strong>{stage}</strong>
          <span className="tl-writes">{writes}</span>
          <small>{note}</small>
        </li>
      ))}
    </ol>
    <p className="tl-sessions">
      Sessions end, hand off, or move to a worktree; the next one starts from the ticket,
      not from a transcript.
    </p>
    <figcaption id="ticket-lifecycle-caption">
      Each stage writes to the same task file through the <code>backlog</code> CLI.
    </figcaption>
  </figure>
);

export default TicketLifecycle;
