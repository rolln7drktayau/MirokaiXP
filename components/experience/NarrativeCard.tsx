"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { Module } from "@/types/module";

interface NarrativeCardProps {
  module: Module;
}

export function NarrativeCard({ module }: NarrativeCardProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const copy = {
    fr: { title: "Narration Nimira" },
    en: { title: "Nimira narrative" },
  } as const;
  const t = copy[locale];

  return (
    <article
      className={`rounded-2xl border p-4 ${
        isLight ? "border-[#202020]/12 bg-white/78" : "border-white/15 bg-white/5"
      }`}
    >
      <p className={`text-xs uppercase tracking-[0.14em] ${isLight ? "text-[#202020]/68" : "text-white/65"}`}>{t.title}</p>
      <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/85" : "text-white/85"}`}>{module.description}</p>
      <p
        className={`mt-3 rounded-xl border p-3 text-sm ${
          isLight ? "border-[#202020]/12 bg-[#f2ebdf] text-[#202020]/88" : "border-white/10 bg-[#120f2e] text-[#F0EEF8]"
        }`}
      >
        {module.mirokaiPrompt}
      </p>
    </article>
  );
}
