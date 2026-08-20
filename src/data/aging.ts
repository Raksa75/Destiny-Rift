import type { PlayerStats, StatKey } from '../types';

// How much a positive stat gain from an event/choice is scaled by age: young players
// improve fast, veterans barely move the needle. Negative deltas are scaled the other
// way (the older you are, the harder a bad choice hits).
export function growthMultiplier(age: number): number {
  if (age <= 18) return 1.4;
  if (age <= 22) return 1.15;
  if (age <= 26) return 1;
  if (age <= 29) return 0.8;
  if (age <= 32) return 0.55;
  return 0.35;
}

export function scaleDelta(delta: number, age: number): number {
  const mult = growthMultiplier(age);
  return delta >= 0 ? delta * mult : delta * (2 - mult);
}

const DECAY_STATS: StatKey[] = ['micro', 'teamfight', 'lane'];

// Passive natural decline that kicks in with age, blunted by the hidden longevity stat.
export function naturalDecay(age: number, longevity: number): Partial<PlayerStats> {
  if (age < 29) return {};
  const severity = Math.max(0, (age - 28) * 0.6 - longevity / 40);
  if (severity <= 0) return {};
  const patch: Partial<PlayerStats> = {};
  for (const key of DECAY_STATS) {
    const loss = Math.round(severity * (0.6 + Math.random() * 0.6));
    if (loss > 0) patch[key] = -loss;
  }
  return patch;
}

// The age (blunted by longevity) at which the body forces retirement regardless of
// anything else — a hard ceiling on the career, not a probability.
export function forcedRetirementAge(longevity: number): number {
  return 30 + Math.round(longevity / 10);
}

// A rising, longevity-adjusted chance per season that the club floats a coaching role
// instead of a playing contract — the "graceful exit" path for veterans.
export function coachOfferChance(age: number, longevity: number): number {
  const base = Math.max(0, (age - 27) * 0.05);
  const longevityAdjust = (60 - longevity) / 400;
  return Math.max(0, Math.min(0.7, base + longevityAdjust));
}
