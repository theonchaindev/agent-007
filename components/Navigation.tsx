"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "HOME" },
  { href: "/chat", label: "CHAT" },
  { href: "/buybacks", label: "OPERATIONS" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-agent-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-white/60 transition-colors reticle" />
            <div className="absolute inset-[5px] rounded-full border border-white/15" />
            <div className="absolute inset-[9px] rounded-full bg-white group-hover:bg-white/90 transition-colors" />
          </div>
          <span className="text-white text-sm font-bold tracking-[0.25em]">AGENT 007</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                pathname === l.href ? "text-white" : "text-agent-dim hover:text-agent-mid"
              }`}
            >
              {pathname === l.href && <span className="text-agent-red mr-1">▸</span>}
              {l.label}
            </Link>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-agent-green animate-pulse-dot" />
          <span className="font-mono text-[10px] text-agent-dim tracking-[0.15em]">LIVE</span>
        </div>

      </div>
    </nav>
  );
}
