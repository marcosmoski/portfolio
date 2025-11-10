import { useTranslation } from 'react-i18next';
import type { StageContent, TimelineStage } from '../features/timeline/timelineTypes';
import { clsx } from 'clsx';

interface StageCardProps {
  stage: TimelineStage;
  content: StageContent;
  index: number;
  total: number;
  onOpenDetails: () => void;
}

const StageCard = ({ stage, content, index, total, onOpenDetails }: StageCardProps) => {
  const { t } = useTranslation();

  return (
    <article
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl backdrop-blur"
      data-stage-id={stage.id}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">
            {stage.year} · {t(`timeline.categories.${stage.category}`)}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{content.title}</h2>
          <p className="text-base text-slate-300">
            {content.company} • {content.period}
          </p>
          <p className="text-sm text-slate-500">{content.location}</p>
        </div>
        <span className="rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1 text-sm font-medium text-brand-primary">
          {t('timeline.common.progress', { current: index + 1, total })}
        </span>
      </div>

      <p className="mt-6 text-lg text-slate-200">{content.summary}</p>

      <ul className="mt-6 space-y-2 text-sm text-slate-300">
        {content.highlights.slice(0, 3).map((highlight, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-secondary" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {content.techStack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className={clsx(
              'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200',
            )}
          >
            {tech}
          </span>
        ))}
        {content.techStack.length > 6 ? (
          <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
            +{content.techStack.length - 6}
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onOpenDetails}
          className="rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {t('timeline.common.openDetails')}
        </button>
        {content.links?.[0] ? (
          <a
            href={content.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-secondary underline-offset-4 hover:underline"
          >
            {content.links[0].label}
          </a>
        ) : null}
      </div>
    </article>
  );
};

export default StageCard;

