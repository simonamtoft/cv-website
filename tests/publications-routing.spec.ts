import { test, expect } from '@playwright/test';
import publicationsEvents from '../src/data/publicationsEvents.js';

test('external publications link to HTTPS destinations', () => {
  const articles = publicationsEvents.filter(({ type }) => type === 'article');

  expect(articles.length).toBeGreaterThan(0);
  expect(articles.every(({ link }) => link?.startsWith('https://'))).toBe(true);
});
