import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n/config';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'pt').slice(0, 2);

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {supportedLanguages.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => changeLanguage(lng)}
          className={clsx(
            'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
            lng === current
              ? 'bg-white text-slate-900 shadow'
              : 'text-slate-300 hover:bg-white/20 hover:text-white',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

