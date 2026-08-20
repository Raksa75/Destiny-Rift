import type { MatchQuestion } from './matchTypes';

export const REGULAR_MATCHES_EN: MatchQuestion[] = [
  {
    id: 'draft_scaling',
    text: 'In draft, the enemy leaves you a late-game scaling pick.',
    options: [
      { id: 'lategame', text: 'You play for the late game', winChance: 0.6 },
      { id: 'earlygame', text: 'You force the early game advantage', winChance: 0.5 },
      { id: 'balanced', text: 'You play a balanced draft', winChance: 0.55 },
    ],
  },
  {
    id: 'jungle_invade',
    text: 'Your jungler suggests an invade at 1:30.',
    options: [
      { id: 'validate', text: 'You go for the invade', winChance: 0.5 },
      { id: 'secure', text: 'You’d rather secure your own camp', winChance: 0.55 },
      { id: 'swap', text: 'You ask for a lane swap', winChance: 0.45 },
    ],
  },
  {
    id: 'mid_pick',
    text: 'A pick is available on mid lane at 15 minutes.',
    options: [
      { id: 'engage', text: 'You engage with your jungler', winChance: 0.55 },
      { id: 'safe', text: 'You play safe and scale', winChance: 0.5 },
      { id: 'bait', text: 'You bait for a counter-engage', winChance: 0.5 },
    ],
  },
  {
    id: 'baron_call',
    text: 'Baron Nashor spawns, your team hesitates.',
    options: [
      { id: 'force', text: 'You force the call to take it', winChance: 0.5 },
      { id: 'vision', text: 'You wait for full vision', winChance: 0.6 },
      { id: 'split', text: 'You ignore it and split top', winChance: 0.45 },
    ],
  },
  {
    id: 'bot_pressure',
    text: 'Your bot lane is struggling against an aggressive lane.',
    options: [
      { id: 'roam', text: 'You roam to help', winChance: 0.5 },
      { id: 'trust', text: 'You trust them to survive', winChance: 0.45 },
      { id: 'shove', text: 'You shove your lane to recall together', winChance: 0.55 },
    ],
  },
  {
    id: 'soul_fight',
    text: 'A teamfight is brewing around the Soul Dragon.',
    options: [
      { id: 'first', text: 'You engage first', winChance: 0.5 },
      { id: 'wait', text: 'You wait for an enemy mistake', winChance: 0.55 },
      { id: 'flank', text: 'You flank from the side', winChance: 0.6 },
    ],
  },
  {
    id: 'iso_pick',
    text: 'An isolated pick on the enemy support is available.',
    options: [
      { id: 'punish', text: 'You punish it immediately', winChance: 0.55 },
      { id: 'careful', text: 'You play it safe, it could be a trap', winChance: 0.5 },
      { id: 'confirm', text: 'You ask for vision confirmation before engaging', winChance: 0.6 },
    ],
  },
  {
    id: 'split_push',
    text: 'The enemy attempts a massive top lane split push.',
    options: [
      { id: 'stop', text: 'You send someone to stop it', winChance: 0.5 },
      { id: 'trade', text: 'You take objectives elsewhere', winChance: 0.55 },
      { id: 'allin', text: 'You group for a base all-in', winChance: 0.45 },
    ],
  },
];

export const FINAL_MATCHES_EN: MatchQuestion[] = [
  {
    id: 'decisive_game',
    text: 'It’s the final. Close score, last game of the series.',
    options: [
      { id: 'plan', text: 'You stick to the strategy that carried you all season', winChance: 0.55 },
      { id: 'surprise', text: 'You surprise with an unseen draft', winChance: 0.5 },
      { id: 'carry', text: 'You bet everything on your carry', winChance: 0.5 },
    ],
  },
  {
    id: 'must_win',
    text: 'Decisive game, the opponent just won the previous one.',
    options: [
      { id: 'stay', text: 'You stick to your game plan', winChance: 0.55 },
      { id: 'switch', text: 'You completely switch approach', winChance: 0.45 },
      { id: 'cautious', text: 'You play ultra safe, risking nothing', winChance: 0.5 },
    ],
  },
  {
    id: 'final_fight',
    text: 'The last teamfight of the season, everything is on the line.',
    options: [
      { id: 'confident', text: 'You engage with confidence', winChance: 0.55 },
      { id: 'patient', text: 'You wait for the right moment', winChance: 0.55 },
      { id: 'coach', text: 'You follow the coach’s instructions to the letter', winChance: 0.6 },
    ],
  },
  {
    id: 'crowd_pressure',
    text: 'The arena is packed, the pressure is immense.',
    options: [
      { id: 'block', text: 'You block out the noise and play your game', winChance: 0.55 },
      { id: 'lean', text: 'You lean on your teammates', winChance: 0.55 },
      { id: 'positive', text: 'You turn the pressure into positive energy', winChance: 0.5 },
    ],
  },
];
