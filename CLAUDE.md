# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (React Router dev with HMR)
- **Build**: `npm run build` (React Router production build via Vite)
- **Start**: `npm run start` (runs `react-router-serve ./build/server/index.js`)
- **Typecheck**: `npm run typecheck` (runs `react-router typegen && tsc`)

No test runner or linter is configured.

## Architecture

React Router v7 full-stack SSR application — a single-page marketing site for a well drilling company (huskydrilling.com). React 19, Vite 7, Tailwind CSS v4, TypeScript strict mode.

**SSR is enabled** (`react-router.config.ts` sets `ssr: true`). Google Maps components must be wrapped in `<ClientOnly>` to avoid hydration errors, and `AdvancedMarker` must guard on `useMap()` returning non-null before rendering.

**Single route**: `/` renders `app/routes/Home.tsx`, which composes all page sections. Navigation is anchor-based (`#services`, `#service-area`, `#gallery`, `#about`, `#contact`).

**Layout**: `app/layout/RootLayout.tsx` wraps content with `Navbar` and `Footer`.

### Key directories

- `app/routes/` — Route modules (just `Home.tsx` + generated types)
- `app/components/home/` — Page sections (Hero, Services, ServiceArea, Gallery, About, contact/)
- `app/components/backgrounds/` — Three.js visual effects (LightPillar shader background)
- `app/components/maps/` — Google Maps wrappers (HuskyMap, ServiceMap, Polygon)
- `app/components/ClientOnly.tsx` — SSR guard wrapper; use for any browser-only component (Three.js, Google Maps)
- `app/data/husky-data.ts` — Map coordinates and service area polygon data
- `app/app.css` — Tailwind v4 theme with custom OKLch color palette (`base-50`–`base-950`, primary, secondary, accent)

### Path alias

`~/` maps to `./app/` (configured in tsconfig and vite).

## Integrations

- **Google Maps** via `@vis.gl/react-google-maps` — uses `APIProvider`, `Map`, `AdvancedMarker`, and a custom `Polygon` component. Env vars: `VITE_MAPS_API_KEY`, `VITE_MAP_ID`.
- **EmailJS** via `@emailjs/browser` — contact form submission (service/template IDs hardcoded in `ContactForm.tsx`).
- **Three.js** via `three` — used for WebGL shader effects (LightPillar background). Must be wrapped in `<ClientOnly>`.
- **Icons** from `lucide-react`.
- **Input masking** via `react-imask` — phone number formatting in the contact form.

## Deployment

Docker multi-stage build (Node 20 Alpine) → runs on port 3000. GitHub Actions workflow rsyncs source to the VPS, builds the Docker image on the server, and restarts the container. Nginx reverse-proxies to the container.

The `.env` file lives on the server at `/opt/huskydrilling/.env` and is excluded from both rsync and Docker image via `.dockerignore`.
