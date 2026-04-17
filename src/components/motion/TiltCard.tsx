"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt degrees
  sheen?: boolean;
};

export function TiltCard({ children, className, max = 8, sheen = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 250, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 250, damping: 20 });
  const sx = useSpring(useTransform(px, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 250, damping: 25 });
  const sy = useSpring(useTransform(py, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 250, damping: 25 });

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      <div className="relative h-full w-full" style={{ transform: "translateZ(0)" }}>
        {children}
        {sheen && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
            style={{
              opacity: 0.5,
              background: useTransform(
                [sx, sy],
                ([x, y]) =>
                  `radial-gradient(220px circle at ${x} ${y}, rgba(245,213,122,0.35), transparent 60%)`
              ),
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
