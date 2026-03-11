"use client";

import { format } from "date-fns";
import { useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { BookingSlot } from "@/types/booking";
import type { VisitorProfile } from "@/types/profile";

interface BookingCalendarProps {
  profile: VisitorProfile;
  slots: BookingSlot[];
  onBookSlot: (slot: BookingSlot) => void;
  onRequestPrivateSlot: () => void;
}

const slotColors: Record<BookingSlot["audience"], string> = {
  public: "border-[#53B3FF]/45 bg-[#53B3FF]/10",
  business: "border-[#F5C842]/45 bg-[#F5C842]/10",
};

export function BookingCalendar({
  profile,
  slots,
  onBookSlot,
  onRequestPrivateSlot,
}: BookingCalendarProps) {
  const { locale } = useAppPreferences();
  const [showPrivateForm, setShowPrivateForm] = useState(false);
  const [privateStatus, setPrivateStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const copy = {
    fr: {
      title: "Réservez votre créneau",
      public: "Grand public",
      business: "Groupe entreprise",
      seatsLeft: "places restantes",
      bookSlot: "Réserver ce créneau",
      privateQuestion: "Groupe 8+ personnes ? Demandez un créneau privé avec accompagnement dédié.",
      switchBusiness: "Passer en mode entreprise",
      hidePrivate: "Masquer le formulaire privé",
      showPrivate: "Demander un créneau privé",
      company: "Entreprise",
      contact: "Contact",
      email: "Email",
      preferredDate: "Date préférée",
      note: "Contrainte ou contexte",
      sending: "Envoi...",
      sendPrivate: "Envoyer la demande privée",
      success: "Demande envoyée, notre équipe revient vers vous.",
      error: "Erreur lors de l'envoi, merci de réessayer.",
      tip: "Astuce: sélectionnez le profil \"Je représente une entreprise\" pour activer le code promo B2B2026.",
      weekdays: "fr-FR",
    },
    en: {
      title: "Book your slot",
      public: "Public",
      business: "Business group",
      seatsLeft: "spots left",
      bookSlot: "Book this slot",
      privateQuestion: "Group of 8+ people? Request a private slot with dedicated guidance.",
      switchBusiness: "Switch to business mode",
      hidePrivate: "Hide private form",
      showPrivate: "Request private slot",
      company: "Company",
      contact: "Contact",
      email: "Email",
      preferredDate: "Preferred date",
      note: "Context or constraints",
      sending: "Sending...",
      sendPrivate: "Send private request",
      success: "Request sent, our team will contact you.",
      error: "Sending failed, please try again.",
      tip: "Tip: select the \"I represent a company\" profile to enable promo code B2B2026.",
      weekdays: "en-US",
    },
  } as const;

  const t = copy[locale];

  const grouped = slots.reduce<Record<string, BookingSlot[]>>((acc, slot) => {
    const dayKey = format(new Date(slot.startsAt), "yyyy-MM-dd");
    acc[dayKey] = acc[dayKey] ?? [];
    acc[dayKey].push(slot);
    return acc;
  }, {});

  const sortedDays = Object.keys(grouped).sort();

  const onPrivateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPrivateStatus("sending");

    try {
      const response = await fetch("/api/book-private", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.get("company"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          attendees: Number(formData.get("attendees") ?? 8),
          preferredDate: formData.get("preferredDate"),
          note: formData.get("note"),
        }),
      });

      if (!response.ok) {
        throw new Error("error");
      }

      setPrivateStatus("success");
      event.currentTarget.reset();
    } catch {
      setPrivateStatus("error");
    }
  };

  return (
    <section className="section-wrap py-10" id="booking">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl sm:text-3xl">{t.title}</h2>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full border border-[#53B3FF]/60 bg-[#53B3FF]/10 px-2 py-1">{t.public}</span>
          <span className="rounded-full border border-[#F5C842]/60 bg-[#F5C842]/10 px-2 py-1">{t.business}</span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedDays.map((day) => (
          <article key={day} className="glass-panel rounded-2xl p-4">
            <p className="text-sm text-white/75">
              {new Date(day).toLocaleDateString(t.weekdays, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[day].map((slot) => (
                <div key={slot.id} className={`rounded-xl border p-3 ${slotColors[slot.audience]}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {format(new Date(slot.startsAt), "HH:mm")} - {format(new Date(slot.endsAt), "HH:mm")}
                    </p>
                    <span className="text-xs uppercase tracking-[0.14em]">{slot.language}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/75">
                    {slot.seatsRemaining} / {slot.seatsTotal} {t.seatsLeft}
                  </p>
                  <button
                    type="button"
                    disabled={slot.seatsRemaining <= 0}
                    onClick={() => onBookSlot(slot)}
                    className="mt-3 w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.bookSlot}
                  </button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 glass-panel rounded-2xl p-4">
        <p className="text-sm text-white/80">
          {t.privateQuestion}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onRequestPrivateSlot} className="cta-secondary">
            {t.switchBusiness}
          </button>
          <button type="button" onClick={() => setShowPrivateForm((open) => !open)} className="cta-primary">
            {showPrivateForm ? t.hidePrivate : t.showPrivate}
          </button>
        </div>

        {showPrivateForm ? (
          <form onSubmit={onPrivateSubmit} className="mt-4 grid gap-2 rounded-2xl border border-white/15 p-3 sm:grid-cols-2">
            <input
              name="company"
              required
              placeholder={t.company}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="contactName"
              required
              placeholder={t.contact}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t.email}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="attendees"
              type="number"
              min={8}
              required
              defaultValue={8}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="preferredDate"
              type="date"
              required
              aria-label={t.preferredDate}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="note"
              placeholder={t.note}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <button type="submit" className="cta-primary sm:col-span-2">
              {privateStatus === "sending" ? t.sending : t.sendPrivate}
            </button>
            {privateStatus === "success" ? (
              <p className="text-xs text-green-300 sm:col-span-2">{t.success}</p>
            ) : null}
            {privateStatus === "error" ? (
              <p className="text-xs text-red-300 sm:col-span-2">{t.error}</p>
            ) : null}
          </form>
        ) : null}
      </div>

      {profile !== "b2b" ? (
        <p className="mt-3 text-xs text-white/60">
          {t.tip}
        </p>
      ) : null}
    </section>
  );
}
