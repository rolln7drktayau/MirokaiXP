"use client";

import type { Module } from "@/types/module";

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onOpen: (moduleId: string) => void;
}

export function ModuleCard({ module, isCompleted, onOpen }: ModuleCardProps) {
  return (
    <article
      className={`rounded-2xl border p-4 ${
        module.unlocked ? "border-white/20 bg-white/5" : "border-white/10 bg-white/5 opacity-55"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#00F5C4]">Module #{module.number}</p>
          <h3 className="mt-1 text-lg">{module.name}</h3>
        </div>
        {isCompleted ? (
          <span className="rounded-full border border-[#06D6A0]/60 bg-[#06D6A0]/15 px-2 py-1 text-xs text-[#06D6A0]">
            Complété
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-white/75">{module.description}</p>
      <button
        type="button"
        disabled={!module.unlocked}
        onClick={() => onOpen(module.id)}
        className="cta-secondary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        Ouvrir le module
      </button>
    </article>
  );
}
