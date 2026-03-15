import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative border-b border-agent-border overflow-hidden">

        {/* Dot grid bg */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-28 flex flex-col items-center text-center">

          {/* Classification stamp */}
          <div className="mb-10 border border-agent-red/60 px-4 py-1">
            <span className="font-mono text-[10px] text-agent-red tracking-[0.4em] font-bold">TOP SECRET · CLASSIFIED</span>
          </div>

          {/* Reticle + wordmark */}
          <div className="relative w-36 h-36 mb-12">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 reticle" />
            {/* Tick marks at 12/3/6/9 */}
            <div className="absolute inset-0 rounded-full border border-white/5 reticle-rev" />
            {/* Mid ring */}
            <div className="absolute inset-5 rounded-full border border-white/15" />
            {/* Inner ring */}
            <div className="absolute inset-10 rounded-full border border-white/25" />
            {/* Cross hairs */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-3">
            <span className="text-white">AGENT</span>
            <br />
            <span className="text-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
              007
            </span>
          </h1>

          <p className="font-mono text-[11px] text-agent-dim tracking-[0.35em] mt-4 mb-2">
            LICENSED TO ACCUMULATE
          </p>
          <p className="text-agent-mid text-base max-w-md mt-5 leading-relaxed">
            Autonomous AI agent. Continuously buys and burns dev fees from pump.fun —
            reducing supply, serving holders.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 mt-10">
            <Link
              href="/chat"
              className="flex items-center gap-2 bg-white text-black font-bold text-xs tracking-[0.2em] px-7 py-3.5 hover:bg-white/90 transition-colors"
            >
              BRIEF THE AGENT
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/buybacks"
              className="flex items-center gap-2 border border-agent-border text-agent-mid font-medium text-xs tracking-[0.2em] px-7 py-3.5 hover:border-white/30 hover:text-white transition-colors"
            >
              VIEW OPS
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] text-agent-dim tracking-[0.3em]">// MISSION STATS</span>
          <div className="flex-1 h-px bg-agent-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-agent-border">
          <StatCard label="SOL Deployed" value={`${agentStats.totalSolSpent.toFixed(2)}`} sub="total SOL" highlight />
          <StatCard label="Tokens Burned" value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`} sub="supply removed" />
          <StatCard label="Operations" value={String(agentStats.totalBuybacks)} sub="completed" />
          <StatCard label="Success Rate" value={`${agentStats.successRate}%`} sub="accuracy" />
        </div>
      </section>

      {/* ── Recent ops ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-agent-dim tracking-[0.3em]">// RECENT OPERATIONS</span>
            <div className="flex-1 h-px bg-agent-border w-8" />
          </div>
          <Link href="/buybacks" className="font-mono text-[10px] text-agent-dim hover:text-white tracking-widest transition-colors">
            ALL →
          </Link>
        </div>

        <div className="border border-agent-border">
          {/* Col headers */}
          <div className="grid grid-cols-[28px_1fr_1fr_1fr_1fr_72px] gap-4 px-5 py-2.5 bg-agent-card border-b border-agent-border">
            {["#", "TOKEN", "SOL", "BURNED", "TX", "TIME"].map((h) => (
              <span key={h} className="font-mono text-[9px] text-agent-dim tracking-[0.2em]">{h}</span>
            ))}
          </div>
          {mockBuybacks.slice(0, 5).map((b, i) => (
            <BuybackRow key={b.id} buyback={b} index={i} />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-agent-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[10px] text-agent-dim tracking-[0.2em]">AGENT 007</span>
          <span className="font-mono text-[10px] text-agent-dim/50 tracking-widest">CLASSIFIED · AUTONOMOUS · SOLANA</span>
        </div>
      </footer>

    </div>
  );
}
