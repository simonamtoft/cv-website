import { readdirSync } from 'node:fs';

// Each article is a bundle folder in the content directory; its slug is the
// folder name. Each frontmatter `slug` must match its folder name (see
// src/data/articles.js) so this list and the runtime lookup agree.
// Each article yields its reading route and its present (slide-deck) route.
const articleRoutes = readdirSync('src/content/articles', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const slug = entry.name;
    return [`/writing/${slug}`, `/writing/${slug}/present`];
  });

// React Router v7 framework-mode config.
// SPA mode (ssr:false): routes are prerendered to static HTML at build time so
// GitHub Pages (static-only) serves per-route HTML with correct meta/OG for
// social scrapers. appDirectory stays "src" to avoid moving the existing tree.
export default {
  ssr: false,
  appDirectory: 'src',
  buildDirectory: 'build',
  // Every route is prerendered: the fixed pages plus one per discovered article.
  prerender: [
    '/',
    '/about',
    '/background',
    '/writing',
    '/talks',
    '/contact',
    ...articleRoutes,
  ],
};
