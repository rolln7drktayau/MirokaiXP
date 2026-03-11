"use client";

import { useRef, useState } from "react";

import type { AudioguideLocale, AudioguideStep } from "@/types/audioguide";

import { AudioPlayer } from "./AudioPlayer";
import { MirokaiAvatar } from "./MirokaiAvatar";

interface NarrativeCardProps {
  step: AudioguideStep;
  locale: AudioguideLocale;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
}

export function NarrativeCard({
  step,
  locale,
  onNext,
  onPrevious,
  canGoPrevious,
}: NarrativeCardProps) {
  const [showSubtitles, setShowSubtitles] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const narrative = step.narratives[locale] ?? step.narratives.fr;
  const audioUrl = step.audioUrls[locale] ?? step.audioUrls.fr;

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;

    if (deltaX <= -55) {
      onNext();
    } else if (deltaX >= 55 && canGoPrevious) {
      onPrevious();
    }

    touchStartX.current = null;
  };

  return (
    <article
      className="glass-panel space-y-4 rounded-3xl p-4 sm:p-5"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{step.locationInMuseum}</p>
        <h2 className="mt-1 text-2xl">{step.title}</h2>
      </div>

      <MirokaiAvatar character={step.mirokaiCharacter} emotion={step.mirokaiEmotion} />

      <AudioPlayer audioUrl={audioUrl} />

      <button
        type="button"
        onClick={() => setShowSubtitles((value) => !value)}
        className="rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em]"
      >
        {showSubtitles ? "Masquer sous-titres" : "Afficher sous-titres"}
      </button>

      {showSubtitles ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-white/85">
          {narrative}
        </p>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="cta-secondary w-full disabled:cursor-not-allowed disabled:opacity-45"
        >
          Étape précédente
        </button>
        <button type="button" onClick={onNext} className="cta-primary w-full">
          Étape suivante
        </button>
      </div>

      <p className="text-center text-[11px] uppercase tracking-[0.12em] text-white/60">
        Swipe gauche: suivant • Swipe droite: précédent
      </p>
    </article>
  );
}
