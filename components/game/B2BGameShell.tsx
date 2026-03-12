"use client";

import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

import { B2BScenarioGame } from "./B2BScenarioGame";

export function B2BGameShell({ visitorName }: { visitorName: string }) {
  const { locale } = useAppPreferences();

  const copy = {
    fr: {
      eyebrow: "Parcours B2B",
      title: "Simulation décisionnelle Mirokaï",
      intro:
        "Jeu adapté aux décideurs: vous choisissez des actions et mesurez l'impact business en temps réel.",
      visit: "Retour à la visite",
      profile: "Retour profil",
      landing: "Retour landing",
    },
    en: {
      eyebrow: "B2B Journey",
      title: "Mirokaï Decision Simulation",
      intro:
        "Game adapted for business stakeholders: choose actions and measure business impact in real time.",
      visit: "Back to tour",
      profile: "Back to profile",
      landing: "Back to landing",
    },
  } as const;

  const t = copy[locale];

  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <NavBackHome />
        <header className="section-shell">
          <p className="text-xs uppercase tracking-[0.16em] text-[#F5C842]">{t.eyebrow}</p>
          <h1 className="mt-2 text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-white/75">{t.intro}</p>
        </header>

        <B2BScenarioGame visitorName={visitorName} />

        <div className="flex flex-wrap gap-2">
          <Link href="/experience" className="cta-secondary">
            {t.visit}
          </Link>
          <Link href="/profile" className="cta-secondary">
            {t.profile}
          </Link>
          <Link href="/" className="cta-primary">
            {t.landing}
          </Link>
        </div>
      </div>
    </main>
  );
}
