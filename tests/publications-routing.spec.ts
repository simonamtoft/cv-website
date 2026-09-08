import { test, expect } from '@playwright/test';
import publicationsEvents from '../src/data/publicationsEvents.js';

test('publication types use the link destination owned by their section', () => {
  const articles = publicationsEvents.filter(({ type }) => type === 'article');
  const presentations = publicationsEvents.filter(({ type }) => type === 'presentation');

  expect(articles.length).toBeGreaterThan(0);
  expect(articles.every(({ link }) => link?.startsWith('https://'))).toBe(true);
  expect(presentations.length).toBeGreaterThan(0);
  expect(presentations.every(({ link }) => link?.startsWith('/talks/'))).toBe(true);
});
