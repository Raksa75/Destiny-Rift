export interface DeltaItem {
  label: string;
  value: number;
}

interface Props {
  badge?: string;
  narrative: string;
  deltas: DeltaItem[];
  extraLines?: string[];
  onContinue: () => void;
  continueLabel: string;
}

export function ResultCard({ badge, narrative, deltas, extraLines, onContinue, continueLabel }: Props) {
  const nonZero = deltas.filter((d) => d.value !== 0);

  return (
    <section className="rounded-2xl border border-rift-blue/40 bg-rift-panel/80 p-5 flex flex-col gap-4">
      {badge && <p className="text-xs uppercase tracking-wide text-rift-blue font-semibold">{badge}</p>}
      <p className="text-rift-text-bright font-medium">{narrative}</p>

      {nonZero.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {nonZero.map((d, i) => (
            <span
              key={i}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                d.value > 0 ? 'bg-rift-green/15 text-rift-green' : 'bg-rift-red/15 text-rift-red'
              }`}
            >
              {d.value > 0 ? '+' : ''}
              {d.value} {d.label}
            </span>
          ))}
        </div>
      )}

      {extraLines && extraLines.length > 0 && (
        <div className="flex flex-col gap-1">
          {extraLines.map((line, i) => (
            <p key={i} className="text-sm text-rift-text">
              {line}
            </p>
          ))}
        </div>
      )}

      <button
        onClick={onContinue}
        className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold py-3 transition-colors"
      >
        {continueLabel}
      </button>
    </section>
  );
}
