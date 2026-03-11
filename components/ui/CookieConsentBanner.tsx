"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

const CONSENT_KEY = "mirokai_cookie_consent";
const ACCEPTED_VALUE = "accepted";

export function CookieConsentBanner() {
  const { locale } = useAppPreferences();
  const [visible, setVisible] = useState(false);

  const copy = {
    fr: {
      title: "Gestion des cookies",
      description:
        "Nous utilisons des cookies pour mesurer l'audience et améliorer votre expérience Mirokaï.",
      accept: "Accepter",
      reject: "Refuser",
      policy: "Politique cookies",
      privacy: "Confidentialité",
    },
    en: {
      title: "Cookie settings",
      description: "We use cookies to measure traffic and improve your Mirokaï experience.",
      accept: "Accept",
      reject: "Reject",
      policy: "Cookie policy",
      privacy: "Privacy",
    },
  } as const;

  const t = copy[locale];

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);
    setVisible(consent !== ACCEPTED_VALUE);
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_KEY, ACCEPTED_VALUE);
    setVisible(false);
  };

  const rejectCookies = () => {
    window.localStorage.removeItem(CONSENT_KEY);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <aside className="fixed bottom-[5.8rem] left-1/2 z-[80] w-[min(95vw,42rem)] -translate-x-1/2 rounded-2xl border border-white/20 bg-[#1f2030]/92 p-4 shadow-[0_18px_34px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-4">
      <h2 className="text-sm font-semibold text-white/95">{t.title}</h2>
      <p className="mt-1 text-sm text-white/80">{t.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={acceptCookies} className="cta-primary">
          {t.accept}
        </button>
        <button type="button" onClick={rejectCookies} className="cta-secondary">
          {t.reject}
        </button>
        <Link
          href="/cookies"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
        >
          {t.policy}
        </Link>
        <Link
          href="/privacy"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
        >
          {t.privacy}
        </Link>
      </div>
    </aside>
  );
}
