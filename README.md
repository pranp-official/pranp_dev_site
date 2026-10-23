# pranp.dev

The personal engineering publication and portfolio of **Pranav** ([pranp.dev](https://www.pranp.dev/)), focusing on cloud security architecture, identity systems (IAM), zero-trust engineering, and distributed systems.

Built with [Hugo](https://gohugo.io/) and powered by a bespoke, high-performance custom theme: **Hearth** (`themes/hearth/`).

---

## The Hearth Theme: Architectural Innovations

**Hearth** is a custom Hugo theme designed from the ground up as a rejection of modern web bloat. It requires **no Tailwind, no Node.js/npm dependencies, and no JavaScript framework runtime**. Every feature is implemented using native W3C web standards and Hugo's native asset pipeline (Hugo Pipes).

### 1. Zero-Dependency Vanilla Modernism
* **Build Time**: Compiles the entire 50+ page site and fingerprinted asset bundles in **~14 milliseconds**.
* **Zero Dependency Rot**: No `package.json`, no `node_modules`, and no webpack/Vite configuration that breaks across major updates. A single `hugo` binary is the only build dependency.
* **Asset Pipeline**: CSS and JS are concatenated, minified, and fingerprinted using cryptographic Subresource Integrity (SRI) hashes directly within Hugo Pipes.

### 2. Modern Native Color Theming (`light-dark()`)
* **Standard-Based Color Switching**: Hearth does not duplicate CSS rules under bulky `.dark-mode` selectors. It leverages the modern CSS `light-dark()` function directly on `:root`:
  ```css
  :root {
    color-scheme: light dark;
    --bg:      light-dark(#FAF6EE, #1C1815);
    --surface: light-dark(#F3ECDF, #25201C);
    --text:    light-dark(#2B2118, #EDE4D3);
    --muted:   light-dark(#6B5B4E, #B3A594);
    --accent:  light-dark(#A3472B, #E0875F);
  }
  :root[data-theme="light"] { color-scheme: light; }
  :root[data-theme="dark"]  { color-scheme: dark; }
  ```
* **Instant Cascade**: Toggling themes simply updates the `:root[data-theme]` attribute, allowing the browser's rendering engine to re-evaluate all variables natively.
* **WCAG 2.1 AA/AAA Contrast**: All palette pairings maintain strict contrast ratios (from 5.4:1 to 14.6:1) against both light warm parchment and deep dark ink backgrounds.

### 3. Elimination of Flash of Unstyled Content (FOUC)
* A synchronous, microscopic inline script (`theme-init.html`) executes in `<head>` before the DOM renders. It evaluates `localStorage` and system `prefers-color-scheme` preferences, setting the appropriate theme attribute immediately and preventing jarring page flashes.

### 4. Classical Long-Form Editorial Typography
* **Type Hierarchy**:
  * **Headings**: *Fraunces Variable* (a humanist, warm display serif with soft old-style character).
  * **Body Copy**: *Literata Variable* (commissioned specifically for comfortable, extended screen reading).
  * **Code**: *JetBrains Mono* (engineered for legibility and symbol distinction).
* **Self-Hosted & Preloaded**: All fonts are delivered as local `.woff2` variable font files (~36 KB – 111 KB) with `<link rel="preload">` tags in `<head>`, eliminating external CDN connections (e.g., Google Fonts) and preventing layout shifts (CLS).
* **Typographic Rhythm**:
  * Fluid scaling via CSS `clamp()` (`--step--1` to `--step-4`).
  * Enforced measure: `--measure: 68ch` (optimal line length) and line height `--leading: 1.65`.
  * `text-wrap: balance` on headings to avoid typographic orphans.
  * `text-wrap: pretty` on body copy for polished paragraph breaks.

### 5. Built-in Privacy & Performance Features
* **Dynamic Cryptographic Favicon Suite**: An adaptive SVG favicon featuring a serif **"P"** with an embedded **keyhole counter** (representing Identity & Access Management). Using `@media (prefers-color-scheme: dark)`, the tab icon changes color dynamically when the browser switches themes. Fallback multi-resolution PNGs and `.ico` are generated with sub-pixel anti-aliasing.
* **Defensive Client-Side Search**: Client-side full-text search reads `/index.json`, dynamically loaded only when the search input receives focus. All DOM updates are built using `textContent` and `document.createElement`, providing complete immunity against DOM-based XSS attacks.
* **Smart Conditional Mermaid Runtime**: Mermaid diagram support (`render-codeblock-mermaid.html`) flags Hugo's page store. The ~3 MB Mermaid runtime script is **only loaded** on pages containing actual diagrams.
* **Accessible Code Copy**: Pure vanilla JavaScript clipboard utility attached to `.prose pre` blocks with keyboard accessibility and ARIA status updates.
* **Sticky Table of Contents**: Automatically calculates heading depth; renders a desktop-sticky 2-column TOC only when an article contains more than one heading.

---

## Directory Structure

The repository maintains a strict separation of concerns between site-specific content/configuration and the reusable theme engine:

```text
pranp_dev_site/
├── hugo.yaml                            # Site configuration (menus, output formats, metadata)
├── wrangler.jsonc                       # Cloudflare Workers / Pages deployment manifest
├── archetypes/                          # Frontmatter content blueprints (blog, notes, projects)
├── content/                             # Markdown content sources
│   ├── _index.md                        # Homepage hero and bio
│   ├── about.md                         # Author biography and background
│   ├── search.md                        # Search page endpoint
│   ├── blog/                            # Long-form essays and architectural blueprints
│   ├── notes/                           # Technical cheat sheets and reference notes
│   └── projects/                        # Engineering projects and open-source tooling
├── static/                              # Site-level static assets (favicons, manifest)
├── themes/hearth/                       # The Hearth Theme
│   ├── layouts/                         # Semantic Hugo templates
│   │   ├── baseof.html                  # Base HTML shell with skip-links
│   │   ├── home.html                    # Homepage layout
│   │   ├── page.html                    # Single post layout
│   │   ├── section.html                 # Chronological list layout
│   │   ├── home.json                    # Search index builder
│   │   ├── _markup/                     # Markdown render hooks (Mermaid)
│   │   └── _partials/                   # Modular components (header, footer, TOC, scripts)
│   ├── assets/                          # Processed through Hugo Pipes
│   │   ├── css/                         # Design tokens, fonts, base, layout, components
│   │   └── js/                          # Theme toggling, code copy, search engine
│   └── static/                          # Self-hosted variable WOFF2 fonts and favicons
└── public/                              # Production build output (generated by Hugo)
```

---

## Getting Started

### Prerequisites
* [Hugo Extended](https://gohugo.io/installation/) version `v0.146.0` or newer (tested with `v0.168.0 extended`).

### Local Development
To launch the local development server with live reload and draft previewing:

```bash
hugo server -D
```

Open your browser to `http://localhost:1313/`.

### Creating Content

Content creation uses predefined archetypes to enforce structured frontmatter:

```bash
# New blog essay
hugo new content blog/my-new-post.md

# New technical note
hugo new content notes/iam-policy-pattern.md

# New portfolio project
hugo new content projects/my-tool.md
```

---

## Building & Deployment

### Production Build
To generate a production-ready static build with minification and cache-busting fingerprinting:

```bash
hugo --gc --minify
```

Static files are output to `./public/`.

### Edge Deployment (Cloudflare Workers / Pages)
The site is pre-configured for Cloudflare Static Assets via [`wrangler.jsonc`](wrangler.jsonc):

```jsonc
{
  "name": "my-blog",
  "compatibility_date": "2026-10-18",
  "build": {
    "command": "hugo --gc --minify"
  },
  "assets": {
    "directory": "./public",
    "not_found_handling": "404-page"
  }
}
```

Ensure your Cloudflare environment variable `HUGO_VERSION` matches your local version (e.g., `0.168.0`).

---

## License & Colophon

* **Content & Writings**: © 2026 Pranav. All rights reserved.
* **Theme Code**: Open-source under the MIT License.
* **Typefaces**: [Fraunces](https://github.com/undercasetype/fraunces), [Literata](https://github.com/googlefonts/literata), and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) are licensed under the SIL Open Font License (OFL).
