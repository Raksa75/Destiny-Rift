import type { ClubOffer, ClubTier, RegionId } from '../types';

const CLUB_NAME_POOL = [
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
