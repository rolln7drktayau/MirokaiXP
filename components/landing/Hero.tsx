"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { FloorPlan } from "@/components/experience/FloorPlan";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { moduleSeed } from "@/lib/moduleSeed";
import type { VisitorProfile } from "@/types/profile";

import { SlotCounter } from "./SlotCounter";

interface HeroProps {
  profile: VisitorProfile;
  deployedRobots: number;
  onPrimaryCTA: () => void;
}

const heroCopy = {
  fr: {
    label: "Mirokaï Experience 2026 • Paris",
    description:
      "Venez vivre une expérience immersive où robotique sociale, IA émotionnelle et narration Nimira convergent pour créer un moment à fort impact humain.",
    reserve: "Contacter l'équipe",
    profileAccess: "Mon profil & accès",
    mapTitle: "Plan interactif de l'expérience",
    mapHint: "Sélectionnez un module pour voir son cartel en direct.",
    mapCta: "Ouvrir la visite complète",
    stat1: "Interactions fluides",
    stat2: "Moments wow",
    headlines: {
      solo: "Vivez l'aventure Mirokaï en solo",
      team: "Faites vivre une sortie d'équipe mémorable",
      b2b: "Découvrez comment Mirokaï peut transformer votre entreprise",
    } as Record<VisitorProfile, string>,
  },
  en: {
    label: "Mirokaï Experience 2026 • Paris",
    description:
      "Live an immersive journey where social robotics, emotional AI, and Nimira storytelling create a memorable human-first experience.",
    reserve: "Contact the team",
    profileAccess: "My profile & access",
    mapTitle: "Interactive experience map",
    mapHint: "Select a module to reveal its live caption.",
    mapCta: "Open full tour",
    stat1: "Smooth interactions",
    stat2: "Wow moments",
    headlines: {
      solo: "Experience Mirokaï solo",
      team: "Create a memorable team outing",
      b2b: "See how Mirokaï can transform your business",
    } as Record<VisitorProfile, string>,
  },
} as const;

export function Hero({ profile, deployedRobots, onPrimaryCTA }: HeroProps) {
  const { locale, theme } = useAppPreferences();
  const [activeModuleId, setActiveModuleId] = useState(moduleSeed[0]?.id ?? "");
  const t = heroCopy[locale];
  const isLight = theme === "nimira-light";

  const activeModule = useMemo(
    () => moduleSeed.find((module) => module.id === activeModuleId) ?? moduleSeed[0],
    [activeModuleId],
  );

  return (
    <section className="section-wrap relative overflow-hidden pb-16 pt-10 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(0,74,173,0.3),transparent_62%)]" />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="section-shell space-y-6"
        >
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${
              isLight
                ? "border-[#a37a98]/40 bg-[#e7cfe0] text-[#3f3550]"
                : "border-white/20 bg-[#a3337c]/25 text-white/85"
            }`}
          >
            <Sparkles size={12} className="text-[#f09803]" />
            {t.label}
          </p>

          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">{t.headlines[profile]}</h1>

          <p className={`max-w-xl text-base sm:text-lg ${isLight ? "text-[#202020]/82" : "text-white/80"}`}>{t.description}</p>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onPrimaryCTA} className="cta-primary">
              <WandSparkles size={16} />
              {t.reserve}
            </button>
            <Link href="/profile" className="cta-secondary">
              {t.profileAccess}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <SlotCounter deployedRobots={deployedRobots} />
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.16em] text-white/70">{t.stat1}</span>
                <Bot size={16} className="text-[#0eaa92] nimira-pulse" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#0eaa92]">98%</p>
              <p className="mt-2 text-xs text-white/70">{t.stat2}: 4.9 / 5</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="glass-panel relative overflow-hidden rounded-[30px] p-4 sm:p-5"
        >
          <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#202020]/68" : "text-white/70"}`}>{t.mapTitle}</p>
          <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/78" : "text-white/78"}`}>{t.mapHint}</p>

          <div className="mt-3">
            <FloorPlan
              modules={moduleSeed}
              activeModuleId={activeModule?.id}
              onSelectModule={setActiveModuleId}
            />
          </div>

          {activeModule ? (
            <div
              className={`mt-3 rounded-2xl border p-3 ${
                isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-white/5"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#00F5C4]">Module #{activeModule.number}</p>
              <h3 className="mt-1 text-lg">{activeModule.name}</h3>
              <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>{activeModule.description}</p>
            </div>
          ) : null}

          <Link href="/profile?next=/experience" className="cta-secondary mt-4 inline-flex w-full items-center justify-center gap-2">
            <ArrowUpRight size={16} />
            {t.mapCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
