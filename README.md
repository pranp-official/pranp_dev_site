# pranp.dev

The personal publication and engineering notebook of **Pranav** ([pranp.dev](https://www.pranp.dev/)), covering cloud infrastructure security, identity systems (IAM), ephemeral credentials, and zero-trust systems.

Powered by [Hugo](https://gohugo.io/) and rendered through a bespoke custom theme: **Hearth** (`themes/hearth/`).

---

## The Hearth Theme: Inspiration & Design Philosophy

Most modern engineering sites look and feel like SaaS dashboards: stark `#FFFFFF` backgrounds, neon blue links, generic sans-serif typefaces (Inter, Roboto), and harsh `#000000` AMOLED dark modes that cause intense eye fatigue.

**Hearth** was created as a deliberate counter-movement to this trend. It is inspired by **printed literary quarterlies, classical book typography, and physical editorial publications**.

### 1. Why It Looks This Way: Built for Deep Reading
Security architecture, distributed systems design, and cryptographic protocol essays are not quick tweets or API reference sheets—they are long, dense, conceptual essays that require focus.

Hearth was built around the experience of **reading a physical printed book by the fireside**:
* **Calm, Grounded Atmosphere**: No distracting animations, glowing drop shadows, noisy gradients, or ornamental textures.
* **Respect for the Reader's Eyes**: Zero pure white (`#FFF`) and zero pure black (`#000`). Contrast is calibrated for soft, prolonged readability without eye strain.
* **Warmth Over Cold Utilitarianism**: Rather than feeling like a sterile code repository, it feels like an author's private reading study.

---

## Visual Anatomy & Aesthetics

### The "Warm Paper" Palette
The color system reflects natural materials: aged paper, roasted ink, warm stone, and terracotta clay.

| Element | Light Mode ("Warm Paper") | Dark Mode ("Charred Hearth") | Intent & Contrast |
| :--- | :--- | :--- | :--- |
| **Background (`--bg`)** | `#FAF6EE` *(Warm Parchment)* | `#1C1815` *(Charred Ink)* | Soft, low-strain canvas; avoids blinding white or void black. |
| **Surface (`--surface`)** | `#F3ECDF` *(Card & Badge)* | `#25201C` *(Card & Badge)* | Subtle depth step for cards and code blocks. |
| **Primary Text (`--text`)** | `#2B2118` *(Deep Roasted Ink)* | `#EDE4D3` *(Warm Cream)* | High-contrast, tactile reading ink (14.6:1 light / 14.0:1 dark). |
| **Muted Meta (`--muted`)** | `#6B5B4E` *(Warm Umber)* | `#B3A594` *(Soft Sand)* | Dates, reading times, and secondary metadata (6.0:1 light / 7.3:1 dark). |
| **Accent & Links (`--accent`)** | `#A3472B` *(Terracotta)* | `#E0875F` *(Soft Ember)* | Earthy red-orange warmth with guaranteed WCAG AA/AAA legibility (5.6:1 light / 6.5:1 dark). |
| **Borders (`--border`)** | `#E2D8C6` *(Stone Gray)* | `#3A332C` *(Deep Umber)* | Whisper-soft dividers that organize without visual clutter. |

### The Dual-Serif Typographic System
The core voice of Hearth is carried entirely by its typefaces:

* **Display Headings: *Fraunces Variable***  
  An old-style humanist serif full of organic warmth, soft curves, and distinctive teardrop terminals. It gives titles an authorial, bookish presence that immediately sets the tone.
* **Body Text: *Literata Variable***  
  Originally commissioned by Google Books specifically for long-form reading on digital displays. Literata features generous x-heights, open counters, and horizontal flow that makes multi-page architectural essays comfortable to read.
* **Code Blocks: *JetBrains Mono***  
  A clean, utilitarian monospaced face designed for developer legibility. It ensures IAM JSON policies, Go code blocks, and terminal commands are unmistakably distinct.

### Classical Editorial Reading Geometry
Layout rules follow classical book design principles (drawing from Robert Bringhurst's *The Elements of Typographic Style*):
* **The Golden Measure (`--measure: 68ch`)**: Article line lengths are locked to ~65–70 characters per line. Lines that are too long tire the eye; lines that are too short break reading cadence.
* **Generous Leading (`--leading: 1.65`)**: Vertical line spacing is spaced generously to allow the eye to track effortlessly between paragraphs.
* **Modern Optical Polish**: Headings use CSS `text-wrap: balance` to eliminate awkward orphaned words, while paragraphs use `text-wrap: pretty` for clean, professional typographic rag.
* **Fluid `clamp()` Scale**: Typography scales smoothly between mobile phones and 4K desktop screens without jagged media-query jumps.

---

## Repository Structure

```text
pranp_dev_site/
├── hugo.yaml                            # Site configuration (menus, outputs, markup)
├── wrangler.jsonc                       # Cloudflare Workers / Pages deployment config
├── archetypes/                          # Frontmatter templates (blog, notes, projects)
├── content/                             # Markdown source content
│   ├── _index.md                        # Homepage hero and bio
│   ├── about.md                         # Author biography
│   ├── search.md                        # Client-side search endpoint
│   ├── blog/                            # Long-form architectural essays
│   ├── notes/                           # Technical cheat sheets and field notes
│   └── projects/                        # Engineering projects and open-source tooling
├── static/                              # Static root assets (favicons, manifest)
├── themes/hearth/                       # The Hearth Theme
│   ├── layouts/                         # Semantic Hugo HTML templates
│   │   ├── baseof.html                  # Semantic base shell with skip-to-content
│   │   ├── home.html                    # Homepage layout (bio + recent cards)
│   │   ├── page.html                    # Single essay layout with sticky TOC
│   │   ├── section.html                 # Chronological list layout
│   │   ├── home.json                    # Search index generator
│   │   ├── _markup/                     # Markdown render hooks (Mermaid)
│   │   └── _partials/                   # Modular components (header, footer, meta, TOC)
│   ├── assets/                          # Hugo Pipes asset pipeline (concatenated & fingerprinted)
│   │   ├── css/                         # Design tokens, fonts, base, layout, components
│   │   └── js/                          # Theme toggling, copy buttons, search engine
│   └── static/                          # Self-hosted variable WOFF2 fonts and favicons
└── public/                              # Production build output
```

---

## Local Development & Authoring

### Prerequisites
* [Hugo Extended](https://gohugo.io/installation/) `v0.146.0` or newer.

### Development Server
```bash
hugo server -D
```
Open `http://localhost:1313/` in your browser.

### Authoring New Content
```bash
# New long-form architectural essay
hugo new content blog/my-essay.md

# New technical note or cheat sheet
hugo new content notes/aws-iam-federation.md

# New portfolio project
hugo new content projects/cloud-sentinel.md
```

### Production Build & Edge Deployment
```bash
hugo --gc --minify
```
Deployed on **Cloudflare Workers / Pages** via `wrangler.jsonc` with `"not_found_handling": "404-page"`.

---

## License & Colophon

* **Content & Writings**: © 2026 Pranav. All rights reserved.
* **Theme Code**: Open-source under the MIT License.
* **Typefaces**: [Fraunces](https://github.com/undercasetype/fraunces), [Literata](https://github.com/googlefonts/literata), and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) licensed under the SIL Open Font License.
