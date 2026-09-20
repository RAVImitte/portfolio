# Ravi Shankar Mitte — portfolio

Decision-led engineering portfolio. Two role editions (`/backend`, `/android`) share one
codebase: each has its own hero, curated work, copy and résumé.

React 19 + TypeScript, built with Vite. No CSS framework, no animation library.

## Requirements

Node `^20.19.0` or `>=22.12.0` (Vite 8). Check with `node -v`.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:5173> — it redirects to `/backend`.

| URL | What it is |
| --- | --- |
| `/backend` | Backend edition |
| `/android` | Android edition |
| `/backend?design` | Adds the temporary design switchboard, bottom-left |

## Production build

```bash
npm run build     # type-checks, then outputs to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

`npm run build` runs `tsc -b` first, so a type error fails the build.

### Canonical URL

`canonical` and `og:url` are stamped at build time. Resolution order:

1. `VITE_SITE_ORIGIN` — set this explicitly once a domain is live
2. Vercel / Netlify build variables, picked up automatically
3. `http://localhost:5173`

```bash
VITE_SITE_ORIGIN=https://example.com npm run build
```

### SEO

Each build emits `sitemap.xml` and `robots.txt` (from `vite.config.ts`, listing every
`/backend` and `/android` route) stamped with the same origin as `canonical`/`og:url`.
Social previews use `public/og-backend.png` / `public/og-android.png` — regenerate them
with `python docs/gen_og_cards.py` if the hero copy changes. `index.html` also carries
a static `Person` JSON-LD block for search engines.

## Deploy

Static output in `dist/`. `vercel.json` and `netlify.toml` are both committed, each
with the SPA rewrite that deep links need — without it, `/backend/work/living-labs`
404s on a hard refresh.

```bash
npx vercel --prod          # or
npx netlify deploy --prod
```

## Layout

```
src/
  components/   case studies, schematics, per-project signature diagrams
  data/         all copy and project content — edit here, not in components
  design/       ambient + live background layers, design switchboard
  motion/       pointer treatment, parallax, view transitions
  theme/        light/dark toggle
  pages/        routes
  styles.css        base system and tokens
  styles-depth.css  depth, live layers, theme toggle, transitions
```

Content lives in `src/data/`. Copy changes rarely need a component change.

## Accessibility and motion

Pointer treatment, parallax and the live background all disable themselves for
coarse pointers and `prefers-reduced-motion`. The chosen design ships as
attributes on `<html>`, so the page renders correctly with no JavaScript.
