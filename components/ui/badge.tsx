import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", { variants: { variant: { default: "bg-primary text-primary-foreground border-transparent", secondary: "bg-muted text-foreground", outline: "text-foreground", warn: "bg-amber-100 text-amber-900 border-amber-200" } }, defaultVariants: { variant: "default" } });
export function Badge({ className, variant, ...p }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof v>) { return <span className={cn(v({ variant }), className)} {...p} />; }
