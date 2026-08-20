import { useI18n } from '../i18n';

interface Props {
  onNavigate: (screen: 'players' | 'shop' | 'create') => void;
}

export function MainMenu({ onNavigate }: Props) {
  const { t } = useI18n();

  return (
    <div className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-10">
        <div className="text-center">
          <p className="text-rift-blue text-xs tracking-[0.3em] uppercase mb-2">Destiny: Summoner</p>
          <h1 className="text-3xl font-semibold text-rift-gold-bright">{t('menu.tagline')}</h1>
        </div>

        <nav className="w-full flex flex-col gap-3">
          <MenuTile
            icon="🆕"
            title={t('menu.newCareer')}
            desc={t('menu.newCareer.desc')}
            onClick={() => onNavigate('create')}
            highlight
          />
          <MenuTile
            icon="🎮"
            title={t('menu.myPlayers')}
            desc={t('menu.myPlayers.desc')}
            onClick={() => onNavigate('players')}
          />
          <MenuTile
            icon="🛒"
            title={t('menu.shop')}
            desc={t('menu.shop.desc')}
            onClick={() => onNavigate('shop')}
          />
        </nav>
      </div>
    </div>
  );
}

function MenuTile({
  icon,
  title,
  desc,
  onClick,
  highlight,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-colors shadow-sm ${
        highlight
          ? 'border-rift-blue bg-rift-panel hover:bg-rift-panel-2'
          : 'border-rift-border bg-rift-panel/90 hover:border-rift-text'
      }`}
    >
      <div className={`font-semibold ${highlight ? 'text-rift-blue' : 'text-rift-text-bright'}`}>
        {icon} {title}
      </div>
      <div className="text-sm text-rift-text mt-0.5">{desc}</div>
    </button>
  );
}
