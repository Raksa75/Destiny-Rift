import { useI18n } from '../i18n';
import type { Lang } from '../types';

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const options: Lang[] = ['fr', 'en'];

  return (
    <div className="fixed top-4 left-4 z-40 flex rounded-lg border border-rift-border bg-rift-panel/90 backdrop-blur overflow-hidden text-xs">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setLang(option)}
          className={`px-3 py-2 font-medium transition-colors ${
            lang === option
              ? 'bg-rift-blue text-rift-bg'
              : 'text-rift-text hover:text-rift-text-bright'
          }`}
        >
          {t(option === 'fr' ? 'lang.fr' : 'lang.en')}
        </button>
      ))}
    </div>
  );
}
