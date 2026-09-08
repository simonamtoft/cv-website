---
id: CV-5
title: Restructure Claude Code workshop around a self-paced 110-minute build block
status: Done
assignee:
  - '@siap'
created_date: '2026-09-08 15:21'
updated_date: '2026-09-08 15:42'
labels: []
dependencies: []
references:
  - src/presentations/claude-code-workshop/components/deck.tsx
  - src/presentations/claude-code-workshop/components/visuals.tsx
  - tests/claude-code-workshop.spec.ts
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The workshop no longer runs fixed breaks: participants pause when they need to, so the two 10-minute break slides are removed and their time folded into the hands-on block, which becomes 110 minutes. Presenting a long unbroken block needs a visible clock, and four teaching slides need refinement agreed with the presenter: the trifecta slide should show the three legs visually rather than as three unlinked blocks, the workshop-task slide should stop duplicating the debrief, the recipe-and-check slide should introduce hooks alongside skills, and the outlook slide should stop promising a quarter while its lead says permissions are unresolved.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The deck contains no break slides and no break entries in the schedule definition
- [x] #2 The schedule stays 13:00-16:00 and totals 180 minutes with a 110-minute workshop block, all derived from the single schedule definition
- [x] #3 The workshop slide shows a clock that counts down the workshop duration, starts when the slide is reached, keeps running across navigation away and back, and renders statically in overview thumbnails and print
- [x] #4 The trifecta slide shows the three legs and their overlap as a visual, with each countermeasure tied to the leg it removes
- [x] #5 The workshop-task slide covers only in-workshop steps and no longer repeats the debrief's share-a-finding prompt
- [x] #6 The recipe-and-check slide introduces hooks as the automatic check that complements a skill, with concrete examples instead of abstract chips
- [x] #7 The outlook slide's second track is framed by what it requires rather than by a calendar quarter, with trimmed lists
- [x] #8 The focused Playwright workshop suite and production build pass, and changed slides are visually verified in live, overview, print, and mobile rendering without clipping
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Replace the schedule definition with three sessions (30/110/40) and delete the break slide component, break rendering, and break slide entries. 2. Add a countdown clock visual to the workshop slide: SVG dial plus mm:ss, started by an IntersectionObserver on first sufficient visibility, kept in a ref so it survives re-entry, static full-duration render when slide motion is off. 3. Refine slide 10 into a three-circle overlap visual with numbered countermeasures; slide 14 to four in-workshop steps; slide 20 into skill-versus-hook with concrete SKILL.md and hook examples; slide 22 to a requirement-framed second track with trimmed lists. 4. Update the Playwright suite for the 21-slide order, the three-item schedule, the four exercise steps, and the countdown. 5. Run the focused suite plus build and inspect screenshots in live, overview, print, and 390x844 modes.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Schedule is now three sessions (30/110/40) derived from one definition; break slides and the break kind were deleted. WorkshopCountdown (visuals.tsx) starts on first >=60% viewport intersection, keeps a start timestamp in a ref so re-entry never restarts it, and renders the full duration when slide motion is off (overview thumbnails, print). Slide 10 became a three-circle overlap diagram with a shared 'DATA UD' core and countermeasures tagged 01/02/03; slide 14 dropped the debrief step to four steps; the recipe slide became Skill vs Hook with SKILL.md and .claude/settings.json examples; the outlook slide's second track is 'Kraever en aftale foerst' with trimmed one-line items. Verified: PLAYWRIGHT_PORT=4319 npx playwright test tests/claude-code-workshop.spec.ts --workers=1 (22 passed), npm run build (passed), and screenshots at 1920x1080 live, overview, print, and 390x844 mobile for slides 3, 10, 14, 15, 18, 20 - print shows the static 110:00 dial. Independent correctness review found no actionable issues.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Removed both fixed breaks and folded their 20 minutes into a 110-minute workshop block (13:00-16:00 unchanged, 21 slides), added a real-time countdown clock on the workshop slide that starts on arrival and survives navigation, and refined four teaching slides: a three-circle overlap diagram with leg-tagged countermeasures (10), a four-step workshop exercise without the debrief duplicate (14), Skill vs Hook with concrete file examples (18), and a requirement-framed outlook (20). Verified with the focused Playwright suite (22 passed, workers=1), npm run build, and live/overview/print/mobile screenshots of every changed slide.
<!-- SECTION:FINAL_SUMMARY:END -->
