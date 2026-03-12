"use client";

import { Bot } from "lucide-react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface SlotCounterProps {
  deployedRobots: number;
}

export function SlotCounter({ deployedRobots }: SlotCounterProps) {
  const { locale } = useAppPreferences();
  const copy = {
    fr: {
      deployed: "robots déployés",
    },
    en: {
      deployed: "robots deployed",
    },
  } as const;
  const t = copy[locale];

  return (
    <div className="glass-panel w-full rounded-2xl p-4">
      <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2">
        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-white/70">
          <Bot size={14} className="text-[#0eaa92]" />
          {t.deployed}
        </span>
        <span className="text-lg font-semibold text-[#0eaa92]">{deployedRobots}</span>
      </div>
    </div>
  );
}
