"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";

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

const toDayKey = (date: Date) => format(date, "yyyy-MM-dd");
const fromDayKey = (dayKey: string) => {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function BookingCalendar({
  profile,
  slots,
  onBookSlot,
  onRequestPrivateSlot,
}: BookingCalendarProps) {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";
  const [showPrivateForm, setShowPrivateForm] = useState(false);
  const [privateStatus, setPrivateStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const copy = {
    fr: {
      title: "Réservez votre créneau",
      calendarTitle: "Calendrier des disponibilités",
      calendarHint: "Cliquez sur un jour pour afficher les créneaux de réservation.",
      selectDate: "Date sélectionnée",
      noDateSelected: "Sélectionnez une date active dans le calendrier.",
      noSlotsForDate: "Aucun créneau disponible pour ce jour.",
      public: "Grand public",
      business: "Session privée",
      seatsLeft: "places restantes",
      bookSlot: "Réserver ce créneau",
      privateQuestion: "Groupe 8+ personnes ? Demandez un créneau privé avec accompagnement dédié.",
      switchBusiness: "Activer le mode privé",
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
      weekdayLabels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      weekdays: "fr-FR",
    },
    en: {
      title: "Book your slot",
      calendarTitle: "Availability calendar",
      calendarHint: "Click a day to reveal available booking cards.",
      selectDate: "Selected date",
      noDateSelected: "Select an active date in the calendar.",
      noSlotsForDate: "No slots available for this day.",
      public: "Public",
      business: "Private session",
      seatsLeft: "spots left",
      bookSlot: "Book this slot",
      privateQuestion: "Group of 8+ people? Request a private slot with dedicated guidance.",
      switchBusiness: "Enable private mode",
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
      weekdayLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekdays: "en-US",
    },
  } as const;

  const t = copy[locale];

  const grouped = useMemo(
    () =>
      slots.reduce<Record<string, BookingSlot[]>>((acc, slot) => {
        const dayKey = toDayKey(new Date(slot.startsAt));
        acc[dayKey] = acc[dayKey] ?? [];
        acc[dayKey].push(slot);
        return acc;
      }, {}),
    [slots],
  );

  const sortedDays = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  useEffect(() => {
    if (sortedDays.length === 0) {
      setSelectedDay(null);
      return;
    }

    if (!selectedDay || !sortedDays.includes(selectedDay)) {
      setSelectedDay(sortedDays[0]);
    }
  }, [selectedDay, sortedDays]);

  const calendarDays = useMemo(() => {
    if (sortedDays.length === 0) {
      return [];
    }

    const firstSlotDate = fromDayKey(sortedDays[0]);
    const lastSlotDate = fromDayKey(sortedDays[sortedDays.length - 1]);
    const intervalStart = startOfWeek(startOfMonth(firstSlotDate), { weekStartsOn: 1 });
    const intervalEnd = endOfWeek(endOfMonth(lastSlotDate), { weekStartsOn: 1 });

    return eachDayOfInterval({ start: intervalStart, end: intervalEnd });
  }, [sortedDays]);

  const selectedSlots = selectedDay ? grouped[selectedDay] ?? [] : [];
  const activeMonthDate = selectedDay ? fromDayKey(selectedDay) : sortedDays[0] ? fromDayKey(sortedDays[0]) : new Date();

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

      <div className="glass-panel rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-sm uppercase tracking-[0.14em] ${isLight ? "text-[#202020]/75" : "text-white/75"}`}>{t.calendarTitle}</p>
          <p className={`text-sm ${isLight ? "text-[#202020]/75" : "text-white/75"}`}>
            {activeMonthDate.toLocaleDateString(t.weekdays, { month: "long", year: "numeric" })}
          </p>
        </div>
        <p className={`mt-2 text-xs ${isLight ? "text-[#202020]/72" : "text-white/70"}`}>{t.calendarHint}</p>

        <div className={`mt-4 grid grid-cols-7 gap-1.5 text-center text-[11px] uppercase tracking-[0.14em] ${isLight ? "text-[#202020]/65" : "text-white/60"}`}>
          {t.weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {calendarDays.map((day) => {
            const dayKey = toDayKey(day);
            const daySlots = grouped[dayKey] ?? [];
            const hasSlots = daySlots.length > 0;
            const isSelected = selectedDay === dayKey;
            const inActiveMonth = isSameMonth(day, activeMonthDate);
            const selectedClass = isLight
              ? "border-[#F5C842]/70 bg-[#F5C842]/18 text-[#A86A00]"
              : "border-[#F5C842]/70 bg-[#F5C842]/18 text-[#F5C842]";
            const dayClass = isSelected
              ? selectedClass
              : hasSlots
                ? isLight
                  ? "border-[#202020]/18 bg-[#fff8ee] text-[#202020] hover:bg-[#f4ebde]"
                  : "border-white/20 bg-white/5 text-white/85 hover:bg-white/10"
                : isLight
                  ? "border-[#202020]/10 bg-[#ece4d8] text-[#202020]/45"
                  : "border-white/10 bg-white/[0.03] text-white/35";
            const countClass = isLight ? "text-[10px] text-[#202020]/62" : "text-[10px] text-white/65";

            return (
              <button
                key={dayKey}
                type="button"
                disabled={!hasSlots}
                onClick={() => setSelectedDay(dayKey)}
                className={`min-h-[56px] rounded-xl border px-1 py-1 text-center transition ${dayClass} ${inActiveMonth ? "" : "opacity-55"} disabled:cursor-not-allowed`}
              >
                <span className="block text-sm font-medium">{day.getDate()}</span>
                {hasSlots ? <span className={countClass}>{daySlots.length}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className={`text-sm ${isLight ? "text-[#202020]/75" : "text-white/75"}`}>
          {t.selectDate}:{" "}
          {selectedDay
            ? fromDayKey(selectedDay).toLocaleDateString(t.weekdays, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            : t.noDateSelected}
        </p>

        {selectedDay && selectedSlots.length > 0 ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selectedSlots.map((slot) => (
              <div key={slot.id} className={`rounded-xl border p-3 ${slotColors[slot.audience]}`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {format(new Date(slot.startsAt), "HH:mm")} - {format(new Date(slot.endsAt), "HH:mm")}
                  </p>
                  <span className="text-xs uppercase tracking-[0.14em]">{slot.language}</span>
                </div>
                <p className={`mt-1 text-sm ${isLight ? "text-[#202020]/78" : "text-white/75"}`}>
                  {slot.seatsRemaining} / {slot.seatsTotal} {t.seatsLeft}
                </p>
                <button
                  type="button"
                  disabled={slot.seatsRemaining <= 0}
                  onClick={() => onBookSlot(slot)}
                  className={`mt-3 w-full rounded-full border px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    isLight
                      ? "border-[#202020]/18 bg-white hover:bg-[#f4ebde]"
                      : "border-white/20 bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {t.bookSlot}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/72" : "text-white/70"}`}>{t.noSlotsForDate}</p>
        )}
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
