"use client";

import { useEffect, useState } from "react";

export const useExitIntent = (enabled = true) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || isTriggered) {
      return;
    }

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setIsTriggered(true);
      }
    };

    const onTouchEnd = () => {
      if (window.scrollY < 12) {
        setIsTriggered(true);
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, isTriggered]);

  return {
    isTriggered,
    dismiss: () => setIsTriggered(false),
  };
};
