import Link from "next/link";
import { TreePine } from "lucide-react";
import { Factsheet } from "@/components/factsheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { blockCounts, blocksOf, districtName, gpsOf, nameOf } from "@/lib/locations";
export default function Block({ params: { d, b } }: { params: { d: string; b: string } }) {
  return (
    <Factsheet level={getLevel("block")!} title={nameOf(blocksOf(d), b)} crumbs={[{ label: "Uttar Pradesh", href: "/" }, { label: districtName(d), href: `/district/${d}` }]} counts={blockCounts(d, b)}>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><TreePine className="h-5 w-5 text-teal-600" />Gram Panchayats</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{gpsOf(d, b).map((g) => <Link key={g.slug} href={`/gp/${d}/${b}/${g.slug}`} className="rounded-full border px-3 py-1 text-sm hover:bg-muted">{g.name}</Link>)}</CardContent></Card>
    </Factsheet>
  );
}
