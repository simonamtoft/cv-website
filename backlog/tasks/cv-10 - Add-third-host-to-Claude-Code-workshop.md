---
id: CV-10
title: Add third host to Claude Code workshop
status: Done
assignee:
  - '@siap'
created_date: '2026-09-10 12:05'
updated_date: '2026-09-10 12:16'
labels: []
dependencies: []
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The workshop contact slide currently presents only Simon and Jeppe. Victor Emil Funch also hosts the workshop and needs equal visibility with a concise AI engagement positioning and direct contact details.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The hosts slide presents Simon, Jeppe Rasmussen, and Victor Emil Funch with equal visual weight
- [x] #2 Victor is identified as Engagement Manager with vifu@implement.dk and an AI-focused positioning line
- [x] #3 All three host panels remain legible and free of clipping at the presentation's 1920x1080 canvas
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Convert the host area from two to three equal portrait columns while preserving the existing card treatment and animation.
2. Add Victor Emil Funch with his Implement title, selected AI positioning, email, and supplied portrait.
3. Run a focused build and visually inspect the 1920x1080 hosts slide for crop, contrast, and overflow.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented a three-column portrait layout with compact card typography. Added Victor Emil Funch as Engagement Manager, Implement, with the selected AI positioning and mail link. Validation: npm run build passed; Playwright rendered the host slide in its fixed 16:9 canvas and the captured thumbnail showed all three panels, names, roles, emails, and bios without clipping.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Victor Emil Funch to the workshop host slide and rebalanced the existing portrait layout into three equal columns. Verified via a successful production build and Playwright-rendered visual inspection of the complete slide.
<!-- SECTION:FINAL_SUMMARY:END -->
