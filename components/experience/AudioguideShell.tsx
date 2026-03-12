"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useModules } from "@/hooks/useModules";
import { usePWA } from "@/hooks/usePWA";
import type { Module } from "@/types/module";
import { NavBackHome } from "@/components/ui/NavBackHome";

import { AudioPlayer } from "./AudioPlayer";
import { FloorPlan } from "./FloorPlan";
import { MirokaiAvatar } from "./MirokaiAvatar";
import { ModuleCard } from "./ModuleCard";
import { NarrativeCard } from "./NarrativeCard";
import { ProgressBar } from "./ProgressBar";

const COMPLETED_STORAGE_KEY = "mirokai_completed_modules";

export function AudioguideShell() {
  const { locale } = useAppPreferences();
  const { modules, loading, error, refresh } = useModules();
  const { canInstall, isOnline, promptInstall } = usePWA();

  const [selectedGuide, setSelectedGuide] = useState<"miroki" | "miroka">("miroki");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const copy = {
    fr: {
      loading: "Chargement de l'expérience immersive...",
      eyebrow: "Mirokaï Experience • PWA visiteurs",
      title: "Explorez l'espace Nimira",
      online: "En ligne",
      offline: "Hors ligne",
      install: "Installer la PWA",
      refresh: "Rafraîchir modules",
      complete: "Marquer comme complété",
      detail: "Voir détail module",
      selectPrompt: "Sélectionnez un module sur la carte pour démarrer.",
      errorFallback: "Erreur de chargement.",
    },
    en: {
      loading: "Loading immersive experience...",
      eyebrow: "Mirokaï Experience • Visitor PWA",
      title: "Explore the Nimira space",
      online: "Online",
      offline: "Offline",
      install: "Install PWA",
      refresh: "Refresh modules",
      complete: "Mark as completed",
      detail: "Open module details",
      selectPrompt: "Select a module on the map to start.",
      errorFallback: "Loading error.",
    },
  } as const;

  const t = copy[locale];

  useEffect(() => {
    const stored = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (stored) {
      setCompletedModules(JSON.parse(stored) as string[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    if (!activeModuleId && modules.length > 0) {
      const firstUnlocked = modules.find((module) => module.unlocked) ?? modules[0];
      setActiveModuleId(firstUnlocked.id);
    }
  }, [activeModuleId, modules]);

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) ?? null,
    [activeModuleId, modules],
  );

  const completeCurrentModule = () => {
    if (!activeModule) {
      return;
    }

    setCompletedModules((prev) =>
      prev.includes(activeModule.id) ? prev : [...prev, activeModule.id],
    );
  };

  const onSelectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  if (loading) {
    return (
      <main className="section-wrap py-8">
        <div className="glass-panel rounded-3xl p-6">{t.loading}</div>
      </main>
    );
  }

  return (
    <main className="section-wrap py-8 space-y-4">
      <NavBackHome />

      <header className="glass-panel rounded-3xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/icon0.svg"
              alt="Mirokai"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl border border-white/20 p-1"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">{t.eyebrow}</p>
              <h1 className="mt-1 text-2xl sm:text-3xl">{t.title}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedGuide("miroki")}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                selectedGuide === "miroki"
                  ? "border-[#00F5C4]/70 bg-[#00F5C4]/15 text-[#00F5C4]"
                  : "border-white/20 bg-white/5"
              }`}
            >
              Miroki
            </button>
            <button
              type="button"
              onClick={() => setSelectedGuide("miroka")}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                selectedGuide === "miroka"
                  ? "border-[#00F5C4]/70 bg-[#00F5C4]/15 text-[#00F5C4]"
                  : "border-white/20 bg-white/5"
              }`}
            >
              Miroka
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2 py-1 text-xs ${
              isOnline ? "border-[#06D6A0]/50 bg-[#06D6A0]/15 text-[#06D6A0]" : "border-[#FFD166]/50 bg-[#FFD166]/15 text-[#FFD166]"
            }`}
          >
            {isOnline ? t.online : t.offline}
          </span>
          {canInstall ? (
            <button type="button" onClick={() => void promptInstall()} className="cta-secondary">
              {t.install}
            </button>
          ) : null}
          <button type="button" onClick={() => void refresh()} className="cta-secondary">
            {t.refresh}
          </button>
        </div>
      </header>

      <ProgressBar completed={completedModules.length} total={modules.length} />

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <FloorPlan modules={modules} activeModuleId={activeModuleId ?? undefined} onSelectModule={onSelectModule} />

        {activeModule ? (
          <section className="space-y-3">
            <MirokaiAvatar guide={selectedGuide} prompt={activeModule.mirokaiPrompt} />
            <NarrativeCard module={activeModule} />
            <AudioPlayer src={activeModule.audioUrl} />

            {activeModule.videoUrl ? (
              <video
                className="w-full rounded-2xl border border-white/15 bg-black/40"
                controls
                preload="metadata"
                src={activeModule.videoUrl}
              />
            ) : null}

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={completeCurrentModule} className="cta-primary">
                {t.complete}
              </button>
              <Link href={`/experience/${activeModule.id}`} className="cta-secondary">
                {t.detail}
              </Link>
            </div>
          </section>
        ) : (
          <section className="glass-panel rounded-3xl p-5">
            <p>{t.selectPrompt}</p>
          </section>
        )}
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module: Module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onOpen={onSelectModule}
          />
        ))}
      </section>

      {error ? (
        <p className="rounded-xl border border-red-300/35 bg-red-500/10 p-3 text-sm text-red-200">{error || t.errorFallback}</p>
      ) : null}
    </main>
  );
}
