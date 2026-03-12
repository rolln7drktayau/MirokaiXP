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
  const { locale, theme } = useAppPreferences();
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
  const isLight = theme === "nimira-light";

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
        className={`w-full max-w-md rounded-3xl border p-5 shadow-[0_18px_34px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
          isLight
            ? "border-[#202020]/16 bg-[#f8f3ea]/96 text-[#202020]"
            : "border-[#f0eef8]/20 bg-[#1f2030]/92 text-[#f0eef8]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-xl">{t.title}</h3>
        <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/78" : "text-[#f0eef8]/80"}`}>
          {t.intro}
        </p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.placeholder}
            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-[#53B3FF] ${
              isLight
                ? "border-[#202020]/20 bg-white/70 text-[#202020] placeholder:text-[#202020]/45"
                : "border-[#f0eef8]/20 bg-[#111323]/55 text-[#f0eef8] placeholder:text-[#f0eef8]/45"
            }`}
          />
          <label className={`flex items-center gap-2 text-xs ${isLight ? "text-[#202020]/78" : "text-[#f0eef8]/80"}`}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className={`h-4 w-4 rounded bg-transparent ${isLight ? "border-[#202020]/35" : "border-[#f0eef8]/40"}`}
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
