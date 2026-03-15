import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AGENT 007 — Autonomous Buyback Bot",
  description: "The most sophisticated autonomous buyback and burn agent on Solana. Licensed to accumulate.",
  openGraph: {
    title: "AGENT 007",
    description: "Autonomous buyback & burn agent. Licensed to accumulate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian min-h-screen">
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
