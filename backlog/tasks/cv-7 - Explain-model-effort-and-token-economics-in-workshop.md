---
id: CV-7
title: Explain model effort and token economics in workshop
status: Done
assignee:
  - '@pi'
created_date: '2026-09-09 11:49'
updated_date: '2026-09-09 12:58'
labels: []
dependencies: []
references:
  - 'https://code.claude.com/docs/en/model-config'
  - 'https://code.claude.com/docs/en/prompt-caching'
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Workshop attendees need practical guidance for allocating model capability and reasoning effort, keeping work small, and understanding cache reuse. User approved two visual slides and verified English Claude labels, with Medium as the workshop rule of thumb.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Two Danish visual slides follow planning and distinguish model choice, effort, small verified tasks, and prefix caching
- [x] #2 English effort labels match Claude documentation and Medium guidance is identified as a practical rule of thumb
- [x] #3 Desktop and mobile screenshots are inspected for clipping and layout issues
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Check official model and caching documentation. 2. Add two static diagrams using existing slide primitives; soften the planning claim. 3. Verify rendered desktop/mobile slides and focused checks.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Checked official Claude Code model-config and prompt-caching docs. English scale: Low, Medium, High, Extra High (xhigh), Max; Ultracode separately explained as xhigh plus workflow orchestration. Medium is explicitly a workshop rule of thumb, not the vendor default. Desktop 1920x1080 and mobile 390x844 screenshots inspected; shortened first title to fix footer overlap. Existing scaled landscape mobile presentation retained. Updated countdown test deep link from slide 15 to 17. All 5 workshop Playwright tests passed; git diff --check passed.

Verifier repair: Primary locator also matched Primary mobile. Added exact:true in tests/header-navigation.spec.ts. Ran verifier checks individually because direct script execution was blocked: production build passed; article sources 35 OK, one HTTP 403 blocked, zero broken; all 23 Playwright tests passed on port 4399; npm audit found zero vulnerabilities. git diff --check passed.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added slides 12 and 13 after planning: model/effort choices with Medium highlighted, and small checked tasks plus cache-prefix reuse. Softened the planning slide's deterministic quality claim. Verified official terminology, desktop/mobile screenshots, and all five workshop tests.

Repaired ambiguous navigation test selector. Build, all 23 tests and dependency audit pass; source check reports one blocked URL and no broken links.
<!-- SECTION:FINAL_SUMMARY:END -->
