"use client";

import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

export function ConfirmationBanner() {
  const { locale } = useAppPreferences();
  const [status, setStatus] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status"));
    setProfile(params.get("profile"));
  }, []);

  if (status !== "success") {
    return null;
  }

  const messages = {
    fr: {
      b2b: "Réservation enregistrée. Votre parcours entreprise personnalisé vous sera envoyé.",
      default: "Réservation confirmée. Préparez-vous pour une immersion Mirokaï.",
    },
    en: {
      b2b: "Booking saved. Your personalized business journey will be sent to you.",
      default: "Booking confirmed. Get ready for a Mirokaï immersion.",
    },
  } as const;

  const message = profile === "b2b" ? messages[locale].b2b : messages[locale].default;

  return (
    <div className="section-wrap pt-4">
      <div className="rounded-2xl border border-green-200/30 bg-green-200/10 px-4 py-3 text-sm text-green-100">
        {message}
      </div>
    </div>
  );
}
