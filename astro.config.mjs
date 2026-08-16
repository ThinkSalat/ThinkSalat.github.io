import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shawnsalat.com',
  output: 'static',
  server: { port: 3000 },
  vite: {
    server: { strictPort: true },
    preview: { strictPort: true },
  },
  integrations: [sitemap()],
});
