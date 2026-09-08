import { test, expect } from '@playwright/test';

test.describe('Background timeline', () => {
  test('category filters change the visible timeline entries', async ({ page }) => {
    await page.goto('/background');

    const workFilter = page.getByRole('button', { name: 'Work', exact: true });
    await workFilter.click();

    await expect(workFilter).toHaveAttribute('aria-pressed', 'true');
    const badges = await page.locator('.timeline-category-badge').allTextContents();
    expect(badges.length).toBeGreaterThan(0);
    expect(new Set(badges)).toEqual(new Set(['Work']));
  });

  test('timeline details can be dismissed by keyboard or close button', async ({ page }) => {
    await page.goto('/background');

    const itemWithDetails = page.locator('.timeline-item.has-details').first();
    await itemWithDetails.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await itemWithDetails.click();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
