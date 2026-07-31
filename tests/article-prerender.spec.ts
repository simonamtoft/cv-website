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

  test('static HTML has the article title from frontmatter', () => {
    expect(html).toContain('<title>Agentic Engineering | Simon Amtoft Pedersen</title>');
  });

  test('static HTML has per-article OG tags derived from frontmatter', () => {
    expect(html).toContain(
      '<meta property="og:title" content="Agentic Engineering | Simon Amtoft Pedersen"'
    );
    expect(html).toContain(
      '<meta property="og:url" content="https://amtoft.dev/writing/agentic-engineering"'
    );
    // og:description comes from the frontmatter dek.
    expect(html).toMatch(/property="og:description" content="The leverage in a coding agent/);
  });

  test('OG title is not duplicated by a leftover shell default', () => {
    const matches = html.match(/property="og:title"/g) || [];
    expect(matches.length).toBe(1);
  });

  test('the article body is prerendered, not JS-only', () => {
    expect(html).toContain('Pillar one: context engineering');
    expect(html).toContain('Pillar two: harness engineering');
    // The build-time Shiki highlighter emitted a static code block.
    expect(html).toContain('class="shiki');
  });

  test('the present (slide-deck) route is prerendered with its own title', () => {
    const presentHtml = readFileSync(presentHtmlPath, 'utf8');
    expect(presentHtml).toContain(
      '<title>Agentic Engineering (Slides) | Simon Amtoft Pedersen</title>'
    );
  });
});
