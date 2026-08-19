import { rankLabel } from '../game/data';
import { legacyTitle } from '../game/engine';
import type { GameState } from '../game/types';

export function CareerSummary({ state, onRestart }: { state: GameState; onRestart: () => void }) {
  return (
    <div className="min-h-svh flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-rift-border bg-rift-panel/90 p-8 shadow-2xl">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-2 text-center">
          Fin de carrière
        </p>
        <h1 className="text-2xl font-semibold text-rift-gold-bright text-center mb-1">
          {state.name}
        </h1>
        <p className="text-rift-text text-sm text-center mb-6">{state.retirementReason}</p>

        <div className="rounded-lg border border-rift-gold/40 bg-rift-gold/5 px-4 py-3 text-center mb-6">
          <p className="text-xs text-rift-text uppercase tracking-wide mb-1">Titre de légende</p>
          <p className="text-lg font-semibold text-rift-gold-bright">{legacyTitle(state)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <SummaryRow label="Âge à la retraite" value={`${state.age} ans`} />
          <SummaryRow label="Rôle" value={state.role} />
          <SummaryRow label="Meilleur rang" value={rankLabel(state.peakRankIndex, state.peakRankLp)} />
          <SummaryRow label="Notoriété" value={`${state.fame}/100`} />
          <SummaryRow label="Gains totaux" value={`${state.money}€`} />
          <SummaryRow label="Saisons jouées" value={`${state.seasonsPlayedInTeam}`} />
        </div>

        {state.titles.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-rift-text uppercase tracking-wide mb-2">Palmarès</p>
            <ul className="text-sm text-rift-text-bright list-disc list-inside space-y-1">
              {state.titles.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold py-3 transition-colors"
        >
          Commencer une nouvelle carrière
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-rift-panel-2 border border-rift-border px-3 py-2">
      <p className="text-[11px] text-rift-text uppercase tracking-wide">{label}</p>
      <p className="text-rift-text-bright font-medium">{value}</p>
    </div>
  );
}
