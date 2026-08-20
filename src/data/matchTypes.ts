export interface MatchOption {
  id: string;
  text: string;
  winChance: number; // base probability of winning, 0-1
}

export interface MatchQuestion {
  id: string;
  text: string;
  options: MatchOption[];
}
