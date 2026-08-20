interface Props {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export function StatBar({ label, value, max = 100, color = 'bg-rift-blue' }: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-rift-text">
        <span>{label}</span>
        <span className="text-rift-text-bright font-medium">{Math.round(value)}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-rift-panel-2 border border-rift-border overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
