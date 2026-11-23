// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project URL for https://github.com/amritactalab/ctalab-website
  // If you later attach a custom domain (e.g. https://ctalab.amrita.edu),
  // set `site` to that domain, remove `base`, and add `public/CNAME`.
  site: 'https://amritactalab.github.io',
  base: '/ctalab-website',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
