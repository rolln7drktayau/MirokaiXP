"use client";

import { useEffect, useMemo, useState } from "react";

import { DEFAULT_UTM, buildEventbriteURL } from "@/lib/eventbrite";
import type { B2BFormData, VisitorProfile } from "@/types/profile";

const STORAGE_KEY = "mirokai_utm";

type UTMData = Record<string, string>;

const normalizeUTM = (utm: Partial<UTMData>): UTMData => ({
  ...DEFAULT_UTM,
  ...Object.fromEntries(
    Object.entries(utm).filter((entry): entry is [string, string] => Boolean(entry[0] && entry[1])),
  ),
});

export const useUTM = () => {
  const [utm, setUtm] = useState<UTMData>(normalizeUTM({}));

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fromURL = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([key]) => key.startsWith("utm_")),
    );
    const fromStorage = window.sessionStorage.getItem(STORAGE_KEY);
    const parsedStorage = fromStorage ? (JSON.parse(fromStorage) as UTMData) : {};
    const merged = normalizeUTM({ ...parsedStorage, ...fromURL });

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setUtm(merged);
  }, []);

  const buildURL = useMemo(
    () =>
      (baseURL: string, profile: VisitorProfile, formData?: Partial<B2BFormData>) =>
        buildEventbriteURL(baseURL, {
          profile,
          formData,
          utm,
        }),
    [utm],
  );

  return { utm, buildURL };
};
