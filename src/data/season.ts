import { TIER_ORDER } from '../types';
import type { ClubTier, PlayerStats, SeasonPlacement } from '../types';
import type { MatchOption } from './matchTypes';
import { skillBonus } from './matches';

export function computeSeasonPlacement(wins: number, losses: number): SeasonPlacement {
  const total = wins + losses;
  if (total === 0) return 'MID';
  const rate = wins / total;
  if (rate >= 0.66) return 'TOP';
  if (rate >= 0.34) return 'MID';
  return 'BOTTOM';
}

// Major leagues are closed/franchised: clubs there never move, and no club can be
// promoted into one. Only DIV4 and DIV3 clubs can attempt promotion (into DIV3/DIV2).
export function canAttemptPromotion(tier: ClubTier, placement: SeasonPlacement): boolean {
  return placement === 'TOP' && (tier === 'DIV4' || tier === 'DIV3');
}

export function resolvePromotionMatch(option: MatchOption, stats: PlayerStats): boolean {
  const chance = Math.max(0.1, Math.min(0.85, option.winChance - 0.15 + skillBonus(stats)));
  return Math.random() < chance;
}

export function promotedTier(tier: ClubTier): ClubTier {
  const idx = TIER_ORDER.indexOf(tier);
  return TIER_ORDER[Math.min(idx + 1, TIER_ORDER.length - 1)];
}

export function resolveContractRenewal(placement: SeasonPlacement): boolean {
  const chance = placement === 'TOP' ? 0.85 : placement === 'MID' ? 0.55 : 0.25;
  return Math.random() < chance;
}

// A League split is 18 games. Only a handful of those are interactive match turns —
// the rest of the split is simulated in the background so the season record (and the
// standing computed from it) reflects a full 18-game season without adding more bubbles.
export const SEASON_TOTAL_GAMES = 18;

export interface PaddedRecord {
  wins: number;
  losses: number;
  addedWins: number;
  addedLosses: number;
}

export function padSeasonRecord(interactiveWins: number, interactiveLosses: number): PaddedRecord {
  const playedSoFar = interactiveWins + interactiveLosses;
  const remaining = Math.max(0, SEASON_TOTAL_GAMES - playedSoFar);
  // Blend the interactive win rate toward 0.5 so a tiny sample (1-2 games) doesn't
  // extrapolate into an unrealistic sweep or shutout across the padded remainder.
  const rawRate = playedSoFar > 0 ? interactiveWins / playedSoFar : 0.5;
  const blendedRate = 0.5 + (rawRate - 0.5) * 0.6;
  let addedWins = 0;
  let addedLosses = 0;
  for (let i = 0; i < remaining; i++) {
    if (Math.random() < blendedRate) addedWins++;
    else addedLosses++;
  }
  return { wins: interactiveWins + addedWins, losses: interactiveLosses + addedLosses, addedWins, addedLosses };
}

// Final league standing out of 10 (1 = best), from the padded season's win rate.
export function computeStanding(wins: number, losses: number): number {
  const total = wins + losses;
  if (total === 0) return 6;
  const rate = wins / total;
  return Math.max(1, Math.min(10, Math.round(10 - rate * 9)));
}
