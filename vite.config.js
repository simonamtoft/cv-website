import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This project (migrated from Create React App) keeps JSX inside .js files.
  // Vite/esbuild only treats .jsx as JSX by default, so opt the source .js
  // files into the JSX loader for both dev transform and dependency pre-bundling.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  // Output to build/ so the existing GitHub Pages workflow, the
  // `gh-pages -d build` deploy script, and .gitignore continue to work unchanged.
  build: {
    outDir: 'build',
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
