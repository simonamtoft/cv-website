import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test("Contact section heading reads \"Let's Talk\"", async ({ page }) => {
    await page.goto('/contact');

    const contact = page.locator('.contact');

    await expect(contact.getByRole('heading', { name: "Let's Talk" })).toBeVisible();
    await expect(contact.getByRole('heading', { name: 'Reach Out!' })).not.toBeAttached();
  });

  test('Contact links are present and correct', async ({ page }) => {
    await page.goto('/contact');

    const contact = page.locator('.contact');

    await expect(contact.locator('a[href="mailto:simon@amtoft.dev"]')).toBeVisible();
    await expect(contact.locator('a[href*="linkedin.com/in/simonamtoft"]')).toBeVisible();
  });
});
