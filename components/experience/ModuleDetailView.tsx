"use client";

import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { getModuleThemeIcon } from "@/lib/moduleIcons";
import type { Module } from "@/types/module";
import { NavBackHome } from "@/components/ui/NavBackHome";

interface ModuleDetailViewProps {
  moduleData: Module;
}

export function ModuleDetailView({ moduleData }: ModuleDetailViewProps) {
  const { locale } = useAppPreferences();
  const themeMeta = getModuleThemeIcon(moduleData.theme);
  const ThemeIcon = themeMeta.icon;

  const copy = {
    fr: {
      module: "Module",
      map: "Retour au plan",
      game: "Lancer le mini-jeu Nimira",
      memory: "Lancer le Memory Nimira",
      previous: "Page précédente",
      home: "Accueil",
    },
    en: {
      module: "Module",
      map: "Back to map",
      game: "Start Nimira mini-game",
      memory: "Start Nimira Memory",
      previous: "Previous page",
      home: "Home",
    },
  } as const;

  const t = copy[locale];

  return (
    <main className="section-wrap py-8">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-5 sm:p-6">
        <NavBackHome className="mb-4" backLabel={t.previous} homeLabel={t.home} />

        <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">
          {t.module} #{moduleData.number}
        </p>
        <h1 className="mt-1 text-3xl">{moduleData.name}</h1>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#120f30] px-3 py-1 text-xs text-white/75">
          <ThemeIcon size={14} className={themeMeta.colorClassName} />
          {themeMeta.label}
        </div>
        <p className="mt-3 text-white/80">{moduleData.description}</p>

        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/85">
          {moduleData.mirokaiPrompt}
        </p>

        {moduleData.videoUrl ? (
          <video
            className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40"
            controls
            preload="metadata"
            src={moduleData.videoUrl}
          />
        ) : null}

        {moduleData.audioUrl ? (
          <audio className="mt-4 w-full" controls preload="metadata" src={moduleData.audioUrl} />
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/experience" className="cta-secondary">
            {t.map}
          </Link>
          <Link href="/game" className="cta-primary">
            {t.game}
          </Link>
          <Link href="/game/memory" className="cta-secondary">
            {t.memory}
          </Link>
        </div>
      </div>
    </main>
  );
}
