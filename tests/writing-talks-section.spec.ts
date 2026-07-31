import { test, expect } from '@playwright/test';

test.describe('Writing / Talks split', () => {
  test('Writing page heading reads "Writing"', async ({ page }) => {
    await page.goto('/writing');

    const section = page.locator('section.publications-events');
    await expect(section.getByRole('heading', { name: 'Writing', exact: true })).toBeVisible();
  });

  test('Writing page shows the "Also published elsewhere" divider', async ({ page }) => {
    await page.goto('/writing');

    await expect(page.locator('.section-divider')).toContainText('Also published elsewhere');
  });

  test('Writing lists only external article cards', async ({ page }) => {
    await page.goto('/writing');

    const cards = page.locator('.work-card');
    expect(await cards.count()).toBeGreaterThan(0);
    // Everything under /writing is an article; no talks leak in.
    await expect(page.locator('.work-card:not(.work-card-article)')).toHaveCount(0);
  });

  test('Writing article cards link to external HTTPS URLs in a new tab', async ({ page }) => {
    await page.goto('/writing');

    const links = page.locator('.work-card .work-card-link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('Talks page heading reads "Talks"', async ({ page }) => {
    await page.goto('/talks');

    const section = page.locator('section.publications-events');
    await expect(section.getByRole('heading', { name: 'Talks' })).toBeVisible();
  });

  test('Talks shows webinar and conference cards, but no articles', async ({ page }) => {
    await page.goto('/talks');

    await expect(page.locator('.work-card-webinar').first()).toBeVisible();
    await expect(page.locator('.work-card-conference').first()).toBeVisible();
    await expect(page.locator('.work-card-article')).toHaveCount(0);
  });
});
