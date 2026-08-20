import type { RegionId } from '../types';

// Real major-league organizations per region, current as of the 2026 season.
// Australia/Oceania is excluded on purpose: the LCO shut down in 2024 and no stable
// franchise league has replaced it, so that region keeps fictional club names instead
// of presenting an uncertain real-world situation as fact.
export const REAL_MAJOR_TEAMS: Partial<Record<RegionId, string[]>> = {
  EUROPE: [
    'Fnatic',
    'G2 Esports',
    'GIANTX',
    'Karmine Corp',
    'Team Vitality',
    'Team Heretics',
    'Shifters',
    'Movistar KOI',
    'SK Gaming',
    'Natus Vincere',
  ],
  KOREA: [
    'T1',
    'Gen.G',
    'Dplus KIA',
    'Hanwha Life Esports',
    'KT Rolster',
    'DRX',
    'BNK FEARX',
    'Nongshim RedForce',
    'BRION',
    'DN SOOPers',
  ],
  CHINA: [
    'JD Gaming',
    'Bilibili Gaming',
    'Top Esports',
    'EDward Gaming',
    'Weibo Gaming',
    'LNG Esports',
    "Anyone's Legend",
    'Invictus Gaming',
    'LGD Gaming',
    'Ninjas in Pyjamas',
    'Oh My God',
    'Team WE',
    'ThunderTalk Gaming',
    'Ultra Prime',
  ],
  NA: ['Cloud9', 'Team Liquid', 'FlyQuest', 'Dignitas', 'Shopify Rebellion', 'Sentinels'],
  LATAM: ['LOUD', 'paiN Gaming', 'FURIA', 'RED Canids', 'Keyd Stars', 'Fluxo W7M'],
  ASIA: ['CTBC Flying Oyster', 'Frank Esports', 'Deep Cross Gaming', 'Beyond Gaming', 'Meta Falcon'],
};
