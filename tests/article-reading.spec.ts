import { test, expect } from '@playwright/test';

// Seam 1 (e2e): the self-hosted article path end-to-end - list -> reading view,
// the inline interactive visual responds to interaction, Sources render.
test.describe('Self-hosted article reading view', () => {
  test('Writing lists the self-hosted essay as an editorial item', async ({ page }) => {
    await page.goto('/writing');

    const essay = page.locator('.essays-list .essay-item').first();
    await expect(essay).toBeVisible();
    await expect(essay.locator('.essay-title')).toHaveText(/\S/);
    await expect(essay.locator('.essay-meta')).toHaveText(/\S/);
  });

  test('Clicking an essay opens its reading view and renders the MDX body', async ({ page }) => {
    await page.goto('/writing');

    await page.locator('.essays-list .essay-item').first().click();

    await expect(page).toHaveURL(/\/writing\/.+$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/\S/);
    // Body content from the MDX source is rendered (not just the header).
    await expect(page.locator('.article-body h2').first()).toBeVisible();
  });

  test('The harness control loop renders with a control-surface detail', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    const controller = page.locator('.harness-controller');
    await expect(controller).toBeVisible();

    // The loop assembles from the setpoint on scroll; its detail panel always
    // names a control surface. (Click-through is covered by the present deck
    // test, where the loop starts fully assembled.)
    await expect(controller.locator('.harness-lever-detail h4')).toBeVisible();
  });

  test('All four interactive visuals render inline', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    await expect(page.locator('.leverage-pyramid')).toBeVisible();
    await expect(page.locator('.context-window')).toBeVisible();
    await expect(page.locator('.context-flow')).toBeVisible();
    await expect(page.locator('.harness-controller')).toBeVisible();
  });

  test('The leverage pyramid responds to interaction', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    // Pyramid: clicking a tier swaps the blast-radius line.
    const pyramid = page.locator('.leverage-pyramid');
    const blast = pyramid.locator('.pyramid-blast');
    const before = await blast.textContent();
    await pyramid.locator('button').first().click();
    await expect(blast).not.toHaveText(before!);
  });

  test('The reading view has a back link that returns to the list', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    await page.locator('.article-back').click();
    await expect(page).toHaveURL(/\/writing$/);
    await expect(page.locator('.essays-list .essay-item').first()).toBeVisible();
  });

  test('The article ends with a Sources section built from frontmatter', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    const sources = page.locator('.article-sources');
    await expect(sources).toBeVisible();
    const links = sources.locator('ol li a');
    expect(await links.count()).toBeGreaterThan(0);
    expect(await links.first().getAttribute('href')).toMatch(/^https:\/\//);
  });

  test('The reading view is usable on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/writing/agentic-engineering');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.harness-controller')).toBeVisible();
  });
});
