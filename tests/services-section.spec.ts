// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Services Section', () => {
  test('Services section heading and intro', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const services = page.locator('#services');

    // Verify heading
    await expect(services.getByRole('heading', { name: 'Services' })).toBeVisible();

    // Verify intro paragraph is present
    await expect(services.locator('.services-intro')).toBeVisible();
  });

  test('All five service cards are present', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    const services = page.locator('#services');

    // Verify all 5 service card titles
    await expect(services.getByText('Machine Learning & Predictive Modelling')).toBeVisible();
    await expect(services.getByText('Generative AI & Agentic Systems')).toBeVisible();
    await expect(services.getByText('MLOps & AI Engineering')).toBeVisible();
    await expect(services.getByText('AI Solution Design & Delivery')).toBeVisible();
    await expect(services.getByText('Data Strategy & Advisory')).toBeVisible();
  });

  test('Each service card has icon, summary, and detail bullets', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check anatomy of the first service card
    const firstCard = page.locator('.service-card').first();

    // Verify FontAwesome icon
    await expect(firstCard.locator('i.fas')).toBeAttached();

    // Verify summary paragraph
    await expect(firstCard.locator('.service-card-summary')).toBeVisible();

    // Verify detail list has at least one item
    await expect(firstCard.locator('.service-card-details li').first()).toBeVisible();
  });
});
