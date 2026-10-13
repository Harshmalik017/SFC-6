"use client";
import { FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nr, type Theme, type Tbl } from "@/lib/factsheet";
import type { Counts } from "@/lib/locations";
function save(name: string, mime: string, body: string) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["\ufeff" + body], { type: mime + ";charset=utf-8" })); a.download = name; a.click(); URL.revokeObjectURL(a.href); }
export function Downloads({ base, head, body }: { base: string; head: string[]; body: string[][] }) {
  const csv = () => save(`${base}.csv`, "text/csv", [head, ...body].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n"));
  const esc = (c: string) => c.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const xls = () => save(`${base}.xls`, "application/vnd.ms-excel", `<table><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>${body.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`);
  return <div className="flex flex-wrap gap-2"><Button size="sm" variant="green" onClick={xls}><FileSpreadsheet className="h-4 w-4" />Excel</Button><Button size="sm" variant="green" onClick={csv}><FileText className="h-4 w-4" />CSV</Button></div>;
}
export function FactTable({ t, scope, counts = {}, showSource, theme }: { t: Tbl; scope: string; counts?: Counts; showSource: boolean; theme: Theme }) {
  const rows = t.rows.map(nr);
  const base = `${scope}-${t.id}`.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
  const head = ["Indicator", "Unit", ...t.cols, "Numerator", "Denominator"];
  const body = rows.map((r) => [r.l, r.u ?? t.unit, ...t.cols.map((_, i) => (i === 0 ? counts[r.l] ?? "" : "")), r.n ?? "", r.d ?? ""]);
  const ratios = rows.filter((r) => r.n);
  return (
    <Card className="overflow-hidden">
      <div className={`h-1.5 bg-gradient-to-r ${theme.hero}`} />
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"><div className="flex flex-wrap items-center gap-2"><CardTitle>{t.title}</CardTitle><Badge variant="warn">Awaiting department data</Badge></div><Downloads base={base} head={head} body={body} /></CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-2xl border border-amber-200/80 bg-[#fffdf8] shadow-[inset_3px_3px_8px_rgba(129,91,37,0.06),inset_-3px_-3px_8px_rgba(255,255,255,0.8)]"><table className="w-full min-w-[560px] text-sm"><thead className={`bg-gradient-to-r ${theme.hero} text-white`}><tr><th className="border-b border-white/20 py-2 pl-3 pr-3 text-left text-xs font-semibold">Indicator</th><th className="border-b border-white/20 px-2 py-2 text-left text-xs font-semibold">Unit</th>{t.cols.map((c) => <th key={c} className="border-b border-white/20 px-2 py-2 text-right text-xs font-semibold">{c}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r.l} className="border-b border-amber-100/80 transition-colors last:border-0 hover:bg-amber-50/70"><td className="py-2 pl-3 pr-3 text-amber-950">{r.l}</td><td className="px-2 py-2 text-xs text-amber-900/60">{r.u ?? t.unit}</td>{t.cols.map((c, i) => <td key={c} className={i === 0 && counts[r.l] ? "px-2 py-2 text-right font-semibold text-orange-800" : "px-2 py-2 text-right text-amber-900/45"}>{i === 0 ? counts[r.l] ?? "—" : "—"}</td>)}</tr>)}</tbody></table></div>
        {ratios.length > 0 && <ul className="mt-3 list-disc space-y-0.5 pl-4 text-[11px] leading-snug text-muted-foreground">{ratios.map((r) => <li key={r.l}><b className="font-medium text-foreground/80">{r.l}</b> — Numerator: {r.n}; Denominator: {r.d}.</li>)}</ul>}
        {showSource && t.src && <p className="mt-2 text-[11px] text-muted-foreground">Source: {t.src}</p>}
      </CardContent>
    </Card>
  );
}
