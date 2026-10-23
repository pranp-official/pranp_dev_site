# Hearth Theme Implementation Log

This document records the architectural decisions, progress, and verification checks performed while implementing the **Hearth** ("Warm Editorial Personal Site") custom Hugo theme for [pranp.dev](https://www.pranp.dev/).

---

## Metadata
* **Branch**: `relmerge/hearth-theme`
* **Theme Name**: `hearth` (`themes/hearth/`)
* **Hugo Target Version**: Hugo `v0.146.0+` (System active: `v0.168.0 extended`)
* **Deployment Target**: Cloudflare Workers / Pages (`wrangler.jsonc`)

---

## Implementation Decisions & Log

### Phase 0: Prerequisites & Architectural Setup
* **Branch Created**: `relmerge/hearth-theme` branched from `main`. Live production deployment remains undisturbed on `main`.
* **Submodule Audit**: `themes/PaperMod` identified for clean deprecation and removal in Phase 10.
* **Font Delivery Decision**:
  * Inspected `/Users/pranavp/Desktop/Learning/fonts/` zip archives. Discovered Google Fonts provided desktop `.ttf` Variable Fonts (~900 KB each).
  * Decision: In accordance with the Phase 3 specification and optimal web performance targets (Core Web Vitals), official variable `.woff2` files (~40–80 KB each) are fetched and self-hosted locally in `themes/hearth/static/fonts/`.

---

### Phase Tracking Checklist

- [x] **Phase 1**: Theme Scaffolding (`themes/hearth/`, menu configuration, directory structure)
  * Scaffolded theme via `hugo new theme hearth`.
  * Verified modern Hugo template structure (`home.html`, `page.html`, `section.html`, `_partials`).
  * Created subdirectories: `_markup`, `_shortcodes`, `projects`, `search`, `assets/css`, `assets/fonts`, `assets/js`, `static/fonts`, `static/js`.
  * Migrated `content/posts` -> `content/blog` using `git mv`.
  * Updated `hugo.yaml` with modern `menus: main:` and replaced deprecated `languageCode` with `locale`.
  * Verified initial build with `hugo --theme hearth -D` (exited code 0 in 27ms).
- [x] **Phase 2**: Design Tokens (`tokens.css` with CSS custom properties and `light-dark()`)
  * Created `themes/hearth/assets/css/tokens.css` defining semantic color tokens via `light-dark()`, typography scale (`--step--1` to `--step-4`), measure (`68ch`), leading (`1.65`), spacing scale, and border radius.
  * Added code syntax tokens (`--code-string`, `--code-func`, `--code-number`).
  * Contrast Verified against `--bg` (WCAG 2.1 AA/AAA compliance):
    * Light mode (`#FAF6EE`): Text (14.61:1), Muted (6.03:1), Accent (5.58:1).
    * Dark mode (`#1C1815`): Text (13.97:1), Muted (7.33:1), Accent (6.55:1).
    * Code syntax tokens: All between 5.43:1 and 9.82:1.
- [x] **Phase 3**: Base Shell, Typography & Partials (`baseof.html`, `head.html`, `fonts.css`, WOFF2 fonts)
  * Downloaded and placed self-hosted variable WOFF2 fonts in `themes/hearth/static/fonts/`:
    * `fraunces-var.woff2` (36 KB)
    * `literata-var.woff2` (108 KB)
    * `literata-italic-var.woff2` (111 KB)
    * `jetbrains-mono-var.woff2` (39 KB)
  * Created `fonts.css` with `@font-face` definitions for variable axes.
  * Created `baseof.html` semantic page shell with skip-to-content accessibility link.
  * Created `_partials/head.html` with `<link rel="preload">` for primary fonts and fingerprinted CSS concatenation bundle (`hearth.css`).
  * Created `_partials/header.html` with menu iteration, `aria-current="page"` active state, search link, and theme toggle hook.
  * Created `_partials/footer.html` with copyright and RSS link.
  * Created placeholders for `theme-init.html`, `scripts.html`, and `theme-toggle.html`.
  * Verified build outputs: `public/css/hearth.min.*.css` and `public/fonts/` generated in 11 ms.
- [x] **Phase 4**: Page Templates & Starter Content (`home.html`, `section.html`, `page.html`, `card.html`, dummy content)
  * Implemented `home.html` featuring intro bio section and recent writing card grid.
  * Implemented `_partials/card.html` and `_partials/post-meta.html` (date formatting, reading time, tags).
  * Implemented `section.html` for clean chronological lists (`/blog`, `/notes`).
  * Implemented `projects/section.html` displaying portfolio card grid with outbound project links.
  * Implemented `page.html` for long-form reading, notes, and the About page.
  * Implemented `taxonomy.html` and `term.html` for tag archives.
  * Populated `layout.css` and `components.css` with CSS grid, fluid layout, responsive breakpoints, card styling, and accessibility skip links.
  * Created starter and realistic dummy content:
    * `content/_index.md`: Homepage bio.
    * `content/about.md`: Security engineering profile and background.
    * `content/blog/_index.md`, `content/projects/_index.md`, `content/notes/_index.md`.
    * `content/blog/first-post.md`: Short-lived credentials essay.
    * `content/blog/zero-trust-cloud-architecture.md`: In-depth essay with headings, Go code block, and Mermaid diagram.
    * `content/projects/cloud-iam-sentinel.md` & `content/projects/first.md`: Portfolio project cards with links.
    * `content/notes/workload-identity-federation.md`: Cloud security note.
  * Verified build output: 59 pages built in 18 ms.
- [x] **Phase 5**: Light & Dark Mode Engine (`theme-init.html`, `theme-toggle.html`, `theme.js`)
  * Created `_partials/theme-init.html` executing synchronously in `<head>` to read `localStorage` and set `data-theme` prior to paint, preventing any FOUC.
  * Created `_partials/theme-toggle.html` accessible button element with ARIA states (`aria-label`, `aria-pressed`).
  * Implemented `assets/js/theme.js` handling toggle events, persistence to `localStorage`, and listening for OS `prefers-color-scheme` changes.
  * Styled `.theme-toggle` in `components.css` with focus-visible indicators and smooth hover transitions.
  * Bundled, minified, and fingerprinted `theme.min.*.js` in `scripts.html`.
- [x] **Phase 6**: Long-Read Editorial Typography & Code Highlighting (`base.css`, Chroma styles)
  * Implemented `base.css` with fluid clamp scaling, text-wrap (`balance` on headings, `pretty` on paragraphs), blockquote accents, responsive tables, and typography hierarchy.
  * Configured class-based Chroma syntax highlighting (`markup.highlight.noClasses: false`) in `hugo.yaml`.
  * Added syntax highlighting token rules to `components.css` (`.chroma .k`, `.chroma .s`, `.chroma .nf`, etc.) mapping directly to theme tokens.
  * Verified compiled HTML: Chroma classes rendered with clean semantic spans and zero inline styles.
- [x] **Phase 7**: Built-in Features (TOC, Client-side Search, Code Copy, Mermaid diagrams)
  * **Table of Contents (7a)**: Created `_partials/toc.html` with heading threshold checks; styled sticky right-column layout for desktop (`@media (min-width: 72rem)`) and hidden on mobile.
  * **Client-side Search (7b)**: Created `layouts/home.json` emitting JSON search index for blog, notes, and projects. Scaffolded `content/search.md`, `layouts/search/page.html`, and `assets/js/search.js` using safe `textContent` DOM nodes and lazy-loaded `/index.json`.
  * **Code Copy Buttons (7c)**: Implemented `assets/js/copy.js` wrapping `.prose pre` blocks (excluding Mermaid) with accessible Copy buttons and timeout resets.
  * **Mermaid Diagrams (7d)**: Created `_markup/render-codeblock-mermaid.html` render hook and self-hosted `static/js/mermaid.min.js`. Configured dynamic script loading and dark/neutral theme initialization in `_partials/scripts.html`.
  * **Asset Pipeline (7e)**: Bundled and fingerprinted `js/theme.js`, `js/copy.js`, and `js/search.js` into a single `hearth.min.js` asset. Added component styles for search input, copy buttons, and diagrams.
- [x] **Phase 8**: Content Archetypes (`blog.md`, `notes.md`, `projects.md`)
  * Created archetypes in both `themes/hearth/archetypes/` and site root `archetypes/` so `hugo new content` works seamlessly.
  * Verified frontmatter generation for `blog/` (title, date, draft, description, tags), `notes/`, and `projects/` (including `links` schema).
  * Validated via `hugo new content` test and confirmed field accuracy.
- [x] **Phase 9**: Comprehensive Quality Verification & Testing
  * Verified local build: `hugo --gc --minify` builds cleanly in under 20ms with 0 errors or warnings.
  * Verified WCAG 2.1 contrast ratios: All text, muted, accent, and syntax elements achieve AA/AAA ratios (5.4:1 to 14.6:1).
  * Validated through interactive browser subagent testing:
    * Homepage: Serif typography (Fraunces & Literata), bio, and responsive card grid render properly.
    * Dark Mode: Verified seamless switching between light and dark modes with `data-theme` persistence.
    * Search: Dynamic client-side index lookup returns live results matching queries.
    * Long-read post: Validated sticky Table of Contents, Chroma syntax highlighting, interactive Copy buttons, and SVG Mermaid diagram rendering.
- [x] **Phase 10**: Clean Cutover & Cloudflare Configuration (`wrangler.jsonc`, PaperMod removal)
  * Switched active theme in `hugo.yaml` to `theme: hearth`.
  * Removed legacy PaperMod settings and deprecated `content/archives.md`.
  * Created custom `404.html` layout.
  * Configured `"not_found_handling": "404-page"` in `wrangler.jsonc` for Cloudflare Workers Static Assets.
  * Completely removed `themes/PaperMod` Git submodule and `.gitmodules` file. The repository now carries no external submodule build dependencies.
  * Ran local production build: `hugo --gc --minify` finished cleanly in 16 ms with zero warnings and zero errors.
- [x] **Phase 11**: Brand Identity & Dynamic Favicon Suite
  * Generated editorial "P" lettermark favicon suite aligned with the Hearth terracotta/parchment palette and security architecture identity.
  * Provided vector `favicon.svg` with embedded `@media (prefers-color-scheme: dark)` styling for dynamic browser tab light/dark theme adaptation.
  * Generated multi-resolution `favicon.ico` (16x16, 32x32, 48x48), `favicon-32x32.png`, `favicon-16x16.png`, and `apple-touch-icon.png` (180x180).
  * Added `site.webmanifest` and configured `<meta name="theme-color">` for light and dark browser chrome in `_partials/head.html`.


---

## Final Verification Summary
* **SSG Speed**: Compiles all 60 pages and fingerprinted asset bundles in 16 ms.
* **Asset Payload**: Zero external CDN runtime scripts; self-hosted variable WOFF2 fonts (~36KB–111KB), minified vanilla CSS, minified vanilla JS.
* **Feature Completeness**: Dark/Light mode toggle with anti-FOUC initialization, client-side dynamic search index, table of contents, code snippet copy buttons, and client-side Mermaid SVG diagrams.
* **Cloudflare Readiness**: Ready for preview build and deployment via Cloudflare Workers Assets.

