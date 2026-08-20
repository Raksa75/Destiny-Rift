import { TIER_ORDER } from '../types';
import type { ClubOffer, ClubTier, RegionId, SeasonPlacement } from '../types';

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

function tierDistribution(rating: number): ClubTier[] {
  if (rating >= 75) return ['MAJOR', 'DIV2', 'DIV2', 'DIV3', 'DIV3'];
  if (rating >= 60) return ['DIV2', 'DIV2', 'DIV3', 'DIV3', 'DIV3'];
  if (rating >= 45) return ['DIV3', 'DIV3', 'DIV4', 'DIV4', 'DIV3'];
  return ['DIV4', 'DIV4', 'DIV4', 'DIV4', 'DIV3'];
}

export function generateClubOffers(region: RegionId, rating: number): ClubOffer[] {
  const tiers = tierDistribution(rating);
  const pool = [...CLUB_NAME_POOL];
  return tiers.map((tier) => {
    const idx = Math.floor(Math.random() * pool.length);
    const [name] = pool.splice(idx, 1);
    return {
      id: crypto.randomUUID(),
      name,
      tier,
      region,
    };
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

  const pool = CLUB_NAME_POOL.filter((n) => n !== excludeName);
  const offers: ClubOffer[] = [];
  for (let i = 0; i < offerCount && pool.length > 0; i++) {
    const tier = candidateTiers[Math.floor(Math.random() * candidateTiers.length)];
    const idx = Math.floor(Math.random() * pool.length);
    const [name] = pool.splice(idx, 1);
    offers.push({ id: crypto.randomUUID(), name, tier, region: currentClub.region });
  }
  return offers;
}
