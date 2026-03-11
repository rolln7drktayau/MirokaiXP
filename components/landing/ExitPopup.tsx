"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { VisitorProfile } from "@/types/profile";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

import { useExitIntent } from "@/hooks/useExitIntent";

interface ExitPopupProps {
  profile: VisitorProfile;
}

export function ExitPopup({ profile }: ExitPopupProps) {
  const { locale } = useAppPreferences();
  const { isTriggered, dismiss } = useExitIntent(true);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const copy = {
    fr: {
      title: "Avant de partir...",
      intro: "Recevez nos cas d'usage, actualités robotique et contenus Nimira.",
      placeholder: "votre@email.com",
      consent: "J'accepte de recevoir les emails de préparation et d'actualités.",
      send: "Recevoir les infos",
      sending: "Envoi...",
      close: "Fermer",
      success: "Inscription confirmée.",
      error: "Erreur, réessayez.",
    },
    en: {
      title: "Before you leave...",
      intro: "Get our use cases, robotics updates, and Nimira content.",
      placeholder: "your@email.com",
      consent: "I agree to receive preparation and update emails.",
      send: "Get updates",
      sending: "Sending...",
      close: "Close",
      success: "Subscription confirmed.",
      error: "Error, please try again.",
    },
  } as const;

  const t = copy[locale];

  if (!isTriggered) {
    return null;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          profile,
          consent,
          source: "exit_popup",
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      trackEvent("email_captured", { profile, source: "exit_popup" });
      setStatus("success");
      window.setTimeout(() => dismiss(), 1500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="glass-panel w-full max-w-md rounded-3xl p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-xl">{t.title}</h3>
        <p className="mt-2 text-sm text-white/75">
          {t.intro}
        </p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
          />
          <label className="flex items-center gap-2 text-xs text-white/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="h-4 w-4 rounded border-white/40 bg-transparent"
            />
            {t.consent}
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!consent || status === "saving"}
              className="cta-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "saving" ? t.sending : t.send}
            </button>
            <button type="button" onClick={dismiss} className="cta-secondary">
              {t.close}
            </button>
          </div>
          {status === "success" ? <p className="text-xs text-green-300">{t.success}</p> : null}
          {status === "error" ? <p className="text-xs text-red-300">{t.error}</p> : null}
        </form>
      </div>
    </div>
  );
}
