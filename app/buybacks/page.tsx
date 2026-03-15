import StatCard from "@/components/StatCard";
import BuybackRow from "@/components/BuybackRow";
import { mockBuybacks, agentStats } from "@/lib/data";

export default function BuybacksPage() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-12">
        <div className="border border-agent-red/50 inline-block px-3 py-0.5 mb-6">
          <span className="font-mono text-[10px] text-agent-red tracking-[0.35em] font-bold">CLASSIFIED · EYES ONLY</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-white mb-3">
          OPERATIONS<br />
          <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>LOG</span>
        </h1>
        <p className="text-agent-mid text-sm max-w-md mt-4">
          Full record of every buyback and burn operation. Dev fees acquired, tokens neutralised, supply reduced.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-agent-border mb-10">
        <StatCard label="Total SOL" value={`${agentStats.totalSolSpent.toFixed(3)}`} sub="deployed" highlight />
        <StatCard label="Burned" value={`${(agentStats.totalTokensBurned / 1_000_000).toFixed(2)}M`} sub="tokens" />
        <StatCard label="Operations" value={String(agentStats.totalBuybacks)} sub="total" />
        <StatCard label="Avg Size" value={`${agentStats.avgBuybackSize.toFixed(3)}`} sub="SOL/op" />
      </div>

      {/* Table */}
      <div className="border border-agent-border">
        <div className="grid grid-cols-[28px_1fr_1fr_1fr_1fr_72px] gap-4 px-5 py-2.5 bg-agent-card border-b border-agent-border">
          {["#", "TOKEN", "SOL SPENT", "BURNED", "TX HASH", "TIME"].map((h) => (
            <span key={h} className="font-mono text-[9px] text-agent-dim tracking-[0.2em]">{h}</span>
          ))}
        </div>
        {mockBuybacks.map((b, i) => (
          <BuybackRow key={b.id} buyback={b} index={i} />
        ))}
      </div>

      <p className="font-mono text-[10px] text-agent-dim/40 text-center mt-10 tracking-widest pb-10">
        ALL OPERATIONS VERIFIED ON-CHAIN · SOLANA MAINNET
      </p>
    </div>
  );
}
