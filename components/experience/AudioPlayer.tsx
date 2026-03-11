"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface AudioPlayerProps {
  src?: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const { locale } = useAppPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const copy = {
    fr: {
      pause: "Pause audio",
      play: "Lancer audio",
      empty: "Aucun audio disponible pour ce module.",
    },
    en: {
      pause: "Pause audio",
      play: "Play audio",
      empty: "No audio available for this module.",
    },
  } as const;
  const t = copy[locale];

  const toggle = async () => {
    if (!audioRef.current || !src) {
      return;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    await audioRef.current.play();
    setPlaying(true);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        disabled={!src}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm disabled:opacity-50"
      >
        {playing ? <Pause size={15} /> : <Play size={15} />}
        {playing ? t.pause : t.play}
      </button>
      {!src ? <p className="mt-2 text-xs text-white/60">{t.empty}</p> : null}
    </div>
  );
}
