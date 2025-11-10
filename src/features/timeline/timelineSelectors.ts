import type { RootState } from '../../app/store';
import type { TimelineStage } from './timelineTypes';
import type { TimelineTrack } from './timelineSlice';

const findStageById = (stages: TimelineStage[], id: string | null) =>
  stages.find((stage) => stage.id === id) ?? stages[0] ?? null;

export const selectProfessionalStages = (state: RootState) => state.timeline.professionalStages;
export const selectEducationStages = (state: RootState) => state.timeline.educationStages;

export const selectActiveProfessionalStage = (state: RootState) =>
  findStageById(state.timeline.professionalStages, state.timeline.activeProfessionalId);
export const selectActiveEducationStage = (state: RootState) =>
  findStageById(state.timeline.educationStages, state.timeline.activeEducationId);

export const selectActiveStageId = (state: RootState, track: TimelineTrack) =>
  track === 'professional' ? state.timeline.activeProfessionalId : state.timeline.activeEducationId;

export const selectIsModalOpen = (state: RootState) => state.timeline.isModalOpen;
export const selectModalStage = (state: RootState) => {
  const { modalStageId, modalTrack } = state.timeline;
  if (!modalTrack) {
    return null;
  }
  const collection =
    modalTrack === 'professional' ? state.timeline.professionalStages : state.timeline.educationStages;
  return findStageById(collection, modalStageId);
};

