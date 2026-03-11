"use client";

import { useEffect, useState } from "react";

import type { Module, ModuleInput } from "@/types/module";

import { FloorPlanEditor } from "./FloorPlanEditor";
import { ModuleForm } from "./ModuleForm";

export function ModulesManager() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Module | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadModules = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/modules", { cache: "no-store" });
      const payload = (await response.json()) as { ok: boolean; data: Module[]; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Chargement impossible.");
      }
      setModules(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadModules();
  }, []);

  const createNewModule = async (data: ModuleInput) => {
    const response = await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Création impossible.");
    }

    await loadModules();
  };

  const updateExistingModule = async (data: ModuleInput) => {
    if (!selected) {
      return;
    }

    const response = await fetch(`/api/modules/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Mise à jour impossible.");
    }

    await loadModules();
  };

  const removeModule = async (moduleId: string) => {
    const response = await fetch(`/api/modules/${moduleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Suppression impossible.");
    }
    setSelected((prev) => (prev?.id === moduleId ? null : prev));
    await loadModules();
  };

  const savePosition = async (moduleId: string, position: { x: number; y: number }) => {
    const response = await fetch(`/api/modules/${moduleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position }),
    });

    if (!response.ok) {
      setError("Position impossible à sauvegarder.");
      return;
    }

    setError(null);
    setModules((prev) =>
      prev.map((module) => (module.id === moduleId ? { ...module, position } : module)),
    );
    setSelected((prev) => (prev?.id === moduleId ? { ...prev, position } : prev));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass-panel rounded-3xl p-4">
          <h2 className="text-xl">Créer un module</h2>
          <ModuleForm
            submitLabel="Créer module"
            onSubmit={async (data) => {
              await createNewModule(data);
            }}
          />
        </section>

        <section className="glass-panel rounded-3xl p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl">Modules existants</h2>
            <button type="button" onClick={() => void loadModules()} className="cta-secondary">
              Rafraîchir
            </button>
          </div>

          {loading ? <p className="mt-3 text-sm text-white/70">Chargement...</p> : null}
          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

          <div className="mt-3 space-y-2">
            {modules.map((module) => (
              <article
                key={module.id}
                className={`rounded-xl border p-3 ${
                  selected?.id === module.id ? "border-[#FFD166]/60 bg-[#FFD166]/10" : "border-white/15 bg-white/5"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-white/70">#{module.number}</p>
                    <p className="font-medium">{module.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSelected(module)} className="cta-secondary">
                      Éditer
                    </button>
                    <button
                      type="button"
                      onClick={() => void removeModule(module.id)}
                      className="rounded-full border border-red-300/40 bg-red-500/10 px-3 py-1 text-sm text-red-200"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {selected ? (
        <section className="glass-panel rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-xl">Édition: {selected.name}</h2>
            <button type="button" onClick={() => setSelected(null)} className="cta-secondary">
              Fermer
            </button>
          </div>
          <ModuleForm
            initialValues={selected}
            submitLabel="Mettre à jour module"
            onSubmit={async (data) => {
              await updateExistingModule(data);
            }}
          />
        </section>
      ) : null}

      <section className="glass-panel rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl">Plan interactif des modules</h2>
            <p className="text-sm text-white/75">
              Les nouveaux modules créés apparaissent ici immédiatement. Déplacez-les en drag & drop.
            </p>
          </div>
          <button type="button" onClick={() => void loadModules()} className="cta-secondary">
            Synchroniser le plan
          </button>
        </div>
        <FloorPlanEditor modules={modules} onPositionChange={savePosition} />
      </section>
    </div>
  );
}
