// Roleplay strength ratings (stars out of 5) for real organizations, so international
// bracket opponents feel like the real scene rather than a coin flip — T1 shows up
// fearsome, an academy-tier org shows up beatable.
export const TEAM_STRENGTH: Record<string, number> = {
  // EUROPE
  Fnatic: 4,
  'G2 Esports': 4.5,
  GIANTX: 3,
  'Karmine Corp': 4,
  'Team Vitality': 3.5,
  'Team Heretics': 3,
  Shifters: 2.5,
  'Movistar KOI': 3.5,
  'SK Gaming': 2.5,
  'Natus Vincere': 2.5,
  // KOREA
  T1: 5,
  'Gen.G': 4.5,
  'Dplus KIA': 4,
  'Hanwha Life Esports': 4,
  'KT Rolster': 3.5,
  DRX: 3,
  'BNK FEARX': 2.5,
  'Nongshim RedForce': 2.5,
  BRION: 2.5,
  'DN SOOPers': 2,
  // CHINA
  'JD Gaming': 4.5,
  'Bilibili Gaming': 4.5,
  'Top Esports': 4,
  'EDward Gaming': 3.5,
  'Weibo Gaming': 4,
  'LNG Esports': 4,
  "Anyone's Legend": 3.5,
  'Invictus Gaming': 3,
  'LGD Gaming': 2.5,
  'Ninjas in Pyjamas': 2.5,
  'Oh My God': 3,
  'Team WE': 2.5,
  'ThunderTalk Gaming': 2.5,
  'Ultra Prime': 2.5,
  // NA
  Cloud9: 3.5,
  'Team Liquid': 3,
  FlyQuest: 3.5,
  Dignitas: 2.5,
  'Shopify Rebellion': 2.5,
  Sentinels: 2.5,
  // LATAM
  LOUD: 3,
  'paiN Gaming': 2.5,
  FURIA: 2.5,
  'RED Canids': 2,
  'Keyd Stars': 2,
  'Fluxo W7M': 2,
  // ASIA (PCS)
  'CTBC Flying Oyster': 3,
  'Frank Esports': 2.5,
  'Deep Cross Gaming': 2.5,
  'Beyond Gaming': 2.5,
  'Meta Falcon': 2,
};

export function realTeamNames(): string[] {
  return Object.keys(TEAM_STRENGTH);
}
