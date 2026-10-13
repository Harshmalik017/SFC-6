import Link from "next/link";
import { TreePine } from "lucide-react";
import { Factsheet } from "@/components/factsheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLevel } from "@/lib/factsheet";
import { blockCounts, blocksOf, districtName, gpsOf, nameOf } from "@/lib/locations";
export default function Block({ params: { d, b } }: { params: { d: string; b: string } }) {
  return (
    <Factsheet level={getLevel("block")!} title={nameOf(blocksOf(d), b)} crumbs={[{ label: "Uttar Pradesh", href: "/" }, { label: districtName(d), href: `/district/${d}` }]} counts={blockCounts(d, b)}>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><TreePine className="h-5 w-5 text-orange-600" />Gram Panchayats</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{gpsOf(d, b).map((g) => <Link key={g.slug} href={`/gp/${d}/${b}/${g.slug}`} className="rounded-full border border-white/80 bg-[#fffaf0] px-3 py-1.5 text-sm text-amber-950 shadow-[3px_3px_7px_rgba(129,91,37,0.08),-3px_-3px_7px_rgba(255,255,255,0.8)] transition hover:text-orange-800">{g.name}</Link>)}</CardContent></Card>
    </Factsheet>
  );
}
