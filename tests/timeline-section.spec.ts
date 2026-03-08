import { test, expect } from '@playwright/test';

test.describe('Background (Timeline) Section', () => {
  test('Timeline renders with job titles and org names inline', async ({ page }) => {
    await page.goto('/background');

    const timeline = page.locator('.timeline');

    await expect(timeline.locator('.timeline-job-title').first()).toBeVisible();
    await expect(timeline.locator('.timeline-org-name').first()).toBeVisible();
  });

  test('Category badges are present for all three types', async ({ page }) => {
    await page.goto('/background');

    const timeline = page.locator('.timeline');

    await expect(timeline.locator('.category-work').first()).toBeAttached();
    await expect(timeline.locator('.category-education').first()).toBeAttached();
    await expect(timeline.locator('.category-community').first()).toBeAttached();
  });

  test('Clickable timeline items open and close modal via Escape', async ({ page }) => {
    await page.goto('/background');

    await page.locator('.timeline-item.has-details').first().click();

    await expect(page.locator('.modal-backdrop')).toBeVisible();
    await expect(page.locator('.modal-content')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.locator('.modal-backdrop')).not.toBeVisible();
  });

  test('Modal close button dismisses the modal', async ({ page }) => {
    await page.goto('/background');

    await page.locator('.timeline-item.has-details').first().click();
    await expect(page.locator('.modal-backdrop')).toBeVisible();

    await page.locator('.modal-close').click();

    await expect(page.locator('.modal-backdrop')).not.toBeVisible();
  });

  test('Tech tags use warm colour system, not legacy blue', async ({ page }) => {
    await page.goto('/background');

    const workItems = page.locator('.timeline-item.has-details', {
      has: page.locator('.category-work'),
    });
    await workItems.first().click();

    const techTag = page.locator('.tech-tag').first();
    await expect(techTag).toBeVisible();

    const color = await techTag.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).not.toBe('rgb(25, 118, 210)');
  });
});
