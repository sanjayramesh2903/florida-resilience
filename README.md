# FL Resilience

A multi-page website about **Florida flood risk and coastal resilience**, built with real data from FEMA, NOAA, and Florida Climate Center. Features a custom cursor-reactive UI and is ready to deploy on Vercel.

## What it does

- **Flood Tracker** — **Main tool**: Interactive map of Florida with NOAA CO-OPS gauges. Each marker shows **live water level** (feet, MLLW), **next high/low tide** predictions, and a note on **predicted sea level rise** (~1 ft by 2050, NOAA). Click a station on the map or in the list for full details.
- **Home** — Introduces the problem and links to the Flood Tracker
- **Data** — NFIP stats, Risk Rating 2.0 impact, sea level projections, high-exposure counties
- **Solutions** — Actionable steps (insurance, elevation, CRS, preparedness) with official links
- **About** — Mission, data sources, disclaimer

## Tech

- **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**, **Framer Motion**
- Custom cursor that scales on links/buttons (hidden on touch devices)
- Responsive, dark theme, subtle grid and gradient orbs

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
3. Import the repo; leave **Framework Preset** as Next.js and **Root Directory** as `.`.
4. Click **Deploy**. No extra config needed for Next.js.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

Follow the prompts and deploy.

## Data

- FEMA Florida State Profile (April 2025) — NFIP policies, claims, CRS
- NOAA — Sea level rise projections, Sea Level Rise Viewer
- Florida Climate Center — Relative sea level, shoreline

This site is for awareness only and is not affiliated with any government agency.
