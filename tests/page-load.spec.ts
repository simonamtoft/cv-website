import { test, expect } from '@playwright/test';

test.describe('Page Load & Structure', () => {
  test('Page loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');

    await expect(page).toHaveTitle(/Simon Amtoft Pedersen/);
    expect(errors).toHaveLength(0);
  });

  test('All routes render without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    for (const route of ['/', '/background', '/writing', '/contact']) {
      await page.goto(route);
      await expect(page).toHaveTitle(/Simon Amtoft Pedersen/);
    }

    expect(errors).toHaveLength(0);
  });

  test('Home page shows hero; about page shows about section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header.header')).toBeVisible();

    await page.goto('/about');
    await expect(page.locator('section.about')).toBeAttached();
  });
});
