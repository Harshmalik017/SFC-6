import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const { districts } = read("lib/locations.json");
const TYPE_SLUGS = new Set(["nagar-nigam", "nagar-palika-parishad", "nagar-panchayat", "not-yet-classified"]);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

test("state totals match the source workbooks", () => {
  const blocks = districts.flatMap((d) => d.blocks);
  const gps = blocks.reduce((n, b) => n + b.gramPanchayats.length, 0);
  const listings = districts.flatMap((d) => d.localBodies);
  assert.equal(districts.length, 75);
  assert.equal(districts.length, new Set(districts.map((d) => d.zillaPanchayat.code)).size);
  assert.equal(blocks.length, 826);
  assert.equal(gps, 57694);
  assert.equal(new Set(listings.map((u) => u.code)).size, 765);
  assert.equal(listings.length, 783);
});

test("every local body has a valid type", () => {
  for (const u of districts.flatMap((d) => d.localBodies)) {
    assert.ok(["Nagar Nigam", "Nagar Palika Parishad", "Nagar Panchayat", "Not yet classified"].includes(u.type), `${u.name}: ${u.type}`);
  }
});

test("duplicate ULB listings are either resolved or in the review file", () => {
  const seen = new Map();
  for (const d of districts) for (const u of d.localBodies) seen.set(u.code, (seen.get(u.code) ?? 0) + 1);
  const duplicated = [...seen.values()].filter((n) => n > 1).length;
  const review = read("scripts/locations-review.json").unresolvedUlbDistricts;
  assert.equal(duplicated, review.length);
});

test("each district has a public detail file with matching counts", () => {
  for (const d of districts) {
    const file = path.join(root, "public/locations", `${slugify(d.name)}.json`);
    assert.ok(fs.existsSync(file), `missing ${file}`);
    const detail = JSON.parse(fs.readFileSync(file, "utf8"));
    assert.equal(detail.blocks.length, d.blocks.length, d.name);
    assert.equal(detail.localBodies.length, d.localBodies.length, d.name);
    assert.equal(detail.blocks.reduce((n, b) => n + b.gps.length, 0), d.blocks.reduce((n, b) => n + b.gramPanchayats.length, 0), d.name);
    for (const u of detail.localBodies) assert.ok(TYPE_SLUGS.has(u.typeSlug), `${d.name}: ${u.typeSlug}`);
  }
});
