import Link from "next/link";
import { Building2, ChevronRight, Sparkles, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const palette = level.theme ?? { hero: "from-orange-600 via-orange-500 to-amber-400", pill: "bg-amber-100 text-amber-950 ring-amber-200", accent: "text-amber-300", heading: "text-orange-800", card: "from-amber-300/20 via-orange-100/55 to-[#fffaf0]", glow: "shadow-orange-500/15" };
  const sections = [...CATS.filter((c) => tables.some((t) => t.cat === c)).map((c) => ({ cat: c as string, node: <div className="space-y-4">{tables.filter((t) => t.cat === c).map((t) => <FactTable key={t.id} t={t} scope={scope} counts={counts} showSource={!hideSource} theme={palette} />)}</div> })), { cat: "Data quality", node: <Triangulation ids={level.checks} scope={scope} theme={palette} /> }];
  const tone = [palette.card, palette.card, palette.card, palette.card];
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-amber-900/55">{crumbs.map((c) => <span key={c.label} className="flex items-center gap-1">{c.href ? <Link href={c.href} className="transition hover:text-orange-700 hover:underline">{c.label}</Link> : c.label}<ChevronRight className="h-3 w-3" /></span>)}<span className="font-semibold text-amber-950">{title}</span></nav>
      <div className={`overflow-hidden rounded-[30px] border border-white/65 bg-gradient-to-br ${palette.hero} p-6 text-white shadow-clay-feature ${palette.glow}`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-[20px] border border-white/35 bg-white/15 p-3 shadow-clay-soft"><LevelIcon k={level.icon} className={`h-8 w-8 ${palette.accent}`} /></div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                <Badge className={`${palette.pill} ring-1`}>{level.label} factsheet</Badge>
                {preview && <Badge variant="warn" className="border-white/20 bg-white/15 text-white ring-1 ring-white/20">Format preview</Badge>}
              </div>
              {level.blurb && <p className="max-w-2xl text-sm text-orange-50/90">{level.blurb}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-3 py-2 text-sm text-white shadow-clay-soft">
            <Sparkles className={`h-4 w-4 ${palette.accent}`} />
            <span>{view === "rural" ? "Rural lens" : "Urban lens"}</span>
          </div>
        </div>
      </div>
      {level.views && <div className="inline-flex w-fit flex-wrap gap-1 rounded-2xl border border-white/80 bg-[#f7f0e4] p-1.5 shadow-[inset_4px_4px_9px_rgba(129,91,37,0.09),inset_-4px_-4px_9px_rgba(255,255,255,0.85)]" role="group" aria-label="Factsheet view">{(["rural", "urban"] as View[]).map((v) => <Link key={v} href={`?view=${v}`} scroll={false} aria-current={v === view ? "page" : undefined} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${v === view ? `bg-gradient-to-br ${palette.hero} text-white shadow-clay-button` : "text-amber-900/65 hover:bg-white/70 hover:text-amber-950"}`}>{v === "rural" ? <TreePine className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}{v === "rural" ? "Rural" : "Urban"}</Link>)}</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((k, i) => <Card key={k.label} className={`overflow-hidden bg-gradient-to-br ${tone[i % tone.length]} border-white/80`}><CardContent className="p-5"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-900/65">{k.label}</span><span className={`h-3 w-3 rounded-full border border-white/70 bg-gradient-to-br ${palette.hero} shadow-[2px_2px_5px_rgba(154,79,10,0.22),inset_1px_1px_1px_rgba(255,255,255,0.6)]`} /></div><div className={k.value ? "text-2xl font-bold tracking-tight text-amber-950" : "text-2xl font-bold tracking-tight text-amber-900/40"}>{k.value ?? "—"}</div></CardContent></Card>)}</div>
      {children}
      <CatFilter key={view} sections={sections} theme={palette} />
    </div>
  );
}
