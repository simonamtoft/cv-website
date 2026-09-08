# Test suite audit

This audit keeps browser coverage for stable journeys and integration seams. Pure schedule and publication-routing rules now run without a browser. One-off layout and editorial checks belong in visual review, not the permanent suite.

## Core site

| Previous test | Decision | Contract |
|---|---|---|
| `About Section > Profile picture present` | Removed | Asserted one image, CSS selector, and non-empty `src`; it did not prove the About page communicated correctly. |
| `Page Load & Structure > All routes render without errors` | Removed | Duplicated the primary-navigation journey and only asserted a non-empty title. |
| `Page Load & Structure > Home page shows hero; about page shows about section` | Removed | Asserted component structure through CSS classes, not a user outcome. |
| `Responsive Design > Mobile viewport renders without horizontal overflow on home` | Removed | Pixel overflow and breakpoint rendering are visual-review concerns. |
| `Responsive Design > Mobile viewport renders without horizontal overflow on background` | Removed | Pixel overflow is a visual-review concern. |
| `Header & Navigation > Navigation links route to correct pages` | Kept and simplified | Protects the critical journey through every top-level route; labels and styling may change independently. |
| `Header & Navigation > LinkedIn link present in header` | Removed | Duplicated the canonical LinkedIn destination covered on Contact and asserted `target` implementation detail. |
| `Writing / Talks split > Writing lists only external article cards` | Replaced with `publications-routing.spec.ts` | Article classification and external destinations are data rules, so they no longer require rendered CSS classes. |
| `Writing / Talks split > Writing article cards link to external HTTPS URLs in a new tab` | Replaced with `publications-routing.spec.ts` | HTTPS ownership is checked at the data boundary; tab behavior is not a business rule. |
| `Writing / Talks split > Talks shows presentations, webinars, and conferences, but no articles` | Replaced by the data test and workshop journey | Type-to-route ownership is checked directly, while opening the internal presentation remains an end-to-end journey. |

## Background timeline

| Previous test | Decision | Contract |
|---|---|---|
| `Timeline renders with job titles and org names inline` | Removed | “Inline” and the selected CSS classes describe layout rather than behavior. |
| `Category badges are present for all three types` | Replaced with filter interaction | The durable behavior is that choosing a category changes the visible entries, not that three badge classes exist. |
| `Clickable timeline items open and close modal via Escape` | Kept and consolidated | Protects opening details and keyboard dismissal as one modal lifecycle. |
| `Modal close button dismisses the modal` | Kept and consolidated | Protects the accessible close control without a separate browser setup. |
| `Tech tags use warm colour system, not legacy blue` | Removed | A single computed colour is a visual snapshot expressed as a brittle negative assertion. |

## Article reading and presentation

| Previous test | Decision | Contract |
|---|---|---|
| `Writing lists the self-hosted essay as an editorial item` | Consolidated into the reader journey | Listing matters because it lets a reader enter an essay; title/meta DOM structure does not. |
| `Clicking an essay opens its reading view and renders the MDX body` | Kept in the reader journey | Protects list-to-article routing and MDX rendering. |
| `The harness control loop renders with a control-surface detail` | Removed | Checked the presence of one editorial visual and heading structure; deck interaction remains covered. |
| `Article visuals render inline` | Removed | Enumerated current article illustrations, which are editorial composition rather than a stable interface. |
| `The leverage pyramid responds to interaction` | Kept and simplified | Protects selected-state and changed-output behavior without pinning explanatory copy. |
| `The skill explorer switches between file examples` | Kept and simplified | Protects the selected-file state transition and accessible output label without pinning example prose. |
| `The chapter minimap tracks and navigates the article headings` | Simplified | Protects chapter navigation and accessible current state; removes heading counts, CSS state classes, and viewport geometry. |
| `The reading view has a back link that returns to the list` | Kept in the reader journey | Protects return navigation. |
| `The article ends with a Sources section built from frontmatter` | Kept in the reader journey | Protects the public source-link contract without asserting section placement or copy. |
| `The reading view is usable on a mobile viewport` | Removed | Visibility of selected elements and hiding one component were an incomplete visual proxy; mobile rendering is verified visually. |
| `renders slide 1 and a counter over the authored slides` | Consolidated into the presentation journey | Initial readiness remains covered; exact slide count and hidden navigation structure do not. |
| `keeps site navigation on an unknown presentation URL` | Kept and simplified | Protects recovery navigation for an invalid slug without pinning error copy. |
| `arrow keys navigate the deck without leaving the present route` | Kept in the presentation journey | Preserves the keyboard-routing regression contract. |
| `Escape returns to the reading view` | Kept in the presentation journey | Protects exiting presentation mode. |
| `a visual builds up on key press and hides the reading-only info panel` | Simplified | Protects reversible build-step state and key consumption; removes the reading-only panel structure assertion. |
| `each featured visual has its own slide` | Removed | Encoded editorial inventory and slide placement. |
| `the reading view links to the present deck` | Kept in the presentation journey | Protects the reader-to-presenter entry path. |
| `the article body is prerendered, not JS-only` | Simplified | Keeps the scraper-visible semantic article/body contract and drops the Shiki CSS implementation check. |

## Claude Code workshop

| Previous test | Decision | Contract |
|---|---|---|
| `is discoverable from Talks and opens within the main app` | Kept and simplified | Protects discovery, routing, rendering, and presentation-shell behavior. |
| `hides site navigation when opened with a trailing slash` | Kept | Protects a known route-normalization regression. |
| `supports keyboard navigation and overview` | Kept | Protects keyboard state transitions and overview dismissal. |
| `supports fullscreen and a printable deck` | Kept and simplified | Protects fullscreen entry/exit and complete print output; removes CSS `zoom` and direct `href` assertions. |
| `derives the three-hour agenda from one authoritative schedule` | Moved to `workshop-schedule.spec.ts` | Exact times, durations, total length, and absence of break entries are explicit workshop rules owned by the pure schedule model; layout and duplicate-render counts were removed. |
| `counts the workshop block down from the scheduled duration` | Kept and simplified | Protects countdown progress, persistence across navigation, and deterministic print output through visible clock behavior rather than test-only attributes. |
| `has no break slides left in the deck` | Replaced by the schedule model test | The durable rule is that the authoritative schedule has only introduction, workshop, and closing; searching rendered copy and classes was brittle. |
| `keeps the debrief reflection layout within its slide in every presentation mode` | Removed | Asserted card counts, duplicate DOM instances, and element/footer geometry. |
| `keeps the annotated prompt composition intact in live, overview, and print modes` | Removed | Asserted implementation element counts and the absence of SVG, not behavior. |
| `keeps the two-interface demonstration within its slide in every presentation mode` | Removed | Asserted panel counts and pixel containment across viewports; use visual verification. |
| `keeps the leverage hierarchy ordered and contained in every presentation mode` | Removed | Asserted authored item count, width ordering, and geometry. |
| `keeps the planning flow within its slide in every presentation mode` | Removed | Asserted component presence and footer geometry. |
| `keeps the workshop exercise steps within its slide in every presentation mode` | Removed | Asserted editorial step count, duplicate instances, and geometry. |
| `keeps the folder-scope visual within its slide in every presentation mode` | Removed | Asserted component placement and geometry. |
| `renders permission modes in live, overview, and print modes` | Removed | Asserted editorial item and duplicate-render counts. |
| `keeps the three-tool ladder contained and ordered by autonomy` | Removed | Asserted authored item count, rung dimensions, and overflow geometry. |
| `keeps the trifecta slide and its injected log line within the slide` | Removed | Asserted editorial element counts and pixel containment. |
| `keeps the skill and hook columns within the repeatable-work slide` | Removed | Asserted column counts and overflow geometry. |
| `keeps both adoption tracks within the closing outlook slide` | Removed | Asserted editorial track count and overflow geometry. |
| `contains the highlighted comparison column within the table` | Removed | Asserted CSS overflow and cell geometry. |
| `keeps portrait captions legible against their photos` | Removed | Asserted a specific CSS gradient rather than visually evaluating legibility. |
| `scales the deck for mobile screens` | Removed | Compared bounding boxes to viewport dimensions; use mobile screenshots for this visual contract. |
