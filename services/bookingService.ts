import { addMinutes, addDays, setHours, setMinutes } from "date-fns";

import type { BookingSlot } from "@/types/booking";
import type { VisitorProfile } from "@/types/profile";

const SLOT_DURATION_MINUTES = 45;
const START_HOURS = [10, 12, 14, 16, 18];

const buildSlot = (
  dayOffset: number,
  hour: number,
  audience: BookingSlot["audience"],
  index: number,
): BookingSlot => {
  const dayDate = addDays(new Date(), dayOffset);
  const startsAtDate = setMinutes(setHours(dayDate, hour), 0);
  const endsAtDate = addMinutes(startsAtDate, SLOT_DURATION_MINUTES);
  const seatsTotal = audience === "business" ? 20 : 12;
  const seatsRemaining =
    audience === "business" ? Math.max(4, 16 - dayOffset - index) : Math.max(1, 9 - dayOffset - index);

  return {
    id: `${audience}-${dayOffset}-${hour}`,
    startsAt: startsAtDate.toISOString(),
    endsAt: endsAtDate.toISOString(),
    seatsTotal,
    seatsRemaining,
    audience,
    language: hour % 4 === 0 ? "en" : "fr",
  };
};

export const getUpcomingSlots = (): BookingSlot[] => {
  const slots: BookingSlot[] = [];

  for (let day = 0; day < 6; day += 1) {
    START_HOURS.forEach((hour, index) => {
      slots.push(buildSlot(day, hour, index % 2 === 0 ? "public" : "business", index));
    });
  }

  return slots;
};

export const getRemainingSlotCount = (profile: VisitorProfile): number => {
  const slots = getUpcomingSlots();
  const targetAudience = profile === "b2b" ? "business" : "public";

  return slots
    .filter((slot) => slot.audience === targetAudience)
    .reduce((total, slot) => total + slot.seatsRemaining, 0);
};

export const getDashboardMetrics = () => {
  const slots = getUpcomingSlots();
  const booked = slots.reduce((acc, slot) => acc + (slot.seatsTotal - slot.seatsRemaining), 0);
  const total = slots.reduce((acc, slot) => acc + slot.seatsTotal, 0);

  return {
    fillRate: Number(((booked / total) * 100).toFixed(1)),
    b2bShare: 42,
    b2cShare: 58,
    emailsCaptured: 327,
    funnel: [
      { step: "page_view", value: 1000 },
      { step: "profile_selected", value: 730 },
      { step: "form_started", value: 510 },
      { step: "form_submitted", value: 302 },
      { step: "eventbrite_redirect", value: 274 },
      { step: "email_captured", value: 201 },
    ],
    utmBreakdown: [
      { source: "organic", value: 44 },
      { source: "linkedin", value: 21 },
      { source: "newsletter", value: 17 },
      { source: "partnerships", value: 18 },
    ],
  };
};
