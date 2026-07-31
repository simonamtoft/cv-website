import { getComparableTime } from '../utils/dateFormatter';

// Self-hosted essays are auto-discovered from the MDX content directory: each
// article is a self-contained bundle folder in src/content/articles/<slug>/ with
// an index.mdx (valid frontmatter) plus any bespoke visuals/CSS it embeds. Drop a
// new bundle in and it is listed and routed with no further wiring. Each module
// exposes a `frontmatter` export (from remark-mdx-frontmatter) and a default MDX
// component.
//
// Convention: an article's frontmatter `slug` MUST match its folder name, because
// the prerender list (react-router.config.js) enumerates folder names while the
// route and list link by frontmatter slug.
const modules = import.meta.glob('../content/articles/*/index.mdx', { eager: true });

const articles = Object.values(modules)
  .map((mod) => ({
    slug: mod.frontmatter.slug,
    frontmatter: mod.frontmatter,
    Body: mod.default,
  }))
  // Newest-first by lastUpdated, matching the editorial list order.
  .sort(
    (a, b) =>
      getComparableTime(b.frontmatter.lastUpdated) -
      getComparableTime(a.frontmatter.lastUpdated)
  );

export const getArticleBySlug = (slug) =>
  articles.find((article) => article.slug === slug) || null;

export default articles;
