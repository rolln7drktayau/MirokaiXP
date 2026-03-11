"use client";

import { useState } from "react";

import type { AudioguideStep } from "@/types/audioguide";

import { AudioPlayer } from "./AudioPlayer";
import { MirokaiAvatar } from "./MirokaiAvatar";

interface NarrativeCardProps {
  step: AudioguideStep;
  onNext: () => void;
}

export function NarrativeCard({ step, onNext }: NarrativeCardProps) {
  const [showSubtitles, setShowSubtitles] = useState(true);

  return (
    <article className="glass-panel space-y-4 rounded-3xl p-4 sm:p-5">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{step.locationInMuseum}</p>
        <h2 className="mt-1 text-2xl">{step.title}</h2>
      </div>

      <MirokaiAvatar character={step.mirokaiCharacter} emotion={step.mirokaiEmotion} />

      <AudioPlayer audioUrl={step.audioUrl} />

      <button
        type="button"
        onClick={() => setShowSubtitles((value) => !value)}
        className="rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em]"
      >
        {showSubtitles ? "Masquer sous-titres" : "Afficher sous-titres"}
      </button>

      {showSubtitles ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-white/85">
          {step.narrative}
        </p>
      ) : null}

      <button type="button" onClick={onNext} className="cta-primary w-full">
        Étape suivante
      </button>
    </article>
  );
}
