import React, { useEffect } from 'react';
import { useSlideSteps } from '../../../components/articles/Slide';

// Demirer, Musolff & Yang (NBER WP 35275), synchronous-agent estimates only.
// Commits (+180%) are deliberately omitted: that figure is cumulative with
// autocomplete, so it does not share these stages' baseline.
const STAGES = [
  { key: 'lines', label: 'Lines of code', increase: 958, color: '#d98b5f' },
  { key: 'prs', label: 'Pull requests', increase: 86, color: '#c85a1a' },
  { key: 'releases', label: 'Releases', increase: 20, color: '#7d7a3f' },
];
const MAX_INCREASE = Math.max(...STAGES.map((stage) => stage.increase));
const FILTERED = ['Deletions 12.2\u00d7 vs additions 7.0\u00d7', 'Branches +79%', 'More abandoned repositories'];
const LAST = STAGES.length - 1;

// Geometry in flow coordinates: u runs along the flow, v across it, and
// drop-offs bend towards larger v. Horizontal maps (u, v) to (x, y); vertical
// maps it to (y, x) so narrow screens read top to bottom with drop-offs exiting
// right. Stage nodes share their top edge, so each retained band runs straight.
const LAYOUTS = {
  horizontal: { length: 900, depth: 340, nodes: [40, 440, 838], node: 22, top: 100, maxH: 180, gap: 96 },
  vertical: { length: 620, depth: 330, nodes: [64, 360, 560], node: 18, top: 18, maxH: 160, gap: 70 },
};

const rect = (pt, u0, u1, v0, v1) => `M${pt(u0, v0)} L${pt(u1, v0)} L${pt(u1, v1)} L${pt(u0, v1)} Z`;

const sankeyGeometry = (orientation) => {
  const L = LAYOUTS[orientation];
  const horizontal = orientation === 'horizontal';
  const pt = horizontal ? (u, v) => `${u},${v}` : (u, v) => `${v},${u}`;
  const h = STAGES.map((stage) => Math.max((L.maxH * stage.increase) / MAX_INCREASE, 3));
  const nodeEnd = (i) => L.nodes[i] + L.node;

  const nodes = STAGES.map((_, i) => rect(pt, L.nodes[i], nodeEnd(i), L.top, L.top + h[i]));
  const kept = STAGES.slice(1).map((_, j) => rect(pt, nodeEnd(j), L.nodes[j + 1], L.top, L.top + h[j + 1]));

  // The share that does not continue bends away and exits through the far edge.
  const lost = STAGES.slice(1).map((_, j) => {
    const u0 = nodeEnd(j);
    const a = L.top + h[j + 1];
    const b = L.top + h[j];
    const outer = u0 + L.gap + (b - a);
    const D = L.depth;
    return [
      `M${pt(u0, a)}`,
      `C${pt(u0 + (outer - u0) * 0.62, a)} ${pt(outer, a + (D - a) * 0.38)} ${pt(outer, D)}`,
      `L${pt(u0 + L.gap, D)}`,
      `C${pt(u0 + L.gap, b + (D - b) * 0.38)} ${pt(u0 + L.gap * 0.62, b)} ${pt(u0, b)}`,
      'Z',
    ].join(' ');
  });
  const lostCentre = STAGES.slice(1).map((_, j) => nodeEnd(j) + L.gap + (h[j] - h[j + 1]) / 2);

  const pct = (value, total) => `${(value / total) * 100}%`;
  const place = horizontal
    ? (u, v) => ({ left: pct(u, L.length), top: pct(v, L.depth) })
    : (u, v) => ({ left: pct(v, L.depth), top: pct(u, L.length) });
  const headAt = (i) =>
    horizontal
      ? place(i === LAST ? nodeEnd(i) : L.nodes[i], L.top - 12)
      : place(L.nodes[i] + L.node / 2, L.top + h[i] + 10);

  return {
    viewBox: horizontal ? `0 0 ${L.length} ${L.depth}` : `0 0 ${L.depth} ${L.length}`,
    aspectRatio: horizontal ? `${L.length} / ${L.depth}` : `${L.depth} / ${L.length}`,
    nodes,
    kept,
    lost,
    headAt,
    sinkAt: (j) => place(lostCentre[j], L.depth),
  };
};

const SankeyCanvas = ({ orientation, isShown }) => {
  const g = sankeyGeometry(orientation);
  const horizontal = orientation === 'horizontal';
  const id = `sf-${orientation}`;
  const along = horizontal ? { x2: '1', y2: '0' } : { x2: '0', y2: '1' };
  const across = horizontal ? { x2: '0', y2: '1' } : { x2: '1', y2: '0' };
  const stepClass = (index) => `sf-step${isShown(index) ? ' is-shown' : ''}`;

  return (
    <div className={`sf-canvas sf-${orientation}`} style={{ aspectRatio: g.aspectRatio }}>
      <svg viewBox={g.viewBox} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-lost`} x1="0" y1="0" {...across}>
            <stop offset="0%" stopColor="#c85a1a" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#c85a1a" stopOpacity="0" />
          </linearGradient>
          {STAGES.slice(1).map((stage, j) => (
            <linearGradient key={stage.key} id={`${id}-kept-${j}`} x1="0" y1="0" {...along}>
              <stop offset="0%" stopColor={STAGES[j].color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={stage.color} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>
        {g.kept.map((d, j) => (
          <g key={STAGES[j + 1].key} className={stepClass(j + 1)}>
            <path d={g.lost[j]} fill={`url(#${id}-lost)`} />
            <path d={d} fill={`url(#${id}-kept-${j})`} />
          </g>
        ))}
        {g.nodes.map((d, i) => (
          <path key={STAGES[i].key} className={stepClass(i)} d={d} fill={STAGES[i].color} />
        ))}
      </svg>

      {STAGES.map((stage, i) => (
        <div
          key={stage.key}
          className={`sf-head${i === LAST ? ' is-last' : ''} ${stepClass(i)}`}
          style={g.headAt(i)}
        >
          <span className="sf-value">+{stage.increase}%</span>
          <span className="sf-label">{stage.label}</span>
        </div>
      ))}

      {STAGES.slice(1).map((stage, j) => (
        <span key={stage.key} className={`sf-sink ${stepClass(j + 1)}`} style={g.sinkAt(j)} aria-hidden="true">
          filtered out
        </span>
      ))}
    </div>
  );
};

const ShippingFunnel = () => {
  const steps = useSlideSteps();

  useEffect(() => {
    steps?.reportStepCount(LAST);
  }, [steps]);

  const isShown = (index) => steps == null || index <= steps.step;

  return (
    <figure className="shipping-funnel" aria-labelledby="shipping-funnel-caption">
      <SankeyCanvas orientation="horizontal" isShown={isShown} />
      <SankeyCanvas orientation="vertical" isShown={isShown} />
      <div className={`sf-filtered sf-step${isShown(1) ? ' is-shown' : ''}`}>
        <span className="sf-filtered-title">Filtered out at human-bottlenecked stages</span>
        <ul>
          {FILTERED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <figcaption id="shipping-funnel-caption">
        Increase associated with synchronous coding agents such as Claude Code, across
        500,000+ GitHub developers. Growth rates, not volumes. Source: Demirer, Musolff
        &amp; Yang, NBER WP 35275.
      </figcaption>
    </figure>
  );
};

export default ShippingFunnel;
