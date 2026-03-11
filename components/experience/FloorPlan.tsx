"use client";

import type { Module } from "@/types/module";

interface FloorPlanProps {
  modules: Module[];
  activeModuleId?: string;
  onSelectModule: (moduleId: string) => void;
}

export function FloorPlan({ modules, activeModuleId, onSelectModule }: FloorPlanProps) {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(160deg,#0f0a2e_0%,#120f35_65%,#0d0b22_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(123,47,255,0.2),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(0,245,196,0.16),transparent_40%)]" />
      <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/75">
        Plan interactif de l&apos;espace
      </div>

      {modules.map((module) => {
        const isActive = activeModuleId === module.id;
        return (
          <button
            key={module.id}
            type="button"
            onClick={() => onSelectModule(module.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
              isActive
                ? "border-[#FFD166] bg-[#FFD166]/20 text-[#FFD166]"
                : module.unlocked
                  ? "border-[#00F5C4]/60 bg-[#00F5C4]/15 text-[#00F5C4]"
                  : "border-white/25 bg-white/10 text-white/60"
            }`}
            style={{ left: `${module.position.x}%`, top: `${module.position.y}%` }}
          >
            #{module.number}
          </button>
        );
      })}
    </div>
  );
}
