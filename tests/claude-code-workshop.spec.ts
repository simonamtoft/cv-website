import { test, expect, type Page } from '@playwright/test';

const route = '/talks/claude-code-workshop';

async function openDeck(page: Page) {
  await page.goto(route);
  await expect(page.locator('.workshop-presentation-host')).toBeVisible();
  await expect(page.locator('.slide-content').first()).toBeVisible();
}

test.describe('Claude Code workshop presentation', () => {
  test('is discoverable from Talks and opens within the main app', async ({ page }) => {
    await page.goto('/talks');
    await page.locator('.work-card-presentation .work-card-link').click();

    await expect(page).toHaveURL(route);
    await expect(page.locator('.slide-content').first()).toBeVisible();
    await expect(page.locator('.nav-pill, .nav-mobile')).toHaveCount(0);
  });

  test('supports keyboard navigation and overview', async ({ page }) => {
    await openDeck(page);
    await expect(page.getByText('01 / 15')).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);
    await expect(page.getByText('02 / 15')).toBeVisible();

    await page.keyboard.press('g');
    await expect(page.getByText('All slides')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('All slides')).toHaveCount(0);
  });

  test('supports fullscreen and a printable deck', async ({ page }) => {
    await openDeck(page);
    await expect(page.getByRole('link', { name: 'Print / PDF' })).toHaveAttribute('href', '?print');

    await expect(page.getByText('01 / 15')).toBeVisible();
    await page.getByRole('button', { name: 'Present (F)' }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await expect(page.getByText('01 / 15')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Present (F)' })).toHaveCount(0);
    await page.evaluate(() => document.exitFullscreen());
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    await expect(page.getByText('01 / 15')).toBeVisible();

    await page.goto(`${route}?print`);
    await expect(page.getByText('Print edition · Claude Code workshop')).toBeVisible();
    await expect(page.locator('.print-slide')).toHaveCount(15);
    await page.emulateMedia({ media: 'print' });
    await expect(page.getByText('Print edition · Claude Code workshop')).toBeHidden();
    await expect(page.locator('.print-slide').first()).toHaveCSS('zoom', '1');
  });

  test('renders the first prompt as one annotated composition in live, overview, and print modes', async ({ page }) => {
    await page.goto(`${route}?slide=11`);

    const prompt = page.locator('.annotated-prompt');
    await expect(prompt).toBeVisible();
    await expect(prompt.getByText('mappen kvartalsrapporter')).toBeVisible();
    await expect(prompt.getByText('én samlet oversigt over nøgletallene for hvert selskab')).toBeVisible();
    await expect(prompt.getByText('en kollega')).toBeVisible();
    await expect(prompt.getByText('Skriv et script, der bygger oversigten, og gem resultatet som kvartalsoversigt.xlsx')).toBeVisible();
    await expect(prompt.locator('svg')).toHaveCount(0);

    await page.keyboard.press('g');
    await expect(page.getByText('All slides')).toBeVisible();
    await expect(page.locator('.annotated-prompt')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.annotated-prompt')).toHaveCount(1);
  });

  test('renders slide 5 as one shared task carried through two interfaces in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=5`);

    const demo = page.locator('.chat-vs-code');
    const chat = demo.locator('[data-outcome="chat"]');
    const code = demo.locator('[data-outcome="code"]');
    await expect(demo).toBeVisible();
    await expect(demo).toContainText('Samme opgave');
    await expect(chat).toContainText('Saml tallene fra de tre regneark til én kvartalsoversigt');
    await expect(code).toContainText('Saml tallene fra de tre regneark til én kvartalsoversigt');

    await expect(chat).toContainText('Kopiér');
    await expect(chat).toContainText('Svaret bliver i vinduet. I overfører det selv til regnearket.');
    await expect(code).toContainText('Skriver saml-kvartal.py');
    await expect(code).toContainText('kvartal-oversigt.xlsx');
    await expect(code).toContainText('Filerne ligger i mappen og kan åbnes, læses og køres igen.');
    await expect(demo).toContainText('samme resultat kræver stadig de samme filer');

    // The interfaces are recreated in markup, so no screenshot can leak data.
    await expect(demo.locator('img')).toHaveCount(0);

    await page.waitForTimeout(1200);
    const layout = await demo.evaluate((element) => {
      const slide = element.closest('.slide-content');
      const slideBox = slide?.getBoundingClientRect();
      const footer = slide?.querySelector('footer')?.getBoundingClientRect();
      const panels = [...element.querySelectorAll('[data-outcome]')].map((panel) => {
        const box = panel.getBoundingClientRect();
        const caption = panel.querySelector('p:last-child')?.getBoundingClientRect();
        return {
          contained: Boolean(slideBox && footer && box.left >= slideBox.left
            && box.right <= slideBox.right && box.bottom <= footer.top),
          captionInside: Boolean(caption && caption.bottom <= box.bottom + 1),
        };
      });
      return panels;
    });
    expect(layout).toHaveLength(2);
    expect(layout.every(({ contained, captionInside }) => contained && captionInside)).toBe(true);

    await page.keyboard.press('g');
    await expect(page.locator('.chat-vs-code')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.chat-vs-code')).toHaveCount(1);
    await expect(page.locator('.chat-vs-code [data-outcome]')).toHaveCount(2);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=5`);
    const isContainedOnMobile = await demo.evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && footer && box.left >= slide.left && box.right <= slide.right
        && box.bottom <= footer.top);
    });
    expect(isContainedOnMobile).toBe(true);
  });

  test('renders slide 10 as a complete leverage hierarchy in every presentation mode', async ({ page }) => {
    await page.goto(`${route}?slide=10`);

    const hierarchy = page.locator('.leverage-hierarchy');
    const levels = hierarchy.locator('[aria-label="Leverage hierarchy from code to operating frame"] > div > div');
    await expect(hierarchy).toBeVisible();
    await expect(levels).toHaveCount(5);
    await expect(hierarchy).toContainText('Kode');
    await expect(hierarchy).toContainText('Løsning og plan');
    await expect(hierarchy).toContainText('Kildemateriale');
    await expect(hierarchy).toContainText('Opgaven');
    await expect(hierarchy).toContainText('Arbejdsrammen');
    await expect(hierarchy).toContainText('Minutter');
    await expect(hierarchy).toContainText(/Hele\s*eftermiddagen/);

    await page.waitForTimeout(1200);
    const dimensions = await levels.evaluateAll((items) => items.map((item) => {
      const box = item.getBoundingClientRect();
      return { width: box.width, top: box.top };
    }));
    const widthsFromTopToBottom = [...dimensions]
      .sort((a, b) => a.top - b.top)
      .map(({ width }) => width);
    expect(widthsFromTopToBottom).toEqual([...widthsFromTopToBottom].sort((a, b) => b - a));
    expect(dimensions.map(({ top }) => top)).toEqual([...dimensions]
      .sort((a, b) => b.top - a.top)
      .map(({ top }) => top));

    await page.keyboard.press('g');
    await expect(page.locator('.leverage-hierarchy')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.leverage-hierarchy')).toHaveCount(1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=10`);
    const isContained = await hierarchy.evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && box.left >= slide.left && box.right <= slide.right
        && box.top >= slide.top && box.bottom <= slide.bottom);
    });
    expect(isContained).toBe(true);
  });

  test('renders slide 9 as an expanding planning flow in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=9`);

    const journey = page.locator('.plan-mode-journey');
    const gate = journey.locator('.plan-approval-gate');
    await expect(journey).toBeVisible();
    await expect(journey).toContainText('Åbn projektmappen');
    await expect(journey).toContainText('Skift til Plan mode');
    await expect(journey).toContainText('Iterér planen, til den passer');
    await expect(journey).toContainText('Mere kontekst');
    await expect(journey).toContainText('plan.md');
    await expect(journey).toContainText('Plan: kvartalsoversigt');
    await expect(journey).toContainText('Stemmer totalen med rapporten?');
    await expect(gate).toContainText('Godkend planen, før den rører noget.');
    await expect(journey.locator('.context-funnel')).toBeVisible();

    const isAboveFooter = await journey.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      if (!footer) return false;
      return element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top;
    });
    expect(isAboveFooter).toBe(true);

    await page.keyboard.press('g');
    await expect(page.locator('.plan-mode-journey')).toHaveCount(2);
    await expect(page.locator('.plan-approval-gate')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.plan-mode-journey')).toHaveCount(1);
    await expect(page.locator('.plan-approval-gate')).toHaveCount(1);
  });

  test('renders slide 12 as three task families in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=12`);

    const families = page.locator('.task-families [data-task-family]');
    await expect(families).toHaveCount(3);
    await expect(families.nth(0)).toContainText('Saml og skriv');
    await expect(families.nth(1)).toContainText('Beregn og modellér');
    await expect(families.nth(2)).toContainText('Følg og kontrollér');
    await expect(page.getByText('Vælg én familie og ét eksempel, du selv har liggende.')).toBeVisible();

    for (const example of [
      'Fra mødenoter til beslutningsoplæg',
      'Saml en tilbagevendende rapport',
      'Byg et beregningsværktøj',
      'Gør en model gentagelig',
      'Lav et performanceoverblik',
      'Automatiser en screening',
    ]) {
      await expect(page.locator('.task-families').getByText(example)).toBeVisible();
    }

    await page.waitForTimeout(900);
    const contained = await page.locator('.task-families').evaluate((element) => {
      const slide = element.closest('.slide-content');
      const footer = slide?.querySelector('footer')?.getBoundingClientRect();
      const slideBox = slide?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const lastExample = element.querySelector('[data-task-family]:last-child li:last-child')?.getBoundingClientRect();
      return Boolean(slideBox && footer && lastExample
        && box.left >= slideBox.left && box.right <= slideBox.right
        && box.bottom <= footer.top && lastExample.bottom <= footer.top);
    });
    expect(contained).toBe(true);

    await page.keyboard.press('g');
    await expect(page.locator('.task-families')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.task-families')).toHaveCount(1);
    await expect(page.locator('.task-families [data-task-family]')).toHaveCount(3);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=12`);
    const isContainedOnMobile = await page.locator('.task-families').evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && footer && box.left >= slide.left && box.right <= slide.right && box.bottom <= footer.top);
    });
    expect(isContainedOnMobile).toBe(true);
  });

  test('carries the prepared folder visual from scope setup into the scope comparison', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=6`);

    const prepared = page.locator('[data-folder-scope="prepared"]');
    await expect(prepared).toBeVisible();
    await expect(prepared).toContainText('kvartal-q3/');
    await expect(prepared).toContainText('Claude Code');
    await expect(prepared).toContainText('I godkender handlinger og ekstra adgang undervejs.');
    await expect(prepared).toContainText('ikke kun dem, den ændrer.');
    await expect(prepared).toContainText('Data behandles efter jeres aftale og opsætning.');
    await expect(prepared).toContainText('ikke en garanti for teknisk afgrænsning');

    const preparedAboveFooter = await prepared.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top);
    });
    expect(preparedAboveFooter).toBe(true);

    await page.keyboard.press('g');
    await expect(page.locator('[data-folder-scope="prepared"]')).toHaveCount(2);
    await expect(page.locator('[data-folder-scope="comparison"]')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('[data-folder-scope="prepared"]')).toHaveCount(1);
    await expect(page.locator('[data-folder-scope="comparison"]')).toHaveCount(1);

    await page.goto(`${route}?slide=7`);
    const comparison = page.locator('[data-folder-scope="comparison"]');
    await expect(comparison).toBeVisible();
    await expect(comparison).toContainText('En mappe til én opgave');
    await expect(comparison).toContainText('Hele computeren eller et delt drev');
    await expect(comparison).toContainText('S:/fælles-drev/');
    await expect(comparison).not.toContainText('Jura og compliance');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=6`);
    for (const scope of [page.locator('[data-folder-scope="prepared"]'), page.locator('[data-folder-scope="comparison"]')]) {
      const isContained = await scope.evaluate((element) => {
        const slide = element.closest('.slide-content')?.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
        return Boolean(slide && footer && box.left >= slide.left && box.right <= slide.right && box.bottom <= footer.top);
      });
      expect(isContained).toBe(true);
      await page.keyboard.press('ArrowRight');
    }
  });

  test('contains the highlighted Claude Code column within the comparison table', async ({ page }) => {
    await page.goto(`${route}?slide=8`);

    const table = page.locator('.tool-choice-table');
    await expect(table).toBeVisible();
    await expect(table.locator('table')).toHaveCount(1);
    await expect(table).toHaveCSS('overflow', 'hidden');
    await page.waitForTimeout(900);

    const bounds = await table.evaluate((element) => {
      const tableBounds = element.getBoundingClientRect();
      const highlightedCells = [...element.querySelectorAll('tbody td:last-child')];
      return highlightedCells.map((cell) => {
        const cellBounds = cell.getBoundingClientRect();
        return {
          contained: cellBounds.left >= tableBounds.left && cellBounds.right <= tableBounds.right
            && cellBounds.top >= tableBounds.top && cellBounds.bottom <= tableBounds.bottom,
        };
      });
    });
    expect(bounds).toHaveLength(4);
    expect(bounds.every(({ contained }) => contained)).toBe(true);
  });

  test('keeps portrait captions legible against their photos', async ({ page }) => {
    await page.goto(`${route}?slide=2`);

    await expect(page.locator('.portrait-text-scrim')).toHaveCount(2);
    await expect(page.locator('.portrait-text-scrim').first()).toHaveCSS(
      'background-image',
      /linear-gradient/,
    );
  });

  test('scales the deck for mobile screens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openDeck(page);

    const slide = page.locator('.slide-content').first();
    await expect(slide).toBeVisible();
    const box = await slide.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(390);
    expect(box?.height).toBeLessThanOrEqual(844);
  });
});
