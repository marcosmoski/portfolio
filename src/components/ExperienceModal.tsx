import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  closeModal,
} from '../features/timeline/timelineSlice';
import {
  selectIsModalOpen,
  selectModalStage,
} from '../features/timeline/timelineSelectors';
import type { StageContent } from '../features/timeline/timelineTypes';

const ExperienceModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsModalOpen);
  const stage = useAppSelector(selectModalStage);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      const listener = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          dispatch(closeModal());
        }
      };
      window.addEventListener('keydown', listener);
      return () => window.removeEventListener('keydown', listener);
    }
    return undefined;
  }, [dispatch, isOpen]);

  if (!isOpen || !stage) {
    return null;
  }

  const content = t(stage.translationKey, {
    returnObjects: true,
  }) as StageContent;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-10 backdrop-blur"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dispatch(closeModal());
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">
              {content.company} • {content.period}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{content.title}</h2>
            <p className="text-sm text-slate-400">{content.location}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/40"
          >
            {t('timeline.modal.close')}
          </button>
        </div>

        <p className="mt-6 text-base text-slate-200">{content.summary}</p>

        <section className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
              {t('timeline.modal.highlights')}
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {content.highlights.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
              {t('timeline.modal.techStack')}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {content.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {content.outcomes.length ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
                {t('timeline.modal.outcomes')}
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {content.outcomes.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {content.links?.length ? (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
                {t('timeline.modal.links')}
              </h3>
              <ul className="mt-2 space-y-1">
                {content.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-secondary underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default ExperienceModal;

