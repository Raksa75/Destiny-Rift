import { useState } from 'react';
import { useI18n } from '../i18n';
import { pickQuestion } from '../data/questions';
import { monthlySalary } from '../data/salary';
import type { QuestionOption } from '../data/questionTypes';
import type { CareerRecord, StatKey } from '../types';
import { StatBar } from './StatBar';
import { PotentialStars } from './PotentialStars';

interface Props {
  career: CareerRecord;
  onUpdate: (record: CareerRecord) => void;
  onBack: () => void;
}

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious'];

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
    if (month > 12) {
      month = 1;
      age += 1;
    }

    const salary = monthlySalary(career.club.tier, career.region);
    const money = career.money + (option.moneyDelta ?? 0) + salary;
    const popularity = clamp(career.popularity + (option.popularityDelta ?? 0));

    const log = [
      { age: career.age, month: career.month, text: option.text },
      { age: career.age, month: career.month, text: t('play.salary.log', { amount: String(salary), club: career.club.name }) },
      ...career.log,
    ].slice(0, 30);

    const nextRecentIds = [question.id, ...recentIds].slice(0, 4);
    setRecentIds(nextRecentIds);
    setQuestion(pickQuestion(lang, nextRecentIds));

    onUpdate({ ...career, stats, money, popularity, age, month, log });
  };

  return (
    <div className="min-h-svh px-4 py-6 max-w-3xl mx-auto flex flex-col gap-6">
      <header className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5 flex flex-wrap items-center justify-between gap-4 mt-12">
        <div>
          <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-1">{career.club.name}</p>
          <h1 className="text-xl font-semibold text-rift-gold-bright">
            {career.name} <span className="text-rift-text font-normal">· {t(`role.${career.role}` as never)}</span>
          </h1>
        </div>
        <div className="flex gap-6 text-center">
          <MiniStat label={t('play.age')} value={t('play.ageYears', { age: String(career.age) })} />
          <MiniStat label={t('play.money')} value={`${career.money}€`} />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-rift-text uppercase tracking-wide">{t('players.potential')}</span>
            <PotentialStars value={career.potential} />
          </div>
        </div>
        <button onClick={onBack} className="text-sm text-rift-text hover:text-rift-text-bright transition-colors">
          {t('common.menu')}
        </button>
      </header>

      <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">{t('play.stats')}</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {STAT_KEYS.map((key) => (
            <StatBar key={key} label={t(`stat.${key}` as never)} value={career.stats[key]} color="bg-rift-gold" />
          ))}
        </div>
      </section>

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
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-rift-text uppercase tracking-wide">{label}</p>
      <p className="text-rift-text-bright font-medium">{value}</p>
    </div>
  );
}
