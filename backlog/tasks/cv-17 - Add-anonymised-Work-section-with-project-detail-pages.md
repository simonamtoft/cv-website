---
id: CV-17
title: Add anonymised Work section with project detail pages
status: In Progress
assignee:
  - '@opus'
created_date: '2026-11-24T09:53:00Z'
updated_date: '2026-11-24T10:44:00Z'
labels: []
dependencies: []
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The site only shows projects inside the Background timeline modals, tied to named employers. VISION.md wants depth shown without client-specific detail, so visitors evaluating Simon need a dedicated showcase. Decisions from the user: top-level /work page labelled 'Work'; cards linking to /work/<slug> detail pages; industry-only anonymisation (no employer or client names on the showcase, Background timeline unchanged); detail pages must be able to host an embedded demo later, but no demo is built in this task.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 /work lists projects as cards showing title, summary, industry, period and technologies
- [ ] #2 Each card links to a prerendered /work/<slug> detail page with its own title and description meta
- [x] #3 Work appears in the primary and mobile navigation between About and Background
- [x] #4 No employer or client name appears on /work or any detail page
- [x] #5 A detail page's MDX can import and embed a React component (the demo slot)
- [x] #6 AGENTS.md documents the Work content type
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Content bundles in src/content/work/<slug>/index.mdx (frontmatter: title, summary, slug, industry, period, technologies, order), discovered by src/data/work.js via import.meta.glob, mirroring the article system.
2. Routes work and work/:slug; prerender list extended from the content folder names.
3. Work.jsx card grid and work/WorkDetailView.jsx reusing the article reading styles; new styles in Work.css.
4. Add Work to config.navigation and Nav ROUTE_META; update the navigation test path list.
5. Draft six project pages from the existing workExperience descriptions only, with names removed.
6. Verify with build and screenshots at desktop and 390px; update AGENTS.md.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verified on the dev server with screenshots at 1280 and 390 px (/work and one detail page), the header-navigation Playwright test, a throwaway MDX import of a React component on a detail page, and a name grep over the work sources. AC 2 (prerender) is unverified: react-router build cannot prerender inside the agent's command sandbox (port 0 blocked); the end-of-turn verifier runs the build. Project copy is drafted only from the existing workExperience descriptions and awaits Simon's confidentiality review before the task is marked Done. Phone tab bar label for Background shortened to Career to fit seven tabs.

Added a schematic cover.svg per project (shapes only, site palette), shown on each card and at the top of each project page. Verified with screenshots at 1280 and 390 px.

Per Simon: removed all projects arrays from workExperience.jsx (work roles no longer open a modal; education still does). Added Work pages and covers for the Claude Code course and the ML platform blueprint; the other five timeline-only projects were dropped from the site on his instruction. Light humanize pass on the Work copy. timeline-section test now waits for hydration because its first details item moved far down the page and the click was lost before hydration.

Revised Work copy after confidentiality review: removed the case-file page count, described manual handling and printing generically, and noted that taxonomy classification expanded to multiple enterprise customers.
<!-- SECTION:NOTES:END -->
