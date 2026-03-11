"use client";

import type { VisitorProfile } from "@/types/profile";

export type AnalyticsEventName =
  | "page_view"
  | "profile_selected"
  | "form_started"
  | "form_submitted"
  | "eventbrite_redirect"
  | "email_captured";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface AnalyticsPayload {
  profile?: VisitorProfile;
  source?: string;
  step?: string;
  value?: string | number;
  [key: string]: string | number | boolean | undefined;
}

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
};

export const trackPageView = (path: string): void => {
  trackEvent("page_view", { value: path });
};
