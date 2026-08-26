import React from 'react';

const ContextSelection = () => (
  <figure className="bga-visual context-selection" aria-labelledby="context-selection-caption">
    <div className="cs-compare">
      <section className="cs-option cs-noisy">
        <p className="cs-label">Everything available</p>
        <div className="cs-docs" aria-label="A noisy set of source material">
          <span>Old notes</span>
          <span>Conflicting draft</span>
          <span>Unrelated spreadsheet</span>
          <span>Sensitive document</span>
          <span>Unlabelled sources</span>
        </div>
        <p className="cs-outcome">More noise, contradictions, and exposure</p>
      </section>
      <span className="cs-versus" aria-hidden="true">instead</span>
      <section className="cs-option cs-useful">
        <p className="cs-label">Smallest useful set</p>
        <div className="cs-docs" aria-label="A focused set of source material">
          <span>Current brief</span>
          <span className="authoritative">Authoritative policy</span>
          <span>Relevant excerpt</span>
          <span>Defined terms</span>
        </div>
        <p className="cs-outcome">A clearer, safer working set</p>
      </section>
    </div>
    <figcaption id="context-selection-caption">
      More context is not automatically better. Prefer relevant, labelled material and state which source wins.
    </figcaption>
  </figure>
);

export default ContextSelection;
