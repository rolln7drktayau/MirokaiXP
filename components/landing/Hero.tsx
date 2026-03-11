"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { VisitorProfile } from "@/types/profile";

import { SlotCounter } from "./SlotCounter";

interface HeroProps {
  profile: VisitorProfile;
  remainingSlots: number;
  onPrimaryCTA: () => void;
}

const heroCopy = {
  fr: {
    label: "Mirokaï Experience 2026 • Paris",
    description:
      "Venez vivre une expérience immersive où robotique sociale, IA émotionnelle et narration Nimira convergent pour créer un moment à fort impact humain.",
    reserve: "Réserver un créneau",
    pwa: "Lancer la visite PWA",
    quiz: "Quiz Nimira",
    memory: "Memory Nimira",
    liveTitle: "Mirokaï en situation réelle",
    activeScenario: "Scénario actif",
    capsule: "Capsule interactive démontrant l'orchestration robotique en environnement réel.",
    stat1: "Interactions fluides",
    stat2: "Moments wow",
    headlines: {
      solo: "Vivez l'aventure Mirokaï en solo",
      team: "Faites vivre une sortie d'équipe mémorable",
      b2b: "Découvrez comment Mirokaï peut transformer votre entreprise",
    } as Record<VisitorProfile, string>,
    scenarios: [
      {
        name: "Accueil",
        description: "Orientation proactive, prise de parole naturelle et réduction de l'attente perçue.",
      },
      {
        name: "Onboarding",
        description: "Parcours guidé des nouveaux arrivants avec narration contextuelle et réponses dynamiques.",
      },
      {
        name: "Retail",
        description: "Médiation produit, accompagnement client et collecte de signaux d'intérêt en temps réel.",
      },
    ],
  },
  en: {
    label: "Mirokaï Experience 2026 • Paris",
    description:
      "Live an immersive journey where social robotics, emotional AI, and Nimira storytelling create a memorable human-first experience.",
    reserve: "Book a slot",
    pwa: "Launch PWA tour",
    quiz: "Nimira Quiz",
    memory: "Nimira Memory",
    liveTitle: "Mirokaï in real situations",
    activeScenario: "Active scenario",
    capsule: "Interactive capsule showing robotic orchestration in real environments.",
    stat1: "Smooth interactions",
    stat2: "Wow moments",
    headlines: {
      solo: "Experience Mirokaï solo",
      team: "Create a memorable team outing",
      b2b: "See how Mirokaï can transform your business",
    } as Record<VisitorProfile, string>,
    scenarios: [
      {
        name: "Front desk",
        description: "Proactive orientation, natural conversation, and lower perceived waiting time.",
      },
      {
        name: "Onboarding",
        description: "Guided newcomer journey with contextual storytelling and dynamic answers.",
      },
      {
        name: "Retail",
        description: "Product mediation, customer support, and real-time intent signals.",
      },
    ],
  },
} as const;

const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/media/video/mirokai-hero-loop.mp4";

export function Hero({ profile, remainingSlots, onPrimaryCTA }: HeroProps) {
  const { locale } = useAppPreferences();
  const [activeScenario, setActiveScenario] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const t = heroCopy[locale];
  const scenarios = t.scenarios;
  const scenarioCount = scenarios.length;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveScenario((current) => (current + 1) % scenarioCount);
    }, 4700);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, scenarioCount]);

  return (
    <section className="section-wrap relative overflow-hidden pb-16 pt-10 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(83,179,255,0.34),transparent_60%)]" />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="section-shell space-y-6"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/75">
            <Sparkles size={12} className="text-[#FFD166]" />
            {t.label}
          </p>

          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
            {t.headlines[profile]}
          </h1>

          <p className="max-w-xl text-base text-white/80 sm:text-lg">
            {t.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onPrimaryCTA} className="cta-primary">
              <WandSparkles size={16} />
              {t.reserve}
            </button>
            <Link href="/experience" className="cta-secondary">
              {t.pwa}
            </Link>
            <Link href="/game" className="cta-secondary">
              {t.quiz}
            </Link>
            <Link href="/game/memory" className="cta-secondary">
              {t.memory}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <SlotCounter remaining={remainingSlots} />
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.16em] text-white/70">{t.stat1}</span>
                <Bot size={16} className="text-[#00F5C4] nimira-pulse" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#00F5C4]">98%</p>
              <p className="mt-2 text-xs text-white/70">{t.stat2}: 4.9 / 5</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="glass-panel relative overflow-hidden rounded-3xl p-5 sm:p-6"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,200,66,0.22),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(83,179,255,0.2),transparent_35%)]"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.liveTitle}</p>
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#15113a_0%,#0c0b1f_60%,#180e33_100%)] p-4 sm:h-72">
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-30"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
              <motion.div
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F5C842]/25 blur-2xl"
                animate={prefersReducedMotion ? undefined : { x: [0, -6, 0], y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -left-8 bottom-8 h-28 w-28 rounded-full bg-[#53B3FF]/25 blur-2xl"
                animate={prefersReducedMotion ? undefined : { x: [0, 6, 0], y: [0, -10, 0] }}
                transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute inset-0">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <motion.span
                    key={dot}
                    className="absolute h-1.5 w-1.5 rounded-full bg-[#F5C842]/75"
                    style={{
                      left: `${14 + dot * 18}%`,
                      top: `${18 + (dot % 2) * 30}%`,
                    }}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            opacity: [0.15, 1, 0.15],
                            y: [0, -8, 0],
                            scale: [0.85, 1.1, 0.85],
                          }
                    }
                    transition={{
                      duration: 2.6 + dot * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="relative flex h-full flex-col justify-between">
                <motion.div
                  key={activeScenario}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="rounded-2xl border border-white/15 bg-[#0b0a20]/70 p-3"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[#53B3FF]">
                    {t.activeScenario} • {scenarios[activeScenario].name}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-white/80">{scenarios[activeScenario].description}</p>
                </motion.div>

                <div className="relative mx-auto mt-3 h-24 w-24">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#53B3FF]/45"
                    animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border border-[#F5C842]/45"
                    animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                    transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-5 rounded-full bg-[radial-gradient(circle,#53B3FF_0%,#1f1b49_55%,#100e2a_100%)]"
                    animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>

                <div className="mt-3 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {scenarios.map((item, index) => {
                      const isActive = activeScenario === index;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setActiveScenario(index)}
                          className={`rounded-full border px-2 py-1 text-center text-xs transition ${
                            isActive
                              ? "border-[#F5C842]/70 bg-[#F5C842]/15 text-[#F5C842]"
                              : "border-white/20 bg-white/5 text-white/85 hover:bg-white/10"
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={activeScenario}
                      className="h-full bg-gradient-to-r from-[#53B3FF] via-[#8c6cff] to-[#F5C842]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.4, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/65">
              {t.capsule}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
