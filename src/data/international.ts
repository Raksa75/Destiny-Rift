import { overallRating } from './creation';
import { CLUB_NAME_POOL } from './clubs';
import { TEAM_STRENGTH, realTeamNames } from './teamStrength';
import type { ClubTier, PlayerStats, SeasonPlacement } from '../types';

export type InternationalEventId = 'FIRST_STAND' | 'MSI' | 'WORLDS';
export type InternationalRound = 'GROUP' | 'SEMI' | 'FINAL';
export type InternationalPlacement = 'GROUP_STAGE' | 'SEMIFINALIST' | 'RUNNER_UP' | 'CHAMPION';

export const GROUP_MATCHES = 3;
export const GROUP_WINS_TO_ADVANCE = 2;

export function internationalEventForSeason(seasonsPlayed: number): InternationalEventId {
  const idx = (seasonsPlayed - 1) % 3;
  if (idx === 0) return 'FIRST_STAND';
  if (idx === 1) return 'MSI';
  return 'WORLDS';
}

// Major leagues are closed and don't get promoted into — but their top finishers
// (here abstracted as the top placement bucket) qualify for the international event.
export function qualifiesForInternational(tier: ClubTier, placement: SeasonPlacement): boolean {
  return tier === 'MAJOR' && placement === 'TOP';
}

function clampStars(n: number): number {
  return Math.max(1, Math.min(5, n));
}

export function ourTeamStars(stats: PlayerStats): number {
  return clampStars(1 + overallRating(stats) / 25);
}

const OPPONENT_STAR_RANGE: Record<InternationalRound, [number, number]> = {
  GROUP: [2.5, 4],
  SEMI: [3, 4.5],
  FINAL: [3.5, 5],
};

// Prefer a real organization whose roleplay strength fits the round (tougher as the
// bracket advances), so the international stage feels like the real scene. Falls back
// to a fictional name with a randomized rating once the round-appropriate real teams
// (or all real teams) are exhausted.
export function generateOpponent(round: InternationalRound, excludeNames: string[]): { name: string; stars: number } {
  const [lo, hi] = OPPONENT_STAR_RANGE[round];
  const realCandidates = realTeamNames().filter(
    (n) => !excludeNames.includes(n) && TEAM_STRENGTH[n] >= lo - 0.5 && TEAM_STRENGTH[n] <= hi + 0.5,
  );
  if (realCandidates.length > 0) {
    const name = realCandidates[Math.floor(Math.random() * realCandidates.length)];
    return { name, stars: clampStars(TEAM_STRENGTH[name]) };
  }
  const fictionalPool = CLUB_NAME_POOL.filter((n) => !excludeNames.includes(n));
  const name = fictionalPool[Math.floor(Math.random() * fictionalPool.length)] ?? 'Unknown Rival';
  const stars = clampStars(lo + Math.random() * (hi - lo));
  return { name, stars };
}

export function winChance(ourStars: number, opponentStars: number): number {
  return Math.max(0.1, Math.min(0.9, 0.5 + (ourStars - opponentStars) * 0.15));
}

export function resolveInternationalMatch(ourStars: number, opponentStars: number): boolean {
  return Math.random() < winChance(ourStars, opponentStars);
}

export interface InternationalReward {
  money: number;
  popularity: number;
  grantsTitle: boolean;
  grantsAward: boolean;
}

export function internationalReward(placement: InternationalPlacement): InternationalReward {
  switch (placement) {
    case 'CHAMPION':
      return { money: 15000, popularity: 30, grantsTitle: true, grantsAward: false };
    case 'RUNNER_UP':
      return { money: 5000, popularity: 15, grantsTitle: false, grantsAward: true };
    case 'SEMIFINALIST':
      return { money: 2000, popularity: 8, grantsTitle: false, grantsAward: true };
    case 'GROUP_STAGE':
      return { money: 500, popularity: 3, grantsTitle: false, grantsAward: false };
  }
}
