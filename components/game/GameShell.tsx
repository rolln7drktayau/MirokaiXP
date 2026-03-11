import Link from "next/link";

import { NavBackHome } from "@/components/ui/NavBackHome";

import { NimiraQuiz } from "./NimiraQuiz";

export function GameShell() {
  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <NavBackHome backLabel="Page précédente" homeLabel="Accueil" />

        <header className="glass-panel rounded-3xl p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#00F5C4]">Bonus engagement</p>
          <h1 className="mt-2 text-3xl">Mission Nimira</h1>
          <p className="mt-2 text-sm text-white/75">
            Aidez Miroki à reconstituer les données de mission en répondant au quiz de visite.
          </p>
        </header>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/game" className="rounded-2xl border border-[#00F5C4]/45 bg-[#00F5C4]/10 px-4 py-3 text-sm text-[#00F5C4]">
            Quiz narratif
          </Link>
          <Link href="/game/memory" className="rounded-2xl border border-[#FFD166]/45 bg-[#FFD166]/10 px-4 py-3 text-sm text-[#FFD166]">
            Memory Nimira
          </Link>
        </div>

        <NimiraQuiz />
        <div className="flex flex-wrap gap-2">
          <Link href="/experience" className="cta-secondary">
            Retour à l&apos;expérience
          </Link>
          <Link href="/game/memory" className="cta-secondary">
            Jouer au Memory
          </Link>
          <Link href="/" className="cta-primary">
            Revenir à la landing
          </Link>
        </div>
      </div>
    </main>
  );
}
