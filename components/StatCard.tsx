interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`border rounded-sm p-6 ${accent ? "border-gold/40 bg-gold/5" : "border-obsidian-border bg-obsidian-card"}`}>
      <p className="text-xs text-white/30 tracking-widest uppercase mb-3 font-mono">{label}</p>
      <p className={`text-2xl font-bold font-mono ${accent ? "text-gold" : "text-white"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-white/30 mt-1 font-mono">{sub}</p>}
    </div>
  );
}
