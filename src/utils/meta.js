// Builds the React Router meta descriptor array for a route, so per-route
// (and per-article) title/description/OG/Twitter tags are authoritative and
// prerendered into the static HTML that non-JS social scrapers read. The root
// document shell (root.jsx) intentionally holds no OG/Twitter/description
// literals; every route supplies its own here to avoid duplicate tags.

const SITE = 'https://amtoft.dev';
const DEFAULT_DESCRIPTION =
  'ML engineer and data scientist specialising in production ML systems, MLOps, and applied AI. Based in Copenhagen.';
const DEFAULT_IMAGE = `${SITE}/profile.jpeg`;

// path: route path beginning with "/" (e.g. "/", "/writing/agentic-engineering").
export function buildMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const url = `${SITE}${path === '/' ? '/' : path}`;
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: url },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
}
