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
    engagements.astro      talks/panels/media, grouped by type
    interest-group.astro   the international loneliness interest group
    contact.astro          contact details + Impressum (#impressum anchor)
  styles/global.css        design tokens + base styles
public/images/             hero photo, exported as WebP at two sizes plus a
                           head-and-shoulders crop for small screens
```

Nav is five items: Welcome, Research, Engagements, Interest Group, Contact.

**A blog is planned but deliberately not in this version.** The working implementation
(`src/pages/blog/`, `src/content/`, `src/content.config.ts`) is in git history — recover
it with `git show cf4671d:<path>` rather than rebuilding from scratch.

## Design

Two registers. The **home hero** is a midnight-navy band after a reference design Alma
supplied: deep navy (`--night-*` tokens), bold display sans, name set in two weights, a
hairline rule, photo bleeding off the bottom-left. The **rest of the site** is warm and
editorial — cream ground, serif headlines, rust and amber labels.

The hero photo is **pre-composited onto `--night-bg`** (`alma-portrait-navy-*.webp`).
The cutout's anti-aliased edge is ~15x brighter than the navy, so letting the browser
composite the transparent version over a dark ground leaves a visible halo around the
hair. If `--night-bg` changes, regenerate those files or the fringe returns.

The hero has an explicit `height`, not `min-height`, and the photo is absolutely
positioned. With the photo in flow, `height: 100%` on a content-sized grid row is
circular and the hero grew to 1415px.

Check contrast when changing any colour. Several values here are chosen to clear 4.5:1
at small sizes and are not free to nudge: `--accent-rust-deep` exists because
`--accent-rust` is 3.83:1 on the oat tone, and `--cat-2` was darkened from `#a3781f`
(3.92:1) for the same reason.

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

**Propose any user-facing copy to Alma in chat and wait for her yes before putting it in
a page.** Headlines, intros, taglines, button labels, page descriptions. Rewriting text
she supplied is fine when she asks, but flag any phrase added that was not in her
original. Structural and CSS work does not need this.

When adding an outbound link, strip tracking parameters (`utm_*`, LinkedIn's `rcm=`) and
expand shorteners such as `lnkd.in` to their real destination first.

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

Done: Welcome (hero, photo, intro text), Research (opening paragraph and eight
publications), Engagements (ten entries grouped by type).

Still placeholder: the Engagements intro paragraph, the Interest Group's "How it works"
and "Joining" sections, the Contact links, and the Impressum — which needs generating
with a German provider and pasting in.

The site is not live. The repository is private and the deploy workflow is disabled;
publishing means making the repo public and re-enabling the workflow, and Alma asks for
both deliberately.
