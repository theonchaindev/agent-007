"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/chat", label: "CHAT" },
  { href: "/buybacks", label: "BUYBACKS" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-obsidian-border bg-obsidian/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            {/* Gun barrel circle */}
            <div className="absolute inset-0 rounded-full border-2 border-gold group-hover:border-gold-light transition-colors" />
            <div className="absolute inset-[4px] rounded-full border border-gold/40" />
            <div className="absolute inset-[7px] rounded-full bg-gold group-hover:bg-gold-light transition-colors" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold text-lg tracking-wider">AGENT</span>
            <span className="text-gold font-bold text-lg tracking-widest">007</span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest font-medium transition-colors ${
                pathname === link.href
                  ? "text-gold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/40 tracking-wider font-mono">ACTIVE</span>
        </div>
      </div>
    </nav>
  );
}
