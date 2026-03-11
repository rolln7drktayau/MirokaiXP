"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = totalSteps === 0 ? 0 : Math.round((currentStep / totalSteps) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>Progression</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#53B3FF] to-[#F5C842] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
