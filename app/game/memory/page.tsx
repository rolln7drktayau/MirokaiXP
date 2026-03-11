import Link from "next/link";

import { NimiraMemory } from "@/components/game/NimiraMemory";
import { NavBackHome } from "@/components/ui/NavBackHome";

export default function MemoryGamePage() {
  return (
    <main className="section-wrap py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <NavBackHome backLabel="Page précédente" homeLabel="Accueil" />
        <NimiraMemory />
        <div className="flex flex-wrap gap-2">
          <Link href="/game" className="cta-secondary">
            Aller au Quiz Mission Nimira
          </Link>
          <Link href="/experience" className="cta-primary">
            Retourner à l&apos;expérience
          </Link>
        </div>
      </div>
    </main>
  );
}
