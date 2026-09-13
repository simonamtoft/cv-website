---
id: CV-13
title: Visualize the read-routing hand-off
status: Done
assignee:
  - '@pi'
created_date: '2026-09-13 16:06'
updated_date: '2026-09-13 16:39'
labels: []
dependencies: []
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Readers need to see how reference extraction moves out of parent context. User selected a dynamic direct-versus-delegated communication comparison using a documented README benchmark, with qualified token and cost figures.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Figure distinguishes hook redirect, parent dispatch, isolated extraction, evidence return, and direct-source verification/alternative.
- [x] #2 Right-hand communication diagram repeats automatically without tabs or deck fragments; readers can pause it and reduced motion starts paused.
- [x] #3 Reading and presentation modes are visually verified on desktop and mobile, with focused checks passing.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Replace status boxes with paired direct/delegated transfer diagrams and qualified code-file benchmark. 2. Per user follow-up, replace six tabs and deck fragments with a repeating right-hand animation; include pause, reduced motion, and offscreen/hidden-page timer cleanup. 3. Test looping, pause/resume, reduced motion and deck navigation; inspect desktop/mobile screenshots and run correctness review.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
User follow-up removed the six tabs and deck fragments. Right-hand flow now loops every 2.8 seconds per phase; pause/play, reduced-motion default, intersection/document visibility, and cleanup are implemented. PLAYWRIGHT_PORT=4318 npx playwright test tests/read-routing.spec.ts --reporter=line: 2 passed (4317 occupied, existing server left untouched). Inspected article/deck screenshots at 1440x1000 and 390x844, including expanded benchmark notes and mobile deck scrolling. Independent correctness review found only a missing public benchmark source URL. The supplied local README is attributed, but no canonical public URL was available; attempted remote lookup was sandbox-denied and no URL was invented.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced status boxes with direct/delegated SVG communication diagrams, token bars and qualified README benchmark estimates. The right-hand diagram loops automatically without tabs; supports pause, reduced motion, and normal slide navigation. Two focused Playwright tests pass; desktop/mobile article and presentation screenshots inspected. Review raised only public benchmark traceability, retained as an explicit limitation.
<!-- SECTION:FINAL_SUMMARY:END -->
