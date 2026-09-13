import { test, expect } from '@playwright/test';

const figureName = 'Read routing: hand off extraction, keep the decision';

test('delegated routing loops automatically', async ({ page }) => {
  await page.clock.install();
  await page.goto('/writing/agentic-engineering');
  const figure = page.getByRole('figure', { name: figureName });
  const delegated = figure.getByRole('region', { name: 'Delegated extraction' });
  await delegated.scrollIntoViewIfNeeded();
  const diagram = delegated.getByRole('img');
  await expect(diagram).toHaveAccessibleName('Parent → read hook: Read request');
  for (const transfer of ['Read hook → parent', 'Parent → isolated worker', 'Source → worker', 'Worker → parent', 'Relevant source → parent', 'Parent → read hook']) {
    await page.clock.runFor(2800);
    await expect(diagram).toHaveAccessibleName(new RegExp(transfer));
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const paused = await diagram.getAttribute('aria-label');
  if (!paused) throw new Error('Routing diagram needs an accessible transfer label');
  await page.clock.runFor(20000);
  await expect(diagram).toHaveAccessibleName(paused);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.runFor(3000);
  await expect(diagram).not.toHaveAccessibleName(paused);
});

test('reduced motion starts paused; presentation advances without routing fragments', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/writing/agentic-engineering/present');
  await expect(page.locator('.deck')).toHaveAttribute('data-ready', '');
  const slide = page.getByRole('region', { name: 'Hand off extraction, keep the decision', exact: true });
  for (let i = 0; i < 40 && !(await slide.isVisible()); i++) await page.keyboard.press('ArrowRight');
  await expect(slide).toBeVisible();
  const diagram = slide.getByRole('img', { name: 'Parent → read hook: Read request', exact: true });
  await expect(diagram).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(slide).not.toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(slide).toBeVisible();
  await expect(diagram).toBeVisible();
});
