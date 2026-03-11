"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Languages, MoonStar, Sparkles, SunMedium, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const copy = {
  fr: {
    language: "Langue",
    theme: "Theme",
    dark: "Nuit",
    light: "Aurore",
    open: "Controles",
    close: "Fermer",
  },
  en: {
    language: "Language",
    theme: "Theme",
    dark: "Night",
    light: "Dawn",
    open: "Controls",
    close: "Close",
  },
};

function ControlsPanel({
  locale,
  theme,
  setLocale,
  toggleTheme,
  onClose,
  showClose,
}: {
  locale: "fr" | "en";
  theme: "nimira-dark" | "nimira-light";
  setLocale: (locale: "fr" | "en") => void;
  toggleTheme: () => void;
  onClose?: () => void;
  showClose?: boolean;
}) {
  const t = copy[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="rounded-2xl border border-white/20 bg-black/35 p-2 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.12em] text-white/75">
        <span className="inline-flex items-center gap-2">
          <Sparkles size={12} className="text-[#FFD166]" />
          Mirokai controls
        </span>
        {showClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[10px] text-white/80"
          >
            <X size={11} />
            {t.close}
          </button>
        ) : null}
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

export function ThemeLangSwitcher() {
  const { locale, theme, setLocale, toggleTheme } = useAppPreferences();
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [dragBounds, setDragBounds] = useState({ left: -280, right: 0, top: 0, bottom: 560 });
  const dragControls = useDragControls();

  useEffect(() => {
    const syncLayout = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen((prev) => (mobile ? prev : true));

      if (mobile) {
        const margin = 16;
        const bubbleSize = 48;
        setDragBounds({
          left: -(window.innerWidth - bubbleSize - margin * 2),
          right: 0,
          top: 0,
          bottom: Math.max(0, window.innerHeight - bubbleSize - margin * 2),
        });
      }
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);
    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  if (!isMobile) {
    return (
      <div className="fixed right-4 top-4 z-[70] max-w-[calc(100vw-1.5rem)]">
        <ControlsPanel locale={locale} theme={theme} setLocale={setLocale} toggleTheme={toggleTheme} />
      </div>
    );
  }

  return (
    <motion.div
      className="fixed right-4 top-4 z-[70]"
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={dragBounds}
      whileDrag={{ scale: 1.03 }}
    >
      <AnimatePresence>
        {open ? (
          <div className="absolute right-0 top-14 w-[min(19rem,calc(100vw-1.5rem))]">
            <ControlsPanel
              locale={locale}
              theme={theme}
              setLocale={setLocale}
              toggleTheme={toggleTheme}
              onClose={() => setOpen(false)}
              showClose
            />
          </div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onPointerDown={(event) => dragControls.start(event)}
        whileTap={{ scale: 0.94 }}
        className="inline-flex h-12 w-12 touch-none cursor-grab items-center justify-center rounded-full border border-white/25 bg-[#1f2030]/85 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur active:cursor-grabbing"
        aria-label={copy[locale].open}
      >
        {open ? <X size={18} /> : <Sparkles size={18} className="text-[#FFD166]" />}
      </motion.button>
    </motion.div>
  );
}
