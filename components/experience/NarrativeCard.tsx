"use client";

import type { Module } from "@/types/module";

interface NarrativeCardProps {
  module: Module;
}

export function NarrativeCard({ module }: NarrativeCardProps) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-white/65">Narration Nimira</p>
      <p className="mt-2 text-sm text-white/85">{module.description}</p>
      <p className="mt-3 rounded-xl border border-white/10 bg-[#120f2e] p-3 text-sm text-[#F0EEF8]">
        {module.mirokaiPrompt}
      </p>
    </article>
  );
}
