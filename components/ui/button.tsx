import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50", { variants: { variant: { default: "bg-primary text-primary-foreground hover:opacity-90", accent: "bg-accent text-accent-foreground hover:opacity-90", ghost: "hover:bg-white/10", outline: "border bg-card hover:bg-muted", green: "bg-green-600 text-white hover:bg-green-700" }, size: { default: "h-10 px-4", sm: "h-8 px-3", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof v> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...p }, ref) => { const C = asChild ? Slot : "button"; return <C ref={ref} className={cn(v({ variant, size }), className)} {...p} />; });
Button.displayName = "Button";
