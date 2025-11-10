import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../app/hooks';
import { nextStage, prevStage, type TimelineTrack } from '../features/timeline/timelineSlice';

interface ProgressControlsProps {
  track: TimelineTrack;
  canGoBack: boolean;
  canGoForward: boolean;
}

const ProgressControls = ({ track, canGoBack, canGoForward }: ProgressControlsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => dispatch(prevStage(track))}
        disabled={!canGoBack}
        className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-500"
      >
        {t('timeline.common.back')}
      </button>
      <button
        type="button"
        onClick={() => dispatch(nextStage(track))}
        disabled={!canGoForward}
        className="rounded-full bg-brand-secondary px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-secondary/80 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
      >
        {t('timeline.common.continue')}
      </button>
    </div>
  );
};

export default ProgressControls;

