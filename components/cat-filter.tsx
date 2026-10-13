"use client";
import { useState } from "react";
import { BadgeIndianRupee, Construction, Filter, Landmark, Layers, Scale, ShieldCheck, UserCog, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/factsheet";
const CI: Record<string, typeof Users> = { "Demography & Profile": Users, "Revenue & Receipts": BadgeIndianRupee, "Expenditure & Utilisation": Wallet, "Grants (SFC / CFC)": Landmark, "Government Schemes": Layers, "Infrastructure & Services": Construction, "Human Resources": UserCog, "Liabilities & Assets": Scale, "Audit & Governance": ShieldCheck, "Data quality": ShieldCheck };
export function CatFilter({ sections, theme }: { sections: { cat: string; node: React.ReactNode }[]; theme: Theme }) {
  const [sel, setSel] = useState("All");
  const chip = (on: boolean) => cn("flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition", on ? `border-orange-500/15 bg-gradient-to-br ${theme.hero} text-white shadow-[4px_4px_9px_rgba(154,79,10,0.18),inset_1px_1px_0_rgba(255,255,255,0.32)]` : "border-white/80 bg-[#fffaf0] text-amber-900/75 shadow-[3px_3px_7px_rgba(129,91,37,0.08),-3px_-3px_7px_rgba(255,255,255,0.8)] hover:text-orange-800");
  const all = (on: boolean) => cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition", on ? `border-amber-200 ${theme.pill} shadow-[inset_3px_3px_7px_rgba(129,91,37,0.1)]` : "border-white/80 bg-[#fffaf0] text-amber-900/70 shadow-[3px_3px_7px_rgba(129,91,37,0.08),-3px_-3px_7px_rgba(255,255,255,0.8)] hover:text-orange-800");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category"><span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Filter className="h-3.5 w-3.5" />Category</span>
        <button className={all(sel === "All")} onClick={() => setSel("All")}>All</button>
        {sections.map((s) => { const I = CI[s.cat] ?? Layers; return <button key={s.cat} className={chip(sel === s.cat)} onClick={() => setSel(s.cat)}><I className={cn("h-3.5 w-3.5", sel === s.cat ? "text-white" : theme.accent)} />{s.cat}</button>; })}
      </div>
      {sections.filter((s) => sel === "All" || s.cat === sel).map((s) => { const I = CI[s.cat] ?? Layers; return <section key={s.cat} className="space-y-4"><h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold"><I className={cn("h-5 w-5", theme.accent)} />{s.cat}</h2>{s.node}</section>; })}
    </div>
  );
}
