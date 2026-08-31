---
id: CV-1
title: Redesign Claude Code workshop exercise slide
status: Done
assignee: []
created_date: '2026-08-31 16:40'
updated_date: '2026-08-31 16:47'
labels: []
dependencies: []
references:
  - src/presentations/claude-code-workshop/components/deck.tsx
  - tests/claude-code-workshop.spec.ts
type: enhancement
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace slide 11's generic task ideas with a bounded exercise that leads workshop participants through a realistic end-to-end Claude Code change: orient in the repository, plan, implement, verify, and review.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Slide 11 presents a clear, actionable end-to-end exercise rather than generic task categories
- [x] #2 The exercise reinforces the workshop's existing plan-first, small-task, and verification guidance
- [x] #3 Slide 11 remains legible and contained in live, overview, print, and mobile presentation modes
- [x] #4 Presentation tests and production build pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reframe slide 11 as a five-step end-to-end delivery loop matched to the workshop narrative.
2. Adapt the slide layout and update its presentation-mode regression test.
3. Run the focused Playwright test and production build.
4. Capture and inspect desktop and mobile renders, then record the result.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Reframed slide 11 as a low-stakes, five-step exploration: choose a small example, open the folder, request a plan, try and check an edit, then share a finding. The task deliberately says completion is unnecessary.

Validation passed: focused Playwright slide-11 test (live, overview, print, mobile); npm run build; desktop and 390px slide screenshots inspected.

Independent correctness review found verification/review were implicit. Updated step 04 to explicitly run a check and inspect the result or diff; focused test and visual capture passed afterward.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced generic slide-11 task families with a low-stakes Claude Code exploration that gets participants hands-on without requiring a finished deliverable. Verified with focused Playwright coverage, a production build, and inspected desktop/mobile screenshots; review feedback made checking and diff/result review explicit.
<!-- SECTION:FINAL_SUMMARY:END -->
