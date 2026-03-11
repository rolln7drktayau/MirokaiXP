"use client";

import { useState } from "react";

const questions = [
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
];

export function NimiraQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

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
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">Mission Nimira terminée</p>
        <h2 className="mt-2 text-2xl">Score: {score} / {questions.length}</h2>
        <p className="mt-2 text-sm text-white/75">
          Badge débloqué: Explorateur de Nimira. Partagez votre score et réservez votre prochaine visite.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/65">
        Question {index + 1} / {questions.length}
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
    </div>
  );
}
