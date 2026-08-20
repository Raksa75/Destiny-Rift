import { useI18n } from '../i18n';
import { overallRating } from '../data/creation';
import { annualSalary } from '../data/salary';
import type { CareerRecord, StatKey } from '../types';
import { Avatar } from './Avatar';
import { StatBar } from './StatBar';
import { PotentialStars } from './PotentialStars';

const CORE_STATS_A: StatKey[] = ['micro', 'macro', 'teamfight', 'lane'];
const CORE_STATS_B: StatKey[] = ['mental', 'serious'];

export function PlayerCard({ career }: { career: CareerRecord }) {
  const { t } = useI18n();

  const ovr = Math.round(overallRating(career.stats));
  const reputationStars = Math.max(0, Math.min(5, Math.round(career.popularity / 20)));
  const salary = annualSalary(career.club.tier, career.region);

  return (
    <div className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5 flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <Avatar name={career.name} />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-rift-text-bright truncate">{career.name}</h1>
          <p className="text-sm text-rift-text mt-0.5">
            {career.country} · {t('play.ageYears', { age: String(career.age) })}
          </p>
          <span className="inline-block mt-2 rounded-full border border-rift-blue/40 bg-rift-blue/10 text-rift-blue text-xs font-medium px-3 py-1">
            {t(`role.${career.role}` as never)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="rounded-lg bg-rift-gold text-rift-bg font-bold text-xl px-3 py-1.5 leading-none">
            {ovr}
          </div>
          <div className="text-right">
            <p className="text-[11px] text-rift-text uppercase tracking-wide">{t('card.reputation')}</p>
            <PotentialStars value={reputationStars} />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-rift-text uppercase tracking-wide">{t('players.potential')}</p>
            <PotentialStars value={career.potential} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-rift-border bg-rift-panel-2 px-4 py-3">
        <div>
          <p className="font-medium text-rift-text-bright">
            {career.club.name}{' '}
            <span className="text-xs font-normal text-rift-text border border-rift-border rounded px-1.5 py-0.5 ml-1">
              {t(`tier.short.${career.club.tier}` as never)}
            </span>
          </p>
          <p className="text-xs text-rift-blue mt-1">
            {t('card.contract', { salary: String(Math.round(salary / 1000)), year: String(career.contractUntilYear) })}
          </p>
        </div>
      </div>

      <div className="border-t border-rift-border pt-5">
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">{t('play.stats')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
          <div className="flex flex-col gap-2">
            <StatRow label={t('card.matchesPlayed')} value={career.matchesPlayed} />
            <StatRow label={t('card.wins')} value={career.wins} />
            <StatRow label={t('card.mvp')} value={career.mvpCount} />
            <StatRow label={t('card.selections')} value={career.selections} />
          </div>
          <div className="flex flex-col gap-2">
            {CORE_STATS_A.map((key) => (
              <StatRow key={key} label={t(`stat.${key}` as never)} value={career.stats[key]} highlight />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {CORE_STATS_B.map((key) => (
              <StatRow key={key} label={t(`stat.${key}` as never)} value={career.stats[key]} highlight />
            ))}
            <StatRow label={t('card.reputation')} value={career.popularity} highlight />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatBar label={t('card.form')} value={career.form} color="bg-rift-green" />
        <StatBar label={t('card.morale')} value={career.morale} color="bg-rift-blue" />
      </div>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">{t('card.trophies')}</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-rift-text-bright">{t('card.titlesWon')}</span>
          <span className="text-rift-text-bright font-medium">{career.titles.length}</span>
        </div>
        {career.titles.length === 0 ? (
          <p className="text-sm text-rift-text italic mt-1">{t('card.titlesEmpty')}</p>
        ) : (
          <ul className="text-sm text-rift-text-bright list-disc list-inside mt-1">
            {career.titles.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">{t('card.individualAwards')}</h2>
        {career.awards.length === 0 ? (
          <p className="text-sm text-rift-text italic">{t('card.awardsEmpty')}</p>
        ) : (
          <ul className="text-sm text-rift-text-bright list-disc list-inside">
            {career.awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">{t('card.trajectory')}</h2>
        <p className="text-sm text-rift-text italic mb-2">{t('card.trajectoryHint')}</p>
        <div className="flex flex-col gap-1.5 text-sm">
          <StatRow label={t('card.seasonsPlayed')} value={career.seasonsPlayed} />
          <div className="flex items-center justify-between">
            <span className="text-rift-text">{t('card.trainingClub')}</span>
            <span className="text-rift-text-bright font-medium">{career.firstClub.name}</span>
          </div>
          <StatRow label={t('card.peakOvr')} value={career.peakOverall} />
          <div className="flex items-center justify-between">
            <span className="text-rift-text">{t('card.careerEarnings')}</span>
            <span className="text-rift-text-bright font-medium">{career.careerEarnings}€</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-rift-text">{label}</span>
      <span className={highlight ? 'text-rift-gold-bright font-medium' : 'text-rift-text-bright font-medium'}>
        {Math.round(value)}
      </span>
    </div>
  );
}
