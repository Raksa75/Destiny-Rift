import type { Lang, PlayerStats } from '../types';
import type { MatchOption, MatchQuestion } from './matchTypes';
import { REGULAR_MATCHES_FR, FINAL_MATCHES_FR } from './matchQuestions.fr';
import { REGULAR_MATCHES_EN, FINAL_MATCHES_EN } from './matchQuestions.en';

const REGULAR_BY_LANG: Record<Lang, MatchQuestion[]> = {
  fr: REGULAR_MATCHES_FR,
  en: REGULAR_MATCHES_EN,
};

const FINAL_BY_LANG: Record<Lang, MatchQuestion[]> = {
  fr: FINAL_MATCHES_FR,
  en: FINAL_MATCHES_EN,
};

export function pickRegularMatch(lang: Lang): MatchQuestion {
  const pool = REGULAR_BY_LANG[lang];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function pickFinalMatch(lang: Lang): MatchQuestion {
  const pool = FINAL_BY_LANG[lang];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function skillBonus(stats: PlayerStats): number {
  const avg = (stats.micro + stats.macro + stats.teamfight + stats.lane) / 4;
  return Math.max(-0.15, Math.min(0.15, (avg - 50) / 200));
}

export function resolveMatch(option: MatchOption, stats: PlayerStats): boolean {
  const chance = Math.max(0.05, Math.min(0.95, option.winChance + skillBonus(stats)));
  return Math.random() < chance;
}
