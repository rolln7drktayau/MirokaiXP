"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AppLocale, AppTheme } from "@/types/preferences";

const THEME_KEY = "mirokai_theme";
const LOCALE_KEY = "mirokai_locale";

interface AppPreferencesContextValue {
  locale: AppLocale;
  theme: AppTheme;
  hydrated: boolean;
  setLocale: (locale: AppLocale) => void;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

const isTheme = (value: string | null): value is AppTheme =>
  value === "nimira-dark" || value === "nimira-light";
const isLocale = (value: string | null): value is AppLocale => value === "fr" || value === "en";

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>("nimira-dark");
  const [locale, setLocaleState] = useState<AppLocale>("fr");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    const savedLocale = window.localStorage.getItem(LOCALE_KEY);

    // Default theme is night unless a previous explicit preference exists.
    if (isTheme(savedTheme)) {
      setThemeState(savedTheme);
    } else {
      setThemeState("nimira-dark");
    }

    if (isLocale(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      const browserLocale = window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
      setLocaleState(browserLocale);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale, hydrated]);

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      locale,
      theme,
      hydrated,
      setLocale: (nextLocale) => setLocaleState(nextLocale),
      setTheme: (nextTheme) => setThemeState(nextTheme),
      toggleTheme: () =>
        setThemeState((current) =>
          current === "nimira-dark" ? "nimira-light" : "nimira-dark",
        ),
    }),
    [hydrated, locale, theme],
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }
  return context;
};
