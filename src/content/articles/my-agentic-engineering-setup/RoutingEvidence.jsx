import React from 'react';

const GROUPS = [
  {
    title: 'What bulk-read routing saves',
    metrics: [
      {
        label: 'Saving per delegation',
        low: 83,
        high: 87,
        value: '83–87%',
        detail: 'Median; single-pass to with carry',
        kind: 'Modelled',
      },
      {
        label: 'Share of total cost saved',
        low: 0.9,
        high: 3.5,
        value: '0.9–3.5%',
        detail: 'Of $1,547 without routing; single-pass to with carry',
        kind: 'Modelled',
      },
    ],
  },
  {
    title: 'Where the spend goes',
    metrics: [
      {
        label: 'Tool results in context',
        low: 40,
        high: 40,
        value: '40%',
        detail: '$601 of spend; $489 of it carried through later turns',
        kind: 'Modelled',
      },
      {
        label: 'Cache rewrites',
        low: 32,
        high: 32,
        value: '32%',
        detail: '$476 of spend, mostly after idle gaps over five minutes',
        kind: 'Modelled',
      },
      {
        label: 'Clearing stale results at cache rewrite',
        low: 11,
        high: 20,
        value: '11–20%',
        detail: 'Ceiling on total cost saved; not yet tested',
        kind: 'Untested',
      },
    ],
  },
];

const RoutingEvidence = () => (
  <figure className="routing-evidence" aria-labelledby="routing-evidence-caption">
    {GROUPS.map((group) => (
      <section className="rn-group" key={group.title} aria-label={group.title}>
        <p className="rn-group-title">{group.title}</p>
        <ul className="rn-metrics">
          {group.metrics.map((metric) => (
            <li className="rn-metric" key={metric.label}>
              <div className="rn-head">
                <strong>{metric.label}</strong>
                <span className={`rn-kind rn-kind-${metric.kind.toLowerCase()}`}>{metric.kind}</span>
              </div>
              <div className="rn-bar" aria-hidden="true">
                <span className="rn-fill" style={{ width: `${metric.low}%` }} />
                {metric.high > metric.low && (
                  <span
                    className="rn-range"
                    style={{ left: `${metric.low}%`, width: `${metric.high - metric.low}%` }}
                  />
                )}
              </div>
              <div className="rn-foot">
                <span className="rn-value">{metric.value}</span>
                <small>{metric.detail}</small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    ))}
    <figcaption id="routing-evidence-caption">
      Audit of 551 Pi sessions, 2026-09-27 to 2026-11-17. Only the $1,492 main-agent
      spend is observed; every figure here is a modelled upper bound, not
      quality-matched.
    </figcaption>
  </figure>
);

export default RoutingEvidence;
