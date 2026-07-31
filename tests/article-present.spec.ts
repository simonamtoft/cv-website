import { test, expect } from '@playwright/test';

// Seam 1 (e2e): the presentation deck at /writing/:slug/present - slide
// navigation, Escape return, and an interactive visual that stays interactive
// full-screen (its state survives navigation).
test.describe('Article presentation / slide mode', () => {
  test('renders slide 1 and a counter over the authored slides', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');

    const current = page.locator('.deck-slide.is-current');
    await expect(current).toBeVisible();

    const total = await page.locator('.deck-slide').count();
    expect(total).toBeGreaterThan(1);
    await expect(page.locator('.deck-counter')).toHaveText(`1 / ${total}`);
  });

  test('arrow keys navigate the deck without leaving the present route', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');
    const total = await page.locator('.deck-slide').count();

    await page.keyboard.press('ArrowRight');
    // Guards the useKeyboardNav fix: ArrowRight must advance the deck, not
    // navigate to the first site page.
    await expect(page).toHaveURL(/\/writing\/agentic-engineering\/present$/);
    await expect(page.locator('.deck-counter')).toHaveText(`2 / ${total}`);

    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.deck-counter')).toHaveText(`1 / ${total}`);
  });

  test('Escape returns to the reading view', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');

    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/writing\/agentic-engineering$/);
    await expect(page.locator('.article-reading')).toBeVisible();
  });

  test('a visual builds up on key press and hides the reading-only info panel', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');

    // Advance to the slide that hosts the harness controller (a press consumes a
    // build step before moving on, so keep pressing until it is current).
    const harnessSlide = page.locator('.deck-slide', { has: page.locator('.harness-controller') });
    while (!(await harnessSlide.evaluate((el) => el.classList.contains('is-current')).catch(() => false))) {
      await page.keyboard.press('ArrowRight');
    }

    const controller = harnessSlide.locator('.harness-controller');
    // The reading-only info panel below the dotted line is not rendered in present.
    await expect(controller.locator('.harness-lever-detail')).toHaveCount(0);

    // The loop assembles one block per press: it starts partly built, so a later
    // block in the sequence is still hidden.
    const blocks = controller.locator('.hc-block');
    const hidden = () =>
      blocks.evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity === '0').length);
    const before = await hidden();
    expect(before).toBeGreaterThan(0);

    // A press reveals the next step without changing the slide counter...
    const counter = await page.locator('.deck-counter').textContent();
    await page.keyboard.press('ArrowRight');
    await expect.poll(hidden).toBe(before - 1);
    await expect(page.locator('.deck-counter')).toHaveText(counter!);

    // ...and stepping back un-reveals it (present reveal is reversible).
    await page.keyboard.press('ArrowLeft');
    await expect.poll(hidden).toBe(before);
    await expect(page.locator('.deck-counter')).toHaveText(counter!);
  });

  test('each of the four visuals is featured on a slide', async ({ page }) => {
    await page.goto('/writing/agentic-engineering/present');

    for (const visual of [
      '.leverage-pyramid',
      '.context-window',
      '.context-flow',
      '.harness-controller',
    ]) {
      const slide = page.locator('.deck-slide', { has: page.locator(visual) });
      await expect(slide).toHaveCount(1);
    }
  });

  test('the reading view links to the present deck', async ({ page }) => {
    await page.goto('/writing/agentic-engineering');

    await page.locator('.article-present-link').click();
    await expect(page).toHaveURL(/\/writing\/agentic-engineering\/present$/);
    await expect(page.locator('.deck-slide.is-current')).toBeVisible();
  });
});
