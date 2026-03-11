"use client";

import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

import { NimiraQuiz } from "./NimiraQuiz";

export function GameShell() {
  const { locale } = useAppPreferences();
  const copy = {
    fr: {
      eyebrow: "Bonus engagement",
      title: "Mission Nimira",
      intro: "Aidez Miroki à reconstituer les données de mission en répondant au quiz de visite.",
      quizTab: "Quiz narratif",
      memoryTab: "Memory Nimira",
      backExperience: "Retour à l'expérience",
      playMemory: "Jouer au Memory",
      landing: "Revenir à la landing",
    },
    en: {
      eyebrow: "Engagement bonus",
      title: "Mission Nimira",
      intro: "Help Miroki rebuild mission data by answering the visit quiz.",
      quizTab: "Narrative quiz",
      memoryTab: "Nimira Memory",
      backExperience: "Back to experience",
      playMemory: "Play memory",
      landing: "Back to landing",
    },
  } as const;
  const t = copy[locale];

  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <NavBackHome />

        <header className="section-shell">
          <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">{t.eyebrow}</p>
          <h1 className="mt-2 text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-white/75">
            {t.intro}
          </p>
        </header>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/game" className="rounded-2xl border border-[#00F5C4]/45 bg-[#00F5C4]/10 px-4 py-3 text-sm text-[#00F5C4]">
            {t.quizTab}
          </Link>
          <Link href="/game/memory" className="rounded-2xl border border-[#FFD166]/45 bg-[#FFD166]/10 px-4 py-3 text-sm text-[#FFD166]">
            {t.memoryTab}
          </Link>
        </div>

        <NimiraQuiz />
        <div className="flex flex-wrap gap-2">
          <Link href="/experience" className="cta-secondary">
            {t.backExperience}
          </Link>
          <Link href="/game/memory" className="cta-secondary">
            {t.playMemory}
          </Link>
          <Link href="/" className="cta-primary">
            {t.landing}
          </Link>
        </div>
      </div>
    </main>
  );
}
