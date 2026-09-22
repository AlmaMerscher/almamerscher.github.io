// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and the sitemap. Update this if a custom domain is added.
  // NOTE: this assumes the site is served from the domain root. If it is ever served
  // from a subpath (e.g. github.io/personal-website), `base` must be set here AND every
  // hardcoded internal link updated to respect it.
  site: 'https://almamerscher.github.io',
});
