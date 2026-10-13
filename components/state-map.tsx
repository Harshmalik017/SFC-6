"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import map from "@/lib/up-map.json";
export function StateMap() {
  const r = useRouter(); const [h, setH] = useState<string | null>(null);
  const open = (s: string) => r.push(`/district/${s}`);
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-sm text-amber-900/65"><MousePointerClick className="h-4 w-4 text-orange-600" />{h ? <b className="text-amber-950">{h}</b> : "Hover a district; click to open its factsheet"}</p>
      <svg viewBox={`0 0 ${map.w} ${map.h}`} className="mx-auto h-auto w-full max-w-4xl" role="group" aria-label="Uttar Pradesh district map">
        {map.districts.map((d) => <path key={d.slug} d={d.d} tabIndex={0} role="link" aria-label={d.name} onMouseEnter={() => setH(d.name)} onMouseLeave={() => setH(null)} onFocus={() => setH(d.name)} onClick={() => open(d.slug)} onKeyDown={(e) => e.key === "Enter" && open(d.slug)} className={h === d.name ? "cursor-pointer fill-orange-600 stroke-white" : "cursor-pointer fill-amber-200 stroke-white"} strokeWidth={1.5} />)}
        {map.districts.map((d) => <text key={d.slug} x={d.cx} y={d.cy} textAnchor="middle" dominantBaseline="middle" fontSize={h === d.name ? 11 : 8} fontWeight={h === d.name ? 700 : 500} style={{ pointerEvents: "none", paintOrder: "stroke" }} stroke={h === d.name ? "#c2410c" : "#fffaf0"} strokeWidth={2.5} className={h === d.name ? "fill-white" : "fill-amber-950"}>{d.name}</text>)}
      </svg>
    </div>
  );
}
