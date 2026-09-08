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

test.describe('Claude Code workshop presentation', () => {
  test('is discoverable from Talks and opens within the main app', async ({ page }) => {
    await page.goto('/talks');
    await page.locator('.work-card-presentation .work-card-link').click();

    await expect(page).toHaveURL(route);
    await expect(page.locator('.slide-content').first()).toBeVisible();
    await expect(page.locator('.nav-pill, .nav-mobile')).toHaveCount(0);
  });

  test('hides site navigation when opened with a trailing slash', async ({ page }) => {
    await page.goto(`${route}/`);

    await expect(page.locator('.nav-pill, .nav-mobile')).toHaveCount(0);
  });

  test('supports keyboard navigation and overview', async ({ page }) => {
    await openDeck(page);

    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(`${route}?slide=2`);

    await openOverview(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Close overview' })).toHaveCount(0);
  });

  test('supports fullscreen and a printable deck', async ({ page }) => {
    await openDeck(page);
    const slideCount = await page.locator('nav[aria-label="Slides"] button').count();
    await expect(page.getByRole('link', { name: 'Print / PDF' })).toHaveAttribute('href', '?print');

    await page.getByRole('button', { name: 'Present (F)' }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await expect(page.getByRole('button', { name: 'Present (F)' })).toHaveCount(0);
    await page.evaluate(() => document.exitFullscreen());
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    await expect(page.getByRole('button', { name: 'Present (F)' })).toBeVisible();

    await page.goto(`${route}?print`);
    await expect(page.locator('.print-slide')).toHaveCount(slideCount);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.print-hide')).toBeHidden();
    await expect(page.locator('.print-slide').first()).toHaveCSS('zoom', '1');
  });

  test('derives the three-hour agenda from one authoritative schedule', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=3`);

    const program = page.locator('.program-schedule');
    const items = program.locator('[data-schedule-item]');
    await expect(program).toBeVisible();
    await expect(items).toHaveCount(5);

    const schedule = await items.evaluateAll((elements) => elements.map((element) => ({
      id: element.getAttribute('data-schedule-item'),
      start: element.getAttribute('data-start'),
      end: element.getAttribute('data-end'),
      duration: Number(element.getAttribute('data-duration-minutes')),
    })));
    expect(schedule).toEqual([
      { id: 'introduction', start: '13:00', end: '13:30', duration: 30 },
      { id: 'first-break', start: '13:30', end: '13:40', duration: 10 },
      { id: 'workshop', start: '13:40', end: '15:10', duration: 90 },
      { id: 'second-break', start: '15:10', end: '15:20', duration: 10 },
      { id: 'closing', start: '15:20', end: '16:00', duration: 40 },
    ]);
    expect(schedule.reduce((total, item) => total + item.duration, 0)).toBe(180);

    const contained = await program.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.top);
    });
    expect(contained).toBe(true);

    await openOverview(page);
    await expect(page.locator('.program-schedule')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.program-schedule')).toHaveCount(1);
  });

  test('keeps both break slides and the workshop transition aligned with the schedule', async ({ page }) => {
    await page.goto(`${route}?slide=15`);
    await expect(page.locator('.break-slide')).toHaveAttribute('data-return-time', '13:40');

    await page.goto(`${route}?slide=16`);
    await expect(page.locator('[data-workshop-duration]')).toHaveAttribute('data-workshop-duration', '90');

    await page.goto(`${route}?slide=17`);
    await expect(page.locator('.break-slide')).toHaveAttribute('data-return-time', '15:20');
    await page.waitForLoadState('networkidle');

    await openOverview(page);
    await expect(page.locator('.break-slide')).toHaveCount(4);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.break-slide')).toHaveCount(2);
  });

  test('keeps the debrief reflection layout within its slide in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=18`);

    const debrief = page.locator('.debrief-reflection');
    await expect(debrief).toBeVisible();
    await expect(debrief.locator('article')).toHaveCount(4);
    const contained = await debrief.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.top);
    });
    expect(contained).toBe(true);

    await openOverview(page);
    await expect(page.locator('.debrief-reflection')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.debrief-reflection')).toHaveCount(1);
  });

  test('keeps the annotated prompt composition intact in live, overview, and print modes', async ({ page }) => {
    await page.goto(`${route}?slide=13`);

    const prompt = page.locator('.annotated-prompt');
    await expect(prompt).toBeVisible();
    await expect(prompt.locator('svg')).toHaveCount(0);

    await openOverview(page);
    await expect(page.locator('.annotated-prompt')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.annotated-prompt')).toHaveCount(1);
  });

  test('keeps the two-interface demonstration within its slide in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=5`);

    const demo = page.locator('.chat-vs-code');
    const panels = demo.locator('[data-outcome]');
    await expect(demo).toBeVisible();
    await expect(panels).toHaveCount(2);
    await expect(demo.locator('img')).toHaveCount(0);

    await page.waitForTimeout(1200);
    const layout = await demo.evaluate((element) => {
      const slide = element.closest('.slide-content');
      const slideBox = slide?.getBoundingClientRect();
      const footer = slide?.querySelector('footer')?.getBoundingClientRect();
      return [...element.querySelectorAll('[data-outcome]')].map((panel) => {
        const box = panel.getBoundingClientRect();
        const caption = panel.querySelector('p:last-child')?.getBoundingClientRect();
        return {
          contained: Boolean(slideBox && footer && box.left >= slideBox.left
            && box.right <= slideBox.right && box.bottom <= footer.top),
          captionInside: Boolean(caption && caption.bottom <= box.bottom + 1),
        };
      });
    });
    expect(layout).toHaveLength(2);
    expect(layout.every(({ contained, captionInside }) => contained && captionInside)).toBe(true);

    await openOverview(page);
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

  test('keeps the leverage hierarchy ordered and contained in every presentation mode', async ({ page }) => {
    await page.goto(`${route}?slide=12`);

    const hierarchy = page.locator('.leverage-hierarchy');
    const levels = hierarchy.locator('[aria-label] > div > div');
    await expect(hierarchy).toBeVisible();
    await expect(levels).toHaveCount(5);

    await page.waitForTimeout(1200);
    const dimensions = await levels.evaluateAll((items) => items.map((item) => {
      const box = item.getBoundingClientRect();
      return { width: box.width, top: box.top };
    }));
    const widthsFromTopToBottom = [...dimensions]
      .sort((a, b) => a.top - b.top)
      .map(({ width }) => width);
    expect(widthsFromTopToBottom).toEqual([...widthsFromTopToBottom].sort((a, b) => b - a));

    await openOverview(page);
    await expect(page.locator('.leverage-hierarchy')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.leverage-hierarchy')).toHaveCount(1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=12`);
    const isContained = await hierarchy.evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && box.left >= slide.left && box.right <= slide.right
        && box.top >= slide.top && box.bottom <= slide.bottom);
    });
    expect(isContained).toBe(true);
  });

  test('keeps the planning flow within its slide in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=11`);

    const journey = page.locator('.plan-mode-journey');
    await expect(journey).toBeVisible();
    await expect(journey.locator('.context-funnel')).toBeVisible();

    const isAboveFooter = await journey.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top);
    });
    expect(isAboveFooter).toBe(true);

    await openOverview(page);
    await expect(page.locator('.plan-mode-journey')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.plan-mode-journey')).toHaveCount(1);
  });

  test('keeps the workshop exercise steps within its slide in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=14`);

    const exercise = page.locator('.delivery-exercise');
    const steps = exercise.locator('[data-delivery-step]');
    await expect(exercise).toBeVisible();
    await expect(steps).toHaveCount(5);

    await page.waitForTimeout(900);
    const contained = await exercise.evaluate((element) => {
      const slide = element.closest('.slide-content');
      const footer = slide?.querySelector('footer')?.getBoundingClientRect();
      const slideBox = slide?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const lastStep = element.querySelector('[data-delivery-step]:last-child')?.getBoundingClientRect();
      return Boolean(slideBox && footer && lastStep
        && box.left >= slideBox.left && box.right <= slideBox.right
        && box.bottom <= footer.top && lastStep.bottom <= footer.top);
    });
    expect(contained).toBe(true);

    await openOverview(page);
    await expect(page.locator('.delivery-exercise')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.delivery-exercise')).toHaveCount(1);
    await expect(page.locator('.delivery-exercise [data-delivery-step]')).toHaveCount(5);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=14`);
    const isContainedOnMobile = await page.locator('.delivery-exercise').evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && footer && box.left >= slide.left && box.right <= slide.right && box.bottom <= footer.top);
    });
    expect(isContainedOnMobile).toBe(true);
  });

  test('keeps the folder-scope visual within its slide in every presentation mode', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=7`);

    const scope = page.locator('.folder-scope-visual');
    await expect(scope).toBeVisible();

    const aboveFooter = await scope.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top);
    });
    expect(aboveFooter).toBe(true);

    await openOverview(page);
    await expect(page.locator('.folder-scope-visual')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.folder-scope-visual')).toHaveCount(1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${route}?slide=7`);
    const isContainedOnMobile = await scope.evaluate((element) => {
      const slide = element.closest('.slide-content')?.getBoundingClientRect();
      const footer = element.closest('.slide-content')?.querySelector('footer')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return Boolean(slide && footer && box.left >= slide.left && box.right <= slide.right && box.bottom <= footer.top);
    });
    expect(isContainedOnMobile).toBe(true);
  });

  test('renders permission modes in live, overview, and print modes', async ({ page }) => {
    await page.goto(`${route}?slide=8`);

    const modes = page.locator('.permission-modes [data-permission-mode]');
    await expect(modes).toHaveCount(5);

    await openOverview(page);
    await expect(page.locator('.permission-modes')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.permission-modes')).toHaveCount(1);
  });

  test('keeps the three-tool ladder contained and ordered by autonomy', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=6`);

    const ladder = page.locator('.tool-ladder');
    const rungs = ladder.locator('[data-rung]');
    await expect(ladder).toBeVisible();
    await expect(rungs).toHaveCount(3);

    await page.waitForTimeout(1000);
    const measurements = await rungs.evaluateAll((items) => items.map((item) => ({
      height: item.getBoundingClientRect().height,
      overflows: item.scrollHeight > item.clientHeight + 1,
    })));
    const heights = measurements.map(({ height }) => height);
    expect(heights).toEqual([...heights].sort((a, b) => a - b));
    expect(measurements.every(({ overflows }) => !overflows)).toBe(true);

    const aboveFooter = await ladder.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top);
    });
    expect(aboveFooter).toBe(true);

    await openOverview(page);
    await expect(page.locator('.tool-ladder')).toHaveCount(2);
    await page.keyboard.press('Escape');

    await page.goto(`${route}?print`);
    await expect(page.locator('.tool-ladder')).toHaveCount(1);
  });

  test('keeps the trifecta slide and its injected log line within the slide', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=10`);

    const trifecta = page.locator('.trifecta-visual');
    await expect(trifecta).toBeVisible();
    await expect(trifecta.locator('[data-injected]')).toHaveCount(1);

    await page.waitForTimeout(1000);
    const contained = await trifecta.evaluate((element) => {
      const slide = element.closest('.slide-content');
      const slideBox = slide?.getBoundingClientRect();
      const footer = slide?.querySelector('footer')?.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const injected = element.querySelector('[data-injected]')?.getBoundingClientRect();
      return Boolean(slideBox && footer && injected
        && box.left >= slideBox.left && box.right <= slideBox.right
        && box.bottom <= footer.top && injected.right <= slideBox.right);
    });
    expect(contained).toBe(true);

    await page.goto(`${route}?print`);
    await expect(page.locator('.trifecta-visual')).toHaveCount(1);
  });

  test('keeps both adoption tracks within the closing outlook slide', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${route}?slide=22`);

    const outlook = page.locator('.next-steps');
    await expect(outlook).toBeVisible();
    await expect(outlook.locator('[data-track]')).toHaveCount(2);

    await page.waitForTimeout(900);
    const aboveFooter = await outlook.evaluate((element) => {
      const footer = element.closest('.slide-content')?.querySelector('footer');
      return Boolean(footer && element.getBoundingClientRect().bottom <= footer.getBoundingClientRect().top);
    });
    expect(aboveFooter).toBe(true);

    await page.goto(`${route}?print`);
    await expect(page.locator('.next-steps')).toHaveCount(1);
  });

  test('contains the highlighted comparison column within the table', async ({ page }) => {
    await page.goto(`${route}?slide=9`);

    const table = page.locator('.tool-choice-table');
    await expect(table).toBeVisible();
    await expect(table.locator('table')).toHaveCount(1);
    await expect(table).toHaveCSS('overflow', 'hidden');
    await page.waitForTimeout(900);

    const bounds = await table.evaluate((element) => {
      const tableBounds = element.getBoundingClientRect();
      return [...element.querySelectorAll('tbody td:last-child')].map((cell) => {
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
