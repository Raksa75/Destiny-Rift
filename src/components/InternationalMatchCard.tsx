import { useState } from 'react';
import { useI18n } from '../i18n';
import { winChance } from '../data/international';
import { PotentialStars } from './PotentialStars';

interface Props {
  roundLabel: string;
  ourName: string;
  ourStars: number;
  opponentName: string;
  opponentStars: number;
  onSimulate: () => boolean;
  onResult: (won: boolean) => void;
}

export function InternationalMatchCard({
  roundLabel,
  ourName,
  ourStars,
  opponentName,
  opponentStars,
  onSimulate,
  onResult,
}: Props) {
  const { t } = useI18n();
  const [result, setResult] = useState<boolean | null>(null);
  const pct = Math.round(winChance(ourStars, opponentStars) * 100);

  const simulate = () => {
    const won = onSimulate();
    setResult(won);
  };

  return (
    <section className="rounded-2xl border border-rift-gold/50 bg-rift-panel/80 p-5 flex flex-col gap-5">
      <p className="text-xs uppercase tracking-wide text-rift-gold font-semibold text-center">{roundLabel}</p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-center">
          <p className="font-semibold text-rift-text-bright truncate">{ourName}</p>
          <div className="flex justify-center mt-1">
            <PotentialStars value={Math.round(ourStars)} />
          </div>
        </div>
        <div className="text-center px-2">
          <p className="text-lg font-bold text-rift-gold">{pct}%</p>
          <p className="text-[10px] uppercase tracking-wide text-rift-text">VS</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-rift-text-bright truncate">{opponentName}</p>
          <div className="flex justify-center mt-1">
            <PotentialStars value={Math.round(opponentStars)} />
          </div>
        </div>
      </div>

      {result === null ? (
        <button
          onClick={simulate}
          className="rounded-lg bg-rift-gold hover:opacity-90 text-rift-bg font-semibold py-3 transition-opacity"
        >
          {t('intl.simulate')}
        </button>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <p className={`font-semibold ${result ? 'text-rift-green' : 'text-rift-red'}`}>
            {t(result ? 'intl.result.win' : 'intl.result.loss')}
          </p>
          <button
            onClick={() => onResult(result)}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
          >
            {t('season.continue')}
          </button>
        </div>
      )}
    </section>
  );
}
