# DESIGN
Current direction: warm, tactile claymorphism with a calm editorial hierarchy. The global theme is orange/yellow; location factsheets add their own distinct hierarchy identity colors.

- Palette: toasted brown navigation, orange/yellow primary gradient, amber focus states, warm cream page surfaces, and deep brown text.
- Clay surfaces: cards use a consistent, restrained warm elevation; buttons use a shorter, more defined resting shadow that deepens on hover and presses inward when activated. Nested panels use a softer shadow, while dialogs remain the highest surface.
- Factsheet identity: State = orange/yellow, District = rose/red, Block = emerald/lime, Gram Panchayat = sky/cyan, Urban Local Body = violet/fuchsia. These colors distinguish location hierarchy while the surrounding UI remains orange/yellow.
- Tailwind scans `lib/` because hierarchy palettes are defined alongside the factsheet data model; preserve this content path when updating build configuration.
- Factsheet hierarchy color must remain visible beyond the hero: KPI surfaces, category accents, table headers, data-quality panels, location icons, and selected Rural/Urban controls all use the active hierarchy palette.
- KPI tiles: quiet warm-tinted surfaces and small clay-like orange/yellow markers, avoiding a different bright gradient on every tile.
- Charts: interactive Recharts panels use orange/yellow series and disclose that displayed sample values are illustrative, not official finance data.
- Navigation: warm dark-brown header/footer, tactile dropdown panels, and the quick-explorer selector with rural/urban mode labels.
- Reports: a single listing page; report forms open in a native accessible dialog with page filters, language switching, and downloads. The information note expands inline.
- Factsheet formats: one catalog page with hierarchy-colored cards; format previews use dialogs with grouped indicators, KPIs, period labels, and data-quality checks.
- Tables and category filters: rounded inset table surfaces, orange/amber headers, and matching active filter chips with clear source/download actions.
- Icons: lucide (Landmark state, MapPinned district, LayoutGrid block, TreePine GP, Building2 urban, FileText/FileSpreadsheet/FileJson downloads).
- Responsive: hamburger nav, 1→2→4 column grids, and card-first layout for dashboard reads; retain visible keyboard focus.
- Favicon: app/icon.svg.
