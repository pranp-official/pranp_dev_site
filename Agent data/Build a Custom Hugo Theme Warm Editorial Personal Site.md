# Build a Custom Hugo Theme: Warm Editorial Personal Site

Oct 22, 2026 · @pranav

## Overview

You build this theme as one standalone folder, `themes/hearth/`, using only Hugo, plain CSS and a little vanilla JavaScript, so the site still deploys with a single `hugo` build command. Replace `hearth` with any name you like; just use it consistently.

**What you end up with**

- A warm "paper" look: off-white background, dark brown ink, one terracotta accent, and no textures or ornament.
- Serif-led typography built for long reading: Fraunces for headings, Literata for body text, a monospace face for code.
- Light and dark modes that follow the system setting, with a manual toggle that remembers the choice.
- A home page with a short about-me block, recent-post cards and a menu: About, Blog, Work, Notes.
- Built-in table of contents, client-side search, code-copy buttons and Mermaid diagrams.

**The principle that shapes every choice:** no Tailwind, no npm build, no JavaScript framework. Each extra tool in the build is another thing that can break the deploy. Plain CSS custom properties handle theming, and Hugo's own asset pipeline handles bundling.

**How to use this guide:** work through the phases in order. Each phase ends with a check, so you know it works before moving on.

## Phase 0: Prerequisites and decisions

Settle these decisions before writing any code, because changing them later means editing every template.

**Prerequisites**

- Hugo 0.146.0 or newer. Run `hugo version`. The extended edition is not required for this theme.
- Your Cloudflare `HUGO_VERSION` build variable must match your local version, as a bare number such as `0.168.0`.
- Git, a text editor and a browser with developer tools.

**Decisions and defaults**

| Decision | Default in this guide | Why |
| --- | --- | --- |
| Theme name | `hearth` | Folder name and the `theme:` value |
| Heading font | Fraunces (variable) | Soft old-style serif with warmth |
| Body font | Literata (variable) | Designed for long on-screen reading |
| Code font | JetBrains Mono | Legible at small sizes |
| Accent colour | `#A3472B` light, `#E0875F` dark | Terracotta; both clear 4.5:1 contrast on their backgrounds |
| Menu labels | About, Blog, Work, Notes | Matches the four content sections |

All three typefaces are licensed under the SIL Open Font License, which allows self-hosting. Download each as WOFF2 files and keep them; you place them in Phase 3.

**Check:** `hugo version` reports 0.146.0 or newer, and you have WOFF2 files for the three fonts.

## Phase 1: Scaffold the theme

Generate an empty theme next to your current one, then test it with a command-line flag so your live site keeps working until the new theme is ready.

1. From the repository root, run:

   ```bash
   hugo new theme hearth
   ```
2. Make the theme folder match this tree. Hugo 0.146 and later use top-level template names (`home.html`, `page.html`, `section.html`) and underscore-prefixed folders (`_partials`, `_shortcodes`, `_markup`); add any folder the generator did not create.

   ```text
   themes/hearth/
   ├── archetypes/
   ├── assets/
   │   ├── css/
   │   ├── fonts/
   │   └── js/
   ├── layouts/
   │   ├── _markup/
   │   ├── _partials/
   │   ├── _shortcodes/
   │   ├── projects/
   │   ├── baseof.html
   │   ├── home.html
   │   ├── home.json
   │   ├── page.html
   │   ├── section.html
   │   ├── taxonomy.html
   │   └── term.html
   └── static/
   ```
3. Rename your existing post folder to match the menu label:

   ```bash
   git mv content/posts content/blog
   ```
4. Add the menu to your site's `hugo.yaml` (not the theme), so your repo owns it:

   ```yaml
   menus:
     main:
       - name: About
         pageRef: /about
         weight: 10
       - name: Blog
         pageRef: /blog
         weight: 20
       - name: Work
         pageRef: /projects
         weight: 30
       - name: Notes
         pageRef: /notes
         weight: 40
   ```
5. Preview the new theme without editing `theme:` in `hugo.yaml`:

   ```bash
   hugo server -D --theme hearth
   ```

**Check:** the server starts with no errors. Pages may look empty or unstyled, which is expected until the next phases.

## Phase 2: Design tokens

Put every colour, font size and spacing value in one file of CSS custom properties; every later stylesheet reads from it and never hard-codes a value. This is what makes light and dark mode a one-file concern.

Create `themes/hearth/assets/css/tokens.css`:

```css
:root {
  color-scheme: light dark;

  /* Colour: light-dark(light value, dark value) */
  --bg:      light-dark(#FAF6EE, #1C1815);
  --surface: light-dark(#F3ECDF, #25201C);
  --text:    light-dark(#2B2118, #EDE4D3);
  --muted:   light-dark(#6B5B4E, #B3A594);
  --border:  light-dark(#E2D8C6, #3A332C);
  --accent:  light-dark(#A3472B, #E0875F);

  /* Type families */
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body:    "Literata", Georgia, serif;
  --font-mono:    "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  --font-ui:      system-ui, -apple-system, "Segoe UI", sans-serif;

  /* Fluid type scale: body is about 18px on phones, 20px on desktop */
  --step--1: clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem);
  --step-0:  clamp(1.125rem, 1.08rem + 0.22vw, 1.25rem);
  --step-1:  clamp(1.35rem, 1.27rem + 0.40vw, 1.60rem);
  --step-2:  clamp(1.70rem, 1.55rem + 0.75vw, 2.10rem);
  --step-3:  clamp(2.10rem, 1.85rem + 1.25vw, 2.90rem);
  --step-4:  clamp(2.60rem, 2.20rem + 2.00vw, 3.80rem);

  /* Reading comfort */
  --measure: 68ch;
  --leading: 1.65;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-s:  1rem;
  --space-m:  1.5rem;
  --space-l:  2.5rem;
  --space-xl: 4rem;

  --radius: 6px;
}

/* Manual overrides, set by the toggle in Phase 5 */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
```

**Why `light-dark()`:** each colour is declared once with both values, so there is no duplicated dark-mode block to keep in sync. It needs a browser from 2024 or later (Chrome 123, Firefox 120, Safari 17.5); older browsers get no colours, so if you must support them, fall back to a `prefers-color-scheme` media query.

**Check:** compute contrast for text, muted text and accent against `--bg` in both modes with a contrast checker (WebAIM or browser dev tools). Every pair should reach at least 4.5:1. My own estimates put the accent near 5.6:1 in light mode and 6.5:1 in dark, but confirm them rather than trust the estimate.

## Phase 3: Base layout, partials and fonts

Build the page shell once in `baseof.html`; every other template only fills in its `main` block. Add the fonts here too, so later phases render in the real typefaces.

**1. Self-host the fonts.** Copy your WOFF2 files into `themes/hearth/static/fonts/` with these names: `fraunces-var.woff2`, `literata-var.woff2`, `literata-italic-var.woff2`, `jetbrains-mono-var.woff2`. Then create `assets/css/fonts.css`:

```css
@font-face {
  font-family: "Fraunces";
  src: url("/fonts/fraunces-var.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Literata";
  src: url("/fonts/literata-var.woff2") format("woff2");
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Literata";
  src: url("/fonts/literata-italic-var.woff2") format("woff2");
  font-weight: 200 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "JetBrains Mono";
  src: url("/fonts/jetbrains-mono-var.woff2") format("woff2");
  font-weight: 100 800;
  font-display: swap;
}
```

**2. Create the page shell**, `layouts/baseof.html`:

```go-html-template
<!DOCTYPE html>
<html lang="{{ site.Language.Lang }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  {{ partial "header.html" . }}
  <main id="main">
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
  {{ partial "scripts.html" . }}
</body>
</html>
```

**3. Create `layouts/_partials/head.html`**, which sets the metadata, preloads the two body fonts and builds one fingerprinted stylesheet:

```go-html-template
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ site.Title }}{{ else }}{{ .Title }} · {{ site.Title }}{{ end }}</title>
<meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ site.Params.description }}{{ end }}">
<link rel="canonical" href="{{ .Permalink }}">
{{ partial "theme-init.html" . }}
<link rel="preload" href="/fonts/literata-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossorigin>
{{ $parts := slice }}
{{ range slice "css/tokens.css" "css/fonts.css" "css/base.css" "css/layout.css" "css/components.css" }}
  {{ with resources.Get . }}{{ $parts = $parts | append . }}{{ end }}
{{ end }}
{{ $css := $parts | resources.Concat "css/hearth.css" | resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ with site.Home.OutputFormats.Get "rss" }}<link rel="alternate" type="application/rss+xml" href="{{ .Permalink }}" title="{{ site.Title }}">{{ end }}
```

**4. Create the remaining partials**, all in `layouts/_partials/`:

- `header.html`: the site title as a link to `/`, a `<nav aria-label="Primary">` that loops over `site.Menus.main` (mark the current section with `aria-current="page"`), then the theme toggle and a search link.
- `footer.html`: a copyright line and an RSS link.
- `theme-init.html` and `scripts.html`: leave empty for now; Phases 5 and 7 fill them.
- `theme-toggle.html`: leave empty until Phase 5.

**5. Create empty stylesheets** `base.css`, `layout.css` and `components.css` in `assets/css/`, so the bundle builds. Phases 4 and 6 fill them.

**Check:** run `hugo server -D --theme hearth`. The page shows your site title and the four menu links. In browser dev tools, the Network tab shows the WOFF2 files loading with status 200, and the Console has no errors.

## Phase 4: Page templates

Write one template per kind of page. Hugo picks them by name: `home.html` for the home page, `section.html` for a list such as Blog, and `page.html` for a single page. A folder named after a section overrides the default for that section only.

**1. Create placeholder content** so every template has something to render:

```text
content/
├── _index.md              # your about-me block for the home page
├── about.md               # full About / CV page
├── blog/_index.md         # title: Blog
├── projects/_index.md     # title: Work
├── projects/first.md      # one sample project
└── notes/_index.md        # title: Notes
```

**2. Home page**, `layouts/home.html`. The intro comes from `content/_index.md`, so you edit your bio as plain markdown:

```go-html-template
{{ define "main" }}
<section class="intro">
  <h1>{{ site.Title }}</h1>
  {{ .Content }}
</section>

<section class="recent">
  <h2>Recent writing</h2>
  <div class="card-grid">
    {{ range first 6 ((where site.RegularPages "Section" "blog").ByDate.Reverse) }}
      {{ partial "card.html" . }}
    {{ end }}
  </div>
  <p><a href="{{ "blog/" | relLangURL }}">All posts</a></p>
</section>
{{ end }}
```

**3. The post card**, `layouts/_partials/card.html`:

```go-html-template
<article class="card">
  {{ partial "post-meta.html" . }}
  <h3><a href="{{ .RelPermalink }}">{{ .Title }}</a></h3>
  <p>{{ with .Description }}{{ . }}{{ else }}{{ .Summary | plainify | truncate 140 }}{{ end }}</p>
</article>
```

Create `post-meta.html` beside it. It prints the date (only when `.Date` is not zero), the reading time and the tags, all in one `<p class="meta">`.

**4. Blog and Notes lists**, `layouts/section.html`:

```go-html-template
{{ define "main" }}
<header class="page-header">
  <h1>{{ .Title }}</h1>
  {{ with .Content }}<div class="lede">{{ . }}</div>{{ end }}
</header>
<ul class="post-list">
  {{ range .Pages }}
    <li>
      {{ partial "post-meta.html" . }}
      <a href="{{ .RelPermalink }}">{{ .Title }}</a>
      {{ with .Description }}<p>{{ . }}</p>{{ end }}
    </li>
  {{ end }}
</ul>
{{ end }}
```

**5. Work as a card grid**, `layouts/projects/section.html`. Each project's front matter can carry a `links` list:

```go-html-template
{{ define "main" }}
<header class="page-header"><h1>{{ .Title }}</h1>{{ with .Content }}<div class="lede">{{ . }}</div>{{ end }}</header>
<div class="card-grid">
  {{ range .Pages }}
    <article class="card">
      <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
      <p>{{ .Description }}</p>
      {{ with .Params.links }}<p class="links">{{ range . }}<a href="{{ .url }}">{{ .label }}</a> {{ end }}</p>{{ end }}
    </article>
  {{ end }}
</div>
{{ end }}
```

**6. Single pages**, `layouts/page.html`. This one serves posts, notes, projects and About:

```go-html-template
{{ define "main" }}
<article class="post">
  <header class="post-header">
    {{ partial "post-meta.html" . }}
    <h1>{{ .Title }}</h1>
    {{ with .Description }}<p class="lede">{{ . }}</p>{{ end }}
  </header>
  {{ partial "toc.html" . }}
  <div class="prose">{{ .Content }}</div>
</article>
{{ end }}
```

Create an empty `layouts/_partials/toc.html` for now; Phase 7 fills it.

**7. Tag pages.** `taxonomy.html` lists all tags; `term.html` lists the posts under one tag. Both can reuse the list markup from step 4.

**8. Layout and card styles.** Put this in `assets/css/layout.css`:

```css
body { margin: 0; background: var(--bg); color: var(--text); }
.skip-link { position: absolute; left: -9999px; }
.skip-link:focus { left: var(--space-s); top: var(--space-s); padding: 0.5rem 1rem; background: var(--surface); }

.site-header, main, .site-footer {
  max-width: 72rem; margin-inline: auto; padding-inline: var(--space-m);
}
.site-header {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: var(--space-s) var(--space-m); padding-block: var(--space-m);
}
.site-header nav ul { display: flex; gap: var(--space-m); list-style: none; margin: 0; padding: 0; }
.card-grid { display: grid; gap: var(--space-m); grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); }
.post-list { list-style: none; padding: 0; }
.intro, .page-header, .post-list { max-width: var(--measure); }
```

And in `assets/css/components.css`:

```css
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: var(--space-m);
}
.meta { font-family: var(--font-ui); font-size: var(--step--1); color: var(--muted); margin: 0 0 var(--space-xs); }
```

**Check:** the home page shows your intro and a card for each post. `/blog/` lists posts, `/projects/` shows the grid, and clicking any item opens a readable single page. Add a second post to confirm the card order is newest first.

## Phase 5: Light and dark mode

The colours already switch with the system setting, because `tokens.css` sets `color-scheme: light dark`. This phase adds a manual toggle that remembers the visitor's choice and avoids a flash of the wrong theme on page load.

**1. Apply a saved choice before the page paints.** Put this in `layouts/_partials/theme-init.html`. It runs in `<head>`, ahead of the stylesheet, so the correct theme is set before the first paint:

```html
<script>
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
</script>
```

**2. Add the button** in `layouts/_partials/theme-toggle.html`:

```html
<button id="theme-toggle" class="theme-toggle" type="button"
        aria-label="Toggle dark mode" aria-pressed="false">
  <span aria-hidden="true">◐</span>
</button>
```

**3. Add the behaviour** in `assets/js/theme.js`:

```js
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.getAttribute("data-theme") || (mq.matches ? "dark" : "light");
  }
  function sync() { btn.setAttribute("aria-pressed", String(current() === "dark")); }

  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
  mq.addEventListener("change", sync);
  sync();
})();
```

**4. Load the script** by putting this in `layouts/_partials/scripts.html`:

```go-html-template
{{ $js := resources.Get "js/theme.js" | resources.Minify | resources.Fingerprint }}
<script src="{{ $js.RelPermalink }}" integrity="{{ $js.Data.Integrity }}" defer></script>
```

**5. Style the button** by adding this to `assets/css/components.css`:

```css
.theme-toggle {
  margin-left: auto; width: 2.25rem; height: 2.25rem;
  background: none; color: var(--text); font-size: 1.1rem; cursor: pointer;
  border: 1px solid var(--border); border-radius: 999px;
}
.theme-toggle:hover { border-color: var(--accent); }
.theme-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

**Design trade-off:** once a visitor clicks the toggle, their choice overrides the system setting permanently, and the only way back to "follow the system" is clearing site storage. A three-state control (light, dark, system) fixes that at the cost of a more complex button. For a personal site I would keep the two-state version.

**Security note:** the inline script in step 1 needs `'unsafe-inline'` or a hash in `script-src` if you later add a strict Content-Security-Policy header. Add the SHA-256 hash of that exact script text instead of loosening the policy.

**Check:** test three cases. With the system set to light and then to dark, the site follows it. After clicking the toggle and reloading, the choice persists. With the page throttled to a slow connection, a hard reload shows no flash of the other theme.

## Phase 6: Long-read typography

The look of this theme comes from the typography, so this phase matters most. Four rules do most of the work: a line length of about 68 characters, a line height near 1.65, a body size of 18 to 20 pixels, and headings in a different family from the body.

**1. Write `assets/css/base.css`:**

```css
html { -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: var(--leading);
  font-optical-sizing: auto;
  font-kerning: normal;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
h1 { font-size: var(--step-4); }
h2 { font-size: var(--step-3); }
h3 { font-size: var(--step-2); }
h4 { font-size: var(--step-1); }

/* Article body: the reading column */
.prose { max-width: var(--measure); }
.prose > * + * { margin-top: 1.1em; }
.prose h2 { margin-top: 2.2em; }
.prose h3 { margin-top: 1.8em; }
.prose p { text-wrap: pretty; }
.lede { font-size: var(--step-1); color: var(--muted); max-width: var(--measure); }

a { color: var(--accent); text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
a:hover { text-decoration-thickness: 2px; }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }

blockquote {
  margin-inline: 0; padding-left: var(--space-m);
  border-left: 3px solid var(--accent); font-style: italic; color: var(--muted);
}

code, pre { font-family: var(--font-mono); font-size: 0.88em; }
:not(pre) > code { background: var(--surface); padding: 0.1em 0.35em; border-radius: 4px; }
pre {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: var(--space-s) var(--space-m);
  overflow-x: auto; line-height: 1.5;
}

img, video { max-width: 100%; height: auto; border-radius: var(--radius); }
hr { border: 0; border-top: 1px solid var(--border); margin-block: var(--space-l); }
table { border-collapse: collapse; width: 100%; font-size: var(--step--1); }
th, td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border); }
::selection { background: color-mix(in srgb, var(--accent) 30%, transparent); }

@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
```

**2. Turn on class-based code highlighting** in your site's `hugo.yaml`, so code colours can follow light and dark mode:

```yaml
markup:
  highlight:
    noClasses: false
    guessSyntax: false
```

**3. Add three code-colour tokens** to `tokens.css`, then colour the highlighter classes in `components.css`:

```css
/* tokens.css */
--code-string: light-dark(#5B6B2E, #B9C97A);
--code-func:   light-dark(#7A4B2A, #E8B88A);
--code-number: light-dark(#8A5A00, #E3B341);
```

```css
/* components.css */
.chroma .c, .chroma .c1, .chroma .cm { color: var(--muted); font-style: italic; }
.chroma .k, .chroma .kd, .chroma .kn, .chroma .kr { color: var(--accent); }
.chroma .s, .chroma .s1, .chroma .s2 { color: var(--code-string); }
.chroma .nf, .chroma .nx { color: var(--code-func); }
.chroma .m, .chroma .mi, .chroma .mf { color: var(--code-number); }
```

`text-wrap: balance` and `pretty` are progressive enhancements: browsers that lack them simply wrap normally.

**Check:** open a post of 1,500 words or more on a phone-width window and on a wide desktop. Lines stay between roughly 60 and 75 characters, headings wrap evenly, code blocks scroll sideways without scrolling the page, and nothing overflows horizontally.

## Phase 7: Features

Add four features, each in its own small file so you can remove one without touching the others: a table of contents, search, code-copy buttons and Mermaid diagrams. Start by merging these settings into your site's `hugo.yaml`:

```yaml
outputs:
  home: [html, rss, json]   # json builds the search index
markup:
  tableOfContents:
    startLevel: 2
    endLevel: 3
  highlight:
    noClasses: false
    guessSyntax: false
```

### 7a. Table of contents

Fill `layouts/_partials/toc.html`. It shows only when a page has at least two top-level headings, and a page can opt out with `toc: false` in its front matter:

```go-html-template
{{ if and (ne .Params.toc false) (gt (len .Fragments.Headings) 1) }}
<nav class="toc" aria-label="On this page">
  <h2 class="toc-title">On this page</h2>
  {{ .TableOfContents }}
</nav>
{{ end }}
```

Add this to `layout.css`. On wide screens the contents sit in a sticky right-hand column; on narrow screens they are hidden, which keeps phones focused on the text:

```css
.post { display: grid; grid-template-columns: minmax(0, var(--measure)); justify-content: start; }
.post-header { grid-column: 1 / -1; }
.toc { display: none; }
@media (min-width: 72rem) {
  .post { grid-template-columns: minmax(0, var(--measure)) 15rem; column-gap: var(--space-l); }
  .prose { grid-column: 1; grid-row: 2; }
  .toc { display: block; grid-column: 2; grid-row: 2; align-self: start; position: sticky; top: var(--space-m); font-size: var(--step--1); }
  .toc ul { list-style: none; padding-left: 0; }
  .toc ul ul { padding-left: var(--space-s); }
}
```

### 7b. Search

Search runs entirely in the browser against a JSON file Hugo builds. The index is only downloaded when a visitor first clicks the search box.

1. Create `layouts/home.json`:

   ```go-html-template
   {{- $out := slice -}}
   {{- range where site.RegularPages "Section" "in" (slice "blog" "notes" "projects") -}}
     {{- $out = $out | append (dict
       "title" .Title
       "url" .RelPermalink
       "summary" (.Summary | plainify | truncate 200)
       "content" (.Plain | truncate 4000)) -}}
   {{- end -}}
   {{- $out | jsonify -}}
   ```
2. Replace the old `content/search.md` with:

   ```yaml
   ---
   title: Search
   type: search
   ---
   ```
3. Create `layouts/search/page.html`:

   ```go-html-template
   {{ define "main" }}
   <header class="page-header"><h1>{{ .Title }}</h1></header>
   <input id="search-input" type="search" autocomplete="off"
          placeholder="Search posts, notes and projects" aria-label="Search">
   <ul id="search-results" class="post-list" aria-live="polite"></ul>
   {{ end }}
   ```
4. Create `assets/js/search.js`. It builds results with `textContent` and DOM nodes, never `innerHTML`, so content in the index can never inject markup:

   ```js
   (function () {
     var input = document.getElementById("search-input");
     var out = document.getElementById("search-results");
     if (!input || !out) return;
     var index = null, loading = null;
   
     function load() {
       if (!loading) {
         loading = fetch("/index.json")
           .then(function (r) { return r.json(); })
           .then(function (d) { index = d; });
       }
       return loading;
     }
   
     function score(doc, terms) {
       var title = doc.title.toLowerCase();
       var body = (doc.summary + " " + doc.content).toLowerCase();
       var s = 0;
       for (var i = 0; i < terms.length; i++) {
         var inTitle = title.indexOf(terms[i]) !== -1;
         var inBody = body.indexOf(terms[i]) !== -1;
         if (!inTitle && !inBody) return 0;
         s += (inTitle ? 10 : 0) + (inBody ? 1 : 0);
       }
       return s;
     }
   
     function render(docs) {
       out.textContent = "";
       if (!docs.length) {
         var none = document.createElement("li");
         none.textContent = "No results.";
         out.appendChild(none);
         return;
       }
       docs.forEach(function (doc) {
         var li = document.createElement("li");
         var a = document.createElement("a");
         a.href = doc.url; a.textContent = doc.title;
         var p = document.createElement("p");
         p.textContent = doc.summary;
         li.appendChild(a); li.appendChild(p); out.appendChild(li);
       });
     }
   
     input.addEventListener("focus", load);
     input.addEventListener("input", function () {
       var q = input.value.trim().toLowerCase();
       if (q.length < 2) { out.textContent = ""; return; }
       load().then(function () {
         var terms = q.split(/\s+/);
         var hits = index
           .map(function (d) { return { d: d, s: score(d, terms) }; })
           .filter(function (x) { return x.s > 0; })
           .sort(function (a, b) { return b.s - a.s; })
           .slice(0, 10)
           .map(function (x) { return x.d; });
         render(hits);
       });
     });
   })();
   ```

This simple matcher suits a personal site. If the index grows past a few hundred pages, replace it with a dedicated library; the template and page stay the same.

### 7c. Code-copy buttons

Create `assets/js/copy.js`:

```js
(function () {
  document.querySelectorAll(".prose pre").forEach(function (pre) {
    var wrap = document.createElement("div");
    wrap.className = "code-block";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      });
    });
    wrap.appendChild(btn);
  });
})();
```

### 7d. Mermaid diagrams

1. Create the render hook `layouts/_markup/render-codeblock-mermaid.html`:

   ```go-html-template
   <pre class="mermaid">{{ .Inner | safeHTML }}</pre>
   {{ .Page.Store.Set "hasMermaid" true }}
   ```
2. Download Mermaid's single-file build once and commit it, so your deploy never depends on a third-party CDN. Save `https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js` as `themes/hearth/static/js/mermaid.min.js`.
3. Add this to the end of `layouts/_partials/scripts.html`. The library loads only on pages that contain a diagram:

   ```go-html-template
   {{ if .Store.Get "hasMermaid" }}
   <script src="{{ "js/mermaid.min.js" | relURL }}"></script>
   <script>
     (function () {
       var forced = document.documentElement.getAttribute("data-theme");
       var dark = forced ? forced === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
       mermaid.initialize({ startOnLoad: true, theme: dark ? "dark" : "neutral" });
     })();
   </script>
   {{ end }}
   ```

Diagrams pick the theme when the page loads, so after toggling modes a visitor must reload to see them recoloured. That is an acceptable limit for a personal site.

### 7e. Wire up the scripts and styles

Replace `scripts.html` with a version that bundles all three site scripts (keep the Mermaid block from step 7d at the end):

```go-html-template
{{ $parts := slice }}
{{ range slice "js/theme.js" "js/copy.js" "js/search.js" }}
  {{ with resources.Get . }}{{ $parts = $parts | append . }}{{ end }}
{{ end }}
{{ $js := $parts | resources.Concat "js/hearth.js" | resources.Minify | resources.Fingerprint }}
<script src="{{ $js.RelPermalink }}" integrity="{{ $js.Data.Integrity }}" defer></script>
```

Add the styles to `components.css`:

```css
.code-block { position: relative; }
.copy-btn {
  position: absolute; top: 0.5rem; right: 0.5rem;
  font: var(--step--1) var(--font-ui); color: var(--muted);
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 4px; padding: 0.15rem 0.5rem; cursor: pointer;
}
.copy-btn:hover { color: var(--accent); border-color: var(--accent); }
#search-input {
  width: 100%; max-width: var(--measure); padding: 0.6rem 0.8rem;
  font: var(--step-0) var(--font-body); color: var(--text);
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
}
.mermaid { background: transparent; }
```

Finally, add a search link to the header partial, pointing at `/search/`.

**Check:** a long post shows the sticky contents column on a wide window. Typing in `/search/` returns matching posts. Every code block has a working Copy button, and a post with a fenced `mermaid` block draws its diagram, while a post without one never requests `mermaid.min.js` (confirm in the Network tab).

## Phase 8: Content structure and archetypes

Give each section an archetype, a starter file that `hugo new content` copies, so every new entry begins with the front matter your templates expect. Create these in `themes/hearth/archetypes/`; Hugo picks the one named after the section.

`blog.md` and `notes.md`:

```yaml
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
---
```

`projects.md`:

```yaml
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
tags: []
links:
  - label: Source
    url: ""
---
```

Create entries with:

```bash
hugo new content blog/my-first-essay.md
hugo new content notes/a-quick-thing.md
hugo new content projects/my-tool.md
```

**Front matter the theme reads**

| Field | Used by | Notes |
| --- | --- | --- |
| `title` | All pages | Required |
| `date` | Blog, Notes | Sets list order and the date shown |
| `description` | Cards, lists, search, `<meta>` tag | One sentence; falls back to the site description |
| `tags` | Blog, Notes | Builds the tag pages |
| `draft` | Build | Drafts are skipped unless you pass `-D` |
| `toc` | Single pages | Set `false` to hide the table of contents |
| `links` | Projects | List of `label` and `url` pairs shown on the card |
| `weight` | Projects | Lower numbers list first; overrides date order |

Your intro text lives in `content/_index.md` and the About page in `content/about.md`. For a CV, put the PDF in `static/` (for example `static/cv.pdf`) and link to `/cv.pdf` from the About page.

Old PaperMod fields such as `ShowToc`, `cover` and `searchHidden` are harmless; the new theme ignores them, and you can delete them when convenient.

**Check:** run the three `hugo new content` commands above. Each file opens with the right fields, and after you set `draft: false` and add a `links` entry, the project card shows its link.

## Phase 9: Testing and quality checks

Run every row of this table before you switch the live site over. Do the visual checks on a real phone as well as a resized desktop window, because that is where reading comfort shows up.

| Area | How to test | Pass when |
| --- | --- | --- |
| Build | Run `hugo --gc --minify` locally | Exits cleanly; `public/index.json` and `public/index.xml` exist |
| Contrast | Check text, muted text, accent and code colours against `--bg` with WebAIM or dev tools, in both modes | Every pair is at least 4.5:1 |
| Responsive | View at 360, 768 and 1280 pixels wide | No horizontal page scroll; cards reflow; the menu stays usable |
| Keyboard | Tab through a page without a mouse | Skip link, menu, toggle, search box and Copy buttons all show a visible focus ring |
| Zoom | Set browser text size to 200% | Layout holds and nothing is clipped |
| Theme | System light, system dark, then a manual toggle and reload | Correct theme each time; no flash on reload |
| Features | Open a long post, a code post, a Mermaid post and `/search/` | Contents column, Copy button, diagram and search results all work |
| Links | Click through the menu and a few posts; optionally run a link checker such as lychee on `public/` | No 404s |
| Audit | Run Lighthouse on the home page and one post | I would aim for 95 or higher on Performance, Accessibility, Best Practices and SEO; treat these as my targets, not a standard |

Fix problems at the lowest level that causes them: a colour problem belongs in `tokens.css`, not in a one-off override, so the fix applies everywhere.

**Check:** every row passes, and a 1,500-word post is comfortable to read start to finish on your phone.

## Phase 10: Switch over and deploy

Do the cutover on a Git branch, so the live site stays on the old theme until you have seen the new one running on Cloudflare. Rolling back is then a single revert.

1. Create a branch:

   ```bash
   git switch -c new-theme
   ```
2. In your site's `hugo.yaml`, change `theme: PaperMod` to `theme: hearth`. Delete the old PaperMod-only settings: the singular `menu:` block and the PaperMod `params` such as `ShowReadingTime`, `homeInfoParams` and `socialIcons`. Keep `params.description`, which the new `head.html` reads. Make sure `baseURL` is your real address with a trailing slash.
3. Delete the PaperMod-specific page `content/archives.md`. The new `content/search.md` from Phase 7b replaces the old one.
4. Add a 404 page, `layouts/404.html`:

   ```go-html-template
   {{ define "main" }}
   <h1>Page not found</h1>
   <p><a href="{{ "/" | relURL }}">Back to the home page</a></p>
   {{ end }}
   ```

   To have Cloudflare serve it for unknown paths, add `"not_found_handling": "404-page"` inside the `assets` block of `wrangler.jsonc`. Check the option name against Cloudflare's static-assets documentation, since it is the one setting here I did not verify.
5. Remove the old theme submodule completely:

   ```bash
   git submodule deinit -f -- themes/PaperMod
   rm -rf .git/modules/themes/PaperMod
   git rm -f themes/PaperMod
   ```

   Your Cloudflare build no longer needs submodule support, because `themes/hearth` is now ordinary files in your repository.
6. Run a full local build and inspect it:

   ```bash
   hugo --gc --minify
   hugo server -D
   ```
7. Commit and push the branch:

   ```bash
   git add -A
   git commit -m "Replace PaperMod with custom hearth theme"
   git push -u origin new-theme
   ```
8. Open the preview build Cloudflare creates for the branch (your project keeps preview builds on) and run the Phase 9 checks against that address.
9. When it passes, merge the branch into `main`. Cloudflare rebuilds the live site with the build command from `wrangler.jsonc` (`hugo --gc --minify`) and the `HUGO_VERSION` variable you already set.

If you had already published URLs under `/posts/`, add `aliases: ["/posts/old-slug/"]` to each moved post's front matter so Hugo writes redirects from the old addresses.

**Check:** the live site shows the new theme at your custom domain. `/index.xml` loads, search works, the toggle remembers its setting, and an invalid address shows your 404 page.

**Rollback:** if something breaks, revert the change and push, and Cloudflare rebuilds the previous version. If you merged with a merge commit, run `git revert -m 1 <merge-commit-hash>`. If the branch was fast-forwarded, revert its commits instead.

## Troubleshooting and quick reference

Most failures in this build come from a handful of causes, listed here by symptom.

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Pages render blank or Hugo reports a missing template | Old template names or folders (`index.html`, `_default/`, `partials/`) | Use `home.html`, `page.html`, `section.html` and `_partials/`; needs Hugo 0.146 or newer |
| No styling at all | A CSS file listed in `head.html` does not exist; the `with` block skips it silently | Create every listed file, even empty ones |
| Fonts fall back to Georgia | WOFF2 filenames differ from `fonts.css`, or files are not in `static/fonts/` | Match the names exactly; check the Network tab for 404s |
| Colours missing or wrong in an old browser | `light-dark()` is unsupported | Update the browser, or add a `prefers-color-scheme` fallback |
| `hugo new content` ignores the theme's archetype | The site's own `archetypes/` folder takes precedence | Copy the theme archetypes into the site's `archetypes/` folder |
| Search finds nothing, or `/index.json` is a 404 | `outputs.home` lacks `json`, or `layouts/home.json` is missing | Add both, then rebuild |
| No table of contents | Fewer than two top-level headings, or `toc: false` | Add headings, or remove the flag |
| Mermaid block shows as plain text | Fence language is not exactly `mermaid`, or `mermaid.min.js` is missing from `static/js/` | Fix the fence or add the file |
| Copy button does nothing | The clipboard API needs HTTPS or `localhost` | Test on the deployed site or `hugo server` |
| Menu is empty | Config uses `menu:` instead of `menus:`, or `pageRef` points at a section with no content | Use `menus:` and create each section's `_index.md` |
| Cloudflare build fails at install | `HUGO_VERSION` includes extra text, is a runtime variable, or is below 0.146.0 | Use a bare number such as `0.168.0`, set as a build variable |

**Final theme layout, for reference**

```text
themes/hearth/
├── archetypes/        blog.md  notes.md  projects.md
├── assets/
│   ├── css/           tokens.css  fonts.css  base.css  layout.css  components.css
│   └── js/            theme.js  copy.js  search.js
├── layouts/
│   ├── _markup/       render-codeblock-mermaid.html
│   ├── _partials/     head  header  footer  scripts  theme-init  theme-toggle
│   │                  toc  card  post-meta  (.html)
│   ├── projects/      section.html
│   ├── search/        page.html
│   └── 404  baseof  home  page  section  taxonomy  term  (.html)  +  home.json
└── static/
    ├── fonts/         four .woff2 files
    └── js/            mermaid.min.js
```

**Upkeep:** upgrade Hugo on purpose, not by accident. When you do, change your local version and the `HUGO_VERSION` build variable together, and run `hugo --gc --minify` locally first.
