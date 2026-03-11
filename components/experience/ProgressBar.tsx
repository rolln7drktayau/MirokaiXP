"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const ratio = Math.round((completed / safeTotal) * 100);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-white/65">
        <span>Progression visite</span>
        <span>{ratio}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#7B2FFF] via-[#00F5C4] to-[#FFD166] transition-all"
          style={{ width: `${ratio}%` }}
        />
      </div>
    </div>
  );
}
