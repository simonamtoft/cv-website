# Article editorial guide

Use this guide when writing or reviewing self-hosted articles in
`src/content/articles/<slug>/`.

## Editorial unit

Review the complete article experience, not the prose in isolation. The editorial
unit includes:

- the MDX prose and links;
- interactive figures and their captions;
- the Sources section generated from frontmatter;
- authored presentation slides at `/writing/<slug>/present`.

Figures are first-class content. Do not repeat a figure's information in prose or
a table merely to make the prose self-contained. Add prose only when it supplies
context, interpretation, accessibility, or a conclusion that the figure cannot
carry itself. A figure must still have a useful accessible name or caption.

## Article boundaries

Keep durable concepts and fast-changing practice separate when they differ in
purpose or update cadence:

- A **conceptual article** develops a durable argument, model, or framework. Tool
  examples should support the argument rather than become a workflow inventory.
- A **practical living article** records the author's current setup, tools, and
  operating habits. It may be more personal, procedural, and frequently updated.

Split material into a separate article when it changes from explaining *why* to
documenting *my current how*, would need more frequent updates than the main
argument, or serves readers seeking implementation detail rather than the core
idea. Leave a short contextual link between related articles instead of
maintaining duplicated sections.

## Review dimensions

Assess findings against the whole editorial unit and prioritize concrete issues:

1. **Argument** - Does the article make and support a coherent claim?
2. **Evidence** - Do sources and examples support the claims attributed to them?
3. **Technical precision** - Are broad claims scoped, qualified, and current?
4. **Visual contribution** - Does each figure add information without needless
   duplication, and is its purpose understandable?
5. **Audience fit** - Does the article serve potential clients and practitioners
   while remaining direct and confidentiality-aware?
6. **Structure** - Does each section belong in this article and advance its
   purpose?

Distinguish correctness or credibility problems from optional stylistic changes.
Do not prescribe extra content solely to make every medium repeat every other
medium.

## Bundle and frontmatter contract

Each article is a self-contained bundle:

```text
src/content/articles/<slug>/
├── index.mdx
├── <ArticleVisual>.jsx       # optional
└── <slug>.css                # optional
```

`index.mdx` frontmatter contains `title`, `dek`, `slug`, `series`,
`lastUpdated`, and `sources`. The `slug` must match the bundle directory name.
Each source has `title`, `url`, and an optional `note` describing why it supports
the article.

Check source URLs with:

```bash
npm run check:article-sources
# Limit the check to one bundle:
npm run check:article-sources -- --article agentic-engineering
# Machine-readable output (silence npm's command banner):
npm run --silent check:article-sources -- --json
```

A blocked result means the site rejected automated access; it is not equivalent
to a dead URL. A broken or unavailable result requires manual investigation.

## Verification

For article changes:

1. Run `npm run build` to verify MDX compilation and prerendering.
2. Run `npm run test:isolated` so Playwright owns its server rather than reusing
   another application on port 4317.
3. For visual changes, inspect reading and presentation modes at desktop and
   mobile widths. Wait for `.article-dek.is-revealed` before capturing the
   reading view, scroll the target figure into view, and wait for it to receive
   `.is-visible`. In presentation mode, wait for `.deck[data-ready]` before
   sending keyboard input or taking screenshots.

Use Playwright's configured `webServer` for automated checks. Avoid backgrounding
`npm start` in shell scripts because terminating the shell can leave the child
dev server running.
