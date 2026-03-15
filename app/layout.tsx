import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MatrixRain from "@/components/MatrixRain";

export const metadata: Metadata = {
  title: "AGENT 007 — Autonomous Buyback & Burn",
  description: "Autonomous AI agent buying and burning pump.fun dev fees. Licensed to accumulate.",
  icons: {
    icon: "/bond.png",
    apple: "/bond.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        <MatrixRain />
        <div className="relative z-10">
          <Navigation />
          <main className="pt-14">{children}</main>
        </div>
      </body>
    </html>
  );
}
