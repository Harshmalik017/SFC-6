import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
      },
      borderRadius: { lg: "0.75rem", md: "0.5rem", sm: "0.25rem" },
      boxShadow: {
        "clay-card": "0 2px 5px rgba(92, 52, 12, 0.04), 0 10px 24px rgba(92, 52, 12, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
        "clay-card-hover": "0 4px 8px rgba(92, 52, 12, 0.05), 0 16px 30px rgba(92, 52, 12, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
        "clay-button": "0 2px 4px rgba(124, 45, 18, 0.14), 0 5px 10px rgba(124, 45, 18, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.42)",
        "clay-button-hover": "0 3px 6px rgba(124, 45, 18, 0.16), 0 8px 15px rgba(124, 45, 18, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.46)",
        "clay-button-pressed": "inset 0 2px 5px rgba(124, 45, 18, 0.18), 0 1px 2px rgba(124, 45, 18, 0.08)",
        "clay-soft": "0 2px 6px rgba(92, 52, 12, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
        "clay-feature": "0 12px 28px rgba(124, 45, 18, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.42)",
        "clay-dialog": "0 18px 44px rgba(64, 28, 10, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
