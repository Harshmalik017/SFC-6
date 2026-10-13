import fs from "fs";
import path from "path";
import { ReportsBrowser } from "@/components/reports-browser";

export default function Reports() {
  const note = fs.readFileSync(
    path.join(process.cwd(), "public/docs/Information-Being-Collected-From-Local-Bodies.md"),
    "utf8",
  );
  const blocks = note.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  return (
    <div className="space-y-8">
      <ReportsBrowser />
      <details className="clay-panel group rounded-[26px] p-5">
        <summary className="cursor-pointer list-none text-lg font-semibold text-amber-950 marker:hidden">
          <span className="flex items-center justify-between gap-4">
            Information note
            <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 text-xs font-bold text-white shadow-sm group-open:rotate-180">
              View note
            </span>
          </span>
          <span className="mt-1 block text-sm font-normal text-amber-900/65">
            How local-body data informs the Sixth State Finance Commission.
          </span>
        </summary>
        <article className="mt-5 max-h-[70vh] space-y-3 overflow-y-auto border-t border-amber-200/80 pt-4">
          {blocks.map((block, index) => {
            if (block.startsWith("## ")) {
              return <h2 key={index} className="pt-3 text-base font-semibold text-amber-950">{block.slice(3)}</h2>;
            }
            if (block.startsWith("# ")) {
              return <h1 key={index} className="text-xl font-bold text-amber-950">{block.slice(2)}</h1>;
            }
            return <p key={index} className="text-sm leading-relaxed text-amber-900/75">{block}</p>;
          })}
        </article>
      </details>
    </div>
  );
}
