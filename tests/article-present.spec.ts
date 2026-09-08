import { test, expect, type Page } from '@playwright/test';

async function expectDeckReady(page: Page) {
  const deck = page.locator('.deck');
  await expect(deck).toHaveAttribute('data-ready', '');
  await expect(deck).toBeFocused();
  await expect(page.locator('.deck-slide.is-current')).toBeVisible();
}

test.describe('Article presentation', () => {
  test('a reader can enter, navigate, and leave slide mode', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');
    await page.locator('.article-present-link').click();
    await expect(page).toHaveURL(/\/writing\/agentic-engineering\/present$/);
    await expectDeckReady(page);

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/\/writing\/agentic-engineering\/present$/);
    await expect(page.locator('.deck-counter')).toContainText(/^2 \/ /);

    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.deck-counter')).toContainText(/^1 \/ /);

    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/writing\/agentic-engineering$/);
    await expect(page.locator('.article-reading')).toBeVisible();
  });

  test('an unknown presentation URL keeps the site navigation available', async ({ page }) => {
    await page.goto('/writing/not-an-article/present');

    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  });

  test('visual build steps consume navigation keys before changing slides', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');
    await expectDeckReady(page);

    const harnessSlide = page.locator('.deck-slide', { has: page.locator('.harness-controller') });
    while (!(await harnessSlide.evaluate((element) => element.classList.contains('is-current')).catch(() => false))) {
      await page.keyboard.press('ArrowRight');
    }

    const hiddenBlocks = () => harnessSlide.locator('.hc-block').evaluateAll(
      (elements) => elements.filter((element) => getComputedStyle(element).opacity === '0').length,
    );
    const before = await hiddenBlocks();
    const counter = await page.locator('.deck-counter').textContent();
    expect(before).toBeGreaterThan(0);

    await page.keyboard.press('ArrowRight');
    await expect.poll(hiddenBlocks).toBe(before - 1);
    await expect(page.locator('.deck-counter')).toHaveText(counter!);

    await page.keyboard.press('ArrowLeft');
    await expect.poll(hiddenBlocks).toBe(before);
    await expect(page.locator('.deck-counter')).toHaveText(counter!);
  });
});
