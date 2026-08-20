import React, { useState } from 'react';

const FILES = [
  {
    id: 'skill',
    name: 'SKILL.md',
    path: 'release-check/SKILL.md',
    content: `---
name: release-check
description: Verify a release before it ships.
---

# Release check

1. Run \`scripts/check-release.sh\`.
2. Investigate any failure before continuing.
3. Report the checks run and their results.

## Gotchas

- A clean build does not prove the working tree is clean.`,
  },
  {
    id: 'script',
    name: 'check-release.sh',
    path: 'release-check/scripts/check-release.sh',
    content: `#!/usr/bin/env bash
set -euo pipefail

npm test --silent
npm run build --silent
git diff --check`,
  },
  {
    id: 'reference',
    name: 'gotchas.md',
    path: 'release-check/references/gotchas.md',
    content: `# Gotchas

- Generated files may change during the build.
- A passing unit suite does not verify the browser flow.
- Check the release artifact, not only the source tree.`,
  },
];

const SkillExplorer = () => {
  const [activeId, setActiveId] = useState(FILES[0].id);
  const activeFile = FILES.find(({ id }) => id === activeId);

  return (
    <figure className="skill-explorer" aria-labelledby="skill-explorer-caption">
      <div className="skill-workbench">
        <nav className="skill-file-tree" aria-label="Example skill files">
          <strong className="skill-tree-heading">Explorer</strong>
          <span className="skill-root"><span aria-hidden="true">⌄</span> release-check</span>

          <button
            type="button"
            className={activeId === 'skill' ? 'active' : ''}
            aria-pressed={activeId === 'skill'}
            onClick={() => setActiveId('skill')}
          >
            <span className="skill-file-icon markdown" aria-hidden="true">M↓</span>
            SKILL.md
          </button>

          <span className="skill-folder"><span aria-hidden="true">⌄</span> scripts</span>
          <button
            type="button"
            className={activeId === 'script' ? 'active nested' : 'nested'}
            aria-pressed={activeId === 'script'}
            onClick={() => setActiveId('script')}
          >
            <span className="skill-file-icon shell" aria-hidden="true">$_</span>
            check-release.sh
          </button>

          <span className="skill-folder"><span aria-hidden="true">⌄</span> references</span>
          <button
            type="button"
            className={activeId === 'reference' ? 'active nested' : 'nested'}
            aria-pressed={activeId === 'reference'}
            onClick={() => setActiveId('reference')}
          >
            <span className="skill-file-icon markdown" aria-hidden="true">M↓</span>
            gotchas.md
          </button>
        </nav>

        <section className="skill-editor" aria-live="polite">
          <div className="skill-editor-tab">
            <span className="skill-file-icon" aria-hidden="true">◇</span>
            {activeFile.name}
          </div>
          <div className="skill-breadcrumb">
            skills / {activeFile.path.split('/').join(' / ')}
          </div>
          <pre aria-label={`Contents of ${activeFile.path}`}>
            <code>
              {activeFile.content.split('\n').map((line, index) => (
                <span className="skill-code-line" key={`${activeFile.id}-${index}`}>
                  <span className="skill-line-number" aria-hidden="true">{index + 1}</span>
                  <span>{line || ' '}</span>
                </span>
              ))}
            </code>
          </pre>
        </section>
      </div>

      <figcaption id="skill-explorer-caption">
        The entry point stays short. Scripts carry repeatable mechanics; references hold detail that is loaded only when needed.
      </figcaption>
    </figure>
  );
};

export default SkillExplorer;
