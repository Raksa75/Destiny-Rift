import type { ReactNode } from 'react';
import { useI18n } from '../../i18n';

interface Props {
  title: string;
  hint?: string;
  children: ReactNode;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function WizardShell({ title, hint, children, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh px-4 py-6 max-w-2xl mx-auto flex flex-col gap-6">
      <header className="pt-12">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-sm text-rift-text hover:text-rift-text-bright transition-colors"
          >
            ← {t('common.back')}
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full ${i <= step ? 'bg-rift-blue' : 'bg-rift-panel-2'}`}
              />
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-rift-gold-bright">{title}</h1>
        {hint && <p className="text-sm text-rift-text mt-1">{hint}</p>}
      </header>

      <div className="flex-1">{children}</div>
    </div>
  );
}
