import { useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { overallRating } from '../data/creation';
import { generateTransferOffers } from '../data/clubs';
import { monthlySalary, contractLengthYears } from '../data/salary';
import { pickFinalMatch } from '../data/matches';
import { canAttemptPromotion, promotedTier, resolveContractRenewal, resolvePromotionMatch } from '../data/season';
import { internationalEventForSeason, internationalReward, qualifiesForInternational } from '../data/international';
import type { InternationalEventId, InternationalPlacement } from '../data/international';
import { coachOfferChance, forcedRetirementAge } from '../data/aging';
import { isAbroad, relocate } from '../data/homesickness';
import { resolveSeasonAwards } from '../data/awards';
import type { AwardId } from '../data/awards';
import type { MatchOption, MatchQuestion } from '../data/matchTypes';
import type { CareerLogEntry, CareerRecord, ClubOffer, SeasonPlacement } from '../types';
import { MatchCard } from './MatchCard';
import { InternationalBracket } from './InternationalBracket';

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

type Step =
  | { kind: 'summary' }
  | { kind: 'retirement'; reasonKey: string }
  | { kind: 'coachOffer' }
  | { kind: 'internationalIntro'; event: InternationalEventId }
  | { kind: 'internationalBracket'; event: InternationalEventId }
  | { kind: 'promotion'; match: MatchQuestion }
  | { kind: 'promotionResult'; promoted: boolean; tier?: string }
  | { kind: 'contractRenewed'; year: number }
  | { kind: 'transfer'; offers: ClubOffer[]; forced: boolean };

interface Props {
  career: CareerRecord;
  placement: SeasonPlacement;
  onFinish: (patch: Partial<CareerRecord>, logAdds: CareerLogEntry[]) => void;
}

// One-time resolution of individual awards + national/all-star selections for the season
// that just ended, computed once via useState's lazy initializer (the sanctioned place for
// a one-shot random computation) rather than mutated into refs during render.
function resolveSeasonWrapUp(career: CareerRecord, placement: SeasonPlacement, t: ReturnType<typeof useI18n>['t']) {
  const logs: CareerLogEntry[] = [];
  const awards: string[] = [];
  let popularity = 0;
  let selections = 0;
  const addWrapLog = (text: string) => logs.push({ age: career.age, month: career.month, text });

  const isFirstMajorSeason = career.club.tier === 'MAJOR' && !career.hasPlayedMajorSeason;
  const awardsResult = resolveSeasonAwards({
    seasonKills: career.seasonKills,
    seasonAssists: career.seasonAssists,
    placement,
    clubTier: career.club.tier,
    age: career.age,
    isFirstMajorSeason,
    overall: Math.round(overallRating(career.stats)),
  });
  const yearStr = String(career.year);
  const eventLabel = t(`intl.event.${internationalEventForSeason(career.seasonsPlayed)}` as never);
  for (const id of awardsResult.awardIds as AwardId[]) {
    awards.push(t(`award.${id}`, { year: yearStr, event: eventLabel }));
    addWrapLog(t(`award.${id}.log`, { event: eventLabel }));
  }
  if (awardsResult.wonWorldBestPlayer) {
    awards.push(t('award.WORLD_BEST', { year: yearStr }));
    addWrapLog(t('award.WORLD_BEST.log'));
  }

  const selectionChance =
    career.club.tier === 'MAJOR'
      ? placement === 'TOP'
        ? 0.5
        : placement === 'MID'
          ? 0.2
          : 0.05
      : career.club.tier === 'DIV2' && placement === 'TOP'
        ? 0.1
        : 0;
  if (Math.random() < selectionChance) {
    selections += 1;
    popularity += 3;
    addWrapLog(t('season.selection.log'));
  }

  return { logs, awards, popularity, selections };
}

export function SeasonEndFlow({ career, placement, onFinish }: Props) {
  const { t, lang } = useI18n();
  const [step, setStep] = useState<Step>({ kind: 'summary' });
  const [club, setClub] = useState<ClubOffer>(career.club);
  const [contractUntilYear, setContractUntilYear] = useState(career.contractUntilYear);
  const [seasonWrapUp] = useState(() => resolveSeasonWrapUp(career, placement, t));
  // Refs, not state: some handlers (e.g. the international bracket's onDone) write these
  // and then immediately call finishWith in the same synchronous call, before a re-render
  // would land a useState update. Refs read back their own writes immediately.
  const logAdds = useRef<CareerLogEntry[]>(seasonWrapUp.logs);
  const bonusMoney = useRef(0);
  const bonusPopularity = useRef(seasonWrapUp.popularity);
  const bonusTitles = useRef<string[]>([]);
  const bonusAwards = useRef<string[]>(seasonWrapUp.awards);
  const bonusSelections = useRef(seasonWrapUp.selections);

  const addLog = (text: string) => {
    logAdds.current = [...logAdds.current, { age: career.age, month: career.month, text }];
  };

  const basePatch = (patchClub: ClubOffer, patchContractUntilYear: number) => {
    const abroad = isAbroad(career.region, patchClub.region);
    const homesickness =
      patchClub.id === career.club.id ? career.homesickness : relocate(career.homesickness, abroad);
    return {
      club: patchClub,
      contractUntilYear: patchContractUntilYear,
      money: career.money + bonusMoney.current,
      careerEarnings: career.careerEarnings + Math.max(0, bonusMoney.current),
      popularity: clamp(career.popularity + bonusPopularity.current),
      titles: bonusTitles.current.length ? [...career.titles, ...bonusTitles.current] : career.titles,
      awards: bonusAwards.current.length ? [...career.awards, ...bonusAwards.current] : career.awards,
      selections: career.selections + bonusSelections.current,
      hasPlayedMajorSeason: career.hasPlayedMajorSeason || career.club.tier === 'MAJOR',
      homesickness,
    };
  };

  const finishWith = (patchClub: ClubOffer, patchContractUntilYear: number, extraLog: CareerLogEntry[] = []) => {
    onFinish(basePatch(patchClub, patchContractUntilYear), [...logAdds.current, ...extraLog]);
  };

  const retireNow = (reasonKey: string) => {
    addLog(t(reasonKey as never));
    onFinish(
      { ...basePatch(club, contractUntilYear), retired: true, retirementReason: reasonKey },
      logAdds.current,
    );
  };

  const startFlow = () => {
    const retirementAge = forcedRetirementAge(career.longevity);
    if (career.age >= retirementAge) {
      setStep({ kind: 'retirement', reasonKey: 'retire.age' });
      return;
    }
    if (career.age >= 27 && Math.random() < coachOfferChance(career.age, career.longevity)) {
      setStep({ kind: 'coachOffer' });
      return;
    }
    proceedAfterSummary();
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
        const offers = generateTransferOffers(club, overallRating(career.stats), placement, club.name, false);
        setStep({ kind: 'transfer', offers, forced: true });
      }
      return;
    }

    const poachChance = placement === 'TOP' ? 0.35 : placement === 'MID' ? 0.15 : 0.05;
    if (Math.random() < poachChance) {
      const offers = generateTransferOffers(club, overallRating(career.stats), placement, club.name, true);
      if (offers.length > 0) {
        setStep({ kind: 'transfer', offers, forced: false });
        return;
      }
    }
    finishWith(club, contractUntilYear);
  };

  if (step.kind === 'summary') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">
          🏁 {t('season.summary.title', { n: String(career.seasonsPlayed) })}
        </p>
        <p className="text-rift-text-bright font-medium">
          {t('season.summary.record', { wins: String(career.seasonWins), losses: String(career.seasonLosses) })}
        </p>
        <p className="text-rift-text">{t(`season.placement.${placement}` as never)}</p>
        {seasonWrapUp.awards.length > 0 && (
          <div className="flex flex-col gap-1">
            {seasonWrapUp.awards.map((award, i) => (
              <p key={i} className="text-sm text-rift-gold-bright font-medium">
                🎖️ {award}
              </p>
            ))}
          </div>
        )}
        {seasonWrapUp.selections > 0 && <p className="text-sm text-rift-blue font-medium">🌟 {t('season.selection.log')}</p>}
        <button
          onClick={startFlow}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'retirement') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">🏁 {t('retire.title')}</p>
        <p className="text-rift-text-bright font-semibold text-lg">{t(step.reasonKey as never)}</p>
        <button
          onClick={() => retireNow(step.reasonKey)}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
        >
          {t('season.continue')}
        </button>
      </div>
    );
  }

  if (step.kind === 'coachOffer') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-text-bright font-semibold text-lg">🎓 {t('retire.coachOffer.title')}</p>
        <p className="text-rift-text">{t('retire.coachOffer.text', { club: club.name })}</p>
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => retireNow('retire.coach')}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2.5 transition-colors"
          >
            {t('retire.coachOffer.accept')}
          </button>
          <button
            onClick={() => {
              addLog(t('retire.coachOffer.decline.log'));
              proceedAfterSummary();
            }}
            className="rounded-lg border border-rift-border text-rift-text-bright hover:border-rift-text px-6 py-2.5 transition-colors"
          >
            {t('retire.coachOffer.decline')}
          </button>
        </div>
      </div>
    );
  }

  if (step.kind === 'internationalIntro') {
    return (
      <div className="rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-6 text-center flex flex-col items-center gap-4">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase">🌍 {t(`intl.event.${step.event}` as never)}</p>
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
          💼 {t('season.transfer.title')}
        </p>
        <p className="text-sm text-rift-text text-center">{t('season.transfer.hint')}</p>
        <div className="flex flex-col gap-2.5">
          {step.offers.map((offer) => {
            const isCurrent = offer.id === club.id;
            const salary = monthlySalary(offer.tier, offer.region);
            return (
              <button
                key={offer.id}
                onClick={() => {
                  const newYear = career.year + contractLengthYears(offer.tier);
                  addLog(
                    t(isCurrent ? 'season.transfer.stay.log' : 'season.transfer.log', {
                      name: career.name,
                      club: offer.name,
                      tier: t(`tier.${offer.tier}` as never),
                      year: String(newYear),
                    }),
                  );
                  finishWith(offer, newYear);
                }}
                className={`text-left rounded-lg border px-4 py-3 flex items-center justify-between transition-colors ${
                  isCurrent
                    ? 'border-rift-gold bg-rift-gold/10 hover:bg-rift-gold/20'
                    : 'border-rift-border bg-rift-panel-2 hover:border-rift-blue'
                }`}
              >
                <div>
                  <div className="font-medium text-rift-text-bright">
                    {offer.name}
                    {isCurrent && (
                      <span className="ml-2 text-[10px] uppercase tracking-wide text-rift-gold-bright bg-rift-gold/20 rounded px-1.5 py-0.5">
                        {t('season.transfer.currentClub')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-rift-text">
                    {t(`tier.${offer.tier}` as never)} · {t('season.transfer.salary', { amount: String(salary) })}
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wide text-rift-blue shrink-0 ml-2">
                  {t('season.transfer.sign')}
                </span>
              </button>
            );
          })}
        </div>
        {!step.forced && (
          <button
            onClick={() => {
              addLog(t('season.transfer.decline.log', { club: club.name }));
              finishWith(club, contractUntilYear);
            }}
            className="text-sm text-rift-text hover:text-rift-text-bright transition-colors text-center"
          >
            {t('season.transfer.declineAll')}
          </button>
        )}
      </div>
    );
  }

  return null;
}
