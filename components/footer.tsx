import { Info } from "lucide-react";
import { COPYRIGHT, DISCLAIMER } from "@/lib/factsheet";
export function Footer() {
  return (
    <footer className="mt-12 border-t border-amber-950/20 bg-gradient-to-r from-[#542817] via-[#6c3218] to-[#8f4315] text-white shadow-[0_-8px_20px_rgba(89,45,20,0.12)]">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center">
        <p className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-sm text-orange-50/90"><Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /><span>{DISCLAIMER}</span></p>
        <p className="mt-4 border-t border-white/15 pt-4 text-center text-sm text-orange-100/80">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
