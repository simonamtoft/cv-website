#!/usr/bin/env node

import { lookup } from 'node:dns/promises';
import { readdir, readFile } from 'node:fs/promises';
import { isIP } from 'node:net';
import path from 'node:path';
import process from 'node:process';

const ARTICLES_DIR = path.resolve('src/content/articles');
const BLOCKED_STATUSES = new Set([401, 403, 405, 406, 429]);
const BROKEN_STATUSES = new Set([404, 410]);
const CONCURRENCY = 6;
const MAX_REDIRECTS = 10;

function parseArgs(argv) {
  const options = { article: null, json: false, list: false, timeout: 10_000 };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--article') {
      options.article = argv[++i];
      if (!options.article) throw new Error('--article requires a slug');
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--list') {
      options.list = true;
    } else if (arg === '--timeout') {
      options.timeout = Number(argv[++i]);
      if (!Number.isFinite(options.timeout) || options.timeout <= 0) {
        throw new Error('--timeout requires a positive number of milliseconds');
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return JSON.parse(trimmed);
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  return trimmed;
}

function parseSources(contents, article) {
  const frontmatter = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) throw new Error(`${article}: missing YAML frontmatter`);

  const lines = frontmatter.split(/\r?\n/);
  const sourcesIndex = lines.findIndex((line) => line === 'sources:');
  if (sourcesIndex === -1) return [];

  const sources = [];
  let current = null;
  for (const line of lines.slice(sourcesIndex + 1)) {
    if (/^[^\s]/.test(line)) break;

    const title = line.match(/^  - title:\s*(.+)$/);
    if (title) {
      current = { article, title: unquote(title[1]), url: null };
      sources.push(current);
      continue;
    }

    const url = line.match(/^    url:\s*(.+)$/);
    if (url && current) current.url = unquote(url[1]);
  }

  for (const source of sources) {
    if (!source.url) throw new Error(`${article}: source "${source.title}" has no URL`);
    const parsed = new URL(source.url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error(`${article}: source "${source.title}" must use HTTP or HTTPS`);
    }
  }

  return sources;
}

async function discoverSources(articleFilter) {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isDirectory() && (!articleFilter || entry.name === articleFilter))
    .map((entry) => entry.name)
    .sort();

  if (articleFilter && slugs.length === 0) {
    throw new Error(`Unknown article slug: ${articleFilter}`);
  }

  const groups = await Promise.all(
    slugs.map(async (slug) => {
      const contents = await readFile(path.join(ARTICLES_DIR, slug, 'index.mdx'), 'utf8');
      return parseSources(contents, slug);
    })
  );
  return groups.flat();
}

function parseIPv4(address) {
  const octets = address.split('.').map(Number);
  return octets.length === 4 && octets.every((octet) => Number.isInteger(octet) && octet >= 0 && octet <= 255)
    ? octets
    : null;
}

function parseIPv6(address) {
  const [head, tail] = address.toLowerCase().split('::');
  if (address.split('::').length > 2) return null;

  const parseSide = (side) => {
    if (!side) return [];
    const parts = side.split(':');
    const last = parts.at(-1);
    if (last?.includes('.')) {
      const ipv4 = parseIPv4(last);
      if (!ipv4) return null;
      parts.splice(-1, 1, ((ipv4[0] << 8) | ipv4[1]).toString(16), ((ipv4[2] << 8) | ipv4[3]).toString(16));
    }
    const values = parts.map((part) => Number.parseInt(part, 16));
    return values.every((value) => Number.isInteger(value) && value >= 0 && value <= 0xffff)
      ? values
      : null;
  };

  const left = parseSide(head);
  const right = parseSide(tail);
  if (!left || !right) return null;
  const omitted = 8 - left.length - right.length;
  if ((address.includes('::') && omitted < 1) || (!address.includes('::') && omitted !== 0)) return null;
  return [...left, ...Array(omitted).fill(0), ...right];
}

function isPublicAddress(address) {
  if (isIP(address) === 4) {
    const [a, b, c] = parseIPv4(address);
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 0 && c === 0) ||
      (a === 192 && b === 0 && c === 2) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      (a === 198 && b === 51 && c === 100) ||
      (a === 203 && b === 0 && c === 113) ||
      a >= 224
    );
  }

  if (isIP(address) === 6) {
    const parts = parseIPv6(address);
    if (!parts) return false;
    const isUnspecified = parts.every((part) => part === 0);
    const isLoopback = parts.slice(0, 7).every((part) => part === 0) && parts[7] === 1;
    const isMappedIPv4 = parts.slice(0, 5).every((part) => part === 0) && parts[5] === 0xffff;
    if (isMappedIPv4) {
      return isPublicAddress(`${parts[6] >> 8}.${parts[6] & 0xff}.${parts[7] >> 8}.${parts[7] & 0xff}`);
    }
    return !(
      isUnspecified ||
      isLoopback ||
      (parts[0] & 0xfe00) === 0xfc00 ||
      (parts[0] & 0xffc0) === 0xfe80 ||
      (parts[0] & 0xff00) === 0xff00 ||
      (parts[0] === 0x2001 && parts[1] === 0x0db8)
    );
  }

  return false;
}

async function assertPublicUrl(url) {
  const hostname = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    throw new Error(`refusing local destination: ${hostname}`);
  }

  const addresses = isIP(hostname)
    ? [{ address: hostname }]
    : await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => !isPublicAddress(address))) {
    throw new Error(`refusing non-public destination: ${hostname}`);
  }
}

async function requestSource(initialUrl, timeout) {
  let current = new URL(initialUrl);
  let method = 'HEAD';

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    await assertPublicUrl(current);
    const response = await fetch(current, {
      method,
      redirect: 'manual',
      signal: AbortSignal.timeout(timeout),
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': 'amtoft.dev article source checker',
      },
    });

    if ((response.status === 405 || response.status === 501) && method === 'HEAD') {
      await response.body?.cancel();
      method = 'GET';
      redirects -= 1;
      continue;
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) return { response, finalUrl: current.href };
      current = new URL(location, current);
      method = 'HEAD';
      continue;
    }

    await response.body?.cancel();
    return { response, finalUrl: current.href };
  }

  throw new Error(`too many redirects (more than ${MAX_REDIRECTS})`);
}

async function checkSource(source, timeout) {
  try {
    const { response, finalUrl } = await requestSource(source.url, timeout);

    let status = 'unavailable';
    if (response.ok) status = 'ok';
    else if (BLOCKED_STATUSES.has(response.status)) status = 'blocked';
    else if (BROKEN_STATUSES.has(response.status)) status = 'broken';

    return {
      ...source,
      status,
      httpStatus: response.status,
      finalUrl,
    };
  } catch (error) {
    return {
      ...source,
      status: 'unavailable',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function mapConcurrent(items, limit, mapper) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function summarize(results) {
  return results.reduce(
    (counts, result) => ({ ...counts, [result.status]: counts[result.status] + 1 }),
    { ok: 0, blocked: 0, broken: 0, unavailable: 0 }
  );
}

function printHuman(results, counts) {
  const symbols = { ok: 'OK', blocked: 'BLOCKED', broken: 'BROKEN', unavailable: 'UNAVAILABLE' };
  for (const result of results) {
    const detail = result.httpStatus ? `HTTP ${result.httpStatus}` : result.error;
    console.log(`${symbols[result.status].padEnd(11)} ${result.article}: ${result.title}${detail ? ` (${detail})` : ''}`);
  }
  console.log(
    `\n${results.length} sources: ${counts.ok} ok, ${counts.blocked} blocked, ` +
      `${counts.broken} broken, ${counts.unavailable} unavailable`
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const sources = await discoverSources(options.article);

  if (options.list) {
    const output = { sources, total: sources.length };
    if (options.json) console.log(JSON.stringify(output, null, 2));
    else sources.forEach((source) => console.log(`${source.article}\t${source.title}\t${source.url}`));
    return;
  }

  const results = await mapConcurrent(sources, CONCURRENCY, (source) =>
    checkSource(source, options.timeout)
  );
  const counts = summarize(results);

  if (options.json) console.log(JSON.stringify({ results, summary: counts }, null, 2));
  else printHuman(results, counts);

  if (counts.broken > 0 || counts.unavailable > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
