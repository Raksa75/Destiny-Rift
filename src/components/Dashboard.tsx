import { rankLabel } from '../game/data';
import { ROLES, STAGE_LABELS, STAT_LABELS } from '../game/types';
import type { ActionId, GameState, StatKey } from '../game/types';
import { StatBar } from './StatBar';
import { ActionGrid } from './ActionGrid';
import { LogPanel } from './LogPanel';

interface Props {
  state: GameState;
  onAct: (action: ActionId) => void;
}

const STAT_KEYS: StatKey[] = ['mechanics', 'gameSense', 'teamwork', 'mental', 'communication'];

export function Dashboard({ state, onAct }: Props) {
  const roleLabel = ROLES.find((r) => r.id === state.role)?.label ?? state.role;

  return (
    <div className="min-h-svh px-4 py-6 max-w-5xl mx-auto flex flex-col gap-6">
      <header className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-1">
            {STAGE_LABELS[state.stage]}
          </p>
          <h1 className="text-xl font-semibold text-rift-gold-bright">
            {state.name} <span className="text-rift-text font-normal">· {roleLabel}</span>
          </h1>
          <p className="text-sm text-rift-text mt-1">
            {state.age} ans · Mois {state.month}
            {state.team ? ` · ${state.team.name} (saison ${state.monthsInSeason}/12)` : ''}
          </p>
        </div>
        <div className="flex gap-6 text-center">
          <MiniStat label="Rang" value={rankLabel(state.rank.tierIndex, state.rank.lp)} />
          <MiniStat label="Notoriété" value={`${state.fame}/100`} />
          <MiniStat label="Gains" value={`${state.money}€`} />
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
          <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">Ressources</h2>
          <div className="flex flex-col gap-3">
            <StatBar label="Énergie" value={state.energy} color="bg-rift-blue" />
            <StatBar label="Moral" value={state.morale} color="bg-rift-green" />
            <StatBar label="Santé" value={state.health} color="bg-rift-red" />
          </div>
        </section>
        <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
          <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">Compétences</h2>
          <div className="flex flex-col gap-3">
            {STAT_KEYS.map((key) => (
              <StatBar key={key} label={STAT_LABELS[key]} value={state.stats[key]} color="bg-rift-gold" />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">Actions du mois</h2>
        <ActionGrid state={state} onAct={onAct} />
      </section>

      <section className="rounded-2xl border border-rift-border bg-rift-panel/80 p-5">
        <h2 className="text-sm uppercase tracking-wide text-rift-text mb-3">Journal de carrière</h2>
        <LogPanel log={state.log} />
      </section>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-rift-text uppercase tracking-wide">{label}</p>
      <p className="text-rift-text-bright font-medium">{value}</p>
    </div>
  );
}
