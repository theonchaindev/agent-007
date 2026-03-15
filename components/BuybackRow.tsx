"use client";

import { Buyback, timeAgo, shortHash } from "@/lib/data";

interface Props {
  buyback: Buyback;
  index: number;
}

export default function BuybackRow({ buyback, index }: Props) {
  return (
    <div
      className="grid grid-cols-[32px_1fr_1fr_1fr_1fr_80px] gap-4 items-center px-6 py-4 border-b border-obsidian-border hover:bg-obsidian-light transition-colors group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Index */}
      <span className="text-white/20 font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>

      {/* Token */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
          <span className="text-gold text-[9px] font-bold">{buyback.tokenSymbol.slice(0, 2)}</span>
        </div>
        <span className="text-white text-sm font-medium">{buyback.tokenSymbol}</span>
      </div>

      {/* SOL spent */}
      <div>
        <span className="text-gold font-mono font-semibold text-sm">
          {buyback.solSpent.toFixed(3)}
        </span>
        <span className="text-white/30 font-mono text-xs ml-1">SOL</span>
      </div>

      {/* Tokens burned */}
      <div>
        <span className="text-white font-mono text-sm">
          {buyback.tokensBurned.toLocaleString()}
        </span>
        <span className="text-white/30 font-mono text-xs ml-1">BURNED</span>
      </div>

      {/* Tx hash */}
      <div className="flex items-center gap-1">
        <span className="text-white/40 font-mono text-xs group-hover:text-white/60 transition-colors">
          {shortHash(buyback.txHash)}
        </span>
        <svg className="w-3 h-3 text-white/20 group-hover:text-gold/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* Time */}
      <div className="text-right">
        <span className="text-white/30 font-mono text-xs">{timeAgo(buyback.timestamp)}</span>
      </div>
    </div>
  );
}
