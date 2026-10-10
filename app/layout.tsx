import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: "SFC Dashboard — Sixth State Finance Commission, UP", description: "Location-wise factsheets for local bodies in Uttar Pradesh: District, Block, Gram Panchayat and Urban Local Body." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen font-sans antialiased"><Header /><main className="mx-auto max-w-7xl px-4 py-8">{children}</main><Footer /></body></html>);
}
