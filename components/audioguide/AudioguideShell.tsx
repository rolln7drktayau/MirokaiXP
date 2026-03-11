"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { AudioguideSession, AudioguideStep, MirokaiCharacter } from "@/types/audioguide";

import { NarrativeCard } from "./NarrativeCard";
import { ProgressBar } from "./ProgressBar";
import { StoryMap } from "./StoryMap";

interface AudioguideShellProps {
  steps: AudioguideStep[];
}

type Screen = "welcome" | "map" | "step" | "end";
type Locale = "fr" | "en";

export function AudioguideShell({ steps: initialSteps }: AudioguideShellProps) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [locale, setLocale] = useState<Locale>("fr");
  const [guide, setGuide] = useState<MirokaiCharacter>("miroki");
  const [steps, setSteps] = useState<AudioguideStep[]>(initialSteps);
  const [currentStepId, setCurrentStepId] = useState(initialSteps[0]?.id ?? "");
  const [session, setSession] = useState<AudioguideSession | null>(null);

  const currentStep = useMemo(
    () => steps.find((step) => step.id === currentStepId) ?? steps[0],
    [currentStepId, steps],
  );

  const completedCount = session?.completedSteps.length ?? 0;

  const startExperience = () => {
    setSession({
      userId: crypto.randomUUID(),
      selectedGuide: guide,
      currentStep: 1,
      completedSteps: [],
      startedAt: new Date(),
    });
    setScreen("map");
  };

  const goToStep = (stepId: string) => {
    setCurrentStepId(stepId);
    setScreen("step");
  };

  const completeStep = () => {
    if (!currentStep || !session) {
      return;
    }

    const sorted = [...steps].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((step) => step.id === currentStep.id);
    const nextStep = sorted[index + 1];

    const completedSet = new Set(session.completedSteps);
    completedSet.add(currentStep.id);

    const nextSteps = steps.map((step) =>
      nextStep && step.id === nextStep.id ? { ...step, unlocked: true } : step,
    );
    setSteps(nextSteps);

    setSession({
      ...session,
      currentStep: nextStep ? nextStep.order : sorted.length,
      completedSteps: Array.from(completedSet),
    });

    if (nextStep) {
      setCurrentStepId(nextStep.id);
      setScreen("step");
      return;
    }

    setScreen("end");
  };

  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <ProgressBar currentStep={completedCount} totalSteps={steps.length} />

        {screen === "welcome" ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="glass-panel rounded-3xl p-5"
          >
            <h1 className="text-3xl">Audioguide immersif Nimira</h1>
            <p className="mt-2 text-sm text-white/75">
              Sélectionnez votre langue et votre guide pour démarrer l&apos;aventure narrative.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setLocale("fr")}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  locale === "fr" ? "border-[#F5C842] bg-[#F5C842]/10" : "border-white/20 bg-white/5"
                }`}
              >
                Français
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  locale === "en" ? "border-[#F5C842] bg-[#F5C842]/10" : "border-white/20 bg-white/5"
                }`}
              >
                English
              </button>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/70">Choisissez votre guide</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setGuide("miroki")}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  guide === "miroki" ? "border-[#53B3FF] bg-[#53B3FF]/10" : "border-white/20 bg-white/5"
                }`}
              >
                Miroki
              </button>
              <button
                type="button"
                onClick={() => setGuide("miroka")}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  guide === "miroka" ? "border-[#53B3FF] bg-[#53B3FF]/10" : "border-white/20 bg-white/5"
                }`}
              >
                Miroka
              </button>
            </div>

            <button type="button" onClick={startExperience} className="cta-primary mt-5">
              Commencer l&apos;aventure ({locale.toUpperCase()})
            </button>
          </motion.section>
        ) : null}

        {screen === "map" ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="glass-panel rounded-3xl p-5"
          >
            <StoryMap steps={steps} currentStepId={currentStepId} onSelectStep={goToStep} />
            <button type="button" onClick={() => goToStep(currentStepId)} className="cta-primary mt-4 w-full">
              Continuer l&apos;exploration
            </button>
          </motion.section>
        ) : null}

        {screen === "step" && currentStep ? (
          <motion.section
            key={currentStep.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <NarrativeCard step={{ ...currentStep, mirokaiCharacter: guide }} onNext={completeStep} />
          </motion.section>
        ) : null}

        {screen === "end" ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="glass-panel rounded-3xl p-5 text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Fin de parcours</p>
            <h2 className="mt-2 text-3xl">Merci d&apos;avoir exploré Nimira</h2>
            <p className="mt-3 text-sm text-white/75">
              Votre session guidée par {guide} est terminée. Prochaine étape: réserver un autre événement Mirokaï.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link href="/" className="cta-primary">
                Réserver votre prochain événement
              </Link>
              <Link
                href="https://www.linkedin.com/company/enchanted-tools/"
                target="_blank"
                rel="noreferrer"
                className="cta-secondary"
              >
                Partager l&apos;expérience
              </Link>
            </div>
          </motion.section>
        ) : null}
      </div>
    </main>
  );
}
