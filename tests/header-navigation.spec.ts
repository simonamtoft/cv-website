import { test, expect } from '@playwright/test';

test.describe('Header & Navigation', () => {
  // Nav links are selected by href, not label, so renaming a label does not
  // break the routing check.
  test('Navigation links route to correct pages', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav.nav-pill');

    for (const path of ['/about', '/background', '/writing', '/talks', '/contact']) {
      await nav.locator(`a[href="${path}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test('LinkedIn link present in header', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    const linkedIn = header.locator('a[href*="linkedin.com/in/simonamtoft"]');
    await expect(linkedIn).toBeAttached();
    await expect(linkedIn).toHaveAttribute('target', '_blank');
  });
});
