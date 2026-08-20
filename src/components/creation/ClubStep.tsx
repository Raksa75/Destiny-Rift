import { useI18n } from '../../i18n';
import { REGIONS } from '../../data/regions';
import type { ClubOffer, PlayerStats, RegionId, StatKey } from '../../types';
import { StatBar } from '../StatBar';
import { PotentialStars } from '../PotentialStars';
import { WizardShell } from './WizardShell';

interface Props {
  stats: PlayerStats;
  potential: number;
  popularity: number;
  offers: ClubOffer[];
  region: RegionId;
  onNext: (club: ClubOffer) => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

const TIER_COLOR: Record<ClubOffer['tier'], string> = {
  MAJOR: 'text-rift-gold-bright border-rift-gold/50',
  DIV2: 'text-rift-blue border-rift-blue/40',
  DIV3: 'text-rift-text-bright border-rift-border',
  DIV4: 'text-rift-text border-rift-border',
};

export function ClubStep({ stats, potential, popularity, offers, region, onNext, onBack, step, totalSteps }: Props) {
  const { t } = useI18n();
  const league = REGIONS.find((r) => r.id === region)?.league ?? '';

  return (
    <WizardShell
      title={t('creation.club.title')}
      hint={t('creation.club.hint', { league })}
      onBack={onBack}
      step={step}
      totalSteps={totalSteps}
    >
      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-rift-border bg-rift-panel/80 p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-xs uppercase tracking-wide text-rift-text">{t('creation.club.statsReveal')}</p>
            <div className="flex items-center gap-4 text-xs text-rift-text">
              <span>
                {t('players.popularity')}: <span className="text-rift-text-bright font-medium">{popularity}</span>
              </span>
              <span className="flex items-center gap-1.5">
                {t('players.potential')}:
                <PotentialStars value={potential} />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {STAT_KEYS.map((key) => (
              <StatBar key={key} label={t(`stat.${key}` as never)} value={stats[key]} color="bg-rift-gold" />
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-2.5">
          {offers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => onNext(offer)}
              className={`text-left rounded-lg border bg-rift-panel-2 hover:bg-rift-panel px-4 py-3 flex items-center justify-between transition-colors ${TIER_COLOR[offer.tier]}`}
            >
              <div>
                <div className="font-medium">{offer.name}</div>
                <div className="text-xs opacity-80">{t(`tier.${offer.tier}` as never)}</div>
              </div>
              <span className="text-xs uppercase tracking-wide">{t('creation.club.pick')}</span>
            </button>
          ))}
        </div>
      </div>
    </WizardShell>
  );
}
