import type { ReactNode } from 'react';
import { useI18n } from '../../i18n';

interface Props {
  title: string;
  hint?: string;
  children: ReactNode;
  onBack: () => void;
  onRandomize?: () => void;
  step: number;
  totalSteps: number;
}

export function WizardShell({ title, hint, children, onBack, onRandomize, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh px-4 py-6 max-w-2xl mx-auto flex flex-col gap-6">
      <header className="pt-12">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button
            onClick={onBack}
            className="text-sm text-rift-onbg-muted hover:text-rift-onbg transition-colors shrink-0"
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
          {onRandomize ? (
            <button
              onClick={onRandomize}
              className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-rift-text-bright bg-rift-panel-2 hover:bg-rift-panel border border-rift-border rounded-full px-3 py-1.5 transition-colors"
            >
              🎲 {t('common.randomize')}
            </button>
          ) : (
            <span className="shrink-0 w-0" />
          )}
        </div>
        <h1 className="font-display text-2xl font-semibold text-rift-gold-bright">{title}</h1>
        {hint && <p className="text-sm text-rift-onbg-muted mt-1">{hint}</p>}
      </header>

      <div className="flex-1">{children}</div>
    </div>
  );
}
