const PART_A = [
  'Kae',
  'Zeph',
  'Vex',
  'Nyx',
  'Dra',
  'Kir',
  'Sol',
  'Ash',
  'Vor',
  'Ryu',
  'Fen',
  'Lux',
  'Kry',
  'Sha',
  'Thal',
  'Ori',
  'Nova',
  'Zed',
  'Kav',
  'Vy',
  'Bry',
  'Wren',
  'Cas',
  'Ely',
];

const PART_B = [
  'thorn',
  'rix',
  'al',
  'yn',
  'ven',
  'ion',
  'ax',
  'ora',
  'eth',
  'iss',
  'oth',
  'ryn',
  'ux',
  'ael',
  'onis',
  'ide',
  'ara',
  'ok',
  'ez',
  'iel',
  'wick',
  'dane',
  'kai',
];

export function generateRandomName(): string {
  const a = PART_A[Math.floor(Math.random() * PART_A.length)];
  const b = PART_B[Math.floor(Math.random() * PART_B.length)];
  const base = a + b;
  if (Math.random() < 0.35) {
    return base + String(Math.floor(Math.random() * 89) + 10);
  }
  return base;
}
