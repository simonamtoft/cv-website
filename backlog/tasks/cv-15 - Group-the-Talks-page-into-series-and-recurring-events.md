---
id: CV-15
title: Group the Talks page into series and recurring events
status: To Do
assignee: []
created_date: '2026-11-05 09:39'
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
- [ ] #1 Talks page lists one row per group or one-off event instead of one card per event
- [ ] #2 Subtasks are complete
<!-- AC:END -->
