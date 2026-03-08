import { test, expect } from '@playwright/test';

test.describe('Header & Navigation', () => {
  test('Hero header renders correct name and tagline', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Simon Amtoft Pedersen' })).toBeVisible();
    await expect(page.getByText('Senior ML Engineer', { exact: false }).first()).toBeVisible();
  });

  test('Navigation contains correct labels', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');

    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Background' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Writing & Talks' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();

    // Services was removed
    await expect(nav.getByRole('link', { name: 'Services' })).not.toBeAttached();
  });

  test('Navigation links route to correct pages', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);

    await page.getByRole('link', { name: 'Background' }).click();
    await expect(page).toHaveURL(/\/background/);

    await page.getByRole('link', { name: 'Writing & Talks' }).click();
    await expect(page).toHaveURL(/\/writing/);

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('LinkedIn link present in header', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    const linkedIn = header.locator('a[href*="linkedin.com/in/simonamtoft"]');
    await expect(linkedIn).toBeAttached();
    await expect(linkedIn).toHaveAttribute('target', '_blank');
  });
});
