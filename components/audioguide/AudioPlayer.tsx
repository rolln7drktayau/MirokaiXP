"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = async () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    await audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm"
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        {isPlaying ? "Pause audio" : "Lancer audio"}
      </button>
    </div>
  );
}
