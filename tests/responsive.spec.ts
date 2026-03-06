// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('Mobile viewport renders without horizontal overflow', async ({ page }) => {
    // Set mobile viewport (iPhone SE size)
    await page.setViewportSize({ width: 375, height: 812 });

    // Navigate to the home page
    await page.goto('/');

    // Verify no horizontal scroll
    const hasOverflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);

    // Verify nav links are present (may be wrapped but still accessible)
    await expect(page.locator('nav')).toBeVisible();
  });

  test('Services grid collapses to single column on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    // Navigate to the home page
    await page.goto('/');

    // Check the services grid computed column layout
    const columns = await page.locator('.services-grid').evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // On mobile, grid collapses to one column — the value should NOT contain multiple fr units
    // A single column resolves to a single pixel value, not "1fr 1fr 1fr" or "Xpx Xpx Xpx"
    const parts = columns.trim().split(/\s+/);
    expect(parts.length).toBe(1);
  });
});
