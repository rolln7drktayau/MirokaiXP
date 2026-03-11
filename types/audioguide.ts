export type MirokaiCharacter = "miroki" | "miroka";
export type MirokaiEmotion = "curious" | "happy" | "explaining" | "welcoming";
export type AudioguideLocale = "fr" | "en";

export interface AudioguideStep {
  id: string;
  order: number;
  title: string;
  narratives: Record<AudioguideLocale, string>;
  audioUrls: Record<AudioguideLocale, string>;
  mirokaiCharacter: MirokaiCharacter;
  mirokaiEmotion: MirokaiEmotion;
  locationInMuseum: string;
  unlocked: boolean;
}

export interface AudioguideSession {
  userId: string;
  selectedGuide: MirokaiCharacter;
  currentStep: number;
  completedSteps: string[];
  startedAt: Date;
}
