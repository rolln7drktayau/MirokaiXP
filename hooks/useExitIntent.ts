"use client";

import { useEffect, useState } from "react";

const EXIT_POPUP_DISMISSED_KEY = "mirokai_exit_popup_dismissed";

export const useExitIntent = (enabled = true) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (window.localStorage.getItem(EXIT_POPUP_DISMISSED_KEY) === "1") {
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
    dismiss: () => {
      window.localStorage.setItem(EXIT_POPUP_DISMISSED_KEY, "1");
      setIsTriggered(false);
    },
  };
};
