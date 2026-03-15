import Link from "next/link";
import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function HomePage() {
  const recentBuybacks = mockBuybacks.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-obsidian-border">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center">
          {/* Target reticle */}
          <div className="relative w-32 h-32 mb-10">
            <div className="absolute inset-0 rounded-full border border-gold/20 reticle" />
            <div className="absolute inset-4 rounded-full border border-gold/30 reticle" style={{ animationDirection: "reverse", animationDuration: "5s" }} />
            <div className="absolute inset-8 rounded-full border border-gold/40" />
            {/* Cross hairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gold/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-gold/20" />
            </div>
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gold/90 shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-8 bg-gold/5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gold text-xs tracking-widest font-mono uppercase">Autonomous · Active · On Mission</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
            <span className="text-white">AGENT</span>{" "}
            <span className="text-gold" style={{ textShadow: "0 0 40px rgba(212,175,55,0.3)" }}>
              007
            </span>
          </h1>

          <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-2 font-mono">
            Licensed to Accumulate
          </p>

          <p className="text-white/60 max-w-xl mt-6 text-lg leading-relaxed">
            An autonomous AI agent that continuously buys and burns dev fees from pump.fun —
            reducing supply, increasing value.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-10">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-gold text-obsidian font-bold text-sm tracking-widest px-8 py-3.5 hover:bg-gold-light transition-colors"
            >
              <span>BRIEF THE AGENT</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/buybacks"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-medium text-sm tracking-widest px-8 py-3.5 hover:border-gold/40 hover:text-gold transition-colors"
            >
              VIEW OPERATIONS
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-4 h-px bg-gold" />
          <span className="text-xs text-white/30 tracking-widest font-mono uppercase">Mission Statistics</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Total SOL Deployed"
            value={`${agentStats.totalSolSpent.toFixed(2)}`}
            sub="SOL in buybacks"
            accent
          />
          <StatCard
            label="Tokens Burned"
            value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`}
            sub="total supply removed"
          />
          <StatCard
            label="Operations"
            value={String(agentStats.totalBuybacks)}
            sub="successful buybacks"
          />
          <StatCard
            label="Success Rate"
            value={`${agentStats.successRate}%`}
            sub="mission accuracy"
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px bg-gold" />
            <span className="text-xs text-white/30 tracking-widest font-mono uppercase">Recent Operations</span>
          </div>
          <Link href="/buybacks" className="text-xs text-gold/60 hover:text-gold font-mono tracking-wider transition-colors">
            VIEW ALL →
          </Link>
        </div>

        <div className="border border-obsidian-border rounded-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[32px_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-obsidian-card border-b border-obsidian-border">
            {["#", "TOKEN", "SOL SPENT", "BURNED", "TX", "TIME"].map((h) => (
              <span key={h} className="text-[10px] text-white/20 tracking-widest font-mono">{h}</span>
            ))}
          </div>

          {recentBuybacks.map((buyback, i) => (
            <BuybackRow key={buyback.id} buyback={buyback} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-obsidian-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-white/20 text-xs font-mono">AGENT</span>
            <span className="text-gold/40 text-xs font-mono font-bold">007</span>
          </div>
          <p className="text-white/15 text-xs font-mono tracking-wider">
            CLASSIFIED · AUTONOMOUS · UNSTOPPABLE
          </p>
        </div>
      </footer>
    </div>
  );
}
