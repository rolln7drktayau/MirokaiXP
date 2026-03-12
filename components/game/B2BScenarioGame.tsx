"use client";

import { motion } from "framer-motion";
import { BarChart3, Building2, Gauge, RotateCcw, Sparkles, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

type KpiKey = "engagement" | "efficiency" | "confidence";

interface KpiState {
  engagement: number;
  efficiency: number;
  confidence: number;
}

interface ScenarioOption {
  label: string;
  impact: KpiState;
}

interface ScenarioQuestion {
  id: string;
  title: string;
  context: string;
  options: ScenarioOption[];
}

const kpiIcons = {
  engagement: Users,
  efficiency: Gauge,
  confidence: Building2,
} as const;

const addKpi = (base: KpiState, next: KpiState): KpiState => ({
  engagement: base.engagement + next.engagement,
  efficiency: base.efficiency + next.efficiency,
  confidence: base.confidence + next.confidence,
});

export function B2BScenarioGame({ visitorName }: { visitorName: string }) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState<KpiState>({
    engagement: 0,
    efficiency: 0,
    confidence: 0,
  });
  const [done, setDone] = useState(false);

  const copy = {
    fr: {
      eyebrow: "Simulation B2B",
      title: "Pilotage Mirokaï ROI",
      intro: "Choisissez vos décisions. Le robot calcule un score d'impact business en direct.",
      step: "Scénario",
      choose: "Choisissez une action",
      doneTitle: "Simulation terminée",
      replay: "Rejouer la simulation",
      greeting: "Bonjour",
      recommendation: "Recommandation",
      recommendationLow:
        "Commencez par un pilote onboarding + accueil pour sécuriser l'adoption interne.",
      recommendationMid:
        "Planifiez un créneau privé multi-équipes pour valider l'impact en environnement réel.",
      recommendationHigh:
        "Vous avez un profil prêt pour un déploiement progressif sur plusieurs points de contact.",
      kpis: {
        engagement: "Engagement équipes",
        efficiency: "Efficacité opérationnelle",
        confidence: "Confiance partenaires",
      },
      questions: [
        {
          id: "q1",
          title: "Lancement d'une visite entreprise",
          context: "Vous avez 20 décideurs à convaincre sur la valeur de Mirokaï.",
          options: [
            {
              label: "Démarrer par un storytelling d'usage métier + démonstration courte",
              impact: { engagement: 3, efficiency: 2, confidence: 3 },
            },
            {
              label: "Commencer par un exposé technique détaillé de 30 minutes",
              impact: { engagement: 1, efficiency: 1, confidence: 2 },
            },
            {
              label: "Laisser la visite libre sans cadrage narratif",
              impact: { engagement: 0, efficiency: 0, confidence: 1 },
            },
          ],
        },
        {
          id: "q2",
          title: "Point d'onboarding RH",
          context: "Votre objectif est d'accélérer la prise en main des nouveaux collaborateurs.",
          options: [
            {
              label: "Créer 3 modules courts contextualisés par équipe",
              impact: { engagement: 3, efficiency: 3, confidence: 2 },
            },
            {
              label: "Un seul module générique pour tous",
              impact: { engagement: 1, efficiency: 2, confidence: 1 },
            },
            {
              label: "Pas de personnalisation, uniquement vidéo passive",
              impact: { engagement: 0, efficiency: 1, confidence: 0 },
            },
          ],
        },
        {
          id: "q3",
          title: "Activation retail",
          context: "Vous voulez améliorer conversion et satisfaction en point de vente.",
          options: [
            {
              label: "Déployer front desk + recommandation produit guidée",
              impact: { engagement: 2, efficiency: 3, confidence: 3 },
            },
            {
              label: "Déployer uniquement animation visuelle statique",
              impact: { engagement: 1, efficiency: 1, confidence: 1 },
            },
            {
              label: "Reporter la médiation robot pour un test ultérieur",
              impact: { engagement: 0, efficiency: 0, confidence: 1 },
            },
          ],
        },
      ] as ScenarioQuestion[],
    },
    en: {
      eyebrow: "B2B Simulation",
      title: "Mirokaï ROI Pilot",
      intro: "Choose your decisions. The robot computes business impact score in real time.",
      step: "Scenario",
      choose: "Choose an action",
      doneTitle: "Simulation completed",
      replay: "Replay simulation",
      greeting: "Hello",
      recommendation: "Recommendation",
      recommendationLow:
        "Start with an onboarding + front desk pilot to secure internal adoption.",
      recommendationMid:
        "Plan a private multi-team slot to validate impact in real conditions.",
      recommendationHigh:
        "Your profile is ready for progressive deployment across multiple touchpoints.",
      kpis: {
        engagement: "Team engagement",
        efficiency: "Operational efficiency",
        confidence: "Partner confidence",
      },
      questions: [
        {
          id: "q1",
          title: "Enterprise visit kickoff",
          context: "You need to convince 20 decision makers about Mirokaï value.",
          options: [
            {
              label: "Start with use-case storytelling + short live demo",
              impact: { engagement: 3, efficiency: 2, confidence: 3 },
            },
            {
              label: "Begin with a 30-minute deep technical presentation",
              impact: { engagement: 1, efficiency: 1, confidence: 2 },
            },
            {
              label: "Run a free visit without narrative framing",
              impact: { engagement: 0, efficiency: 0, confidence: 1 },
            },
          ],
        },
        {
          id: "q2",
          title: "HR onboarding point",
          context: "Your goal is to speed up newcomer ramp-up.",
          options: [
            {
              label: "Create 3 short contextual modules by team",
              impact: { engagement: 3, efficiency: 3, confidence: 2 },
            },
            {
              label: "Use one generic module for everyone",
              impact: { engagement: 1, efficiency: 2, confidence: 1 },
            },
            {
              label: "No personalization, only passive video",
              impact: { engagement: 0, efficiency: 1, confidence: 0 },
            },
          ],
        },
        {
          id: "q3",
          title: "Retail activation",
          context: "You want to improve conversion and satisfaction in-store.",
          options: [
            {
              label: "Deploy front desk + guided product recommendation",
              impact: { engagement: 2, efficiency: 3, confidence: 3 },
            },
            {
              label: "Deploy static visual animation only",
              impact: { engagement: 1, efficiency: 1, confidence: 1 },
            },
            {
              label: "Postpone robot mediation to a later test",
              impact: { engagement: 0, efficiency: 0, confidence: 1 },
            },
          ],
        },
      ] as ScenarioQuestion[],
    },
  } as const;

  const t = copy[locale];
  const questions = t.questions;
  const currentQuestion = questions[index];
  const maxScore = questions.length * 3;

  const total = score.engagement + score.efficiency + score.confidence;
  const recommendation = useMemo(() => {
    if (total <= 11) {
      return t.recommendationLow;
    }
    if (total <= 18) {
      return t.recommendationMid;
    }
    return t.recommendationHigh;
  }, [t.recommendationHigh, t.recommendationLow, t.recommendationMid, total]);

  const restart = () => {
    setIndex(0);
    setDone(false);
    setScore({
      engagement: 0,
      efficiency: 0,
      confidence: 0,
    });
  };

  const onChoose = (impact: KpiState) => {
    setScore((prev) => addKpi(prev, impact));

    if (index >= questions.length - 1) {
      setDone(true);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  return (
    <section className={`rounded-2xl border p-5 ${isLight ? "border-[#202020]/12 bg-white/80" : "border-white/15 bg-white/5"}`}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#00F5C4]">
            <BarChart3 size={13} />
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl">{t.title}</h2>
          <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>{t.intro}</p>
        </div>
        <button type="button" onClick={restart} className="cta-secondary inline-flex items-center gap-2">
          <RotateCcw size={15} />
          {t.replay}
        </button>
      </header>

      {done ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-3"
        >
          <div className={`rounded-xl border p-4 ${isLight ? "border-[#202020]/12 bg-[#f4fbfa]" : "border-[#00F5C4]/35 bg-[#00F5C4]/10"}`}>
            <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">{t.doneTitle}</p>
            <p className="mt-2 text-sm">
              {t.greeting} {visitorName}. <span className="font-semibold">{t.recommendation}</span> {recommendation}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(score) as KpiKey[]).map((key) => {
              const Icon = kpiIcons[key];
              const value = score[key];
              const ratio = Math.min(100, Math.round((value / maxScore) * 100));
              return (
                <article key={key} className={`rounded-xl border p-3 ${isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-white/5"}`}>
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/70">
                    <Icon size={13} className="text-[#FFD166]" />
                    {t.kpis[key]}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#FFD166]">{value}</p>
                  <div className={`mt-2 h-2 overflow-hidden rounded-full ${isLight ? "bg-[#202020]/12" : "bg-white/10"}`}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00F5C4] to-[#F5C842]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${ratio}%` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.24, ease: "easeInOut" }}
          className="mt-4 space-y-3"
        >
          <p className={`text-xs uppercase tracking-[0.16em] ${isLight ? "text-[#202020]/68" : "text-white/65"}`}>
            {t.step} {index + 1} / {questions.length}
          </p>
          <h3 className="text-xl">{currentQuestion.title}</h3>
          <p className={`text-sm ${isLight ? "text-[#202020]/82" : "text-white/78"}`}>{currentQuestion.context}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-[#53B3FF]">{t.choose}</p>
          <div className="grid gap-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onChoose(option.impact)}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  isLight
                    ? "border-[#202020]/14 bg-white/85 hover:bg-[#eef5ff]"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={14} className="text-[#F5C842]" />
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
