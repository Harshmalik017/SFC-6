"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRICTS } from "@/lib/districts";
import { BODY_TYPES, type LocationDetail } from "@/lib/location-types";
const sel = "h-10 w-full rounded-md border bg-card px-3 text-sm disabled:opacity-50";
export function LocationPicker({ district = "", view = "rural" }: { district?: string; view?: "rural" | "urban" }) {
  const r = useRouter();
  const [d, setD] = useState(district); const [b, setB] = useState(""); const [g, setG] = useState("");
  const [loaded, setLoaded] = useState<{ district: string; detail: LocationDetail } | null>(null);
  useEffect(() => {
    if (!d) return;
    let stale = false;
    fetch(`/locations/${d}.json`).then((res) => res.json()).then((detail: LocationDetail) => { if (!stale) setLoaded({ district: d, detail }); });
    return () => { stale = true; };
  }, [d]);
  const detail = loaded?.district === d ? loaded.detail : null;
  const set = (fn: () => void) => { fn(); setB(""); setG(""); };
  const go = () => {
    if (view === "rural") r.push(g ? `/gp/${d}/${b}/${g}` : b ? `/block/${d}/${b}` : `/district/${d}?view=rural`);
    else r.push(g ? `/urban/${d}/${b}/${g}` : `/district/${d}?view=urban`);
  };
  const l2 = view === "rural" ? (detail?.blocks ?? []) : BODY_TYPES;
  const l3 = view === "rural"
    ? (detail?.blocks.find((x) => x.slug === b)?.gps ?? [])
    : (detail?.localBodies.filter((x) => x.typeSlug === b) ?? []);
  return (
    <div className="grid gap-2 rounded-lg border bg-card p-4 md:grid-cols-4">
      <select className={sel} value={d} onChange={(e) => set(() => setD(e.target.value))} aria-label="District"><option value="">District</option>{DISTRICTS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
      <select className={sel} value={b} disabled={!d} onChange={(e) => { setB(e.target.value); setG(""); }} aria-label="Level 2"><option value="">{view === "rural" ? "Block (Kshetra Panchayat)" : "Body type"}</option>{l2.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
      <select className={sel} value={g} disabled={!b} onChange={(e) => setG(e.target.value)} aria-label="Level 3"><option value="">{view === "rural" ? "Gram Panchayat" : "Local body name"}</option>{l3.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
      <Button variant="accent" disabled={!d} onClick={go}>Open factsheet <ArrowRight className="h-4 w-4" /></Button>
    </div>
  );
}
