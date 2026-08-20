import type { Lang, PlayerStats, Role } from '../types';
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

const KILL_FOCUS_ROLE: Record<Role, number> = { TOP: 1, JUNGLE: 1.2, MID: 1.6, ADC: 1.7, SUPPORT: 0.3 };
const ASSIST_FOCUS_ROLE: Record<Role, number> = { TOP: 1, JUNGLE: 1.6, MID: 1.1, ADC: 1, SUPPORT: 2 };
const CS_FOCUS_ROLE: Record<Role, number> = { TOP: 1.1, JUNGLE: 0.6, MID: 1.1, ADC: 1.2, SUPPORT: 0.2 };

export interface MatchPerformance {
  kills: number;
  assists: number;
  cs: number;
}

export function generateMatchPerformance(role: Role, stats: PlayerStats, won: boolean): MatchPerformance {
  const microFactor = 0.5 + stats.micro / 100;
  const teamfightFactor = 0.5 + stats.teamfight / 100;
  const laneFactor = 0.5 + stats.lane / 100;
  const winBonus = won ? 1.25 : 0.85;

  const kills = Math.max(0, Math.round((Math.random() * 5 + 1) * KILL_FOCUS_ROLE[role] * microFactor * winBonus));
  const assists = Math.max(
    0,
    Math.round((Math.random() * 6 + 2) * ASSIST_FOCUS_ROLE[role] * teamfightFactor * winBonus),
  );
  const cs = Math.max(20, Math.round((Math.random() * 80 + 140) * CS_FOCUS_ROLE[role] * laneFactor));

  return { kills, assists, cs };
}
