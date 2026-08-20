import type { PlayerStats } from '../types';

export interface QuestionOption {
  id: string;
  text: string;
  statDeltas: Partial<PlayerStats>;
  moneyDelta?: number;
  popularityDelta?: number;
  formDelta?: number;
  moraleDelta?: number;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}
