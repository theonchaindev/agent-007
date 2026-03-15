"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",          label: "HOME" },
  { href: "/buybacks",  label: "OPERATIONS" },
];

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-m-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full border border-m-green/30 group-hover:border-m-green/60 transition-colors reticle" />
            <div className="absolute inset-[5px] rounded-full border border-m-green/15" />
            <div className="absolute inset-[9px] rounded-full bg-m-green group-hover:bg-m-bright transition-colors" />
          </div>
          <span className="text-m-green text-sm font-bold tracking-[0.25em]">AGENT 007</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                path === l.href ? "text-m-green" : "text-m-dim hover:text-m-mid"
              }`}
            >
              {path === l.href && <span className="text-m-red mr-1">▸</span>}
              {l.label}
            </Link>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-m-green animate-pulse-dot" />
          <span className="font-mono text-[10px] text-m-dim tracking-[0.15em]">LIVE</span>
        </div>

      </div>
    </nav>
  );
}
