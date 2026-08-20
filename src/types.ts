export type Lang = 'fr' | 'en';

export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export const ROLES: Role[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

export type RegionId = 'EUROPE' | 'KOREA' | 'CHINA' | 'NA' | 'LATAM' | 'AUSTRALIA' | 'ASIA';

export interface Region {
  id: RegionId;
  league: string;
  countries: string[];
}

export type DietId = 'BAD' | 'MID' | 'GOOD';

export type TalentId = 'UNKNOWN' | 'STAR_KID' | 'LATE_BLOOMER' | 'ACADEMY';

export type StatKey = 'micro' | 'macro' | 'teamfight' | 'lane' | 'mental' | 'serious' | 'coach' | 'locker';

export type PlayerStats = Record<StatKey, number>;

export type ClubTier = 'DIV4' | 'DIV3' | 'DIV2' | 'MAJOR';

export interface ClubOffer {
  id: string;
  name: string;
  tier: ClubTier;
  region: RegionId;
}

export interface CareerLogEntry {
  age: number;
  month: number;
  text: string;
}

export interface CareerRecord {
  id: string;
  name: string;
  country: string;
  region: RegionId;
  role: Role;
  diet: DietId;
  talent: TalentId;
  stats: PlayerStats;
  potential: number; // 0-5
  popularity: number; // 0-100
  form: number; // 0-100
  morale: number; // 0-100
  money: number;
  careerEarnings: number; // cumulative gross earnings, never decreases
  peakOverall: number;
  age: number;
  month: number; // 1-12
  year: number;
  club: ClubOffer;
  firstClub: ClubOffer;
  contractUntilYear: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  mvpCount: number;
  selections: number;
  careerKills: number;
  careerAssists: number;
  careerCS: number;
  seasonKills: number;
  seasonAssists: number;
  longevity: number; // 0-100, hidden: how gracefully stats age, and how late retirement hits
  homesickness: number; // 0-100, morale drain from playing away from the home region
  hasPlayedMajorSeason: boolean;
  retired: boolean;
  retirementReason: string | null;
  titles: string[];
  awards: string[];
  turnCount: number; // total questions answered since career start
  seasonsPlayed: number;
  seasonWins: number;
  seasonLosses: number;
  log: CareerLogEntry[];
  createdAt: string;
}

export const START_AGE = 14;
export const SEASON_LENGTH_MONTHS = 4;

export const TIER_ORDER: ClubTier[] = ['DIV4', 'DIV3', 'DIV2', 'MAJOR'];

export type SeasonPlacement = 'TOP' | 'MID' | 'BOTTOM';

