import { useState } from 'react';
import { useI18n } from '../i18n';
import { overallRating } from '../data/creation';
import { annualSalary } from '../data/salary';
import type { CareerRecord, StatKey } from '../types';
import { Avatar } from './Avatar';
import { StatBar } from './StatBar';
import { PotentialStars } from './PotentialStars';

const CORE_STATS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

export function PlayerCard({ career }: { career: CareerRecord }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const ovr = Math.round(overallRating(career.stats));
  const salary = annualSalary(career.club.tier, career.region);

  return (
    <div className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar name={career.name} />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-rift-text-bright truncate">{career.name}</h1>
          <p className="text-sm text-rift-text mt-0.5">
            {career.country} · {t('play.ageYears', { age: String(career.age) })}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="inline-block rounded-full border border-rift-blue/40 bg-rift-blue/10 text-rift-blue text-xs font-medium px-3 py-1">
              {t(`role.${career.role}` as never)}
            </span>
            {career.traits.map((traitId) => (
              <span
                key={traitId}
                title={t(`trait.${traitId}.desc` as never)}
                className="inline-block rounded-full border border-rift-gold/50 bg-rift-gold/10 text-rift-gold-bright text-xs font-medium px-2.5 py-1"
              >
                {t(`trait.${traitId}` as never)}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="rounded-lg bg-rift-gold text-rift-bg font-bold text-xl px-3 py-1.5 leading-none">{ovr}</div>
          <span className="text-xs font-medium text-rift-text-bright whitespace-nowrap">💰 {career.money}€</span>
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
        <div className="text-right shrink-0">
          <p className="text-[11px] text-rift-text uppercase tracking-wide">{t('players.potential')}</p>
          <PotentialStars value={career.potential} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatBar label={t('card.form')} value={career.form} color="bg-rift-green" />
        <StatBar label={t('card.morale')} value={career.morale} color="bg-rift-blue" />
      </div>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center justify-center gap-1.5 text-xs font-medium text-rift-blue hover:text-rift-blue-dark transition-colors py-1"
      >
        {expanded ? t('card.collapse') : t('card.expand')}
        <span className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {expanded && (
        <div className="flex flex-col gap-5 animate-[fadeIn_0.25s_ease-out]">
          {career.region !== career.club.region && (
            <StatBar label={`🏠 ${t('card.homesickness')}`} value={career.homesickness} color="bg-rift-red" />
          )}

          <div className="border-t border-rift-border pt-4">
            <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">📊 {t('play.stats')}</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {CORE_STATS.map((key) => (
                <StatBar key={key} label={t(`stat.${key}` as never)} value={career.stats[key]} color="bg-rift-gold" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm border-t border-rift-border pt-4">
            <StatRow label={t('card.matchesPlayed')} value={career.matchesPlayed} />
            <StatRow label={t('card.wins')} value={career.wins} />
            <StatRow label={t('card.losses')} value={career.losses} />
            <StatRow label={t('card.mvp')} value={career.mvpCount} />
            <StatRow label={t('card.kills')} value={career.careerKills} />
            <StatRow label={t('card.assists')} value={career.careerAssists} />
            <StatRow label={t('card.cs')} value={career.careerCS} />
            <StatRow label={t('card.reputation')} value={career.popularity} />
          </div>

          <section>
            <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">🏆 {t('card.trophies')}</h2>
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
            <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">🎖️ {t('card.individualAwards')}</h2>
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
            <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">📈 {t('card.trajectory')}</h2>
            {career.ratingHistory.length === 0 ? (
              <p className="text-sm text-rift-text italic mb-2">{t('card.trajectoryHint')}</p>
            ) : (
              <RatingSparkline history={career.ratingHistory} />
            )}
            <div className="flex flex-col gap-1.5 text-sm mt-2">
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

          <section>
            <h2 className="text-sm uppercase tracking-wide text-rift-text mb-2">🏟️ {t('card.clubHistory')}</h2>
            <ul className="flex flex-col gap-1.5 text-sm">
              {[...career.clubHistory].reverse().map((entry, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="text-rift-text-bright font-medium truncate">
                    {entry.name}{' '}
                    <span className="text-[10px] font-normal text-rift-text border border-rift-border rounded px-1 py-0.5 ml-1">
                      {t(`tier.short.${entry.tier}` as never)}
                    </span>
                  </span>
                  <span className="text-rift-text text-xs shrink-0">
                    {entry.fromYear}–{entry.toYear ?? t('card.clubHistory.present')}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-rift-text">{label}</span>
      <span className="text-rift-gold-bright font-medium">{Math.round(value)}</span>
    </div>
  );
}

function RatingSparkline({ history }: { history: number[] }) {
  const points = history.slice(-12);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const w = 240;
  const h = 48;
  const step = points.length > 1 ? w / (points.length - 1) : 0;
  const coords = points.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <div className="flex items-center gap-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px] h-12">
        <polyline points={coords.join(' ')} fill="none" stroke="var(--color-rift-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => {
          const [x, y] = c.split(',');
          return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--color-rift-gold)" />;
        })}
      </svg>
      <span className="text-rift-gold-bright font-semibold text-sm">{points[points.length - 1]}</span>
    </div>
  );
}
