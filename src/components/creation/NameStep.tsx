import { useState } from 'react';
import { useI18n } from '../../i18n';
import { generateRandomName } from '../../data/nameGenerator';
import { WizardShell } from './WizardShell';

interface Props {
  value: string;
  onNext: (name: string) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function NameStep({ value, onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();
  const [name, setName] = useState(value || generateRandomName());

  return (
    <WizardShell title={t('creation.name.title')} hint={t('creation.name.hint')} onBack={onBack} step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-lg bg-rift-panel-2 border border-rift-border px-4 py-4">
          <span className="flex-1 text-xl font-semibold text-rift-text-bright">{name}</span>
          <button
            type="button"
            onClick={() => setName(generateRandomName())}
            title={t('creation.name.random')}
            className="shrink-0 rounded-lg border border-rift-border bg-rift-panel hover:border-rift-blue px-4 py-2 text-xl transition-colors"
          >
            🎲
          </button>
        </div>
        <button
          onClick={() => onNext(name)}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold py-3 transition-colors"
        >
          {t('common.next')}
        </button>
      </div>
    </WizardShell>
  );
}
