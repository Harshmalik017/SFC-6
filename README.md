# SFC Dashboard

**Live project:** [sfcsixth.vercel.app](https://sfcsixth.vercel.app/)

A location-wise factsheet explorer for the Sixth State Finance Commission of Uttar Pradesh. Explore state, district, block, Gram Panchayat, and urban local-body information; browse source forms and download report tables.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm test
npm run build
```

## Project structure

- `app/` — Next.js App Router pages and global styling.
- `components/` — shared UI, factsheets, charts, map, and report dialog.
- `lib/` — location, factsheet, and report data helpers.
- `data/reports/` — normalized Hindi and English source forms.
- `memory-bank/` — product, technical, design, and module documentation.
- `AGENT.md` — repository-specific contribution guidance for coding agents.

The reports experience lives on `/reports`; each form opens in a dialog with language selection, page filtering, and CSV/Excel exports. The visual system uses warm orange/yellow claymorphism, with distinct colors for each location hierarchy factsheet.

**Data note:** finance values shown in the homepage charts are illustrative demo values, not official reported figures. The application is a demonstration environment and is not an official Government of Uttar Pradesh website.
