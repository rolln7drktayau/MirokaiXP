export type ModuleTheme = "nimira" | "tech" | "emotion" | "narration";

export interface ModulePosition {
  x: number;
  y: number;
}

export interface Module {
  id: string;
  number: number;
  name: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  images: string[];
  position: ModulePosition;
  mirokaiPrompt: string;
  unlocked: boolean;
  theme: ModuleTheme;
}

export interface ModuleInput {
  number: number;
  name: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  images: string[];
  position: ModulePosition;
  mirokaiPrompt: string;
  unlocked: boolean;
  theme: ModuleTheme;
}
