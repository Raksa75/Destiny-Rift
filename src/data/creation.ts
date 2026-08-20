import type { DietId, PlayerStats, StatKey, TalentId } from '../types';

export const DIET_IDS: DietId[] = ['BAD', 'MID', 'GOOD'];
export const TALENT_IDS: TalentId[] = ['UNKNOWN', 'STAR_KID', 'LATE_BLOOMER', 'ACADEMY'];

export const DIET_STAT_MODS: Record<DietId, Partial<PlayerStats>> = {
  BAD: { mental: -8, serious: -10, coach: -4 },
  MID: {},
  GOOD: { mental: 8, serious: 10, coach: 4 },
};

export const TALENT_STAT_MODS: Record<TalentId, Partial<PlayerStats>> = {
  UNKNOWN: {},
  STAR_KID: { mental: -5, locker: -4 },
  LATE_BLOOMER: { micro: -6, macro: -6, teamfight: -6, lane: -6 },
  ACADEMY: { macro: 5, teamfight: 5, serious: 5, coach: 4, locker: 4 },
};

export const TALENT_POPULARITY_MOD: Record<TalentId, number> = {
  UNKNOWN: 0,
  STAR_KID: 30,
  LATE_BLOOMER: 0,
  ACADEMY: 0,
};

export const TALENT_POTENTIAL_MOD: Record<TalentId, number> = {
  UNKNOWN: 0,
  STAR_KID: 0,
  LATE_BLOOMER: 1,
  ACADEMY: 0,
};

const STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

function randomBaseStats(): PlayerStats {
  const stats = {} as PlayerStats;
  for (const key of STAT_KEYS) {
    stats[key] = 40 + Math.round(Math.random() * 15);
  }
  return stats;
}

function applyMods(stats: PlayerStats, mods: Partial<PlayerStats>): PlayerStats {
  const result = { ...stats };
  for (const key of STAT_KEYS) {
    result[key] = clamp(result[key] + (mods[key] ?? 0));
  }
  return result;
}

function applyNoise(stats: PlayerStats, spread = 5): PlayerStats {
  const result = { ...stats };
  for (const key of STAT_KEYS) {
    const noise = Math.round((Math.random() - 0.5) * 2 * spread);
    result[key] = clamp(result[key] + noise);
  }
  return result;
}

export function generateStats(diet: DietId, talent: TalentId): PlayerStats {
  let stats = randomBaseStats();
  stats = applyMods(stats, DIET_STAT_MODS[diet]);
  stats = applyMods(stats, TALENT_STAT_MODS[talent]);
  stats = applyNoise(stats, 5);
  return stats;
}

export function generatePotential(talent: TalentId): number {
  const roll = Math.random() * 100;
  let stars: number;
  if (roll < 45) stars = 1;
  else if (roll < 75) stars = 2;
  else if (roll < 92) stars = 3;
  else if (roll < 99) stars = 4;
  else stars = 5;
  return Math.min(5, stars + TALENT_POTENTIAL_MOD[talent]);
}

export function generatePopularity(talent: TalentId): number {
  const base = 5 + Math.round(Math.random() * 10);
  return clamp(base + TALENT_POPULARITY_MOD[talent], 0, 100);
}

const DIET_LONGEVITY_MOD: Record<DietId, number> = { BAD: -10, MID: 0, GOOD: 10 };
const TALENT_LONGEVITY_MOD: Record<TalentId, number> = {
  UNKNOWN: 0,
  STAR_KID: 0,
  LATE_BLOOMER: 5,
  ACADEMY: 5,
};

// Hidden stat: how gracefully the player's body/reflexes age. Never shown directly,
// only felt through slower stat decay and a later forced-retirement age.
export function generateLongevity(diet: DietId, talent: TalentId): number {
  const base = 40 + Math.round(Math.random() * 20);
  return clamp(base + DIET_LONGEVITY_MOD[diet] + TALENT_LONGEVITY_MOD[talent], 10, 100);
}

export function overallRating(stats: PlayerStats): number {
  const { micro, macro, teamfight, lane, mental, serious } = stats;
  return (micro + macro + teamfight + lane) / 4 * 0.7 + mental * 0.15 + serious * 0.15;
}
