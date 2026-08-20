import type { Question } from './questionTypes';

const questions: Question[] = [
  {
    id: 'extra_practice',
    text: 'Ton coach te propose une session supplémentaire de practice tool un soir de semaine.',
    options: [
      { id: 'full', text: "Tu acceptes à fond", statDeltas: { micro: 4, mental: -2 }, formDelta: -8, moraleDelta: -2 },
      { id: 'light', text: 'Tu fais un peu, sans forcer', statDeltas: { micro: 1 }, formDelta: -2 },
      { id: 'refuse', text: 'Tu refuses pour te reposer', statDeltas: { mental: 2, serious: -2 }, formDelta: 5, moraleDelta: 2 },
    ],
  },
  {
    id: 'amateur_tournament',
    text: 'Un tournoi amateur est organisé près de chez toi.',
    options: [
      { id: 'play', text: "Tu t'inscris et tu te donnes à fond", statDeltas: { teamfight: 3, mental: -1 }, popularityDelta: 3, formDelta: -5, moraleDelta: 3 },
      { id: 'watch', text: 'Tu regardes en spectateur pour apprendre', statDeltas: { macro: 2 }, moraleDelta: 1 },
      { id: 'soloq', text: 'Tu préfères rester chez toi en SoloQ', statDeltas: { micro: 2, serious: -1 }, formDelta: -2 },
    ],
  },
  {
    id: 'scrim_loss',
    text: 'Après une défaite difficile en scrim, ton équipe est démoralisée.',
    options: [
      { id: 'motivate', text: 'Tu motives le groupe', statDeltas: { mental: 3, teamfight: 2 }, formDelta: -1, moraleDelta: 4 },
      { id: 'silent', text: 'Tu restes silencieux, concentré sur toi', statDeltas: { micro: 1 } },
      { id: 'blame', text: 'Tu rejettes la faute sur un coéquipier', statDeltas: { mental: -3 }, popularityDelta: -2, moraleDelta: -5 },
    ],
  },
  {
    id: 'parents_worried',
    text: "Tes parents s'inquiètent du temps que tu passes devant l'écran.",
    options: [
      { id: 'explain', text: 'Tu leur expliques ton projet sérieusement', statDeltas: { serious: 3, mental: 2 }, moraleDelta: 3 },
      { id: 'shrug', text: 'Tu hausses les épaules et continues', statDeltas: {} },
      { id: 'anger', text: 'Tu t’énerves et claques la porte', statDeltas: { mental: -3, serious: -2 }, formDelta: -2, moraleDelta: -4 },
    ],
  },
  {
    id: 'influencer_clip',
    text: 'Un influenceur te propose de faire un clip ensemble pour sa chaîne.',
    options: [
      { id: 'accept', text: 'Tu acceptes, ça peut aider ta carrière', statDeltas: {}, moneyDelta: 50, popularityDelta: 5, formDelta: -2, moraleDelta: 3 },
      { id: 'focus', text: "Tu restes concentré sur l'entraînement", statDeltas: { micro: 2 }, formDelta: -3 },
      { id: 'refuse', text: "Tu refuses, tu n'aimes pas l'exposition", statDeltas: { mental: 1 }, popularityDelta: -1, moraleDelta: -1 },
    ],
  },
  {
    id: 'school_or_esport',
    text: "Il faut trancher entre l'école et l'esport pour cette année.",
    options: [
      { id: 'allin', text: "Tu mises tout sur l'esport", statDeltas: { teamfight: 3, serious: -2 }, formDelta: -6, moraleDelta: -2 },
      { id: 'balance', text: 'Tu gardes un équilibre entre les deux', statDeltas: { serious: 2 }, formDelta: -1, moraleDelta: 1 },
      { id: 'school', text: "Tu priorises l'école, l'esport en option", statDeltas: { mental: 2, micro: -3 }, formDelta: 3, moraleDelta: 2 },
    ],
  },
  {
    id: 'wrist_pain',
    text: 'Une douleur au poignet apparaît après une session marathon.',
    options: [
      { id: 'doctor', text: 'Tu consultes un kiné tout de suite', statDeltas: { mental: 2 }, moneyDelta: -80, formDelta: 6, moraleDelta: 2 },
      { id: 'ignore', text: 'Tu ignores et tu continues', statDeltas: { micro: 1, mental: -2 }, formDelta: -6, moraleDelta: -2 },
      { id: 'rest', text: 'Tu prends une semaine de repos complet', statDeltas: { mental: 3, micro: -2 }, formDelta: 8, moraleDelta: 1 },
    ],
  },
  {
    id: 'public_criticism',
    text: 'Un coéquipier te critique publiquement sur les réseaux.',
    options: [
      { id: 'calm', text: 'Tu réponds calmement en privé', statDeltas: { mental: 2, serious: 2 }, moraleDelta: 2 },
      { id: 'ignore', text: 'Tu ignores complètement', statDeltas: {}, moraleDelta: -1 },
      { id: 'clash', text: 'Tu clashes en public', statDeltas: { mental: -2 }, popularityDelta: -4, formDelta: -1, moraleDelta: -5 },
    ],
  },
  {
    id: 'macro_bootcamp',
    text: 'Ton club te propose un stage macro avec un ancien pro.',
    options: [
      { id: 'full', text: 'Tu y vas à fond', statDeltas: { macro: 4 }, moneyDelta: -50, formDelta: -4, moraleDelta: 1 },
      { id: 'light', text: 'Tu y vas sans trop investir', statDeltas: { macro: 1 }, formDelta: -1 },
      { id: 'solo', text: 'Tu préfères pratiquer en solo', statDeltas: { micro: 2 }, formDelta: -2 },
    ],
  },
  {
    id: 'gear_sponsor',
    text: 'Une opportunité de sponsoring de périphériques gaming se présente.',
    options: [
      { id: 'sign', text: 'Tu signes, ça fait rentrer de l’argent', statDeltas: {}, moneyDelta: 150, popularityDelta: 2, moraleDelta: 2 },
      { id: 'negotiate', text: 'Tu négocies pour de meilleures conditions', statDeltas: { serious: 1 }, moneyDelta: 80, moraleDelta: 1 },
      { id: 'refuse', text: 'Tu refuses, trop tôt dans ta carrière', statDeltas: { serious: 2 } },
    ],
  },
  {
    id: 'patch_change',
    text: 'Un patch majeur change complètement ton rôle.',
    options: [
      { id: 'theorycraft', text: 'Tu passes des heures à théorycrafter', statDeltas: { macro: 3, mental: -1 }, formDelta: -4, moraleDelta: -1 },
      { id: 'adapt', text: "Tu t'adaptes progressivement", statDeltas: { lane: 2 }, formDelta: -1, moraleDelta: 1 },
      { id: 'refuse', text: 'Tu rages et refuses de changer tes habitudes', statDeltas: { mental: -3, lane: -2 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'series_loss',
    text: "Ton équipe perd une série importante, l'ambiance est tendue.",
    options: [
      { id: 'debrief', text: 'Tu proposes un debrief calme avec le groupe', statDeltas: { teamfight: 3, mental: 1 }, formDelta: -1, moraleDelta: 3 },
      { id: 'coach', text: 'Tu laisses le coach gérer', statDeltas: {} },
      { id: 'isolate', text: 'Tu t’isoles et coupes la communication', statDeltas: { teamfight: -3, mental: -1 }, formDelta: -1, moraleDelta: -4 },
    ],
  },
  {
    id: 'fan_selfie',
    text: "Un fan t'aborde après un match pour un selfie.",
    options: [
      { id: 'time', text: 'Tu prends le temps, souriant', statDeltas: {}, popularityDelta: 3, moraleDelta: 2 },
      { id: 'quick', text: 'Tu acceptes rapidement, pressé', statDeltas: {}, popularityDelta: 1, moraleDelta: 1 },
      { id: 'refuse', text: "Tu refuses, tu n'es pas à l'aise", statDeltas: { mental: 1 }, popularityDelta: -2, moraleDelta: -1 },
    ],
  },
  {
    id: 'insomnia',
    text: 'Veille de match important, impossible de dormir.',
    options: [
      { id: 'relax', text: 'Tu fais une routine de relaxation', statDeltas: { mental: 3 }, formDelta: 5, moraleDelta: 2 },
      { id: 'replays', text: 'Tu re-regardes des replays jusqu’à tard', statDeltas: { lane: 2, mental: -2 }, formDelta: -4, moraleDelta: -1 },
      { id: 'phone', text: "Tu scrolles ton téléphone jusqu'à l'épuisement", statDeltas: { mental: -3, serious: -1 }, formDelta: -7, moraleDelta: -3 },
    ],
  },
];

export default questions;
