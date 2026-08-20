import type { MatchOption, MatchQuestion } from '../data/matchTypes';

interface Props {
  match: MatchQuestion;
  badge: string;
  resolveWin: (option: MatchOption) => boolean;
  onResult: (option: MatchOption, won: boolean) => void;
}

export function MatchCard({ match, badge, resolveWin, onResult }: Props) {
  return (
    <section className="rounded-2xl border border-rift-gold/50 bg-rift-panel/80 p-5">
      <p className="text-xs uppercase tracking-wide text-rift-gold font-semibold mb-2">{badge}</p>
      <p className="text-rift-text-bright font-medium mb-4">{match.text}</p>
      <div className="flex flex-col gap-2.5">
        {match.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onResult(option, resolveWin(option))}
            className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-gold px-4 py-3 text-sm text-rift-text-bright transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
    </section>
  );
}
