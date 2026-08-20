import type { PlayerStats, StatKey, TraitId } from '../types';

// Rare, permanent unlocks. Each is tied to an option alias (the tag shown on question/
// match choices) and has a small chance to trigger the first time a matching choice
// resolves, granting a one-time flat stat bump plus a lasting spot on the player card.
export interface TraitDef {
  id: TraitId;
  alias: string;
  unlockChance: number;
  buff: Partial<PlayerStats>;
}

export const TRAITS: TraitDef[] = [
  { id: 'LEADER', alias: 'leader', unlockChance: 0.05, buff: { locker: 8, teamfight: 3 } },
  { id: 'ICE_COLD', alias: 'sangfroid', unlockChance: 0.05, buff: { mental: 8, lane: 3 } },
  { id: 'SHOWMAN', alias: 'showman', unlockChance: 0.05, buff: { locker: 3 } },
  { id: 'TILTER', alias: 'risque', unlockChance: 0.04, buff: { mental: 6, teamfight: 4 } },
];

const TRAIT_BY_ALIAS = new Map(TRAITS.map((t) => [t.alias, t]));

export function traitForAlias(alias: string | undefined): TraitDef | undefined {
  if (!alias) return undefined;
  return TRAIT_BY_ALIAS.get(alias);
}

export function rollTraitUnlock(alias: string | undefined, owned: TraitId[]): TraitDef | null {
  const def = traitForAlias(alias);
  if (!def || owned.includes(def.id)) return null;
  return Math.random() < def.unlockChance ? def : null;
}

const CORE_STAT_KEYS: StatKey[] = ['micro', 'macro', 'teamfight', 'lane', 'mental', 'serious', 'coach', 'locker'];

export function applyTraitBuff(stats: PlayerStats, buff: Partial<PlayerStats>): PlayerStats {
  const next = { ...stats };
  for (const key of CORE_STAT_KEYS) {
    const delta = buff[key];
    if (delta) next[key] = Math.max(0, Math.min(100, next[key] + delta));
  }
  return next;
}
