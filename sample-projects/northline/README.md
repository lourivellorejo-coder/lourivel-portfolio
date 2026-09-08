# Northline small-business website sample

Prepared for Lourivel Lorejo’s portfolio and a small-business WordPress website bid. This is a fictional concept project.

**Live design preview:** https://lourivellorejo-coder.github.io/lourivel-portfolio/samples/northline/

## Contents

- `dist/`: four static pages for GitHub Pages, plus local assets.
- `theme/northline/`: matching installable classic WordPress theme.
- `source/content.mjs`: shared page content.
- `source/site.css`, `source/site.js`: shared responsive styling and interactions.
- `source/build.mjs`: generates the preview and theme content/assets.
- `source/verify.py`: checks routes, anchors, assets, and theme structure.

The public preview demonstrates the design; it is not a running WordPress installation. The contact form only validates example entries and shows a local preview. It does not send or store messages.

## WordPress setup

Download `Northline-WordPress-Theme.zip`, install under Appearance → Themes → Add New → Upload Theme, and activate it. Then open Appearance → Northline sample setup and click Create the four sample pages. Use a fresh demo installation. Full instructions are included in the theme README.

## Build

The generator uses Node.js and the `sharp` image encoder. Set `NORTHLINE_IMAGE_SOURCE` to your local source photograph or place it in `source/workspace-original.png`, then run `node source/build.mjs`. Run `python3 source/verify.py` and `node --check source/site.js` for the local structural checks.

Code license: GPL-2.0-or-later. The included office image is AI-generated for this fictional concept. No real business, client engagement, testimonials, or performance claims are represented.
