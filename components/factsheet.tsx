import Link from "next/link";
import Image from "next/image";
import { Building2, ChevronRight, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FactTable } from "@/components/fact-table";
import { Triangulation } from "@/components/triangulation";
import { CatFilter } from "@/components/cat-filter";
import { LevelIcon } from "@/components/level-icon";
import { CATS, resolve, type Level, type View } from "@/lib/factsheet";
import type { Counts } from "@/lib/locations";
export type Crumb = { label: string; href?: string };
export function Factsheet({ level, title, crumbs, preview, view = "rural", counts = {}, hideSource = false, hideTitle = false, children }: { level: Level; title: string; crumbs: Crumb[]; preview?: boolean; view?: View; counts?: Counts; hideSource?: boolean; hideTitle?: boolean; children?: React.ReactNode }) {
  const { tables } = resolve(level, view, counts);
  const scope = [...crumbs.map((c) => c.label), title, level.views ? view : ""].join("-");
  const palette = level.theme ?? { hero: "from-orange-600 via-orange-500 to-amber-400", pill: "bg-amber-100 text-amber-950 ring-amber-200", accent: "text-amber-300", heading: "text-orange-800", card: "from-amber-300/20 via-orange-100/55 to-[#fffaf0]", glow: "shadow-orange-500/15" };
  const isState = level.slug === "state";
  const isDistrict = level.slug === "district";
  const sections = [...CATS.filter((c) => tables.some((t) => t.cat === c)).map((c) => ({ cat: c as string, node: <div className="space-y-4">{tables.filter((t) => t.cat === c).map((t) => <FactTable key={t.id} t={t} scope={scope} counts={counts} showSource={!hideSource} theme={palette} />)}</div> })), { cat: "Data quality", node: <Triangulation ids={level.checks} scope={scope} theme={palette} /> }];
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-amber-900/55">{crumbs.map((c) => <span key={c.label} className="flex items-center gap-1">{c.href ? <Link href={c.href} className="transition hover:text-orange-700 hover:underline">{c.label}</Link> : c.label}<ChevronRight className="h-3 w-3" /></span>)}<span className="font-semibold text-amber-950">{title}</span></nav>
      <div className={`relative overflow-hidden rounded-[30px] border border-white/65 bg-gradient-to-br ${palette.hero} p-6 ${isState ? "min-h-[230px] text-amber-950 sm:min-h-[260px] sm:p-8" : "text-white"} shadow-clay-feature ${palette.glow}`}>
        {isState && (
          <>
            <Image
              src="/images/uttar-pradesh-dashboard-hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-[68%_center] sm:object-center"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#fff8e8]/95 via-[#fff8e8]/85 to-[#fff8e8]/10 sm:via-[#fff8e8]/75" />
          </>
        )}
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className={`rounded-[20px] border p-3 shadow-clay-soft ${isState ? "border-orange-900/10 bg-white/65" : "border-white/35 bg-white/15"}`}><LevelIcon k={level.icon} className={`h-8 w-8 ${isState ? "text-orange-700" : palette.accent}`} /></div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className={`${hideTitle ? "sr-only" : "text-2xl font-bold tracking-tight md:text-3xl"}`}>{title}</h1>
                <Badge className={`${palette.pill} ring-1`}>{level.label} factsheet</Badge>
                {preview && <Badge variant="warn" className="border-white/20 bg-white/15 text-white ring-1 ring-white/20">Format preview</Badge>}
              </div>
              {level.blurb && <p className="max-w-2xl text-sm text-orange-50/90">{level.blurb}</p>}
              {isState && <p className="mt-2 max-w-md text-sm leading-relaxed text-amber-950/75">Explore local-government factsheets across Uttar Pradesh, from rural communities to urban centres.</p>}
            </div>
          </div>
          {isDistrict && (
            <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/25 bg-white/15 p-1.5 shadow-clay-soft" role="group" aria-label="Factsheet view">
              {(["rural", "urban"] as View[]).map((area) => (
                <Link key={area} href={`?view=${area}`} scroll={false} aria-current={area === view ? "page" : undefined} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${area === view ? "bg-white text-amber-950 shadow-clay-button" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
                  {area === "rural" ? <TreePine className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  {area === "rural" ? "Rural" : "Urban"}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
      {!isState && <CatFilter key={view} sections={sections} theme={palette} />}
    </div>
  );
}
