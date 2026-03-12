"use client";

import { useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { trackEvent } from "@/lib/analytics";
import type { VisitorProfile } from "@/types/profile";

interface ContactSectionProps {
  profile: VisitorProfile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);

  const copy = {
    fr: {
      title: "Contactez-nous",
      intro: "Laissez vos informations et notre équipe vous recontacte rapidement.",
      name: "Nom",
      email: "Mail",
      phone: "Numéro de téléphone",
      sector: "Secteur d'activité",
      submit: "Envoyer ma demande",
      sending: "Envoi...",
      success: "Message envoyé. Notre équipe vous répond très vite.",
      error: "Erreur lors de l'envoi. Merci de réessayer.",
    },
    en: {
      title: "Contact us",
      intro: "Leave your details and our team will get back to you quickly.",
      name: "Name",
      email: "Email",
      phone: "Phone number",
      sector: "Business sector",
      submit: "Send my request",
      sending: "Sending...",
      success: "Message sent. Our team will reply shortly.",
      error: "Sending failed. Please try again.",
    },
  } as const;

  const t = copy[locale];

  const handleStart = () => {
    if (started) {
      return;
    }
    setStarted(true);
    trackEvent("form_started", { profile, source: "contact_section" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          sector: formData.get("sector"),
          profile,
        }),
      });

      if (!response.ok) {
        throw new Error("contact_error");
      }

      trackEvent("form_submitted", { profile, source: "contact_section" });
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-wrap py-10" id="contacts">
      <div className="glass-panel rounded-3xl p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl">{t.title}</h2>
        <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/78" : "text-white/78"}`}>{t.intro}</p>

        <form onSubmit={handleSubmit} onFocus={handleStart} className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            <span className={isLight ? "text-[#202020]/80" : "text-white/80"}>{t.name}</span>
            <input
              name="fullName"
              required
              className={`rounded-xl border px-3 py-2 outline-none transition focus:border-[#53B3FF] ${
                isLight
                  ? "border-[#202020]/20 bg-white text-[#202020]"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            />
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className={isLight ? "text-[#202020]/80" : "text-white/80"}>{t.email}</span>
            <input
              name="email"
              type="email"
              required
              className={`rounded-xl border px-3 py-2 outline-none transition focus:border-[#53B3FF] ${
                isLight
                  ? "border-[#202020]/20 bg-white text-[#202020]"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            />
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className={isLight ? "text-[#202020]/80" : "text-white/80"}>{t.phone}</span>
            <input
              name="phone"
              type="tel"
              required
              className={`rounded-xl border px-3 py-2 outline-none transition focus:border-[#53B3FF] ${
                isLight
                  ? "border-[#202020]/20 bg-white text-[#202020]"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            />
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className={isLight ? "text-[#202020]/80" : "text-white/80"}>{t.sector}</span>
            <input
              name="sector"
              required
              className={`rounded-xl border px-3 py-2 outline-none transition focus:border-[#53B3FF] ${
                isLight
                  ? "border-[#202020]/20 bg-white text-[#202020]"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            />
          </label>

          <button type="submit" className="cta-primary sm:col-span-2">
            {status === "sending" ? t.sending : t.submit}
          </button>

          {status === "success" ? (
            <p className="text-xs text-[#06D6A0] sm:col-span-2">{t.success}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-xs text-[#EF476F] sm:col-span-2">{t.error}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
