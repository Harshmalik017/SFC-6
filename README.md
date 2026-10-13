# SFC Dashboard

**Live dashboard:** [https://sfcsixth.vercel.app/](https://sfcsixth.vercel.app/)

SFC Dashboard is an interactive explorer for the Sixth State Finance Commission of Uttar Pradesh. It organizes factsheet indicators by location, helping users move from a state-wide overview through districts and blocks to Gram Panchayats and urban local bodies.

## What you can do

- Explore location-wise factsheets for State, District, Block, Gram Panchayat, and Urban Local Body levels.
- Switch between Rural and Urban views where those views are available, and navigate between related locations.
- Browse factsheet formats to compare indicators, reporting periods, and data-quality checks.
- Open source reports, filter their pages, switch between Hindi and English, and export report tables as CSV or Excel.
- Review interactive dashboard charts. Their current finance figures are illustrative examples, not official reported data.

The interface uses a warm orange-and-yellow claymorphism theme. Factsheets also use distinct colors for each location hierarchy to make the current level easier to recognize.

This project is a demonstration and is not an official Government of Uttar Pradesh website. Report formats and source forms are provided for exploration; not all factsheet finance data is connected to official live sources.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm test
npm run build
```

## Main routes

- `/` — dashboard overview and location explorer.
- `/district/...`, `/block/...`, `/gp/...`, `/urban/...` — location factsheets and drill-down navigation.
- `/formats` — factsheet indicator and format catalog.
- `/reports` — source report browser with report dialogs and exports.

## Repository layout

- `app/` — Next.js App Router pages and global styling.
- `components/` — shared UI, factsheets, charts, map, and report dialog.
- `lib/` — location, factsheet, and report data helpers.
- `data/reports/` — normalized Hindi and English source forms.
- `public/images/` — dashboard, location-exploration, local-services, and report imagery.
- `memory-bank/` — product, technical, design, and module documentation.
- `AGENT.md` — repository-specific contribution guidance for coding agents.
