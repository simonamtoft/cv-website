import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // MDX compiled at build time. Frontmatter (YAML) is parsed and re-exported
    // as a `frontmatter` named export (remark-mdx-frontmatter), the single
    // source of truth for list metadata and per-article meta/OG. Code blocks
    // are syntax-highlighted at build with Shiki so no runtime highlighter
    // ships. Must run before the React Router plugin so .mdx is compiled to JSX
    // first. (react-markdown is deliberately not used: it cannot host the
    // inline interactive React visuals these essays embed.)
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [[rehypeShiki, { theme: 'github-light' }]],
    }),
    // React Router framework-mode plugin (replaces @vitejs/plugin-react; the RR
    // plugin provides the React transform + Fast Refresh).
    reactRouter(),
  ],
  // This project (migrated from Create React App) keeps JSX inside .js files.
  // Vite/esbuild only treats .jsx as JSX by default, so opt the source .js
  // files into the JSX loader for both dev transform and dependency pre-bundling.
  esbuild: {
    loader: 'jsx',
    // Cover both .js (legacy CRA convention) and .jsx (route modules / root).
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    // Keep the legacy CRA dev port so Playwright (baseURL :3000) and docs stay valid.
    port: 3000,
    strictPort: true,
    open: false,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
