import React, { useEffect, useState } from 'react';
import { useSlideSteps } from '../../../components/articles/Slide';

const LAYERS = [
  {
    key: 'tool',
    scope: 'Every session',
    title: 'Tool-call guard',
    covers: 'Every file-tool and shell call, before it runs',
    confines: [
      'File-tool writes stay in the project and a private session workspace',
      'Reads elsewhere ask first; secret paths are denied everywhere',
      'High-risk commands such as force-push or pipe-to-shell are denied',
      'SSH and state-changing Terraform commands ask first',
      'Agent co-author trailers and session links are blocked',
    ],
    gap: 'Lexical: it sees explicit paths and known commands, not what a program does once it runs.',
  },
  {
    key: 'kernel',
    scope: 'Every session',
    title: 'Kernel command profile',
    covers: 'Each shell command, on macOS',
    confines: [
      'No reads of the rest of the home directory or Pi credentials',
      'Writes only to the project and temporary directories',
      'Network only through a proxy with a hostname allowlist',
      'Cloud CLI credentials only for commands I approve',
      'Git fetches over SSH but cannot push',
    ],
    gap: "Pi's own tools and extensions run outside the profile.",
  },
  {
    key: 'box',
    scope: 'On demand',
    title: 'paseo-box',
    covers: 'The whole Pi process, in a Linux container on Colima',
    confines: [
      'Default-deny egress firewall',
      'Harness and plugins mounted read-only',
      'Working checkout editable, its .git read-only',
      'No SSH keys, Git credentials, or Docker socket',
    ],
    gap: 'Commits, branches, and worktrees happen outside the box.',
  },
  {
    key: 'confidential',
    scope: 'On demand',
    title: 'Confidential mode',
    covers: 'The whole Pi process, with a local model',
    confines: [
      "The only network connection is the local model's port",
      'No DNS, so no other host is reachable',
      'No cloud model sees the work',
    ],
    gap: 'The work is limited to what a small local model can do.',
  },
];

const SCOPES = [...new Set(LAYERS.map((layer) => layer.scope))];

const GuardrailLayers = () => {
  const steps = useSlideSteps();
  const present = steps != null;
  const [selected, setSelected] = useState(0);
  const active = present ? Math.min(steps.step, LAYERS.length - 1) : selected;
  const layer = LAYERS[active];

  useEffect(() => {
    steps?.reportStepCount(LAYERS.length - 1);
  }, [steps]);

  return (
    <figure className="guardrail-layers" aria-labelledby="guardrail-layers-caption">
      <div className="gl-grid">
        <div className="gl-picker">
          {SCOPES.map((scope) => (
            <div className="gl-group" key={scope}>
              <span className="gl-eyebrow">{scope}</span>
              {LAYERS.map((item, index) =>
                item.scope !== scope ? null : (
                  <button
                    type="button"
                    key={item.key}
                    className={`gl-layer${index === active ? ' is-active' : ''}`}
                    aria-pressed={index === active}
                    aria-controls="guardrail-layers-detail"
                    onClick={present ? undefined : () => setSelected(index)}
                  >
                    <span className="gl-strength" aria-hidden="true">
                      {LAYERS.map((_, bar) => (
                        <span key={bar} className={bar <= index ? 'is-on' : ''} />
                      ))}
                    </span>
                    <span className="gl-layer-text">
                      <strong>{item.title}</strong>
                      <small>{item.covers}</small>
                    </span>
                  </button>
                )
              )}
            </div>
          ))}
        </div>

        <div className="gl-detail" id="guardrail-layers-detail" aria-live="polite">
          <h4>{layer.title}</h4>
          <span className="gl-detail-label">Confines</span>
          <ul>
            {layer.confines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="gl-gap">
            <span className="gl-detail-label">Still gets through</span>
            {layer.gap}
          </p>
        </div>
      </div>

      <figcaption id="guardrail-layers-caption">
        Each layer covers a gap the one before it leaves. The first two run in every
        session; I switch to the last two when the work needs a harder boundary.
      </figcaption>
    </figure>
  );
};

export default GuardrailLayers;
