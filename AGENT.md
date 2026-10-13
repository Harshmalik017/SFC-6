# Agent guide

## Project overview

This repository contains a Next.js 14 App Router dashboard for Uttar Pradesh's Sixth State Finance Commission. The single-page report browser is at `/reports`; factsheets cover State, District, Block, Gram Panchayat, and Urban Local Body levels.

## Working conventions

- Follow existing TypeScript, React, Tailwind, and component patterns.
- Keep the global orange/yellow claymorphism palette, while preserving distinct colors for each factsheet hierarchy.
- Keep sample chart values clearly identified as illustrative; do not present them as official finance data.
- Update the relevant `memory-bank/` documentation whenever project behavior, design, routes, or architecture changes.
- Avoid leaving stale pages, links, or documentation when consolidating or removing features.
- Prefer focused changes and preserve accessible labels, keyboard operation, and responsive layouts.

## Validation

Run `npm test` for location data checks and `npm run build` for production compilation and type checking.
