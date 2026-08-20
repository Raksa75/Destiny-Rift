import { useMemo, useState } from 'react';
import { regionForCountry } from '../../data/regions';
import { generateLongevity, generatePopularity, generatePotential, generateStats, overallRating } from '../../data/creation';
import { generateClubOffers } from '../../data/clubs';
import { generateRandomName } from '../../data/nameGenerator';
import { contractLengthYears } from '../../data/salary';
import { START_AGE } from '../../types';
import type { CareerRecord, ClubOffer, DietId, PlayerStats, Role, TalentId } from '../../types';
import { CountryStep } from './CountryStep';
import { RoleStep } from './RoleStep';
import { DietStep } from './DietStep';
import { TalentStep } from './TalentStep';
import { ClubStep } from './ClubStep';
import { DoneStep } from './DoneStep';

type Step = 'country' | 'role' | 'diet' | 'talent' | 'club' | 'done';
const STEP_ORDER: Step[] = ['country', 'role', 'diet', 'talent', 'club'];

interface WizardData {
  name: string;
  country: string | null;
  role: Role | null;
  diet: DietId | null;
  talent: TalentId | null;
}

interface ClubStageData {
  stats: PlayerStats;
  potential: number;
  popularity: number;
  offers: ClubOffer[];
}

interface Props {
  onCancel: () => void;
  onComplete: (record: CareerRecord) => void;
  onDone: (target: 'players' | 'menu' | 'play') => void;
}

export function CreationWizard({ onCancel, onComplete, onDone }: Props) {
  const [step, setStep] = useState<Step>('country');
  const [data, setData] = useState<WizardData>({
    name: generateRandomName(),
    country: null,
    role: null,
    diet: null,
    talent: null,
  });
  const [clubStage, setClubStage] = useState<ClubStageData | null>(null);
  const [record, setRecord] = useState<CareerRecord | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= 0) {
      onCancel();
      return;
    }
    setStep(STEP_ORDER[idx - 1]);
  };

  const region = useMemo(() => (data.country ? regionForCountry(data.country) : null), [data.country]);

  if (step === 'country') {
    return (
      <CountryStep
        onNext={(country) => {
          setData((d) => ({ ...d, country }));
          setStep('role');
        }}
        onBack={goBack}
        step={stepIndex}
        totalSteps={STEP_ORDER.length}
      />
    );
  }

  if (step === 'role') {
    return (
      <RoleStep
        onNext={(role) => {
          setData((d) => ({ ...d, role }));
          setStep('diet');
        }}
        onBack={goBack}
        step={stepIndex}
        totalSteps={STEP_ORDER.length}
      />
    );
  }

  if (step === 'diet') {
    return (
      <DietStep
        onNext={(diet) => {
          setData((d) => ({ ...d, diet }));
          setStep('talent');
        }}
        onBack={goBack}
        step={stepIndex}
        totalSteps={STEP_ORDER.length}
      />
    );
  }

  if (step === 'talent') {
    return (
      <TalentStep
        onNext={(talent) => {
          setData((d) => ({ ...d, talent }));
          if (region) {
            const stats = generateStats(data.diet!, talent);
            const potential = generatePotential(talent);
            const popularity = generatePopularity(talent);
            const offers = generateClubOffers(region.id, overallRating(stats));
            setClubStage({ stats, potential, popularity, offers });
          }
          setStep('club');
        }}
        onBack={goBack}
        step={stepIndex}
        totalSteps={STEP_ORDER.length}
      />
    );
  }

  if (step === 'club' && clubStage && region && data.role && data.diet && data.talent && data.country) {
    return (
      <ClubStep
        stats={clubStage.stats}
        potential={clubStage.potential}
        popularity={clubStage.popularity}
        offers={clubStage.offers}
        region={region.id}
        onNext={(club) => {
          const year = new Date().getFullYear();
          const newRecord: CareerRecord = {
            id: crypto.randomUUID(),
            name: data.name,
            country: data.country!,
            region: region.id,
            role: data.role!,
            diet: data.diet!,
            talent: data.talent!,
            stats: clubStage.stats,
            potential: clubStage.potential,
            popularity: clubStage.popularity,
            form: 70,
            morale: 70,
            money: 0,
            careerEarnings: 0,
            peakOverall: Math.round(overallRating(clubStage.stats)),
            age: START_AGE,
            month: 1,
            year,
            club,
            firstClub: club,
            clubHistory: [{ name: club.name, tier: club.tier, region: club.region, fromYear: year, toYear: null }],
            contractUntilYear: year + contractLengthYears(club.tier),
            matchesPlayed: 0,
            wins: 0,
            losses: 0,
            mvpCount: 0,
            careerKills: 0,
            careerAssists: 0,
            careerCS: 0,
            seasonKills: 0,
            seasonAssists: 0,
            longevity: generateLongevity(data.diet!, data.talent!),
            homesickness: 0,
            hasPlayedMajorSeason: club.tier === 'MAJOR',
            retired: false,
            retirementReason: null,
            titles: [],
            awards: [],
            traits: [],
            ratingHistory: [],
            turnCount: 0,
            seasonsPlayed: 0,
            seasonWins: 0,
            seasonLosses: 0,
            log: [],
            createdAt: new Date().toISOString(),
          };
          setRecord(newRecord);
          onComplete(newRecord);
          setStep('done');
        }}
        onBack={goBack}
        step={stepIndex}
        totalSteps={STEP_ORDER.length}
      />
    );
  }

  if (step === 'done' && record) {
    return (
      <DoneStep
        record={record}
        onPlay={() => onDone('play')}
        onViewPlayers={() => onDone('players')}
        onMenu={() => onDone('menu')}
      />
    );
  }

  return null;
}
