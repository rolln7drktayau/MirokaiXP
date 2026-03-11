"use client";

import { motion } from "framer-motion";
import { Brain, Gamepad2 } from "lucide-react";
import Link from "next/link";

export function ArcadeSection() {
  return (
    <section className="section-wrap py-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(145deg,#110f32_0%,#151343_55%,#0c0b21_100%)] p-5 sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(0,245,196,0.18),transparent_42%),radial-gradient(circle_at_85%_75%,rgba(255,209,102,0.16),transparent_45%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Espace jeux Nimira</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Jouez depuis l&apos;écran d&apos;accueil</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/75">
            Deux mini-jeux narratifs pour prolonger la visite: quiz de mission et memory visuel.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-white/20 bg-white/5 p-4">
              <div className="inline-flex rounded-full border border-[#00F5C4]/40 bg-[#00F5C4]/10 p-2">
                <Brain size={18} className="text-[#00F5C4]" />
              </div>
              <h3 className="mt-3 text-lg">Mission Nimira</h3>
              <p className="mt-1 text-sm text-white/75">Quiz narratif autour des modules de visite.</p>
              <Link href="/game" className="cta-secondary mt-4">
                Lancer le quiz
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-white/20 bg-white/5 p-4">
              <div className="inline-flex rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 p-2">
                <Gamepad2 size={18} className="text-[#FFD166]" />
              </div>
              <h3 className="mt-3 text-lg">Memory Nimira</h3>
              <p className="mt-1 text-sm text-white/75">Associez les symboles Nimira en un minimum de coups.</p>
              <Link href="/game/memory" className="cta-secondary mt-4">
                Lancer le memory
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
