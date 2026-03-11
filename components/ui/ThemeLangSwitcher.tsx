"use client";

import { Languages, MoonStar, Sparkles, SunMedium } from "lucide-react";
import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const copy = {
  fr: {
    language: "Langue",
    theme: "Thème",
    dark: "Nuit",
    light: "Aurore",
  },
  en: {
    language: "Language",
    theme: "Theme",
    dark: "Night",
    light: "Dawn",
  },
};

export function ThemeLangSwitcher() {
  const { locale, theme, setLocale, toggleTheme } = useAppPreferences();
  const t = copy[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed right-3 top-3 z-[70] max-w-[calc(100vw-1.5rem)] rounded-2xl border border-white/20 bg-black/30 p-2 backdrop-blur-xl sm:right-4 sm:top-4"
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/75">
        <Sparkles size={12} className="text-[#FFD166]" />
        Mirokaï controls
      </div>

      <div className="mt-2 grid gap-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs text-white/70">
            <Languages size={14} />
            {t.language}
          </span>
          <div className="ml-auto inline-flex rounded-full border border-white/20 bg-white/5 p-0.5">
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`rounded-full px-2.5 py-1 text-xs ${
                locale === "fr" ? "bg-[#00F5C4]/20 text-[#00F5C4]" : "text-white/70"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 text-xs ${
                locale === "en" ? "bg-[#00F5C4]/20 text-[#00F5C4]" : "text-white/70"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs text-white/70">
            {theme === "nimira-dark" ? <MoonStar size={14} /> : <SunMedium size={14} />}
            {t.theme}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/85"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -25, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "nimira-dark" ? (
                <MoonStar size={14} className="text-[#53B3FF]" />
              ) : (
                <SunMedium size={14} className="text-[#FFD166]" />
              )}
            </motion.span>
            {theme === "nimira-dark" ? t.dark : t.light}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
