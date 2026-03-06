// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Page Load & Structure', () => {
  test('Page loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    // Navigate to the home page
    await page.goto('/');

    // Verify the page title contains Simon's name
    await expect(page).toHaveTitle(/Simon Amtoft Pedersen/);

    // Verify no JS errors occurred
    expect(errors).toHaveLength(0);
  });

  test('All main sections are present', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify all section anchors exist
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#services')).toBeAttached();
    await expect(page.locator('#timeline')).toBeAttached();
    await expect(page.locator('#publications-events')).toBeAttached();
    await expect(page.locator('#contact')).toBeAttached();
  });
});
