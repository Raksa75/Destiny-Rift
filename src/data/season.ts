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
