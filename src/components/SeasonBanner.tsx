import type { SeasonResult } from '../game/types';

const PLACEMENT_LABEL: Record<SeasonResult['placement'], string> = {
  CHAMPION: 'Champion de la saison',
  PLAYOFFS: 'Qualifié en Playoffs',
  MID_TABLE: 'Milieu de tableau',
  RELEGATED: 'Relégué',
};

const PLACEMENT_COLOR: Record<SeasonResult['placement'], string> = {
  CHAMPION: 'text-rift-gold-bright',
  PLAYOFFS: 'text-rift-green',
  MID_TABLE: 'text-rift-text-bright',
  RELEGATED: 'text-rift-red',
};

export function SeasonBanner({ result, onClose }: { result: SeasonResult; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-rift-gold/50 bg-rift-panel p-8 shadow-2xl text-center">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-2">Fin de saison</p>
        <h2 className={`text-2xl font-semibold mb-4 ${PLACEMENT_COLOR[result.placement]}`}>
          {PLACEMENT_LABEL[result.placement]}
        </h2>
        <p className="text-rift-text-bright font-medium mb-1">{result.teamName}</p>
        <p className="text-rift-text text-sm mb-4">{result.record}</p>
        <p className="text-sm text-rift-text mb-6">{result.outcomeText}</p>
        <button
          onClick={onClose}
          className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold px-6 py-2 transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
