import { useI18n } from '../i18n';
import type { CareerRecord } from '../types';

interface Props {
  career: CareerRecord;
  onViewPlayers: () => void;
  onMenu: () => void;
}

export function CareerEndScreen({ career, onViewPlayers, onMenu }: Props) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-rift-gold/50 bg-rift-panel/95 p-8 shadow-2xl">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-2 text-center">🏁 {t('retire.title')}</p>
        <h1 className="text-2xl font-semibold text-rift-gold-bright text-center mb-1">{career.name}</h1>
        <p className="text-rift-text text-sm text-center mb-6">
          {career.retirementReason ? t(career.retirementReason as never) : ''}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-6">
          <Stat label={t('play.ageYears', { age: String(career.age) })} value="" />
          <Stat label={t('card.peakOvr')} value={String(career.peakOverall)} />
          <Stat label={t('card.seasonsPlayed')} value={String(career.seasonsPlayed)} />
          <Stat label={t('card.careerEarnings')} value={`${career.careerEarnings}€`} />
          <Stat label={t('card.wins')} value={String(career.wins)} />
          <Stat label={t('card.losses')} value={String(career.losses)} />
          <Stat label={t('card.kills')} value={String(career.careerKills)} />
          <Stat label={t('card.assists')} value={String(career.careerAssists)} />
        </div>

        {career.titles.length > 0 && (
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-rift-text mb-1">🏆 {t('card.titlesWon')}</p>
            <ul className="text-sm text-rift-text-bright list-disc list-inside">
              {career.titles.map((title, i) => (
                <li key={i}>{title}</li>
              ))}
            </ul>
          </div>
        )}

        {career.awards.length > 0 && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-rift-text mb-1">🎖️ {t('card.individualAwards')}</p>
            <ul className="text-sm text-rift-text-bright list-disc list-inside">
              {career.awards.map((award, i) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={onViewPlayers}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold py-3 transition-colors"
          >
            {t('creation.done.viewPlayers')}
          </button>
          <button
            onClick={onMenu}
            className="text-sm text-rift-text hover:text-rift-text-bright transition-colors text-center"
          >
            {t('creation.done.menu')}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-rift-panel-2 border border-rift-border px-3 py-2">
      <p className="text-[11px] text-rift-text uppercase tracking-wide">{label}</p>
      {value && <p className="text-rift-text-bright font-medium">{value}</p>}
    </div>
  );
}
