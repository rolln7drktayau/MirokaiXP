"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { VisitorProfile, VisitorSession } from "@/types/profile";

import { SlotCounter } from "./SlotCounter";

interface HeroProps {
  profile: VisitorProfile;
  deployedRobots: number;
  visitorSession: VisitorSession | null;
  onPrimaryCTA: () => void;
}

const scenarioKeywords = ["Front desk", "Onboarding", "Retail"] as const;

const heroCopy = {
  fr: {
    label: "Mirokaï Experience 2026 • Paris",
    description:
      "Venez vivre une expérience immersive où robotique sociale, IA émotionnelle et narration Nimira convergent pour créer un moment à fort impact humain.",
    reserve: "Contacter l'équipe",
    profileAccess: "Mon profil & accès",
    liveTitle: "Mirokaï en situation réelle",
    activeScenario: "Scénario actif",
    capsule: "Capsule interactive montrant la fluidité des interactions robot-humain en contexte réel.",
    stat1: "Interactions fluides",
    stat2: "Moments wow",
    tagA: "Proximité vocale",
    tagB: "Narration vivante",
    scenarioHint: "La bulle de pensée évolue selon le scénario",
    thoughtTitle: "Bulle de pensée",
    thoughtSubtitle: "Connexion profil requise pour personnaliser ce message",
    hello: "Bonjour",
    profileB2C: [
      "On démarre par une visite immersive adaptée à votre rythme.",
      "Je vous guide module par module avec une narration claire.",
      "Vous pouvez ensuite lancer les mini-jeux pour prolonger l'expérience.",
    ],
    profileB2B: [
      "Je prépare un parcours orienté cas d'usage métier et ROI.",
      "Nous allons cibler onboarding, accueil et retail en conditions réelles.",
      "Ensuite, je vous ouvre la zone admin pour configurer vos modules.",
    ],
    moods: ["accueillant", "focus", "joueur"],
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
    reserve: "Contact the team",
    profileAccess: "My profile & access",
    liveTitle: "Mirokaï in real situations",
    activeScenario: "Active scenario",
    capsule: "Interactive capsule showing smooth human-robot orchestration in real contexts.",
    stat1: "Smooth interactions",
    stat2: "Wow moments",
    tagA: "Voice proximity",
    tagB: "Live storytelling",
    scenarioHint: "Thought bubble evolves with each scenario",
    thoughtTitle: "Thought bubble",
    thoughtSubtitle: "Profile sign-in required to personalize this message",
    hello: "Hello",
    profileB2C: [
      "We start with an immersive tour tailored to your pace.",
      "I guide you module by module with clear narrative context.",
      "Then you can launch mini-games to extend the experience.",
    ],
    profileB2B: [
      "I am preparing a business-oriented path focused on use cases and ROI.",
      "We will target onboarding, front desk, and retail in live conditions.",
      "Then I unlock admin space so you can configure your modules.",
    ],
    moods: ["welcoming", "focused", "playful"],
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

export function Hero({ profile, deployedRobots, visitorSession, onPrimaryCTA }: HeroProps) {
  const { locale, theme } = useAppPreferences();
  const [activeScenario, setActiveScenario] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = heroCopy[locale];
  const isLight = theme === "nimira-light";
  const scenarios = t.scenarios;
  const scenarioCount = scenarios.length;
  const personalizedThought =
    visitorSession?.segment === "b2b" ? t.profileB2B[activeScenario] : t.profileB2C[activeScenario];

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveScenario((current) => (current + 1) % scenarioCount);
    }, 7600);

    return () => window.clearInterval(timer);
  }, [isDesktop, prefersReducedMotion, scenarioCount]);

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
          className="glass-panel relative h-full overflow-hidden rounded-[30px] p-4 sm:p-5"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(240,152,3,0.24),transparent_33%),radial-gradient(circle_at_18%_82%,rgba(14,170,146,0.22),transparent_37%)]"
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative flex h-full min-h-[560px] flex-col gap-4 sm:min-h-[620px] lg:min-h-[680px]">
            <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#202020]/68" : "text-white/70"}`}>{t.liveTitle}</p>

            <div
              className={`relative flex-1 overflow-hidden rounded-[26px] border p-3 sm:p-4 ${
                isLight
                  ? "border-[#202020]/12 bg-[linear-gradient(160deg,#f8f2e8_0%,#f5efe6_45%,#efe9de_100%)]"
                  : "border-white/15 bg-[linear-gradient(160deg,#24334e_0%,#2a2752_45%,#332343_100%)]"
              }`}
            >
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
              <div
                className={`absolute inset-0 ${
                  isLight
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(242,235,226,0.78))]"
                    : "bg-[linear-gradient(180deg,rgba(7,8,24,0.36),rgba(7,8,24,0.86))]"
                }`}
              />

              <div className="relative z-10 flex h-full min-h-[360px] flex-col sm:min-h-[420px]">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <motion.div
                    key={activeScenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`rounded-2xl border p-3.5 ${
                      isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-[#1f2030]/70"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[#0eaa92]">
                      {t.activeScenario} • {scenarios[activeScenario].name}
                    </p>
                    <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/84" : "text-white/85"}`}>{scenarios[activeScenario].description}</p>
                  </motion.div>

                  <div className="flex gap-2 sm:flex-col">
                    <span className="rounded-full border border-[#0eaa92]/45 bg-[#0eaa92]/16 px-3 py-1.5 text-[11px] text-[#0eaa92]">
                      {t.tagA}
                    </span>
                    <span className="rounded-full border border-[#f09803]/45 bg-[#f09803]/16 px-3 py-1.5 text-[11px] text-[#f09803]">
                      {t.tagB}
                    </span>
                  </div>
                </div>

                <div
                  className={`relative mt-4 flex-1 min-h-[190px] overflow-hidden rounded-2xl border sm:min-h-[240px] ${
                    isLight ? "border-[#202020]/10 bg-white/70" : "border-white/10 bg-[#1f2030]/50"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,74,173,0.22),transparent_40%),radial-gradient(circle_at_75%_78%,rgba(163,51,124,0.18),transparent_45%)]" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-6 pt-4">
                    <motion.div
                      key={`thought-${activeScenario}`}
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative rounded-2xl border border-white/20 bg-[#fff7ef] px-4 py-3 text-center text-[#202020] shadow-[0_10px_26px_rgba(0,0,0,0.26)]"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#5b5378]">{t.thoughtTitle}</p>
                      {visitorSession ? (
                        <>
                          <p className="mt-1 text-sm font-semibold text-[#202020]">
                            {t.hello} {visitorSession.name}
                          </p>
                          <p className="mt-1 text-xs text-[#5b5378]">{personalizedThought}</p>
                        </>
                      ) : (
                        <>
                          <p className="mt-1 text-sm font-semibold text-[#202020]">{scenarioKeywords[activeScenario]}</p>
                          <p className="mt-1 text-xs text-[#5b5378]">{t.moods[activeScenario]}</p>
                        </>
                      )}
                      <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-[#fff7ef]" />
                    </motion.div>

                    <motion.div
                      className="mt-4 h-5 w-5 rounded-full bg-[#fff7ef]/70"
                      animate={prefersReducedMotion ? undefined : { y: [0, 4, 0], opacity: [0.8, 0.5, 0.8] }}
                      transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />

                    <motion.div
                      className={`mt-2 grid h-28 w-28 place-items-center rounded-full border border-[#0eaa92]/45 ${
                        isLight
                          ? "bg-[radial-gradient(circle,#d7f5ed_0%,#eef8f5_65%,#f7fbf9_100%)]"
                          : "bg-[radial-gradient(circle,#2f3560_0%,#1f2030_65%,#1a1a2b_100%)]"
                      }`}
                      animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], rotate: [0, 1.5, -1.5, 0] }}
                      transition={{ duration: 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Bot size={46} className="text-[#0eaa92]" />
                    </motion.div>

                    <div className="mt-4 grid w-full max-w-sm grid-cols-3 gap-2">
                      {scenarios.map((_, index) => {
                        const isActive = index === activeScenario;
                        return (
                          <button
                            key={scenarioKeywords[index]}
                            type="button"
                            onClick={() => setActiveScenario(index)}
                            className={`rounded-full border px-2 py-1 text-center text-xs transition ${
                              isActive
                                ? "border-[#f09803]/75 bg-[#f09803]/20 text-[#f09803]"
                                : isLight
                                  ? "border-[#202020]/20 bg-[#202020]/10 text-[#202020]/82 hover:bg-[#202020]/14"
                                  : "border-white/30 bg-white/[0.08] text-white/85 hover:bg-white/15"
                            }`}
                          >
                            {scenarioKeywords[index]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <p className={`text-[11px] uppercase tracking-[0.16em] ${isLight ? "text-[#202020]/65" : "text-white/65"}`}>
                    {visitorSession ? t.scenarioHint : t.thoughtSubtitle}
                  </p>
                  <div className={`h-1.5 overflow-hidden rounded-full ${isLight ? "bg-[#202020]/12" : "bg-white/10"}`}>
                    <motion.div
                      key={activeScenario}
                      className="h-full bg-gradient-to-r from-[#004aad] via-[#a3337c] to-[#f09803]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7.3, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border px-3 py-2 text-xs ${
                isLight
                  ? "border-[#202020]/12 bg-white/75 text-[#202020]/72"
                  : "border-white/15 bg-black/20 text-white/70"
              }`}
            >
              {t.capsule}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
