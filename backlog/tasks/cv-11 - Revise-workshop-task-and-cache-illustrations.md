---
id: CV-11
title: Revise workshop task and cache illustrations
status: Done
assignee:
  - '@pi'
created_date: '2026-09-10 12:06'
updated_date: '2026-09-10 12:09'
labels: []
dependencies: []
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Follow-up to CV-9: the user finds the bar-based cache diagram visually weak and approved a conversation timeline plus a matching revision of the task illustration.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Cache illustration shows three conversation turns distinguishing reused context from new input
- [x] #2 Both illustrations share a coherent visual style while retaining concise Danish guidance
- [x] #3 Desktop and mobile screenshots inspected for clipping and layout issues
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Replace bar diagrams with a task-splitting illustration and a conversation timeline. 2. Inspect desktop/mobile screenshots and refine spacing. 3. Run focused workshop checks.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Replaced token bars with accessible SVG illustrations: a crowded document stack splitting into three focused task sheets, and a three-turn conversation timeline with reused context and separate new-input tags. Inspected 1920x1080 and 390x844 screenshots; constrained illustration height after detecting overlap on the first capture. Final screenshots show clear separation and no clipping; mobile retains the existing scaled-slide presentation. No browser errors. All seven workshop Playwright tests passed on port 4399; git diff --check passed.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Revised both illustrations in the approved conversation-timeline direction while retaining concise guidance. Desktop/mobile screenshots inspected; seven workshop tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
