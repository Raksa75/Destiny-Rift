import type { GameState, Role, Stats } from './types';

export const RANK_TIERS = [
  'Fer',
  'Bronze',
  'Argent',
  'Or',
  'Platine',
  'Émeraude',
  'Diamant',
  'Maître',
  'Grand Maître',
  'Challenger',
];

export function rankLabel(tierIndex: number, lp: number): string {
  const tier = RANK_TIERS[Math.min(tierIndex, RANK_TIERS.length - 1)];
  if (tierIndex >= RANK_TIERS.length - 3) return `${tier} (${lp} LP)`;
  return `${tier} ${lp} LP`;
}

export const TEAM_NAMES = [
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
];

export const STAGE_MIN_TEAM_RATING: Record<string, number> = {
  ACADEMY: 30,
  CHALLENGER: 50,
  PRO: 70,
};

export const STAGE_ORDER = ['AMATEUR', 'ACADEMY', 'CHALLENGER', 'PRO'] as const;

export function randomTeamName(exclude: string[] = []): string {
  const pool = TEAM_NAMES.filter((n) => !exclude.includes(n));
  return pool[Math.floor(Math.random() * pool.length)] ?? 'Free Agents';
}

export function initialStats(): Stats {
  return {
    mechanics: 25 + Math.floor(Math.random() * 10),
    gameSense: 15 + Math.floor(Math.random() * 10),
    teamwork: 15 + Math.floor(Math.random() * 10),
    mental: 20 + Math.floor(Math.random() * 15),
    communication: 15 + Math.floor(Math.random() * 10),
  };
}

export function createInitialState(name: string, role: Role): GameState {
  return {
    name,
    role,
    age: 16,
    month: 1,
    stats: initialStats(),
    energy: 100,
    morale: 70,
    health: 100,
    rank: { tierIndex: 0, lp: 0 },
    fame: 0,
    money: 200,
    team: null,
    stage: 'AMATEUR',
    monthsInSeason: 0,
    seasonsPlayedInTeam: 0,
    titles: [],
    log: [
      {
        id: crypto.randomUUID(),
        age: 16,
        month: 1,
        text: `${name} commence son ascension en SoloQ, déterminé·e à percer en tant que ${role}.`,
        kind: 'career',
      },
    ],
    peakRankIndex: 0,
    peakRankLp: 0,
    retired: false,
    retirementReason: null,
    seasonBanner: null,
  };
}

export interface RandomEvent {
  id: string;
  weight: number;
  condition?: (s: GameState) => boolean;
  text: (s: GameState) => string;
  apply: (s: GameState) => void;
  kind: 'good' | 'bad' | 'info';
}

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: 'wrist_strain',
    weight: 8,
    condition: (s) => s.energy < 40,
    kind: 'bad',
    text: (s) => `Le poignet de ${s.name} tire une sonnette d'alarme après trop de sessions intensives.`,
    apply: (s) => {
      s.health = Math.max(0, s.health - 15);
      s.stats.mechanics = Math.max(0, s.stats.mechanics - 4);
    },
  },
  {
    id: 'viral_clip',
    weight: 10,
    kind: 'good',
    text: () => `Un outplay incroyable devient viral sur les réseaux sociaux !`,
    apply: (s) => {
      s.fame = Math.min(100, s.fame + 8);
      s.morale = Math.min(100, s.morale + 5);
    },
  },
  {
    id: 'sponsor_offer',
    weight: 5,
    condition: (s) => s.fame >= 25,
    kind: 'good',
    text: () => `Une petite marque de périphériques gaming propose un partenariat.`,
    apply: (s) => {
      s.money += 150;
    },
  },
  {
    id: 'toxic_teammate',
    weight: 7,
    condition: (s) => !!s.team,
    kind: 'bad',
    text: () => `Une dispute éclate en interne après une soirée de scrims ratée.`,
    apply: (s) => {
      s.morale = Math.max(0, s.morale - 10);
    },
  },
  {
    id: 'fan_support',
    weight: 8,
    kind: 'good',
    text: () => `Un message de soutien touchant d'un fan remonte le moral.`,
    apply: (s) => {
      s.morale = Math.min(100, s.morale + 12);
    },
  },
  {
    id: 'back_pain',
    weight: 5,
    condition: (s) => s.health < 70,
    kind: 'bad',
    text: () => `Des douleurs au dos forcent une visite chez le kinésithérapeute.`,
    apply: (s) => {
      s.money = Math.max(0, s.money - 100);
      s.health = Math.min(100, s.health + 15);
    },
  },
  {
    id: 'meta_shift',
    weight: 6,
    kind: 'info',
    text: (s) => `Un gros patch bouleverse la méta du rôle ${s.role.toLowerCase()}, il faut s'adapter.`,
    apply: (s) => {
      s.stats.gameSense = Math.min(100, s.stats.gameSense + 2);
      s.energy = Math.max(0, s.energy - 5);
    },
  },
  {
    id: 'scouted_dm',
    weight: 6,
    condition: (s) => s.stage === 'AMATEUR' && s.rank.tierIndex >= 3,
    kind: 'good',
    text: () => `Un manager d'équipe académie envoie un message privé pour évaluer le niveau.`,
    apply: (s) => {
      s.fame = Math.min(100, s.fame + 5);
    },
  },
  {
    id: 'burnout_warning',
    weight: 6,
    condition: (s) => s.morale < 30,
    kind: 'bad',
    text: () => `Signes clairs de burnout : concentration en berne, motivation en chute libre.`,
    apply: (s) => {
      s.stats.mental = Math.max(0, s.stats.mental - 5);
      s.energy = Math.max(0, s.energy - 10);
    },
  },
  {
    id: 'good_scrims',
    weight: 8,
    condition: (s) => !!s.team,
    kind: 'good',
    text: () => `Une session de scrims exceptionnelle renforce la confiance du roster.`,
    apply: (s) => {
      s.stats.teamwork = Math.min(100, s.stats.teamwork + 3);
      s.morale = Math.min(100, s.morale + 5);
    },
  },
];
