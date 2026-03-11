"use client";

import { useEffect, useState } from "react";

import type { VisitorProfile } from "@/types/profile";

const STORAGE_KEY = "mirokai_profile";

export const useProfile = (defaultProfile: VisitorProfile = "solo") => {
  const [profile, setProfile] = useState<VisitorProfile>(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY) as VisitorProfile | null;
    if (saved && ["solo", "team", "b2b"].includes(saved)) {
      setProfile(saved);
    }
    setHydrated(true);
  }, []);

  const updateProfile = (nextProfile: VisitorProfile) => {
    setProfile(nextProfile);
    window.sessionStorage.setItem(STORAGE_KEY, nextProfile);
  };

  return {
    profile,
    setProfile: updateProfile,
    hydrated,
  };
};
