"use client";

import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

import { NimiraMemory } from "./NimiraMemory";

export function MemoryGameShell() {
  const { locale } = useAppPreferences();
  const copy = {
    fr: {
      quiz: "Aller au Quiz Mission Nimira",
      experience: "Retourner à l'expérience",
    },
    en: {
      quiz: "Go to Mission Nimira quiz",
      experience: "Back to experience",
    },
  } as const;
  const t = copy[locale];

  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <NavBackHome />
        <NimiraMemory />
        <div className="flex flex-wrap gap-2">
          <Link href="/game" className="cta-secondary">
            {t.quiz}
          </Link>
          <Link href="/experience" className="cta-primary">
            {t.experience}
          </Link>
        </div>
      </div>
    </main>
  );
}
