"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { VisitorSegment } from "@/types/profile";

interface RobotScenarioPanelProps {
  visitorName?: string;
  visitorSegment?: VisitorSegment;
}

const scenarioKeywords = ["Front desk", "Onboarding", "Retail"] as const;

export function RobotScenarioPanel({ visitorName, visitorSegment }: RobotScenarioPanelProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const prefersReducedMotion = useReducedMotion();
  const [activeScenario, setActiveScenario] = useState(0);

  const copy = {
    fr: {
      title: "Mirokaï en situation réelle",
      activeScenario: "Scénario actif",
      hint: "La bulle évolue selon le scénario choisi",
      profileB2C: [
        "Je prépare une visite immersive adaptée à votre rythme.",
        "Je vous guide module par module avec un récit clair.",
        "Je vous propose ensuite une extension ludique avec les jeux Nimira.",
      ],
      profileB2B: [
        "Je prépare un parcours orienté cas d'usage métier.",
        "Nous ciblons onboarding, accueil et retail en conditions réelles.",
        "Je peux ensuite orienter vers l'espace admin pour piloter les modules.",
      ],
      moods: ["accueillant", "focus", "joueur"],
      scenarios: [
        {
          name: "Accueil",
          description: "Orientation proactive et parole naturelle en zone d'accueil.",
        },
        {
          name: "Onboarding",
          description: "Parcours guidé des nouveaux arrivants avec réponses contextualisées.",
        },
        {
          name: "Retail",
          description: "Médiation produit, accompagnement client et signal d'intérêt en temps réel.",
        },
      ],
    },
    en: {
      title: "Mirokaï in real situations",
      activeScenario: "Active scenario",
      hint: "Thought bubble adapts to the selected scenario",
      profileB2C: [
        "I am preparing an immersive visit tailored to your pace.",
        "I guide you module by module with clear narrative context.",
        "Then I can extend the visit with Nimira mini-games.",
      ],
      profileB2B: [
        "I am preparing a business-oriented journey.",
        "We focus on onboarding, front desk and retail in live conditions.",
        "Then I can route you to admin tools to orchestrate modules.",
      ],
      moods: ["welcoming", "focused", "playful"],
      scenarios: [
        {
          name: "Front desk",
          description: "Proactive orientation and natural speech in reception flows.",
        },
        {
          name: "Onboarding",
          description: "Guided newcomer journey with contextual answers.",
        },
        {
          name: "Retail",
          description: "Product mediation and real-time intent collection.",
        },
      ],
    },
  } as const;

  const t = copy[locale];
  const scenarioCount = t.scenarios.length;
  const personalizedText =
    visitorSegment === "b2b" ? t.profileB2B[activeScenario] : t.profileB2C[activeScenario];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveScenario((current) => (current + 1) % scenarioCount);
    }, 7600);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, scenarioCount]);

  return (
    <section className="glass-panel rounded-3xl p-5">
      <p className={`text-xs uppercase tracking-[0.16em] ${isLight ? "text-[#202020]/70" : "text-white/70"}`}>{t.title}</p>

      <motion.div
        key={`scenario-${activeScenario}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`mt-3 rounded-2xl border p-3 ${isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-[#1f2030]/65"}`}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-[#0eaa92]">
          {t.activeScenario} • {t.scenarios[activeScenario].name}
        </p>
        <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/82" : "text-white/82"}`}>
          {t.scenarios[activeScenario].description}
        </p>
      </motion.div>

      <div
        className={`relative mt-3 rounded-2xl border p-4 ${isLight ? "border-[#202020]/12 bg-white/75" : "border-white/10 bg-[#1f2030]/50"}`}
      >
        <motion.div
          key={`thought-${activeScenario}`}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative rounded-2xl border border-white/20 bg-[#fff7ef] px-4 py-3 text-[#202020] shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#5b5378]">Thought bubble</p>
          <p className="mt-1 text-sm font-semibold text-[#202020]">
            {visitorName ? `Bonjour ${visitorName}` : scenarioKeywords[activeScenario]}
          </p>
          <p className="mt-1 text-xs text-[#5b5378]">{visitorName ? personalizedText : t.moods[activeScenario]}</p>
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-[#fff7ef]" />
        </motion.div>

        <motion.div
          className={`mx-auto mt-4 grid h-24 w-24 place-items-center rounded-full border border-[#0eaa92]/45 ${
            isLight
              ? "bg-[radial-gradient(circle,#d7f5ed_0%,#eef8f5_65%,#f7fbf9_100%)]"
              : "bg-[radial-gradient(circle,#2f3560_0%,#1f2030_65%,#1a1a2b_100%)]"
          }`}
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0], rotate: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Bot size={38} className="text-[#0eaa92]" />
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {t.scenarios.map((scenario, index) => {
            const isActive = index === activeScenario;
            return (
              <button
                key={scenario.name}
                type="button"
                onClick={() => setActiveScenario(index)}
                className={`rounded-full border px-2 py-1 text-xs transition ${
                  isActive
                    ? "border-[#f09803]/75 bg-[#f09803]/20 text-[#f09803]"
                    : isLight
                      ? "border-[#202020]/18 bg-[#202020]/8 text-[#202020]/82"
                      : "border-white/30 bg-white/[0.08] text-white/85"
                }`}
              >
                {scenarioKeywords[index]}
              </button>
            );
          })}
        </div>
      </div>

      <p className={`mt-3 text-[11px] uppercase tracking-[0.14em] ${isLight ? "text-[#202020]/65" : "text-white/65"}`}>{t.hint}</p>
    </section>
  );
}
