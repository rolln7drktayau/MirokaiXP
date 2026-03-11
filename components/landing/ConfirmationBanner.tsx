"use client";

import { useEffect, useState } from "react";

export function ConfirmationBanner() {
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

  const message =
    profile === "b2b"
      ? "Réservation enregistrée. Votre parcours entreprise personnalisé vous sera envoyé."
      : "Réservation confirmée. Préparez-vous pour une immersion Mirokaï.";

  return (
    <div className="section-wrap pt-4">
      <div className="rounded-2xl border border-green-200/30 bg-green-200/10 px-4 py-3 text-sm text-green-100">
        {message}
      </div>
    </div>
  );
}
