interface BadgeProps {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning";
}

export function Badge({ children, tone = "default" }: BadgeProps) {
  const toneClass =
    tone === "success"
      ? "border-[#06D6A0]/50 bg-[#06D6A0]/15 text-[#06D6A0]"
      : tone === "warning"
        ? "border-[#FFD166]/50 bg-[#FFD166]/15 text-[#FFD166]"
        : "border-white/25 bg-white/10 text-white/85";

  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-xs ${toneClass}`}>{children}</span>
  );
}
