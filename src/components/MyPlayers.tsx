import { useI18n } from '../i18n';
import { overallRating } from '../data/creation';
import type { CareerRecord } from '../types';
import { PotentialStars } from './PotentialStars';

interface Props {
  careers: CareerRecord[];
  onBack: () => void;
  onCreate: () => void;
  onSelect: (id: string) => void;
}

export function MyPlayers({ careers, onBack, onCreate, onSelect }: Props) {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-svh px-4 py-6 max-w-3xl mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between pt-12">
        <h1 className="text-xl font-semibold text-rift-gold-bright">{t('players.title')}</h1>
        <button
          onClick={onBack}
          className="text-sm text-rift-onbg-muted hover:text-rift-onbg transition-colors"
        >
          {t('common.menu')}
        </button>
      </header>

      {careers.length === 0 ? (
        <div className="rounded-2xl border border-rift-border bg-rift-panel/80 p-10 text-center flex flex-col items-center gap-4">
          <p className="text-rift-text">{t('players.empty')}</p>
          <button
            onClick={onCreate}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-5 py-2.5 transition-colors"
          >
            {t('players.empty.cta')}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {careers.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="text-left rounded-xl border border-rift-border bg-rift-panel/80 hover:border-rift-blue p-4 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-rift-text-bright">{c.name}</p>
                  <p className="text-xs text-rift-text mt-0.5">
                    {t(`role.${c.role}` as never)} · {c.country} · {t('play.ageYears', { age: String(c.age) })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-rift-gold text-rift-bg font-bold text-xs px-2 py-1 leading-none">
                    {Math.round(overallRating(c.stats))}
                  </span>
                  <PotentialStars value={c.potential} />
                </div>
              </div>
              <p className="text-sm text-rift-blue mt-3">
                {c.club.name} — {t(`tier.${c.club.tier}` as never)}
              </p>
              <div className="flex justify-between text-xs text-rift-text mt-3">
                <span>
                  {t('play.money')}: <span className="text-rift-text-bright">{c.money}€</span>
                </span>
                <span>
                  {t('players.createdAt')}: {new Date(c.createdAt).toLocaleDateString(lang)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
