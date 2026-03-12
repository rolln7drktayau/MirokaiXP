"use client";

import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { VisitorSegment } from "@/types/profile";

interface MirokaiAvatarProps {
  guide: "miroki" | "miroka";
  prompt: string;
  visitorName?: string;
  visitorSegment?: VisitorSegment;
}

export function MirokaiAvatar({ guide, prompt, visitorName, visitorSegment }: MirokaiAvatarProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const copy = {
    fr: {
      active: "Guide actif",
      hello: "Bonjour",
      b2cLine: "Je vous accompagne module par module avec une narration vivante.",
      b2bLine: "Je vous présente des cas d'usage orientés entreprise et décision.",
    },
    en: {
      active: "Active guide",
      hello: "Hello",
      b2cLine: "I guide you module by module with immersive narrative context.",
      b2bLine: "I focus on enterprise-oriented use cases and decision points.",
    },
  } as const;
  const t = copy[locale];
  const personalLine = visitorSegment === "b2b" ? t.b2bLine : t.b2cLine;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#53B3FF]/50 ${
            isLight ? "bg-[#e9f1ff]" : "bg-[#0f1030]"
          }`}
        >
          <span className="text-xs uppercase tracking-[0.14em]">{guide}</span>
        </motion.div>
        <div>
          <p className={`text-xs uppercase tracking-[0.16em] ${isLight ? "text-[#202020]/65" : "text-white/65"}`}>{t.active}</p>
          <p className="font-medium">{guide === "miroki" ? "Miroki" : "Miroka"}</p>
        </div>
      </div>
      {visitorName ? (
        <p
          className={`mt-3 rounded-xl border p-3 text-sm ${
            isLight ? "border-[#202020]/12 bg-[#f3fbf8] text-[#202020]/86" : "border-[#00F5C4]/35 bg-[#00F5C4]/10 text-[#E7FFF8]"
          }`}
        >
          <span className="font-medium">
            {t.hello} {visitorName}.
          </span>{" "}
          {personalLine}
        </p>
      ) : null}
      <p
        className={`mt-3 rounded-xl border p-3 text-sm ${
          isLight ? "border-[#202020]/12 bg-white/80 text-[#202020]/85" : "border-white/10 bg-white/5 text-white/85"
        }`}
      >
        {prompt}
      </p>
    </div>
  );
}
