// Work projects are auto-discovered from the MDX content directory, the same
// way articles are: each project is a bundle folder in
// src/content/work/<slug>/ with an index.mdx, a cover.svg, and any demo
// component it embeds.
//
// Convention: a project's frontmatter `slug` MUST match its folder name, because
// the prerender list (react-router.config.js) enumerates folder names while the
// route and cards link by frontmatter slug.
const modules = import.meta.glob('../content/work/*/index.mdx', { eager: true });

const covers = import.meta.glob('../content/work/*/cover.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const projects = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: mod.frontmatter.slug,
    frontmatter: mod.frontmatter,
    cover: covers[path.replace('index.mdx', 'cover.svg')],
    Body: mod.default,
  }))
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug) || null;

export default projects;
