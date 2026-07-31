import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test('Contact links are present and correct', async ({ page }) => {
    await page.goto('/contact');

    const contact = page.locator('.contact');

    await expect(contact.locator('a[href="mailto:simon@amtoft.dev"]')).toBeVisible();
    await expect(contact.locator('a[href*="linkedin.com/in/simonamtoft"]')).toBeVisible();
  });
});
