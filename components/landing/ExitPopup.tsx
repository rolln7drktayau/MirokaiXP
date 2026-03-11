"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { VisitorProfile } from "@/types/profile";

import { useExitIntent } from "@/hooks/useExitIntent";

interface ExitPopupProps {
  profile: VisitorProfile;
}

export function ExitPopup({ profile }: ExitPopupProps) {
  const { isTriggered, dismiss } = useExitIntent(true);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-5">
        <h3 className="text-xl">Avant de partir...</h3>
        <p className="mt-2 text-sm text-white/75">
          Recevez nos cas d&apos;usage, actualités robotique et contenus Nimira.
        </p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="votre@email.com"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
          />
          <label className="flex items-center gap-2 text-xs text-white/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="h-4 w-4 rounded border-white/40 bg-transparent"
            />
            J&apos;accepte de recevoir les emails de préparation et d&apos;actualités.
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!consent || status === "saving"}
              className="cta-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "saving" ? "Envoi..." : "Recevoir les infos"}
            </button>
            <button type="button" onClick={dismiss} className="cta-secondary">
              Fermer
            </button>
          </div>
          {status === "success" ? <p className="text-xs text-green-300">Inscription confirmée.</p> : null}
          {status === "error" ? <p className="text-xs text-red-300">Erreur, réessayez.</p> : null}
        </form>
      </div>
    </div>
  );
}
