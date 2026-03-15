import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative border-b border-m-border overflow-hidden">
        {/* Dark vignette so text is readable over rain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">

          {/* Classification */}
          <div className="mb-8 border border-m-red/60 px-4 py-1">
            <span className="font-mono text-[10px] text-m-red tracking-[0.4em] font-bold">TOP SECRET · CLASSIFIED</span>
          </div>

          {/* Reticle */}
          <div className="relative w-32 h-32 mb-10">
            <div className="absolute inset-0 rounded-full border border-m-green/20 reticle" />
            <div className="absolute inset-0 rounded-full border border-m-green/10 reticle-rev" />
            <div className="absolute inset-5 rounded-full border border-m-green/25" />
            <div className="absolute inset-10 rounded-full border border-m-green/35" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-m-green/15" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-m-green/15" />
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-m-green/40" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-m-green/40" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-m-green/40" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-m-green/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-m-green shadow-[0_0_16px_rgba(0,255,65,0.7)]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-2">
            <span className="text-m-green" style={{ textShadow: "0 0 30px rgba(0,255,65,0.4)" }}>AGENT</span>
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px #00FF41", textShadow: "0 0 40px rgba(0,255,65,0.2)" }}
            >
              007
            </span>
          </h1>

          <p className="font-mono text-[11px] text-m-dim tracking-[0.4em] mt-5">
            LICENSED TO ACCUMULATE
          </p>

          <p className="font-mono text-m-mid text-sm max-w-md mt-6 leading-relaxed">
            Autonomous AI agent. Buys and burns pump.fun dev fees —
            reducing supply, serving holders, around the clock.
          </p>

          <div className="mt-10">
            <Link
              href="/buybacks"
              className="inline-flex items-center gap-2 border border-m-green/50 bg-m-green/5 text-m-green font-mono text-xs tracking-[0.2em] px-8 py-3.5 hover:bg-m-green/10 hover:border-m-green transition-all"
            >
              VIEW OPERATIONS
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] text-m-dim tracking-[0.3em]">// MISSION STATS</span>
          <div className="flex-1 h-px bg-m-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-m-border">
          <StatCard label="SOL Deployed"   value={`${agentStats.totalSolSpent.toFixed(2)}`}                     sub="total SOL"       highlight />
          <StatCard label="Tokens Burned"  value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`}  sub="supply removed" />
          <StatCard label="Operations"     value={String(agentStats.totalBuybacks)}                             sub="completed" />
          <StatCard label="Success Rate"   value={`${agentStats.successRate}%`}                                  sub="accuracy" />
        </div>
      </section>

      {/* ── Recent ops ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-m-dim tracking-[0.3em]">// RECENT OPERATIONS</span>
          </div>
          <Link href="/buybacks" className="font-mono text-[10px] text-m-dim hover:text-m-green tracking-widest transition-colors">
            ALL OPS →
          </Link>
        </div>

        <div className="border border-m-border backdrop-blur-sm bg-black/50">
          <div className="grid grid-cols-[28px_1fr_1fr_1fr_1fr_72px] gap-4 px-5 py-2.5 bg-m-card/80 border-b border-m-border">
            {["#", "TOKEN", "SOL", "BURNED", "TX", "TIME"].map((h) => (
              <span key={h} className="font-mono text-[9px] text-m-dim tracking-[0.2em]">{h}</span>
            ))}
          </div>
          {mockBuybacks.slice(0, 5).map((b, i) => (
            <BuybackRow key={b.id} buyback={b} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-m-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-m-dim tracking-[0.2em]">AGENT 007</span>
          <span className="font-mono text-[10px] text-m-dim/50 tracking-widest">CLASSIFIED · AUTONOMOUS · SOLANA</span>
        </div>
      </footer>

    </div>
  );
}
