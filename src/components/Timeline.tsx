import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { goToStage, openModal, type TimelineTrack } from '../features/timeline/timelineSlice';
import {
  selectActiveEducationStage,
  selectActiveProfessionalStage,
  selectActiveStageId,
  selectEducationStages,
  selectProfessionalStages,
} from '../features/timeline/timelineSelectors';
import type { StageContent } from '../features/timeline/timelineTypes';
import StageCard from './StageCard';
import TimelineNode from './TimelineNode';
import ProgressControls from './ProgressControls';

interface TimelineProps {
  track: TimelineTrack;
  headingKey: string;
  subheadingKey: string;
  sectionId?: string;
}

const Timeline = ({ track, headingKey, subheadingKey, sectionId }: TimelineProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const stages = useAppSelector(track === 'professional' ? selectProfessionalStages : selectEducationStages);
  const activeStage = useAppSelector(
    track === 'professional' ? selectActiveProfessionalStage : selectActiveEducationStage,
  );
  const activeStageId = useAppSelector((state) => selectActiveStageId(state, track));
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const activeIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.id === activeStageId),
  );
  const resolvedStage = activeStage ?? stages[activeIndex];
  if (!resolvedStage) {
    return null;
  }
  const activeContent = t(resolvedStage.translationKey, {
    returnObjects: true,
  }) as StageContent;

  const pathOffsets = useMemo(
    () =>
      stages.map((_, index) => {
        const pattern = [0, 30, -24, 26];
        return pattern[index % pattern.length];
      }),
    [stages],
  );

  useEffect(() => {
    const node = nodeRefs.current[activeIndex];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    const updateProgress = () => {
      const node = nodeRefs.current[activeIndex];
      const track = trackRef.current;
      if (!node || !track) {
        setProgressPercent(0);
        return;
      }
      const nodeRect = node.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      if (trackRect.width === 0) {
        setProgressPercent(0);
        return;
      }
      const progressPixels = nodeRect.left + nodeRect.width / 2 - trackRect.left;
      const adjustedWidth = trackRect.width - nodeRect.width / 2;
      const ratio = progressPixels / adjustedWidth;
      setProgressPercent(Math.max(0, Math.min(1, ratio)) * 100);
    };

    updateProgress();
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => window.removeEventListener('resize', updateProgress);
  }, [activeIndex, stages.length]);

  const handleSelect = (stageId: string) => {
    dispatch(goToStage({ track, stageId }));
    dispatch(openModal({ track, stageId }));
  };

  const handleOpenDetails = () => {
    if (resolvedStage) {
      dispatch(openModal({ track, stageId: resolvedStage.id }));
    }
  };

  return (
    <section id={sectionId} className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">{t(headingKey)}</p>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">{activeContent.title}</h2>
        <p className="text-balance text-base text-slate-300 sm:w-3/4">{t(subheadingKey)}</p>
      </header>

      <div className="relative -mx-6 overflow-x-auto px-6 py-12 sm:mx-0 sm:px-0" aria-label={t(headingKey)}>
        <div ref={trackRef} className="relative min-w-[880px] px-4">
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-3 -translate-y-1/2 rounded-full bg-white/10 blur-sm" />
          <div
            className="pointer-events-none absolute left-4 top-1/2 h-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="relative flex items-center justify-between gap-12 sm:gap-16">
            {stages.map((stage, index) => (
              <TimelineNode
                key={stage.id}
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                stage={stage}
                offset={pathOffsets[index]}
                isActive={stage.id === resolvedStage.id}
                isCompleted={index <= activeIndex}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>

      <StageCard
        stage={resolvedStage}
        content={activeContent}
        index={activeIndex}
        total={stages.length}
        onOpenDetails={handleOpenDetails}
      />

      <ProgressControls
        track={track}
        canGoBack={activeIndex > 0}
        canGoForward={activeIndex < stages.length - 1}
      />
    </section>
  );
};

export default Timeline;

