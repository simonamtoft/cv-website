import { test, expect } from '@playwright/test';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Seam 2 (built-HTML assertion): what a non-JS scraper sees. After a production
// build, each prerendered article route must exist as static HTML carrying its
// own per-article meta (from frontmatter) and its prerendered body content.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const articleHtmlPath = path.join(
  repoRoot,
  'build/client/writing/agentic-engineering/index.html'
);
const presentHtmlPath = path.join(
  repoRoot,
  'build/client/writing/agentic-engineering/present/index.html'
);

// Serial: the one-off production build in beforeAll must run once, not race
// across parallel workers writing the same build/ directory.
test.describe.configure({ mode: 'serial' });

test.describe('Article prerender (scraper-visible HTML)', () => {
  let html = '';

  test.beforeAll(() => {
    // Build so the assertion reflects the current source, not a stale artifact.
    execSync('npm run build', { cwd: repoRoot, stdio: 'ignore' });
    html = readFileSync(articleHtmlPath, 'utf8');
  });

  test('static HTML has a non-empty title', () => {
    expect(html).toMatch(/<title>[^<]+<\/title>/);
  });

  test('static HTML has per-article OG tags', () => {
    expect(html).toMatch(/property="og:title" content="[^"]+"/);
    expect(html).toContain(
      '<meta property="og:url" content="https://amtoft.dev/writing/agentic-engineering"'
    );
    // og:description comes from the frontmatter dek.
    expect(html).toMatch(/property="og:description" content="[^"]+"/);
  });

  test('OG title is not duplicated by a leftover shell default', () => {
    const matches = html.match(/property="og:title"/g) || [];
    expect(matches.length).toBe(1);
  });

  test('the article body is prerendered, not JS-only', () => {
    // Body headings and a build-time Shiki code block are in the static HTML.
    expect(html).toMatch(/<h2[^>]*>/);
    expect(html).toContain('class="shiki');
  });

  test('the present (slide-deck) route is prerendered with its own title', () => {
    const presentHtml = readFileSync(presentHtmlPath, 'utf8');
    const title = presentHtml.match(/<title>([^<]+)<\/title>/)?.[1];
    expect(title).toBeTruthy();
    expect(title).not.toBe(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  });
});
