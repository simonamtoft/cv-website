// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Header & Navigation', () => {
  test('Hero header renders correct name and title', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify name and current title are in the hero
    await expect(page.getByRole('heading', { name: 'Simon Amtoft Pedersen' })).toBeVisible();
    await expect(page.getByText('Senior Consultant, Data & AI').first()).toBeVisible();
  });

  test('Navigation contains correct labels', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const nav = page.locator('nav');

    // Verify new professional hub nav labels are present
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Background' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Writing & Talks' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();

    // Verify old CV-era labels are gone
    await expect(nav.getByRole('link', { name: 'Resume' })).not.toBeAttached();
    await expect(nav.getByRole('link', { name: 'Publications & Events' })).not.toBeAttached();
  });

  test('Navigation links scroll to correct sections', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Click About and verify section is in view
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page.locator('#about')).toBeInViewport();

    // Click Services and verify section is in view
    await page.getByRole('link', { name: 'Services' }).first().click();
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('LinkedIn and GitHub links present in header', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const header = page.locator('header');

    // Verify LinkedIn link
    const linkedIn = header.locator('a[href*="linkedin.com/in/simonamtoft"]');
    await expect(linkedIn).toBeAttached();
    await expect(linkedIn).toHaveAttribute('target', '_blank');

    // Verify GitHub link
    const github = header.locator('a[href*="github.com/SimonAmtoft"]');
    await expect(github).toBeAttached();
    await expect(github).toHaveAttribute('target', '_blank');
  });
});
