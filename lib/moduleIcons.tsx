import { BookOpenText, Cpu, HeartHandshake, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ModuleTheme } from "@/types/module";

type ModuleThemeIcon = {
  icon: LucideIcon;
  label: string;
  colorClassName: string;
};

const themeIconMap: Record<ModuleTheme, ModuleThemeIcon> = {
  nimira: {
    icon: Sparkles,
    label: "Nimira",
    colorClassName: "text-[#FFD166]",
  },
  tech: {
    icon: Cpu,
    label: "Tech",
    colorClassName: "text-[#53B3FF]",
  },
  emotion: {
    icon: HeartHandshake,
    label: "Emotion",
    colorClassName: "text-[#FF6B9D]",
  },
  narration: {
    icon: BookOpenText,
    label: "Narration",
    colorClassName: "text-[#00F5C4]",
  },
};

export const getModuleThemeIcon = (theme: ModuleTheme): ModuleThemeIcon => {
  return themeIconMap[theme];
};
