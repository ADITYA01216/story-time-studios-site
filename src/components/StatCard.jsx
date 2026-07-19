// src/components/StatCard.jsx
import { formatCount } from "../utils/format";

export function StatSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="skeleton h-10 w-28 rounded-lg" />
      <div className="skeleton h-3 w-20 rounded mt-1" />
    </div>
  );
}

export default function StatCard({ value, label, loading, icon }) {
  if (loading) return <StatSkeleton />;

  return (
    <div className="flex flex-col items-center gap-1">
      {icon && <span className="text-xl mb-1">{icon}</span>}
      <span className="font-mono font-semibold text-4xl sm:text-5xl text-snow tracking-tight leading-none">
        {formatCount(value)}
      </span>
      <span className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}
