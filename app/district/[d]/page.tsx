import Link from "next/link";
import { Building2, LayoutGrid } from "lucide-react";
import { Factsheet } from "@/components/factsheet";
import { LocationPicker } from "@/components/location-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DISTRICTS } from "@/lib/districts";
import { getLevel } from "@/lib/factsheet";
import { BODY_TYPES, blocksOf, bodiesOf, districtCounts, districtName } from "@/lib/locations";
export const generateStaticParams = () => DISTRICTS.map((x) => ({ d: x.slug }));
const chip = "rounded-full border px-3 py-1 text-sm hover:bg-muted";
export default function District({ params: { d }, searchParams }: { params: { d: string }; searchParams: { view?: string } }) {
  const view = searchParams.view === "urban" ? "urban" : "rural";
  return (
    <Factsheet level={getLevel("district")!} title={districtName(d)} crumbs={[{ label: "Uttar Pradesh", href: "/" }]} view={view} counts={districtCounts(d)}>
      <LocationPicker key={view} district={d} view={view} />
      {view === "rural" ? (
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><LayoutGrid className="h-5 w-5 text-teal-600" />Blocks (Kshetra Panchayats)</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{blocksOf(d).map((b) => <Link key={b.slug} href={`/block/${d}/${b.slug}`} className={chip}>{b.name}</Link>)}</CardContent></Card>
      ) : (
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-teal-600" />Urban local bodies</CardTitle></CardHeader><CardContent className="space-y-3">{BODY_TYPES.map((t) => <div key={t.slug}><p className="mb-1 text-xs font-medium text-muted-foreground">{t.name}</p><div className="flex flex-wrap gap-2">{bodiesOf(d, t.slug).map((n) => <Link key={n.slug} href={`/urban/${d}/${t.slug}/${n.slug}`} className={chip}>{n.name}</Link>)}</div></div>)}</CardContent></Card>
      )}
    </Factsheet>
  );
}
