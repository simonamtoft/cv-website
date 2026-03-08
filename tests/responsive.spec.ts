import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('Mobile viewport renders without horizontal overflow on home', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const hasOverflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);

    await expect(page.locator('nav')).toBeVisible();
  });

  test('Mobile viewport renders without horizontal overflow on background', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/background');

    const hasOverflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);
  });
});
