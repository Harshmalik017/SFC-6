import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportView } from "@/components/report-view";
import { REPORTS } from "@/lib/reports";
export const generateStaticParams = () => REPORTS.map((r) => ({ id: r.id }));
export default function Report({ params, searchParams }: { params: { id: string }; searchParams: { lang?: string } }) {
  const rep = REPORTS.find((r) => r.id === params.id); if (!rep) notFound();
  const lang = searchParams.lang === "en" ? "en" : "hi"; const r = rep[lang];
  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground"><Link href="/reports" className="hover:underline">Reports</Link><ChevronRight className="h-3 w-3" /><span className="font-medium text-foreground">{rep.label}</span></nav>
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold">{rep.label}</h1><p className="text-sm text-muted-foreground">{r.title}{r.subtitle ? ` — ${r.subtitle}` : ""}</p></div>
        <div className="flex gap-2">{(["en", "hi"] as const).map((l) => <Button key={l} asChild size="sm" variant={l === lang ? "default" : "outline"}><Link href={`?lang=${l}`} scroll={false}>{l === "en" ? "English" : "हिन्दी"}</Link></Button>)}</div></div>
      <ReportView key={lang} r={r} id={rep.id} pill={rep.pill} />
    </div>
  );
}
