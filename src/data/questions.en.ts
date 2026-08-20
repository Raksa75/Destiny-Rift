import type { Question } from './questionTypes';

const questions: Question[] = [
  {
    id: 'extra_practice',
    text: 'Your coach offers an extra practice tool session on a weeknight.',
    options: [
      { id: 'full', text: 'You go all in', statDeltas: { micro: 4, mental: -2 }, formDelta: -8, moraleDelta: -2 },
      { id: 'light', text: "You do a bit, without pushing too hard", statDeltas: { micro: 1 }, formDelta: -2 },
      { id: 'refuse', text: 'You refuse to rest instead', statDeltas: { mental: 2, serious: -2 }, formDelta: 5, moraleDelta: 2 },
    ],
  },
  {
    id: 'amateur_tournament',
    text: 'An amateur tournament is held near you.',
    options: [
      { id: 'play', text: 'You sign up and give it everything', statDeltas: { teamfight: 3, mental: -1 }, popularityDelta: 3, formDelta: -5, moraleDelta: 3 },
      { id: 'watch', text: 'You watch as a spectator to learn', statDeltas: { macro: 2 }, moraleDelta: 1 },
      { id: 'soloq', text: 'You’d rather stay home and solo queue', statDeltas: { micro: 2, serious: -1 }, formDelta: -2 },
    ],
  },
  {
    id: 'scrim_loss',
    text: 'After a rough scrim loss, your team is demoralized.',
    options: [
      { id: 'motivate', text: 'You rally the group', statDeltas: { mental: 3, teamfight: 2 }, formDelta: -1, moraleDelta: 4 },
      { id: 'silent', text: 'You stay quiet, focused on yourself', statDeltas: { micro: 1 } },
      { id: 'blame', text: 'You blame a teammate', statDeltas: { mental: -3 }, popularityDelta: -2, moraleDelta: -5 },
    ],
  },
  {
    id: 'parents_worried',
    text: 'Your parents are worried about how much time you spend on screens.',
    options: [
      { id: 'explain', text: 'You explain your project seriously', statDeltas: { serious: 3, mental: 2 }, moraleDelta: 3 },
      { id: 'shrug', text: 'You shrug and keep going', statDeltas: {} },
      { id: 'anger', text: 'You get angry and slam the door', statDeltas: { mental: -3, serious: -2 }, formDelta: -2, moraleDelta: -4 },
    ],
  },
  {
    id: 'influencer_clip',
    text: 'An influencer offers to make a clip together for their channel.',
    options: [
      { id: 'accept', text: 'You accept, it could help your career', statDeltas: {}, moneyDelta: 50, popularityDelta: 5, formDelta: -2, moraleDelta: 3 },
      { id: 'focus', text: 'You stay focused on training', statDeltas: { micro: 2 }, formDelta: -3 },
      { id: 'refuse', text: "You refuse, you don't like the exposure", statDeltas: { mental: 1 }, popularityDelta: -1, moraleDelta: -1 },
    ],
  },
  {
    id: 'school_or_esport',
    text: 'You need to decide between school and esports for this year.',
    options: [
      { id: 'allin', text: 'You go all in on esports', statDeltas: { teamfight: 3, serious: -2 }, formDelta: -6, moraleDelta: -2 },
      { id: 'balance', text: 'You keep a balance between both', statDeltas: { serious: 2 }, formDelta: -1, moraleDelta: 1 },
      { id: 'school', text: 'You prioritize school, esports on the side', statDeltas: { mental: 2, micro: -3 }, formDelta: 3, moraleDelta: 2 },
    ],
  },
  {
    id: 'wrist_pain',
    text: 'Wrist pain shows up after a marathon session.',
    options: [
      { id: 'doctor', text: 'You see a physio right away', statDeltas: { mental: 2 }, moneyDelta: -80, formDelta: 6, moraleDelta: 2 },
      { id: 'ignore', text: 'You ignore it and keep going', statDeltas: { micro: 1, mental: -2 }, formDelta: -6, moraleDelta: -2 },
      { id: 'rest', text: 'You take a full week off', statDeltas: { mental: 3, micro: -2 }, formDelta: 8, moraleDelta: 1 },
    ],
  },
  {
    id: 'public_criticism',
    text: 'A teammate criticizes you publicly on social media.',
    options: [
      { id: 'calm', text: 'You reply calmly in private', statDeltas: { mental: 2, serious: 2 }, moraleDelta: 2 },
      { id: 'ignore', text: 'You ignore it completely', statDeltas: {}, moraleDelta: -1 },
      { id: 'clash', text: 'You clash back publicly', statDeltas: { mental: -2 }, popularityDelta: -4, formDelta: -1, moraleDelta: -5 },
    ],
  },
  {
    id: 'macro_bootcamp',
    text: 'Your club offers a macro bootcamp with a former pro.',
    options: [
      { id: 'full', text: 'You go all in', statDeltas: { macro: 4 }, moneyDelta: -50, formDelta: -4, moraleDelta: 1 },
      { id: 'light', text: 'You go without investing too much', statDeltas: { macro: 1 }, formDelta: -1 },
      { id: 'solo', text: 'You’d rather practice solo', statDeltas: { micro: 2 }, formDelta: -2 },
    ],
  },
  {
    id: 'gear_sponsor',
    text: 'A gaming gear sponsorship opportunity comes up.',
    options: [
      { id: 'sign', text: 'You sign, it brings in money', statDeltas: {}, moneyDelta: 150, popularityDelta: 2, moraleDelta: 2 },
      { id: 'negotiate', text: 'You negotiate for better terms', statDeltas: { serious: 1 }, moneyDelta: 80, moraleDelta: 1 },
      { id: 'refuse', text: 'You refuse, too early in your career', statDeltas: { serious: 2 } },
    ],
  },
  {
    id: 'patch_change',
    text: 'A major patch completely changes your role.',
    options: [
      { id: 'theorycraft', text: 'You spend hours theorycrafting', statDeltas: { macro: 3, mental: -1 }, formDelta: -4, moraleDelta: -1 },
      { id: 'adapt', text: 'You adapt gradually', statDeltas: { lane: 2 }, formDelta: -1, moraleDelta: 1 },
      { id: 'refuse', text: 'You rage and refuse to change your habits', statDeltas: { mental: -3, lane: -2 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'series_loss',
    text: 'Your team loses an important series, the mood is tense.',
    options: [
      { id: 'debrief', text: 'You suggest a calm debrief with the group', statDeltas: { teamfight: 3, mental: 1 }, formDelta: -1, moraleDelta: 3 },
      { id: 'coach', text: 'You let the coach handle it', statDeltas: {} },
      { id: 'isolate', text: 'You isolate yourself and cut communication', statDeltas: { teamfight: -3, mental: -1 }, formDelta: -1, moraleDelta: -4 },
    ],
  },
  {
    id: 'fan_selfie',
    text: 'A fan approaches you after a match for a selfie.',
    options: [
      { id: 'time', text: 'You take your time, smiling', statDeltas: {}, popularityDelta: 3, moraleDelta: 2 },
      { id: 'quick', text: 'You accept quickly, in a rush', statDeltas: {}, popularityDelta: 1, moraleDelta: 1 },
      { id: 'refuse', text: "You refuse, you're not comfortable with it", statDeltas: { mental: 1 }, popularityDelta: -2, moraleDelta: -1 },
    ],
  },
  {
    id: 'insomnia',
    text: "The night before a big match, you can't sleep.",
    options: [
      { id: 'relax', text: 'You do a relaxation routine', statDeltas: { mental: 3 }, formDelta: 5, moraleDelta: 2 },
      { id: 'replays', text: 'You rewatch replays late into the night', statDeltas: { lane: 2, mental: -2 }, formDelta: -4, moraleDelta: -1 },
      { id: 'phone', text: 'You scroll your phone until exhausted', statDeltas: { mental: -3, serious: -1 }, formDelta: -7, moraleDelta: -3 },
    ],
  },
];

export default questions;
