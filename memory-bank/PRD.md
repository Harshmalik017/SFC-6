# PRD — SFC Dashboard
**Goal:** location-wise factsheets for Sixth SFC, Uttar Pradesh. State map → District → Block (Kshetra Panchayat) → Gram Panchayat; urban: District → Body type → Local body.
**Content:** each factsheet is built from indicators of the department JSON form tables (GP 25 pp, KP 6 pp, ZP 27 pp, ULB 27 pp; FY 2020-21 to 2024-25; ₹ thousand rural, ₹ lakh urban).
**Menu:** State Explorer; Factsheet formats (`/formats`) catalogs State, District, Block, GP, and Urban structures on one page, with a dialog preview per format and rural/urban variants where applicable.
**Reports:** one `/reports` page lists the four forms; a View report action opens a dialog with page filtering, Hindi/English switching, and CSV/Excel exports. The information note expands inline on that page.
**Every table:** CSV / Excel / JSON download. **Pending data:** shown as "—" with an "Awaiting department data" badge.
**Out of scope v0.2:** real values, auth, PC/AC views (Parliament/Assembly list dropped).
Footer carries the mandatory demonstration disclaimer.
