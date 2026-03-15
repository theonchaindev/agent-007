import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "AGENT 007 — Autonomous Buyback & Burn",
  description: "Autonomous AI agent that buys and burns dev fees from pump.fun. Licensed to accumulate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        <Navigation />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
