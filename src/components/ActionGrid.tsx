import type { ActionId, GameState } from '../game/types';
import { availableActions, canAfford } from '../game/engine';

interface Props {
  state: GameState;
  onAct: (action: ActionId) => void;
}

const ACTION_META: Record<ActionId, { label: string; desc: string; cost: number }> = {
  TRAIN_MECHANICS: { label: 'Entraînement mécanique', desc: 'Practice tool, combos, CS', cost: 20 },
  TRAIN_GAMESENSE: { label: 'Entraînement game sense', desc: 'Macro, vision, timings', cost: 18 },
  TRAIN_TEAMWORK: { label: 'Entraînement synergie', desc: 'Coordination et communication', cost: 18 },
  STUDY_VODS: { label: 'Étude de VODs', desc: 'Analyse de pros', cost: 10 },
  SOLOQ: { label: 'Grind SoloQ', desc: 'Monter en rang', cost: 15 },
  REST: { label: 'Repos', desc: 'Récupérer énergie et santé', cost: 0 },
  STREAM: { label: 'Stream Twitch', desc: 'Gagner argent et notoriété', cost: 15 },
  TEAM_PRACTICE: { label: 'Scrims d’équipe', desc: 'Renforcer la synergie collective', cost: 20 },
  TRYOUT: { label: 'Tentative de recrutement', desc: 'Postuler pour une équipe', cost: 10 },
  RETIRE: { label: 'Prendre sa retraite', desc: 'Mettre fin à la carrière', cost: 0 },
};

export function ActionGrid({ state, onAct }: Props) {
  const actions = availableActions(state);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {actions.map((id) => {
        const meta = ACTION_META[id];
        const affordable = canAfford(state, id) || id === 'REST' || id === 'RETIRE';
        const isRetire = id === 'RETIRE';
        return (
          <button
            key={id}
            disabled={!affordable}
            onClick={() => onAct(id)}
            className={`text-left rounded-lg border px-3 py-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              isRetire
                ? 'border-rift-red/50 bg-rift-red/10 hover:bg-rift-red/20'
                : 'border-rift-border bg-rift-panel-2 hover:border-rift-blue'
            }`}
          >
            <div className={`text-sm font-medium ${isRetire ? 'text-rift-red' : 'text-rift-text-bright'}`}>
              {meta.label}
            </div>
            <div className="text-xs text-rift-text mt-0.5">{meta.desc}</div>
            {meta.cost > 0 && (
              <div className="text-[11px] text-rift-blue mt-1">-{meta.cost} énergie</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
