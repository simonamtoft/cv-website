// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Writing & Talks Section', () => {
  test('Section heading reads "Writing & Talks"', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const section = page.locator('#publications-events');

    // Verify new heading
    await expect(section.getByRole('heading', { name: 'Writing & Talks' })).toBeVisible();

    // Verify old heading is gone
    await expect(section.getByRole('heading', { name: 'Publications & Events' })).not.toBeAttached();
  });

  test('Article and conference cards are present', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify both content type cards exist
    await expect(page.locator('.work-card-article').first()).toBeVisible();
    await expect(page.locator('.work-card-conference').first()).toBeVisible();
  });

  test('Cards link to external HTTPS URLs with target="_blank"', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const cards = page.locator('.work-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Check every card links out correctly
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const href = await card.getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
      await expect(card).toHaveAttribute('target', '_blank');
    }
  });
});
