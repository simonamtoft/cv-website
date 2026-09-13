import { useEffect, useId, useRef, useState } from 'react';
import { useSlideSteps } from '../../../components/articles/Slide';
import './read-routing.css';

const STEPS = [
  { title: 'Request', transfer: 'Parent → read hook', detail: 'The parent asks to read a large reference file. The hook inspects the request, not the file contents.', payload: 'Read request', path: 'M 83 82 L 151 82', label: [117, 59] },
  { title: 'Redirect', transfer: 'Read hook → parent', detail: 'The hook blocks the broad read and returns routing guidance. It does not start a worker.', payload: 'Skill path', path: 'M 151 82 L 83 82', label: [117, 59] },
  { title: 'Dispatch', transfer: 'Parent → isolated worker', detail: 'The parent reads the skill, chooses extraction, and sends a bounded question and source paths to the worker.', payload: 'Question + paths', path: 'M 38 92 Q -15 218 159 218', label: [88, 185] },
  { title: 'Extract', transfer: 'Source → worker', detail: 'The read-only worker inspects the source in its own context. Independent permissions still govern access.', payload: '~13,350 tokens', path: 'M 328 92 Q 381 218 211 218', label: [278, 185] },
  { title: 'Return', transfer: 'Worker → parent', detail: 'A focused report returns with findings, source locations, coverage gaps, and uncertainty. The full source stays with the worker.', payload: '558-token report', path: 'M 159 218 Q -15 218 38 92', label: [88, 185] },
  { title: 'Verify', transfer: 'Relevant source → parent', detail: 'Before editing or making a consequential decision, the parent checks the relevant original passages. A summary is a map, not proof.', payload: 'Exact passages', path: 'M 303 57 Q 183 -3 63 57', label: [183, 22] },
];
const SOURCE_TOKENS = 13350;
const REPORT_TOKENS = 558;
const PHASE_DURATION_MS = 2800;

function Agent({ x, y, label, subtitle, active = false }) {
  return (
    <g className={`rr-agent${active ? ' rr-active' : ''}`} transform={`translate(${x} ${y})`}>
      <circle r="25" />
      <path d="M -10 9 Q -10 0 0 0 Q 10 0 10 9 M 0 -3 a 6 6 0 1 0 0 -12 a 6 6 0 1 0 0 12" />
      <text y="46">{label}</text>
      <text className="rr-subtitle" y="62">{subtitle}</text>
    </g>
  );
}

function TransferDiagram({ delegated, index }) {
  const markerId = useId();
  const step = STEPS[index];
  const path = delegated ? step.path : 'M 278 82 L 88 82';
  const label = delegated ? step.label : [183, 59];
  return (
    <svg className="rr-diagram" viewBox="0 0 366 288" role="img"
      aria-label={delegated ? `${step.transfer}: ${step.payload}` : 'Direct read: about 13,350 source tokens enter parent context.'}>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {delegated ? (
        <g className="rr-wires">
          <path d="M 83 82 H 151 M 38 92 Q -15 218 159 218 M 328 92 Q 381 218 211 218" />
          <path className="rr-blocked" d="M 211 82 H 278" />
          <path d="M 239 76 l 12 12 m 0 -12 l -12 12" />
        </g>
      ) : (
        <g className="rr-resident" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M 34 ${162 + i * 7} H ${i % 3 === 0 ? 275 : 325}`} />)}
          <text x="183" y="272">Full source stays in parent context</text>
        </g>
      )}
      <g className={`rr-transfer-path${!delegated || index === 3 ? ' rr-bulk' : ''}`} key={delegated ? index : 'direct'}>
        <path d={path} markerEnd={`url(#${markerId})`} />
        {delegated && <path className="rr-packet" d={path} pathLength="100" />}
        <text x={label[0]} y={label[1]}>{delegated ? step.payload : '~13,350 tokens'}</text>
      </g>
      <Agent x={61} y={82} label="Parent" subtitle="Owns the decision" active={!delegated || [0, 2, 4, 5].includes(index)} />
      <g className="rr-source" transform="translate(305 82)">
        <path d="M -18 -24 H 7 L 18 -13 V 24 H -18 Z M 7 -24 V -13 H 18 M -10 -4 H 10 M -10 4 H 10 M -10 12 H 5" />
        <text y="46">Source</text>
        <text className="rr-subtitle" y="62">1,397 lines</text>
      </g>
      {delegated && <>
        <g className={`rr-hook${index < 2 ? ' rr-active' : ''}`} transform="translate(183 82)">
          <path d="M 0 -27 L 28 0 L 0 27 L -28 0 Z" />
          <text y="5">Gate</text>
          <text className="rr-subtitle" y="46">Redirect ≠ dispatch</text>
        </g>
        <Agent x={185} y={218} label="Worker" subtitle="Isolated · read-only" active={index === 3 || index === 4} />
      </>}
    </svg>
  );
}

export default function ReadRouting() {
  const slide = useSlideSteps();
  const captionId = useId();
  const diagramRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = STEPS[index];
  const isCurrent = slide?.isCurrent ?? true;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || !isCurrent) return undefined;
    let timer;
    let visible = false;
    const syncPlayback = () => {
      clearInterval(timer);
      if (visible && !document.hidden) {
        timer = setInterval(() => setIndex(current => (current + 1) % STEPS.length), PHASE_DURATION_MS);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(diagramRef.current);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [paused, isCurrent]);

  return (
    <figure className={`read-routing${paused ? ' rr-paused' : ''}`} aria-labelledby={captionId}>
      <figcaption id={captionId}>Read routing: hand off extraction, keep the decision</figcaption>
      <div className="rr-comparison">
        <section className="rr-arm rr-direct" aria-label="Direct read baseline">
          <h3>Read it all <span>Direct baseline</span></h3>
          <TransferDiagram delegated={false} index={index} />
          <div className="rr-footprint"><strong>~13,350 <small>tokens</small></strong><span>Source added to parent</span></div>
          <div className="rr-meter" aria-hidden="true"><span style={{ width: '100%' }} /></div>
        </section>
        <section className="rr-arm rr-delegated" aria-label="Delegated extraction" ref={diagramRef}>
          <h3>Bring back the answer <span>Delegated extraction</span></h3>
          <TransferDiagram delegated index={index} />
          <div className="rr-footprint"><strong>558 <small>tokens</small></strong><span>Report returned to parent</span></div>
          <div className="rr-meter" aria-hidden="true"><span style={{ width: `${REPORT_TOKENS / SOURCE_TOKENS * 100}%` }} /></div>
        </section>
      </div>
      <p className="rr-detail"><strong>{step.title}.</strong> {step.detail}</p>
      <div className="rr-result">
        <strong>95.8% <span>less source context</span></strong>
        <p>Estimated ingestion + delegation cost: <s>$0.0668</s> → <b>$0.0131</b> <span>(~80% lower)</span></p>
      </div>
      <details className="rr-benchmark">
        <summary>One benchmark, not a universal saving</summary>
        <p>Source: Pi read-routing README, “Measured parent-context reduction”, 12 Sep 2026. The code-file example is <code>subagent/index.ts</code> (50,506 bytes). Both token-count arms used gpt-5.6-luna; the worker took 4 turns / 32 seconds.</p>
        <p>Cost estimates apply claude-opus-5 rates, not observed Opus billing: $0.0079 worker + $0.0028 report input + ~$0.0025 parent dispatch output (rounded). They exclude the once-per-session skill read (~$0.0037), later cache reads, and follow-up verification. The token bars compare source ingestion with the returned report—not total workflow tokens. Verification adds targeted source to parent context.</p>
      </details>
      <p className="rr-bypass"><strong>Need direct reasoning?</strong> After a redirect, the parent can instead inspect bounded original source for debugging, editing, or architecture—without a worker.</p>
    </figure>
  );
}
