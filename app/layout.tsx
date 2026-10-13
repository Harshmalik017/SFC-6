import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  metadataBase: new URL("https://sfcsixth.vercel.app/"),
  title: "SFC Dashboard — Sixth State Finance Commission, UP",
  description: "Location-wise factsheets for local bodies in Uttar Pradesh: District, Block, Gram Panchayat and Urban Local Body.",
  openGraph: {
    title: "SFC Dashboard — Sixth State Finance Commission, UP",
    description: "Location-wise factsheets and local-body reports for Uttar Pradesh.",
    url: "https://sfcsixth.vercel.app/",
    siteName: "SFC Dashboard",
    type: "website",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen font-sans antialiased"><Header /><main className="mx-auto max-w-7xl px-4 py-8">{children}</main><Footer /></body></html>);
}
