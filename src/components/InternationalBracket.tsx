import { useState } from 'react';
import { useI18n } from '../i18n';
import {
  GROUP_MATCHES,
  GROUP_WINS_TO_ADVANCE,
  generateOpponent,
  internationalReward,
  ourTeamStars,
  resolveInternationalMatch,
} from '../data/international';
import type { InternationalEventId, InternationalPlacement, InternationalRound } from '../data/international';
import type { PlayerStats } from '../types';
import { InternationalMatchCard } from './InternationalMatchCard';

interface Props {
  event: InternationalEventId;
  ourName: string;
  stats: PlayerStats;
  onDone: (placement: InternationalPlacement, reward: ReturnType<typeof internationalReward>) => void;
}

interface Opponent {
  name: string;
  stars: number;
}

export function InternationalBracket({ event, ourName, stats, onDone }: Props) {
  const { t } = useI18n();
  const ourStars = ourTeamStars(stats);

  const [round, setRound] = useState<InternationalRound>('GROUP');
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupWins, setGroupWins] = useState(0);
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [opponent, setOpponent] = useState<Opponent>(() => generateOpponent('GROUP', []));
  const [placement, setPlacement] = useState<InternationalPlacement | null>(null);

  const nextOpponent = (r: InternationalRound, exclude: string[]) => {
    const o = generateOpponent(r, exclude);
    setUsedNames([...exclude, o.name]);
    setOpponent(o);
  };

  const handleResult = (won: boolean) => {
    if (round === 'GROUP') {
      const wins = won ? groupWins + 1 : groupWins;
      setGroupWins(wins);
      const played = groupIndex + 1;
      if (played < GROUP_MATCHES) {
        setGroupIndex(played);
        nextOpponent('GROUP', usedNames);
      } else if (wins >= GROUP_WINS_TO_ADVANCE) {
        setRound('SEMI');
        nextOpponent('SEMI', usedNames);
      } else {
        setPlacement('GROUP_STAGE');
      }
      return;
    }
    if (round === 'SEMI') {
      if (won) {
        setRound('FINAL');
        nextOpponent('FINAL', usedNames);
      } else {
        setPlacement('SEMIFINALIST');
      }
      return;
    }
    // FINAL
    setPlacement(won ? 'CHAMPION' : 'RUNNER_UP');
  };

  if (placement) {
    const reward = internationalReward(placement);
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">{t(`intl.event.${event}` as never)}</p>
        <p className="text-rift-text-bright font-semibold text-xl">{t(`intl.placement.${placement}` as never)}</p>
        <p className="text-rift-text">
          +{reward.money}€ · +{reward.popularity} {t('card.reputation').toLowerCase()}
        </p>
        <button
          onClick={() => onDone(placement, reward)}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  const roundLabel =
    round === 'GROUP'
      ? t('intl.round.GROUP', { n: String(groupIndex + 1) })
      : t(`intl.round.${round}` as never);

  return (
    <InternationalMatchCard
      key={`${round}-${groupIndex}-${opponent.name}`}
      roundLabel={roundLabel}
      ourName={ourName}
      ourStars={ourStars}
      opponentName={opponent.name}
      opponentStars={opponent.stars}
      onSimulate={() => resolveInternationalMatch(ourStars, opponent.stars)}
      onResult={handleResult}
    />
  );
}
