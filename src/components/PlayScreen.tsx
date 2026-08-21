import { useState } from 'react';
import { useI18n } from '../i18n';
import { pickQuestion } from '../data/questions';
import { generateMatchPerformance, pickRegularMatch, resolveMatch } from '../data/matches';
import { monthlySalary } from '../data/salary';
import { overallRating } from '../data/creation';
import { computeSeasonPlacement, padSeasonRecord } from '../data/season';
import { growthMultiplier, naturalDecay } from '../data/aging';
import { isAbroad, moraleDrain, monthlyDecay as homesicknessDecay } from '../data/homesickness';
import { computeSuccessChance, outcomeNarrativeKey, resolveOutcome } from '../data/outcomes';
import type { RiskLevel } from '../data/outcomes';
import { rollTraitUnlock, applyTraitBuff } from '../data/traits';
import type { QuestionOption } from '../data/questionTypes';
import type { MatchOption, MatchQuestion } from '../data/matchTypes';
import { SEASON_LENGTH_MONTHS } from '../types';
import type { CareerLogEntry, CareerRecord, SeasonPlacement, StatKey } from '../types';
import { PlayerCard } from './PlayerCard';
import { MatchCard } from './MatchCard';
import { SeasonEndFlow } from './SeasonEndFlow';
import { ResultCard } from './ResultCard';
import type { DeltaItem } from './ResultCard';

interface Props {
  career: CareerRecord;
  onUpdate: (record: CareerRecord) => void;
  onBack: () => void;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];
const MONTH_KEYS = Array.from({ length: 12 }, (_, i) => `month.${i + 1}`);
const RISK_BADGE_CLASS: Record<RiskLevel, string> = {
  safe: 'text-rift-green bg-rift-green/10',
  medium: 'text-rift-blue bg-rift-blue/10',
  risky: 'text-rift-red bg-rift-red/10',
};
// A little passive recovery every month — form shouldn't just monotonically bleed out
// between the explicit drains of training, matches, and rough choices.
const FORM_REGEN = 4;

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

type Turn = { kind: 'question' } | { kind: 'match'; match: MatchQuestion; isFinal: boolean };

function rollTurn(career: CareerRecord, lang: 'fr' | 'en'): Turn {
  const monthInSeason = (career.turnCount % SEASON_LENGTH_MONTHS) + 1;
  if (monthInSeason === SEASON_LENGTH_MONTHS) {
    return { kind: 'match', match: pickRegularMatch(lang), isFinal: true };
  }
  if (Math.random() < 0.45) {
    return { kind: 'match', match: pickRegularMatch(lang), isFinal: false };
  }
  return { kind: 'question' };
}

interface PendingResult {
  updated: CareerRecord;
  narrative: string;
  badge?: string;
  deltas: DeltaItem[];
  extraLines: string[];
  traitUnlock?: string;
  seasonJustEnded: boolean;
}

export function PlayScreen({ career, onUpdate, onBack }: Props) {
  const { t, lang } = useI18n();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [question, setQuestion] = useState(() => pickQuestion(lang, []));
  const [turn, setTurn] = useState<Turn>(() => rollTurn(career, lang));
  const [seasonPlacement, setSeasonPlacement] = useState<SeasonPlacement | null>(null);
  const [pending, setPending] = useState<PendingResult | null>(null);

  const computeOutcome = (params: {
    statDeltas: Partial<CareerRecord['stats']>;
    moneyDelta: number;
    popularityDelta: number;
    formDelta: number;
    moraleDelta: number;
    narrative: string;
    badge?: string;
    traitBuff?: Partial<CareerRecord['stats']>;
    traitUnlock?: string;
    matchOutcome?: boolean;
    matchPerf?: { kills: number; assists: number; cs: number };
  }) => {
    const abroad = isAbroad(career.region, career.club.region);
    const homesickness = homesicknessDecay(career.homesickness, abroad);
    const drain = moraleDrain(homesickness);
    const languageBarrier = abroad && homesickness > 55;

    const mult = growthMultiplier(career.age) * (languageBarrier ? 0.85 : 1);
    const decay = naturalDecay(career.age, career.longevity);
    let stats = { ...career.stats };
    const statDeltaItems: DeltaItem[] = [];
    for (const key of STAT_KEYS) {
      const chosen = params.statDeltas[key] ?? 0;
      const scaledChosen = chosen >= 0 ? chosen * mult : chosen * (2 - mult);
      const total = Math.round(scaledChosen) + (decay[key] ?? 0);
      if (total !== 0) {
        stats[key] = clamp(stats[key] + total);
        statDeltaItems.push({ label: t(`stat.${key}` as never), value: total });
      }
    }
    if (params.traitBuff) {
      stats = applyTraitBuff(stats, params.traitBuff);
    }

    let month = career.month + 1;
    let age = career.age;
    let year = career.year;
    if (month > 12) {
      month = 1;
      age += 1;
      year += 1;
    }

    const salary = monthlySalary(career.club.tier, career.region);
    const moneyGain = params.moneyDelta + salary;
    const money = career.money + moneyGain;
    const careerEarnings = career.careerEarnings + Math.max(0, moneyGain);
    const popularity = clamp(career.popularity + params.popularityDelta);
    const form = clamp(career.form + params.formDelta + FORM_REGEN);
    const morale = clamp(career.morale + params.moraleDelta - drain);
    const peakOverall = Math.max(career.peakOverall, Math.round(overallRating(stats)));

    const turnCount = career.turnCount + 1;
    const seasonsPlayed = Math.floor(turnCount / SEASON_LENGTH_MONTHS);
    const seasonJustEnded = seasonsPlayed > career.seasonsPlayed;

    let matchesPlayed = career.matchesPlayed;
    let wins = career.wins;
    let losses = career.losses;
    let mvpCount = career.mvpCount;
    let seasonWins = career.seasonWins;
    let seasonLosses = career.seasonLosses;
    let careerKills = career.careerKills;
    let careerAssists = career.careerAssists;
    let careerCS = career.careerCS;
    let seasonKills = career.seasonKills;
    let seasonAssists = career.seasonAssists;
    const extraLines: string[] = [];
    let mvpThisMatch = false;

    if (params.matchOutcome !== undefined) {
      matchesPlayed += 1;
      if (params.matchOutcome) {
        wins += 1;
        seasonWins += 1;
        if (Math.random() < 0.12) {
          mvpCount += 1;
          mvpThisMatch = true;
        }
      } else {
        losses += 1;
        seasonLosses += 1;
      }
      if (params.matchPerf) {
        careerKills += params.matchPerf.kills;
        careerAssists += params.matchPerf.assists;
        careerCS += params.matchPerf.cs;
        seasonKills += params.matchPerf.kills;
        seasonAssists += params.matchPerf.assists;
        extraLines.push(
          t('play.match.stats', {
            kills: String(params.matchPerf.kills),
            assists: String(params.matchPerf.assists),
            cs: String(params.matchPerf.cs),
          }),
        );
      }
    }
    if (mvpThisMatch) extraLines.push(t('match.mvp.log'));
    if (languageBarrier) extraLines.push(t('play.homesick.log'));

    extraLines.push(t('play.salary.log', { amount: String(salary), club: career.club.name }));

    const moneyDeltaTotal = moneyGain;
    const deltas: DeltaItem[] = [
      ...statDeltaItems,
      ...(moneyDeltaTotal !== 0 ? [{ label: '€', value: moneyDeltaTotal }] : []),
      ...(params.popularityDelta !== 0 ? [{ label: t('card.reputation'), value: params.popularityDelta }] : []),
      ...(form - career.form !== 0 ? [{ label: t('card.form'), value: form - career.form }] : []),
      ...(morale - career.morale !== 0 ? [{ label: t('card.morale'), value: morale - career.morale }] : []),
    ];

    const logEntry: CareerLogEntry = {
      age: career.age,
      month: career.month,
      text: [params.narrative, ...extraLines].join(' '),
    };

    const updated: CareerRecord = {
      ...career,
      stats,
      money,
      careerEarnings,
      popularity,
      form,
      morale,
      peakOverall,
      age,
      month,
      year,
      homesickness,
      turnCount,
      seasonsPlayed,
      matchesPlayed,
      wins,
      losses,
      mvpCount,
      seasonWins,
      seasonLosses,
      careerKills,
      careerAssists,
      careerCS,
      seasonKills,
      seasonAssists,
      log: [logEntry, ...career.log].slice(0, 30),
    };

    setPending({
      updated,
      narrative: params.narrative,
      badge: params.badge,
      deltas,
      extraLines,
      traitUnlock: params.traitUnlock,
      seasonJustEnded,
    });
  };

  const handleQuestionAnswer = (option: QuestionOption) => {
    const nextRecentIds = [question.id, ...recentIds].slice(0, 4);
    setRecentIds(nextRecentIds);
    setQuestion(pickQuestion(lang, nextRecentIds));

    const risk = option.risk ?? 'medium';
    const relevantStat = option.relevantStat ?? 'mental';
    const chance = computeSuccessChance(risk, career.stats[relevantStat], career.club.tier);
    const succeeded = Math.random() < chance;
    const resolved = resolveOutcome(succeeded, option);
    const narrative = t(outcomeNarrativeKey(succeeded, option.alias, false) as never, { action: option.text });

    let traitBuff: Partial<CareerRecord['stats']> | undefined;
    let traitUnlock: string | undefined;
    if (succeeded) {
      const unlocked = rollTraitUnlock(option.alias, career.traits);
      if (unlocked) {
        traitBuff = unlocked.buff;
        traitUnlock = t('trait.unlocked', { trait: t(`trait.${unlocked.id}` as never) });
      }
    }

    computeOutcome({
      statDeltas: resolved.statDeltas,
      moneyDelta: resolved.moneyDelta,
      popularityDelta: resolved.popularityDelta,
      formDelta: resolved.formDelta,
      moraleDelta: resolved.moraleDelta,
      narrative,
      traitBuff,
      traitUnlock,
    });
  };

  const handleMatchAnswer = (option: MatchOption, won: boolean, isFinal: boolean) => {
    const perf = generateMatchPerformance(career.role, career.stats, won);
    const narrative = t(outcomeNarrativeKey(won, undefined, true) as never, { action: option.text });
    computeOutcome({
      statDeltas: {},
      moneyDelta: won ? 100 : 0,
      popularityDelta: won ? 2 : -1,
      formDelta: -3,
      moraleDelta: won ? 3 : -3,
      narrative,
      badge: t(won ? 'intl.result.win' : 'intl.result.loss'),
      matchOutcome: won,
      matchPerf: perf,
    });
    void isFinal;
  };

  const commitPending = () => {
    if (!pending) return;
    const { updated, seasonJustEnded } = pending;
    if (!seasonJustEnded) {
      onUpdate(updated);
      setPending(null);
      setTurn(rollTurn(updated, lang));
      return;
    }

    const padded = padSeasonRecord(updated.seasonWins, updated.seasonLosses);
    const paddedLog: CareerLogEntry = {
      age: updated.age,
      month: updated.month,
      text: t('play.season.padded.log', {
        wins: String(padded.addedWins),
        losses: String(padded.addedLosses),
      }),
    };
    const finalUpdated: CareerRecord = {
      ...updated,
      seasonWins: padded.wins,
      seasonLosses: padded.losses,
      wins: updated.wins + padded.addedWins,
      losses: updated.losses + padded.addedLosses,
      matchesPlayed: updated.matchesPlayed + padded.addedWins + padded.addedLosses,
      ratingHistory: [...updated.ratingHistory, Math.round(overallRating(updated.stats))].slice(-20),
      log: [paddedLog, ...updated.log].slice(0, 30),
    };
    onUpdate(finalUpdated);
    setPending(null);
    setSeasonPlacement(computeSeasonPlacement(finalUpdated.seasonWins, finalUpdated.seasonLosses));
  };

  const monthInSeason = (career.turnCount % SEASON_LENGTH_MONTHS) + 1;
  const monthName = t(MONTH_KEYS[career.month - 1] as never);

  return (
    <div className="min-h-svh px-4 py-6 pb-10 max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mt-12">
        <div>
          <p className="text-2xl font-bold text-rift-gold-bright leading-none">
            {monthName} {career.year}
          </p>
          <p className="text-sm text-rift-blue font-medium mt-1">
            🏆 {t('play.season', { n: String(career.seasonsPlayed + 1) })} · {monthInSeason}/{SEASON_LENGTH_MONTHS}
          </p>
        </div>
        <button onClick={onBack} className="text-sm text-rift-onbg-muted hover:text-rift-onbg transition-colors shrink-0">
          {t('common.menu')}
        </button>
      </div>

      <PlayerCard career={career} />

      {seasonPlacement ? (
        <SeasonEndFlow
          career={career}
          placement={seasonPlacement}
          onFinish={(patch, extraLogs) => {
            const merged: CareerRecord = {
              ...career,
              ...patch,
              seasonWins: 0,
              seasonLosses: 0,
              seasonKills: 0,
              seasonAssists: 0,
              log: [...[...extraLogs].reverse(), ...career.log].slice(0, 30),
            };
            onUpdate(merged);
            setSeasonPlacement(null);
            setTurn(rollTurn(merged, lang));
          }}
        />
      ) : pending ? (
        <ResultCard
          badge={pending.badge}
          narrative={pending.narrative}
          deltas={pending.deltas}
          extraLines={pending.extraLines}
          traitUnlock={pending.traitUnlock}
          onContinue={commitPending}
          continueLabel={t('season.continue')}
        />
      ) : turn.kind === 'match' ? (
        <MatchCard
          match={turn.match}
          badge={t(turn.isFinal ? 'match.badge.final' : 'match.badge.regular')}
          resolveWin={(option) => resolveMatch(option, career.stats)}
          onResult={(option, won) => handleMatchAnswer(option, won, turn.isFinal)}
        />
      ) : (
        <section className="rounded-2xl border border-rift-blue/40 bg-rift-panel/80 p-5 animate-[fadeIn_0.2s_ease-out]">
          <p className="text-rift-text-bright font-medium mb-4">💬 {question.text}</p>
          <div className="flex flex-col gap-2.5">
            {question.options.map((option) => {
              const risk = option.risk ?? 'medium';
              const badgeLabel = option.alias ? t(`alias.${option.alias}` as never) : t(`risk.${risk}` as never);
              return (
                <button
                  key={option.id}
                  onClick={() => handleQuestionAnswer(option)}
                  className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue active:scale-[0.99] px-4 py-3 text-sm text-rift-text-bright transition-all"
                >
                  <span className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`shrink-0 text-[10px] uppercase tracking-wide font-semibold rounded-full px-2 py-0.5 ${RISK_BADGE_CLASS[risk]}`}
                    >
                      {badgeLabel}
                    </span>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">📓 {t('play.journal')}</h2>
        <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
          {career.log.map((entry, i) => (
            <div key={i} className="border-l-2 border-rift-border pl-3 py-1 text-sm text-rift-text">
              <span className="text-xs mr-2">
                {entry.age} {lang === 'fr' ? 'ans' : 'yo'} · M{entry.month}
              </span>
              {entry.text}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
