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
