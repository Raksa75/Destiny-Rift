import { useI18n } from '../../i18n';
import { ROLES } from '../../types';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (role: (typeof ROLES)[number]) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

const ROLE_EMOJI: Record<(typeof ROLES)[number], string> = {
  TOP: '⚔️',
  JUNGLE: '🌲',
  MID: '🎯',
  ADC: '🏹',
  SUPPORT: '🛡️',
};

export function RoleStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell
      title={t('creation.role.title')}
      hint={t('creation.role.hint')}
      onBack={onBack}
      onRandomize={() => onNext(ROLES[Math.floor(Math.random() * ROLES.length)])}
      step={step}
      totalSteps={totalSteps}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => onNext(role)}
            className="rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-6 text-center font-medium text-rift-text-bright transition-colors"
          >
            <span className="block text-2xl mb-1">{ROLE_EMOJI[role]}</span>
            {t(`role.${role}` as never)}
          </button>
        ))}
      </div>
    </WizardShell>
  );
}
