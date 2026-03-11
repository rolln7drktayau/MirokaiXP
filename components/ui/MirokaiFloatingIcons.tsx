"use client";

import { Bot, HeartHandshake, Orbit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const floaters = [
  { Icon: Bot, color: "text-[#53B3FF]", side: "left", top: "18%", delay: 0.1, duration: 5.2 },
  { Icon: Sparkles, color: "text-[#FFD166]", side: "right", top: "28%", delay: 0.6, duration: 4.6 },
  { Icon: Orbit, color: "text-[#00F5C4]", side: "left", top: "56%", delay: 0.25, duration: 5.8 },
  { Icon: HeartHandshake, color: "text-[#FF6B9D]", side: "right", top: "66%", delay: 0.8, duration: 6.1 },
];

export function MirokaiFloatingIcons() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden sm:block" aria-hidden>
      {floaters.map(({ Icon, color, side, top, delay, duration }, index) => (
        <motion.div
          key={`${side}-${top}-${index}`}
          className={`absolute ${side === "left" ? "left-3 lg:left-6" : "right-3 lg:right-6"}`}
          style={{ top }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.25, 0.85, 0.25],
            y: [0, -12, 0],
            x: [0, side === "left" ? 6 : -6, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="rounded-full border border-white/15 bg-black/20 p-2 backdrop-blur">
            <Icon size={16} className={color} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
