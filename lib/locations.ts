import data from "./locations.json";
import { BODY_TYPES, slugify, type Loc } from "./location-types";

export type Counts = Record<string, string>;
export const unslug = (s: string) => decodeURIComponent(s).split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

type Named = { code: number; name: string };
type Block = Named & { gramPanchayats: Named[] };
type LocalBody = Named & { type: string; wards: number };
type District = Named & { zillaPanchayat: Named; blocks: Block[]; localBodies: LocalBody[] };

const DATA: District[] = data.districts;
const find = (d: string) => DATA.find((x) => slugify(x.name) === d);
const locs = (xs: Named[]): Loc[] => xs.map((x) => ({ name: x.name, slug: slugify(x.name) })).sort((a, b) => a.name.localeCompare(b.name));
const s = (n: number) => n.toLocaleString("en-IN");
const gpCount = (bs: Block[]) => bs.reduce((n, b) => n + b.gramPanchayats.length, 0);
const allLocalBodies = () => {
  const m = new Map<number, LocalBody>();
  for (const d of DATA) for (const u of d.localBodies) m.set(u.code, u);
  return [...m.values()];
};

export const districtName = (d: string) => find(d)?.name ?? unslug(d);
export const blocksOf = (d: string): Loc[] => locs(find(d)?.blocks ?? []);
export const gpsOf = (d: string, b: string): Loc[] => locs(find(d)?.blocks.find((x) => slugify(x.name) === b)?.gramPanchayats ?? []);
export const nameOf = (list: Loc[], v: string) => list.find((x) => x.slug === v)?.name ?? unslug(v);
export const bodiesOf = (d: string, t: string): Loc[] => locs((find(d)?.localBodies ?? []).filter((x) => slugify(x.type) === t));

export function stateCounts(): Counts {
  const blocks = DATA.flatMap((d) => d.blocks);
  const ulbs = allLocalBodies();
  return {
    "Districts (number)": s(DATA.length),
    Districts: s(DATA.length),
    "Zila Panchayats": s(DATA.length),
    "Kshetra Panchayats (blocks)": s(blocks.length),
    "Gram Panchayats (number)": s(gpCount(blocks)),
    "Gram Panchayats": s(gpCount(blocks)),
    "Urban local bodies (number)": s(ulbs.length),
    ...Object.fromEntries(BODY_TYPES.map((t) => [t.name, s(ulbs.filter((u) => slugify(u.type) === t.slug).length)])),
  };
}

export function districtCounts(d: string): Counts {
  const D = find(d);
  if (!D) return {};
  return {
    "Kshetra Panchayats in district (number)": s(D.blocks.length),
    "Gram Panchayats in district (number)": s(gpCount(D.blocks)),
    "Gram Panchayats (number)": s(gpCount(D.blocks)),
    "Urban local bodies (number)": s(D.localBodies.length),
  };
}

export function blockCounts(d: string, b: string): Counts {
  const B = find(d)?.blocks.find((x) => slugify(x.name) === b);
  if (!B) return {};
  return { "Gram Panchayats in block (number)": s(B.gramPanchayats.length), "Gram Panchayats (number)": s(B.gramPanchayats.length) };
}

export function urbanCounts(d: string, n: string): Counts {
  const U = find(d)?.localBodies.find((x) => slugify(x.name) === n);
  if (!U) return {};
  return { "Wards (number)": s(U.wards), "Number of wards": s(U.wards) };
}
