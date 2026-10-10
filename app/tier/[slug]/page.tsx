import { notFound } from "next/navigation";
import { CheckCircle2, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReceiptsChart } from "@/components/receipts-chart";
import { TierIcon } from "@/components/tier-icon";
import { TIERS, YEARS } from "@/lib/data";
export function generateStaticParams() { return TIERS.map((t) => ({ slug: t.slug })); }
export default function TierPage({ params }: { params: { slug: string } }) {
  const t = TIERS.find((x) => x.slug === params.slug); if (!t) notFound();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><TierIcon k={t.icon} className="h-9 w-9 text-teal-600" /><div><h1 className="text-2xl font-bold">{t.name}</h1><p className="text-sm text-muted-foreground">{t.blurb} Amounts in {t.unit}; years {YEARS[0]} to {YEARS[4]}.</p></div></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.kpis.map((k) => <Card key={k}><CardContent className="p-5"><div className="text-xs text-muted-foreground">{k}</div><div className="mt-1 text-2xl font-bold text-muted-foreground">—</div><Badge variant="warn" className="mt-2">Data pending</Badge></CardContent></Card>)}</div>
      <Card><CardHeader><div className="flex flex-wrap items-center gap-2"><CardTitle>Trend by source</CardTitle><Badge variant="warn">Illustrative data</Badge></div></CardHeader><CardContent><ReceiptsChart /></CardContent></Card>
      <Card><CardHeader><CardTitle>Form sections to be analysed</CardTitle><CardDescription>Each section becomes a drill-down module once data is loaded.</CardDescription></CardHeader><CardContent><ul className="grid gap-2 sm:grid-cols-2">{t.sections.map((s, i) => <li key={s} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-teal-600" />{i + 1}. {s}</li>)}</ul></CardContent></Card>
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><Database className="h-4 w-4" /> Filters by District / Block / AC / PC activate when location files are added.</p>
    </div>
  );
}
