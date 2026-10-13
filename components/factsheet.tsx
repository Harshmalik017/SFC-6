import Link from "next/link";
import { Building2, ChevronRight, Sparkles, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FactTable } from "@/components/fact-table";
import { Triangulation } from "@/components/triangulation";
import { CatFilter } from "@/components/cat-filter";
import { LevelIcon } from "@/components/level-icon";
import { CATS, resolve, type Level, type View } from "@/lib/factsheet";
import type { Counts } from "@/lib/locations";
export type Crumb = { label: string; href?: string };
export function Factsheet({ level, title, crumbs, preview, view = "rural", counts = {}, hideSource = false, children }: { level: Level; title: string; crumbs: Crumb[]; preview?: boolean; view?: View; counts?: Counts; hideSource?: boolean; children?: React.ReactNode }) {
  const { kpis, tables } = resolve(level, view, counts);
  const scope = [...crumbs.map((c) => c.label), title, level.views ? view : ""].join("-");
  const sections = [...CATS.filter((c) => tables.some((t) => t.cat === c)).map((c) => ({ cat: c as string, node: <div className="space-y-4">{tables.filter((t) => t.cat === c).map((t) => <FactTable key={t.id} t={t} scope={scope} counts={counts} showSource={!hideSource} />)}</div> })), { cat: "Data quality", node: <Triangulation ids={level.checks} scope={scope} /> }];
  const palette = level.theme ?? { hero: "from-slate-900 via-slate-800 to-slate-700", pill: "bg-white/10 text-white ring-white/10", accent: "text-teal-300", card: "from-sky-500/10 via-cyan-500/5 to-white", glow: "shadow-sky-500/20" };
  const tone = [palette.card, "from-slate-50 via-white to-slate-50", "from-emerald-500/10 via-teal-500/5 to-white", "from-violet-500/10 via-indigo-500/5 to-white"];
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-500">{crumbs.map((c) => <span key={c.label} className="flex items-center gap-1">{c.href ? <Link href={c.href} className="transition hover:text-slate-700 hover:underline">{c.label}</Link> : c.label}<ChevronRight className="h-3 w-3" /></span>)}<span className="font-medium text-slate-900">{title}</span></nav>
      <div className={`overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br ${palette.hero} p-6 text-white shadow-[0_25px_50px_rgba(15,23,42,0.18)] ${palette.glow}`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur-sm"><LevelIcon k={level.icon} className={`h-8 w-8 ${palette.accent}`} /></div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                <Badge className={`${palette.pill} ring-1`}>{level.label} factsheet</Badge>
                {preview && <Badge variant="warn" className="bg-amber-400/15 text-amber-100 ring-1 ring-amber-300/30">Format preview</Badge>}
              </div>
              {level.blurb && <p className="max-w-2xl text-sm text-slate-200">{level.blurb}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-white/5">
            <Sparkles className={`h-4 w-4 ${palette.accent}`} />
            <span>{view === "rural" ? "Rural lens" : "Urban lens"}</span>
          </div>
        </div>
      </div>
      {level.views && <div className="flex flex-wrap gap-2">{(["rural", "urban"] as View[]).map((v) => <Button key={v} asChild size="sm" variant={v === view ? "default" : "outline"} className={v === view ? `${palette.glow} shadow-lg` : "bg-white/80 text-slate-700 hover:bg-slate-50"}><Link href={`?view=${v}`} scroll={false}>{v === "rural" ? <TreePine className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}{v === "rural" ? "Rural" : "Urban"}</Link></Button>)}</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((k, i) => <Card key={k.label} className={`overflow-hidden bg-gradient-to-br ${tone[i % tone.length]} border-slate-200`}><CardContent className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{k.label}</span><span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${palette.hero}`} /></div><div className={k.value ? "text-2xl font-bold tracking-tight text-slate-900" : "text-2xl font-bold tracking-tight text-slate-400"}>{k.value ?? "—"}</div></CardContent></Card>)}</div>
      {children}
      <CatFilter key={view} sections={sections} theme={palette} />
    </div>
  );
}
