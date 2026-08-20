export function isAbroad(homeRegion: string, clubRegion: string): boolean {
  return homeRegion !== clubRegion;
}

// Called once whenever the player signs with a club in a different region than home —
// moving country resets/spikes it, moving back home doesn't.
export function relocate(current: number, abroad: boolean): number {
  return abroad ? Math.min(100, current + 45) : current;
}

// Called every month: slow decay while abroad (adapting), fast decay back home.
export function monthlyDecay(current: number, abroad: boolean): number {
  return Math.max(0, current - (abroad ? 6 : 20));
}

export function moraleDrain(homesickness: number): number {
  return Math.round(homesickness / 15);
}
