"use client";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Downloads } from "@/components/fact-table";
import { CHECKS } from "@/lib/factsheet";
export function Triangulation({ ids, scope }: { ids: string[]; scope: string }) {
  const rows = CHECKS.filter((c) => ids.includes(c.id));
  const head = ["Check", "Rule", "Tables compared", "Method", "Status"];
  const body = rows.map((c) => [c.name, c.rule, c.tables, c.method, "Runs when data is loaded"]);
  return (
    <Card>
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"><div className="flex flex-wrap items-center gap-2"><ShieldCheck className="h-5 w-5 text-teal-600" /><CardTitle>Data triangulation checks</CardTitle><Badge variant="warn">Checks passed: — %</Badge></div><Downloads base={`${scope}-triangulation`.toLowerCase().replace(/[^a-z0-9-]+/g, "-")} head={head} body={body} /></CardHeader>
      <CardContent>
        <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm"><thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2 pr-3 font-medium">Check</th><th className="px-2 py-2 font-medium">Rule</th><th className="px-2 py-2 font-medium">Tables compared</th><th className="px-2 py-2 font-medium">Method</th></tr></thead><tbody>{rows.map((c) => <tr key={c.id} className="border-b align-top last:border-0"><td className="py-2 pr-3 font-medium">{c.name}</td><td className="px-2 py-2">{c.rule}</td><td className="px-2 py-2 text-muted-foreground">{c.tables}</td><td className="px-2 py-2 text-muted-foreground">{c.method}</td></tr>)}</tbody></table></div>
        <ul className="mt-3 list-disc space-y-0.5 pl-4 text-[11px] text-muted-foreground"><li>Checks passed (%) — Numerator: checks passed; Denominator: checks applicable to the body.</li><li>Flagged values stay visible with a review marker; they are not silently corrected.</li></ul>
      </CardContent>
    </Card>
  );
}
