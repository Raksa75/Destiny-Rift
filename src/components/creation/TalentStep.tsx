import { useI18n } from '../../i18n';
import { TALENT_IDS, TALENT_POPULARITY_MOD, TALENT_POTENTIAL_MOD, TALENT_STAT_MODS } from '../../data/creation';
import type { StatKey, TalentId } from '../../types';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (talent: TalentId) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

const TALENT_EMOJI: Record<TalentId, string> = { UNKNOWN: '❓', STAR_KID: '🌟', LATE_BLOOMER: '🌱', ACADEMY: '🏫' };

export function TalentStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell
      title={t('creation.talent.title')}
      hint={t('creation.talent.hint')}
      onBack={onBack}
      onRandomize={() => onNext(TALENT_IDS[Math.floor(Math.random() * TALENT_IDS.length)])}
      step={step}
      totalSteps={totalSteps}
    >
      <div className="flex flex-col gap-3">
        {TALENT_IDS.map((talent) => {
          const mods = TALENT_STAT_MODS[talent];
          const entries = STAT_KEYS.filter((key) => mods[key]);
          const popularityMod = TALENT_POPULARITY_MOD[talent];
          const potentialMod = TALENT_POTENTIAL_MOD[talent];
          return (
            <button
              key={talent}
              onClick={() => onNext(talent)}
              className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-4 transition-colors"
            >
              <div className="font-medium text-rift-text-bright">
                {TALENT_EMOJI[talent]} {t(`talent.${talent}` as never)}
              </div>
              <div className="text-sm text-rift-text mt-1">{t(`talent.${talent}.desc` as never)}</div>
              {(entries.length > 0 || popularityMod !== 0 || potentialMod !== 0) && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {entries.map((key) => {
                    const value = mods[key]!;
                    return (
                      <span
                        key={key}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          value > 0 ? 'bg-rift-green/15 text-rift-green' : 'bg-rift-red/15 text-rift-red'
                        }`}
                      >
                        {value > 0 ? '+' : ''}
                        {value} {t(`stat.${key}` as never)}
                      </span>
                    );
                  })}
                  {popularityMod !== 0 && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        popularityMod > 0 ? 'bg-rift-green/15 text-rift-green' : 'bg-rift-red/15 text-rift-red'
                      }`}
                    >
                      {popularityMod > 0 ? '+' : ''}
                      {popularityMod} {t('card.reputation')}
                    </span>
                  )}
                  {potentialMod !== 0 && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        potentialMod > 0 ? 'bg-rift-green/15 text-rift-green' : 'bg-rift-red/15 text-rift-red'
                      }`}
                    >
                      {potentialMod > 0 ? '+' : ''}
                      {potentialMod}★ {t('players.potential')}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </WizardShell>
  );
}
