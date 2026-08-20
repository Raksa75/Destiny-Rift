import { useState } from 'react';
import { useI18n } from '../i18n';
import { pickQuestion } from '../data/questions';
import { generateMatchPerformance, pickRegularMatch, resolveMatch } from '../data/matches';
import { monthlySalary } from '../data/salary';
import { overallRating } from '../data/creation';
import { computeSeasonPlacement } from '../data/season';
import { growthMultiplier, naturalDecay } from '../data/aging';
import { isAbroad, moraleDrain, monthlyDecay as homesicknessDecay } from '../data/homesickness';
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
    matchOutcome?: boolean;
    matchPerf?: { kills: number; assists: number; cs: number };
  }) => {
    const abroad = isAbroad(career.region, career.club.region);
    const homesickness = homesicknessDecay(career.homesickness, abroad);
    const drain = moraleDrain(homesickness);
    const languageBarrier = abroad && homesickness > 55;

    const mult = growthMultiplier(career.age) * (languageBarrier ? 0.85 : 1);
    const decay = naturalDecay(career.age, career.longevity);
    const stats = { ...career.stats };
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
    const form = clamp(career.form + params.formDelta);
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
      ...(params.formDelta !== 0 ? [{ label: t('card.form'), value: params.formDelta }] : []),
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
      seasonJustEnded,
    });
  };

  const handleQuestionAnswer = (option: QuestionOption) => {
    const nextRecentIds = [question.id, ...recentIds].slice(0, 4);
    setRecentIds(nextRecentIds);
    setQuestion(pickQuestion(lang, nextRecentIds));

    computeOutcome({
      statDeltas: option.statDeltas,
      moneyDelta: option.moneyDelta ?? 0,
      popularityDelta: option.popularityDelta ?? 0,
      formDelta: option.formDelta ?? 0,
      moraleDelta: option.moraleDelta ?? 0,
      narrative: option.text,
    });
  };

  const handleMatchAnswer = (option: MatchOption, won: boolean, isFinal: boolean) => {
    const perf = generateMatchPerformance(career.role, career.stats, won);
    computeOutcome({
      statDeltas: {},
      moneyDelta: won ? 100 : 0,
      popularityDelta: won ? 2 : -1,
      formDelta: -3,
      moraleDelta: won ? 3 : -3,
      narrative: option.text,
      badge: t(won ? 'intl.result.win' : 'intl.result.loss'),
      matchOutcome: won,
      matchPerf: perf,
    });
    void isFinal;
  };

  const commitPending = () => {
    if (!pending) return;
    const { updated, seasonJustEnded } = pending;
    onUpdate(updated);
    setPending(null);
    if (seasonJustEnded) {
      setSeasonPlacement(computeSeasonPlacement(updated.seasonWins, updated.seasonLosses));
    } else {
      setTurn(rollTurn(updated, lang));
    }
  };

  const monthInSeason = (career.turnCount % SEASON_LENGTH_MONTHS) + 1;

  return (
    <div className="min-h-svh px-4 py-6 pb-20 max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mt-12">
        <span className="text-sm text-rift-blue font-medium">
          🏆 {t('play.season', { n: String(career.seasonsPlayed + 1) })} · {monthInSeason}/{SEASON_LENGTH_MONTHS}
        </span>
        <button onClick={onBack} className="text-sm text-rift-onbg-muted hover:text-rift-onbg transition-colors">
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
        <section className="rounded-2xl border border-rift-blue/40 bg-rift-panel/80 p-5">
          <p className="text-rift-text-bright font-medium mb-4">💬 {question.text}</p>
          <div className="flex flex-col gap-2.5">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleQuestionAnswer(option)}
                className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-3 text-sm text-rift-text-bright transition-colors"
              >
                {option.text}
              </button>
            ))}
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

      <div className="fixed bottom-0 left-0 right-0 border-t border-rift-border bg-rift-panel/95 backdrop-blur px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm">
          <span className="text-rift-text">{career.year}</span>
          <span className="text-rift-text-bright font-medium">
            💰 {t('card.fortune')}: {career.money}€
          </span>
        </div>
      </div>
    </div>
  );
}
