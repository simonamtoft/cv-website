import { test, expect } from '@playwright/test';

test.describe('About Section', () => {
  test('About section heading and key content', async ({ page }) => {
    await page.goto('/about');

    const about = page.locator('section.about');

    await expect(about.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(about.getByRole('heading', { name: 'About Me' })).not.toBeAttached();

    await expect(about.getByText('The Tech Collective', { exact: false })).toBeVisible();
    await expect(about.getByText('Implement Consulting Group', { exact: false })).toBeVisible();

    const aboutText = await about.textContent();
    expect(aboutText).not.toContain('Senior AI Engineer');
    expect(aboutText).not.toContain('Senior Data Scientist');
  });

  test('Profile picture present', async ({ page }) => {
    await page.goto('/about');

    const profilePic = page.locator('img.profile-picture');
    await expect(profilePic).toBeVisible();
    await expect(profilePic).toHaveAttribute('src', /.+/);
  });
});
