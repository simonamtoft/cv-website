import { test, expect } from '@playwright/test';

test.describe('Background timeline', () => {
  test('timeline details can be dismissed by keyboard or close button', async ({ page }) => {
    await page.goto('/background');
    // The class is added by an effect, so it marks the page as hydrated; a
    // click on the prerendered HTML before that is lost.
    await expect(page.locator('.timeline.is-visible')).toBeVisible();

    const itemWithDetails = page.locator('.timeline-item.has-details').first();
    await itemWithDetails.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await itemWithDetails.click();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
