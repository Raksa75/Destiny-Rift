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
        <div className="flex gap-2">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('creation.name.placeholder')}
            maxLength={20}
            className="flex-1 min-w-0 rounded-lg bg-rift-panel-2 border border-rift-border px-3 py-3 text-lg text-rift-text-bright outline-none focus:border-rift-blue transition-colors"
          />
          <button
            type="button"
            onClick={() => setName(generateRandomName())}
            title={t('creation.name.random')}
            className="shrink-0 rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 text-xl transition-colors"
          >
            🎲
          </button>
        </div>
        <button
          disabled={name.trim().length === 0}
          onClick={() => onNext(name.trim())}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark disabled:opacity-40 disabled:cursor-not-allowed text-rift-bg font-semibold py-3 transition-colors"
        >
          {t('common.next')}
        </button>
      </div>
    </WizardShell>
  );
}
