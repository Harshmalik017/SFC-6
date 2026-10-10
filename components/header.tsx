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
  const item = "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white hover:bg-white/10";
  const fmt = LEVELS.map((l) => <Link key={l.slug} href={`/format/${l.slug}`} onClick={close} className={item}><LevelIcon k={l.icon} className="h-4 w-4 text-teal-400" />{l.label}</Link>);
  const rep = [...REPORTS.map((r) => <Link key={r.id} href={`/reports/${r.id}`} onClick={close} className={item}><LevelIcon k={r.icon} className="h-4 w-4 text-teal-400" />{r.label}</Link>), <Link key="note" href="/reports/information-note" onClick={close} className={item}><BookOpen className="h-4 w-4 text-teal-400" />Information note (.md)</Link>];
  const dd = (k: "fmt" | "rep", label: string, I: typeof FileText, items: React.ReactNode) => <div className="relative"><button onClick={() => setMenu(menu === k ? "" : k)} className={item}><I className="h-4 w-4 text-teal-400" />{label}<ChevronDown className="h-4 w-4" /></button>{menu === k && <div className="absolute right-0 mt-2 w-64 rounded-md bg-slate-800 p-1 shadow-lg">{items}</div>}</div>;
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold"><BarChart3 className="h-6 w-6 text-teal-400" />SFC Dashboard<span className="hidden text-xs font-normal text-slate-300 lg:inline">· Sixth State Finance Commission, UP</span></Link>
        <nav className="hidden items-center gap-1 md:flex"><Link href="/" className={item}><Landmark className="h-4 w-4 text-teal-400" />State Explorer</Link>{dd("fmt", "Factsheet formats", FileSpreadsheet, fmt)}{dd("rep", "Reports", FileText, rep)}</nav>
        <Button variant="ghost" size="icon" className="text-white md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="max-h-[80vh] overflow-y-auto border-t border-white/10 px-4 pb-3 md:hidden"><Link href="/" onClick={close} className={item}>State Explorer</Link><p className="px-3 pt-2 text-xs text-slate-400">Factsheet formats</p>{fmt}<p className="px-3 pt-2 text-xs text-slate-400">Reports</p>{rep}</nav>}
    </header>
  );
}
