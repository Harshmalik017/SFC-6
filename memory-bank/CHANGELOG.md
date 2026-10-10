# CHANGELOG
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
