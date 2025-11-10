export type TimelineStageCategory = 'experience' | 'education' | 'certification';

export interface TimelineLink {
  label: string;
  url: string;
}

export interface StageContent {
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  outcomes: string[];
  links?: TimelineLink[];
}

export interface TimelineStage {
  id: string;
  year: number;
  logoSrc: string;
  category: TimelineStageCategory;
  translationKey: `timeline.stages.${string}`;
}

