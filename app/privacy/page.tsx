"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { NavBackHome } from "@/components/ui/NavBackHome";

const copy = {
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour: 12 mars 2026",
    s1t: "Données collectées",
    s1:
      "Nous collectons uniquement les données nécessaires au service: email, informations de profil visiteur, données de réservation et événements analytics (UTM, parcours de navigation).",
    s2t: "Finalités",
    s2:
      "Ces données servent à gérer les réservations, envoyer des communications utiles (rappels J-7/J-2/J-1), améliorer l'expérience Mirokaï et analyser la performance des parcours.",
    s3t: "Conservation",
    s3:
      "Les leads et souscriptions sont conservés selon la durée strictement nécessaire aux finalités métier et obligations légales. Vous pouvez demander la suppression de vos données.",
    s4t: "Vos droits",
    s4:
      "Vous disposez des droits d'accès, rectification, opposition, effacement et portabilité de vos données. Pour exercer vos droits, contactez-nous par email.",
    contact: "Contact RGPD: bonjour@enchanted-tools.com",
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: March 12, 2026",
    s1t: "Collected data",
    s1:
      "We only collect data required for the service: email, visitor profile data, booking information, and analytics events (UTM, navigation journey).",
    s2t: "Purposes",
    s2:
      "Data is used to manage bookings, send useful communications (D-7/D-2/D-1 reminders), improve the Mirokaï experience, and measure journey performance.",
    s3t: "Retention",
    s3:
      "Leads and subscriptions are retained only as long as needed for business purposes and legal obligations. You may request deletion of your data.",
    s4t: "Your rights",
    s4:
      "You have rights of access, rectification, objection, deletion, and portability. To exercise your rights, contact us by email.",
    contact: "GDPR contact: bonjour@enchanted-tools.com",
  },
} as const;

export default function PrivacyPage() {
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

        <p className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85">
          {t.contact}
        </p>
      </article>
    </main>
  );
}
