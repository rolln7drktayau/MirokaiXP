"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { VisitorProfile } from "@/types/profile";

import { SlotCounter } from "./SlotCounter";

interface HeroProps {
  profile: VisitorProfile;
  remainingSlots: number;
  onPrimaryCTA: () => void;
}

const profileHeadline: Record<VisitorProfile, string> = {
  solo: "Vivez l'aventure Mirokaï en solo",
  team: "Faites vivre une sortie d'équipe mémorable",
  b2b: "Découvrez comment Mirokaï peut transformer votre entreprise",
};

export function Hero({ profile, remainingSlots, onPrimaryCTA }: HeroProps) {
  return (
    <section className="section-wrap relative overflow-hidden pb-16 pt-10 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(83,179,255,0.34),transparent_60%)]" />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="space-y-6"
        >
          <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/75">
            Mirokaï Experience 2026 • Paris
          </p>

          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
            {profileHeadline[profile]}
          </h1>

          <p className="max-w-xl text-base text-white/80 sm:text-lg">
            Venez vivre une expérience immersive où robotique sociale, IA émotionnelle et narration Nimira
            convergent pour créer un moment à fort impact humain.
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onPrimaryCTA} className="cta-primary">
              Réserver un créneau
            </button>
            <Link href="/audioguide" className="cta-secondary">
              Explorer l&apos;audioguide immersif
            </Link>
          </div>

          <SlotCounter remaining={remainingSlots} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="glass-panel relative overflow-hidden rounded-3xl p-5 sm:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,200,66,0.22),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(83,179,255,0.2),transparent_35%)]" />
          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Mirokaï en situation réelle</p>
            <div className="h-56 rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#15113a_0%,#0c0b1f_60%,#180e33_100%)] p-4 sm:h-64">
              <div className="flex h-full flex-col justify-between">
                <p className="max-w-xs text-sm text-white/75">
                  Animation immersive: accueil, interaction vocale et guidance contextuelle en environnement
                  entreprise.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["Accueil", "Onboarding", "Retail"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-center text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-white/65">
              Direction artistique Nimira: bleu nuit, lumière dorée et ambiance narrative.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
