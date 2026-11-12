# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (React Router dev with HMR)
- **Build**: `npm run build` (React Router production build via Vite)
- **Start**: `npm run start` (runs `react-router-serve ./build/server/index.js`)
- **Typecheck**: `npm run typecheck` (runs `react-router typegen && tsc`)
- **Gallery photos**: `npm run photos` resizes originals in `./photos` (gitignored) to WebP in `public/assets/gallery/` and updates `app/data/gallery-manifest.json`; captions, order and ground-line values live in `app/data/gallery.ts`

No test runner or linter is configured.

## Architecture

React Router v7 full-stack SSR application — a single-page marketing site for a well drilling company (huskydrilling.com). React 19, Vite 7, Tailwind CSS v4, TypeScript strict mode.

**SSR is enabled** (`react-router.config.ts` sets `ssr: true`). Google Maps components must be wrapped in `<ClientOnly>` to avoid hydration errors, and `AdvancedMarker` must guard on `useMap()` returning non-null before rendering.

**Single route**: `/` renders `app/routes/Home.tsx`, which composes all page sections. Navigation is anchor-based (`#services`, `#service-area`, `#gallery`, `#about`, `#contact`).

**Layout**: `app/layout/RootLayout.tsx` wraps content with `Navbar` and `Footer`.

### Key directories

- `app/routes/` — Route modules (just `Home.tsx` + generated types)
- `app/components/home/` — Page sections (Hero, Services, ServiceArea, Gallery, About, contact/)
- `app/components/backgrounds/` — Three.js LightPillar shader, fixed behind the page in `RootLayout` (`transparent` mode so it shows on the light paper)
- `app/components/maps/` — Google Maps wrappers (HuskyMap, ServiceMap, Polygon)
- `app/components/ClientOnly.tsx` — SSR guard wrapper; use for any browser-only component (Three.js, Google Maps)
- `app/data/husky-data.ts` — Map coordinates and service area polygon data
- `app/app.css` — Tailwind v4 theme: `paper`/`ink` base, `livery` red (call/quote actions only), `aquifer` blue (water only), `strata-*` (well diagram only); fonts Rokkitt (`font-display`) and Archivo (body)

### Path alias

`~/` maps to `./app/` (configured in tsconfig and vite).

## Integrations

- **Google Maps** via `@vis.gl/react-google-maps` — uses `APIProvider`, `Map`, `AdvancedMarker`, and a custom `Polygon` component. Env vars: `VITE_MAPS_API_KEY`, `VITE_MAP_ID`.
- **Resend** via `resend` — contact form email, sent server-side from the `/` route action (`app/utils/server/contact-email.server.ts`, which also holds the HTML template). Env vars: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (on a Resend-verified domain), `CONTACT_TO_EMAIL`.
- **Three.js** via `three` — LightPillar background. Must be wrapped in `<ClientOnly>`.
- **Icons** from `lucide-react`.
- **Input masking** via `react-imask` — phone number formatting in the contact form.

## Deployment

Docker multi-stage build (Node 26 Alpine; local Node is managed with fnm) → runs on port 3000. GitHub Actions workflow rsyncs source to the VPS, builds the Docker image on the server, and restarts the container. Nginx reverse-proxies to the container.

The `.env` file lives on the server at `/opt/huskydrilling/.env` and is excluded from both rsync and Docker image via `.dockerignore`.
