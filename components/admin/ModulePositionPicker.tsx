"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ModulePositionPickerProps {
  value: { x: number; y: number };
  onChange: (position: { x: number; y: number }) => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function ModulePositionPicker({ value, onChange }: ModulePositionPickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);

      onChange({
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      });
    },
    [onChange],
  );

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      event.preventDefault();
      updateFromPointer(event.clientX, event.clientY);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging, updateFromPointer]);

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.15em] text-white/70">
        Position du module (drag & drop)
      </p>
      <div
        ref={containerRef}
        className="relative h-48 overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(160deg,#0f0a2e_0%,#120f35_65%,#0d0b22_100%)]"
        onPointerDown={(event) => {
          updateFromPointer(event.clientX, event.clientY);
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(123,47,255,0.2),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(0,245,196,0.16),transparent_40%)]" />

        <button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragging(true);
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            isDragging
              ? "cursor-grabbing border-[#FFD166]/70 bg-[#FFD166]/20 text-[#FFD166]"
              : "cursor-grab border-[#00F5C4]/60 bg-[#00F5C4]/15 text-[#00F5C4]"
          }`}
          style={{ left: `${value.x}%`, top: `${value.y}%` }}
        >
          Module
        </button>
      </div>
      <p className="text-xs text-white/75">
        X: {value.x.toFixed(2)}% • Y: {value.y.toFixed(2)}%
      </p>
    </div>
  );
}
