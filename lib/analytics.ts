"use client";

import type { AnalyticsEventInput, AnalyticsEventName } from "@/types/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type AnalyticsPayload = Omit<AnalyticsEventInput, "event"> & {
  [key: string]: string | number | boolean | undefined;
};

export const trackEvent = (
  event: AnalyticsEventName,
  payload?: AnalyticsPayload,
): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...payload,
  });

  const body = JSON.stringify({ event, ...payload });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
};

export const trackPageView = (path: string): void => {
  trackEvent("page_view", { value: path });
};
