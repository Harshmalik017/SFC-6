# Location files for dropdown flow
**Source folder:** `data/locations/` was removed after conversion. The original workbooks are preserved in git history at commit `68116e0` (`git show 68116e0:data/locations/...`).
- **Rural (District > Zilla Panchayat > Block Panchayat > Gram Panchayat):** `UP - District wise Detail Report/*.xlsx` (75 files). Columns used: District Code/Name, Zilla Panchayat Code/Name, Block Panchayat Code/Name, Gram Panchayat Code/Name.
- **Urban (District > Local Body):** `403 Uttar Pradesh Assembly Constituency wise Report/**/*.xlsx` (483 files). Columns used: District Code/Name, Local Body Code/Name, Ward Number/Name. Codes that match a rural GP code are GPs and are excluded; the other 765 codes are urban local bodies (ULBs).

**Generated file:** `lib/locations.json` (about 2.1 MB). Shape: `districts[]` with `code`, `name`, `zillaPanchayat`, `blocks[]` (each with `gramPanchayats[]`) and `localBodies[]` (each with `type`, `wards`). Totals: 75 districts, 75 ZPs, 826 blocks, 57,694 GPs, 765 ULBs.

**Body type is not a column.** It is inferred from ward-name tags: `(M.Corp.)` → Nagar Nigam, `(MB)` → Nagar Palika Parishad, `(NP)` → Nagar Panchayat. 183 ULBs have no tag and show as "Not yet classified" until the department confirms their type. Some tags are wrong (for example Jhansi, Firozabad and Muzaffarnagar are Nagar Nigams tagged MB).

**Duplicates:** 22 ULB codes are listed under two districts in the source. Both listings are kept; the state total counts each code once.

**Rebuild:** the generator is a one-off script (not in the repo). It reads the workbooks from commit `68116e0`, normalises district names to `lib/districts.ts` slugs (aliases: Bara Banki, Kheri, Mahrajganj), and writes `lib/locations.json`.

**Use:** `lib/locations.ts` reads the JSON and exposes `blocksOf`, `gpsOf`, `bodiesOf`, `nameOf`, `districtName`, `BODY_TYPES`, and the count helpers `stateCounts`, `districtCounts`, `blockCounts`, `urbanCounts`. Count keys match the factsheet labels in `lib/factsheet.ts`.

**Not needed:** Parliament and assembly lists, PC/AC columns, Village and Sub-District files.

**Join to form data:** forms carry names only; join on District Code plus Block, GP or Local Body Code. Ask the department to include codes in portal exports.
