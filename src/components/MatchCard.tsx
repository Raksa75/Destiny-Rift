import { useI18n } from '../i18n';
import { skillBonus } from '../data/matches';
import type { MatchOption, MatchQuestion } from '../data/matchTypes';
import type { PlayerStats } from '../types';

interface Props {
  match: MatchQuestion;
  badge: string;
  stats: PlayerStats;
  resolveWin: (option: MatchOption) => boolean;
  onResult: (option: MatchOption, won: boolean) => void;
}

export function MatchCard({ match, badge, stats, resolveWin, onResult }: Props) {
  const { t } = useI18n();
  const bonus = skillBonus(stats);

  return (
    <section className="rounded-2xl border border-rift-gold/50 bg-rift-panel/80 p-5 animate-[fadeIn_0.2s_ease-out]">
      <p className="text-xs uppercase tracking-wide text-rift-gold font-semibold mb-2">{badge}</p>
      <p className="text-rift-text-bright font-medium mb-4">{match.text}</p>
      <div className="flex flex-col gap-2.5">
        {match.options.map((option) => {
          const pct = Math.round(Math.max(0.05, Math.min(0.95, option.winChance + bonus)) * 100);
          return (
            <button
              key={option.id}
              onClick={() => onResult(option, resolveWin(option))}
              className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-gold active:scale-[0.99] px-4 py-3 text-sm text-rift-text-bright transition-all flex items-center justify-between gap-3"
            >
              <span>{option.text}</span>
              <span className="shrink-0 text-xs font-semibold text-rift-gold-bright bg-rift-gold/15 rounded-full px-2 py-0.5">
                {t('match.winChance', { pct: String(pct) })}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
