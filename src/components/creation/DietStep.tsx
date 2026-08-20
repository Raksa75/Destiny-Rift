import { useI18n } from '../../i18n';
import { DIET_IDS } from '../../data/creation';
import type { DietId } from '../../types';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (diet: DietId) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function DietStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell title={t('creation.diet.title')} hint={t('creation.diet.hint')} onBack={onBack} step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        {DIET_IDS.map((diet) => (
          <button
            key={diet}
            onClick={() => onNext(diet)}
            className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-4 transition-colors"
          >
            <div className="font-medium text-rift-text-bright">{t(`diet.${diet}` as never)}</div>
            <div className="text-sm text-rift-text mt-1">{t(`diet.${diet}.desc` as never)}</div>
          </button>
        ))}
      </div>
    </WizardShell>
  );
}
