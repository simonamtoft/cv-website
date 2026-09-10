import { test, expect } from '@playwright/test';
import {
  scheduleById,
  scheduledItems,
} from '../src/presentations/claude-code-workshop/schedule.js';

test('workshop schedule fills 13:00–16:00 with two exercise blocks before the closing hour', () => {
  expect(
    scheduledItems.map(({ id, start, end, duration }) => ({ id, start, end, duration })),
  ).toEqual([
    { id: 'introduction', start: 13 * 60, end: 13 * 60 + 30, duration: 30 },
    { id: 'exercise-chat', start: 13 * 60 + 30, end: 13 * 60 + 55, duration: 25 },
    { id: 'claude-code', start: 13 * 60 + 55, end: 14 * 60 + 20, duration: 25 },
    { id: 'exercise-code', start: 14 * 60 + 20, end: 15 * 60, duration: 40 },
    { id: 'closing', start: 15 * 60, end: 16 * 60, duration: 60 },
  ]);
  expect(scheduledItems.reduce((total, item) => total + item.duration, 0)).toBe(180);
  expect(scheduleById['exercise-code'].end).toBe(15 * 60);
  expect(
    scheduledItems.filter((item) => item.kind === 'exercise').map((item) => item.id),
  ).toEqual(['exercise-chat', 'exercise-code']);
});
