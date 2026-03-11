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
import { useEffect, useRef, useState } from "react";

type ViewportTier = "mobile" | "tablet" | "desktop";

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

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const resolveTier = (width: number): ViewportTier => {
  if (width < 640) {
    return "mobile";
  }
  if (width < 1024) {
    return "tablet";
  }
  return "desktop";
};

const getTierConfig = (tier: ViewportTier) => {
  if (tier === "mobile") {
    return {
      count: 8,
      minSize: 16,
      maxSize: 26,
      maxDrift: 5,
      minDuration: 5.8,
      maxDuration: 8.4,
      draggable: false,
      opacity: 0.28,
    };
  }

  if (tier === "tablet") {
    return {
      count: 14,
      minSize: 18,
      maxSize: 32,
      maxDrift: 7,
      minDuration: 5.1,
      maxDuration: 8.0,
      draggable: false,
      opacity: 0.34,
    };
  }

  return {
    count: 18,
    minSize: 20,
    maxSize: 38,
    maxDrift: 9,
    minDuration: 4.8,
    maxDuration: 7.4,
    draggable: true,
    opacity: 0.4,
  };
};

const createEdgePosition = () => {
  const mode = Math.random();

  // Keep bubbles mostly near edges so they stay playful without masking content.
  if (mode < 0.7) {
    const onLeft = Math.random() < 0.5;
    return {
      x: onLeft ? randomBetween(2, 18) : randomBetween(82, 98),
      y: randomBetween(6, 95),
    };
  }

  const onTop = Math.random() < 0.5;
  return {
    x: randomBetween(6, 94),
    y: onTop ? randomBetween(4, 20) : randomBetween(82, 97),
  };
};

const createBubble = (id: number, tier: ViewportTier): Bubble => {
  const config = getTierConfig(tier);
  const position = createEdgePosition();

  return {
    id,
    x: position.x,
    y: position.y,
    size: Math.round(randomBetween(config.minSize, config.maxSize)),
    color: colors[id % colors.length],
    drift: randomBetween(-config.maxDrift, config.maxDrift),
    duration: randomBetween(config.minDuration, config.maxDuration),
    delay: randomBetween(0, 1.2),
    icon: icons[id % icons.length],
    burst: 0,
    popping: false,
  };
};

export function MirokaiFloatingIcons() {
  const prefersReducedMotion = useReducedMotion();
  const boundsRef = useRef<HTMLDivElement | null>(null);
  const [tier, setTier] = useState<ViewportTier>("desktop");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const refreshTier = () => {
      setTier(resolveTier(window.innerWidth));
    };

    refreshTier();
    window.addEventListener("resize", refreshTier);
    return () => window.removeEventListener("resize", refreshTier);
  }, []);

  useEffect(() => {
    const config = getTierConfig(tier);
    setBubbles(Array.from({ length: config.count }, (_, index) => createBubble(index, tier)));
  }, [tier]);

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
          bubble.id === id ? { ...createBubble(id, tier), burst: bubble.burst + 1 } : bubble,
        ),
      );
    }, 260);
  };

  const config = getTierConfig(tier);

  return (
    <div ref={boundsRef} className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {bubbles.map((bubble) => {
        const Icon = bubble.icon;

        return (
          <motion.button
            key={bubble.id}
            type="button"
            tabIndex={-1}
            onMouseEnter={() => pulseBubble(bubble.id)}
            onClick={() => popBubble(bubble.id)}
            className={`pointer-events-auto absolute grid place-items-center rounded-full border border-white/20 backdrop-blur-sm ${
              config.draggable ? "cursor-grab active:cursor-grabbing touch-none" : ""
            }`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background:
                `radial-gradient(circle at 35% 30%, ${bubble.color}55 0%, ${bubble.color}20 35%, transparent 72%)`,
              boxShadow: `0 0 18px ${bubble.color}33`,
            }}
            drag={config.draggable}
            dragConstraints={boundsRef}
            dragElastic={0.28}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              prefersReducedMotion
                ? {
                    opacity: bubble.popping ? 0.15 : config.opacity,
                    scale: bubble.popping ? 0.42 : 1,
                  }
                : {
                    opacity: bubble.popping ? [config.opacity, 0] : [0.12, config.opacity, 0.12],
                    scale: bubble.popping ? [1, 0.18] : [1, 1.08, 1],
                    x: bubble.popping ? [0, bubble.drift * 0.2] : [0, bubble.drift, 0],
                    y: bubble.popping ? [0, -8] : [0, -10, 0],
                    rotate: bubble.popping ? [0, 10] : [0, 6, -6, 0],
                  }
            }
            transition={{
              duration: bubble.popping ? 0.24 : bubble.duration,
              delay: bubble.delay,
              repeat: bubble.popping ? 0 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={
              config.draggable
                ? {
                    scale: 1.14,
                    boxShadow: `0 0 24px ${bubble.color}66`,
                  }
                : undefined
            }
            whileTap={{ scale: 0.92 }}
          >
            <Icon size={Math.max(10, bubble.size * 0.34)} className="text-white/70" />
            <motion.span
              key={bubble.burst}
              className="absolute inset-0 rounded-full border border-white/35"
              initial={{ scale: 0.45, opacity: 0.75 }}
              animate={{ scale: 1.28, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
