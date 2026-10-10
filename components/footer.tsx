import { Info } from "lucide-react";
import { COPYRIGHT, DISCLAIMER } from "@/lib/factsheet";
export function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center">
        <p className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-sm text-white"><Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" /><span>{DISCLAIMER}</span></p>
        <p className="mt-4 border-t border-white/10 pt-4 text-center text-sm text-white">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
