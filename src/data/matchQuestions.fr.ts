import type { MatchQuestion } from './matchTypes';

export const REGULAR_MATCHES_FR: MatchQuestion[] = [
  {
    id: 'draft_scaling',
    text: 'En draft, l’ennemi vous laisse un pick de scaling pour le late game.',
    options: [
      { id: 'lategame', text: 'Vous jouez pour le late game', winChance: 0.6 },
      { id: 'earlygame', text: 'Vous forcez l’avantage en early game', winChance: 0.5 },
      { id: 'balanced', text: 'Vous jouez un draft équilibré', winChance: 0.55 },
    ],
  },
  {
    id: 'jungle_invade',
    text: 'Votre jungler propose un invade à 1:30.',
    options: [
      { id: 'validate', text: 'Vous validez l’invade', winChance: 0.5 },
      { id: 'secure', text: 'Vous préférez sécuriser votre camp', winChance: 0.55 },
      { id: 'swap', text: 'Vous demandez un swap de lane', winChance: 0.45 },
    ],
  },
  {
    id: 'mid_pick',
    text: 'Un pick est disponible en mid lane à 15 minutes.',
    options: [
      { id: 'engage', text: 'Vous engagez avec votre jungler', winChance: 0.55 },
      { id: 'safe', text: 'Vous restez safe et scalez', winChance: 0.5 },
      { id: 'bait', text: 'Vous baitez pour contre-engager', winChance: 0.5 },
    ],
  },
  {
    id: 'baron_call',
    text: 'Le Baron Nashor spawn, votre équipe hésite.',
    options: [
      { id: 'force', text: 'Vous forcez le call pour le prendre', winChance: 0.5 },
      { id: 'vision', text: 'Vous attendez d’avoir la vision complète', winChance: 0.6 },
      { id: 'split', text: 'Vous ignorez et splittez top', winChance: 0.45 },
    ],
  },
  {
    id: 'bot_pressure',
    text: 'Votre botlane est en difficulté face à une lane agressive.',
    options: [
      { id: 'roam', text: 'Vous roam pour aider', winChance: 0.5 },
      { id: 'trust', text: 'Vous leur faites confiance pour survivre', winChance: 0.45 },
      { id: 'shove', text: 'Vous shove votre lane pour recall ensemble', winChance: 0.55 },
    ],
  },
  {
    id: 'soul_fight',
    text: 'Une teamfight se prépare autour du Drake d’âme.',
    options: [
      { id: 'first', text: 'Vous engagez en premier', winChance: 0.5 },
      { id: 'wait', text: 'Vous attendez une faute adverse', winChance: 0.55 },
      { id: 'flank', text: 'Vous flanquez par le côté', winChance: 0.6 },
    ],
  },
  {
    id: 'iso_pick',
    text: 'Un pick isolé sur le support adverse est disponible.',
    options: [
      { id: 'punish', text: 'Vous punissez immédiatement', winChance: 0.55 },
      { id: 'careful', text: 'Vous jouez la sécurité, ça pourrait être un piège', winChance: 0.5 },
      { id: 'confirm', text: 'Vous demandez confirmation vision avant d’engager', winChance: 0.6 },
    ],
  },
  {
    id: 'split_push',
    text: 'L’ennemi tente un split push massif en top lane.',
    options: [
      { id: 'stop', text: 'Vous envoyez quelqu’un le stopper', winChance: 0.5 },
      { id: 'trade', text: 'Vous prenez des objectifs ailleurs', winChance: 0.55 },
      { id: 'allin', text: 'Vous groupez pour un all-in base', winChance: 0.45 },
    ],
  },
];

export const FINAL_MATCHES_FR: MatchQuestion[] = [
  {
    id: 'decisive_game',
    text: 'C’est la finale. Score serré, dernier match de la série.',
    options: [
      { id: 'plan', text: 'Vous jouez la stratégie qui vous a portés toute la saison', winChance: 0.55 },
      { id: 'surprise', text: 'Vous surprenez avec un draft inédit', winChance: 0.5 },
      { id: 'carry', text: 'Vous misez tout sur votre carry', winChance: 0.5 },
    ],
  },
  {
    id: 'must_win',
    text: 'Manche décisive, l’adversaire vient de gagner la précédente.',
    options: [
      { id: 'stay', text: 'Vous restez sur votre plan de jeu', winChance: 0.55 },
      { id: 'switch', text: 'Vous changez complètement d’approche', winChance: 0.45 },
      { id: 'cautious', text: 'Vous jouez ultra prudent pour ne rien risquer', winChance: 0.5 },
    ],
  },
  {
    id: 'final_fight',
    text: 'Dernier teamfight de la saison, tout se joue maintenant.',
    options: [
      { id: 'confident', text: 'Vous engagez en confiance', winChance: 0.55 },
      { id: 'patient', text: 'Vous attendez le bon moment', winChance: 0.55 },
      { id: 'coach', text: 'Vous suivez les instructions du coach à la lettre', winChance: 0.6 },
    ],
  },
  {
    id: 'crowd_pressure',
    text: 'Le stade est plein, la pression est immense.',
    options: [
      { id: 'block', text: 'Vous bloquez le bruit et jouez votre jeu', winChance: 0.55 },
      { id: 'lean', text: 'Vous vous appuyez sur vos coéquipiers', winChance: 0.55 },
      { id: 'positive', text: 'Vous transformez la pression en énergie positive', winChance: 0.5 },
    ],
  },
];
