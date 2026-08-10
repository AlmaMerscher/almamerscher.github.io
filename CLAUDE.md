# Personal website — Alma-Sophia Merscher

Academic/professional profile, blog, and speaking list. Built with Astro, deployed as a
static site to a German host.

## Commands

```
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Layout of the project

```
src/
  layouts/Layout.astro     shared shell: nav, footer, <head>
  pages/                   one file per route
    index.astro            home (hero + latest cards)
    blog/index.astro       blog listing
    blog/[...id].astro     individual post template
    speaking.astro
    contact.astro
  content/blog/*.md        blog posts — add a file, it appears automatically
  content.config.ts        frontmatter schema for posts
  styles/global.css        design tokens + base styles
```

## Design

Editorial style, inspired by Aeon and Nowness: warm palette, dark hero, bold serif
headlines, warm-toned category labels.

**All colors and fonts are CSS custom properties in `src/styles/global.css`.** Change
them there and the whole site follows. Never hardcode a hex value in a component.

Type: serif (`--font-serif`) for headings, sans (`--font-sans`) for body. Both are
system font stacks — see the DSGVO rules below before changing this.

## DSGVO rules — do not break these

This site is operated from Germany. These constraints are legal, not stylistic.

1. **No external requests. None.** No CDN, no Google Fonts, no remote images, no embedded
   video or maps, no third-party scripts. Loading Google Fonts remotely has been ruled a
   GDPR violation in Germany and triggered a wave of warning letters.
2. **Custom fonts must be self-hosted** — the font file goes in `public/fonts/` and is
   referenced with `@font-face`. Never a `<link>` to a font CDN.
3. **No cookies, no localStorage, no tracking.** The site currently sets nothing, which is
   why it needs no cookie banner. Adding any of these reintroduces that requirement.
4. **Analytics, if added, must be cookieless and EU-hosted** (GoatCounter, Plausible, or
   self-hosted Matomo). Never Google Analytics.
5. **Impressum and Datenschutzerklärung must be reachable from every page** (§ 5 DDG).
   Current law is DDG and TDDDG — not TMG or TTDSG. Older templates get this wrong.

Before adding any dependency or embed, ask: does this cause the visitor's browser to
contact a third-party server? If yes, it does not go in.

## Content

Add a blog post by creating `src/content/blog/<slug>.md`:

```yaml
---
title: "Post title"
description: "One-line summary, shown on cards and in search results"
date: 2026-08-10
category: blog     # or: speaking
---
```

Speaking entries are currently hardcoded in `speaking.astro`. If the list grows past a
handful, move it to a content collection like the blog.

## Conventions

- Keep the dependency list near-empty. Astro alone covers what this site needs.
- Page-specific CSS goes in that page's `<style>` block; anything shared goes in
  `global.css`.
- Every page sets its own `<title>` via the `title` prop on `Layout`.
- Write for a general reader, not an academic committee — this is a personal site.

## Status

Placeholder content is still in place on the home page, the sample blog post, speaking,
and contact. Real content is pending. Hosting is not yet chosen; GitHub Pages was
deliberately ruled out (US servers, visitor IP logging, no AVV).
