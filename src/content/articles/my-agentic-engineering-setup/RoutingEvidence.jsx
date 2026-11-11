import React from 'react';

const METRICS = [
  {
    label: 'Broad reads redirected',
    low: 2.8,
    high: 2.8,
    value: '2.8%',
    detail: '102 of 3,664 parent read calls in 200 sessions',
    kind: 'Observed',
  },
  {
    label: 'Parent-context tokens cut',
    low: 95.8,
    high: 95.9,
    value: '95.8–95.9%',
    detail: 'Controlled two-file comparison',
    kind: 'Controlled',
  },
  {
    label: 'Parent + worker cost saved',
    low: 80,
    high: 84,
    value: '80–84%',
    detail: 'Parent-model prices applied to measured tokens',
    kind: 'Estimate',
  },
];

const RoutingEvidence = () => (
  <figure className="routing-evidence" aria-labelledby="routing-evidence-caption">
    <ul className="rn-metrics">
      {METRICS.map((metric) => (
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
    <figcaption id="routing-evidence-caption">
      Three measurements, three kinds of evidence. Only the redirect rate comes from
      real sessions; none is a general benchmark.
    </figcaption>
  </figure>
);

export default RoutingEvidence;
