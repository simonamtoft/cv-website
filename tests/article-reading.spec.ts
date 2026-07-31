import { test, expect } from '@playwright/test';

// Seam 1 (e2e): the self-hosted article path end-to-end - list -> reading view,
// the inline interactive visual responds to interaction, Sources render.
test.describe('Self-hosted article reading view', () => {
  test('Writing lists the self-hosted essay as an editorial item', async ({ page }) => {
    await page.goto('/writing');

    const essay = page.locator('.essays-list .essay-item');
    await expect(essay.first()).toBeVisible();
    await expect(essay.first().locator('.essay-title')).toContainText('Agentic Engineering');
    await expect(essay.first().locator('.essay-meta')).toContainText('Living doc - Updated');
  });

  test('Clicking an essay opens its reading view and renders the MDX body', async ({ page }) => {
    await page.goto('/writing');

    await page.locator('.essay-item', { hasText: 'Agentic Engineering' }).first().click();

    await expect(page).toHaveURL(/\/writing\/agentic-engineering$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Agentic Engineering');
    // Body content from the MDX source is rendered (not just the header).
    await expect(
      page.getByRole('heading', { name: 'Pillar one: context engineering' })
    ).toBeVisible();
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
    await pyramid.getByRole('button', { name: /Specification/ }).click();
    await expect(pyramid.locator('.pyramid-blast')).toContainText('wrong problem');
  });

  test('The reading view has a Back to Writing link that returns to the list', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    await page.getByRole('link', { name: /Back to Writing/ }).click();
    await expect(page).toHaveURL(/\/writing$/);
    await expect(page.locator('.essays-list .essay-item').first()).toBeVisible();
  });

  test('The article ends with a Sources section built from frontmatter', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    const sources = page.locator('.article-sources');
    await expect(sources.getByRole('heading', { name: 'Sources' })).toBeVisible();
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
