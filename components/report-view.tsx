"use client";
import { useEffect, useRef, useState } from "react";
import { Filter, Languages, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Downloads } from "@/components/fact-table";
import { cn } from "@/lib/utils";
import { REPORTS } from "@/lib/reports";

export function ReportView({ id, onClose }: { id: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const [sel, setSel] = useState<number | "all">("all");
  const selectedReport = REPORTS.find((report) => report.id === id);
  const report = selectedReport?.[lang];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const chip = (on: boolean) => cn(
    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
    on
      ? "border-orange-500/15 bg-gradient-to-br from-orange-600 to-amber-400 text-white shadow-[4px_4px_9px_rgba(154,79,10,0.18),inset_1px_1px_0_rgba(255,255,255,0.3)]"
      : "border-white/80 bg-[#fffaf0] text-amber-900 shadow-[3px_3px_7px_rgba(129,91,37,0.08),-3px_-3px_7px_rgba(255,255,255,0.8)] hover:text-orange-800",
  );

  if (!selectedReport || !report) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="report-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[min(96vw,1280px)] max-w-none overflow-hidden rounded-[28px] border border-white/80 bg-[#f7f0e4] p-0 text-amber-950 shadow-[12px_14px_32px_rgba(64,28,10,0.32),inset_1px_1px_0_rgba(255,255,255,0.8)] backdrop:bg-amber-950/50"
    >
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700">Report viewer</p>
          <h2 id="report-dialog-title" className="truncate text-lg font-bold text-amber-950">{selectedReport.label}</h2>
          <p className="truncate text-xs text-amber-900/60">{report.title}{report.subtitle ? ` — ${report.subtitle}` : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl border border-white/80 bg-[#fffaf0] p-1 shadow-[inset_3px_3px_7px_rgba(129,91,37,0.08),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]" role="group" aria-label="Report language">
            {(["hi", "en"] as const).map((value) => (
              <button key={value} className={chip(lang === value)} onClick={() => setLang(value)}>
                {value === "hi" ? "हिन्दी" : "English"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" aria-label="Close report" onClick={onClose} autoFocus>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-[calc(92dvh-88px)] space-y-5 overflow-y-auto p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 pr-1 text-xs font-semibold text-amber-900/65"><Filter className="h-3.5 w-3.5 text-orange-600" />PDF page</span>
          <button className={chip(sel === "all")} onClick={() => setSel("all")}>All pages ({report.pages.length})</button>
          {report.pages.map((page) => (
            <button key={page.n} className={chip(sel === page.n)} onClick={() => setSel(page.n)}>{page.n}</button>
          ))}
          <span className="ml-auto flex items-center gap-1 text-[11px] text-amber-900/55"><Languages className="h-3.5 w-3.5" />{lang === "hi" ? "Hindi" : "English"}</span>
        </div>

        {report.pages.filter((page) => sel === "all" || page.n === sel).map((page) => (
          <Card key={page.n}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {page.p && <Badge variant="secondary">Page {page.p}</Badge>}
                  {page.cover && <Badge variant="outline">Cover</Badge>}
                </div>
                <Badge>{selectedReport.pill}</Badge>
              </div>
              {page.h && <p className="text-xs text-amber-900/55">{page.h}</p>}
              {page.s && <p className="text-sm font-medium text-amber-950">{page.s}</p>}
            </CardHeader>
            <CardContent className="space-y-5">
              {page.cover && <div className="rounded-2xl border border-amber-100 bg-[#f8efdf] p-4 text-center font-medium shadow-[inset_3px_3px_8px_rgba(129,91,37,0.06),inset_-3px_-3px_8px_rgba(255,255,255,0.8)]">{page.cover.map((line) => <div key={line}>{line}</div>)}</div>}
              {page.f.length > 0 && <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">{page.f.map(([key, value]) => <div key={key} className="flex gap-2 border-b border-amber-200/70 py-1"><dt className="text-amber-900/60">{key}:</dt><dd className="text-amber-950">{value || "________"}</dd></div>)}</dl>}
              {page.tables.map((table, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div><h3 className="text-sm font-semibold text-amber-950">{table.name}</h3>{table.unit && <p className="text-xs text-amber-900/55">{table.unit}</p>}</div>
                    <Downloads base={`${id}-${report.lang}-page-${page.n}-table-${index + 1}`} head={table.cols} body={table.rows.map((row) => row.c)} />
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-amber-200/80 bg-[#fffdf8] shadow-[inset_3px_3px_8px_rgba(129,91,37,0.06),inset_-3px_-3px_8px_rgba(255,255,255,0.8)]">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead className="bg-gradient-to-r from-orange-600 to-amber-500 text-white"><tr>{table.cols.map((column, columnIndex) => <th key={columnIndex} className="border-b border-white/20 px-2 py-2 text-left text-xs font-semibold">{column}</th>)}</tr></thead>
                      <tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex} className={cn("border-b border-amber-100/80 last:border-0", row.t === "h" && "bg-amber-100/70 font-semibold", row.t === "t" && "bg-orange-100/70 font-semibold")}>{row.c.map((cell, cellIndex) => <td key={cellIndex} className={cn("whitespace-pre-line px-2 py-1.5 align-top", cellIndex > 1 && "min-w-[64px] text-amber-900/65")}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </div>
              ))}
              {page.notes.length > 0 && <ul className="list-disc space-y-0.5 pl-4 text-[11px] text-amber-900/60">{page.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>}
            </CardContent>
          </Card>
        ))}
      </div>
    </dialog>
  );
}
