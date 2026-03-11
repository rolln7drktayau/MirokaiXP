"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useRef, useState } from "react";

import type { Module } from "@/types/module";

import { DraggableModule } from "./DraggableModule";

interface FloorPlanEditorProps {
  modules: Module[];
  onPositionChange: (moduleId: string, position: { x: number; y: number }) => Promise<void>;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function FloorPlanEditor({ modules, onPositionChange }: FloorPlanEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [localModules, setLocalModules] = useState<Module[]>(modules);

  const onDragEnd = async (event: DragEndEvent) => {
    const moduleId = String(event.active.id);
    const current = localModules.find((item) => item.id === moduleId);
    if (!current || !containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const nextPosition = {
      x: clamp(current.position.x + (event.delta.x / rect.width) * 100, 0, 100),
      y: clamp(current.position.y + (event.delta.y / rect.height) * 100, 0, 100),
    };

    setLocalModules((prev) =>
      prev.map((item) => (item.id === moduleId ? { ...item, position: nextPosition } : item)),
    );
    await onPositionChange(moduleId, nextPosition);
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div
        ref={containerRef}
        className="relative h-[420px] overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(160deg,#0f0a2e_0%,#120f35_65%,#0d0b22_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(123,47,255,0.2),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(0,245,196,0.16),transparent_40%)]" />
        {localModules.map((module) => (
          <DraggableModule key={module.id} module={module} />
        ))}
      </div>
    </DndContext>
  );
}
