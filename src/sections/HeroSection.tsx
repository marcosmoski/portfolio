import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="top" className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-6 py-3 text-sm shadow-lg shadow-slate-900/40 backdrop-blur">
          <span className="text-base font-semibold text-white sm:text-lg">{t('hero.name')}</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand-secondary sm:inline-flex" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-secondary sm:text-[0.75rem]">
            {t('hero.roles')}
          </span>
        </div>
        <h1 className="text-pretty text-4xl font-semibold text-white sm:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-slate-300 sm:text-xl">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#timeline"
            className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-primary/80"
          >
            {t('hero.primaryCta')}
          </a>
          <a
            href="https://www.linkedin.com/in/marcosmoski/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          >
            {t('hero.secondaryCta')}
          </a>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-primary/40 via-transparent to-brand-secondary/40 blur-2xl" />
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-white/10 bg-slate-900/80 shadow-2xl shadow-brand-primary/20">
            <img
              src="/images/marcos-cosmoski.jpg"
              alt="Foto de Marcos Cosmoski"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full max-w-sm overflow-hidden rounded-[2.25rem] border border-white/5 bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 p-6 shadow-xl shadow-brand-primary/10">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
            <span>Stack</span>
            <span>Leadership</span>
          </div>
          <dl className="mt-5 space-y-4 text-sm text-slate-100">
            <div className="flex items-center justify-between gap-4">
              <dt className="font-semibold text-white">Serverless &amp; Cloud</dt>
              <dd className="text-slate-300">AWS, CDK, Observability</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-semibold text-white">Front &amp; Back</dt>
              <dd className="text-slate-300">TypeScript, React, Node.js</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-semibold text-white">Métodos</dt>
              <dd className="text-slate-300">Scrum, OKRs, Mentoria</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-brand-muted text-center">
            Porto · Portugal · Global Remote
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

