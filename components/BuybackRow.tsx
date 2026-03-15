"use client";

import { Buyback, timeAgo, shortHash } from "@/lib/data";

export default function BuybackRow({ buyback, index }: { buyback: Buyback; index: number }) {
  return (
    <div className="grid grid-cols-[28px_1fr_1fr_1fr_1fr_72px] gap-4 items-center px-5 py-3.5 border-b border-agent-border last:border-0 hover:bg-white/[0.02] transition-colors group">

      <span className="font-mono text-[10px] text-agent-dim">{String(index + 1).padStart(2, "0")}</span>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-sm border border-agent-muted flex items-center justify-center">
          <span className="font-mono text-[8px] text-agent-mid font-bold">{buyback.tokenSymbol.slice(0, 2)}</span>
        </div>
        <span className="text-white text-xs font-medium tracking-wide">{buyback.tokenSymbol}</span>
      </div>

      <div>
        <span className="font-mono text-sm text-white">{buyback.solSpent.toFixed(3)}</span>
        <span className="font-mono text-[10px] text-agent-dim ml-1">SOL</span>
      </div>

      <div>
        <span className="font-mono text-xs text-agent-light">{buyback.tokensBurned.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-1.5 group/tx cursor-pointer">
        <span className="font-mono text-[10px] text-agent-dim group-hover/tx:text-agent-mid transition-colors">{shortHash(buyback.txHash)}</span>
        <svg className="w-2.5 h-2.5 text-agent-dim opacity-0 group-hover/tx:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <div className="text-right">
        <span className="font-mono text-[10px] text-agent-dim">{timeAgo(buyback.timestamp)}</span>
      </div>

    </div>
  );
}
