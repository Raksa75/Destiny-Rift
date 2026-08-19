import { useState } from 'react';
import { ROLES } from '../game/types';
import type { Role } from '../game/types';

interface Props {
  onStart: (name: string, role: Role) => void;
}

export function CharacterCreation({ onStart }: Props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('MID');

  return (
    <div className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-rift-border bg-rift-panel/80 backdrop-blur p-8 shadow-2xl">
        <p className="text-rift-blue text-sm tracking-[0.3em] uppercase mb-2 text-center">
          Destiny: Summoner
        </p>
        <h1 className="text-2xl font-semibold text-rift-gold-bright text-center mb-8">
          Crée ta légende
        </h1>

        <label className="block text-sm text-rift-text mb-2">Pseudo d'invocateur</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: Faker2"
          maxLength={20}
          className="w-full mb-6 rounded-lg bg-rift-panel-2 border border-rift-border px-3 py-2 text-rift-text-bright outline-none focus:border-rift-blue transition-colors"
        />

        <label className="block text-sm text-rift-text mb-2">Rôle principal</label>
        <div className="grid grid-cols-5 gap-2 mb-8">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                role === r.id
                  ? 'border-rift-blue bg-rift-blue/20 text-rift-blue'
                  : 'border-rift-border bg-rift-panel-2 text-rift-text hover:border-rift-text'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <button
          disabled={name.trim().length === 0}
          onClick={() => onStart(name.trim(), role)}
          className="w-full rounded-lg bg-rift-blue hover:bg-rift-blue-dark disabled:opacity-40 disabled:cursor-not-allowed text-rift-bg font-semibold py-3 transition-colors"
        >
          Débuter la carrière
        </button>
        <p className="text-xs text-rift-text mt-4 text-center">
          16 ans, Fer 0 LP, un rêve : atteindre le sommet de la Faille.
        </p>
      </div>
    </div>
  );
}
