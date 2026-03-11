"use client";

import { useCallback, useEffect, useState } from "react";

import type { Module } from "@/types/module";

const STORAGE_KEY = "mirokai_modules_cache";

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/modules", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Impossible de charger les modules.");
      }

      const payload = (await response.json()) as { ok: boolean; data: Module[] };
      if (!payload.ok) {
        throw new Error("Réponse invalide.");
      }

      setModules(payload.data);
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload.data));
    } catch (err) {
      const cached = window.sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        setModules(JSON.parse(cached) as Module[]);
      }
      setError(err instanceof Error ? err.message : "Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchModules();
  }, [fetchModules]);

  return {
    modules,
    loading,
    error,
    refresh: fetchModules,
  };
};
