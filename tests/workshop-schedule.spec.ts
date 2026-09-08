import { test, expect } from '@playwright/test';
import {
  scheduleById,
  scheduledItems,
} from '../src/presentations/claude-code-workshop/schedule.js';

test('workshop schedule fills 13:00–16:00 with one self-paced build block', () => {
  expect(
    scheduledItems.map(({ id, start, end, duration }) => ({ id, start, end, duration })),
  ).toEqual([
    { id: 'introduction', start: 13 * 60, end: 13 * 60 + 30, duration: 30 },
    { id: 'workshop', start: 13 * 60 + 30, end: 15 * 60 + 20, duration: 110 },
    { id: 'closing', start: 15 * 60 + 20, end: 16 * 60, duration: 40 },
  ]);
  expect(scheduledItems.reduce((total, item) => total + item.duration, 0)).toBe(180);
  expect(scheduleById.workshop.duration).toBe(110);
});
