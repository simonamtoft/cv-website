import { test, expect } from '@playwright/test';

test.describe('Self-hosted article reading view', () => {
  test('a reader can open an essay, use its sources, and return to the list', async ({ page }) => {
    await page.goto('/writing');

    await page.locator('.essays-list .essay-item').first().click();

    await expect(page).toHaveURL(/\/writing\/.+$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/\S/);
    await expect(page.locator('.article-body h2').first()).toBeVisible();

    const sourceLinks = page.locator('.article-sources a');
    expect(await sourceLinks.count()).toBeGreaterThan(0);
    expect(await sourceLinks.first().getAttribute('href')).toMatch(/^https:\/\//);

    await page.locator('.article-back').click();
    await expect(page).toHaveURL(/\/writing$/);
    await expect(page.locator('.essays-list .essay-item').first()).toBeVisible();
  });

  test('the leverage pyramid exposes its selected tier', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    const pyramid = page.locator('.leverage-pyramid');
    const blast = pyramid.locator('.pyramid-blast');
    const codeTier = pyramid.getByRole('button', { name: /^Code/ });
    const previousExplanation = await blast.textContent();

    await expect(codeTier).toHaveAttribute('aria-pressed', 'false');
    await codeTier.click();

    await expect(codeTier).toHaveAttribute('aria-pressed', 'true');
    await expect(blast).not.toHaveText(previousExplanation!);
  });

  test('the skill explorer switches the active file', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    const explorer = page.locator('.skill-explorer');
    const file = explorer.getByRole('button', { name: 'gotchas.md' });
    await expect(file).toHaveAttribute('aria-pressed', 'false');

    await expect.poll(async () => {
      await file.click();
      return file.getAttribute('aria-pressed');
    }).toBe('true');
    await expect(explorer.getByLabel(/Contents of .*gotchas\.md/)).toBeVisible();
  });

  test('the chapter navigation moves to the selected heading', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/writing/agentic-engineering');

    const chapters = page.getByRole('navigation', { name: 'Article chapters' });
    const target = chapters.getByRole('link').nth(1);
    const href = await target.getAttribute('href');
    await target.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(target).toHaveAttribute('aria-current', 'location');
  });
});
