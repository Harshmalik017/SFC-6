"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelIcon } from "@/components/level-icon";
import { REPORTS } from "@/lib/reports-meta";

const ReportView = dynamic(
  () => import("@/components/report-view").then((module) => module.ReportView),
  { loading: () => <div className="fixed inset-0 z-[70] grid place-items-center bg-amber-950/40 p-4"><div className="clay-panel rounded-2xl px-6 py-4 text-sm font-medium text-amber-950">Preparing report…</div></div> },
);

export function ReportsBrowser() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Source documents</p>
        <h1 className="text-3xl font-bold tracking-tight text-amber-950">Reports & forms</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-amber-900/65">
          Browse the submitted local-body forms in one place. Open a report to filter pages, switch language, and export tables.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {REPORTS.map((report) => (
          <Card key={report.id} className="group flex h-full flex-col transition-transform duration-150 hover:-translate-y-1">
            <CardHeader className="flex-1">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/80 bg-gradient-to-br from-orange-100 to-amber-200 text-orange-700 shadow-[4px_4px_9px_rgba(129,91,37,0.1),-4px_-4px_9px_rgba(255,255,255,0.8)]">
                <LevelIcon k={report.icon} className="h-6 w-6" />
              </div>
              <CardTitle>{report.label}</CardTitle>
              <CardDescription>English and Hindi · Browse form pages and export tables</CardDescription>
            </CardHeader>
            <div className="px-5 pb-5">
              <Button variant="accent" className="w-full" onClick={() => setSelected(report.id)}>
                <FileSpreadsheet className="h-4 w-4" />
                View report
                <ArrowUpRight className="ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {selected && <ReportView id={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
