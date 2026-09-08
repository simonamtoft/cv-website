import { test, expect, type Page } from '@playwright/test';

const route = '/talks/claude-code-workshop';

async function openDeck(page: Page) {
  await page.goto(route);
  await expect(page.locator('.workshop-presentation-host')).toBeVisible();
  await expect(page.locator('.slide-content').first()).toBeVisible();
}

async function openOverview(page: Page) {
  await page.keyboard.press('g');
  await expect(page.getByRole('button', { name: 'Close overview' })).toBeVisible();
}

function clockSeconds(value: string | null) {
  const match = value?.match(/^(\d+):(\d{2})$/);
  if (!match) throw new Error(`Unexpected countdown value: ${value}`);
  return Number(match[1]) * 60 + Number(match[2]);
}

test.describe('Claude Code workshop presentation', () => {
  test('a visitor can open the workshop from Talks', async ({ page }) => {
    await page.goto('/talks');
    await page.locator('.work-card-presentation .work-card-link').click();

    await expect(page).toHaveURL(route);
    await expect(page.locator('.slide-content').first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: /^Primary/ })).toHaveCount(0);
  });

  test('the trailing-slash route also uses presentation mode', async ({ page }) => {
    await page.goto(`${route}/`);

    await expect(page.locator('.slide-content').first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: /^Primary/ })).toHaveCount(0);
  });

  test('keyboard navigation and the overview preserve deck state', async ({ page }) => {
    await openDeck(page);

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);

    await openOverview(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Close overview' })).toHaveCount(0);
    await expect(page).toHaveURL(`${route}?slide=2`);
  });

  test('the deck supports fullscreen presenting and complete print output', async ({ page }) => {
    await openDeck(page);
    const authoredSlides = await page.locator('nav[aria-label="Slides"] button').count();

    await page.getByRole('button', { name: 'Present (F)' }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await page.evaluate(() => document.exitFullscreen());
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);

    const printPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Print / PDF' }).click();
    const printPage = await printPagePromise;
    await expect(printPage).toHaveURL(`${route}?print`);
    await expect(printPage.locator('.print-slide')).toHaveCount(authoredSlides);
    await printPage.emulateMedia({ media: 'print' });
    await expect(printPage.locator('.print-hide')).toBeHidden();
  });

  test('the workshop countdown keeps running across slide navigation', async ({ page }) => {
    await page.goto(`${route}?slide=15`);

    const countdown = page.locator('.workshop-countdown');
    const clock = countdown.locator('p').first();
    await expect(clock).toHaveText(/^\d+:\d{2}$/);
    const initial = await clock.textContent();
    await expect.poll(() => clock.textContent()).not.toBe(initial);

    const beforeLeaving = clockSeconds(await clock.textContent());
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1500);
    await page.keyboard.press('ArrowRight');
    await expect.poll(async () => clockSeconds(await clock.textContent())).toBeLessThan(beforeLeaving);

    await page.goto(`${route}?print`);
    await expect(page.locator('.workshop-countdown').getByText('110:00')).toBeVisible();
  });
});
