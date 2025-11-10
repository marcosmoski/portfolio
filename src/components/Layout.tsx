import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-brand-secondary/20 blur-[140px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold text-white">
            Marcos Cosmoski
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
            <a className="hover:text-white" href="#timeline">
              {t('common.nav.timeline')}
            </a>
            <a className="hover:text-white" href="#portfolio">
              {t('common.nav.portfolio')}
            </a>
            <a className="hover:text-white" href="mailto:marcos.cosmoski@gmail.com">
              {t('common.nav.contact')}
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              className="hidden rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-accent/80 sm:inline-flex"
              href="mailto:marcos.cosmoski@gmail.com"
            >
              {t('common.ctaContact')}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8">
          <p>{t('footer.note')}</p>
          <p className="mt-2 text-xs text-slate-500">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

