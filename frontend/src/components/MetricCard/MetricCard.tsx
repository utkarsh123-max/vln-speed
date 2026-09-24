import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}

export function MetricCard({ icon: Icon, label, value, unit, accent }: MetricCardProps) {
  return (
    <div
      className={`card-premium rounded-2xl px-5 py-4 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-0.5 ${
        accent ? "shadow-glow" : "hover:shadow-card"
      }`}
      style={accent ? { boxShadow: "0 0 0 1px var(--vln-accent-glow), 0 12px 32px -16px var(--vln-accent-glow)" } : undefined}
    >
      <div className="flex items-center gap-2 text-muted">
        <Icon size={14} strokeWidth={2} className={accent ? "text-accent" : ""} />
        <span className="text-[11px] tracking-[0.16em] uppercase font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`tabular text-2xl font-bold transition-colors ${accent ? "text-accent" : "text-primary"}`}>{value}</span>
        {unit && <span className="text-xs text-muted uppercase tracking-wide">{unit}</span>}
      </div>
    </div>
  );
}