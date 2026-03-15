interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

export default function StatCard({ label, value, sub, highlight }: StatCardProps) {
  return (
    <div className={`border p-5 ${highlight ? "border-white/20 bg-white/[0.03]" : "border-agent-border bg-agent-card"}`}>
      <p className="font-mono text-[10px] text-agent-dim tracking-[0.25em] uppercase mb-3">{label}</p>
      <p className={`font-mono text-2xl font-bold ${highlight ? "text-white" : "text-agent-light"}`}>
        {value}
      </p>
      {sub && <p className="font-mono text-[11px] text-agent-dim mt-1">{sub}</p>}
    </div>
  );
}
