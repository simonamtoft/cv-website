import { test, expect } from '@playwright/test';

test.describe('Writing / Talks split', () => {
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

  test('Talks shows presentations, webinars, and conferences, but no articles', async ({ page }) => {
    await page.goto('/talks');

    const presentation = page.locator('.work-card-presentation');
    await expect(presentation).toBeVisible();
    await expect(presentation.locator('.work-card-link')).toHaveAttribute(
      'href',
      '/talks/claude-code-workshop'
    );
    await expect(presentation.locator('.work-card-link')).not.toHaveAttribute('target', '_blank');
    await expect(page.locator('.work-card-webinar').first()).toBeVisible();
    await expect(page.locator('.work-card-conference').first()).toBeVisible();
    await expect(page.locator('.work-card-article')).toHaveCount(0);
  });
});
