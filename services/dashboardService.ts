import { getUpcomingSlots } from "./bookingService";
import { listLeads } from "./leadService";
import { listSubscribers } from "./subscriptionService";
import { listAnalyticsEvents } from "./analyticsService";

const DEFAULT_FUNNEL = [
  { step: "page_view", value: 1000 },
  { step: "profile_selected", value: 730 },
  { step: "form_started", value: 510 },
  { step: "form_submitted", value: 302 },
  { step: "eventbrite_redirect", value: 274 },
  { step: "email_captured", value: 201 },
];

const DEFAULT_UTM = [
  { source: "organic", value: 44 },
  { source: "linkedin", value: 21 },
  { source: "newsletter", value: 17 },
  { source: "partnerships", value: 18 },
];

const clampPercentage = (value: number) => Math.max(0, Math.min(100, Number(value.toFixed(1))));

export const getDashboardMetrics = async () => {
  const [leads, subscribers, events] = await Promise.all([
    listLeads(),
    listSubscribers(),
    listAnalyticsEvents(),
  ]);
  const slots = getUpcomingSlots();

  const booked = slots.reduce((acc, slot) => acc + (slot.seatsTotal - slot.seatsRemaining), 0);
  const total = slots.reduce((acc, slot) => acc + slot.seatsTotal, 0);
  const fillRate = total > 0 ? clampPercentage((booked / total) * 100) : 0;

  const b2bCount =
    leads.filter((lead) => lead.profile === "b2b").length +
    subscribers.filter((subscriber) => subscriber.profile === "b2b").length;
  const audienceTotal = Math.max(b2bCount + subscribers.length, 1);
  const b2bShare = clampPercentage((b2bCount / audienceTotal) * 100);
  const b2cShare = clampPercentage(100 - b2bShare);

  const funnelFromEvents = ["page_view", "profile_selected", "form_started", "form_submitted", "eventbrite_redirect", "email_captured"].map(
    (step) => ({
      step,
      value: events.filter((event) => event.event === step).length,
    }),
  );
  const hasTrackedFunnel = funnelFromEvents.some((step) => step.value > 0);

  const utmSourceCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    const source = lead.utm?.utm_source ?? "unknown";
    acc[source] = (acc[source] ?? 0) + 1;
    return acc;
  }, {});
  const utmBreakdown = Object.entries(utmSourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, value]) => ({ source, value }));

  return {
    fillRate,
    b2bShare,
    b2cShare,
    emailsCaptured: subscribers.length,
    funnel: hasTrackedFunnel ? funnelFromEvents : DEFAULT_FUNNEL,
    utmBreakdown: utmBreakdown.length > 0 ? utmBreakdown : DEFAULT_UTM,
  };
};
