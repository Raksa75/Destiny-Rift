import { TIER_ORDER } from '../types';
import type { ClubOffer, ClubTier, RegionId, SeasonPlacement } from '../types';
import { REAL_DIV2_TEAMS, REAL_MAJOR_TEAMS } from './realTeams';

export const CLUB_NAME_POOL = [
  'Voidling Esports',
  'Nexus Storm',
  'Obsidian Wolves',
  'Prism Rift',
  'Ashen Talons',
  'Solaris Five',
  'Frostbite Gaming',
  'Ember Rift',
  'Steel Serpents',
  'Aurora Point',
  'Ruin Academy',
  'Zenith Legion',
  'Hexgate Dragons',
  'Glacia Esports',
  'Umbra Five',
  'Ironclad Rift',
  'Wraith Circuit',
  'Halcyon Five',
  'Vantage Point',
  'Crimson Aegis',
];

function namePool(tier: ClubTier, region: RegionId): string[] {
  // Real organizations show up starting at DIV2, not just MAJOR — reaching a Major League
  // club can take many seasons, and players want to recognize real names well before that.
  // DIV2 draws from the real second-tier/development scene (LFL, Challengers League, LDL,
  // NACL...), not the top-flight org names, which are reserved for MAJOR.
  if (tier === 'MAJOR') return REAL_MAJOR_TEAMS[region] ?? CLUB_NAME_POOL;
  if (tier === 'DIV2') return REAL_DIV2_TEAMS[region] ?? CLUB_NAME_POOL;
  return CLUB_NAME_POOL;
}

function pickName(tier: ClubTier, region: RegionId, usedNames: string[]): string {
  const source = namePool(tier, region);
  const available = source.filter((n) => !usedNames.includes(n));
  const pool = available.length > 0 ? available : source;
  return pool[Math.floor(Math.random() * pool.length)];
}

function tierDistribution(rating: number): ClubTier[] {
  if (rating >= 75) return ['MAJOR', 'DIV2', 'DIV2', 'DIV3', 'DIV3'];
  if (rating >= 60) return ['DIV2', 'DIV2', 'DIV3', 'DIV3', 'DIV3'];
  if (rating >= 45) return ['DIV3', 'DIV3', 'DIV4', 'DIV4', 'DIV3'];
  return ['DIV4', 'DIV4', 'DIV4', 'DIV4', 'DIV3'];
}

export function generateClubOffers(region: RegionId, rating: number): ClubOffer[] {
  const tiers = tierDistribution(rating);
  const usedNames: string[] = [];
  return tiers.map((tier) => {
    const name = pickName(tier, region, usedNames);
    usedNames.push(name);
    return { id: crypto.randomUUID(), name, tier, region };
  });
}

// Between-season transfer offers. Major leagues are closed and clubs there never move,
// but an outstanding individual player can still be scouted directly into one — the one
// path into MAJOR that doesn't go through the (blocked) club promotion system.
export function generateTransferOffers(
  currentClub: ClubOffer,
  rating: number,
  placement: SeasonPlacement,
  excludeName?: string,
  includeStayOffer = true,
): ClubOffer[] {
  const currentIdx = TIER_ORDER.indexOf(currentClub.tier);
  const candidateTiers: ClubTier[] = [currentClub.tier];

  const canReachMajor = currentClub.tier === 'DIV2' && rating >= 65 && placement === 'TOP';
  if (currentIdx < TIER_ORDER.length - 1) {
    const nextTier = TIER_ORDER[currentIdx + 1];
    if (nextTier !== 'MAJOR' || canReachMajor) {
      candidateTiers.push(nextTier);
    }
  }
  if (placement === 'BOTTOM' && currentIdx > 0) {
    candidateTiers.push(TIER_ORDER[currentIdx - 1]);
  }

  const offerCount =
    placement === 'TOP' ? (Math.random() < 0.4 ? 3 : 2) : placement === 'MID' ? (Math.random() < 0.5 ? 2 : 1) : 1;

  const usedNames = excludeName ? [excludeName] : [];
  const offers: ClubOffer[] = [];

  // Almost always give the player a chance to re-sign with the club they already know,
  // at their current tier, rather than only ever showing outside offers.
  if (includeStayOffer && Math.random() < 0.85) {
    offers.push({ ...currentClub });
  }

  for (let i = 0; i < offerCount; i++) {
    const tier = candidateTiers[Math.floor(Math.random() * candidateTiers.length)];
    const name = pickName(tier, currentClub.region, usedNames);
    usedNames.push(name);
    offers.push({ id: crypto.randomUUID(), name, tier, region: currentClub.region });
  }
  return offers;
}
