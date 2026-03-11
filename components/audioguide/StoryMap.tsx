"use client";

import type { AudioguideStep } from "@/types/audioguide";

interface StoryMapProps {
  steps: AudioguideStep[];
  currentStepId: string;
  onSelectStep: (id: string) => void;
}

export function StoryMap({ steps, currentStepId, onSelectStep }: StoryMapProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Carte narrative</p>
      <div className="grid gap-2">
        {steps.map((step) => {
          const isActive = step.id === currentStepId;
          return (
            <button
              key={step.id}
              type="button"
              disabled={!step.unlocked}
              onClick={() => onSelectStep(step.id)}
              className={`rounded-2xl border p-3 text-left transition ${
                !step.unlocked
                  ? "cursor-not-allowed border-white/10 bg-white/5 text-white/45"
                  : isActive
                    ? "border-[#F5C842]/60 bg-[#F5C842]/12"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-white/70">Étape {step.order}</p>
              <p className="mt-1 font-medium">{step.title}</p>
              <p className="mt-1 text-xs text-white/70">{step.locationInMuseum}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
