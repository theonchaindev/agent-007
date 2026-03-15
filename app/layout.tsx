import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MatrixRain from "@/components/MatrixRain";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AGENT 007 — Autonomous Buyback & Burn",
  description: "Autonomous AI agent buying and burning pump.fun dev fees. Licensed to accumulate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bebas.variable}>
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
