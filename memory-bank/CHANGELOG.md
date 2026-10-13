# CHANGELOG
# Factsheet hierarchy color fix
- Included `lib/` in Tailwind's content scan so palette utility classes defined by factsheet metadata are emitted in production CSS.
- Applied the selected hierarchy palette to every factsheet KPI, section/table header, data-quality panel, and the Rural/Urban switch.
- Improved format-preview dialog switch states and added hierarchy-colored table markers and accessible pressed states.

# Project overview and surface depth
- Expanded README with the dashboard purpose, key workflows, routes, data limitations, and local validation instructions.
- Aligned the GitHub repository description and homepage link with the public dashboard.
- Standardized claymorphism card and button elevation with clearer hover and pressed states.

# Factsheet formats catalog
- Consolidated per-level format preview pages into a single `/formats` catalog with a View format dialog for each hierarchy.
- Dialog previews KPIs, grouped indicators, reporting periods, units, source references, and data-quality checks; State and District support Rural/Urban views.
- Updated desktop/mobile navigation and removed the obsolete `/format/[level]` route.
- Renamed the State Explorer navigation item to Home on desktop and mobile.

# Project link and contributor guidance
- Added the deployed dashboard URL to the README and set it as the canonical metadata base/Open Graph URL.
- Expanded the README with setup, validation, project structure, report workflow, and demo-data disclosure.
- Added root `AGENT.md` with repository conventions, memory-bank update expectations, and validation commands.

# Latest reports and theme update
- Consolidated report listing, page filtering, language switching, and exports into `/reports`; each form now opens in a dialog, and the information note expands inline.
- Removed the redundant `/reports/[id]` and `/reports/information-note` pages; report data loads on demand when opening a form.
- Kept the global orange/yellow claymorphism palette while assigning distinct hierarchy colors to State, District, Block, Gram Panchayat, and Urban Local Body factsheets.

# Latest visual refresh
- Replaced the cool slate/teal design with a warm orange-to-yellow palette across the shared UI, navigation, location explorers, factsheets, tables, reports, map, and charts.
- Applied a restrained claymorphism treatment: warm molded surfaces, soft raised/inset shadows, rounded corners, and tactile controls instead of repeated glossy gradients.
- Unified all State, District, Block, Gram Panchayat, and Urban Local Body factsheets under the same orange/yellow theme.
- Marked homepage chart figures as illustrative demo values, not official finance data.

## 0.6.0
- Homepage redesigned with stronger card hierarchy, richer gradients, and improved quick-explorer interactions.
- Added interactive dashboard charts: receipts trend area chart, funding mix donut chart, and tier contribution bar chart.
- Different factsheet levels now use distinct color themes: State (sky), District (violet), Block (amber), Gram Panchayat (emerald), Urban (fuchsia).
- KPI summaries and hero panels now reflect each factsheet's theme instead of a single flat teal treatment.
- Category filter chips, active states, and section icons inherit the matching factsheet theme.
## 0.3.0
- Rural / Urban views separated on State and District factsheets (?view=rural|urban); drill-down cards shown per view only.
- District names labelled on the map.
- Indicators grouped into 9 categories; ratio indicators use "(%)" with Numerator / Denominator bullets below each table; table sub-headings removed (Unit is now a column).
- Data triangulation section (11 reusable checks) on every factsheet.
- Footer: centred, © line added. Scrollbar themed teal/slate.
## 0.2.0
- Location factsheets, state map, picker, format pages, downloads.
## 0.1.0
- First draft.
## 0.4.0
- New Reports menu: all pages and tables of the 8 JSON files (GP, KP, ZP, ULB × English/Hindi) shown as tables with page filter; Information note (.md) rendered.
- Category filter (default All) on factsheets, incl. Data quality. Downloads: Excel and CSV only, green buttons. District/State sub-headings removed.
## 0.5.0
- Location master loaded from `data/locations` into `lib/locations.json` (75 districts, 75 ZPs, 826 blocks, 57,694 GPs, 765 ULBs). Pickers and drill-down pages use real codes and names; placeholder entries removed.
- Factsheet counts (state, district, block, urban body) are computed from the location master instead of hard-coded.
- Home: single Rural/Urban toggle under the title; picker follows it; "District map" heading and description removed; Source lines hidden on home tables. Roll-up source text removed from all factsheets.
- "All" category chip uses a light theme fill.
- Reports: default language Hindi; header pill "Page N"; right-corner Hindi form title pill; table headers in theme colour with white text; scroll-to-top button.
