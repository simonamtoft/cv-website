import { test, expect } from '@playwright/test';

test.describe('About Section', () => {
  test('Profile picture present', async ({ page }) => {
    await page.goto('/about');

    const profilePic = page.locator('img.profile-picture');
    await expect(profilePic).toBeVisible();
    await expect(profilePic).toHaveAttribute('src', /.+/);
  });
});
