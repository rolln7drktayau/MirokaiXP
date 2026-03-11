"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useModules } from "@/hooks/useModules";
import { usePWA } from "@/hooks/usePWA";
import type { Module } from "@/types/module";

import { AudioPlayer } from "./AudioPlayer";
import { FloorPlan } from "./FloorPlan";
import { MirokaiAvatar } from "./MirokaiAvatar";
import { ModuleCard } from "./ModuleCard";
import { NarrativeCard } from "./NarrativeCard";
import { ProgressBar } from "./ProgressBar";

const COMPLETED_STORAGE_KEY = "mirokai_completed_modules";

export function AudioguideShell() {
  const { modules, loading, error, refresh } = useModules();
  const { canInstall, isOnline, promptInstall } = usePWA();

  const [selectedGuide, setSelectedGuide] = useState<"miroki" | "miroka">("miroki");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

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
        <div className="glass-panel rounded-3xl p-6">Chargement de l&apos;expérience immersive...</div>
      </main>
    );
  }

  return (
    <main className="section-wrap py-8 space-y-4">
      <header className="glass-panel rounded-3xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">Mirokaï Experience • PWA visiteurs</p>
            <h1 className="mt-1 text-2xl sm:text-3xl">Explorez l&apos;espace Nimira</h1>
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
            {isOnline ? "En ligne" : "Hors ligne"}
          </span>
          {canInstall ? (
            <button type="button" onClick={() => void promptInstall()} className="cta-secondary">
              Installer la PWA
            </button>
          ) : null}
          <button type="button" onClick={() => void refresh()} className="cta-secondary">
            Rafraîchir modules
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
                Marquer comme complété
              </button>
              <Link href={`/experience/${activeModule.id}`} className="cta-secondary">
                Voir détail module
              </Link>
            </div>
          </section>
        ) : (
          <section className="glass-panel rounded-3xl p-5">
            <p>Sélectionnez un module sur la carte pour démarrer.</p>
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
        <p className="rounded-xl border border-red-300/35 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
      ) : null}
    </main>
  );
}
