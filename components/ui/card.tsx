import * as React from "react";
import { cn } from "@/lib/utils";
export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("rounded-[24px] border border-white/80 bg-[linear-gradient(145deg,#fffdf8,#f4ead9)] text-amber-950 shadow-[9px_9px_22px_rgba(129,91,37,0.12),-8px_-8px_20px_rgba(255,255,255,0.82),inset_1px_1px_0_rgba(255,255,255,0.9)]", className)} {...p} />;
export const CardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col space-y-2 p-5", className)} {...p} />;
export const CardTitle = ({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn("text-base font-semibold leading-tight tracking-tight text-amber-950", className)} {...p} />;
export const CardDescription = ({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn("text-sm leading-relaxed text-amber-900/65", className)} {...p} />;
export const CardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("p-5 pt-0", className)} {...p} />;
