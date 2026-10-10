export type Loc = { name: string; slug: string };
export type LocalBodyLoc = Loc & { typeSlug: string };
export type LocationDetail = { blocks: (Loc & { gps: Loc[] })[]; localBodies: LocalBodyLoc[] };
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const BODY_TYPES: Loc[] = [
  { name: "Nagar Nigam", slug: "nagar-nigam" },
  { name: "Nagar Palika Parishad", slug: "nagar-palika-parishad" },
  { name: "Nagar Panchayat", slug: "nagar-panchayat" },
  { name: "Not yet classified", slug: "not-yet-classified" },
];
