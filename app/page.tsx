import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-56px)] border-b border-m-border overflow-hidden flex">

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />

        {/* Bond image — right side, full height */}
        <div className="absolute right-0 top-0 h-full w-[62%] md:w-[58%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bond.png"
            alt="Agent 007"
            className="h-full w-full object-contain object-center select-none"
            style={{ filter: "contrast(1.15) saturate(0.8)", objectPosition: "center 20%" }}
            draggable={false}
          />
          {/* Blend white background into black — left to right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, black 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.4) 45%, transparent 70%)" }}
          />
          {/* Top edge */}
          <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)" }} />
          {/* Bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)" }} />
          {/* Right edge */}
          <div className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none" style={{ background: "linear-gradient(to left, black 0%, transparent 100%)" }} />
          {/* Subtle green tint */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,255,65,0.04)" }} />
        </div>

        {/* Content — left side */}
        <div className="relative z-20 flex flex-col justify-center max-w-5xl mx-auto px-6 py-20 w-full">
          <div className="max-w-[520px]">

            {/* Classification */}
            <div className="inline-block border border-m-red/70 px-3 py-0.5 mb-8">
              <span className="font-mono text-[10px] text-m-red tracking-[0.4em] font-bold">
                TOP SECRET · CLASSIFIED
              </span>
            </div>

            {/* Main title */}
            <div className="mb-2">
              <p className="font-bebas text-m-mid text-2xl tracking-[0.5em] mb-1">AGENT</p>
              <h1
                className="font-bebas leading-none text-m-green"
                style={{
                  fontSize: "clamp(7rem, 16vw, 14rem)",
                  textShadow: "0 0 60px rgba(0,255,65,0.35), 0 0 120px rgba(0,255,65,0.15)",
                  letterSpacing: "0.05em",
                }}
              >
                007
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-m-green/50" />
              <span className="font-mono text-[10px] text-m-dim tracking-[0.35em]">
                LICENSED TO ACCUMULATE
              </span>
            </div>

            {/* Description */}
            <p className="font-mono text-m-mid text-sm leading-relaxed max-w-sm mb-10">
              Autonomous AI agent. Buys and burns pump.fun dev fees —
              reducing supply, serving holders, 24/7.
            </p>

            {/* Quick stats */}
            <div className="flex gap-8 mb-10">
              <div>
                <p className="font-bebas text-m-green text-3xl" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
                  {agentStats.totalSolSpent.toFixed(1)}
                </p>
                <p className="font-mono text-[9px] text-m-dim tracking-widest mt-0.5">SOL DEPLOYED</p>
              </div>
              <div>
                <p className="font-bebas text-m-green text-3xl" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
                  {(agentStats.totalTokensBurned / 1_000_000).toFixed(1)}M
                </p>
                <p className="font-mono text-[9px] text-m-dim tracking-widest mt-0.5">TOKENS BURNED</p>
              </div>
              <div>
                <p className="font-bebas text-m-green text-3xl" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
                  {agentStats.successRate}%
                </p>
                <p className="font-mono text-[9px] text-m-dim tracking-widest mt-0.5">SUCCESS RATE</p>
              </div>
            </div>

            {/* CTA */}
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
          <StatCard label="SOL Deployed"  value={`${agentStats.totalSolSpent.toFixed(2)}`}                    sub="total"          highlight />
          <StatCard label="Tokens Burned" value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`} sub="supply removed" />
          <StatCard label="Operations"    value={String(agentStats.totalBuybacks)}                            sub="completed" />
          <StatCard label="Success Rate"  value={`${agentStats.successRate}%`}                                sub="accuracy" />
        </div>
      </section>

      {/* ── Recent ops ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] text-m-dim tracking-[0.3em]">// RECENT OPERATIONS</span>
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
