"use client";

import { ArrowUpRight } from "lucide-react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { getModuleThemeIcon } from "@/lib/moduleIcons";
import type { Module } from "@/types/module";

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onOpen: (moduleId: string) => void;
}

export function ModuleCard({ module, isCompleted, onOpen }: ModuleCardProps) {
  const { locale } = useAppPreferences();
  const themeMeta = getModuleThemeIcon(module.theme);
  const ThemeIcon = themeMeta.icon;
  const copy = {
    fr: { completed: "Complété", open: "Ouvrir le module", module: "Module" },
    en: { completed: "Completed", open: "Open module", module: "Module" },
  } as const;
  const t = copy[locale];

  return (
    <article className="rounded-2xl border border-white/20 bg-white/5 p-4 transition hover:border-white/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#00F5C4]">{t.module} #{module.number}</p>
          <h3 className="mt-1 text-lg">{module.name}</h3>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#110f2f] px-2 py-1 text-xs text-white/75">
            <ThemeIcon size={14} className={themeMeta.colorClassName} />
            {themeMeta.label}
          </div>
        </div>
        {isCompleted ? (
          <span className="rounded-full border border-[#06D6A0]/60 bg-[#06D6A0]/15 px-2 py-1 text-xs text-[#06D6A0]">
            {t.completed}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-white/75">{module.description}</p>
      <button
        type="button"
        onClick={() => onOpen(module.id)}
        className="cta-secondary mt-4 inline-flex w-full items-center justify-center gap-2"
      >
        <ArrowUpRight size={16} />
        {t.open}
      </button>
    </article>
  );
}
