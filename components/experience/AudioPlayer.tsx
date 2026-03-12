"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface AudioPlayerProps {
  src?: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
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
    <div className={`rounded-2xl border p-3 ${isLight ? "border-[#202020]/12 bg-white/78" : "border-white/15 bg-white/5"}`}>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        disabled={!src}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm disabled:opacity-50 ${
          isLight ? "border-[#202020]/20 bg-[#202020]/5 text-[#202020]/88" : "border-white/20"
        }`}
      >
        {playing ? <Pause size={15} /> : <Play size={15} />}
        {playing ? t.pause : t.play}
      </button>
      {!src ? <p className={`mt-2 text-xs ${isLight ? "text-[#202020]/62" : "text-white/60"}`}>{t.empty}</p> : null}
    </div>
  );
}
