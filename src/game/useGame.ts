import { useCallback, useState } from 'react';
import { createInitialState } from './data';
import { applyTurn } from './engine';
import type { ActionId, GameState, Role } from './types';

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);

  const start = useCallback((name: string, role: Role) => {
    setState(createInitialState(name, role));
  }, []);

  const act = useCallback((action: ActionId) => {
    setState((prev) => (prev ? applyTurn(prev, action) : prev));
  }, []);

  const dismissBanner = useCallback(() => {
    setState((prev) => (prev ? { ...prev, seasonBanner: null } : prev));
  }, []);

  const restart = useCallback(() => {
    setState(null);
  }, []);

  return { state, start, act, dismissBanner, restart };
}
