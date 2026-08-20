import { useI18n } from '../../i18n';
import { DIET_IDS, DIET_STAT_MODS } from '../../data/creation';
import type { DietId, StatKey } from '../../types';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (diet: DietId) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

export function DietStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell title={t('creation.diet.title')} hint={t('creation.diet.hint')} onBack={onBack} step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        {DIET_IDS.map((diet) => {
          const mods = DIET_STAT_MODS[diet];
          const entries = STAT_KEYS.filter((key) => mods[key]);
          return (
            <button
              key={diet}
              onClick={() => onNext(diet)}
              className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-4 transition-colors"
            >
              <div className="font-medium text-rift-text-bright">{t(`diet.${diet}` as never)}</div>
              <div className="text-sm text-rift-text mt-1">{t(`diet.${diet}.desc` as never)}</div>
              {entries.length > 0 && (
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
                </div>
              )}
            </button>
          );
        })}
      </div>
    </WizardShell>
  );
}
