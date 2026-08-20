import type { CareerRecord } from '../types';

const STORAGE_KEY = 'destiny-summoner:careers';

export function loadCareers(): CareerRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCareer(record: CareerRecord): CareerRecord[] {
  const careers = [record, ...loadCareers()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(careers));
  return careers;
}

export function updateCareer(record: CareerRecord): CareerRecord[] {
  const careers = loadCareers().map((c) => (c.id === record.id ? record : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(careers));
  return careers;
}

export function exportSaveJSON(): string {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), careers: loadCareers() }, null, 2);
}

// Merges imported careers into the existing save by id, so restoring a backup or bringing
// in a save from another device never wipes out careers already on this one.
export function importSaveJSON(json: string): CareerRecord[] {
  const parsed = JSON.parse(json);
  const incoming: unknown[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.careers)
      ? parsed.careers
      : [];
  const existing = loadCareers();
  const byId = new Map(existing.map((c) => [c.id, c]));
  for (const entry of incoming) {
    const c = entry as Partial<CareerRecord>;
    if (c && typeof c.id === 'string' && typeof c.name === 'string' && c.stats) {
      byId.set(c.id, c as CareerRecord);
    }
  }
  const merged = Array.from(byId.values());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}
