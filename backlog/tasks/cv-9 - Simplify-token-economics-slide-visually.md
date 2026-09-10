---
id: CV-9
title: Simplify token economics slide visually
status: Done
assignee:
  - '@pi'
created_date: '2026-09-10 11:57'
updated_date: '2026-09-10 12:00'
labels: []
dependencies: []
references:
  - 'https://code.claude.com/docs/en/prompt-caching'
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Implement the approved two-diagram Danish redesign: the existing slide is too text-heavy for explaining focused context and cache reuse.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Two diagrams explain smaller relevant context and cheaper cached input with concise Danish copy
- [x] #2 Shared rule distinguishes continuing the same task from starting a chat for new scope; cache guidance matches current official docs
- [x] #3 Desktop and mobile screenshots inspected without clipping
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Verify cache guidance. 2. Replace slide body with context and cache diagrams plus a shared action strip. 3. Inspect desktop/mobile captures and run focused checks.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verified official prompt-caching docs on 2026-09-10: TTL is five minutes or one hour depending on billing/configuration and refreshes on hits; effort invalidation has model-specific exceptions. Retained practical choose-model-and-effort-at-start guidance. Inspected 1920x1080 and 390x844 screenshots; fixed diagram heights and border styles after first capture. No clipping or browser errors; mobile preserves the existing scaled landscape slide (small text by design). All 7 workshop Playwright tests passed on port 4399; git diff --check passed. Existing schedule.js changes left untouched.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced dense paragraphs with two context/cache diagrams and a shared chat-switching rule. Verified desktop/mobile rendering and all seven workshop tests.
<!-- SECTION:FINAL_SUMMARY:END -->
