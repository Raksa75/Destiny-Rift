import type { Lang, Role } from '../types';
import type { Question } from './questionTypes';
import questionsFr from './questions.fr';
import questionsEn from './questions.en';

const BY_LANG: Record<Lang, Question[]> = {
  fr: questionsFr,
  en: questionsEn,
};

export function getQuestions(lang: Lang): Question[] {
  return BY_LANG[lang];
}

export function pickQuestion(lang: Lang, avoidIds: string[], age: number, role: Role): Question {
  const fullPool = getQuestions(lang);
  const eligible = fullPool.filter((q) => {
    if (q.minAge !== undefined && age < q.minAge) return false;
    if (q.maxAge !== undefined && age > q.maxAge) return false;
    if (q.roles && !q.roles.includes(role)) return false;
    return true;
  });
  const pool = eligible.length > 0 ? eligible : fullPool;
  const available = pool.filter((q) => !avoidIds.includes(q.id));
  const source = available.length > 0 ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}
