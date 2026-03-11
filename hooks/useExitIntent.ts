"use client";

import { useEffect, useState } from "react";

export const useExitIntent = (enabled = true) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    let isReload = navigationEntry?.type === "reload";

    // Fallback for older browsers.
    if (!navigationEntry && "navigation" in performance) {
      const legacyNavigation = (
        performance as Performance & {
          navigation?: { type?: number };
        }
      ).navigation;
      isReload = legacyNavigation?.type === 1;
    }

    if (isReload) {
      setIsTriggered(true);
    }
  }, [enabled]);

  return {
    isTriggered,
    dismiss: () => setIsTriggered(false),
  };
};
