import type { Question } from './questionTypes';

const questions: Question[] = [
  {
    id: 'extra_practice',
    text: 'Your coach offers an extra practice tool session on a weeknight.',
    options: [
      { id: 'full', text: 'You go all in', statDeltas: { micro: 4, mental: -2, coach: 3 }, formDelta: -8, moraleDelta: -2 },
      { id: 'light', text: "You do a bit, without pushing too hard", statDeltas: { micro: 1 }, formDelta: -2 },
      { id: 'refuse', text: 'You refuse to rest instead', statDeltas: { mental: 2, serious: -2, coach: -2 }, formDelta: 5, moraleDelta: 2 },
    ],
  },
  {
    id: 'amateur_tournament',
    text: 'An amateur tournament is held near you.',
    maxAge: 19,
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
      { id: 'motivate', text: 'You rally the group', alias: 'leader', risk: 'medium', relevantStat: 'locker', statDeltas: { mental: 3, teamfight: 2, locker: 4 }, formDelta: -1, moraleDelta: 4 },
      { id: 'silent', text: 'You stay quiet, focused on yourself', statDeltas: { micro: 1 } },
      { id: 'blame', text: 'You blame a teammate', statDeltas: { mental: -3, locker: -6 }, popularityDelta: -2, moraleDelta: -5 },
    ],
  },
  {
    id: 'parents_worried',
    text: 'Your parents are worried about how much time you spend on screens.',
    maxAge: 19,
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
      { id: 'accept', text: 'You accept, it could help your career', alias: 'showman', risk: 'medium', relevantStat: 'locker', statDeltas: {}, moneyDelta: 50, popularityDelta: 5, formDelta: -2, moraleDelta: 3 },
      { id: 'focus', text: 'You stay focused on training', statDeltas: { micro: 2 }, formDelta: -3 },
      { id: 'refuse', text: "You refuse, you don't like the exposure", statDeltas: { mental: 1 }, popularityDelta: -1, moraleDelta: -1 },
    ],
  },
  {
    id: 'school_or_esport',
    text: 'You need to decide between school and esports for this year.',
    maxAge: 18,
    options: [
      { id: 'allin', text: 'You go all in on esports', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { teamfight: 3, serious: -2 }, formDelta: -6, moraleDelta: -2 },
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
      { id: 'calm', text: 'You reply calmly in private', alias: 'sangfroid', risk: 'safe', relevantStat: 'mental', statDeltas: { mental: 2, serious: 2, locker: 3 }, moraleDelta: 2 },
      { id: 'ignore', text: 'You ignore it completely', statDeltas: {}, moraleDelta: -1 },
      { id: 'clash', text: 'You clash back publicly', statDeltas: { mental: -2, locker: -5 }, popularityDelta: -4, formDelta: -1, moraleDelta: -5 },
    ],
  },
  {
    id: 'macro_bootcamp',
    text: 'Your club offers a macro bootcamp with a former pro.',
    options: [
      { id: 'full', text: 'You go all in', statDeltas: { macro: 4, coach: 4 }, moneyDelta: -50, formDelta: -4, moraleDelta: 1 },
      { id: 'light', text: 'You go without investing too much', statDeltas: { macro: 1 }, formDelta: -1 },
      { id: 'solo', text: 'You’d rather practice solo', statDeltas: { micro: 2, coach: -3 }, formDelta: -2 },
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
      { id: 'adapt', text: 'You adapt gradually', statDeltas: { lane: 2, coach: 3 }, formDelta: -1, moraleDelta: 1 },
      { id: 'refuse', text: 'You rage and refuse to change your habits', statDeltas: { mental: -3, lane: -2, coach: -4 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'series_loss',
    text: 'Your team loses an important series, the mood is tense.',
    options: [
      { id: 'debrief', text: 'You suggest a calm debrief with the group', statDeltas: { teamfight: 3, mental: 1, locker: 3 }, formDelta: -1, moraleDelta: 3 },
      { id: 'coach', text: 'You let the coach handle it', statDeltas: { coach: 4 } },
      { id: 'isolate', text: 'You isolate yourself and cut communication', statDeltas: { teamfight: -3, mental: -1, locker: -4 }, formDelta: -1, moraleDelta: -4 },
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
  {
    id: 'streaming_offer',
    text: '🎥 A platform offers you a deal to stream your solo queue sessions.',
    options: [
      { id: 'stream_a_lot', text: 'You stream every night', statDeltas: { serious: -2 }, moneyDelta: 120, popularityDelta: 6, formDelta: -4, moraleDelta: 2 },
      { id: 'stream_light', text: 'You stream once a week', statDeltas: {}, moneyDelta: 40, popularityDelta: 2 },
      { id: 'refuse', text: 'You refuse, staying focused', statDeltas: { serious: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'language_class',
    text: '🗣️ Your club offers language classes to help you fit into the locker room.',
    options: [
      { id: 'full', text: 'You commit fully', statDeltas: { locker: 5, mental: 1 }, moneyDelta: -30, formDelta: -1, moraleDelta: 2 },
      { id: 'light', text: 'You attend without going further', statDeltas: { locker: 2 } },
      { id: 'refuse', text: 'You refuse, relying on gestures', statDeltas: { locker: -2 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'agent_contact',
    text: '📞 An agent reaches out to represent you in future negotiations.',
    options: [
      { id: 'sign', text: 'You sign with them', statDeltas: { serious: 1 }, moneyDelta: -20, popularityDelta: 2, moraleDelta: 1 },
      { id: 'think', text: 'You take time to think it over', statDeltas: {} },
      { id: 'refuse', text: "You refuse, preferring to handle it yourself", statDeltas: { mental: 1, serious: -1 } },
    ],
  },
  {
    id: 'family_visit',
    text: '✈️ Your family offers to visit you for the holidays.',
    options: [
      { id: 'invite', text: 'You invite them happily', statDeltas: { mental: 2 }, moneyDelta: -100, moraleDelta: 6 },
      { id: 'call', text: 'You’d rather just have a video call', statDeltas: {}, moraleDelta: 2 },
      { id: 'decline', text: 'You decline, too busy with the season', statDeltas: { serious: 1 }, formDelta: 2, moraleDelta: -4 },
    ],
  },
  {
    id: 'nutritionist',
    text: '🥗 The club hires a nutritionist for the whole team.',
    options: [
      { id: 'follow', text: 'You follow the program to the letter', statDeltas: { serious: 3, mental: 1 }, formDelta: 5, moraleDelta: 1 },
      { id: 'partial', text: 'You apply some of the advice', statDeltas: { serious: 1 }, formDelta: 2 },
      { id: 'ignore', text: 'You ignore the program entirely', statDeltas: { serious: -2 }, formDelta: -3 },
    ],
  },
  {
    id: 'rival_trashtalk',
    text: '🎤 A rival player trash-talks you in an interview before your match.',
    options: [
      { id: 'clapback', text: 'You fire back with a sharp reply', statDeltas: { mental: 1 }, popularityDelta: 4, formDelta: 3, moraleDelta: 2 },
      { id: 'ignore', text: 'You stay professional and ignore it', statDeltas: { mental: 2, serious: 1 }, moraleDelta: 1 },
      { id: 'affected', text: 'It rattles you more than expected', statDeltas: { mental: -2 }, formDelta: -4, moraleDelta: -2 },
    ],
  },
  {
    id: 'documentary',
    text: '🎬 An esports channel wants to make a mini-documentary about you.',
    options: [
      { id: 'open', text: 'You open the doors wide', statDeltas: {}, moneyDelta: 80, popularityDelta: 7, formDelta: -3, moraleDelta: 2 },
      { id: 'limited', text: 'You accept with some limits', statDeltas: {}, moneyDelta: 40, popularityDelta: 3 },
      { id: 'refuse', text: 'You refuse, protecting your privacy', statDeltas: { mental: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'roster_shuffle',
    text: '🔄 The coach is considering a roster shuffle.',
    options: [
      { id: 'support', text: 'You publicly support the decision', statDeltas: { locker: 3, coach: 3 }, moraleDelta: 1 },
      { id: 'neutral', text: 'You stay neutral and wait to see', statDeltas: {} },
      { id: 'oppose', text: 'You openly oppose the change', statDeltas: { locker: -4, coach: -4 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'burnout_signs',
    text: '😴 You notice the first signs of burnout after a heavy stretch of scrims.',
    options: [
      { id: 'break', text: 'You ask for a real break', statDeltas: { mental: 3 }, formDelta: 6, moraleDelta: 4 },
      { id: 'push', text: 'You grit your teeth and push through', statDeltas: { mental: -3, serious: 1 }, formDelta: -8, moraleDelta: -5 },
      { id: 'talk', text: 'You talk to the staff about it', statDeltas: { mental: 1, coach: 2 }, formDelta: 1, moraleDelta: 2 },
    ],
  },
  {
    id: 'fan_mail',
    text: '💌 You receive a stack of letters from fans.',
    options: [
      { id: 'reply_all', text: 'You reply to as many as you can', statDeltas: {}, popularityDelta: 4, formDelta: -2, moraleDelta: 3 },
      { id: 'reply_some', text: 'You read a few of them calmly', statDeltas: {}, popularityDelta: 1, moraleDelta: 2 },
      { id: 'skip', text: "You don't have time to read them", statDeltas: {}, popularityDelta: -1 },
    ],
  },
  {
    id: 'mental_coach',
    text: '🧠 The club offers sessions with a mental performance coach.',
    options: [
      { id: 'commit', text: 'You commit to several sessions', statDeltas: { mental: 4, coach: 2 }, moneyDelta: -40, moraleDelta: 2 },
      { id: 'try', text: 'You try a single session', statDeltas: { mental: 1 } },
      { id: 'skip', text: "You pass, not convinced", statDeltas: {}, moraleDelta: -1 },
    ],
  },
  {
    id: 'visa_delay',
    text: '🛂 Visa issues delay your arrival at the overseas training camp.',
    options: [
      { id: 'stay_calm', text: 'You handle the situation calmly', statDeltas: { mental: 2, serious: 1 }, formDelta: -2 },
      { id: 'stress', text: 'The stress eats at you while you wait', statDeltas: { mental: -3 }, formDelta: -5, moraleDelta: -3 },
      { id: 'remote_prep', text: 'You train remotely in the meantime', statDeltas: { micro: 2 }, formDelta: -1 },
    ],
  },
  {
    id: 'draft_leak',
    text: '🔓 Your secret draft plan for the next match leaked online.',
    options: [
      { id: 'change_plan', text: 'You change the plan at the last minute', alias: 'risque', risk: 'risky', relevantStat: 'macro', statDeltas: { macro: 3, mental: -1 }, formDelta: -3 },
      { id: 'ignore_leak', text: 'You ignore the leak and keep the plan', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 1 } },
      { id: 'blame_hunt', text: 'You go looking for who leaked it', statDeltas: { locker: -3, mental: -2 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'new_teammate',
    text: '🤝 A new teammate joins the roster mid-season.',
    options: [
      { id: 'welcome', text: 'You welcome them and help them settle in', alias: 'leader', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 4, mental: 1 }, moraleDelta: 2 },
      { id: 'neutral_new', text: 'You stay professional, nothing more', statDeltas: {} },
      { id: 'cold', text: 'You keep your distance, wary', statDeltas: { locker: -3 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'sponsor_event',
    text: '🎪 A sponsor organizes a public event with the team.',
    options: [
      { id: 'shine', text: 'You go all out in front of the cameras', alias: 'showman', risk: 'medium', relevantStat: 'locker', statDeltas: {}, moneyDelta: 60, popularityDelta: 5, formDelta: -3 },
      { id: 'professional', text: 'You stay low-key but professional', statDeltas: {}, moneyDelta: 30, popularityDelta: 1 },
      { id: 'skip_event', text: 'You cut it short to go train', statDeltas: { micro: 1 }, popularityDelta: -2 },
    ],
  },
  {
    id: 'salary_dispute',
    text: '💸 You think you’re underpaid compared to your teammates.',
    options: [
      { id: 'negotiate_now', text: 'You ask for a meeting to renegotiate', alias: 'risque', risk: 'risky', relevantStat: 'serious', statDeltas: { serious: 2 }, moneyDelta: 100 },
      { id: 'wait_season', text: 'You wait until the end of the season', statDeltas: { serious: 1 } },
      { id: 'say_nothing', text: 'You say nothing, swallowing the frustration', statDeltas: { mental: -2 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'superstition',
    text: '🍀 After a winning streak, you discover a lucky ritual.',
    options: [
      { id: 'commit_ritual', text: 'You stick to it religiously', statDeltas: { mental: 2 }, formDelta: 3 },
      { id: 'laugh_it_off', text: 'You laugh it off and move on', statDeltas: {} },
      { id: 'obsess', text: 'It becomes almost an obsession', statDeltas: { mental: -2, serious: -1 }, formDelta: 2, moraleDelta: -1 },
    ],
  },
  {
    id: 'old_rival_reunion',
    text: '⚔️ You run into an old rival from your early days, now on an opposing pro team.',
    options: [
      { id: 'friendly', text: 'You chat with them warmly', statDeltas: { mental: 1 }, popularityDelta: 2, moraleDelta: 2 },
      { id: 'competitive', text: 'You stay distant, in competition mode', alias: 'sangfroid', risk: 'safe', relevantStat: 'mental', statDeltas: { mental: 2 } },
      { id: 'petty', text: 'You throw a jab to rattle them', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'equipment_upgrade',
    text: '🖱️ Your gear is starting to show its age.',
    options: [
      { id: 'buy_top', text: 'You invest in top-of-the-line gear', statDeltas: { micro: 3 }, moneyDelta: -300 },
      { id: 'buy_basic', text: 'You just replace the essentials', statDeltas: { micro: 1 }, moneyDelta: -80 },
      { id: 'keep_old', text: 'You stick with your current gear', statDeltas: { micro: -2 }, formDelta: -2 },
    ],
  },
  {
    id: 'community_drama',
    text: '💥 A controversy explodes in the community around one of your clips.',
    options: [
      { id: 'address_it', text: 'You speak up to explain yourself', alias: 'sangfroid', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 1 }, popularityDelta: 3 },
      { id: 'ignore_drama', text: 'You let it pass without reacting', statDeltas: {}, popularityDelta: -1 },
      { id: 'fuel_drama', text: 'You respond in the heat of the moment', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -2 }, popularityDelta: 2, moraleDelta: -3 },
    ],
  },
  {
    id: 'analyst_review',
    text: '📊 An analyst publicly breaks down your mistakes from the week.',
    options: [
      { id: 'study_it', text: 'You study the analysis closely to improve', statDeltas: { macro: 3, mental: 1 }, formDelta: -1 },
      { id: 'shrug_analyst', text: 'You shrug, you already knew', statDeltas: {} },
      { id: 'defensive', text: 'You get defensive and reject the criticism', statDeltas: { mental: -2, macro: -1 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'roommate_conflict',
    text: '🏠 Tension builds with a teammate you share housing with.',
    options: [
      { id: 'talk_it_out', text: 'You suggest talking it out calmly', alias: 'sangfroid', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 3, mental: 1 } },
      { id: 'avoid', text: 'You avoid the topic, it’ll settle', statDeltas: { locker: -1 } },
      { id: 'confront', text: 'You lay it out plainly, no detour', alias: 'leader', risk: 'medium', relevantStat: 'locker', statDeltas: { locker: 2, mental: -1 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'charity_stream',
    text: '❤️ A charity asks you to join a fundraising stream.',
    options: [
      { id: 'full_charity', text: 'You fully commit to organizing it', alias: 'showman', risk: 'safe', relevantStat: 'locker', statDeltas: {}, popularityDelta: 6, formDelta: -2 },
      { id: 'appear_briefly', text: 'You drop by briefly to show support', statDeltas: {}, popularityDelta: 2 },
      { id: 'decline_charity', text: 'You decline, too busy training', statDeltas: { micro: 1 }, popularityDelta: -2 },
    ],
  },
  {
    id: 'losing_streak',
    text: '📉 A losing streak is crushing the whole team’s morale.',
    options: [
      { id: 'rally_team', text: 'You step up to rally the group', alias: 'leader', risk: 'medium', relevantStat: 'locker', statDeltas: { locker: 4, teamfight: 2 }, moraleDelta: 3 },
      { id: 'trust_process', text: 'You trust the process, without forcing it', statDeltas: { mental: 1 } },
      { id: 'panic', text: 'You panic and overhaul everything in a rush', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -2, macro: 1 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'scouting_report',
    text: '🔍 A scouting report circulates, comparing your level to other players in your role.',
    options: [
      { id: 'motivated_report', text: 'It motivates you to push even harder', statDeltas: { serious: 2 }, formDelta: 3 },
      { id: 'indifferent_report', text: 'You don’t give it much weight', statDeltas: {} },
      { id: 'demoralized_report', text: 'The comparison gets to you a bit', statDeltas: { mental: -2 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'weekend_offer',
    text: '🎉 Friends invite you out for the weekend right in the middle of match prep.',
    options: [
      { id: 'go_out', text: 'You go out, you need to blow off steam', alias: 'risque', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 2 }, formDelta: -4, moraleDelta: 4 },
      { id: 'short_visit', text: 'You drop by briefly then head home early', statDeltas: {}, moraleDelta: 2, formDelta: -1 },
      { id: 'stay_in', text: 'You stay focused on prep', statDeltas: { serious: 1 }, formDelta: 2, moraleDelta: -1 },
    ],
  },
  {
    id: 'coach_change',
    text: '🔁 The club announces a head coach change mid-season.',
    options: [
      { id: 'adapt_new_coach', text: 'You adapt quickly to the new system', statDeltas: { coach: 4, macro: 1 }, formDelta: -2 },
      { id: 'wait_and_see', text: 'You wait and see before committing', statDeltas: { coach: 1 } },
      { id: 'resist_change', text: 'You resist, you preferred the old coach', statDeltas: { coach: -4, mental: -1 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'podcast_invite',
    text: '🎙️ You’re invited onto a widely-followed esports podcast.',
    options: [
      { id: 'open_up', text: 'You open up honestly about your journey', alias: 'showman', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 1 }, popularityDelta: 6 },
      { id: 'stay_guarded', text: 'You stay guarded in your answers', statDeltas: {}, popularityDelta: 2 },
      { id: 'decline_podcast', text: 'You decline, not really your thing', statDeltas: {}, popularityDelta: -1 },
    ],
  },
  {
    id: 'injury_scare',
    text: '⚠️ An unusual pain worries you before an important match.',
    options: [
      { id: 'get_checked', text: 'You get checked out as a precaution', statDeltas: { serious: 2 }, moneyDelta: -120, formDelta: 4 },
      { id: 'play_through', text: 'You play anyway, the pain is manageable', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -1 }, formDelta: -3 },
      { id: 'rest_injury', text: 'You ask for rest to be safe', statDeltas: { mental: 1 }, formDelta: 5, moraleDelta: -1 },
    ],
  },
  {
    id: 'fan_meetup',
    text: '🤗 The club organizes a fan meetup after a match.',
    options: [
      { id: 'stay_late', text: 'You stay late to talk to everyone', alias: 'showman', risk: 'safe', relevantStat: 'locker', statDeltas: {}, popularityDelta: 5, formDelta: -1 },
      { id: 'quick_meetup', text: 'You do a quick, polite round', statDeltas: {}, popularityDelta: 2 },
      { id: 'skip_meetup', text: 'You leave quickly, tired after the match', statDeltas: {}, popularityDelta: -2, moraleDelta: 1 },
    ],
  },
  {
    id: 'academy_call',
    text: '🎓 The club asks you to mentor a young player from the academy team.',
    minAge: 23,
    options: [
      { id: 'mentor', text: 'You take the time to train them properly', alias: 'leader', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 4, coach: 2 }, formDelta: -1 },
      { id: 'light_mentor', text: 'You give some quick pointers', statDeltas: { locker: 1 } },
      { id: 'refuse_mentor', text: 'You refuse, no time for that', statDeltas: { locker: -2 } },
    ],
  },
  {
    id: 'anniversary',
    text: '🎂 It’s a loved one’s important birthday, right in the middle of match season.',
    options: [
      { id: 'go_home', text: 'You make the trip to be there', statDeltas: {}, moneyDelta: -60, moraleDelta: 5, formDelta: -3 },
      { id: 'call_home', text: 'You call for a long time that evening', statDeltas: {}, moraleDelta: 2 },
      { id: 'skip_home', text: 'You stay focused, you’ll make up for it later', statDeltas: { serious: 1 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'contract_leak',
    text: '📰 Details of your contract leak to the esports press.',
    options: [
      { id: 'clarify_press', text: 'You publish a calm clarification', alias: 'sangfroid', risk: 'safe', relevantStat: 'mental', statDeltas: { mental: 1 }, popularityDelta: 1 },
      { id: 'ignore_leak2', text: 'You ignore it and let people talk', statDeltas: {} },
      { id: 'angry_response', text: 'You react strongly in public', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -2 }, popularityDelta: -3, moraleDelta: -2 },
    ],
  },
  {
    id: 'off_season_camp',
    text: '🏕️ The off-season offers a choice: intensive bootcamp or real vacation.',
    options: [
      { id: 'bootcamp', text: 'You go straight into an intensive bootcamp', statDeltas: { micro: 3, macro: 2, mental: -2 }, formDelta: -4 },
      { id: 'balance_vacation', text: 'You take a few days then train', statDeltas: { mental: 1 }, formDelta: 2 },
      { id: 'full_vacation', text: 'You disconnect completely', statDeltas: { mental: 3, micro: -3 }, formDelta: 6, moraleDelta: 4 },
    ],
  },
  {
    id: 'rumor_transfer',
    text: '📱 A transfer rumor about you is circulating, with nothing official.',
    options: [
      { id: 'stay_focused_rumor', text: 'You stay focused, you’ll deal with the rest later', alias: 'sangfroid', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 2 } },
      { id: 'feed_rumor', text: 'You let the ambiguity linger a bit, it drives buzz', alias: 'showman', risk: 'risky', relevantStat: 'locker', statDeltas: {}, popularityDelta: 4, moraleDelta: -1 },
      { id: 'deny_rumor', text: 'You firmly deny the rumor', statDeltas: { serious: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'top_island',
    text: '🏝️ Isolated in top lane, you feel cut off from the rest of the map during teamfights.',
    roles: ['TOP'],
    options: [
      { id: 'embrace', text: 'You embrace the isolation and play for the split push', alias: 'risque', risk: 'risky', relevantStat: 'lane', statDeltas: { lane: 4, teamfight: -2 } },
      { id: 'ask_help', text: 'You ask your jungler to come by more often', statDeltas: { coach: 2, teamfight: 1 } },
      { id: 'roam_top', text: 'You force roams yourself to have an impact elsewhere', statDeltas: { macro: 2, lane: -2 }, formDelta: -2 },
    ],
  },
  {
    id: 'top_matchup',
    text: '🛡️ A very unfavorable top lane matchup awaits you in draft.',
    roles: ['TOP'],
    options: [
      { id: 'farm_safe', text: 'You play ultra safe and wait to scale', risk: 'safe', relevantStat: 'lane', statDeltas: { lane: 2, mental: 1 } },
      { id: 'trade_risky', text: 'You still look for risky trades', alias: 'risque', risk: 'risky', relevantStat: 'micro', statDeltas: { micro: 3 }, formDelta: -2 },
      { id: 'ask_swap', text: 'You ask the team for a lane swap', statDeltas: { locker: -1, teamfight: 1 } },
    ],
  },
  {
    id: 'jungle_pathing',
    text: '🌲 A teammate questions your jungle pathing choices.',
    roles: ['JUNGLE'],
    options: [
      { id: 'explain_path', text: 'You calmly explain your reasoning', alias: 'sangfroid', risk: 'safe', relevantStat: 'macro', statDeltas: { macro: 3, locker: 1 } },
      { id: 'adjust_path', text: 'You adjust your pathing to their expectations', statDeltas: { macro: 1, locker: 2 } },
      { id: 'ignore_crit', text: 'You ignore it and keep doing your thing', statDeltas: { macro: -1, locker: -2 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'jungle_camp_dispute',
    text: '⚔️ A rival jungler comes to clear your own camps in the early game.',
    roles: ['JUNGLE'],
    options: [
      { id: 'contest', text: 'You contest and engage in a risky duel', alias: 'risque', risk: 'risky', relevantStat: 'micro', statDeltas: { micro: 3, teamfight: 1 } },
      { id: 'reroute', text: 'You reroute without engaging', risk: 'safe', relevantStat: 'macro', statDeltas: { macro: 2 } },
      { id: 'call_gank', text: 'You call a gank to punish them elsewhere', statDeltas: { teamfight: 2, macro: 1 }, formDelta: -1 },
    ],
  },
  {
    id: 'mid_roam_pressure',
    text: '🎯 Your team expects you to constantly roam to help other lanes.',
    roles: ['MID'],
    options: [
      { id: 'roam_often', text: 'You roam at every opportunity', alias: 'risque', risk: 'risky', relevantStat: 'macro', statDeltas: { macro: 3, lane: -2 } },
      { id: 'balance_roam', text: 'You only roam on safe opportunities', risk: 'safe', relevantStat: 'macro', statDeltas: { macro: 2, lane: 1 } },
      { id: 'stay_lane', text: 'You stay focused on your lane', statDeltas: { lane: 3, macro: -1 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'mid_lane_bully',
    text: '😤 Your mid lane opponent bullies you hard starting at level 3.',
    roles: ['MID'],
    options: [
      { id: 'trade_back', text: 'You trade back every chance you get', alias: 'risque', risk: 'risky', relevantStat: 'micro', statDeltas: { micro: 3 }, formDelta: -2 },
      { id: 'freeze', text: 'You freeze the lane to limit the risk', risk: 'safe', relevantStat: 'lane', statDeltas: { lane: 3, mental: 1 } },
      { id: 'roam_away', text: 'You give up the lane and roam instead', statDeltas: { macro: 2, lane: -2 } },
    ],
  },
  {
    id: 'adc_positioning',
    text: '🏹 The coach criticizes your teamfight positioning this week.',
    roles: ['ADC'],
    options: [
      { id: 'study_positioning', text: 'You seriously rework your positioning', risk: 'safe', relevantStat: 'teamfight', statDeltas: { teamfight: 3, coach: 2 }, formDelta: -2 },
      { id: 'defend_style', text: 'You defend your playstyle', alias: 'sangfroid', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 1, coach: -2 } },
      { id: 'shrug_crit', text: 'You shrug it off, it’ll come with time', statDeltas: {}, moraleDelta: -1 },
    ],
  },
  {
    id: 'adc_peel',
    text: '🛡️ You feel your support isn’t peeling for you enough in teamfights.',
    roles: ['ADC'],
    options: [
      { id: 'talk_support', text: 'You talk it out calmly with your support', alias: 'leader', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 3, teamfight: 1 } },
      { id: 'adapt_position', text: 'You adapt your own positioning instead', statDeltas: { teamfight: 2, micro: 1 } },
      { id: 'blame_support', text: 'You openly blame your support', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -1, locker: -4 }, moraleDelta: -2 },
    ],
  },
  {
    id: 'support_vision',
    text: '👁️ Your vision score gets called out after the loss.',
    roles: ['SUPPORT'],
    options: [
      { id: 'buy_more_wards', text: 'You invest even more into wards', risk: 'safe', relevantStat: 'macro', statDeltas: { macro: 3 }, moneyDelta: -20 },
      { id: 'defend_vision', text: 'You explain that vision alone doesn’t win games', alias: 'sangfroid', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 1, macro: 1 } },
      { id: 'ignore_vision_crit', text: 'You ignore the criticism', statDeltas: {}, moraleDelta: -1 },
    ],
  },
  {
    id: 'support_engage',
    text: '💥 An engage you initiated went badly, the team blames you.',
    roles: ['SUPPORT'],
    options: [
      { id: 'own_mistake', text: 'You own the mistake in front of the group', alias: 'leader', risk: 'medium', relevantStat: 'locker', statDeltas: { locker: 3, mental: 1 }, moraleDelta: 1 },
      { id: 'explain_call', text: 'You explain your read of the moment', risk: 'safe', relevantStat: 'macro', statDeltas: { macro: 2 } },
      { id: 'deflect_blame', text: 'You deflect the blame onto others', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -1, locker: -4 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'veteran_advice',
    text: '👴 A young teammate asks you for career advice.',
    minAge: 26,
    options: [
      { id: 'mentor_generous', text: 'You take the time to really help them', alias: 'leader', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 4, coach: 2 } },
      { id: 'brief_tips', text: 'You give a few quick pointers', statDeltas: { locker: 1 } },
      { id: 'brush_off', text: 'You brush it off, no time for that', statDeltas: { locker: -2 } },
    ],
  },
  {
    id: 'retirement_thoughts',
    text: '🤔 The idea of life after the career starts crossing your mind.',
    minAge: 28,
    options: [
      { id: 'start_planning', text: 'You start seriously planning ahead', statDeltas: { serious: 3 } },
      { id: 'push_away', text: 'You push the thought away for now', statDeltas: { mental: -2 }, moraleDelta: -1 },
      { id: 'talk_to_club', text: 'You talk to the club about a future role', statDeltas: { coach: 3 }, moraleDelta: 1 },
    ],
  },
  {
    id: 'new_meta_shift',
    text: '🔄 A new patch completely upends the current meta.',
    options: [
      { id: 'theorycraft_meta', text: 'You spend hours theorycrafting', statDeltas: { macro: 3, mental: -1 }, formDelta: -3 },
      { id: 'adapt_gradually', text: 'You adapt gradually', statDeltas: { lane: 2, coach: 2 } },
      { id: 'comfort_picks', text: 'You cling to your comfort picks', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: 1, macro: -2 } },
    ],
  },
  {
    id: 'roster_captain',
    text: '🎖️ The coach offers you the team captain armband.',
    minAge: 22,
    options: [
      { id: 'accept_captain', text: 'You accept wholeheartedly', alias: 'leader', risk: 'medium', relevantStat: 'locker', statDeltas: { locker: 5, teamfight: 2 }, formDelta: -1 },
      { id: 'accept_reluctant', text: 'You accept, without much conviction', statDeltas: { locker: 2 } },
      { id: 'decline_captain', text: 'You decline, not ready for that responsibility', statDeltas: { mental: 1 }, moraleDelta: -1 },
    ],
  },
  {
    id: 'online_hate',
    text: '💢 A wave of hate messages floods your socials after a loss.',
    options: [
      { id: 'mute_disconnect', text: 'You mute your socials and disconnect', risk: 'safe', relevantStat: 'mental', statDeltas: { mental: 2 }, moraleDelta: 2 },
      { id: 'respond_calm', text: 'You respond with calm and perspective', alias: 'sangfroid', risk: 'medium', relevantStat: 'mental', statDeltas: { mental: 2 }, popularityDelta: 1 },
      { id: 'engage_trolls', text: 'You respond to the trolls one by one', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: -2 }, moraleDelta: -3 },
    ],
  },
  {
    id: 'training_facility',
    text: '🏋️ The club invests in a new physical training facility.',
    options: [
      { id: 'use_seriously', text: 'You use it seriously every week', statDeltas: { serious: 2 }, formDelta: 4 },
      { id: 'use_occasionally', text: 'You drop by from time to time', statDeltas: { serious: 1 }, formDelta: 1 },
      { id: 'ignore_facility', text: 'You ignore it entirely', statDeltas: {}, formDelta: -2 },
    ],
  },
  {
    id: 'scrim_partner_drama',
    text: '🥊 A scrim partner team is cheating during sessions (hidden picks, etc).',
    options: [
      { id: 'confront_cheat', text: 'You confront them directly', alias: 'risque', risk: 'risky', relevantStat: 'mental', statDeltas: { mental: 1 }, popularityDelta: 1 },
      { id: 'report_management', text: 'You report it to your management', risk: 'safe', relevantStat: 'serious', statDeltas: { serious: 2 } },
      { id: 'ignore_cheat', text: 'You let it go and move on', statDeltas: {}, moraleDelta: -1 },
    ],
  },
  {
    id: 'fan_art',
    text: '🎨 A fan sends you an incredible fan art of you.',
    options: [
      { id: 'share_fanart', text: 'You proudly share it on your socials', statDeltas: {}, popularityDelta: 4, moraleDelta: 2 },
      { id: 'thank_privately', text: 'You thank them quietly in a private message', statDeltas: {}, moraleDelta: 2 },
      { id: 'ignore_fanart', text: 'You don’t react, too busy', statDeltas: {}, popularityDelta: -1 },
    ],
  },
  {
    id: 'nutrition_slip',
    text: '🍕 After a good winning streak, you let your lifestyle slip a bit.',
    options: [
      { id: 'catch_yourself', text: 'You catch yourself quickly', statDeltas: { serious: 1 }, formDelta: 1 },
      { id: 'let_it_slide', text: 'You let it slide a bit, you’ve earned it', statDeltas: {}, moraleDelta: 2, formDelta: -2 },
      { id: 'full_binge', text: 'You fully binge for several days', alias: 'risque', risk: 'risky', relevantStat: 'serious', statDeltas: { serious: -2 }, formDelta: -3, moraleDelta: 3 },
    ],
  },
  {
    id: 'analyst_job_offer',
    text: '📈 An esports channel offers you a part-time analyst/consultant role.',
    minAge: 29,
    options: [
      { id: 'accept_analyst', text: 'You accept, it diversifies your income', statDeltas: { macro: 2 }, moneyDelta: 100, formDelta: -2 },
      { id: 'decline_analyst', text: 'You politely decline, staying focused on the game', statDeltas: { serious: 1 } },
      { id: 'negotiate_analyst', text: 'You negotiate for better terms', statDeltas: { serious: 1 }, moneyDelta: 50 },
    ],
  },
  {
    id: 'home_region_call',
    text: '🏠 Your home federation invites you to a local promotional event.',
    options: [
      { id: 'participate_proud', text: 'You proudly attend in person', statDeltas: {}, popularityDelta: 5, moneyDelta: -40, moraleDelta: 3 },
      { id: 'video_message', text: 'You send a short video message', statDeltas: {}, popularityDelta: 2 },
      { id: 'decline_home_call', text: 'You decline, too busy with the season', statDeltas: { serious: 1 }, popularityDelta: -1 },
    ],
  },
  {
    id: 'gaming_house_party',
    text: '🎉 The gaming house throws a game night among teammates.',
    options: [
      { id: 'join_party', text: 'You join in fully all night', statDeltas: { locker: 4 }, formDelta: -2, moraleDelta: 3 },
      { id: 'pop_by', text: 'You drop by briefly then head out', statDeltas: { locker: 1 }, moraleDelta: 1 },
      { id: 'skip_train', text: 'You skip it to train instead', statDeltas: { micro: 1, locker: -2 } },
    ],
  },
  {
    id: 'stat_padding_temptation',
    text: '📊 You could chase individual stats instead of playing for the team this match.',
    options: [
      { id: 'play_for_team', text: 'You play for the team, as always', risk: 'safe', relevantStat: 'locker', statDeltas: { locker: 3, teamfight: 1 } },
      { id: 'balance_stats', text: 'You strike a balance between both', statDeltas: { teamfight: 1 } },
      { id: 'chase_stats', text: 'You chase individual stats', alias: 'risque', risk: 'risky', relevantStat: 'micro', statDeltas: { micro: 3, teamfight: -3 }, popularityDelta: 2, moraleDelta: -2 },
    ],
  },
  {
    id: 'documentary_crew_follow',
    text: '🎥 A film crew follows you around for an entire week for a project.',
    options: [
      { id: 'open_up_crew', text: 'You open up completely to the camera', alias: 'showman', risk: 'medium', relevantStat: 'locker', statDeltas: {}, moneyDelta: 100, popularityDelta: 6, formDelta: -3 },
      { id: 'stay_guarded_crew', text: 'You stay guarded in front of the camera', statDeltas: {}, moneyDelta: 60, popularityDelta: 2 },
      { id: 'ask_leave_crew', text: 'You ask the crew to leave', statDeltas: { mental: 1 }, popularityDelta: -2 },
    ],
  },
];

export default questions;
