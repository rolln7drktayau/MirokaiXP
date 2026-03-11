export type MirokaiCharacter = "miroki" | "miroka";
export type MirokaiEmotion = "curious" | "happy" | "explaining" | "welcoming";

export interface AudioguideStep {
  id: string;
  order: number;
  title: string;
  narrative: string;
  audioUrl: string;
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
