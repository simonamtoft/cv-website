// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('About Section', () => {
  test('About section heading and key content', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const about = page.locator('#about');

    // Verify heading reads "About", not "About Me"
    await expect(about.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(about.getByRole('heading', { name: 'About Me' })).not.toBeAttached();

    // Verify correct employer framing
    await expect(about.getByText('The Tech Collective', { exact: false })).toBeVisible();
    await expect(about.getByText('Implement Consulting Group', { exact: false })).toBeVisible();

    // Verify old incorrect titles are absent
    const aboutText = await about.textContent();
    expect(aboutText).not.toContain('Senior AI Engineer');
    expect(aboutText).not.toContain('Senior Data Scientist');
  });

  test('Profile picture present', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Verify profile image renders with a src
    const profilePic = page.locator('img.profile-picture');
    await expect(profilePic).toBeVisible();
    await expect(profilePic).toHaveAttribute('src', /.+/);
  });
});
