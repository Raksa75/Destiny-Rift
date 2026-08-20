import { useState } from 'react';
import { useI18n } from '../i18n';
import { pickQuestion } from '../data/questions';
import { pickRegularMatch, resolveMatch } from '../data/matches';
import { monthlySalary } from '../data/salary';
import { overallRating } from '../data/creation';
import { computeSeasonPlacement } from '../data/season';
import type { QuestionOption } from '../data/questionTypes';
import type { MatchOption, MatchQuestion } from '../data/matchTypes';
import { SEASON_LENGTH_MONTHS } from '../types';
import type { CareerLogEntry, CareerRecord, SeasonPlacement, StatKey } from '../types';
import { PlayerCard } from './PlayerCard';
import { MatchCard } from './MatchCard';
import { SeasonEndFlow } from './SeasonEndFlow';

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

export function PlayScreen({ career, onUpdate, onBack }: Props) {
  const { t, lang } = useI18n();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [question, setQuestion] = useState(() => pickQuestion(lang, []));
  const [turn, setTurn] = useState<Turn>(() => rollTurn(career, lang));
  const [seasonPlacement, setSeasonPlacement] = useState<SeasonPlacement | null>(null);

  const advanceTurn = (params: {
    stats: CareerRecord['stats'];
    moneyDelta: number;
    popularityDelta: number;
    formDelta: number;
    moraleDelta: number;
    entryTexts: string[];
    matchOutcome?: boolean;
  }) => {
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
    const morale = clamp(career.morale + params.moraleDelta);
    const peakOverall = Math.max(career.peakOverall, Math.round(overallRating(params.stats)));

    const turnCount = career.turnCount + 1;
    const seasonsPlayed = Math.floor(turnCount / SEASON_LENGTH_MONTHS);
    const seasonJustEnded = seasonsPlayed > career.seasonsPlayed;

    let matchesPlayed = career.matchesPlayed;
    let wins = career.wins;
    let mvpCount = career.mvpCount;
    let seasonWins = career.seasonWins;
    let seasonLosses = career.seasonLosses;
    if (params.matchOutcome !== undefined) {
      matchesPlayed += 1;
      if (params.matchOutcome) {
        wins += 1;
        seasonWins += 1;
        if (Math.random() < 0.12) {
          mvpCount += 1;
          params.entryTexts.push(t('match.mvp.log'));
        }
      } else {
        seasonLosses += 1;
      }
    }

    const newEntries: CareerLogEntry[] = params.entryTexts
      .filter(Boolean)
      .map((text) => ({ age: career.age, month: career.month, text }));

    const log = [...newEntries.reverse(), ...career.log].slice(0, 30);

    const updated: CareerRecord = {
      ...career,
      stats: params.stats,
      money,
      careerEarnings,
      popularity,
      form,
      morale,
      peakOverall,
      age,
      month,
      year,
      turnCount,
      seasonsPlayed,
      matchesPlayed,
      wins,
      mvpCount,
      seasonWins,
      seasonLosses,
      log,
    };

    onUpdate(updated);

    if (seasonJustEnded) {
      setSeasonPlacement(computeSeasonPlacement(seasonWins, seasonLosses));
    } else {
      setTurn(rollTurn(updated, lang));
    }
  };

  const handleQuestionAnswer = (option: QuestionOption) => {
    const stats = { ...career.stats };
    for (const key of STAT_KEYS) {
      const delta = option.statDeltas[key];
      if (delta) stats[key] = clamp(stats[key] + delta);
    }
    const salary = monthlySalary(career.club.tier, career.region);

    const nextRecentIds = [question.id, ...recentIds].slice(0, 4);
    setRecentIds(nextRecentIds);
    setQuestion(pickQuestion(lang, nextRecentIds));

    advanceTurn({
      stats,
      moneyDelta: option.moneyDelta ?? 0,
      popularityDelta: option.popularityDelta ?? 0,
      formDelta: option.formDelta ?? 0,
      moraleDelta: option.moraleDelta ?? 0,
      entryTexts: [option.text, t('play.salary.log', { amount: String(salary), club: career.club.name })],
    });
  };

  const handleMatchAnswer = (option: MatchOption, won: boolean, isFinal: boolean) => {
    const salary = monthlySalary(career.club.tier, career.region);
    const resultText = t(won ? 'match.win.log' : 'match.loss.log', { text: option.text });
    const seasonsPlayedAfter = Math.floor((career.turnCount + 1) / SEASON_LENGTH_MONTHS);
    const seasonEndText = isFinal ? t('play.season.end', { n: String(seasonsPlayedAfter) }) : '';

    advanceTurn({
      stats: career.stats,
      moneyDelta: won ? 100 : 0,
      popularityDelta: won ? 2 : -1,
      formDelta: -3,
      moraleDelta: won ? 3 : -3,
      entryTexts: [
        seasonEndText,
        resultText,
        t('play.salary.log', { amount: String(salary), club: career.club.name }),
      ],
      matchOutcome: won,
    });
  };

  const monthInSeason = (career.turnCount % SEASON_LENGTH_MONTHS) + 1;

  return (
    <div className="min-h-svh px-4 py-6 pb-20 max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mt-12">
        <span className="text-sm text-rift-blue font-medium">
          {t('play.season', { n: String(career.seasonsPlayed + 1) })} · {monthInSeason}/{SEASON_LENGTH_MONTHS}
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
              log: [...[...extraLogs].reverse(), ...career.log].slice(0, 30),
            };
            onUpdate(merged);
            setSeasonPlacement(null);
            setTurn(rollTurn(merged, lang));
          }}
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
          <p className="text-rift-text-bright font-medium mb-4">{question.text}</p>
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
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">{t('play.journal')}</h2>
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
            {t('card.fortune')}: {career.money}€
          </span>
        </div>
      </div>
    </div>
  );
}
