"use client";

import { useCallback } from "react";

import { trackEvent } from "@/lib/analytics";
import type { B2BFormData, VisitorProfile } from "@/types/profile";

import { useUTM } from "./useUTM";

export const useEventbrite = (baseURL: string) => {
  const { utm, buildURL } = useUTM();

  const getURL = useCallback(
    (profile: VisitorProfile, formData?: Partial<B2BFormData>) =>
      buildURL(baseURL, profile, formData),
    [baseURL, buildURL],
  );

  const redirectToEventbrite = useCallback(
    (profile: VisitorProfile, formData?: Partial<B2BFormData>) => {
      const url = getURL(profile, formData);
      trackEvent("eventbrite_redirect", {
        profile,
        source: utm.utm_source,
      });
      window.location.href = url;
    },
    [getURL, utm.utm_source],
  );

  return {
    utm,
    getURL,
    redirectToEventbrite,
  };
};
