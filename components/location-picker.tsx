"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRICTS } from "@/lib/districts";
import { BODY_TYPES, type LocationDetail } from "@/lib/location-types";
const sel = "h-12 w-full rounded-2xl border border-white/80 bg-[#fffaf0] px-3 text-sm text-amber-950 shadow-[inset_4px_4px_9px_rgba(129,91,37,0.09),inset_-4px_-4px_9px_rgba(255,255,255,0.85)] transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 disabled:cursor-not-allowed disabled:bg-amber-50 disabled:text-amber-900/35";
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
    <div className="rounded-[28px] border border-white/80 bg-gradient-to-br from-[#fffdf8] via-[#fbf1df] to-[#f7e5c4] p-5 shadow-clay-card">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-800"><Compass className="h-3.5 w-3.5" />Quick explorer</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-amber-950">Drill into the state hierarchy</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-[#fff8e8] px-3 py-1.5 text-xs font-semibold text-orange-900 shadow-clay-soft">
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
