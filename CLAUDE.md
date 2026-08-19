# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website / "public notes" of Vinicius Esposito, built with **Hugo** (extended, v0.141.0 in CI) using the **xmin** theme. Deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Commands

- `hugo server` — local dev server with live reload at http://localhost:1313 (use `-D` to include drafts).
- `hugo` — build the site into `public/`.
- `hugo --gc --minify` — production-style build (mirrors CI).
- `hugo new content/notes/<slug>.md` — scaffold a new note using `archetypes/default.md` (pre-fills date, title, and `math = true`).

There is no test suite, linter, or Node build step (the CI `npm ci` step is a no-op — there is no `package.json`).

## Architecture

- **Content** lives in `content/`. The homepage is `content/_index.md`; notes are individual Markdown files in `content/notes/` and are surfaced under the `/notes/` menu section. Front matter is TOML (`+++` fenced).
- **Theme** is `themes/xmin/` (vendored, not a git submodule). Do not edit theme files directly to customize — override by placing files of the same path under the top-level `layouts/`, `static/`, `assets/`, or `i18n/`. Existing overrides:
  - `layouts/partials/foot_custom.html` — injects KaTeX + helper scripts for math rendering.
  - `layouts/shortcodes/details.html` — `{{</* details title="..." */>}}` collapsible block shortcode.
  - `layouts/_default/rss.xml` — custom RSS feed template.
- **Math**: enabled site-wide via `[params] math = true` in `hugo.toml`, and per-page via `[params] math = true` in front matter. Goldmark's passthrough extension is configured so `\(...\)` renders inline and `$$...$$` / `\[...\]` render as display math (see `hugo.toml [markup.goldmark]`). KaTeX loads client-side from `foot_custom.html`.
- **Static assets** (images referenced by notes) live in `static/` and are served from the site root.

## Deployment

`.github/workflows/hugo.yaml` builds with Hugo extended + Dart Sass and deploys `public/` to GitHub Pages. Note the workflow overrides `--baseURL` with the Pages URL, so the `baseURL` in `hugo.toml` is not authoritative for production.

**`public/` is committed to the repo** even though CI regenerates it. If you change content or layouts, regenerate `public/` (`hugo`) and commit it alongside your source changes to keep the tracked build output in sync.
