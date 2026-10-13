"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Building2, Check, TreePine, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelIcon } from "@/components/level-icon";
import { CATS, LEVELS, type Level, type View } from "@/lib/factsheet";

function FormatDialog({ level, onClose }: { level: Level; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<View>("rural");
  const dataset = level.views ? level.views[view] : level;
  const theme = level.theme ?? {
    hero: "from-orange-600 via-orange-500 to-amber-400",
    pill: "bg-amber-100 text-amber-950 ring-amber-200",
    accent: "text-orange-700",
    heading: "text-orange-800",
    card: "from-amber-100 to-orange-50",
    glow: "shadow-orange-500/15",
  };
  const tables = dataset.tables;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="format-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[min(96vw,1120px)] max-w-none overflow-hidden rounded-[28px] border border-white/80 bg-[#f7f0e4] p-0 text-amber-950 shadow-clay-dialog backdrop:bg-amber-950/50"
    >
      <header className={`sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 bg-gradient-to-r ${theme.card} px-5 py-4`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className={`rounded-2xl bg-gradient-to-br ${theme.hero} p-2.5 text-white shadow-md`}>
            <LevelIcon k={level.icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${theme.heading}`}>Factsheet format preview</p>
            <h2 id="format-dialog-title" className="truncate text-lg font-bold text-amber-950">{level.label}</h2>
            {level.blurb && <p className="truncate text-xs text-amber-900/60">{level.blurb}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {level.views && (
            <div className="flex rounded-2xl border border-white/80 bg-[#fffaf0] p-1 shadow-[inset_3px_3px_7px_rgba(129,91,37,0.08),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]" role="group" aria-label="Factsheet view">
              {(["rural", "urban"] as View[]).map((item) => (
                <button
                  key={item}
                  aria-pressed={view === item}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${view === item ? `bg-gradient-to-br ${theme.hero} text-white shadow-clay-button` : "text-amber-900/65 hover:bg-white/70 hover:text-amber-950"}`}
                  onClick={() => setView(item)}
                >
                  {item === "rural" ? <TreePine className="h-3.5 w-3.5" aria-hidden="true" /> : <Building2 className="h-3.5 w-3.5" aria-hidden="true" />}
                  {item === "rural" ? "Rural" : "Urban"}
                </button>
              ))}
            </div>
          )}
          <Button variant="outline" size="icon" aria-label="Close format preview" onClick={onClose} autoFocus>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="max-h-[calc(92dvh-88px)] space-y-5 overflow-y-auto p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warn">Structure preview · Department data not loaded</Badge>
          <Badge variant="secondary">{tables.length} tables</Badge>
          <Badge variant="secondary">{tables.reduce((total, table) => total + table.rows.length, 0)} indicators</Badge>
          {level.views && <Badge className={theme.pill}>{view === "rural" ? "Rural" : "Urban"} format</Badge>}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dataset.kpis.map((kpi) => (
            <div key={kpi.label} className={`rounded-2xl border border-white/80 bg-gradient-to-br ${theme.card} p-4 shadow-clay-soft`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-900/60">Key indicator</p>
              <p className="mt-1 text-sm font-semibold text-amber-950">{kpi.label}</p>
              <p className="mt-3 text-lg font-bold text-amber-900/35">{kpi.value ?? "—"}</p>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          {CATS.filter((category) => tables.some((table) => table.cat === category)).map((category) => (
            <section key={category} className="space-y-3">
              <h3 className={`border-b border-amber-200/80 pb-2 text-base font-bold ${theme.heading}`}>{category}</h3>
              <div className="grid gap-3 lg:grid-cols-2">
                {tables.filter((table) => table.cat === category).map((table) => (
                  <article key={table.id} className="rounded-2xl border border-white/80 bg-[#fffaf0] p-4 shadow-clay-soft">
                    <div className={`mb-3 h-1 rounded-full bg-gradient-to-r ${theme.hero}`} />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-amber-950">{table.title}</h4>
                        <p className="mt-1 text-[11px] text-amber-900/55">{table.unit}{table.src ? ` · ${table.src}` : ""}</p>
                      </div>
                      <Badge variant="outline">{table.rows.length} indicators</Badge>
                    </div>
                    {table.cols.length > 0 && (
                      <p className="mt-3 rounded-xl bg-amber-100/65 px-3 py-2 text-[11px] text-amber-900/70">
                        Periods: {table.cols.join(" · ")}
                      </p>
                    )}
                    <ul className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                      {table.rows.map((row, index) => {
                        const label = typeof row === "string" ? row : row[0];
                        return (
                          <li key={`${table.id}-${index}`} className="flex items-start gap-2 text-xs leading-relaxed text-amber-950/80">
                            <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${theme.accent}`} />
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
          <section className="rounded-2xl border border-white/80 bg-[#fffaf0] p-4 shadow-clay-soft">
            <h3 className={`text-sm font-bold ${theme.heading}`}>Data quality checks</h3>
            <p className="mt-1 text-xs text-amber-900/60">Checks are defined for this factsheet and will run once department data is loaded.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {level.checks.map((check) => <Badge key={check} variant="secondary">{check.toUpperCase()}</Badge>)}
            </div>
          </section>
        </div>
      </div>
    </dialog>
  );
}

export function FactsheetFormatsBrowser() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLevel = LEVELS.find((level) => level.slug === selected);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Indicator catalog</p>
        <h1 className="text-3xl font-bold tracking-tight text-amber-950">Factsheet formats</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-amber-900/65">
          Compare the indicators and table structure used at each local-government level. Open a format to preview its KPIs, sections, periods, and data-quality checks.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {LEVELS.map((level) => {
          const tables = level.views ? [...level.views.rural.tables, ...level.views.urban.tables] : level.tables;
          const tableCount = level.views ? level.views.rural.tables.length : tables.length;
          const indicatorCount = level.views
            ? Math.max(
                level.views.rural.tables.reduce((sum, table) => sum + table.rows.length, 0),
                level.views.urban.tables.reduce((sum, table) => sum + table.rows.length, 0),
              )
            : tables.reduce((sum, table) => sum + table.rows.length, 0);
          const theme = level.theme;

          return (
            <Card key={level.slug} className="group flex h-full flex-col transition-all duration-150 hover:-translate-y-1 hover:shadow-clay-card-hover">
              <CardHeader className="flex-1">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/80 bg-gradient-to-br ${theme?.hero ?? "from-orange-600 to-amber-400"} text-white shadow-clay-soft`}>
                  <LevelIcon k={level.icon} className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <CardTitle>{level.label}</CardTitle>
                  <Badge className={theme?.pill}>{level.views ? "Rural + Urban" : "Rural"}</Badge>
                </div>
                <CardDescription>{level.blurb || "State-wide overview of local-body factsheet indicators."}</CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">{tableCount} tables per view</Badge>
                  <Badge variant="secondary">{indicatorCount} indicators</Badge>
                </div>
              </CardHeader>
              <div className="px-5 pb-5">
                <Button variant="accent" className="w-full" onClick={() => setSelected(level.slug)}>
                  <BookOpen className="h-4 w-4" />
                  View format
                  <ArrowUpRight className="ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      {selectedLevel && <FormatDialog key={selectedLevel.slug} level={selectedLevel} onClose={() => setSelected(null)} />}
    </section>
  );
}
