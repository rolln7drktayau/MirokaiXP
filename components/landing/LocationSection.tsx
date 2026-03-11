"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=18+Rue+de+la+Fontaine+au+Roi%2C+75011+Paris";

export function LocationSection() {
  const { locale } = useAppPreferences();

  const copy = {
    fr: {
      title: "OÙ NOUS TROUVER ?",
      address: "18 Rue de la Fontaine au Roi, 75011 Paris — Métro Goncourt (L11)",
      itinerary: "📍 Itinéraire",
      map: "Voir le plan du lieu",
      metro: "🚇",
      bus: "🚌",
      velib: "🚲",
      parking: "🚗",
      experienceTitle: "Mirokaï Experience",
      experienceDescription:
        "Rencontrez les robots Mirokaï au cœur de Paris. Une expérience unique à la croisée de la robotique et de l'intelligence artificielle.",
      legalTitle: "Informations légales",
      legalLinks: [
        "Politique de confidentialité",
        "Mentions légales",
        "CGV",
        "Gestion des cookies",
        "RGPD",
        "Contact",
      ],
      fullAddress: "📍 18 Rue de la Fontaine au Roi",
      city: "75011 Paris",
      email: "📧 bonjour@enchanted-tools.com",
      phone: "📞 +33 1 84 80 00 00",
      copyright: "© 2026 Enchanted Tools Paris. Tous droits réservés.",
      footerLinks: [
        { label: "Confidentialité", href: "/privacy" },
        { label: "Mentions légales", href: "/legal" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
    en: {
      title: "WHERE TO FIND US?",
      address: "18 Rue de la Fontaine au Roi, 75011 Paris — Goncourt Metro (L11)",
      itinerary: "📍 Directions",
      map: "View location map",
      metro: "🚇",
      bus: "🚌",
      velib: "🚲",
      parking: "🚗",
      experienceTitle: "Mirokaï Experience",
      experienceDescription:
        "Meet Mirokaï robots in the heart of Paris. A unique experience at the crossroads of robotics and artificial intelligence.",
      legalTitle: "Legal information",
      legalLinks: [
        "Privacy policy",
        "Legal notice",
        "Terms & Conditions",
        "Cookie management",
        "GDPR",
        "Contact",
      ],
      fullAddress: "📍 18 Rue de la Fontaine au Roi",
      city: "75011 Paris",
      email: "📧 bonjour@enchanted-tools.com",
      phone: "📞 +33 1 84 80 00 00",
      copyright: "© 2026 Enchanted Tools Paris. All rights reserved.",
      footerLinks: [
        { label: "Privacy", href: "/privacy" },
        { label: "Legal", href: "/legal" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  } as const;

  const t = copy[locale];

  const mobilityCards = [
    {
      icon: t.metro,
      title: "Goncourt",
      description: locale === "fr" ? "Ligne 11" : "Line 11",
    },
    {
      icon: t.bus,
      title: locale === "fr" ? "Bus 46, 75" : "Bus 46, 75",
      description: locale === "fr" ? "Arrêt Fontaine au Roi" : "Fontaine au Roi stop",
    },
    {
      icon: t.velib,
      title: "Vélib'",
      description: locale === "fr" ? "Station à 50m" : "Station 50m away",
    },
    {
      icon: t.parking,
      title: "Parking",
      description: "Rue Oberkampf",
    },
  ];

  return (
    <section className="section-wrap py-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(140deg,#f7f1e8_0%,#f2e7d8_45%,#eee0d2_100%)] p-5 text-[#202020] shadow-[0_16px_36px_rgba(32,32,32,0.14)] sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,74,173,0.18),transparent_45%),radial-gradient(circle_at_87%_82%,rgba(163,51,124,0.16),transparent_45%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-[#202020]/65">{t.title}</p>
          <h2 className="mt-2 text-xl leading-snug sm:text-2xl">{t.address}</h2>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#202020]/20 bg-white/70 px-4 py-2 text-sm text-[#202020] transition hover:bg-white"
          >
            <span>{t.itinerary}</span>
            <span className="text-[#004aad]">{t.map}</span>
          </a>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mobilityCards.map((card) => (
              <motion.article
                key={card.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="rounded-2xl border border-[#202020]/12 bg-white/78 p-4"
              >
                <p className="text-xl">{card.icon}</p>
                <p className="mt-2 text-base font-semibold">{card.title}</p>
                <p className="mt-1 text-sm text-[#202020]/75">{card.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#202020]/12 bg-white/78 p-4">
              <h3 className="text-lg font-semibold">{t.experienceTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#202020]/80">{t.experienceDescription}</p>
            </article>
            <article className="rounded-2xl border border-[#202020]/12 bg-white/78 p-4">
              <h3 className="text-lg font-semibold">{t.legalTitle}</h3>
              <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-[#202020]/80 sm:grid-cols-2">
                {t.legalLinks.map((legal) => (
                  <p key={legal}>{legal}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>

      <footer className="glass-panel mt-4 rounded-3xl p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 text-sm text-white/85">
            <p>{t.fullAddress}</p>
            <p>{t.city}</p>
            <p>
              <a href="mailto:bonjour@enchanted-tools.com" className="underline decoration-white/30 underline-offset-4">
                {t.email}
              </a>
            </p>
            <p>
              <a href="tel:+33184800000" className="underline decoration-white/30 underline-offset-4">
                {t.phone}
              </a>
            </p>
          </div>
          <div className="space-y-2 text-sm text-white/75 sm:text-right">
            <p>{t.copyright}</p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {t.footerLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
