"use client";

import { Bot, Cpu, Heart, Orbit, Radio, Sparkles, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type CardKey = "spark" | "bot" | "cpu" | "heart" | "orbit" | "radio";

type MemoryCard = {
  id: string;
  key: CardKey;
};

const iconByKey = {
  spark: Sparkles,
  bot: Bot,
  cpu: Cpu,
  heart: Heart,
  orbit: Orbit,
  radio: Radio,
} as const;

const cardKeys: CardKey[] = ["spark", "bot", "cpu", "heart", "orbit", "radio"];

const shuffle = (cards: MemoryCard[]) => {
  const next = [...cards];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const createDeck = () => {
  const cards = cardKeys.flatMap((key) => [
    { id: `${key}-a`, key },
    { id: `${key}-b`, key },
  ]);
  return shuffle(cards);
};

export function NimiraMemory() {
  const [deck, setDeck] = useState<MemoryCard[]>(() => createDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<CardKey[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const allDone = matchedKeys.length === cardKeys.length;
  const score = useMemo(() => Math.max(100 - moves * 4, 20), [moves]);

  const restart = () => {
    setDeck(createDeck());
    setFlipped([]);
    setMatchedKeys([]);
    setMoves(0);
    setLocked(false);
  };

  const revealCard = (index: number) => {
    if (locked || flipped.includes(index)) {
      return;
    }

    const card = deck[index];
    if (matchedKeys.includes(card.key)) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length < 2) {
      return;
    }

    setMoves((value) => value + 1);
    const [firstIndex, secondIndex] = nextFlipped;
    const firstCard = deck[firstIndex];
    const secondCard = deck[secondIndex];

    if (firstCard.key === secondCard.key) {
      setMatchedKeys((keys) => [...keys, firstCard.key]);
      setFlipped([]);
      return;
    }

    setLocked(true);
    window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);
    }, 700);
  };

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">Memory Nimira</p>
          <h2 className="mt-1 text-2xl">Retrouvez les paires de modules</h2>
          <p className="mt-1 text-sm text-white/75">
            Associez les symboles Nimira pour débloquer un badge de précision.
          </p>
        </div>
        <button type="button" onClick={restart} className="cta-secondary inline-flex items-center gap-2">
          <RotateCcw size={16} />
          Rejouer
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {deck.map((card, index) => {
          const isVisible = flipped.includes(index) || matchedKeys.includes(card.key);
          const Icon = iconByKey[card.key];
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => revealCard(index)}
              disabled={locked || matchedKeys.includes(card.key)}
              className={`aspect-square rounded-xl border transition ${
                isVisible
                  ? "border-[#00F5C4]/70 bg-[#00F5C4]/10 text-[#00F5C4]"
                  : "border-white/15 bg-[#100f2f] text-white/30 hover:bg-[#17153f]"
              }`}
            >
              <span className="inline-flex h-full w-full items-center justify-center">
                {isVisible ? <Icon size={24} /> : <span className="text-xs tracking-[0.18em]">NIM</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-white/80">
        <span>Coups: {moves}</span>
        <span>Paires trouvées: {matchedKeys.length} / {cardKeys.length}</span>
        <span>Score: {score}</span>
      </div>

      {allDone ? (
        <p className="mt-3 rounded-xl border border-[#FFD166]/40 bg-[#FFD166]/10 p-3 text-sm text-[#FFD166]">
          Bravo, vous avez restauré les signaux de Nimira.
        </p>
      ) : null}
    </section>
  );
}
