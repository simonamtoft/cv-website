---
id: CV-15
title: Group the Talks page into series and recurring events
status: Done
assignee: []
created_date: '2026-11-05 09:39'
updated_date: '2026-11-05 13:14'
labels: []
dependencies: []
references:
  - src/components/Talks.jsx
  - src/components/Writing.jsx
  - src/data/publicationsEvents.js
priority: medium
type: enhancement
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The Talks page (/talks) shows 12 flat cards in a grid. Many of them belong together: five "Agentic Coding" (Kod med AI) webinars form one series, and Driving IT and Driving AI are yearly IDA conferences with two editions each. The flat grid hides that continuity and repeats series context in every card. Decisions agreed with Simon: a Writing-style vertical list where each group row opens as an inline accordion on the same page (no per-group routes, no modal); the closed row shows the group title and a general description only (no aggregate counts or averaged ratings); one-off events such as IDA Youth Summit render as a plain row linking out, with nothing to expand; the agent drafts the group and shortened event copy for Simon to review.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Talks page lists one row per group or one-off event instead of one card per event
- [x] #2 Subtasks are complete
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Talks page now lists one row per group (Agentic Coding, Driving IT, Driving AI) or one-off (IDA Youth Summit), with events in inline accordions; delivered by CV-15.1 and CV-15.2 (commit 48ebd7c). Verified by server-rendering /talks from the built server bundle: 4 rows, 3 collapsed aria-expanded toggles, event titles and recording links present in HTML. Full npm run build prerender could not complete in the agent sandbox (loopback connects blocked, EPERM); the same failure occurs on the pre-change commit 3e85e4f.
<!-- SECTION:FINAL_SUMMARY:END -->
