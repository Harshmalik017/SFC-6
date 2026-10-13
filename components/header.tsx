"use client";
import Link from "next/link";
import { useState } from "react";
import { BarChart3, ChevronDown, FileSpreadsheet, FileText, Landmark, Menu, X } from "lucide-react";
import { LEVELS } from "@/lib/factsheet";
import { Button } from "@/components/ui/button";
import { LevelIcon } from "@/components/level-icon";
export function Header() {
  const [open, setOpen] = useState(false); const [menu, setMenu] = useState<"" | "fmt">("");
  const close = () => { setMenu(""); setOpen(false); };
  const item = "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-orange-50/90 transition hover:bg-white/10 hover:text-white";
  const fmt = LEVELS.map((l) => <Link key={l.slug} href={`/format/${l.slug}`} onClick={close} className={item}><LevelIcon k={l.icon} className="h-4 w-4 text-amber-300" />{l.label}</Link>);
  const dd = (label: string, I: typeof FileText, items: React.ReactNode) => <div className="relative"><button onClick={() => setMenu(menu === "fmt" ? "" : "fmt")} className={`${item} bg-white/5`}><I className="h-4 w-4 text-amber-300" />{label}<ChevronDown className="h-4 w-4" /></button>{menu === "fmt" && <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#4b2618]/95 p-1 shadow-[10px_12px_24px_rgba(64,28,10,0.32),inset_1px_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/5">{items}</div>}</div>;
  return (
    <header className="sticky top-0 z-50 border-b border-amber-950/30 bg-gradient-to-r from-[#542817] via-[#6c3218] to-[#8f4315] text-white shadow-[0_8px_22px_rgba(89,45,20,0.22)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white"><span className="rounded-xl border border-white/15 bg-white/10 p-2 shadow-[3px_3px_8px_rgba(64,28,10,0.2),inset_1px_1px_0_rgba(255,255,255,0.2)]"><BarChart3 className="h-5 w-5 text-amber-300" /></span><span>SFC Dashboard</span><span className="hidden text-xs font-normal text-orange-100/75 lg:inline">· Sixth State Finance Commission, UP</span></Link>
        <nav className="hidden items-center gap-2 md:flex"><Link href="/" className={`${item} bg-white/5`}><Landmark className="h-4 w-4 text-amber-300" />State Explorer</Link>{dd("Factsheet formats", FileSpreadsheet, fmt)}<Link href="/reports" onClick={close} className={`${item} bg-white/5`}><FileText className="h-4 w-4 text-amber-300" />Reports</Link></nav>
        <Button variant="ghost" size="icon" className="text-white md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="max-h-[80vh] overflow-y-auto border-t border-white/10 px-4 pb-3 md:hidden"><Link href="/" onClick={close} className={item}>State Explorer</Link><p className="px-3 pt-2 text-xs uppercase tracking-[0.15em] text-orange-200/70">Factsheet formats</p>{fmt}<Link href="/reports" onClick={close} className={item}><FileText className="h-4 w-4 text-amber-300" />Reports</Link></nav>}
    </header>
  );
}
