import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[2px_2px_5px_rgba(129,91,37,0.1),inset_1px_1px_0_rgba(255,255,255,0.8)]", { variants: { variant: { default: "border-orange-500/15 bg-gradient-to-r from-orange-500 to-amber-400 text-white", secondary: "border-amber-200 bg-amber-100/80 text-amber-950", outline: "border-amber-200 bg-[#fffaf0] text-amber-900", warn: "border-yellow-300 bg-yellow-100 text-yellow-900" } }, defaultVariants: { variant: "default" } });
export function Badge({ className, variant, ...p }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof v>) { return <span className={cn(v({ variant }), className)} {...p} />; }
