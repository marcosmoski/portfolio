import { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { TimelineStage } from '../features/timeline/timelineTypes';

const categoryStyles: Record<TimelineStage['category'], string> = {
  experience: 'ring-1 ring-brand-secondary/35 shadow-[0_0_24px_rgba(14,165,233,0.25)]',
  education: 'ring-1 ring-emerald-300/35 shadow-[0_0_24px_rgba(16,185,129,0.25)]',
  certification: 'ring-1 ring-amber-300/35 shadow-[0_0_24px_rgba(250,204,21,0.25)]',
};

interface TimelineNodeProps {
  stage: TimelineStage;
  offset: number;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: (stageId: string) => void;
}

const TimelineNode = forwardRef<HTMLButtonElement, TimelineNodeProps>(
  ({ stage, offset, isActive, isCompleted, onSelect }, ref) => {
    return (
      <div className="relative flex flex-col items-center" style={{ transform: `translateY(${offset}px)` }}>
        <button
          ref={ref}
          type="button"
          onClick={() => onSelect(stage.id)}
          className={clsx(
            'group flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.75rem] border border-white/20 bg-white/5 backdrop-blur-sm transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary hover:scale-105',
            categoryStyles[stage.category],
            isActive ? 'scale-110 border-white/70 bg-white/15 shadow-[0_0_35px_rgba(79,70,229,0.45)]' : '',
            !isActive && isCompleted ? 'border-white/35 bg-white/10' : '',
          )}
        >
          <div className="flex h-[3.6rem] w-[3.6rem] items-center justify-center overflow-hidden rounded-[1.25rem] bg-white/95 transition group-hover:bg-white">
            <img
              src={stage.logoSrc}
              alt={stage.id}
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
            />
          </div>
        </button>
        <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
          {stage.year}
        </span>
      </div>
    );
  },
);

TimelineNode.displayName = 'TimelineNode';

export default TimelineNode;

