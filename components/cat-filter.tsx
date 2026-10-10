"use client";
import { useState } from "react";
import { BadgeIndianRupee, Construction, Filter, Landmark, Layers, Scale, ShieldCheck, UserCog, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
const CI: Record<string, typeof Users> = { "Demography & Profile": Users, "Revenue & Receipts": BadgeIndianRupee, "Expenditure & Utilisation": Wallet, "Grants (SFC / CFC)": Landmark, "Government Schemes": Layers, "Infrastructure & Services": Construction, "Human Resources": UserCog, "Liabilities & Assets": Scale, "Audit & Governance": ShieldCheck, "Data quality": ShieldCheck };
export function CatFilter({ sections }: { sections: { cat: string; node: React.ReactNode }[] }) {
  const [sel, setSel] = useState("All");
  const chip = (on: boolean) => cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition", on ? "border-slate-900 bg-slate-900 text-white" : "bg-card hover:bg-muted");
  const all = (on: boolean) => cn("rounded-full border px-3 py-1 text-xs font-medium transition", on ? "border-teal-600 bg-teal-200 text-teal-950" : "border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category"><span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Filter className="h-3.5 w-3.5" />Category</span>
        <button className={all(sel === "All")} onClick={() => setSel("All")}>All</button>
        {sections.map((s) => { const I = CI[s.cat] ?? Layers; return <button key={s.cat} className={chip(sel === s.cat)} onClick={() => setSel(s.cat)}><I className={cn("h-3.5 w-3.5", sel === s.cat ? "text-teal-300" : "text-teal-600")} />{s.cat}</button>; })}
      </div>
      {sections.filter((s) => sel === "All" || s.cat === sel).map((s) => { const I = CI[s.cat] ?? Layers; return <section key={s.cat} className="space-y-4"><h2 className="flex items-center gap-2 border-b pb-2 text-lg font-semibold"><I className="h-5 w-5 text-teal-600" />{s.cat}</h2>{s.node}</section>; })}
    </div>
  );
}
