"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

export function NimiraQuiz() {
  const { locale } = useAppPreferences();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const content = {
    fr: {
      done: "Mission Nimira terminée",
      score: "Score",
      badge:
        "Badge débloqué: Explorateur de Nimira. Partagez votre score et réservez votre prochaine visite.",
      question: "Question",
      questions: [
        {
          id: "q1",
          question: "Quel est le rôle principal du module Portail Nimira ?",
          answers: [
            { label: "Introduire l'univers et le parcours", correct: true },
            { label: "Collecter des données biométriques", correct: false },
            { label: "Piloter le robot à distance", correct: false },
          ],
        },
        {
          id: "q2",
          question: "Combien de phrases maximum pour un prompt robot sur place ?",
          answers: [
            { label: "8 à 10 phrases", correct: false },
            { label: "2 à 3 phrases", correct: true },
            { label: "Aucune limite", correct: false },
          ],
        },
        {
          id: "q3",
          question: "Quelle approche correspond à l'univers Nimira ?",
          answers: [
            { label: "Technologie froide et distante", correct: false },
            { label: "Narration immersive + émotion + robotique sociale", correct: true },
            { label: "Interface sans storytelling", correct: false },
          ],
        },
      ],
    },
    en: {
      done: "Mission Nimira completed",
      score: "Score",
      badge:
        "Badge unlocked: Nimira Explorer. Share your score and book your next visit.",
      question: "Question",
      questions: [
        {
          id: "q1",
          question: "What is the main role of the Nimira Portal module?",
          answers: [
            { label: "Introduce the universe and the journey", correct: true },
            { label: "Collect biometric data", correct: false },
            { label: "Control the robot remotely", correct: false },
          ],
        },
        {
          id: "q2",
          question: "How many sentences max for an on-site robot prompt?",
          answers: [
            { label: "8 to 10 sentences", correct: false },
            { label: "2 to 3 sentences", correct: true },
            { label: "No limit", correct: false },
          ],
        },
        {
          id: "q3",
          question: "Which approach matches the Nimira universe?",
          answers: [
            { label: "Cold and distant technology", correct: false },
            { label: "Immersive storytelling + emotion + social robotics", correct: true },
            { label: "Interface without storytelling", correct: false },
          ],
        },
      ],
    },
  } as const;

  const t = content[locale];
  const questions = t.questions;

  const current = questions[index];

  const choose = (isCorrect: boolean) => {
    const nextScore = isCorrect ? score + 1 : score;
    setScore(nextScore);

    if (index >= questions.length - 1) {
      setDone(true);
      return;
    }

    setIndex((value) => value + 1);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="rounded-2xl border border-white/15 bg-white/5 p-5"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">{t.done}</p>
        <h2 className="mt-2 text-2xl">{t.score}: {score} / {questions.length}</h2>
        <p className="mt-2 text-sm text-white/75">
          {t.badge}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={current.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: "easeInOut" }}
      className="rounded-2xl border border-white/15 bg-white/5 p-5"
    >
      <p className="text-xs uppercase tracking-[0.16em] text-white/65">
        {t.question} {index + 1} / {questions.length}
      </p>
      <h2 className="mt-2 text-xl">{current.question}</h2>
      <div className="mt-4 grid gap-2">
        {current.answers.map((answer) => (
          <button
            key={answer.label}
            type="button"
            onClick={() => choose(answer.correct)}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-left text-sm transition hover:bg-white/10"
          >
            {answer.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
