"use client";

import { useCallback, useEffect, useState } from "react";

import { VISITOR_SESSION_STORAGE_KEY } from "@/lib/visitorSession.constants";
import type { VisitorSegment, VisitorSession } from "@/types/profile";

const parseSession = (raw: string | null): VisitorSession | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as VisitorSession;
    if (
      typeof parsed.name === "string" &&
      parsed.name.trim().length > 0 &&
      (parsed.segment === "b2c" || parsed.segment === "b2b") &&
      typeof parsed.createdAt === "string"
    ) {
      return parsed;
    }
  } catch {
    // Ignore malformed local data.
  }

  return null;
};

export const useVisitorSession = () => {
  const [session, setSession] = useState<VisitorSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const local = parseSession(window.localStorage.getItem(VISITOR_SESSION_STORAGE_KEY));
    setSession(local);
    setHydrated(true);
  }, []);

  const signIn = useCallback(async (payload: { name: string; segment: VisitorSegment }) => {
    const response = await fetch("/api/profile-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("invalid_profile_session");
    }

    const data = (await response.json()) as { ok: boolean; session?: VisitorSession };
    if (!data.session) {
      throw new Error("missing_profile_session");
    }

    setSession(data.session);
    window.localStorage.setItem(VISITOR_SESSION_STORAGE_KEY, JSON.stringify(data.session));
    return data.session;
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/profile-session", { method: "DELETE" });
    window.localStorage.removeItem(VISITOR_SESSION_STORAGE_KEY);
    setSession(null);
  }, []);

  return {
    session,
    hydrated,
    signIn,
    signOut,
  };
};
