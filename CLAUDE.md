# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository. Refer to VISION.md for the site's purpose and direction,
and PROGRESS.md for current migration status.

## Project Overview

This is Simon Amtoft Pedersen's personal professional hub, built with React and
deployed to GitHub Pages at https://amtoft.dev. The site's purpose is to
establish a strong, coherent professional presence that positions Simon as a
trusted expert in data science and AI — generating inbound opportunities from
clients, collaborators, and the broader professional community.

The site originated as a digital CV and is currently being migrated toward the
vision defined in VISION.md. See PROGRESS.md for what has been completed and
what is next.

## Vision Alignment

All development decisions should be guided by these principles from VISION.md:

1. **Substance over style.** Every section should communicate real competence.
   Avoid generic filler and buzzwords.
2. **Show, don't just list.** Demonstrate expertise through context —
   publications, talks, community roles — rather than listing skills and job
   titles.
3. **Professional but approachable.** Confident and direct tone, without being
   stiff or self-promotional.
4. **Confidentiality-aware.** Convey depth of experience without exposing
   client-specific details.
5. **Evolve incrementally.** New content types may be added as they become
   relevant. The architecture should support this without requiring rewrites.

## Audience

The site serves these groups, in priority order:

1. **Potential clients and decision-makers** — evaluating whether to engage Simon
   for data and AI work.
2. **Industry peers and collaborators** — fellow practitioners who may want to
   collaborate, exchange ideas, or invite Simon to speak or contribute.
3. **The broader professional community** — conference attendees, readers of
   published articles, and others exploring the data and AI space.
4. **Recruiters and employers** — people assessing Simon's background and fit for
   opportunities.

## Development Commands

```bash
# Start development server (runs on localhost:3000)
npm start

# Build production bundle
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

The `npm run deploy` command automatically builds the site and pushes to the
gh-pages branch.

## Visual Verification with Playwright

After making visual changes (colors, layout, components), take screenshots to
verify correctness. The dev server must be running on localhost:3000 first.

Use system Chrome (Playwright browsers may not be installed):

```js
// Run with: node -e "<contents>"
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const [route, name] of [['/', 'home'], ['/about', 'about'], ['/background', 'bg'], ['/writing', 'writing'], ['/contact', 'contact']]) {
    await page.goto('http://localhost:3000' + route);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/cv-' + name + '.png' });
  }
  // Modal check
  await page.goto('http://localhost:3000/background');
  await page.waitForTimeout(1500);
  await page.click('.timeline-item.has-details');
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/cv-modal.png' });
  await browser.close();
})();
```

Then read each `/tmp/cv-*.png` with the Read tool to visually inspect.

**What to check after style changes:**
- Correct background, text, and accent colors on all pages
- Nav pill renders with correct glassmorphism and active link color
- Timeline center line, dots, and category badges look correct
- Modal: correct surface color, backdrop, and tech tag tints
- No layout breakage — check mobile too with `setViewportSize({ width: 390, height: 844 })`

## Architecture

### Migration Context

The site is transitioning from a single-page CV layout to a professional hub.
The current architecture (described below) is the starting point. New sections
and components will be added incrementally as the migration progresses. See
PROGRESS.md for the current state.

Anticipated additions include:
- Community section (speaking, organising, volunteering reframed) if content warrants
- Writing/Insights section (thought leadership) as content grows
- Note: Services section was built and removed — About carries positioning weight

The existing architecture documentation below reflects the **current** codebase.
Update it as code changes.

### Routing

The site uses React Router v6 with `BrowserRouter`. Routes:

| Path | Component rendered | Nav label |
|---|---|---|
| `/` | `<Header />` (hero only) | - |
| `/about` | `<About />` | About |
| `/background` | `<Timeline />` | Background |
| `/writing` | `<PublicationsEvents />` | Writing & Talks |
| `/contact` | `<Contact />` | Contact |

Unknown paths redirect to `/` via a catch-all `<Navigate to="/" replace />` route.

GitHub Pages deep-link workaround: `public/404.html` stores the requested path
in sessionStorage; `public/index.html` restores it via `history.replaceState`
so React Router sees the correct URL on first load.

### Component Structure

The app uses a multi-page routing architecture:

- **App.js**: Root container — mounts `BrowserRouter`, `ScrollToTop`, `Nav`,
  the route tree, and `Footer`. Does not render page content directly; each
  route renders its own component.
- **Nav.js**: Fixed pill navigation bar — uses `NavLink` for active-link
  highlighting. On `/` starts absolute then transitions to fixed on scroll >60px;
  on all other routes always fixed. Links: About (`/about`) / Background
  (`/background`) / Writing & Talks (`/writing`) / Contact (`/contact`).
- **PageNav.js**: Prev/next navigation rendered at the bottom of each sub-page.
  Accepts `prev` and `next` props (`{ label, path }`). About has next only;
  Contact has prev only; Background and Writing & Events have both.
- **ScrollToTop.js**: Fires `window.scrollTo(0, 0)` on every route change.
- **Header.js**: Hero page (`/`) — tagline, CTA "Let's Talk" button, LinkedIn
  link. Rendered only at the root route.
- **About.js**: About page (`/about`) — carries technical practitioner
  positioning.
- **Timeline.js**: Background page (`/background`) — merges and displays
  chronological data from three sources (work experience, education,
  volunteering). Renders clickable timeline items that can open modals when they
  contain detailed information. Cards display inline `.timeline-job-title` and
  `.timeline-org-name`, plus category badges (Work / Education / Community).
- **TimelineDetailModal.js**: Modal component that displays detailed information
  for timeline items, including key projects (for work experience) and
  coursework tables (for education). Supports keyboard navigation (Escape to
  close) and click-outside-to-close functionality.
- **PublicationsEvents.js**: Writing page (`/writing`) — showcases publications
  and speaking/organiser events.
- **Contact.js**: Contact page (`/contact`) — "Let's Talk" heading, email and
  social links.
- **Footer.js**: Site footer — rendered on all routes outside the route tree.
- **ErrorBoundary.js**: Wraps components to catch and handle React errors
  gracefully.
- **Data files** (`src/data/`): Content is separated from presentation logic in
  dedicated data files (workExperience.js, education.js, volunteering.js,
  publicationsEvents.js)
- **config.js**: Central configuration file containing personal information
  (name, title, email, LinkedIn, GitHub) and navigation items

Sub-pages are wrapped in `<main className="main-content page-content">` which
applies `padding-top: 80px` (defined in `App.css`) to clear the fixed nav.

### Timeline System

The Timeline component is the most complex part of the codebase. Key features:

1. **Data Consolidation**: Merges arrays from `workExperience.js`,
   `education.js`, and `volunteering.js`
2. **Flexible Date Parsing**: Date utilities are centralized in
   `utils/dateFormatter.js` and support multiple date formats:
   - ISO format: `YYYY-MM` or `YYYY-MM-DD`
   - Named months: `MMM YYYY` (e.g., "Jan 2025")
   - Year only: `YYYY`
   - Semester notation: `YYYY spring` or `YYYY fall`
   - Current time: `"now"` (case-insensitive)
3. **Date Utilities** (`utils/dateFormatter.js`):
   - `parseFlexibleDate(value)`: Parses flexible date formats into Date objects
   - `formatDisplayDate(value)`: Formats dates for display (e.g., "Jan 2025" or
     "Now")
   - `formatDisplayRange(start, end)`: Formats date ranges (e.g., "Jan 2023 -
     Dec 2025")
   - `getComparableTime(value)`: Converts dates to timestamps for sorting
   - `getNumericalYear(yearString)`: Handles semester notation in year values
4. **Chronological Sorting**: Items are sorted by start date using
   `getComparableTime()` function from dateFormatter utilities
5. **Intersection Observer**: Implements scroll-based animations that add
   `is-visible` class when items enter viewport
6. **Alternating Layout**: Items alternate between left/right positioning based
   on index
7. **Interactive Details**: Timeline items with `projects` or `courses` data are
   clickable and display a visual hint ("Click to view details"). Clicking opens
   a modal with detailed information.

### Data File Schema

Each item in the data files should have:
- `start`: Start date (string, flexible format)
- `end`: End date (string, flexible format, or "now")
- `text`: JSX content with description (can include links)
- `icon`: Imported image/logo

**Work Experience specific fields:**
- `jobTitle`: Job position title
- `companyName`: Company/organization name
- `projects` (optional): Array of project objects with:
  - `name`: Project name
  - `years`: Project timeline (string)
  - `description`: Project description
  - `technologies`: Array of technology/skill strings

**Education specific fields:**
- `degree`: Degree name (e.g., "MSc in Electrical Engineering")
- `institution`: Institution name
- `courses` (optional): Array of course objects with:
  - `number`: Course number/code
  - `name`: Course name
  - `description`: Course description

**Note**: Timeline items with `projects` or `courses` arrays will automatically
become clickable and open a modal displaying the detailed information.

### Modal System

The `TimelineDetailModal` component provides an interactive detail view for
timeline items:

**Features:**
- Displays job title/degree, company/institution, and date range in the header
- Renders the item's description text in the modal body
- Shows key projects for work experience items:
  - Each project displays name, timeline, description, and technology tags
  - Projects are rendered as cards with visual hierarchy
- Shows coursework for education items:
  - Courses are displayed in a structured table format
  - Columns: Course Number, Course Name, Description
  - Responsive table design
- Keyboard accessibility: Press Escape to close
- Click backdrop to close
- Prevents body scroll when open
- Smooth transitions and animations

**Implementation Notes:**
- Modal is conditionally rendered based on the presence of `projects` or
  `courses` data
- Uses React hooks (useState, useEffect) for state management and event handling
- Modal content is styled in `TimelineDetailModal.css`
- Items with details show a "Click to view details" hint on hover

### Styling

Styles are organized by component in `src/styles/`:
- Component-specific CSS files match component names (e.g., `Timeline.css`,
  `TimelineDetailModal.css`, `Header.css`)
- FontAwesome icons are loaded globally in `index.js`
- Uses custom CSS with responsive design patterns
- Modal styling includes backdrop blur effects, smooth transitions, and
  responsive layouts

## Deployment

The site uses two deployment mechanisms:

1. **Manual deployment**: `npm run deploy` (uses gh-pages package)
2. **Automatic deployment**: GitHub Actions workflow
   (`.github/workflows/static.yml`) builds the project and deploys the build
   folder on push to main branch

## Content Updates

To update site content:

**Personal Information** (config.js):
- Edit `src/config.js` to update name, title, subtitle, email, LinkedIn handle,
  GitHub URL, and navigation items

**Timeline content** (workExperience.js, education.js, or volunteering.js):
1. Edit the relevant data file in `src/data/`
2. Add/import logo images to `src/assets/` if needed
3. Follow the flexible date format - the parser handles various formats
   automatically
4. For current/ongoing items, use `end: "now"` to display "Now" in the timeline
5. To add detailed modal content:
   - For work experience: add a `projects` array with project details
   - For education: add a `courses` array with course information
   - Timeline items with these arrays will automatically become clickable and
     open a modal

**Publications & Events** (publicationsEvents.js):
- Edit `src/data/publicationsEvents.js` to add publications or speaking events

**New content types** (as migration progresses):
- New data files and components will be added as sections are built
- Follow the existing pattern: data in `src/data/`, component in
  `src/components/`, styles in `src/styles/`
- Update this file when new content types are introduced

## Important Notes

- The site has no backend - all content is static React components
- Images and assets are stored in `src/assets/`
- The site uses Create React App configuration (react-scripts)
- Utility functions are organized in `src/utils/` (currently contains
  `dateFormatter.js`)
- Modal system uses keyboard navigation (Escape key) and click-outside-to-close
  pattern
- Timeline items with detailed information (`projects` or `courses` arrays) are
  automatically made clickable
- Custom domain configured via CNAME file: amtoft.dev
- Playwright test suite exists in `tests/` and targets the multi-page routing
  structure; `playwright.config.js` is configured to use system Chrome
  (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`)
- **Migration in progress**: The site is transitioning from a CV layout to a
  professional hub. Check PROGRESS.md for current status before making
  significant architectural decisions.
