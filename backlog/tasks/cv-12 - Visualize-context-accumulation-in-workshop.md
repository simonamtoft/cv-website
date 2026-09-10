---
id: CV-12
title: Visualize context accumulation in workshop
status: Done
assignee:
  - '@pi'
created_date: '2026-09-10 12:22'
updated_date: '2026-09-10 12:31'
labels: []
dependencies: []
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Explain context before the first exercise through a slow automatic chat and context-window animation, with easily adjustable speed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Slide follows folder scope and shows messages, read file content and replies accumulating
- [x] #2 One named variable controls slow automatic pacing; still and reduced-motion views remain readable
- [x] #3 Rendered slide and animation verified
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add synchronized chat/context visual using existing slide motion conventions. 2. Insert after folder scope. 3. Verify browser rendering and lifecycle.
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added context slide after folder scope with 5-second automatic steps and a replay hold; STEP_DURATION_MS controls pacing and transitions. Playwright browser checks passed for accumulation, replay, reduced-motion startup and no page errors. Desktop and mobile screenshots inspected and overflow corrected. git diff --check passed. Independent review found no issue in task files; its schedule finding concerns pre-existing content outside this change and was left untouched.
<!-- SECTION:FINAL_SUMMARY:END -->
