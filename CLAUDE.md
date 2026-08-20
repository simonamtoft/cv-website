# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository. Refer to VISION.md for the site's purpose and direction.

## Project Overview

This is Simon Amtoft Pedersen's personal professional hub, built with React and
deployed to GitHub Pages at https://amtoft.dev. The site's purpose is to
establish a strong, coherent professional presence that positions Simon as a
trusted expert in data science and AI — generating inbound opportunities from
clients, collaborators, and the broader professional community.

The site originated as a digital CV and has been migrated to a professional hub
as defined in VISION.md.

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

The site is built with [Vite](https://vitejs.dev/) (migrated from Create React
App).

```bash
# Start the Vite dev server (runs on localhost:4317)
npm start          # alias: npm run dev

# Build production bundle (output goes to build/)
npm run build

# Preview the production build locally (localhost:4317)
npm run preview

# Run the Playwright end-to-end tests on the default port
npm test

# Run the Playwright suite on the configured localhost:4317 port
npm run test:isolated

# Check source URLs declared in article frontmatter
npm run check:article-sources
```

Deployment is automatic: pushing to `main` triggers the GitHub Actions
workflow in `.github/workflows/static.yml`, which builds the site and
publishes it to GitHub Pages.

### Vite notes

- **Any file containing JSX must use the `.jsx` extension.** Vite 8 replaced
  esbuild with Oxc/Rolldown, which derives the parser language from the file
  extension and offers no way to force JSX parsing in `.js` (Vite's `oxc` option
  deliberately omits `lang`). The old CRA convention of JSX-in-`.js` was
  therefore retired: the 21 affected files were renamed, and `vite.config.js`
  needs no JSX loader configuration at all now. Plain-JS modules (`config.js`,
  `utils/*`, `routes.js`, hooks without JSX) stay `.js`.
  Note the data files carry JSX (`text: <>...</>`), so they are `.jsx` too.
- The app runs in **React Router v8 framework mode** (`@react-router/dev`).
  v8 requires React 19 and Node 22+, and it removes the `react-router-dom`
  package — import everything from `react-router` (browser-only entry points
  like `HydratedRouter` come from `react-router/dom`).
  `vite.config.js` uses the `reactRouter()` plugin (not `@vitejs/plugin-react`);
  `react-router.config.js` sets `ssr: false`, `appDirectory: "src"`,
  `buildDirectory: "build"`, and the `prerender` route list.
- `vite.config.js` pins the dev/preview port to `4317`. The build emits the
  deployable SPA to `build/client` (each prerendered route as static HTML), which
  the GitHub Pages workflow uploads.
- There is no root `index.html` entry: the document shell lives in `src/root.jsx`
  (its `Layout` renders `<head>`/`<body>`). Static assets in `public/` (CNAME,
  404.html, robots.txt, favicon) are copied to the build root verbatim.

## Visual Verification with Playwright

After making visual changes (colors, layout, components), take screenshots to
verify correctness. The dev server must be running on localhost:4317 first.
Playwright never reuses an existing server, so a process already using the
configured port causes a clear startup failure rather than tests running against
the wrong application. Set `PLAYWRIGHT_PORT` to override the configured port.

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
    await page.goto('http://localhost:4317' + route);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/cv-' + name + '.png' });
  }
  // Modal check
  await page.goto('http://localhost:4317/background');
  await page.waitForTimeout(1500);
  await page.click('.timeline-item.has-details');
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/cv-modal.png' });
  await browser.close();
})();
```

Then read each `/tmp/cv-*.png` with the Read tool to visually inspect.

For article captures, wait for `.article-dek.is-revealed`, scroll the target
figure into view, and wait for its `.is-visible` class before taking a reading
view screenshot. For `/writing/:slug/present`, wait for `.deck[data-ready]`
before sending keyboard input or capturing. Check both modes at desktop and
mobile widths. Prefer Playwright's managed `webServer` for automated checks;
background shell servers can leave child processes running.

**What to check after style changes:**
- Correct background, text, and accent colors on all pages
- Nav pill renders with correct glassmorphism and active link color
- Timeline center line, dots, and category badges look correct
- Modal: correct surface color, backdrop, and tech tag tints
- No layout breakage — check mobile too with `setViewportSize({ width: 390, height: 844 })`

## Architecture

### Architecture Notes

Potential future additions:
- Community section (if volunteering/IDA role grows significantly)
- Case studies or project spotlights (if client confidentiality allows)
- Note: Services section was built and removed — About carries positioning weight

The architecture documentation below reflects the current codebase. Update it as code changes.

### Routing

The site uses React Router v8 in **framework mode** (SPA, `ssr: false`): the route
table is in `src/routes.js` with one route module per page under `src/routes/`.
Routes:

| Path | Component rendered | Nav label |
|---|---|---|
| `/` | `<Header />` (hero only) | - |
| `/about` | `<About />` | About |
| `/background` | `<Timeline />` | Background |
| `/writing` | `<Writing />` | Writing |
| `/writing/:slug` | `<ArticleReadingView />` | - |
| `/talks` | `<Talks />` | Talks |
| `/contact` | `<Contact />` | Contact |

Unknown paths redirect to `/` via a catch-all route module
(`src/routes/catchall.jsx`) whose `clientLoader` throws `redirect("/")`.

All routes are prerendered to static HTML at build time, so deep links load
directly and social scrapers get per-route meta. The fixed routes are listed in
`react-router.config.js`; article routes (`/writing/:slug`) are appended to the
prerender list by enumerating the MDX filenames in `src/content/articles/` (each
article's frontmatter `slug` must equal its filename). `public/404.html` is
retained only as a fallback for non-prerendered paths on GitHub Pages.

Per-route `<head>` tags (title, description, OG/Twitter) come from each route
module's `meta()` export, built via the shared `buildMeta()` helper
(`src/utils/meta.js`); `root.jsx`'s shell holds no OG/description literals so
per-route (and per-article) tags are authoritative and not duplicated.

### Article system (self-hosted essays)

Article authoring and review follow `docs/article-editorial-guide.md`. In
particular, figures are first-class content rather than material that must be
duplicated in prose, and fast-changing personal workflows should be split from
durable conceptual articles.

Long-form essays are self-hosted MDX. The pipeline (see `vite.config.js`):
`@mdx-js/rollup` compiles `.mdx` at build; `remark-frontmatter` +
`remark-mdx-frontmatter` parse YAML frontmatter into a `frontmatter` export;
`@shikijs/rehype` highlights code blocks at build (no runtime highlighter;
`react-markdown` is deliberately not used because it cannot host inline
interactive React components).

- Content lives in self-contained bundles at
  `src/content/articles/<slug>/index.mdx`. Frontmatter schema: `title`, `dek`,
  `slug`, `series`, `lastUpdated`, `sources: [{ title, url, note? }]`. The slug
  must match the bundle directory. An MDX file may import and embed interactive
  React visuals inline. Validate source URLs with
  `npm run check:article-sources`.
- `src/data/articles.js` auto-discovers articles via `import.meta.glob` (eager),
  sorts newest-first by `lastUpdated`, and exposes `getArticleBySlug`.
- `routes/article.jsx` renders `<ArticleReadingView>` for `/writing/:slug` and
  exports `meta()` (title/OG from frontmatter, `og:type: article`).
- `/writing` (`Writing.jsx`) lists discovered essays as an editorial vertical
  stack (title, dek, "`<series>` - Living doc - Updated `<month year>`") above
  the "Also published elsewhere" external op-eds.

### Component Structure

The app uses a multi-page routing architecture:

- **root.jsx**: The framework-mode root. `Layout` renders the document shell
  (`<head>` with SEO/OG/JSON-LD, fonts, favicon, plus `<Meta/>`/`<Links/>` for
  per-route exports); the default export renders the persistent app shell
  (`ReadingProgress`, `Nav`, `BackToTop`, keyboard/swipe nav, `ErrorBoundary`)
  around `<Outlet/>`. `<ScrollRestoration/>` handles scroll on navigation
  (replacing the old `ScrollToTop`). Route modules in `src/routes/` render each
  page.
- **Nav.jsx**: Fixed pill navigation bar — uses `NavLink` for active-link
  highlighting. On `/` starts absolute then transitions to fixed on scroll >60px;
  on all other routes always fixed. Links: About (`/about`) / Background
  (`/background`) / Writing (`/writing`) / Talks (`/talks`) / Contact
  (`/contact`). Nav order is driven by `config.navigation`; the fixed pill
  centres via `margin:auto` + `width:fit-content` (not `left:50%`, which capped
  its width at half the viewport and wrapped the links).
- **PageNav.jsx**: Prev/next navigation rendered at the bottom of each sub-page.
  Derives prev/next from `config.navigation` order by matching the current
  `pathname`. About has next only; Contact has prev only; Background, Writing,
  and Talks have both.
- **ScrollToTop.js**: Fires `window.scrollTo(0, 0)` on every route change.
- **Header.jsx**: Hero page (`/`) — tagline, CTA "Let's Talk" button, LinkedIn
  link. Rendered only at the root route.
- **About.jsx**: About page (`/about`) — carries technical practitioner
  positioning.
- **Timeline.jsx**: Background page (`/background`) — merges and displays
  chronological data from three sources (work experience, education,
  volunteering). Renders clickable timeline items that can open modals when they
  contain detailed information. Cards display inline `.timeline-job-title` and
  `.timeline-org-name`, plus category badges (Work / Education / Community).
- **TimelineDetailModal.jsx**: Modal component that displays detailed information
  for timeline items, including key projects (for work experience) and
  coursework tables (for education). Supports keyboard navigation (Escape to
  close) and click-outside-to-close functionality.
- **Writing.jsx**: Writing page (`/writing`) — lists the self-hosted essays
  (discovered from `src/data/articles.js`) as an editorial vertical stack linking
  to `/writing/:slug`, then an "Also published elsewhere" divider above the
  external op-eds (type `article`) rendered via `WorkCardGrid`.
- **articles/ArticleReadingView.jsx**: Reading view for `/writing/:slug` — an
  editorial header (kicker meta line, title, dek) from frontmatter, the compiled
  MDX body, and a `Sources` section. Styles in `styles/Article.css`.
- **articles/HarnessController.js**: The seven-lever interactive visual embedded
  inline in the flagship essay's MDX (React port of the throwaway prototype).
- **articles/Sources.jsx**: Renders the `sources` frontmatter as an ordered list.
- **Talks.jsx**: Talks page (`/talks`) — webinars and conferences (type
  `webinar` / `conference`) rendered via `WorkCardGrid`.
- **WorkCardGrid.jsx**: Shared card grid used by both `/talks` and `/writing`'s
  external block. Takes an `items` array, sorts newest-first, and renders each
  as a `.work-card`. Reveal-on-scroll fade-in is provided by the
  `useRevealOnScroll` hook (`src/utils/`).
- **Contact.jsx**: Contact page (`/contact`) — "Let's Talk" heading, email and
  social links.
- **Footer.js**: Site footer — rendered on all routes outside the route tree.
- **ErrorBoundary.jsx**: Wraps components to catch and handle React errors
  gracefully.
- **Data files** (`src/data/`): Content is separated from presentation logic in
  dedicated data files (workExperience.jsx, education.jsx, volunteering.jsx,
  publicationsEvents.js)
- **config.js**: Central configuration file containing personal information
  (name, title, email, LinkedIn, GitHub) and navigation items

Sub-pages are wrapped in `<main className="main-content page-content">` which
applies `padding-top: 80px` (defined in `App.css`) to clear the fixed nav.

### Timeline System

The Timeline component is the most complex part of the codebase. Key features:

1. **Data Consolidation**: Merges arrays from `workExperience.jsx`,
   `education.jsx`, and `volunteering.jsx`
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
- FontAwesome icons are loaded globally in `src/root.jsx`
- Uses custom CSS with responsive design patterns
- Modal styling includes backdrop blur effects, smooth transitions, and
  responsive layouts

## Deployment

The site is deployed by the GitHub Actions workflow
(`.github/workflows/static.yml`), which builds the project and publishes the
`build/` folder to GitHub Pages on every push to `main`. The Pages source is
configured as "GitHub Actions" (not "Deploy from a branch").

## Content Updates

To update site content:

**Personal Information** (config.js):
- Edit `src/config.js` to update name, title, subtitle, email, LinkedIn handle,
  GitHub URL, and navigation items

**Timeline content** (workExperience.jsx, education.jsx, or volunteering.jsx):
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
- The site is built and bundled with Vite (`vite.config.js`)
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
