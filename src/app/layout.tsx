import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FL Resilience | Florida Flood Risk & Coastal Preparedness",
  description:
    "Real data on Florida flood risk, NFIP coverage gaps, and sea level rise. Explore solutions to protect your home and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${syne.variable} min-h-screen antialiased bg-slate-950 text-slate-100`}
      >
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
