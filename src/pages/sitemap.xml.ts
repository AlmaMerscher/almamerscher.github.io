import type { APIRoute } from "astro";

// Generated rather than hand-written, so a new page cannot be forgotten here.
const pages = ["", "research", "engagements", "interest-group", "contact"];

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://almamerscher.github.io")).href.replace(/\/$/, "");
  const urls = pages
    .map((p) => `  <url><loc>${base}/${p}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  );
};
