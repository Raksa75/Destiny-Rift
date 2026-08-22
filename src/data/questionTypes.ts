import type { PlayerStats, Role, StatKey } from '../types';
import type { RiskLevel } from './outcomes';

export interface QuestionOption {
  id: string;
  text: string;
  alias?: string; // short tag shown on the button: 'leader' | 'sangfroid' | 'showman' | 'risque' | ...
  risk?: RiskLevel; // defaults to 'medium' — how likely this choice is to succeed
  relevantStat?: StatKey; // defaults to 'mental' — the stat that nudges the success chance
  statDeltas: Partial<PlayerStats>; // applied in full on success, scaled down on failure
  moneyDelta?: number;
  popularityDelta?: number;
  formDelta?: number;
  moraleDelta?: number;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  minAge?: number; // only shows up once the player is at least this old
  maxAge?: number; // stops showing up past this age
  roles?: Role[]; // restricts to these roles; undefined = any role
}
