import { useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { overallRating } from '../data/creation';
import { generateTransferOffers } from '../data/clubs';
import { contractLengthYears } from '../data/salary';
import { pickFinalMatch } from '../data/matches';
import { canAttemptPromotion, promotedTier, resolveContractRenewal, resolvePromotionMatch } from '../data/season';
import { internationalEventForSeason, internationalReward, qualifiesForInternational } from '../data/international';
import type { InternationalEventId, InternationalPlacement } from '../data/international';
import type { MatchOption, MatchQuestion } from '../data/matchTypes';
import type { CareerLogEntry, CareerRecord, ClubOffer, SeasonPlacement } from '../types';
import { MatchCard } from './MatchCard';
import { InternationalBracket } from './InternationalBracket';

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

type Step =
  | { kind: 'summary' }
  | { kind: 'internationalIntro'; event: InternationalEventId }
  | { kind: 'internationalBracket'; event: InternationalEventId }
  | { kind: 'promotion'; match: MatchQuestion }
  | { kind: 'promotionResult'; promoted: boolean; tier?: string }
  | { kind: 'contractRenewed'; year: number }
  | { kind: 'transfer'; offers: ClubOffer[]; forced: boolean }
  | { kind: 'poach'; offer: ClubOffer };

interface Props {
  career: CareerRecord;
  placement: SeasonPlacement;
  onFinish: (patch: Partial<CareerRecord>, logAdds: CareerLogEntry[]) => void;
}

export function SeasonEndFlow({ career, placement, onFinish }: Props) {
  const { t, lang } = useI18n();
  const [step, setStep] = useState<Step>({ kind: 'summary' });
  const [club, setClub] = useState<ClubOffer>(career.club);
  const [contractUntilYear, setContractUntilYear] = useState(career.contractUntilYear);
  // Refs, not state: some handlers (e.g. the international bracket's onDone) write these
  // and then immediately call finishWith in the same synchronous call, before a re-render
  // would land a useState update. Refs read back their own writes immediately.
  const logAdds = useRef<CareerLogEntry[]>([]);
  const bonusMoney = useRef(0);
  const bonusPopularity = useRef(0);
  const bonusTitles = useRef<string[]>([]);
  const bonusAwards = useRef<string[]>([]);

  const addLog = (text: string) => {
    logAdds.current = [...logAdds.current, { age: career.age, month: career.month, text }];
  };

  const finishWith = (patchClub: ClubOffer, patchContractUntilYear: number, extraLog: CareerLogEntry[] = []) => {
    onFinish(
      {
        club: patchClub,
        contractUntilYear: patchContractUntilYear,
        money: career.money + bonusMoney.current,
        careerEarnings: career.careerEarnings + Math.max(0, bonusMoney.current),
        popularity: clamp(career.popularity + bonusPopularity.current),
        titles: bonusTitles.current.length ? [...career.titles, ...bonusTitles.current] : career.titles,
        awards: bonusAwards.current.length ? [...career.awards, ...bonusAwards.current] : career.awards,
      },
      [...logAdds.current, ...extraLog],
    );
  };

  const proceedAfterSummary = () => {
    if (qualifiesForInternational(club.tier, placement)) {
      setStep({ kind: 'internationalIntro', event: internationalEventForSeason(career.seasonsPlayed) });
      return;
    }
    if (canAttemptPromotion(club.tier, placement)) {
      setStep({ kind: 'promotion', match: pickFinalMatch(lang) });
      return;
    }
    proceedToContract();
  };

  const proceedToContract = () => {
    const contractExpired = career.year >= contractUntilYear;
    if (contractExpired) {
      const renewed = resolveContractRenewal(placement);
      if (renewed) {
        const newYear = career.year + contractLengthYears(club.tier);
        setContractUntilYear(newYear);
        addLog(t('season.contract.renewed.log', { club: club.name, year: String(newYear) }));
        setStep({ kind: 'contractRenewed', year: newYear });
      } else {
        addLog(t('season.contract.notRenewed.log', { club: club.name }));
        const offers = generateTransferOffers(club, overallRating(career.stats), placement, club.name);
        setStep({ kind: 'transfer', offers, forced: true });
      }
      return;
    }

    const poachChance = placement === 'TOP' ? 0.35 : placement === 'MID' ? 0.15 : 0.05;
    if (Math.random() < poachChance) {
      const offers = generateTransferOffers(club, overallRating(career.stats), placement, club.name);
      if (offers.length > 0) {
        setStep({ kind: 'poach', offer: offers[0] });
        return;
      }
    }
    finishWith(club, contractUntilYear);
  };

  if (step.kind === 'summary') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">
          {t('season.summary.title', { n: String(career.seasonsPlayed) })}
        </p>
        <p className="text-rift-text-bright font-medium">
          {t('season.summary.record', { wins: String(career.seasonWins), losses: String(career.seasonLosses) })}
        </p>
        <p className="text-rift-text">{t(`season.placement.${placement}` as never)}</p>
        <button
          onClick={proceedAfterSummary}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'internationalIntro') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">{t(`intl.event.${step.event}` as never)}</p>
        <p className="text-rift-text-bright font-semibold text-lg">{t('intl.qualified.title')}</p>
        <p className="text-rift-text">
          {t('intl.qualified.text', { club: club.name, event: t(`intl.event.${step.event}` as never) })}
        </p>
        <button
          onClick={() => setStep({ kind: 'internationalBracket', event: step.event })}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'internationalBracket') {
    return (
      <InternationalBracket
        event={step.event}
        ourName={club.name}
        stats={career.stats}
        onDone={(finalPlacement: InternationalPlacement, reward: ReturnType<typeof internationalReward>) => {
          bonusMoney.current += reward.money;
          bonusPopularity.current += reward.popularity;
          const eventLabel = t(`intl.event.${step.event}` as never);
          if (reward.grantsTitle) {
            bonusTitles.current = [
              ...bonusTitles.current,
              t('intl.title', { event: eventLabel, year: String(career.year) }),
            ];
          }
          if (reward.grantsAward) {
            bonusAwards.current = [
              ...bonusAwards.current,
              t(`intl.award.${finalPlacement}` as never, { event: eventLabel, year: String(career.year) }),
            ];
          }
          addLog(t(`intl.log.${finalPlacement}` as never, { event: eventLabel }));
          proceedToContract();
        }}
      />
    );
  }

  if (step.kind === 'promotion') {
    return (
      <div className="flex flex-col gap-4">
        <p className="rounded-xl border border-rift-gold/50 bg-rift-panel/90 p-4 text-sm text-rift-text-bright text-center">
          {t('season.promotion.intro')}
        </p>
        <MatchCard
          match={step.match}
          badge={t('match.badge.promotion')}
          resolveWin={(option: MatchOption) => resolvePromotionMatch(option, career.stats)}
          onResult={(_option, won) => {
            if (won) {
              const tier = promotedTier(club.tier);
              const newClub = { ...club, tier };
              setClub(newClub);
              addLog(t('season.promotion.log.win', { club: newClub.name, tier: t(`tier.${tier}` as never) }));
              setStep({ kind: 'promotionResult', promoted: true, tier: t(`tier.${tier}` as never) });
            } else {
              addLog(t('season.promotion.log.loss'));
              setStep({ kind: 'promotionResult', promoted: false });
            }
          }}
        />
      </div>
    );
  }

  if (step.kind === 'promotionResult') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-text-bright font-semibold text-lg">
          {t(step.promoted ? 'season.promotion.win.title' : 'season.promotion.loss.title')}
        </p>
        <p className="text-rift-text">
          {step.promoted
            ? t('season.promotion.win.text', { club: club.name, tier: step.tier ?? '' })
            : t('season.promotion.loss.text')}
        </p>
        <button
          onClick={proceedToContract}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'contractRenewed') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-text-bright font-semibold text-lg">{t('season.contract.renewed.title')}</p>
        <p className="text-rift-text">{t('season.contract.renewed.text', { club: club.name, year: String(step.year) })}</p>
        <button
          onClick={() => finishWith(club, step.year)}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'transfer') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 flex flex-col gap-4">
        {step.forced && (
          <p className="text-center text-rift-text">{t('season.contract.notRenewed.text', { club: club.name })}</p>
        )}
        <p className="text-xs uppercase tracking-wide text-rift-gold font-semibold text-center">
          {t('season.transfer.title')}
        </p>
        <p className="text-sm text-rift-text text-center">{t('season.transfer.hint')}</p>
        <div className="flex flex-col gap-2.5">
          {step.offers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => {
                const newYear = career.year + contractLengthYears(offer.tier);
                addLog(
                  t('season.transfer.log', {
                    name: career.name,
                    club: offer.name,
                    tier: t(`tier.${offer.tier}` as never),
                    year: String(newYear),
                  }),
                );
                finishWith(offer, newYear);
              }}
              className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-3 flex items-center justify-between transition-colors"
            >
              <div>
                <div className="font-medium text-rift-text-bright">{offer.name}</div>
                <div className="text-xs text-rift-text">{t(`tier.${offer.tier}` as never)}</div>
              </div>
              <span className="text-xs uppercase tracking-wide text-rift-blue">{t('season.transfer.sign')}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.kind === 'poach') {
    const offer = step.offer;
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-text-bright font-semibold text-lg">{t('season.poach.title')}</p>
        <p className="text-rift-text">{t('season.poach.text', { club: offer.name, current: club.name })}</p>
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => {
              const newYear = career.year + contractLengthYears(offer.tier);
              addLog(
                t('season.transfer.log', {
                  name: career.name,
                  club: offer.name,
                  tier: t(`tier.${offer.tier}` as never),
                  year: String(newYear),
                }),
              );
              finishWith(offer, newYear);
            }}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
          >
            {t('season.poach.accept', { club: offer.name })}
          </button>
          <button
            onClick={() => {
              addLog(t('season.poach.decline.log', { club: offer.name, current: club.name }));
              finishWith(club, contractUntilYear);
            }}
            className="rounded-lg border border-rift-border text-rift-text-bright hover:border-rift-text px-6 py-2.5 transition-colors"
          >
            {t('season.poach.decline', { current: club.name })}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
