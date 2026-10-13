"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRICTS } from "@/lib/districts";
import { BODY_TYPES, type LocationDetail } from "@/lib/location-types";
const sel = "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";
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
    <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-teal-50 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700"><Compass className="h-3.5 w-3.5" />Quick explorer</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Drill into the state hierarchy</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800">
          <MapPin className="h-3.5 w-3.5" />
          {view === "rural" ? "Rural mode" : "Urban mode"}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <select className={sel} value={d} onChange={(e) => set(() => setD(e.target.value))} aria-label="District"><option value="">District</option>{DISTRICTS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
        <select className={sel} value={b} disabled={!d} onChange={(e) => { setB(e.target.value); setG(""); }} aria-label="Level 2"><option value="">{view === "rural" ? "Block (Kshetra Panchayat)" : "Body type"}</option>{l2.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
        <select className={sel} value={g} disabled={!b} onChange={(e) => setG(e.target.value)} aria-label="Level 3"><option value="">{view === "rural" ? "Gram Panchayat" : "Local body name"}</option>{l3.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select>
        <Button variant="accent" className="h-12" disabled={!d} onClick={go}>Open factsheet <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
