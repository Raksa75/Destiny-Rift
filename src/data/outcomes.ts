import type { ClubTier, PlayerStats, StatKey } from '../types';

export type RiskLevel = 'safe' | 'medium' | 'risky';

const BASE_CHANCE: Record<RiskLevel, number> = { safe: 0.88, medium: 0.7, risky: 0.48 };
const LEAGUE_PENALTY: Record<ClubTier, number> = { DIV4: 0, DIV3: 0.02, DIV2: 0.05, MAJOR: 0.09 };

// Success chance for a life-event choice: a risk-tier baseline, nudged by the player's
// level in the stat that choice leans on, and pulled down a bit the higher the league
// (tougher competition, higher stakes, less room for error).
export function computeSuccessChance(risk: RiskLevel, relevantStatValue: number, tier: ClubTier): number {
  const statBonus = (relevantStatValue - 50) / 250;
  const chance = BASE_CHANCE[risk] + statBonus - LEAGUE_PENALTY[tier];
  return Math.max(0.15, Math.min(0.95, chance));
}

interface DeltaSource {
  statDeltas: Partial<PlayerStats>;
  moneyDelta?: number;
  popularityDelta?: number;
  formDelta?: number;
  moraleDelta?: number;
}

interface ResolvedDeltas {
  statDeltas: Partial<PlayerStats>;
  moneyDelta: number;
  popularityDelta: number;
  formDelta: number;
  moraleDelta: number;
}

// On failure, a would-be gain shrinks into a small loss instead (the attempt didn't pay
// off), any deltas already written as a downside stay as-is, and a bit of extra form/
// morale sting is added on top of whatever the option itself specified.
export function resolveOutcome(succeeded: boolean, option: DeltaSource): ResolvedDeltas {
  const money = option.moneyDelta ?? 0;
  const pop = option.popularityDelta ?? 0;
  const form = option.formDelta ?? 0;
  const morale = option.moraleDelta ?? 0;

  if (succeeded) {
    return { statDeltas: option.statDeltas, moneyDelta: money, popularityDelta: pop, formDelta: form, moraleDelta: morale };
  }

  const failStats: Partial<PlayerStats> = {};
  for (const key of Object.keys(option.statDeltas) as StatKey[]) {
    const value = option.statDeltas[key];
    if (value === undefined) continue;
    failStats[key] = value > 0 ? -Math.max(1, Math.round(value * 0.5)) : value;
  }

  return {
    statDeltas: failStats,
    moneyDelta: money < 0 ? money : Math.round(money * 0.2),
    popularityDelta: pop > 0 ? -Math.max(1, Math.round(pop * 0.5)) : pop,
    formDelta: Math.min(form, -3),
    moraleDelta: Math.min(morale, -4),
  };
}

const GENERIC_VARIANTS = 5;
const ALIAS_VARIANTS = 2;
const KNOWN_ALIASES = ['leader', 'sangfroid', 'showman', 'risque'];

function pick(n: number): number {
  return 1 + Math.floor(Math.random() * n);
}

// Builds the i18n key for a randomly-picked outcome flavor line, falling back to the
// generic pool when the option has no alias (or one the trait/flavor system doesn't know).
export function outcomeNarrativeKey(succeeded: boolean, alias: string | undefined, forMatch: boolean): string {
  const kind = succeeded ? 'success' : 'fail';
  if (forMatch) return `outcome.match.${kind}.${pick(GENERIC_VARIANTS)}`;
  if (alias && KNOWN_ALIASES.includes(alias)) return `outcome.${kind}.${alias}.${pick(ALIAS_VARIANTS)}`;
  return `outcome.${kind}.generic.${pick(GENERIC_VARIANTS)}`;
}
