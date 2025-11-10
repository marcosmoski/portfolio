import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { learningStages, professionalStages } from './timelineData';

export type TimelineTrack = 'professional' | 'education';

interface TimelineState {
  professionalStages: typeof professionalStages;
  educationStages: typeof learningStages;
  activeProfessionalId: string;
  activeEducationId: string;
  isModalOpen: boolean;
  modalStageId: string | null;
  modalTrack: TimelineTrack | null;
}

const initialState: TimelineState = {
  professionalStages,
  educationStages: learningStages,
  activeProfessionalId: professionalStages[0]?.id ?? '',
  activeEducationId: learningStages[0]?.id ?? '',
  isModalOpen: false,
  modalStageId: null,
  modalTrack: null,
};

const getStagesByTrack = (state: TimelineState, track: TimelineTrack) =>
  track === 'professional' ? state.professionalStages : state.educationStages;

const getActiveIdKey = (track: TimelineTrack): 'activeProfessionalId' | 'activeEducationId' =>
  track === 'professional' ? 'activeProfessionalId' : 'activeEducationId';

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    nextStage(state, action: PayloadAction<TimelineTrack>) {
      const track = action.payload;
      const stages = getStagesByTrack(state, track);
      const activeKey = getActiveIdKey(track);
      const currentIndex = stages.findIndex((stage) => stage.id === state[activeKey]);
      const nextStage = stages[currentIndex + 1];
      if (nextStage) {
        state[activeKey] = nextStage.id;
      }
    },
    prevStage(state, action: PayloadAction<TimelineTrack>) {
      const track = action.payload;
      const stages = getStagesByTrack(state, track);
      const activeKey = getActiveIdKey(track);
      const currentIndex = stages.findIndex((stage) => stage.id === state[activeKey]);
      const prevStage = stages[currentIndex - 1];
      if (prevStage) {
        state[activeKey] = prevStage.id;
      }
    },
    goToStage(state, action: PayloadAction<{ track: TimelineTrack; stageId: string }>) {
      const { track, stageId } = action.payload;
      const stages = getStagesByTrack(state, track);
      if (stages.some((stage) => stage.id === stageId)) {
        state[getActiveIdKey(track)] = stageId;
      }
    },
    openModal(state, action: PayloadAction<{ track: TimelineTrack; stageId: string }>) {
      state.modalStageId = action.payload.stageId;
      state.modalTrack = action.payload.track;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalStageId = null;
      state.modalTrack = null;
    },
  },
});

export const { nextStage, prevStage, goToStage, openModal, closeModal } = timelineSlice.actions;

export type { TimelineState };

export default timelineSlice.reducer;

