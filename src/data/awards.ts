import type { ClubTier, SeasonPlacement } from '../types';

export type AwardId = 'MOST_KILLS' | 'MOST_ASSISTS' | 'SEASON_MVP' | 'BEST_ROOKIE';

export interface SeasonAwardsInput {
  seasonKills: number;
  seasonAssists: number;
  placement: SeasonPlacement;
  clubTier: ClubTier;
  age: number;
  isFirstMajorSeason: boolean;
  overall: number;
}

export interface SeasonAwardsResult {
  awardIds: AwardId[];
  wonWorldBestPlayer: boolean;
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

export function resolveSeasonAwards(input: SeasonAwardsInput): SeasonAwardsResult {
  const awardIds: AwardId[] = [];

  if (input.clubTier === 'MAJOR') {
    if (Math.random() < clamp01((input.seasonKills - 12) * 0.045)) awardIds.push('MOST_KILLS');
    if (Math.random() < clamp01((input.seasonAssists - 16) * 0.035)) awardIds.push('MOST_ASSISTS');
    if (input.placement === 'TOP' && Math.random() < 0.25) awardIds.push('SEASON_MVP');
  }

  if (input.isFirstMajorSeason && input.age <= 20 && Math.random() < 0.35) {
    awardIds.push('BEST_ROOKIE');
  }

  const wonWorldBestPlayer =
    input.clubTier === 'MAJOR' && input.placement === 'TOP' && input.overall >= 88 && Math.random() < 0.06;

  return { awardIds, wonWorldBestPlayer };
}
