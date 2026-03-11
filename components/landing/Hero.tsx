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

const scenarioNodePositions = [
  { x: 16, y: 72 },
  { x: 50, y: 22 },
  { x: 84, y: 68 },
] as const;

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
    capsule: "Capsule interactive montrant la fluidité des interactions robot-humain en contexte réel.",
    stat1: "Interactions fluides",
    stat2: "Moments wow",
    tagA: "Proximité vocale",
    tagB: "Narration vivante",
    scenarioHint: "Touchez une bulle pour changer de scénario",
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
    capsule: "Interactive capsule showing smooth human-robot orchestration in real contexts.",
    stat1: "Smooth interactions",
    stat2: "Wow moments",
    tagA: "Voice proximity",
    tagB: "Live storytelling",
    scenarioHint: "Tap a bubble to switch scenario",
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
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(123,47,255,0.26),transparent_62%)]" />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
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

          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">{t.headlines[profile]}</h1>

          <p className="max-w-xl text-base text-white/80 sm:text-lg">{t.description}</p>

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
          className="glass-panel relative overflow-hidden rounded-[30px] p-4 sm:p-5"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,209,102,0.2),transparent_33%),radial-gradient(circle_at_18%_82%,rgba(0,245,196,0.18),transparent_37%)]"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.liveTitle}</p>

            <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[linear-gradient(165deg,#1a1647_0%,#111033_56%,#0d0b26_100%)] p-3 sm:p-4">
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-24"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,24,0.36),rgba(7,8,24,0.86))]" />

              <div className="relative z-10 flex min-h-[340px] flex-col">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <motion.div
                    key={activeScenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="rounded-2xl border border-white/15 bg-[#09071f]/70 p-3.5"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[#53B3FF]">
                      {t.activeScenario} • {scenarios[activeScenario].name}
                    </p>
                    <p className="mt-2 text-sm text-white/85">{scenarios[activeScenario].description}</p>
                  </motion.div>

                  <div className="flex gap-2 sm:flex-col">
                    <span className="rounded-full border border-[#00F5C4]/45 bg-[#00F5C4]/12 px-3 py-1.5 text-[11px] text-[#00F5C4]">
                      {t.tagA}
                    </span>
                    <span className="rounded-full border border-[#FFD166]/45 bg-[#FFD166]/12 px-3 py-1.5 text-[11px] text-[#FFD166]">
                      {t.tagB}
                    </span>
                  </div>
                </div>

                <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#09081d]/55">
                  <svg
                    className="absolute inset-0 h-full w-full opacity-45"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {scenarioNodePositions.map((node, index) => (
                      <line
                        key={`${node.x}-${node.y}-${index}`}
                        x1="50"
                        y1="52"
                        x2={node.x}
                        y2={node.y}
                        stroke={index === activeScenario ? "#FFD166" : "#53B3FF"}
                        strokeWidth="0.35"
                        strokeDasharray="1.1 1.2"
                        opacity={index === activeScenario ? 0.95 : 0.4}
                      />
                    ))}
                  </svg>

                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#53B3FF]/55"
                      animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                      transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full border border-[#FFD166]/55"
                      animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-5 rounded-full bg-[radial-gradient(circle,#8fd1ff_0%,#2a2f76_45%,#17163d_100%)]"
                      animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>

                  {scenarios.map((item, index) => {
                    const position = scenarioNodePositions[index % scenarioNodePositions.length];
                    const isActive = index === activeScenario;
                    return (
                      <motion.button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveScenario(index)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs transition ${
                          isActive
                            ? "border-[#FFD166]/75 bg-[#FFD166]/20 text-[#FFD166]"
                            : "border-white/30 bg-white/[0.08] text-white/85 hover:bg-white/15"
                        }`}
                        style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                y: [0, -4, 0],
                                scale: isActive ? [1, 1.08, 1] : [1, 1.04, 1],
                              }
                        }
                        transition={{
                          duration: 2.8 + index * 0.45,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        {item.name}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">{t.scenarioHint}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={activeScenario}
                      className="h-full bg-gradient-to-r from-[#53B3FF] via-[#00F5C4] to-[#FFD166]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.4, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/70">{t.capsule}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
