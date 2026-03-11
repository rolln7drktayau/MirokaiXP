"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { ProfileOption, VisitorProfile } from "@/types/profile";

interface ProfileSelectorProps {
  profile: VisitorProfile;
  onSelect: (profile: VisitorProfile) => void;
}

export function ProfileSelector({ profile, onSelect }: ProfileSelectorProps) {
  const { locale } = useAppPreferences();

  const copy = {
    fr: {
      title: "Sélecteur de profil",
      options: [
        {
          id: "team",
          label: "Je viens en équipe",
          description: "Idéal pour les sorties d'équipe, onboarding et inspiration collective.",
          ctaLabel: "Voir les créneaux groupe",
        },
        {
          id: "solo",
          label: "Je viens seul",
          description: "Parfait pour découvrir l'univers Mirokaï à votre rythme.",
          ctaLabel: "Voir les créneaux solo",
        },
        {
          id: "b2b",
          label: "Je représente une entreprise",
          description: "Explorez les cas d'usage concrets pour votre activité.",
          ctaLabel: "Lancer ma pré-qualification",
        },
      ] as ProfileOption[],
    },
    en: {
      title: "Profile selector",
      options: [
        {
          id: "team",
          label: "I come with my team",
          description: "Great for team outings, onboarding, and collective inspiration.",
          ctaLabel: "View team slots",
        },
        {
          id: "solo",
          label: "I come solo",
          description: "Perfect to discover the Mirokaï universe at your own pace.",
          ctaLabel: "View solo slots",
        },
        {
          id: "b2b",
          label: "I represent a company",
          description: "Explore concrete use cases for your business.",
          ctaLabel: "Start qualification",
        },
      ] as ProfileOption[],
    },
  } as const;

  const t = copy[locale];

  return (
    <section className="section-wrap py-4">
      <div className="glass-panel rounded-3xl p-4 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.title}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {t.options.map((option) => {
            const isActive = option.id === profile;
            return (
              <motion.button
                key={option.id}
                type="button"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelect(option.id)}
                className={`relative rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-[#F5C842] bg-[#F5C842]/10 shadow-[0_0_22px_rgba(245,200,66,0.25)]"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                <p className="text-base font-medium">{option.label}</p>
                <p className="mt-2 text-sm text-white/75">{option.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#53B3FF]">{option.ctaLabel}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
