"use client";

import { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg border border-white/20 bg-[#0f0d25] px-2 py-1 text-xs text-white/85">
          {content}
        </span>
      ) : null}
    </span>
  );
}
