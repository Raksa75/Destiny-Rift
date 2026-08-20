import type { Lang } from '../types';
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

export function pickQuestion(lang: Lang, avoidIds: string[]): Question {
  const pool = getQuestions(lang);
  const available = pool.filter((q) => !avoidIds.includes(q.id));
  const source = available.length > 0 ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}
