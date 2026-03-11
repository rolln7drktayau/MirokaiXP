"use client";

import { useEffect, useState } from "react";

import type { Module } from "@/types/module";

import { FloorPlanEditor } from "./FloorPlanEditor";

export function FloorPlanManager() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const loadModules = async () => {
    setLoading(true);
    setStatus(null);
    const response = await fetch("/api/modules", { cache: "no-store" });
    const payload = (await response.json()) as { ok: boolean; data: Module[]; error?: string };
    if (!response.ok || !payload.ok) {
      setStatus(payload.error ?? "Erreur de chargement.");
      setLoading(false);
      return;
    }

    setModules(payload.data);
    setLoading(false);
  };

  useEffect(() => {
    void loadModules();
  }, []);

  const savePosition = async (moduleId: string, position: { x: number; y: number }) => {
    const response = await fetch(`/api/modules/${moduleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position }),
    });

    if (!response.ok) {
      setStatus("Erreur pendant la sauvegarde de position.");
      return;
    }

    setStatus("Position sauvegardée.");
  };

  if (loading) {
    return <p>Chargement du plan...</p>;
  }

  return (
    <div className="space-y-3">
      <FloorPlanEditor modules={modules} onPositionChange={savePosition} />
      {status ? <p className="text-sm text-white/75">{status}</p> : null}
      <button type="button" onClick={() => void loadModules()} className="cta-secondary">
        Recharger les positions
      </button>
    </div>
  );
}
