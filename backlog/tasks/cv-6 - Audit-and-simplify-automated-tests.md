---
id: CV-6
title: Audit and simplify automated tests
status: Done
assignee:
  - '@siap'
created_date: '2026-09-08 15:55'
updated_date: '2026-09-08 16:04'
labels: []
dependencies: []
type: chore
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The repository's Playwright suite has accumulated editorial, DOM-shape, CSS, element-count, slide-position, and pixel-geometry assertions. These make content and visual iteration expensive without reliably protecting user behavior. Retain stable integration and journey coverage, move logic checks to the narrowest practical owner, and document why each changed test is durable or disposable.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Browser coverage is limited to meaningful route, interaction, accessibility, prerender, and presentation journeys
- [x] #2 Incidental copy, DOM structure, CSS class, element count, slide position, and layout geometry assertions are removed or replaced unless they encode an explicit contract
- [x] #3 Genuine business rules, state transitions, public interfaces, critical journeys, and known regressions retain durable coverage
- [x] #4 The audit records the contract protected or not protected by every changed or removed test
- [x] #5 Relevant remaining tests pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Classify every existing Playwright test by the stable contract it protects and identify overlap or incidental assertions.
2. Consolidate the core site, article, timeline, and presentation journeys; retain explicit prerender, schedule, countdown, routing, and interaction contracts while removing visual/editorial checks.
3. Add an audit note mapping every changed or removed test to its retained or discarded contract.
4. Run focused Playwright suites, then update the task with verification evidence.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Reduced the suite from 57 browser tests to 21 browser journeys plus 2 runner-level rule tests. Extracted the workshop schedule into a pure module so exact agenda derivation is tested without rendering the deck; moved publication destination rules to a data-level test. Removed geometry, CSS, editorial inventory, and duplicate route assertions. docs/test-audit.md records every changed or removed contract. Verification: PLAYWRIGHT_PORT=4324 npx playwright test --workers=1 (23 passed); after review hardening, PLAYWRIGHT_PORT=4325 npx playwright test tests/claude-code-workshop.spec.ts --workers=1 (5 passed). Correctness review identified that a != countdown assertion could accept a reset; fixed it to require the visible remaining time to decrease across navigation.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Simplified the Playwright suite around durable navigation, article, modal, prerender, and presentation journeys; moved workshop schedule and publication-routing rules to non-browser tests; and documented every changed or removed contract. All 23 remaining tests passed, and the review-driven countdown persistence assertion passed in the focused 5-test workshop suite.
<!-- SECTION:FINAL_SUMMARY:END -->
