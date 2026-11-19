import React from 'react';

// Each range is drawn solid to its low end and tinted to its high end.
const GROUPS = [
  {
    title: 'Per delegation',
    rows: [
      {
        label: 'Bulk-read routing',
        note: 'median, single-pass to with carry',
        low: 83,
        high: 87,
        value: '83–87%',
      },
    ],
  },
  {
    title: 'Of total cost',
    rows: [
      {
        label: 'Bulk-read routing',
        note: 'single-pass to with carry',
        low: 0.9,
        high: 3.5,
        value: '0.9–3.5%',
      },
      {
        label: 'Dropping old tool results at cache rewrite',
        note: 'ceiling, not yet tested',
        low: 11,
        high: 20,
        value: '11–20%',
        untested: true,
      },
    ],
  },
];

const TICKS = [0, 25, 50, 75, 100];

const RoutingEvidence = () => (
  <figure className="routing-evidence" aria-labelledby="routing-evidence-caption">
    {GROUPS.map((group) => (
      <section className="re-group" key={group.title} aria-label={group.title}>
        <p className="re-group-title">{group.title}</p>
        {group.rows.map((row) => (
          <div className="re-row" key={row.label}>
            <div className="re-head">
              <span>
                <strong>{row.label}</strong> <small>{row.note}</small>
              </span>
              <span className="re-value">{row.value}</span>
            </div>
            <div className="re-track" aria-hidden="true">
              <span
                className={row.untested ? 're-fill re-fill-untested' : 're-fill'}
                style={{ width: `${row.high}%` }}
              >
                {!row.untested && (
                  <span className="re-solid" style={{ width: `${(row.low / row.high) * 100}%` }} />
                )}
              </span>
            </div>
          </div>
        ))}
      </section>
    ))}
    <div className="re-ticks" aria-hidden="true">
      {TICKS.map((tick) => (
        <span key={tick} style={{ left: `${tick}%` }}>{tick}%</span>
      ))}
    </div>
    <figcaption id="routing-evidence-caption">
      Solid to the low end, light to the high end of each range. Savings are
      modelled upper bounds from my own Pi sessions, not quality-matched.
    </figcaption>
  </figure>
);

export default RoutingEvidence;
