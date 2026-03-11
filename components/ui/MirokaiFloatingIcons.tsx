"use client";

import {
  Bot,
  Cpu,
  HeartHandshake,
  MessageCircleHeart,
  Orbit,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
  duration: number;
  delay: number;
  icon: LucideIcon;
  burst: number;
  popping: boolean;
};

const colors = ["#00F5C4", "#7B2FFF", "#53B3FF", "#FFD166", "#FF6B9D"] as const;
const icons: LucideIcon[] = [Bot, Sparkles, Orbit, HeartHandshake, Cpu, MessageCircleHeart];
const bubbleCount = 26;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const createBubble = (id: number): Bubble => ({
  id,
  x: randomBetween(4, 95),
  y: randomBetween(8, 92),
  size: Math.round(randomBetween(24, 54)),
  color: colors[id % colors.length],
  drift: randomBetween(-10, 10),
  duration: randomBetween(4.2, 8.6),
  delay: randomBetween(0, 1.1),
  icon: icons[id % icons.length],
  burst: 0,
  popping: false,
});

export function MirokaiFloatingIcons() {
  const prefersReducedMotion = useReducedMotion();
  const [bubbles, setBubbles] = useState<Bubble[]>(
    () => Array.from({ length: bubbleCount }, (_, index) => createBubble(index)),
  );

  const pulseBubble = (id: number) => {
    setBubbles((current) =>
      current.map((bubble) =>
        bubble.id === id ? { ...bubble, burst: bubble.burst + 1 } : bubble,
      ),
    );
  };

  const popBubble = (id: number) => {
    setBubbles((current) =>
      current.map((bubble) =>
        bubble.id === id ? { ...bubble, popping: true, burst: bubble.burst + 1 } : bubble,
      ),
    );

    window.setTimeout(() => {
      setBubbles((current) =>
        current.map((bubble) =>
          bubble.id === id
            ? {
                ...createBubble(id),
                burst: bubble.burst + 1,
              }
            : bubble,
        ),
      );
    }, 260);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {bubbles.map((bubble) => {
        const Icon = bubble.icon;

        return (
          <motion.button
            key={bubble.id}
            type="button"
            tabIndex={-1}
            onMouseEnter={() => pulseBubble(bubble.id)}
            onClick={() => popBubble(bubble.id)}
            className="pointer-events-auto absolute grid place-items-center rounded-full border border-white/25 backdrop-blur-sm"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background:
                `radial-gradient(circle at 35% 30%, ${bubble.color}66 0%, ${bubble.color}22 35%, transparent 72%)`,
              boxShadow: `0 0 26px ${bubble.color}44`,
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              prefersReducedMotion
                ? {
                    opacity: bubble.popping ? 0.22 : 0.64,
                    scale: bubble.popping ? 0.42 : 1,
                  }
                : {
                    opacity: bubble.popping ? [0.9, 0] : [0.3, 0.94, 0.3],
                    scale: bubble.popping ? [1, 0.18] : [1, 1.11, 1],
                    x: bubble.popping ? [0, bubble.drift * 0.2] : [0, bubble.drift, 0],
                    y: bubble.popping ? [0, -10] : [0, -12, 0],
                    rotate: bubble.popping ? [0, 10] : [0, 8, -8, 0],
                  }
            }
            transition={{
              duration: bubble.popping ? 0.24 : bubble.duration,
              delay: bubble.delay,
              repeat: bubble.popping ? 0 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.22,
              boxShadow: `0 0 32px ${bubble.color}88`,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={Math.max(12, bubble.size * 0.36)} className="text-white/85" />
            <motion.span
              key={bubble.burst}
              className="absolute inset-0 rounded-full border border-white/45"
              initial={{ scale: 0.45, opacity: 0.9 }}
              animate={{ scale: 1.38, opacity: 0 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
