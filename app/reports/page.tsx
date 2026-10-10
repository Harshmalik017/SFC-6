import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelIcon } from "@/components/level-icon";
import { REPORTS } from "@/lib/reports";
export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {REPORTS.map((r) => <Link key={r.id} href={`/reports/${r.id}`}><Card className="h-full transition hover:shadow-md"><CardHeader><LevelIcon k={r.icon} className="h-7 w-7 text-teal-600" /><CardTitle className="pt-2">{r.label}</CardTitle><CardDescription>{r.en.pages.length} PDF pages · {r.en.pages.reduce((a, p) => a + p.tables.length, 0)} tables · English and Hindi</CardDescription></CardHeader><CardContent className="flex justify-end"><ArrowRight className="h-4 w-4" /></CardContent></Card></Link>)}
        <Link href="/reports/information-note"><Card className="h-full transition hover:shadow-md"><CardHeader><BookOpen className="h-7 w-7 text-teal-600" /><CardTitle className="pt-2">Information note (.md)</CardTitle><CardDescription>Information being collected from local bodies and its use for the Commission.</CardDescription></CardHeader><CardContent className="flex justify-end"><ArrowRight className="h-4 w-4" /></CardContent></Card></Link>
      </div>
    </div>
  );
}
