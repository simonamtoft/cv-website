# PROGRESS
## Migration Progress
Tracking the transition from CV website to professional hub, as defined in
VISION.md.
Status: **In Progress**
Started: 2026-02-28

## Completed
- [x] Define site vision (VISION.md)
- [x] Create PROGRESS.md
- [x] Update CLAUDE.md for vision alignment
- [x] Update content-editor agent for professional hub scope
- [x] Update cv-content-reviewer agent for vision-aligned review criteria
- [x] Create ux-architect agent
- [x] Create design-system agent
- [x] Create migration-planner agent
- [x] Create docs-maintainer agent
- [x] Audit current site structure against vision goals
- [x] Create detailed migration roadmap with incremental steps
- [x] Fix job title inconsistency: standardised to "Senior Consultant, Data & AI"
- [x] Fix UMD education entry: added missing degree/institution fields
- [x] Add inline job title and company/institution to timeline cards
- [x] Add category badges (Work / Education / Community) to timeline cards
- [x] Rename nav label "Resume" → "Background"
- [x] Align modal colour system to orange design tokens (removed blue #007bff)
- [x] Rewrite About section as expert narrative (consulting positioning, no filler)
- [x] Add Services/Expertise section (5 outcome-focused service areas)
- [x] Rename "Publications & Events" → "Writing & Talks"
- [x] Rewrite Contact section with strong single CTA
- [x] Update page section order: About → Services → Background → Writing & Talks → Contact
- [x] Remove Services section (consulting-framed service cards don't fit technical practitioner positioning)
- [x] Update positioning framing: ML Engineer & Data Scientist as primary identity, consulting/advisory as context
- [x] Add React Router v6 — multi-page routing with separate URLs (/background, /writing, /contact); GitHub Pages deep-link workaround via 404.html
- [x] Restore `/about` as a distinct route — `<About />` moved off `/` to `/about`; `/` now renders hero only
- [x] Timeline.css padding cleanup — removed redundant top padding after routing restructure
- [x] Playwright test suite regenerated for multi-page routing — all 24 tests passing against new routes
- [x] playwright.config.js switched to system Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`)

## In Progress

## Up Next

### Positioning & Content
- [ ] Revise About section to carry technical practitioner positioning (ML/MLOps primary, GenAI secondary, consulting framing throughout)
- [ ] Update metadata (title, meta description, Schema.org jobTitle) with technical practitioner framing
- [ ] Add content to The Tech Collective role (currently blank — deferred until ready)
- [ ] Review and update all existing content for vision alignment (content-editor)
- [ ] Full content review before relaunch (cv-content-reviewer)

### Navigation
- [ ] Investigate navigation options - user prefers pill at top of page on home rather than bottom; explore: always-visible top pill (fixed from load), scroll-triggered top pill, or other patterns

### Potential Enhancements
- [ ] Dedicated Community section (if volunteering/IDA role grows significantly)
- [ ] Case studies or project spotlights (if client confidentiality allows)

## Decided Against / Deferred
- **Separate Writing and Talks sections**: Kept combined as "Writing & Talks" — volume doesn't yet justify splitting; revisit when content grows
- **Skills taxonomy display**: Orphaned skills.js data not surfaced as a standalone section — service areas convey expertise more effectively; revisit if client demand requires it
- **Navigation restructuring beyond relabelling**: Single-page scroll architecture retained for home; routing added for sub-pages
- **Services/Expertise section**: Built then removed — consulting-offerings framing (5 service cards) reads as a services menu, not a demonstration of technical expertise; About section carries positioning weight instead
