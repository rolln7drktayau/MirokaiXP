"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

const copy = {
  fr: {
    title: "Politique cookies",
    updated: "Dernière mise à jour: 12 mars 2026",
    intro:
      "Cette page décrit l'usage des cookies et technologies similaires sur la plateforme Mirokaï Experience.",
    s1t: "Cookies techniques",
    s1:
      "Nécessaires au fonctionnement: préférences thème/langue, session d'authentification admin/dashboard, progression locale de visite.",
    s2t: "Cookies de mesure d'audience",
    s2:
      "Si activés, Google Analytics / GTM / Hotjar peuvent déposer des cookies pour mesurer les performances et améliorer l'UX.",
    s3t: "Gestion des cookies",
    s3:
      "Vous pouvez bloquer ou supprimer les cookies depuis les paramètres de votre navigateur. Certaines fonctionnalités peuvent alors être dégradées.",
    s4t: "Contact",
    s4: "Pour toute question: bonjour@enchanted-tools.com",
  },
  en: {
    title: "Cookie Policy",
    updated: "Last updated: March 12, 2026",
    intro: "This page explains how cookies and similar technologies are used on Mirokaï Experience.",
    s1t: "Technical cookies",
    s1:
      "Required for core features: theme/language preferences, admin/dashboard auth session, local tour progression.",
    s2t: "Analytics cookies",
    s2:
      "When enabled, Google Analytics / GTM / Hotjar may set cookies to measure performance and improve UX.",
    s3t: "Cookie management",
    s3:
      "You can block or delete cookies in your browser settings. Some features may no longer work properly.",
    s4t: "Contact",
    s4: "For any request: bonjour@enchanted-tools.com",
  },
} as const;

export default function CookiesPage() {
  const { locale } = useAppPreferences();
  const t = copy[locale];

  return (
    <main className="section-wrap space-y-4 py-8">
      <NavBackHome />

      <article className="section-shell space-y-4">
        <header>
          <h1 className="text-3xl">{t.title}</h1>
          <p className="mt-1 text-sm text-white/70">{t.updated}</p>
        </header>

        <p className="text-sm text-white/80">{t.intro}</p>

        <section>
          <h2 className="text-lg">{t.s1t}</h2>
          <p className="mt-1 text-sm text-white/80">{t.s1}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.s2t}</h2>
          <p className="mt-1 text-sm text-white/80">{t.s2}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.s3t}</h2>
          <p className="mt-1 text-sm text-white/80">{t.s3}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.s4t}</h2>
          <p className="mt-1 text-sm text-white/80">{t.s4}</p>
        </section>
      </article>
    </main>
  );
}
