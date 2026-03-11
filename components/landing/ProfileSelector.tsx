"use client";

import { motion } from "framer-motion";

import type { ProfileOption, VisitorProfile } from "@/types/profile";

interface ProfileSelectorProps {
  profile: VisitorProfile;
  onSelect: (profile: VisitorProfile) => void;
}

const options: ProfileOption[] = [
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
];

export function ProfileSelector({ profile, onSelect }: ProfileSelectorProps) {
  return (
    <section className="section-wrap py-4">
      <div className="glass-panel rounded-3xl p-4 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Sélecteur de profil</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {options.map((option) => {
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
