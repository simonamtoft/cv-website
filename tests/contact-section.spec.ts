// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test('Contact section heading reads "Let\'s Talk"', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const contact = page.locator('#contact');

    // Verify new CTA heading
    await expect(contact.getByRole('heading', { name: "Let's Talk" })).toBeVisible();

    // Verify old heading is gone
    await expect(contact.getByRole('heading', { name: 'Reach Out!' })).not.toBeAttached();
  });

  test('Contact links are present and correct', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const contact = page.locator('#contact');

    // Verify email link
    await expect(contact.locator('a[href="mailto:simon@amtoft.dev"]')).toBeVisible();

    // Verify LinkedIn link
    await expect(contact.locator('a[href*="linkedin.com/in/simonamtoft"]')).toBeVisible();
  });
});
