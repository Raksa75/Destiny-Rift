import type { ClubTier, RegionId } from '../types';

const BASE_SALARY: Record<ClubTier, number> = {
  DIV4: 200,
  DIV3: 500,
  DIV2: 1200,
  MAJOR: 4000,
};

const REGION_MULTIPLIER: Record<RegionId, number> = {
  EUROPE: 1,
  KOREA: 1.1,
  CHINA: 1.3,
  NA: 1.2,
  LATAM: 0.5,
  AUSTRALIA: 0.5,
  ASIA: 0.6,
};

const CONTRACT_YEARS: Record<ClubTier, number> = {
  DIV4: 1,
  DIV3: 2,
  DIV2: 2,
  MAJOR: 3,
};

export function monthlySalary(tier: ClubTier, region: RegionId): number {
  return Math.round((BASE_SALARY[tier] * REGION_MULTIPLIER[region]) / 10) * 10;
}

export function annualSalary(tier: ClubTier, region: RegionId): number {
  return monthlySalary(tier, region) * 12;
}

export function contractLengthYears(tier: ClubTier): number {
  return CONTRACT_YEARS[tier];
}
