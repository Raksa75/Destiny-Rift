import { useI18n } from '../i18n';

export function Shop({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh px-4 py-6 max-w-3xl mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between pt-12">
        <h1 className="text-xl font-semibold text-rift-gold-bright">🛒 {t('shop.title')}</h1>
        <button
          onClick={onBack}
          className="text-sm text-rift-onbg-muted hover:text-rift-onbg transition-colors"
        >
          {t('common.menu')}
        </button>
      </header>

      <div className="rounded-2xl border border-rift-border bg-rift-panel/80 p-10 text-center">
        <p className="text-rift-text-bright font-semibold mb-2">{t('shop.comingSoon')}</p>
        <p className="text-sm text-rift-text">{t('shop.comingSoon.desc')}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 opacity-40 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square rounded-xl border border-dashed border-rift-border" />
        ))}
      </div>
    </div>
  );
}
