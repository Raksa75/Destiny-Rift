import {
  RANDOM_EVENTS,
  RANK_TIERS,
  STAGE_MIN_TEAM_RATING,
  randomTeamName,
} from './data';
import type {
  ActionId,
  GameState,
  LogEntry,
  SeasonResult,
  StatKey,
  Team,
} from './types';

const ACTION_ENERGY_COST: Partial<Record<ActionId, number>> = {
  TRAIN_MECHANICS: 20,
  TRAIN_GAMESENSE: 18,
  TRAIN_TEAMWORK: 18,
  STUDY_VODS: 10,
  SOLOQ: 15,
  STREAM: 15,
  TEAM_PRACTICE: 20,
  TRYOUT: 10,
};

function pushLog(s: GameState, text: string, kind: LogEntry['kind']) {
  s.log.unshift({ id: crypto.randomUUID(), age: s.age, month: s.month, text, kind });
  if (s.log.length > 60) s.log.length = 60;
}

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

function bumpStat(s: GameState, key: StatKey, amount: number) {
  s.stats[key] = clamp(s.stats[key] + amount);
}

function statAverage(s: GameState): number {
  const { mechanics, gameSense, teamwork, mental, communication } = s.stats;
  return (mechanics + gameSense + teamwork + mental + communication) / 5;
}

function addRankProgress(s: GameState, delta: number) {
  let lp = s.rank.lp + delta;
  let tier = s.rank.tierIndex;
  while (lp >= 100 && tier < RANK_TIERS.length - 1) {
    lp -= 100;
    tier += 1;
  }
  while (lp < 0 && tier > 0) {
    lp += 100;
    tier -= 1;
  }
  lp = clamp(lp, 0, tier === RANK_TIERS.length - 1 ? 9999 : 99);
  s.rank = { tierIndex: tier, lp };
  if (
    tier > s.peakRankIndex ||
    (tier === s.peakRankIndex && lp > s.peakRankLp)
  ) {
    s.peakRankIndex = tier;
    s.peakRankLp = lp;
  }
}

export function canAfford(s: GameState, action: ActionId): boolean {
  const cost = ACTION_ENERGY_COST[action] ?? 0;
  return s.energy >= cost;
}

export function availableActions(s: GameState): ActionId[] {
  const actions: ActionId[] = [
    'TRAIN_MECHANICS',
    'TRAIN_GAMESENSE',
    'TRAIN_TEAMWORK',
    'STUDY_VODS',
    'SOLOQ',
    'REST',
  ];
  if (s.fame >= 20) actions.push('STREAM');
  if (s.team) actions.push('TEAM_PRACTICE');
  if (!s.team && s.stage === 'AMATEUR' && s.rank.tierIndex >= 2) actions.push('TRYOUT');
  if (!s.team && s.stage !== 'AMATEUR') actions.push('TRYOUT');
  if (s.age >= 24) actions.push('RETIRE');
  return actions;
}

function performAction(s: GameState, action: ActionId) {
  const cost = ACTION_ENERGY_COST[action] ?? 0;
  switch (action) {
    case 'TRAIN_MECHANICS': {
      s.energy -= cost;
      const gain = 3 + Math.round(Math.random() * 2);
      bumpStat(s, 'mechanics', gain);
      pushLog(s, `Session intensive de mécanique en pratique tool (+${gain} Mécanique).`, 'info');
      break;
    }
    case 'TRAIN_GAMESENSE': {
      s.energy -= cost;
      const gain = 3 + Math.round(Math.random() * 2);
      bumpStat(s, 'gameSense', gain);
      pushLog(s, `Analyse de replays et de macro-jeu (+${gain} Game Sense).`, 'info');
      break;
    }
    case 'TRAIN_TEAMWORK': {
      s.energy -= cost;
      const gain = 3 + Math.round(Math.random() * 2);
      bumpStat(s, 'teamwork', gain);
      bumpStat(s, 'communication', 1);
      pushLog(s, `Travail sur la synergie et la communication en équipe (+${gain} Synergie).`, 'info');
      break;
    }
    case 'STUDY_VODS': {
      s.energy -= cost;
      bumpStat(s, 'gameSense', 2);
      bumpStat(s, 'mental', 1);
      pushLog(s, `Étude de VODs de pros pour affiner la lecture de jeu.`, 'info');
      break;
    }
    case 'SOLOQ': {
      s.energy -= cost;
      const skill = (s.stats.mechanics + s.stats.gameSense) / 2;
      const luck = (Math.random() - 0.45) * 20;
      const delta = Math.round((skill - 40) / 3 + luck);
      addRankProgress(s, delta);
      s.fame = clamp(s.fame + (delta > 10 ? 2 : 0), 0, 100);
      if (delta >= 0) {
        pushLog(s, `Grind en SoloQ payant : gain de ${delta} LP.`, 'good');
      } else {
        pushLog(s, `Série difficile en SoloQ : perte de ${Math.abs(delta)} LP.`, 'bad');
      }
      break;
    }
    case 'REST': {
      s.energy = clamp(s.energy + 45);
      s.morale = clamp(s.morale + 10);
      s.health = clamp(s.health + 15);
      pushLog(s, `Repos bien mérité : énergie, santé et moral remontent.`, 'info');
      break;
    }
    case 'STREAM': {
      s.energy -= cost;
      const earnings = 50 + Math.round(s.fame * 3 + Math.random() * 100);
      s.money += earnings;
      const fameGain = 2 + Math.round(Math.random() * 3);
      s.fame = clamp(s.fame + fameGain);
      s.morale = clamp(s.morale + (Math.random() > 0.5 ? 5 : -5));
      pushLog(s, `Stream sur Twitch : +${earnings}€ et +${fameGain} de notoriété.`, 'good');
      break;
    }
    case 'TEAM_PRACTICE': {
      s.energy -= cost;
      bumpStat(s, 'teamwork', 3);
      bumpStat(s, 'mechanics', 1);
      if (s.team) s.team = { ...s.team, rating: clamp(s.team.rating + 1) };
      pushLog(s, `Scrims avec l'équipe : la synergie collective progresse.`, 'info');
      break;
    }
    case 'TRYOUT': {
      s.energy -= cost;
      handleTryout(s);
      break;
    }
    case 'RETIRE': {
      s.retired = true;
      s.retirementReason = 'Départ volontaire à la retraite.';
      pushLog(s, `${s.name} annonce sa retraite compétitive.`, 'career');
      break;
    }
  }
}

function handleTryout(s: GameState) {
  const skill = statAverage(s);
  if (s.stage === 'AMATEUR') {
    const threshold = 35;
    const chance = clamp((skill - threshold) * 2 + s.rank.tierIndex * 8, 5, 90);
    if (Math.random() * 100 < chance) {
      const team: Team = { id: crypto.randomUUID(), name: randomTeamName(), stage: 'ACADEMY', rating: 30 + Math.round(Math.random() * 15) };
      s.team = team;
      s.stage = 'ACADEMY';
      s.monthsInSeason = 0;
      s.fame = clamp(s.fame + 10);
      pushLog(s, `Essai concluant ! ${s.name} rejoint l'équipe académie ${team.name}.`, 'good');
    } else {
      pushLog(s, `Essai raté auprès d'une équipe académie. Il faut continuer à progresser en SoloQ.`, 'bad');
    }
  } else {
    const nextStageMap: Record<string, { stage: GameState['stage']; min: number }> = {
      ACADEMY: { stage: 'CHALLENGER', min: STAGE_MIN_TEAM_RATING.CHALLENGER },
      CHALLENGER: { stage: 'PRO', min: STAGE_MIN_TEAM_RATING.PRO },
    };
    const next = nextStageMap[s.stage];
    if (!next) {
      pushLog(s, `Aucune équipe de niveau supérieur ne recrute pour le moment.`, 'info');
      return;
    }
    const chance = clamp((skill - next.min) * 2 + s.fame / 2, 5, 85);
    if (Math.random() * 100 < chance) {
      const team: Team = { id: crypto.randomUUID(), name: randomTeamName(), stage: next.stage, rating: next.min + Math.round(Math.random() * 15) };
      s.team = team;
      s.stage = next.stage;
      s.monthsInSeason = 0;
      s.fame = clamp(s.fame + 15);
      pushLog(s, `Transfert réussi vers ${team.name} en ${next.stage === 'CHALLENGER' ? 'Ligue Challenger' : 'Ligue Pro'} !`, 'good');
    } else {
      pushLog(s, `Le transfert espéré vers un niveau supérieur ne s'est pas concrétisé cette fois.`, 'bad');
    }
  }
}

function maybeTriggerEvent(s: GameState) {
  if (Math.random() > 0.35) return;
  const pool = RANDOM_EVENTS.filter((e) => !e.condition || e.condition(s));
  if (pool.length === 0) return;
  const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const event of pool) {
    roll -= event.weight;
    if (roll <= 0) {
      event.apply(s);
      pushLog(s, event.text(s), event.kind);
      return;
    }
  }
}

function applyAging(s: GameState) {
  if (s.age >= 27) {
    const decay = s.age >= 32 ? 2 : 1;
    if (Math.random() < 0.5) bumpStat(s, 'mechanics', -decay);
    if (Math.random() < 0.3) bumpStat(s, 'gameSense', 1);
  }
}

function resolveSeason(s: GameState): SeasonResult | null {
  if (!s.team) return null;
  const teamRating = s.team.rating;
  const playerImpact = statAverage(s) * 0.6 + s.rank.tierIndex * 4;
  const seasonScore = clamp(teamRating * 0.55 + playerImpact * 0.45 + (Math.random() - 0.5) * 20, 0, 130);

  let placement: SeasonResult['placement'];
  let promoted = false;
  let relegated = false;
  let wins = 0;
  const games = 18;

  if (seasonScore >= 85) {
    placement = 'CHAMPION';
    wins = 14 + Math.round(Math.random() * 4);
    promoted = s.stage !== 'PRO';
    s.titles.push(`Champion ${s.stage === 'ACADEMY' ? 'Académie' : s.stage === 'CHALLENGER' ? 'Challenger' : 'Pro'} (${s.age} ans)`);
    s.fame = clamp(s.fame + 20);
    s.money += 500 * (s.stage === 'PRO' ? 4 : 1);
  } else if (seasonScore >= 65) {
    placement = 'PLAYOFFS';
    wins = 10 + Math.round(Math.random() * 4);
    s.fame = clamp(s.fame + 8);
    s.money += 150;
  } else if (seasonScore >= 40) {
    placement = 'MID_TABLE';
    wins = 7 + Math.round(Math.random() * 4);
  } else {
    placement = 'RELEGATED';
    wins = 2 + Math.round(Math.random() * 4);
    relegated = true;
    s.fame = clamp(s.fame - 5, 0, 100);
  }

  const losses = games - wins;
  let outcomeText: string;
  const teamName = s.team.name;

  if (placement === 'CHAMPION') {
    outcomeText = `${teamName} remporte le titre de la saison ! Une performance mémorable de ${s.name}.`;
  } else if (placement === 'PLAYOFFS') {
    outcomeText = `${teamName} atteint les playoffs, une saison solide pour ${s.name}.`;
  } else if (placement === 'MID_TABLE') {
    outcomeText = `${teamName} termine en milieu de tableau, une saison sans éclat particulier.`;
  } else {
    outcomeText = `${teamName} est relégué après une saison catastrophique. ${s.name} est libéré·e de son contrat.`;
  }

  if (promoted && s.stage !== 'PRO') {
    const order: GameState['stage'][] = ['AMATEUR', 'ACADEMY', 'CHALLENGER', 'PRO'];
    const idx = order.indexOf(s.stage);
    const nextStage = order[Math.min(idx + 1, order.length - 1)];
    s.stage = nextStage;
    if (s.team) s.team = { ...s.team, stage: nextStage, rating: clamp(s.team.rating + 15) };
    outcomeText += ` L'équipe est promue au niveau ${nextStage === 'CHALLENGER' ? 'Challenger' : 'Pro'}.`;
  }

  if (relegated) {
    s.team = null;
    s.stage = 'AMATEUR';
    addRankProgress(s, -20);
  }

  s.seasonsPlayedInTeam += 1;
  s.monthsInSeason = 0;

  const result: SeasonResult = {
    stage: s.stage,
    teamName,
    placement,
    record: `${wins}V - ${losses}D`,
    outcomeText,
    promoted,
    relegated,
  };
  pushLog(s, outcomeText, 'season');
  return result;
}

function advanceCalendar(s: GameState) {
  s.month += 1;
  if (s.month > 12) {
    s.month = 1;
    s.age += 1;
  }
  if (s.team) {
    s.monthsInSeason += 1;
    if (s.monthsInSeason >= 12) {
      s.seasonBanner = resolveSeason(s);
    }
  }
  s.energy = clamp(s.energy + 5);
}

function checkForcedRetirement(s: GameState) {
  if (s.retired) return;
  if (s.age >= 36) {
    s.retired = true;
    s.retirementReason = "L'âge a eu raison de la carrière compétitive.";
    pushLog(s, `${s.name} raccroche définitivement à ${s.age} ans.`, 'career');
  } else if (s.health <= 0) {
    s.retired = true;
    s.retirementReason = 'Blessures trop graves pour continuer.';
    pushLog(s, `${s.name} est contraint·e à la retraite pour raisons de santé.`, 'career');
  }
}

export function applyTurn(prev: GameState, action: ActionId): GameState {
  const s: GameState = structuredClone(prev);
  s.seasonBanner = null;
  if (!canAfford(s, action) && action !== 'REST' && action !== 'RETIRE') {
    pushLog(s, `Pas assez d'énergie pour cette action, un repos s'impose.`, 'bad');
    return s;
  }
  performAction(s, action);
  if (s.retired) return s;
  maybeTriggerEvent(s);
  applyAging(s);
  advanceCalendar(s);
  checkForcedRetirement(s);
  return s;
}

export function legacyTitle(s: GameState): string {
  const peak = s.peakRankIndex;
  const titleCount = s.titles.length;
  if (titleCount >= 2 && peak >= 7) return 'Légende de la Faille';
  if (titleCount >= 1 && peak >= 6) return 'Icône Régionale';
  if (peak >= 8) return 'Prodige Mécanique';
  if (peak >= 5) return 'Vétéran Respecté';
  if (peak >= 3) return 'Joueur de Rotation Solide';
  return 'Carrière Discrète';
}
