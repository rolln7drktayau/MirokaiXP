"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { getModuleThemeIcon } from "@/lib/moduleIcons";
import type { Module } from "@/types/module";

interface FloorPlanProps {
  modules: Module[];
  activeModuleId?: string;
  onSelectModule: (moduleId: string) => void;
}

export function FloorPlan({ modules, activeModuleId, onSelectModule }: FloorPlanProps) {
  const { locale } = useAppPreferences();
  const copy = {
    fr: { title: "Plan interactif de l'espace", open: "Ouvrir le module" },
    en: { title: "Interactive space map", open: "Open module" },
  } as const;
  const t = copy[locale];

  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(160deg,#0f0a2e_0%,#120f35_65%,#0d0b22_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(123,47,255,0.2),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(0,245,196,0.16),transparent_40%)]" />
      <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/75">
        {t.title}
      </div>

      {modules.map((module) => {
        const isActive = activeModuleId === module.id;
        const themeMeta = getModuleThemeIcon(module.theme);
        const ThemeIcon = themeMeta.icon;

        return (
          <button
            key={module.id}
            type="button"
            onClick={() => onSelectModule(module.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
              isActive
                ? "border-[#FFD166] bg-[#FFD166]/20 text-[#FFD166]"
                : "border-[#00F5C4]/60 bg-[#00F5C4]/15 text-[#00F5C4]"
            }`}
            style={{ left: `${module.position.x}%`, top: `${module.position.y}%` }}
            aria-label={`${t.open} ${module.number} ${module.name}`}
          >
            <span className="inline-flex items-center gap-1">
              <ThemeIcon size={13} className={isActive ? "text-[#FFD166]" : themeMeta.colorClassName} />
              #{module.number}
            </span>
          </button>
        );
      })}
    </div>
  );
}
