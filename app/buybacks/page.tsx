import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function BuybacksPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-px bg-gold" />
          <span className="text-xs text-white/30 tracking-widest font-mono uppercase">Operations Log</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-white">BUYBACK</span>{" "}
          <span className="text-gold">HISTORY</span>
        </h1>
        <p className="text-white/40 mt-3 text-sm max-w-lg">
          Every operation executed by Agent 007. Dev fees acquired, tokens burned, supply reduced.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        <StatCard
          label="Total SOL Deployed"
          value={`${agentStats.totalSolSpent.toFixed(3)}`}
          sub="SOL"
          accent
        />
        <StatCard
          label="Total Burned"
          value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`}
          sub="tokens destroyed"
        />
        <StatCard
          label="Operations"
          value={String(agentStats.totalBuybacks)}
          sub="completed"
        />
        <StatCard
          label="Avg Size"
          value={`${agentStats.avgBuybackSize.toFixed(3)}`}
          sub="SOL per op"
        />
      </div>

      {/* Table */}
      <div className="border border-obsidian-border rounded-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[32px_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-obsidian-card border-b border-obsidian-border">
          {["#", "TOKEN", "SOL SPENT", "TOKENS BURNED", "TX HASH", "TIME"].map((h) => (
            <span key={h} className="text-[10px] text-white/20 tracking-widest font-mono">{h}</span>
          ))}
        </div>

        {mockBuybacks.map((buyback, i) => (
          <BuybackRow key={buyback.id} buyback={buyback} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-white/15 text-xs font-mono tracking-widest mt-10 pb-10">
        ALL OPERATIONS VERIFIED ON-CHAIN · SOLANA MAINNET
      </p>
    </div>
  );
}
