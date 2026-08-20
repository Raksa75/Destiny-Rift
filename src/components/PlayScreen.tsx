import { useState } from 'react';
import { useI18n } from '../i18n';
import { pickQuestion } from '../data/questions';
import { monthlySalary } from '../data/salary';
import { overallRating } from '../data/creation';
import type { QuestionOption } from '../data/questionTypes';
import { SEASON_LENGTH_MONTHS } from '../types';
import type { CareerRecord, StatKey } from '../types';
import { PlayerCard } from './PlayerCard';

interface Props {
  career: CareerRecord;
  onUpdate: (record: CareerRecord) => void;
  onBack: () => void;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

export function PlayScreen({ career, onUpdate, onBack }: Props) {
  const { t, lang } = useI18n();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [question, setQuestion] = useState(() => pickQuestion(lang, []));

  const handleAnswer = (option: QuestionOption) => {
    const stats = { ...career.stats };
    for (const key of STAT_KEYS) {
      const delta = option.statDeltas[key];
      if (delta) stats[key] = clamp(stats[key] + delta);
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
    const moneyGain = (option.moneyDelta ?? 0) + salary;
    const money = career.money + moneyGain;
    const careerEarnings = career.careerEarnings + Math.max(0, moneyGain);
    const popularity = clamp(career.popularity + (option.popularityDelta ?? 0));
    const form = clamp(career.form + (option.formDelta ?? 0));
    const morale = clamp(career.morale + (option.moraleDelta ?? 0));
    const peakOverall = Math.max(career.peakOverall, Math.round(overallRating(stats)));

    const turnCount = career.turnCount + 1;
    const seasonsPlayed = Math.floor(turnCount / SEASON_LENGTH_MONTHS);
    const seasonJustEnded = seasonsPlayed > career.seasonsPlayed;

    const log = [
      ...(seasonJustEnded
        ? [{ age: career.age, month: career.month, text: t('play.season.end', { n: String(seasonsPlayed) }) }]
        : []),
      { age: career.age, month: career.month, text: option.text },
      { age: career.age, month: career.month, text: t('play.salary.log', { amount: String(salary), club: career.club.name }) },
      ...career.log,
    ].slice(0, 30);

    const nextRecentIds = [question.id, ...recentIds].slice(0, 4);
    setRecentIds(nextRecentIds);
    setQuestion(pickQuestion(lang, nextRecentIds));

    onUpdate({
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
      turnCount,
      seasonsPlayed,
      log,
    });
  };

  const monthInSeason = ((career.turnCount % SEASON_LENGTH_MONTHS) + 1);

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

      <section className="rounded-2xl border border-rift-blue/40 bg-rift-panel/80 p-5">
        <p className="text-rift-text-bright font-medium mb-4">{question.text}</p>
        <div className="flex flex-col gap-2.5">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option)}
              className="text-left rounded-lg border border-rift-border bg-rift-panel-2 hover:border-rift-blue px-4 py-3 text-sm text-rift-text-bright transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </section>

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
