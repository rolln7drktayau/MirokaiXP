"use client";

import { motion } from "framer-motion";

interface MirokaiAvatarProps {
  guide: "miroki" | "miroka";
  prompt: string;
}

export function MirokaiAvatar({ guide, prompt }: MirokaiAvatarProps) {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#53B3FF]/50 bg-[#0f1030]"
        >
          <span className="text-xs uppercase tracking-[0.14em]">{guide}</span>
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/65">Guide actif</p>
          <p className="font-medium">{guide === "miroki" ? "Miroki" : "Miroka"}</p>
        </div>
      </div>
      <p className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">{prompt}</p>
    </div>
  );
}
