export interface DeltaItem {
  label: string;
  value: number;
}

interface Props {
  badge?: string;
  narrative: string;
  deltas: DeltaItem[];
  extraLines?: string[];
  traitUnlock?: string;
  onContinue: () => void;
  continueLabel: string;
}

export function ResultCard({ badge, narrative, deltas, extraLines, traitUnlock, onContinue, continueLabel }: Props) {
  const nonZero = deltas.filter((d) => d.value !== 0);

  return (
    <section className="rounded-2xl border border-rift-blue/40 bg-rift-panel/80 p-5 flex flex-col gap-4 animate-[slideUp_0.25s_ease-out]">
      {badge && <p className="text-xs uppercase tracking-wide text-rift-blue font-semibold">{badge}</p>}
      <p className="text-rift-text-bright font-medium">{narrative}</p>

      {nonZero.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {nonZero.map((d, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`rounded-full px-3 py-1 text-sm font-semibold opacity-0 animate-[popIn_0.35s_ease-out_forwards] ${
                d.value > 0 ? 'bg-rift-green/15 text-rift-green' : 'bg-rift-red/15 text-rift-red'
              }`}
            >
              {d.value > 0 ? '+' : ''}
              {d.value} {d.label}
            </span>
          ))}
        </div>
      )}

      {traitUnlock && (
        <div className="rounded-xl border border-rift-gold bg-rift-gold/10 px-4 py-3 text-center animate-[shimmerGold_1.6s_ease-in-out_2]">
          <p className="text-sm font-semibold text-rift-gold-bright">✨ {traitUnlock}</p>
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
        className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark active:scale-[0.98] text-rift-bg font-semibold py-3 transition-all"
      >
        {continueLabel}
      </button>
    </section>
  );
}
