// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Background (Timeline) Section', () => {
  test('Timeline renders with job titles and org names inline', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const timeline = page.locator('#timeline');

    // Verify current role title is visible inline on card
    await expect(timeline.locator('.timeline-job-title', { hasText: 'Senior Consultant, Data & AI' }).first()).toBeVisible();

    // Verify a previous role title is visible
    await expect(timeline.locator('.timeline-job-title', { hasText: 'Senior Data Scientist' }).first()).toBeVisible();

    // Verify org name is visible inline
    await expect(timeline.locator('.timeline-org-name', { hasText: 'Stibo Systems' }).first()).toBeVisible();
  });

  test('Category badges are present for all three types', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const timeline = page.locator('#timeline');

    // Verify Work, Education, and Community badges all exist
    await expect(timeline.locator('.category-work').first()).toBeAttached();
    await expect(timeline.locator('.category-education').first()).toBeAttached();
    await expect(timeline.locator('.category-community').first()).toBeAttached();
  });

  test('Clickable timeline items open and close modal via Escape', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Click the first clickable timeline item
    await page.locator('.timeline-item.has-details').first().click();

    // Verify modal opens
    await expect(page.locator('.modal-backdrop')).toBeVisible();
    await expect(page.locator('.modal-content')).toBeVisible();

    // Close via Escape key
    await page.keyboard.press('Escape');

    // Verify modal is gone
    await expect(page.locator('.modal-backdrop')).not.toBeVisible();
  });

  test('Modal close button dismisses the modal', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Open modal
    await page.locator('.timeline-item.has-details').first().click();
    await expect(page.locator('.modal-backdrop')).toBeVisible();

    // Click the close button
    await page.locator('.modal-close').click();

    // Verify modal is dismissed
    await expect(page.locator('.modal-backdrop')).not.toBeVisible();
  });

  test('Tech tags use orange colour system, not legacy blue', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Open a work experience item that has projects (contains tech tags).
    // Work items with projects show a .category-work badge, so find a has-details
    // item that also contains that badge.
    const workItems = page.locator('.timeline-item.has-details', {
      has: page.locator('.category-work'),
    });
    await workItems.first().click();

    // Verify tech tags exist
    const techTag = page.locator('.tech-tag').first();
    await expect(techTag).toBeVisible();

    // Verify the tag colour is not the old blue (#1976d2 = rgb(25, 118, 210))
    const color = await techTag.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).not.toBe('rgb(25, 118, 210)');
  });
});
