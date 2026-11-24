#!/usr/bin/env node

// Renders the link-preview (og:image) cards into the production build. Runs
// after `react-router build`, which recreates build/client. The output paths
// are the ones src/utils/meta.js and src/routes/workProject.jsx point at.

import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { parse as parseYaml } from 'yaml';
import config from '../../src/config.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const workDir = path.join(repoRoot, 'src/content/work');
const outDir = path.join(repoRoot, 'build/client/og');

const SITE_LINE =
  'I build ML and agentic AI systems that hold up in production, and help leadership teams decide where AI belongs.';

// Parsed with the same YAML library remark-mdx-frontmatter uses, so a card
// shows the same title the page does.
function readFrontmatter(contents, file) {
  const block = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (block === undefined) throw new Error(`${file}: missing YAML frontmatter`);
  const frontmatter = parseYaml(block);
  for (const field of ['title', 'industry']) {
    if (typeof frontmatter?.[field] !== 'string' || !frontmatter[field].trim()) {
      throw new Error(`${file}: frontmatter field "${field}" must be a non-empty string`);
    }
  }
  return frontmatter;
}

async function readProjects() {
  const entries = await readdir(workDir, { withFileTypes: true });
  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const file = path.join(workDir, entry.name, 'index.mdx');
        const { title, industry } = readFrontmatter(await readFile(file, 'utf8'), file);
        return {
          slug: entry.name,
          title,
          industry,
          coverUrl: pathToFileURL(path.join(workDir, entry.name, 'cover.svg')).href,
        };
      })
  );
}

const projects = await readProjects();
await mkdir(path.join(outDir, 'work'), { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(path.join(scriptDir, 'card.html')).href);
  const card = page.locator('#card');
  const { name, title: role } = config.personalInfo;

  const siteOverflows = await page.evaluate((data) => window.renderSiteCard(data), {
    name,
    role,
    line: SITE_LINE,
    domain: 'amtoft.dev',
  });
  if (siteOverflows) throw new Error('Site preview card: text does not fit');
  await card.screenshot({ path: path.join(outDir, 'site.jpg'), type: 'jpeg', quality: 90 });

  for (const { slug, title, industry, coverUrl } of projects) {
    const overflows = await page.evaluate((data) => window.renderProjectCard(data), {
      industry,
      title,
      name,
      coverUrl,
    });
    if (overflows) throw new Error(`Work preview card "${slug}": title does not fit; shorten it or break up a long word`);
    await card.screenshot({ path: path.join(outDir, 'work', `${slug}.png`) });
  }
} finally {
  await browser.close();
}

console.log(`Generated ${projects.length + 1} link-preview images in build/client/og`);
