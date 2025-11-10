import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const portfolioItems = ['vestouro'] as const;

const PortfolioSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="portfolio"
      className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-12 shadow-xl backdrop-blur sm:px-10"
    >
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">{t('portfolio.heading')}</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('portfolio.description')}</h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {portfolioItems.map((item) => (
          <article
            key={item}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:border-brand-secondary/60 hover:bg-white/10"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">{t(`portfolio.items.${item}.title`)}</h3>
              <p className="text-sm text-slate-300">{t(`portfolio.items.${item}.summary`)}</p>
            </div>
            <a
              href={t(`portfolio.items.${item}.linkUrl`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary underline-offset-4 hover:underline"
            >
              {t(`portfolio.items.${item}.linkLabel`)}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;

