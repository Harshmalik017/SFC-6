# TRD
Next.js 14 App Router, TypeScript, Tailwind 3, shadcn-style UI (components/ui), lucide-react. No env vars; deployed at https://sfcsixth.vercel.app/. App metadata uses this URL as its canonical/Open Graph base.
- lib/up-map.json: 75 district SVG paths (source: udit-001/india-maps-data, 2011 boundaries, simplified). lib/districts.ts: names/slugs.
- lib/factsheet.ts: levels + tables (indicator rows from JSON tables). lib/locations.ts: hierarchy helpers + RURAL/URBAN arrays (sample fallback).
- Routes: / · /district/[d] · /block/[d]/[b] · /gp/[d]/[b]/[g] · /urban/[d]/[t]/[n] · /format/[level].
- Downloads generated client-side (Blob). Future: Facts(level, location_code, table, indicator, year, value).
- Caveat: 2011 boundaries; newer districts (e.g. post-2011 splits) may need a refreshed map.
