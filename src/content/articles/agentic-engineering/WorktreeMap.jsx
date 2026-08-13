import React from 'react';

const PAIRS = [
  { ticket: 'Ticket A', branch: 'agent/ticket-a', agent: 'Agent A' },
  { ticket: 'Ticket B', branch: 'agent/ticket-b', agent: 'Agent B' },
];

const WorktreeMap = () => (
  <figure className="worktree-map" aria-labelledby="worktree-map-caption">
    <div className="wt-columns">
      <div className="wt-column">
        <span className="wt-eyebrow">Coordination</span>
        <strong className="wt-heading">Backlog.md</strong>
        <div className="wt-stack">
          {PAIRS.map(({ ticket }) => (
            <span className="wt-ticket" key={ticket}>
              <strong>{ticket}</strong>
              <span>independent scope</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wt-connectors" aria-hidden="true">
        {PAIRS.map(({ ticket }) => (
          <span key={ticket}>&rarr;</span>
        ))}
      </div>

      <div className="wt-column">
        <span className="wt-eyebrow">Isolated execution</span>
        <strong className="wt-heading">Git worktrees</strong>
        <div className="wt-stack">
          {PAIRS.map(({ ticket, branch, agent }) => (
            <span className="wt-worktree" key={ticket}>
              <span>
                <strong>Worktree {ticket.at(-1)}</strong>
                <small>{branch}</small>
              </span>
              <span className="wt-agent">{agent}</span>
            </span>
          ))}
        </div>
      </div>
    </div>

    <figcaption id="worktree-map-caption">
      Backlog.md supplies the units of coordination; worktrees supply the isolated
      execution environments.
    </figcaption>
  </figure>
);

export default WorktreeMap;
