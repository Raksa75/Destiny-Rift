export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export const ROLES: { id: Role; label: string }[] = [
  { id: 'TOP', label: 'Top' },
  { id: 'JUNGLE', label: 'Jungle' },
  { id: 'MID', label: 'Mid' },
  { id: 'ADC', label: 'ADC' },
  { id: 'SUPPORT', label: 'Support' },
];

export type StatKey = 'mechanics' | 'gameSense' | 'teamwork' | 'mental' | 'communication';

export interface Stats {
  mechanics: number;
  gameSense: number;
  teamwork: number;
  mental: number;
  communication: number;
}

export const STAT_LABELS: Record<StatKey, string> = {
  mechanics: 'Mécanique',
  gameSense: 'Game Sense',
  teamwork: 'Synergie',
  mental: 'Mental',
  communication: 'Communication',
};

export type StageId = 'AMATEUR' | 'ACADEMY' | 'CHALLENGER' | 'PRO' | 'RETIRED';

export const STAGE_LABELS: Record<StageId, string> = {
  AMATEUR: 'Amateur (SoloQ)',
  ACADEMY: 'Équipe Académie',
  CHALLENGER: 'Ligue Challenger',
  PRO: 'Ligue Pro (élite)',
  RETIRED: 'Retraité',
};

export interface RankState {
  tierIndex: number; // index into RANK_TIERS
  lp: number; // 0-100 within the tier
}

export interface Team {
  id: string;
  name: string;
  stage: StageId;
  rating: number; // 0-100, strength of the rest of the roster
}

export interface LogEntry {
  id: string;
  age: number;
  month: number; // 1-12
  text: string;
  kind: 'info' | 'good' | 'bad' | 'season' | 'career';
}

export interface GameState {
  name: string;
  role: Role;
  age: number;
  month: number; // 1-12
  stats: Stats;
  energy: number;
  morale: number;
  health: number;
  rank: RankState;
  fame: number;
  money: number;
  team: Team | null;
  stage: StageId;
  monthsInSeason: number;
  seasonsPlayedInTeam: number;
  titles: string[];
  log: LogEntry[];
  peakRankIndex: number;
  peakRankLp: number;
  retired: boolean;
  retirementReason: string | null;
  seasonBanner: SeasonResult | null;
}

export interface SeasonResult {
  stage: StageId;
  teamName: string;
  placement: 'CHAMPION' | 'PLAYOFFS' | 'MID_TABLE' | 'RELEGATED';
  record: string;
  outcomeText: string;
  promoted: boolean;
  relegated: boolean;
}

export type ActionId =
  | 'TRAIN_MECHANICS'
  | 'TRAIN_GAMESENSE'
  | 'TRAIN_TEAMWORK'
  | 'STUDY_VODS'
  | 'SOLOQ'
  | 'REST'
  | 'STREAM'
  | 'TEAM_PRACTICE'
  | 'TRYOUT'
  | 'RETIRE';
