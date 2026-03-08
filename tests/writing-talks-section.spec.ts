import { test, expect } from '@playwright/test';

test.describe('Writing & Talks Section', () => {
  test('Section heading reads "Writing & Talks"', async ({ page }) => {
    await page.goto('/writing');

    const section = page.locator('section.publications-events');

    await expect(section.getByRole('heading', { name: 'Writing & Talks' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Publications & Events' })).not.toBeAttached();
  });

  test('Cards are present', async ({ page }) => {
    await page.goto('/writing');

    const cards = page.locator('.work-card');
    await expect(cards.first()).toBeVisible();
  });

  test('Cards link to external HTTPS URLs with target="_blank"', async ({ page }) => {
    await page.goto('/writing');

    const cards = page.locator('.work-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const href = await card.getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
      await expect(card).toHaveAttribute('target', '_blank');
    }
  });
});
