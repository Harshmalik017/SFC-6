import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]", { variants: { variant: { default: "border-transparent bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-sm", secondary: "border-slate-200 bg-slate-100 text-slate-700", outline: "border-slate-300 bg-white text-slate-700", warn: "border-amber-200 bg-amber-100 text-amber-900" } }, defaultVariants: { variant: "default" } });
export function Badge({ className, variant, ...p }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof v>) { return <span className={cn(v({ variant }), className)} {...p} />; }
