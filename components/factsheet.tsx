import Link from "next/link";
import { Building2, ChevronRight, TreePine } from "lucide-react";
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
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">{crumbs.map((c) => <span key={c.label} className="flex items-center gap-1">{c.href ? <Link href={c.href} className="hover:underline">{c.label}</Link> : c.label}<ChevronRight className="h-3 w-3" /></span>)}<span className="font-medium text-foreground">{title}</span></nav>
      <div className="flex items-center gap-3"><LevelIcon k={level.icon} className="h-10 w-10 text-teal-600" /><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">{title}</h1><Badge variant="secondary">{level.label} factsheet</Badge>{preview && <Badge variant="warn">Format preview</Badge>}</div>{level.blurb && <p className="text-sm text-muted-foreground">{level.blurb}</p>}</div></div>
      {level.views && <div className="flex gap-2">{(["rural", "urban"] as View[]).map((v) => <Button key={v} asChild size="sm" variant={v === view ? "default" : "outline"}><Link href={`?view=${v}`} scroll={false}>{v === "rural" ? <TreePine className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}{v === "rural" ? "Rural" : "Urban"}</Link></Button>)}</div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{kpis.map((k) => <Card key={k.label}><CardContent className="p-5"><div className="text-xs text-muted-foreground">{k.label}</div><div className={k.value ? "mt-1 text-2xl font-bold" : "mt-1 text-2xl font-bold text-muted-foreground"}>{k.value ?? "—"}</div></CardContent></Card>)}</div>
      {children}
      <CatFilter key={view} sections={sections} />
    </div>
  );
}
