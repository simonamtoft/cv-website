import { test, expect, type Page } from '@playwright/test';

const route = '/talks/claude-code-workshop';

async function openSelector(page: Page) {
  await page.goto(route);
  await expect(page.locator('.workshop-presentation-host')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Choose slides' })).toBeVisible();
}

async function openDeck(page: Page) {
  await openSelector(page);
  await page.getByRole('button', { name: /^Present \d+ slides$/ }).click();
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
  test('a visitor opens the workshop selector from Talks', async ({ page }) => {
    await page.goto('/talks');
    await page.locator('.work-card-presentation .work-card-link').click();

    await expect(page).toHaveURL(route);
    await expect(page.getByRole('heading', { name: 'Choose slides' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /^Primary/ })).toHaveCount(0);
  });

  test('the trailing-slash route also starts with the selector', async ({ page }) => {
    await page.goto(`${route}/`);

    await expect(page.getByRole('heading', { name: 'Choose slides' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /^Primary/ })).toHaveCount(0);
  });

  test('the selector and overview edit the live deck, prevent an empty deck, and renumber slides', async ({ page }) => {
    await openSelector(page);

    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(page.getByRole('button', { name: 'Present 0 slides' })).toBeDisabled();

    await page.getByRole('checkbox', { name: /Claude i praksis/ }).check();
    await page.getByRole('checkbox', { name: /Hvem står her/ }).check();
    await page.getByRole('checkbox', { name: /Program/ }).check();
    await expect(page.getByRole('button', { name: 'Present 3 slides' })).toBeEnabled();
    await page.getByRole('button', { name: 'Present 3 slides' }).click();

    await expect(page.locator('nav[aria-label="Slides"] button')).toHaveCount(3);
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);

    await openOverview(page);
    await page.getByRole('checkbox', { name: /Hvem står her/ }).uncheck();
    await expect(page.locator('nav[aria-label="Slides"] button')).toHaveCount(2);
    await expect(page.getByText('02 / 2')).toBeVisible();

    await page.getByRole('checkbox', { name: /Program/ }).uncheck();
    await expect(page.locator('nav[aria-label="Slides"] button')).toHaveCount(1);
    await expect(page.getByText('01 / 1')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: /Claude i praksis/ })).toBeDisabled();
  });

  test('overview edits preserve the active slide when its position changes', async ({ page }) => {
    await openSelector(page);
    await page.getByRole('button', { name: 'Clear all' }).click();
    await page.getByRole('checkbox', { name: /Claude i praksis/ }).check();
    await page.getByRole('checkbox', { name: /Hvem står her/ }).check();
    await page.getByRole('checkbox', { name: /Program/ }).check();
    await page.getByRole('button', { name: 'Present 3 slides' }).click();
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);

    await openOverview(page);
    await page.getByRole('checkbox', { name: /Claude i praksis/ }).uncheck();
    await expect(page.getByText('01 / 2')).toBeVisible();

    await page.getByRole('checkbox', { name: /Claude i praksis/ }).check();
    await expect(page.getByText('02 / 3')).toBeVisible();
  });

  test('keyboard navigation and the full authored overview preserve deck state', async ({ page }) => {
    await openDeck(page);
    const authoredSlides = await page.locator('nav[aria-label="Slides"] button').count();

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);

    await openOverview(page);
    await expect(page.locator('.fixed.inset-0 button')).toHaveCount(authoredSlides + 1);
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
    await openDeck(page);
    await openOverview(page);
    await page
      .locator('article')
      .filter({ hasText: 'Byg det i Code' })
      .getByRole('button')
      .click();

    const countdown = page.locator('.workshop-countdown[data-workshop-duration="40"]');
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
    await expect(page.locator('.workshop-countdown').getByText('25:00')).toBeVisible();
    await expect(page.locator('.workshop-countdown').getByText('40:00')).toBeVisible();
  });
});
