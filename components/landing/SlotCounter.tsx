"use client";

import { motion } from "framer-motion";

interface SlotCounterProps {
  remaining: number;
}

export function SlotCounter({ remaining }: SlotCounterProps) {
  const ratio = Math.min(100, Math.round((remaining / 180) * 100));

  return (
    <div className="glass-panel w-full max-w-xs rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Rareté en direct</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-3xl font-semibold text-[#F5C842]">{remaining}</p>
        <p className="text-xs text-white/70">places restantes</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#53B3FF] to-[#F5C842]"
          animate={{ width: `${ratio}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
