"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface SlotCounterProps {
  remaining: number;
}

export function SlotCounter({ remaining }: SlotCounterProps) {
  const { locale } = useAppPreferences();
  const ratio = Math.min(100, Math.round((remaining / 180) * 100));
  const copy = {
    fr: {
      scarcity: "Rareté en direct",
      left: "places restantes",
    },
    en: {
      scarcity: "Live scarcity",
      left: "spots left",
    },
  } as const;
  const t = copy[locale];

  return (
    <div className="glass-panel w-full rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.scarcity}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-3xl font-semibold text-[#F5C842]">{remaining}</p>
        <p className="text-xs text-white/70">{t.left}</p>
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
