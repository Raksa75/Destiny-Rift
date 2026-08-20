import { useI18n } from '../../i18n';
import { TALENT_IDS } from '../../data/creation';
import type { TalentId } from '../../types';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (talent: TalentId) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function TalentStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell title={t('creation.talent.title')} hint={t('creation.talent.hint')} onBack={onBack} step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        {TALENT_IDS.map((talent) => (
          <button
            key={talent}
            onClick={() => onNext(talent)}
            className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-4 transition-colors"
          >
            <div className="font-medium text-rift-text-bright">{t(`talent.${talent}` as never)}</div>
            <div className="text-sm text-rift-text mt-1">{t(`talent.${talent}.desc` as never)}</div>
          </button>
        ))}
      </div>
    </WizardShell>
  );
}
