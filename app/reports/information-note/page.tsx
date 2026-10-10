import fs from "fs";
import path from "path";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function Note() {
  const md = fs.readFileSync(path.join(process.cwd(), "public/docs/Information-Being-Collected-From-Local-Bodies.md"), "utf8");
  const blocks = md.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground"><Link href="/reports" className="hover:underline">Reports</Link><ChevronRight className="h-3 w-3" /><span className="font-medium text-foreground">Information note</span></nav>
      {blocks.map((b, i) => b.startsWith("## ") ? <h2 key={i} className="border-b pb-1 pt-4 text-lg font-semibold">{b.slice(3)}</h2> : b.startsWith("# ") ? <h1 key={i} className="text-2xl font-bold">{b.slice(2)}</h1> : <p key={i} className="text-sm leading-relaxed">{b}</p>)}
    </article>
  );
}
