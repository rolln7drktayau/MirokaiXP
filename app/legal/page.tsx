"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

const copy = {
  fr: {
    title: "Mentions légales",
    updated: "Dernière mise à jour: 12 mars 2026",
    publisherTitle: "Éditeur",
    publisher:
      "Enchanted Tools Paris, 18 Rue de la Fontaine au Roi, 75011 Paris, France. Contact: bonjour@enchanted-tools.com",
    directorTitle: "Direction de la publication",
    director: "Équipe Enchanted Tools.",
    hostTitle: "Hébergement",
    host: "Vercel Inc. - 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    ipTitle: "Propriété intellectuelle",
    ip:
      "Tous les contenus (textes, visuels, éléments de marque, UI) sont protégés. Toute reproduction non autorisée est interdite.",
    liabilityTitle: "Responsabilité",
    liability:
      "Les informations publiées sont fournies à titre indicatif. Enchanted Tools s'efforce d'assurer leur exactitude sans garantie absolue.",
  },
  en: {
    title: "Legal Notice",
    updated: "Last updated: March 12, 2026",
    publisherTitle: "Publisher",
    publisher:
      "Enchanted Tools Paris, 18 Rue de la Fontaine au Roi, 75011 Paris, France. Contact: bonjour@enchanted-tools.com",
    directorTitle: "Publication management",
    director: "Enchanted Tools team.",
    hostTitle: "Hosting provider",
    host: "Vercel Inc. - 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    ipTitle: "Intellectual property",
    ip:
      "All content (texts, visuals, brand assets, UI) is protected. Any unauthorized reproduction is prohibited.",
    liabilityTitle: "Liability",
    liability:
      "Published information is provided for guidance. Enchanted Tools strives for accuracy but cannot provide absolute guarantees.",
  },
} as const;

export default function LegalPage() {
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

        <section>
          <h2 className="text-lg">{t.publisherTitle}</h2>
          <p className="mt-1 text-sm text-white/80">{t.publisher}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.directorTitle}</h2>
          <p className="mt-1 text-sm text-white/80">{t.director}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.hostTitle}</h2>
          <p className="mt-1 text-sm text-white/80">{t.host}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.ipTitle}</h2>
          <p className="mt-1 text-sm text-white/80">{t.ip}</p>
        </section>

        <section>
          <h2 className="text-lg">{t.liabilityTitle}</h2>
          <p className="mt-1 text-sm text-white/80">{t.liability}</p>
        </section>
      </article>
    </main>
  );
}
