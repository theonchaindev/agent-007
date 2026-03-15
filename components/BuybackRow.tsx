"use client";

import { Buyback, timeAgo, shortHash } from "@/lib/data";

export default function BuybackRow({ buyback, index }: { buyback: Buyback; index: number }) {
  return (
    <div className="grid grid-cols-[28px_1fr_1fr_1fr_1fr_72px] gap-4 items-center px-5 py-3.5 border-b border-m-border last:border-0 hover:bg-m-green/[0.03] transition-colors group">

      <span className="font-mono text-[10px] text-m-dim">{String(index + 1).padStart(2, "0")}</span>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border border-m-dark flex items-center justify-center">
          <span className="font-mono text-[8px] text-m-dim font-bold">{buyback.tokenSymbol.slice(0, 2)}</span>
        </div>
        <span className="text-m-green text-xs font-medium tracking-wide">{buyback.tokenSymbol}</span>
      </div>

      <div>
        <span className="font-mono text-sm text-m-bright">{buyback.solSpent.toFixed(3)}</span>
        <span className="font-mono text-[10px] text-m-dim ml-1">SOL</span>
      </div>

      <span className="font-mono text-xs text-m-mid">{buyback.tokensBurned.toLocaleString()}</span>

      <div className="flex items-center gap-1.5 cursor-pointer">
        <span className="font-mono text-[10px] text-m-dim group-hover:text-m-mid transition-colors">{shortHash(buyback.txHash)}</span>
        <svg className="w-2.5 h-2.5 text-m-dim opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <div className="text-right">
        <span className="font-mono text-[10px] text-m-dim">{timeAgo(buyback.timestamp)}</span>
      </div>

    </div>
  );
}
