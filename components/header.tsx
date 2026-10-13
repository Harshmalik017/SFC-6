"use client";
import Link from "next/link";
import { useState } from "react";
import { BarChart3, BookOpen, ChevronDown, FileSpreadsheet, FileText, Landmark, Menu, X } from "lucide-react";
import { LEVELS } from "@/lib/factsheet";
import { REPORTS } from "@/lib/reports-meta";
import { Button } from "@/components/ui/button";
import { LevelIcon } from "@/components/level-icon";
export function Header() {
  const [open, setOpen] = useState(false); const [menu, setMenu] = useState<"" | "fmt" | "rep">("");
  const close = () => { setMenu(""); setOpen(false); };
  const item = "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10 hover:text-white";
  const fmt = LEVELS.map((l) => <Link key={l.slug} href={`/format/${l.slug}`} onClick={close} className={item}><LevelIcon k={l.icon} className="h-4 w-4 text-teal-300" />{l.label}</Link>);
  const rep = [...REPORTS.map((r) => <Link key={r.id} href={`/reports/${r.id}`} onClick={close} className={item}><LevelIcon k={r.icon} className="h-4 w-4 text-teal-300" />{r.label}</Link>), <Link key="note" href="/reports/information-note" onClick={close} className={item}><BookOpen className="h-4 w-4 text-teal-300" />Information note (.md)</Link>];
  const dd = (k: "fmt" | "rep", label: string, I: typeof FileText, items: React.ReactNode) => <div className="relative"><button onClick={() => setMenu(menu === k ? "" : k)} className={`${item} bg-white/5`}><I className="h-4 w-4 text-teal-300" />{label}<ChevronDown className="h-4 w-4" /></button>{menu === k && <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-700 bg-slate-900/95 p-1 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5">{items}</div>}</div>;
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/80 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white shadow-[0_12px_40px_rgba(15,23,42,0.28)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white"><span className="rounded-xl bg-white/10 p-2 shadow-inner shadow-white/10"><BarChart3 className="h-5 w-5 text-teal-300" /></span><span>SFC Dashboard</span><span className="hidden text-xs font-normal text-slate-300 lg:inline">· Sixth State Finance Commission, UP</span></Link>
        <nav className="hidden items-center gap-2 md:flex"><Link href="/" className={`${item} bg-white/5`}><Landmark className="h-4 w-4 text-teal-300" />State Explorer</Link>{dd("fmt", "Factsheet formats", FileSpreadsheet, fmt)}{dd("rep", "Reports", FileText, rep)}</nav>
        <Button variant="ghost" size="icon" className="text-white md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="max-h-[80vh] overflow-y-auto border-t border-white/10 px-4 pb-3 md:hidden"><Link href="/" onClick={close} className={item}>State Explorer</Link><p className="px-3 pt-2 text-xs uppercase tracking-[0.15em] text-slate-400">Factsheet formats</p>{fmt}<p className="px-3 pt-2 text-xs uppercase tracking-[0.15em] text-slate-400">Reports</p>{rep}</nav>}
    </header>
  );
}
