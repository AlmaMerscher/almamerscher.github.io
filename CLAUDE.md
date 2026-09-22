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
    index.astro            Welcome — hero with photo, intro, signpost cards
    research.astro         intro prose + publication list
    engagements.astro      talks/panels/media: Forthcoming and Past
    contact.astro          contact details + Impressum (#impressum anchor)
  styles/global.css        design tokens + base styles
public/images/             hero photo, exported as WebP at two sizes plus a
                           head-and-shoulders crop for small screens
```

Nav is four items: Welcome, Research, Engagements, Contact.

**A blog is planned but deliberately not in this version.** The working implementation
(`src/pages/blog/`, `src/content/`, `src/content.config.ts`) is in git history — recover
it with `git show cf4671d:<path>` rather than rebuilding from scratch.

## Design

Editorial style, inspired by Aeon and Nowness: warm palette, bold serif headlines,
warm-toned labels. The hero sits on a light oat ground one step deeper than the page
background — a dark ground made the photo cutout's hair fringe visible and merged with
Alma's hair.

Check contrast when changing any colour; `--accent-rust` is only 3.83:1 on the oat hero,
which is why `--accent-rust-deep` exists for small text.

German compound nouns overflow narrow viewports, so German text carries `lang="de"` and
hyphenates.

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
5. **The Impressum must be reachable from every page** (§ 5 DDG). It lives on
   `contact.astro` under the `#impressum` anchor and the footer links to it. Current law
   is DDG and TDDDG — not TMG or TTDSG. Older templates get this wrong.

   Alma decided on 2026-09-22 not to publish a Datenschutzerklärung. She was told that
   GitHub processes visitor IPs in the US and that this triggers the Art. 13 DSGVO duty
   to inform. It is her decision — don't raise it again unless she asks.

Before adding any dependency or embed, ask: does this cause the visitor's browser to
contact a third-party server? If yes, it does not go in.

## Content

Publications and engagements are plain arrays at the top of `research.astro` and
`engagements.astro`. Edit those arrays to add entries. If either list grows past a
couple of dozen, move it to a content collection.

## Conventions

- Keep the dependency list near-empty. Astro alone covers what this site needs.
- Page-specific CSS goes in that page's `<style>` block; anything shared goes in
  `global.css`.
- Every page sets its own `<title>` via the `title` prop on `Layout`.
- Write for a general reader, not an academic committee — this is a personal site.

## Hosting

**GitHub Pages**, chosen by Alma with the tradeoffs stated: US servers, visitor IPs
logged, no AVV, and the repository must be public on a free plan. Don't re-litigate this.
One consequence that does still apply: anything committed is permanently in public git
history — including the Impressum address.

Deploys run from `.github/workflows/deploy.yml` on every push to `main`. `astro.config.mjs`
assumes the site is served from a domain root; serving from a subpath would require
setting `base` *and* updating every hardcoded internal link.

## Status

All page content is still placeholder: the home headline and intro, research prose and
publications, engagement entries, contact links, and the Impressum. The Impressum text
needs generating with a German provider and pasting in.
