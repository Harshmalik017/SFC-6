"use client";
import { useEffect, useState } from "react";
import { ArrowUp, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Downloads } from "@/components/fact-table";
import { cn } from "@/lib/utils";
import type { Report } from "@/lib/reports";
export function ReportView({ r, id, pill }: { r: Report; id: string; pill: string }) {
  const [sel, setSel] = useState<number | "all">("all");
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const chip = (on: boolean) => cn("rounded-full border px-2.5 py-0.5 text-xs", on ? "border-slate-900 bg-slate-900 text-white" : "bg-card hover:bg-muted");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-1.5"><span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Filter className="h-3.5 w-3.5" />PDF page</span><button className={chip(sel === "all")} onClick={() => setSel("all")}>All pages ({r.pages.length})</button>{r.pages.map((p) => <button key={p.n} className={chip(sel === p.n)} onClick={() => setSel(p.n)}>{p.n}</button>)}</div>
      {r.pages.filter((p) => sel === "all" || p.n === sel).map((p) => (
        <Card key={p.n}>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">{p.p && <Badge variant="secondary">Page {p.p}</Badge>}{p.cover && <Badge variant="outline">Cover</Badge>}</div>
              <Badge className="border-transparent bg-accent text-white">{pill}</Badge>
            </div>
            {p.h && <p className="text-xs text-muted-foreground">{p.h}</p>}{p.s && <p className="text-sm font-medium">{p.s}</p>}
          </CardHeader>
          <CardContent className="space-y-5">
            {p.cover && <div className="rounded-md bg-muted p-4 text-center font-medium">{p.cover.map((l) => <div key={l}>{l}</div>)}</div>}
            {p.f.length > 0 && <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">{p.f.map(([k, v]) => <div key={k} className="flex gap-2 border-b py-1"><dt className="text-muted-foreground">{k}:</dt><dd>{v || "________"}</dd></div>)}</dl>}
            {p.tables.map((t, i) => (
              <div key={i} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-sm font-semibold">{t.name}</h3>{t.unit && <p className="text-xs text-muted-foreground">{t.unit}</p>}</div><Downloads base={`${id}-${r.lang}-page-${p.n}-table-${i + 1}`} head={t.cols} body={t.rows.map((x) => x.c)} /></div>
                <div className="overflow-x-auto rounded-md border"><table className="w-full min-w-[520px] text-sm"><thead className="bg-accent text-white"><tr>{t.cols.map((c, j) => <th key={j} className="border-b border-white/20 px-2 py-2 text-left text-xs font-medium">{c}</th>)}</tr></thead>
                  <tbody>{t.rows.map((x, j) => <tr key={j} className={cn("border-b last:border-0", x.t === "h" && "bg-muted/60 font-semibold", x.t === "t" && "bg-teal-50 font-semibold")}>{x.c.map((c, k) => <td key={k} className={cn("whitespace-pre-line px-2 py-1.5 align-top", k > 1 && "min-w-[64px] text-muted-foreground")}>{c}</td>)}</tr>)}</tbody></table></div>
              </div>
            ))}
            {p.notes.length > 0 && <ul className="list-disc space-y-0.5 pl-4 text-[11px] text-muted-foreground">{p.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>}
          </CardContent>
        </Card>
      ))}
      {showTop && <Button variant="accent" size="icon" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp className="h-5 w-5" /></Button>}
    </div>
  );
}
