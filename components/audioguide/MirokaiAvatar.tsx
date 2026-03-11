"use client";

import { motion } from "framer-motion";

import type { MirokaiCharacter, MirokaiEmotion } from "@/types/audioguide";

interface MirokaiAvatarProps {
  character: MirokaiCharacter;
  emotion: MirokaiEmotion;
}

const emotionLabels: Record<MirokaiEmotion, string> = {
  curious: "Curieux",
  happy: "Enthousiaste",
  explaining: "Pédagogue",
  welcoming: "Accueillant",
};

export function MirokaiAvatar({ character, emotion }: MirokaiAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="glass-panel relative mx-auto flex h-36 w-36 items-center justify-center rounded-full"
    >
      <motion.div
        animate={{
          rotate: emotion === "explaining" ? [0, -4, 4, 0] : 0,
          y: emotion === "happy" ? [0, -2, 0] : 0,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-[#130f2d]"
      >
        <span className="text-lg font-semibold uppercase tracking-[0.12em]">
          {character === "miroki" ? "Miroki" : "Miroka"}
        </span>
      </motion.div>
      <p className="absolute -bottom-5 rounded-full border border-white/20 bg-[#0f0d24] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#F5C842]">
        {emotionLabels[emotion]}
      </p>
    </motion.div>
  );
}
