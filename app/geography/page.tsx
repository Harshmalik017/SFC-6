import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATASETS } from "@/lib/data";
const chain = ["Parliamentary Constituency", "Assembly Constituency", "District", "Block (Kshetra Panchayat)", "Gram Panchayat"];
export default function Geography() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Geography</h1><p className="text-sm text-muted-foreground">Location hierarchy used for aggregation and filters.</p></div>
      <Card><CardHeader><CardTitle>Hierarchy</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center gap-2">{chain.map((c, i) => <span key={c} className="flex items-center gap-2"><Badge variant="secondary">{c}</Badge>{i < chain.length - 1 && <ChevronRight className="h-4 w-4" />}</span>)}</CardContent></Card>
      <div className="grid gap-4 md:grid-cols-2">{DATASETS.map((d) => <Card key={d.n}><CardHeader><div className="flex items-center justify-between gap-2"><CardTitle>#{d.n} {d.name}</CardTitle><Badge variant={d.required === "Required" ? "default" : "outline"}>{d.required}</Badge></div><CardDescription>{d.role}</CardDescription></CardHeader><CardContent><Badge variant="warn">Loads in v0.2</Badge></CardContent></Card>)}</div>
      <Card><CardHeader><CardTitle>Known gap</CardTitle><CardDescription>Urban local bodies have no mapping to Assembly Constituency in the four files. Provide a ULB to district/AC mapping, or ULBs roll up to district only.</CardDescription></CardHeader></Card>
    </div>
  );
}
