"use client";

import { format } from "date-fns";
import { useState } from "react";

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
  const [showPrivateForm, setShowPrivateForm] = useState(false);
  const [privateStatus, setPrivateStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
        <h2 className="text-2xl sm:text-3xl">Réservez votre créneau</h2>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full border border-[#53B3FF]/60 bg-[#53B3FF]/10 px-2 py-1">Grand public</span>
          <span className="rounded-full border border-[#F5C842]/60 bg-[#F5C842]/10 px-2 py-1">Groupe entreprise</span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedDays.map((day) => (
          <article key={day} className="glass-panel rounded-2xl p-4">
            <p className="text-sm text-white/75">
              {new Date(day).toLocaleDateString("fr-FR", {
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
                    {slot.seatsRemaining} / {slot.seatsTotal} places restantes
                  </p>
                  <button
                    type="button"
                    disabled={slot.seatsRemaining <= 0}
                    onClick={() => onBookSlot(slot)}
                    className="mt-3 w-full rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Réserver ce créneau
                  </button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 glass-panel rounded-2xl p-4">
        <p className="text-sm text-white/80">
          Groupe 8+ personnes ? Demandez un créneau privé avec accompagnement dédié.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onRequestPrivateSlot} className="cta-secondary">
            Passer en mode entreprise
          </button>
          <button type="button" onClick={() => setShowPrivateForm((open) => !open)} className="cta-primary">
            {showPrivateForm ? "Masquer le formulaire privé" : "Demander un créneau privé"}
          </button>
        </div>

        {showPrivateForm ? (
          <form onSubmit={onPrivateSubmit} className="mt-4 grid gap-2 rounded-2xl border border-white/15 p-3 sm:grid-cols-2">
            <input
              name="company"
              required
              placeholder="Entreprise"
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="contactName"
              required
              placeholder="Contact"
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
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
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <input
              name="note"
              placeholder="Contrainte ou contexte"
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#53B3FF]"
            />
            <button type="submit" className="cta-primary sm:col-span-2">
              {privateStatus === "sending" ? "Envoi..." : "Envoyer la demande privée"}
            </button>
            {privateStatus === "success" ? (
              <p className="text-xs text-green-300 sm:col-span-2">Demande envoyée, notre équipe revient vers vous.</p>
            ) : null}
            {privateStatus === "error" ? (
              <p className="text-xs text-red-300 sm:col-span-2">Erreur lors de l&apos;envoi, merci de réessayer.</p>
            ) : null}
          </form>
        ) : null}
      </div>

      {profile !== "b2b" ? (
        <p className="mt-3 text-xs text-white/60">
          Astuce: sélectionnez le profil &quot;Je représente une entreprise&quot; pour activer le code promo
          B2B2026.
        </p>
      ) : null}
    </section>
  );
}
