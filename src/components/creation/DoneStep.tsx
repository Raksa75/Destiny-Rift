import { useI18n } from '../../i18n';
import type { CareerRecord } from '../../types';

interface Props {
  record: CareerRecord;
  onPlay: () => void;
  onViewPlayers: () => void;
  onMenu: () => void;
}

export function DoneStep({ record, onPlay, onViewPlayers, onMenu }: Props) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-rift-gold/50 bg-rift-panel/90 p-8 text-center shadow-2xl">
        <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-2">Destiny: Summoner</p>
        <h1 className="text-2xl font-semibold text-rift-gold-bright mb-4">{t('creation.done.title')}</h1>
        <p className="text-rift-text mb-8">
          {t('creation.done.text', {
            name: record.name,
            club: record.club.name,
            role: t(`role.${record.role}` as never),
          })}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onPlay}
            className="rounded-lg bg-rift-blue hover:bg-rift-blue-dark text-rift-bg font-semibold py-3 transition-colors"
          >
            {t('creation.done.play')}
          </button>
          <button
            onClick={onViewPlayers}
            className="rounded-lg border border-rift-border text-rift-text-bright hover:border-rift-text py-3 transition-colors"
          >
            {t('creation.done.viewPlayers')}
          </button>
          <button
            onClick={onMenu}
            className="text-sm text-rift-text hover:text-rift-text-bright transition-colors"
          >
            {t('creation.done.menu')}
          </button>
        </div>
      </div>
    </div>
  );
}
