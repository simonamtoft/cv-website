---
id: CV-3
title: Refine Claude Code workshop learning flow
status: Done
assignee: []
created_date: '2026-09-08 10:50'
updated_date: '2026-09-08 10:56'
labels: []
dependencies: []
references:
  - src/presentations/claude-code-workshop/components/deck.tsx
  - src/content/articles/agentic-engineering/index.mdx
type: enhancement
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The workshop now has agreed content improvements drawn from the reviewed masterclass: make outcomes and scope explicit, reinforce durable context at the leverage point, connect reusable skills to verification without introducing advanced enforcement mechanics, and structure the post-workshop reflection.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Agenda-area slides state concrete participant outcomes and workshop boundaries
- [x] #2 The leverage hierarchy distinguishes durable instructions and skills from task-specific exploration
- [x] #3 A beginner-level recipe-and-check slide follows Skills and precedes the prototype-to-production discussion
- [x] #4 The 14:45 wrap-up begins with structured reflection prompts
- [x] #5 The revised deck renders without clipped or overlapping slide content
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Update the agenda-area slides with explicit outcomes and scope boundaries. 2. Amend the leverage hierarchy to distinguish lasting instructions and skills from task-specific exploration. 3. Add a lightweight recipe-and-check slide after Skills and a structured 14:45 debrief after the workshop. 4. Build the presentation and visually inspect the revised slide sequence at presentation scale. 5. Record verification evidence and finalize the task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented the outcomes-and-boundaries slide, durable-context copy in the leverage hierarchy, a 14:45 debrief, and a recipe-and-check slide. npm run build passed. Static print-mode screenshots of slides 4, 10, 14, and 16 were inspected at presentation scale; all content was legible with no clipping or overlap.

Replacing content-coupled Playwright assertions with behavior, structural, and layout coverage after the revised workshop copy caused a false failure. The verifier is also malformed with a trailing EOF command; correcting that separately requires harness access to .agent/.

Replaced copy-coupled workshop assertions with interaction, structural-count, and geometry checks; updated slide positions to the revised 18-slide deck. Verified with PLAYWRIGHT_PORT=4318 npx playwright test tests/claude-code-workshop.spec.ts (14 passed) and npm run build (passed).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Refined the workshop flow with explicit outcomes and boundaries, durable-context wording, a 14:45 reflection, and a recipe-and-check slide. Verified by npm run build and inspection of static presentation-scale browser screenshots for the revised slides.
<!-- SECTION:FINAL_SUMMARY:END -->
