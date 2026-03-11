import type { Module } from "./module";

export interface FloorPlanState {
  modules: Module[];
  updatedAt: string;
}

export interface DragUpdatePayload {
  moduleId: string;
  position: {
    x: number;
    y: number;
  };
}
