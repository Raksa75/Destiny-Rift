import { useI18n } from '../../i18n';
import { REGIONS } from '../../data/regions';
import { WizardShell } from './WizardShell';

interface Props {
  onNext: (country: string) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export function CountryStep({ onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();

  return (
    <WizardShell
      title={t('creation.country.title')}
      hint={t('creation.country.hint')}
      onBack={onBack}
      onRandomize={() => {
        const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
        const country = region.countries[Math.floor(Math.random() * region.countries.length)];
        onNext(country);
      }}
      step={step}
      totalSteps={totalSteps}
    >
      <div className="flex flex-col gap-5">
        {REGIONS.map((region) => (
          <div key={region.id}>
            <p className="text-xs uppercase tracking-wide font-semibold text-rift-onbg mb-2">
              {t(`region.${region.id}` as never)} · {region.league}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {region.countries.map((country) => (
                <button
                  key={country}
                  onClick={() => onNext(country)}
                  className="rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-3 py-2.5 text-sm text-left text-rift-text-bright transition-colors"
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WizardShell>
  );
}
