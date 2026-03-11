"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import type {
  AudioguideLocale,
  AudioguideSession,
  AudioguideStep,
  MirokaiCharacter,
} from "@/types/audioguide";

import { NarrativeCard } from "./NarrativeCard";
import { ProgressBar } from "./ProgressBar";
import { StoryMap } from "./StoryMap";

interface AudioguideShellProps {
  steps: AudioguideStep[];
}

type Screen = "welcome" | "map" | "step" | "end";

const shellCopy: Record<
  AudioguideLocale,
  {
    title: string;
    intro: string;
    chooseGuide: string;
    start: string;
    mapContinue: string;
    endingTitle: string;
    endingBody: string;
    reserveNext: string;
    share: string;
  }
> = {
  fr: {
    title: "Audioguide immersif Nimira",
    intro: "Sélectionnez votre langue et votre guide pour démarrer l'aventure narrative.",
    chooseGuide: "Choisissez votre guide",
    start: "Commencer l'aventure",
    mapContinue: "Continuer l'exploration",
    endingTitle: "Merci d'avoir exploré Nimira",
    endingBody: "Votre session guidée est terminée. Prochaine étape: réserver un autre événement Mirokaï.",
    reserveNext: "Réserver votre prochain événement",
    share: "Partager l'expérience",
  },
  en: {
    title: "Nimira Immersive Audioguide",
    intro: "Pick your language and guide to start the narrative journey.",
    chooseGuide: "Choose your guide",
    start: "Start the journey",
    mapContinue: "Continue exploration",
    endingTitle: "Thanks for exploring Nimira",
    endingBody: "Your guided session is complete. Next step: book your next Mirokai event.",
    reserveNext: "Book your next event",
    share: "Share the experience",
  },
};

export function AudioguideShell({ steps: initialSteps }: AudioguideShellProps) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [locale, setLocale] = useState<AudioguideLocale>("fr");
  const [guide, setGuide] = useState<MirokaiCharacter>("miroki");
  const [steps, setSteps] = useState<AudioguideStep[]>(initialSteps);
  const [currentStepId, setCurrentStepId] = useState(initialSteps[0]?.id ?? "");
  const [session, setSession] = useState<AudioguideSession | null>(null);

  const sortedSteps = useMemo(() => [...steps].sort((a, b) => a.order - b.order), [steps]);
  const currentStep = useMemo(() => sortedSteps.find((step) => step.id === currentStepId) ?? sortedSteps[0], [currentStepId, sortedSteps]);
  const currentStepIndex = Math.max(0, sortedSteps.findIndex((step) => step.id === currentStep?.id));

  const completedCount = session?.completedSteps.length ?? 0;
  const copy = shellCopy[locale];

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
    const selected = steps.find((step) => step.id === stepId);
    if (!selected?.unlocked) {
      return;
    }
    setCurrentStepId(stepId);
    setScreen("step");
  };

  const completeStep = () => {
    if (!currentStep || !session) {
      return;
    }

    const nextStep = sortedSteps[currentStepIndex + 1];

    const completedSet = new Set(session.completedSteps);
    completedSet.add(currentStep.id);

    const nextSteps = steps.map((step) =>
      nextStep && step.id === nextStep.id ? { ...step, unlocked: true } : step,
    );
    setSteps(nextSteps);

    setSession({
      ...session,
      currentStep: nextStep ? nextStep.order : sortedSteps.length,
      completedSteps: Array.from(completedSet),
    });

    if (nextStep) {
      setCurrentStepId(nextStep.id);
      setScreen("step");
      return;
    }

    setScreen("end");
  };

  const goPreviousStep = () => {
    if (currentStepIndex <= 0) {
      return;
    }

    const previousStep = sortedSteps[currentStepIndex - 1];
    setCurrentStepId(previousStep.id);
    setScreen("step");
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
            <h1 className="text-3xl">{copy.title}</h1>
            <p className="mt-2 text-sm text-white/75">{copy.intro}</p>

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

            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/70">{copy.chooseGuide}</p>
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
              {copy.start} ({locale.toUpperCase()})
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
              {copy.mapContinue}
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
            <NarrativeCard
              step={{ ...currentStep, mirokaiCharacter: guide }}
              locale={locale}
              onNext={completeStep}
              onPrevious={goPreviousStep}
              canGoPrevious={currentStepIndex > 0}
            />
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
            <h2 className="mt-2 text-3xl">{copy.endingTitle}</h2>
            <p className="mt-3 text-sm text-white/75">{copy.endingBody}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link href="/" className="cta-primary">
                {copy.reserveNext}
              </Link>
              <Link
                href="https://www.linkedin.com/company/enchanted-tools/"
                target="_blank"
                rel="noreferrer"
                className="cta-secondary"
              >
                {copy.share}
              </Link>
            </div>
          </motion.section>
        ) : null}
      </div>
    </main>
  );
}
