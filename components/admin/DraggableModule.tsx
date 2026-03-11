"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { Module } from "@/types/module";

interface DraggableModuleProps {
  module: Module;
}

export function DraggableModule({ module }: DraggableModuleProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: module.id,
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isDragging
          ? "border-[#FFD166]/70 bg-[#FFD166]/20 text-[#FFD166]"
          : "border-[#00F5C4]/60 bg-[#00F5C4]/15 text-[#00F5C4]"
      }`}
      style={{
        left: `${module.position.x}%`,
        top: `${module.position.y}%`,
        transform: CSS.Translate.toString(transform),
      }}
    >
      #{module.number}
    </button>
  );
}
