// Rebuilds lib/locations.json and public/locations/<district>.json from the location workbooks.
// Usage: npm run locations -- <absolute or relative path to the data/locations folder>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2];
if (!source) throw new Error("Pass the data/locations folder as the first argument.");
const RURAL_DIR = path.join(source, "UP - District wise Detail Report");
const URBAN_DIR = path.join(source, "403 Uttar Pradesh Assembly Constituency wise Report");

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

const DISTRICTS = [...fs.readFileSync(path.join(root, "lib/districts.ts"), "utf8").matchAll(/\{"name": "([^"]+)", "slug": "([^"]+)"\}/g)].map((m) => ({ name: m[1], slug: m[2] }));
if (DISTRICTS.length !== 75) throw new Error(`Expected 75 districts in lib/districts.ts, found ${DISTRICTS.length}`);
const ALIAS = { "bara banki": "barabanki", mahrajganj: "maharajganj", kheri: "lakhimpur-kheri" };
const districtName = (value) => {
  const slug = ALIAS[value.trim().toLowerCase()] ?? slugify(value);
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) throw new Error(`No district in lib/districts.ts for "${value}"`);
  return d.name;
};

const bodyOverrides = readJson("scripts/body-type-overrides.json");
const ulbDistrictOverrides = readJson("scripts/ulb-district-overrides.json");

const workbookRows = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith(".xlsx"))
    .flatMap((e) => {
      const wb = XLSX.readFile(path.join(e.parentPath ?? e.path, e.name));
      return wb.SheetNames.flatMap((s) => XLSX.utils.sheet_to_json(wb.Sheets[s], { defval: "" }));
    });

const ruralByCode = new Map();
const gramCodes = new Set();
for (const r of workbookRows(RURAL_DIR)) {
  const code = Number(r["District Code"]);
  if (!ruralByCode.has(code)) {
    ruralByCode.set(code, {
      code,
      name: districtName(r["District Name (In English)"]),
      zillaPanchayat: { code: Number(r["Zilla Panchayat Code"]), name: r["Zilla Panchayat Name (In English)"] },
      blocks: new Map(),
    });
  }
  const district = ruralByCode.get(code);
  const blockCode = Number(r["Block Panchayat Code"]);
  const gramCode = Number(r["Gram Panchayat Code"]);
  if (!district.blocks.has(blockCode)) district.blocks.set(blockCode, { code: blockCode, name: r["Block Panchayat Name(In English)"], gramPanchayats: new Map() });
  district.blocks.get(blockCode).gramPanchayats.set(gramCode, { code: gramCode, name: r["Gram Panchayat Name(In English)"] });
  gramCodes.add(gramCode);
}

const ulbListings = new Map();
const wardNamesByCode = new Map();
for (const r of workbookRows(URBAN_DIR)) {
  const code = Number(r["Local Body Code"]);
  if (gramCodes.has(code)) continue;
  const districtCode = Number(r["District Code"]);
  const key = `${code}|${districtCode}`;
  if (!ulbListings.has(key)) ulbListings.set(key, { code, districtCode, name: r["Local Body Name"], wards: new Set() });
  ulbListings.get(key).wards.add(String(r["Ward Number"]));
  if (!wardNamesByCode.has(code)) wardNamesByCode.set(code, new Set());
  wardNamesByCode.get(code).add(String(r["Ward Name"]));
}

const classify = (code) => {
  if (bodyOverrides[code]) return bodyOverrides[code];
  const tags = new Set();
  for (const w of wardNamesByCode.get(code) ?? []) for (const m of w.matchAll(/\(([^()]*)\)/g)) tags.add(m[1].trim());
  if ([...tags].some((t) => /m\.?\s*corp/i.test(t))) return "Nagar Nigam";
  if (tags.has("MB")) return "Nagar Palika Parishad";
  if (tags.has("NP")) return "Nagar Panchayat";
  return "Not yet classified";
};

const listingsByCode = new Map();
for (const l of ulbListings.values()) {
  if (!listingsByCode.has(l.code)) listingsByCode.set(l.code, []);
  listingsByCode.get(l.code).push(l);
}
const keptByDistrict = new Map();
const unresolved = [];
const districtOf = (l) => ruralByCode.get(l.districtCode);
for (const [code, listings] of listingsByCode) {
  let keep = listings;
  if (listings.length > 1) {
    const override = ulbDistrictOverrides[code];
    const nameMatches = listings.filter((l) => normalise(l.name).includes(normalise(districtOf(l).name)));
    if (override) keep = listings.filter((l) => districtOf(l).name === override);
    else if (nameMatches.length === 1) keep = nameMatches;
    else unresolved.push({ code, name: listings[0].name, districts: listings.map((l) => districtOf(l).name) });
  }
  for (const l of keep) {
    if (!keptByDistrict.has(l.districtCode)) keptByDistrict.set(l.districtCode, []);
    keptByDistrict.get(l.districtCode).push({ code, name: l.name, type: classify(code), wards: l.wards.size });
  }
}

const byName = (a, b) => a.name.localeCompare(b.name);
const districts = DISTRICTS.map(({ name }) => {
  const r = [...ruralByCode.values()].find((x) => x.name === name);
  if (!r) throw new Error(`No rural rows for ${name}`);
  return {
    code: r.code,
    name,
    zillaPanchayat: r.zillaPanchayat,
    blocks: [...r.blocks.values()].map((b) => ({ code: b.code, name: b.name, gramPanchayats: [...b.gramPanchayats.values()].sort(byName) })).sort(byName),
    localBodies: (keptByDistrict.get(r.code) ?? []).sort(byName),
  };
});

const note = "Generated by scripts/build-locations.mjs from data/locations. Rural = District > Zilla Panchayat > Block Panchayat > Gram Panchayat. Urban = Local Body listed under its district. Body type is inferred from ward-name tags (M.Corp = Nagar Nigam, MB = Nagar Palika Parishad, NP = Nagar Panchayat) unless scripts/body-type-overrides.json sets it. Local bodies listed under two districts are kept only in the district their name matches, or in scripts/ulb-district-overrides.json; unresolved ones stay in both and are listed in scripts/locations-review.json.";
fs.writeFileSync(path.join(root, "lib/locations.json"), JSON.stringify({ note, districts }));

const publicDir = path.join(root, "public/locations");
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });
for (const d of districts) {
  const detail = {
    blocks: d.blocks.map((b) => ({ name: b.name, slug: slugify(b.name), gps: b.gramPanchayats.map((g) => ({ name: g.name, slug: slugify(g.name) })) })),
    localBodies: d.localBodies.map((u) => ({ name: u.name, slug: slugify(u.name), typeSlug: slugify(u.type) })),
  };
  fs.writeFileSync(path.join(publicDir, `${slugify(d.name)}.json`), JSON.stringify(detail));
}

fs.writeFileSync(path.join(root, "scripts/locations-review.json"), JSON.stringify({ unresolvedUlbDistricts: unresolved }, null, 2) + "\n");

const all = districts.flatMap((d) => d.localBodies);
const typeCounts = Object.fromEntries(["Nagar Nigam", "Nagar Palika Parishad", "Nagar Panchayat", "Not yet classified"].map((t) => [t, new Set(all.filter((u) => u.type === t).map((u) => u.code)).size]));
console.log(JSON.stringify({
  districts: districts.length,
  zillaPanchayats: districts.length,
  blocks: districts.reduce((n, d) => n + d.blocks.length, 0),
  gramPanchayats: districts.reduce((n, d) => n + d.blocks.reduce((m, b) => m + b.gramPanchayats.length, 0), 0),
  localBodyListings: all.length,
  localBodiesUnique: new Set(all.map((u) => u.code)).size,
  typeCounts,
  unresolvedUlbDistricts: unresolved.length,
}, null, 2));
