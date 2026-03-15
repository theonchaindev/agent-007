interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

export default function StatCard({ label, value, sub, highlight }: StatCardProps) {
  return (
    <div className={`p-5 border backdrop-blur-sm ${
      highlight
        ? "border-m-green/40 bg-m-green/5"
        : "border-m-border bg-m-card/80"
    }`}>
      <p className="font-mono text-[10px] text-m-dim tracking-[0.25em] uppercase mb-3">{label}</p>
      <p className={`font-mono text-2xl font-bold ${highlight ? "text-m-green" : "text-m-mid"}`}>
        {value}
      </p>
      {sub && <p className="font-mono text-[11px] text-m-dim mt-1">{sub}</p>}
    </div>
  );
}
