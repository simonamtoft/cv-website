import { test, expect } from '@playwright/test';

test('primary navigation reaches every top-level page', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Primary', exact: true });
  for (const path of ['/about', '/background', '/writing', '/talks', '/contact']) {
    await nav.locator(`a[href="${path}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});
