"use client";

import { motion } from "framer-motion";
import { Brain, Gamepad2 } from "lucide-react";
import Link from "next/link";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

export function ArcadeSection() {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const copy = {
    fr: {
      eyebrow: "Espace jeux Nimira",
      title: "Jouez depuis l'écran d'accueil",
      intro:
        "Deux mini-jeux narratifs pour prolonger la visite: quiz de mission et memory visuel.",
      quizTitle: "Mission Nimira",
      quizDesc: "Quiz narratif autour des modules de visite.",
      quizCta: "Lancer le quiz",
      memoryTitle: "Memory Nimira",
      memoryDesc: "Associez les symboles Nimira en un minimum de coups.",
      memoryCta: "Lancer le memory",
    },
    en: {
      eyebrow: "Nimira arcade",
      title: "Play directly from the home screen",
      intro: "Two narrative mini-games to extend the visit: mission quiz and visual memory.",
      quizTitle: "Mission Nimira",
      quizDesc: "Narrative quiz around the experience modules.",
      quizCta: "Start quiz",
      memoryTitle: "Nimira Memory",
      memoryDesc: "Match Nimira symbols in as few moves as possible.",
      memoryCta: "Start memory",
    },
  } as const;

  const t = copy[locale];

  return (
    <section className="section-wrap py-8">
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 sm:p-6 ${
          isLight
            ? "border-[#202020]/12 bg-[linear-gradient(145deg,#f8f2e8_0%,#f5ede2_55%,#efe7dc_100%)]"
            : "border-white/15 bg-[linear-gradient(145deg,#110f32_0%,#151343_55%,#0c0b21_100%)]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(0,245,196,0.18),transparent_42%),radial-gradient(circle_at_85%_75%,rgba(255,209,102,0.16),transparent_45%)]" />
        <div className="relative">
          <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#202020]/70" : "text-white/70"}`}>{t.eyebrow}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">{t.title}</h2>
          <p className={`mt-2 max-w-2xl text-sm ${isLight ? "text-[#202020]/78" : "text-white/75"}`}>
            {t.intro}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -3 }}
              className={`rounded-2xl border p-4 ${isLight ? "border-[#202020]/12 bg-white/80" : "border-white/20 bg-white/5"}`}
            >
              <div className="inline-flex rounded-full border border-[#00F5C4]/40 bg-[#00F5C4]/10 p-2">
                <Brain size={18} className="text-[#00F5C4]" />
              </div>
              <h3 className="mt-3 text-lg">{t.quizTitle}</h3>
              <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/78" : "text-white/75"}`}>{t.quizDesc}</p>
              <Link href="/profile?next=/game" className="cta-secondary mt-4">
                {t.quizCta}
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className={`rounded-2xl border p-4 ${isLight ? "border-[#202020]/12 bg-white/80" : "border-white/20 bg-white/5"}`}
            >
              <div className="inline-flex rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 p-2">
                <Gamepad2 size={18} className="text-[#FFD166]" />
              </div>
              <h3 className="mt-3 text-lg">{t.memoryTitle}</h3>
              <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/78" : "text-white/75"}`}>{t.memoryDesc}</p>
              <Link href="/profile?next=/game/memory" className="cta-secondary mt-4">
                {t.memoryCta}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
