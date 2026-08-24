import React, { useState } from 'react';
import { useViewMode } from '../../../components/articles/Slide';
import claudeCodeIcon from '../../../assets/claude-code.svg?raw';
import codexIcon from '../../../assets/codex-openai.svg?raw';
import copilotIcon from '../../../assets/githubcopilot.svg?raw';
import opencodeIcon from '../../../assets/opencode.svg?raw';
import piIcon from '../../../assets/pi-coding-agent.svg?raw';

// The composition that opens harness engineering, drawn instead of listed: an
// Agent is one Model (the weights - fixed, not yours to touch, so amber like the
// "plant" elsewhere) wrapped in a Harness of everything else. Each harness box
// carries one or more control-tier dots - provider-set / configured / authored.
// The interaction is a tool switcher: the same pieces land in different tiers
// depending on the harness, which is the whole "provider-dependent" point made
// literal - switch from Claude Code to a raw SDK and the dots re-tier. Two
// composites (Guardrails, Feedback loops) are assembled from the others, marked
// with a dashed border and *. Description of *why* each piece exists is left to
// the Primitives visual downstream; this one is purely the control lens.
const TIERS = {
  provider: { label: 'Provider-set', hint: 'a given from your tool - you do not dial it' },
  configured: { label: 'Configured', hint: 'a setting or flag you toggle' },
  authored: { label: 'Authored', hint: 'written by you from nothing' },
};

// The spread makes the point, and it reads as a gradient. The batteries-included
// harnesses (Claude Code, Codex, Copilot) come out near-identical - much is
// handed to you; OpenCode is the same except it ships no default sandbox
// (execution is permission-based), so its Sandbox box drops to Authored; and Pi,
// a minimal harness, pushes almost everything into Authored. Tiers follow each
// tool's own docs: Codex (developers.openai.com/codex) and Copilot
// (docs.github.com) ship built-in tools, MCP, a default sandbox, approval/
// permission profiles, and subagents; Codex adds a personality-selection knob on
// the system prompt. OpenCode (opencode.ai) has MCP, agents, plugins/hooks and
// permissions but no default sandbox. Pi (pi.dev) deliberately omits MCP,
// sub-agents, permission popups, and background bash, as build-it-yourself
// extensions.
const TOOLS = [
  { key: 'claude-code', label: 'Claude Code', icon: claudeCodeIcon },
  { key: 'codex', label: 'Codex', icon: codexIcon },
  { key: 'copilot', label: 'Copilot', icon: copilotIcon },
  { key: 'opencode', label: 'OpenCode', icon: opencodeIcon },
  { key: 'pi', label: 'Pi', icon: piIcon },
];

const HARNESS = [
  {
    name: 'System prompt',
    tiers: {
      'claude-code': ['provider', 'authored'],
      codex: ['provider', 'configured', 'authored'],
      copilot: ['provider', 'authored'],
      opencode: ['provider', 'authored'],
      pi: ['provider', 'authored'],
    },
  },
  {
    name: 'Tools',
    tiers: {
      'claude-code': ['provider', 'configured', 'authored'],
      codex: ['provider', 'configured', 'authored'],
      copilot: ['provider', 'configured', 'authored'],
      opencode: ['provider', 'configured', 'authored'],
      pi: ['provider', 'authored'],
    },
  },
  {
    name: 'Orchestration',
    tiers: {
      'claude-code': ['provider', 'authored'],
      codex: ['provider', 'authored'],
      copilot: ['provider', 'authored'],
      opencode: ['provider', 'authored'],
      pi: ['authored'],
    },
  },
  {
    name: 'Sandbox',
    tiers: {
      'claude-code': ['provider', 'configured'],
      codex: ['provider', 'configured'],
      copilot: ['provider', 'configured'],
      opencode: ['authored'],
      pi: ['authored'],
    },
  },
  {
    name: 'Guardrails',
    composite: true,
    tiers: {
      'claude-code': ['configured', 'authored'],
      codex: ['configured', 'authored'],
      copilot: ['configured', 'authored'],
      opencode: ['configured', 'authored'],
      pi: ['authored'],
    },
  },
  {
    name: 'Hooks',
    tiers: {
      'claude-code': ['authored'],
      codex: ['authored'],
      copilot: ['authored'],
      opencode: ['authored'],
      pi: ['authored'],
    },
  },
  {
    name: 'Feedback loops',
    composite: true,
    tiers: {
      'claude-code': ['authored'],
      codex: ['authored'],
      copilot: ['authored'],
      opencode: ['authored'],
      pi: ['authored'],
    },
  },
];

const AgentAnatomy = () => {
  const view = useViewMode();
  const [tool, setTool] = useState(TOOLS[0].key);

  return (
    <div className="agent-anatomy" data-visual="agent-anatomy" data-view={view}>
      <div className="aa-tools" role="group" aria-label="Harness / tool">
        {TOOLS.map((t) => (
          <button
            type="button"
            className={`aa-tool${t.key === tool ? ' active' : ''}`}
            key={t.key}
            aria-pressed={t.key === tool}
            onClick={() => setTool(t.key)}
          >
            <span
              className="aa-tool-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: t.icon }}
            />
            <span className="aa-tool-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="aa-frame">
        <span className="aa-frame-label">Agent</span>

        <div className="aa-model">
          <span className="aa-model-name">Model</span>
          <span className="aa-model-sub">the weights - fixed, not yours to change</span>
        </div>

        <div className="aa-harness">
          <span className="aa-harness-label">
            Harness <em>everything else - yours to engineer, to varying degrees</em>
          </span>
          <div className="aa-boxes">
            {HARNESS.map((p) => (
              <span className={`aa-box${p.composite ? ' aa-composite' : ''}`} key={p.name}>
                <span className="aa-box-name">
                  {p.name}
                  {p.composite && (
                    <span className="aa-star" aria-hidden="true">
                      *
                    </span>
                  )}
                </span>
                <span className="aa-box-tags">
                  {p.tiers[tool].map((tier) => (
                    <span
                      className={`aa-dot aa-tier-${tier}`}
                      key={tier}
                      title={TIERS[tier].label}
                    />
                  ))}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="aa-legend">
        {Object.entries(TIERS).map(([key, tier]) => (
          <span className={`aa-legend-item aa-tier-${key}`} key={key}>
            <span className="aa-dot" />
            <span className="aa-legend-label">{tier.label}</span>
            <span className="aa-legend-hint">{tier.hint}</span>
          </span>
        ))}
        <span className="aa-legend-item aa-legend-composite">
          <span className="aa-star" aria-hidden="true">
            *
          </span>
          <span className="aa-legend-hint">assembled from the other pieces</span>
        </span>
      </div>

      <p className="aa-caption">
        Switch harness to see selected pieces land in different tiers - which
        tier a piece falls in is provider-dependent. Pi, a minimal harness, omits
        MCP, sub-agents, and permission popups by design, so most pieces are yours
        to author.
      </p>
    </div>
  );
};

export default AgentAnatomy;
