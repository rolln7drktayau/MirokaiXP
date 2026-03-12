"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { ProfileOption, VisitorProfile } from "@/types/profile";

interface ProfileSelectorProps {
  profile: VisitorProfile;
  onSelect: (profile: VisitorProfile) => void;
  onOpenSlots?: (profile: VisitorProfile) => void;
}

type ProfileVisualOption = ProfileOption & {
  image: string;
  imageAlt: string;
};

export function ProfileSelector({ profile, onSelect, onOpenSlots }: ProfileSelectorProps) {
  const { locale } = useAppPreferences();

  const copy = {
    fr: {
      title: "Sélecteur de profil",
      options: [
        {
          id: "team",
          label: "Équipe",
          description: "Idéal pour les sorties d'équipe, onboarding et inspiration collective.",
          ctaLabel: "Voir les créneaux groupe",
          image: "/media/profiles/team.svg",
          imageAlt: "Visuel profil équipe",
        },
        {
          id: "solo",
          label: "Solo",
          description: "Parfait pour découvrir l'univers Mirokaï à votre rythme.",
          ctaLabel: "Voir les créneaux solo",
          image: "/media/profiles/solo.svg",
          imageAlt: "Visuel profil solo",
        },
        {
          id: "b2b",
          label: "Entreprise",
          description: "Explorez les cas d'usage concrets pour votre activité.",
          ctaLabel: "Lancer ma pré-qualification",
          image: "/media/profiles/enterprise.svg",
          imageAlt: "Visuel profil entreprise",
        },
      ] as ProfileVisualOption[],
    },
    en: {
      title: "Profile selector",
      options: [
        {
          id: "team",
          label: "Team",
          description: "Great for team outings, onboarding, and collective inspiration.",
          ctaLabel: "View team slots",
          image: "/media/profiles/team.svg",
          imageAlt: "Team profile visual",
        },
        {
          id: "solo",
          label: "Solo",
          description: "Perfect to discover the Mirokaï universe at your own pace.",
          ctaLabel: "View solo slots",
          image: "/media/profiles/solo.svg",
          imageAlt: "Solo profile visual",
        },
        {
          id: "b2b",
          label: "Business",
          description: "Explore concrete use cases for your business.",
          ctaLabel: "Start qualification",
          image: "/media/profiles/enterprise.svg",
          imageAlt: "Business profile visual",
        },
      ] as ProfileVisualOption[],
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
                <div className="relative overflow-hidden rounded-xl border border-white/15">
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    width={640}
                    height={360}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
                <p className="mt-3 text-base font-medium">{option.label}</p>
                <p className="mt-2 text-sm text-white/75">{option.description}</p>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(option.id);
                    onOpenSlots?.(option.id);
                  }}
                  className="mt-4 rounded-full border border-[#53B3FF]/35 bg-[#53B3FF]/10 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-[#53B3FF] transition hover:bg-[#53B3FF]/18"
                >
                  {option.ctaLabel}
                </button>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
