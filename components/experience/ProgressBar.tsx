"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const safeTotal = Math.max(total, 1);
  const ratio = Math.round((completed / safeTotal) * 100);
  const copy = {
    fr: "Progression visite",
    en: "Tour progress",
  } as const;

  return (
    <div className={`rounded-2xl border p-3 ${isLight ? "border-[#202020]/12 bg-white/78" : "border-white/15 bg-white/5"}`}>
      <div className={`flex items-center justify-between text-xs uppercase tracking-[0.12em] ${isLight ? "text-[#202020]/68" : "text-white/65"}`}>
        <span>{copy[locale]}</span>
        <span>{ratio}%</span>
      </div>
      <div className={`mt-2 h-2 overflow-hidden rounded-full ${isLight ? "bg-[#202020]/10" : "bg-white/10"}`}>
        <div
          className="h-full bg-gradient-to-r from-[#7B2FFF] via-[#00F5C4] to-[#FFD166] transition-all"
          style={{ width: `${ratio}%` }}
        />
      </div>
    </div>
  );
}
