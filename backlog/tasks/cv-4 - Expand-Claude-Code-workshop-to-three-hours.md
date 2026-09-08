---
id: CV-4
title: Expand Claude Code workshop to three hours
status: Done
assignee:
  - '@siap'
created_date: '2026-09-08 14:00'
updated_date: '2026-09-08 14:11'
labels: []
dependencies: []
references:
  - src/presentations/claude-code-workshop/components/deck.tsx
  - tests/claude-code-workshop.spec.ts
type: enhancement
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The agreed workshop format now needs a three-hour 13:00–16:00 agenda while preserving CV-3’s approved learning sequence. Central scheduling must prevent the agenda, break return cues, and workshop duration from drifting apart.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The deck shows a 13:00–16:00 schedule totaling 180 minutes: 30-minute introduction, two 10-minute breaks, 90-minute hands-on workshop, and 40-minute closing block
- [x] #2 Displayed session times, agenda proportions, workshop duration, and break return times derive from one local schedule definition
- [x] #3 The deck adds only two simple break slides; the post-workshop teaching sequence remains substantively unchanged
- [x] #4 The existing debrief keeps reflection and optional selected sharing on one slide, and the first outcome promises a checked result
- [x] #5 Focused workshop tests, production build, and live, overview, print, and mobile visual checks pass without clipping or overlap
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Define a local duration-based schedule and derive agenda labels, bar fractions, workshop duration, and break return times from it. 2. Update the program, outcome, workshop transition, and debrief copy; insert only the two requested break slides. 3. Realign focused structural/layout tests to the new slide order and schedule contract. 4. Run the focused suite and production build, then inspect live, overview, print, and mobile screenshots for every changed slide.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented a duration-derived 13:00–16:00 schedule, two return-time break slides, the 90-minute workshop transition, checked-result outcome, and selected-sharing debrief. Added schedule, break/transition, and debrief structural/layout coverage. Verified with PLAYWRIGHT_PORT=4319 npx playwright test tests/claude-code-workshop.spec.ts (20 passed), npm run build (passed), and screenshots of changed slides in live, overview, print, and 390×844 mobile modes.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Expanded the Claude Code workshop to a duration-derived three-hour schedule with two simple break slides, 90-minute workshop transition, checked-result outcome, and pair reflection with optional selected sharing. Verified with the focused Playwright suite (20 passed), production build, and screenshots of program, outcomes, both breaks, workshop transition, and debrief in live, overview, print, and 390×844 mobile rendering.
<!-- SECTION:FINAL_SUMMARY:END -->
