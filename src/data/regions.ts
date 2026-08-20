import type { Region } from '../types';

export const REGIONS: Region[] = [
  {
    id: 'EUROPE',
    league: 'LEC',
    countries: [
      'France',
      'Allemagne',
      'Espagne',
      'Italie',
      'Suède',
      'Norvège',
      'Danemark',
      'Pologne',
      'Royaume-Uni',
      'Finlande',
    ],
  },
  {
    id: 'KOREA',
    league: 'LCK',
    countries: ['Corée du Sud'],
  },
  {
    id: 'CHINA',
    league: 'LPL',
    countries: ['Chine'],
  },
  {
    id: 'NA',
    league: 'LCS',
    countries: ['États-Unis', 'Canada'],
  },
  {
    id: 'LATAM',
    league: 'CBLOL',
    countries: ['Brésil', 'Argentine', 'Mexique', 'Chili', 'Colombie', 'Pérou'],
  },
  {
    id: 'AUSTRALIA',
    league: 'LCO',
    countries: ['Australie'],
  },
  {
    id: 'ASIA',
    league: 'PCS',
    countries: ['Taïwan', 'Philippines', 'Vietnam', 'Thaïlande', 'Singapour', 'Indonésie', 'Hong Kong', 'Malaisie'],
  },
];

export function regionForCountry(country: string): Region {
  const region = REGIONS.find((r) => r.countries.includes(country));
  if (!region) throw new Error(`Unknown country: ${country}`);
  return region;
}
