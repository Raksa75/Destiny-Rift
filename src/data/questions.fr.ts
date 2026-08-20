import type { Question } from './questionTypes';

const questions: Question[] = [
  {
    id: 'extra_practice',
    text: 'Ton coach te propose une session supplémentaire de practice tool un soir de semaine.',
    options: [
      { id: 'full', text: "Tu acceptes à fond", statDeltas: { micro: 4, mental: -2, coach: 3 }, formDelta: -8, moraleDelta: -2 },
      { id: 'light', text: 'Tu fais un peu, sans forcer', statDeltas: { micro: 1 }, formDelta: -2 },
      { id: 'refuse', text: 'Tu refuses pour te reposer', statDeltas: { mental: 2, serious: -2, coach: -2 }, formDelta: 5, moraleDelta: 2 },
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
      { id: 'motivate', text: 'Tu motives le groupe', statDeltas: { mental: 3, teamfight: 2, locker: 4 }, formDelta: -1, moraleDelta: 4 },
      { id: 'silent', text: 'Tu restes silencieux, concentré sur toi', statDeltas: { micro: 1 } },
      { id: 'blame', text: 'Tu rejettes la faute sur un coéquipier', statDeltas: { mental: -3, locker: -6 }, popularityDelta: -2, moraleDelta: -5 },
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
      { id: 'calm', text: 'Tu réponds calmement en privé', statDeltas: { mental: 2, serious: 2, locker: 3 }, moraleDelta: 2 },
      { id: 'ignore', text: 'Tu ignores complètement', statDeltas: {}, moraleDelta: -1 },
      { id: 'clash', text: 'Tu clashes en public', statDeltas: { mental: -2, locker: -5 }, popularityDelta: -4, formDelta: -1, moraleDelta: -5 },
    ],
  },
  {
    id: 'macro_bootcamp',
    text: 'Ton club te propose un stage macro avec un ancien pro.',
    options: [
      { id: 'full', text: 'Tu y vas à fond', statDeltas: { macro: 4, coach: 4 }, moneyDelta: -50, formDelta: -4, moraleDelta: 1 },
      { id: 'light', text: 'Tu y vas sans trop investir', statDeltas: { macro: 1 }, formDelta: -1 },
      { id: 'solo', text: 'Tu préfères pratiquer en solo', statDeltas: { micro: 2, coach: -3 }, formDelta: -2 },
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
      { id: 'adapt', text: "Tu t'adaptes progressivement", statDeltas: { lane: 2, coach: 3 }, formDelta: -1, moraleDelta: 1 },
      { id: 'refuse', text: 'Tu rages et refuses de changer tes habitudes', statDeltas: { mental: -3, lane: -2, coach: -4 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'series_loss',
    text: "Ton équipe perd une série importante, l'ambiance est tendue.",
    options: [
      { id: 'debrief', text: 'Tu proposes un debrief calme avec le groupe', statDeltas: { teamfight: 3, mental: 1, locker: 3 }, formDelta: -1, moraleDelta: 3 },
      { id: 'coach', text: 'Tu laisses le coach gérer', statDeltas: { coach: 4 } },
      { id: 'isolate', text: 'Tu t’isoles et coupes la communication', statDeltas: { teamfight: -3, mental: -1, locker: -4 }, formDelta: -1, moraleDelta: -4 },
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
  {
    id: 'streaming_offer',
    text: '🎥 Une plateforme te propose de streamer tes sessions de solo queue.',
    options: [
      { id: 'stream_a_lot', text: 'Tu streames tous les soirs', statDeltas: { serious: -2 }, moneyDelta: 120, popularityDelta: 6, formDelta: -4, moraleDelta: 2 },
      { id: 'stream_light', text: 'Tu streames une fois par semaine', statDeltas: {}, moneyDelta: 40, popularityDelta: 2 },
      { id: 'refuse', text: 'Tu refuses pour rester concentré', statDeltas: { serious: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'language_class',
    text: "🗣️ Ton club te propose des cours de langue pour mieux t'intégrer au vestiaire.",
    options: [
      { id: 'full', text: "Tu t'investis à fond", statDeltas: { locker: 5, mental: 1 }, moneyDelta: -30, formDelta: -1, moraleDelta: 2 },
      { id: 'light', text: 'Tu suis les cours sans plus', statDeltas: { locker: 2 } },
      { id: 'refuse', text: 'Tu refuses, tu comptes sur les gestes', statDeltas: { locker: -2 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'agent_contact',
    text: '📞 Un agent te contacte pour te représenter dans tes futures négociations.',
    options: [
      { id: 'sign', text: 'Tu signes avec lui', statDeltas: { serious: 1 }, moneyDelta: -20, popularityDelta: 2, moraleDelta: 1 },
      { id: 'think', text: 'Tu prends le temps de réfléchir', statDeltas: {} },
      { id: 'refuse', text: 'Tu refuses, tu préfères gérer seul·e', statDeltas: { mental: 1, serious: -1 } },
    ],
  },
  {
    id: 'family_visit',
    text: '✈️ Ta famille te propose de venir te rendre visite pour les fêtes.',
    options: [
      { id: 'invite', text: 'Tu les invites avec joie', statDeltas: { mental: 2 }, moneyDelta: -100, moraleDelta: 6 },
      { id: 'call', text: 'Tu préfères un simple appel vidéo', statDeltas: {}, moraleDelta: 2 },
      { id: 'decline', text: 'Tu déclines, trop occupé·e par la saison', statDeltas: { serious: 1 }, formDelta: 2, moraleDelta: -4 },
    ],
  },
  {
    id: 'nutritionist',
    text: "🥗 Le club engage un·e nutritionniste pour toute l'équipe.",
    options: [
      { id: 'follow', text: 'Tu suis le programme à la lettre', statDeltas: { serious: 3, mental: 1 }, formDelta: 5, moraleDelta: 1 },
      { id: 'partial', text: 'Tu appliques certains conseils', statDeltas: { serious: 1 }, formDelta: 2 },
      { id: 'ignore', text: 'Tu ignores complètement le programme', statDeltas: { serious: -2 }, formDelta: -3 },
    ],
  },
  {
    id: 'rival_trashtalk',
    text: '🎤 Un joueur rival te clashe en interview avant votre match.',
    options: [
      { id: 'clapback', text: 'Tu réponds avec un clash bien senti', statDeltas: { mental: 1 }, popularityDelta: 4, formDelta: 3, moraleDelta: 2 },
      { id: 'ignore', text: 'Tu restes professionnel·le et l’ignores', statDeltas: { mental: 2, serious: 1 }, moraleDelta: 1 },
      { id: 'affected', text: 'Ça te déstabilise plus que prévu', statDeltas: { mental: -2 }, formDelta: -4, moraleDelta: -2 },
    ],
  },
  {
    id: 'documentary',
    text: '🎬 Une chaîne esport veut réaliser un mini-documentaire sur toi.',
    options: [
      { id: 'open', text: 'Tu ouvres grand les portes', statDeltas: {}, moneyDelta: 80, popularityDelta: 7, formDelta: -3, moraleDelta: 2 },
      { id: 'limited', text: 'Tu acceptes avec des limites', statDeltas: {}, moneyDelta: 40, popularityDelta: 3 },
      { id: 'refuse', text: 'Tu refuses, tu protèges ta vie privée', statDeltas: { mental: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'roster_shuffle',
    text: "🔄 Le coach envisage de changer la composition de l'équipe.",
    options: [
      { id: 'support', text: 'Tu soutiens la décision publiquement', statDeltas: { locker: 3, coach: 3 }, moraleDelta: 1 },
      { id: 'neutral', text: 'Tu restes neutre, tu attends de voir', statDeltas: {} },
      { id: 'oppose', text: 'Tu t’opposes ouvertement au changement', statDeltas: { locker: -4, coach: -4 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'burnout_signs',
    text: '😴 Tu sens les premiers signes de burnout après un enchaînement de scrims.',
    options: [
      { id: 'break', text: 'Tu demandes une vraie pause', statDeltas: { mental: 3 }, formDelta: 6, moraleDelta: 4 },
      { id: 'push', text: 'Tu serres les dents et continues', statDeltas: { mental: -3, serious: 1 }, formDelta: -8, moraleDelta: -5 },
      { id: 'talk', text: 'Tu en parles avec le staff', statDeltas: { mental: 1, coach: 2 }, formDelta: 1, moraleDelta: 2 },
    ],
  },
  {
    id: 'fan_mail',
    text: '💌 Tu reçois une pile de lettres de supporters.',
    options: [
      { id: 'reply_all', text: 'Tu réponds à un maximum de lettres', statDeltas: {}, popularityDelta: 4, formDelta: -2, moraleDelta: 3 },
      { id: 'reply_some', text: "Tu en lis quelques-unes tranquillement", statDeltas: {}, popularityDelta: 1, moraleDelta: 2 },
      { id: 'skip', text: "Tu n'as pas le temps de les lire", statDeltas: {}, popularityDelta: -1 },
    ],
  },
  {
    id: 'mental_coach',
    text: '🧠 Le club propose des séances avec un·e préparateur·rice mental·e.',
    options: [
      { id: 'commit', text: "Tu t'engages sur plusieurs séances", statDeltas: { mental: 4, coach: 2 }, moneyDelta: -40, moraleDelta: 2 },
      { id: 'try', text: "Tu essaies une seule séance", statDeltas: { mental: 1 } },
      { id: 'skip', text: 'Tu passes ton tour, pas convaincu·e', statDeltas: {}, moraleDelta: -1 },
    ],
  },
  {
    id: 'visa_delay',
    text: "🛂 Des soucis de visa retardent ton arrivée au camp d'entraînement à l'étranger.",
    options: [
      { id: 'stay_calm', text: 'Tu gères la situation calmement', statDeltas: { mental: 2, serious: 1 }, formDelta: -2 },
      { id: 'stress', text: 'Le stress te ronge en attendant', statDeltas: { mental: -3 }, formDelta: -5, moraleDelta: -3 },
      { id: 'remote_prep', text: 'Tu t’entraînes à distance en attendant', statDeltas: { micro: 2 }, formDelta: -1 },
    ],
  },
];

export default questions;
