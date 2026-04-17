"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { play } from "@/lib/audio";

type Variant = "default" | "hover" | "view" | "drag" | "play" | "hide" | "magnetic";

const LABELS: Record<Variant, string> = {
  default: "",
  hover: "click",
  view: "view",
  drag: "drag",
  play: "play",
  hide: "",
  magnetic: "",
};

type Ripple = { id: number; x: number; y: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [down, setDown] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 360, damping: 34, mass: 0.45 });
  const ry = useSpring(y, { stiffness: 360, damping: 34, mass: 0.45 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || reduceMotion) return;
    setEnabled(true);

    let lastHover: Element | null = null;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, label[for]"
      );
      if (el !== lastHover) {
        if (el && lastHover == null) play("hover");
        lastHover = el;
      }
      if (!el) return setVariant("default");
      const explicit = el.getAttribute("data-cursor");
      if (explicit === "hide") return setVariant("hide");
      if (explicit === "drag") return setVariant("drag");
      if (explicit === "view") return setVariant("view");
      if (explicit === "play") return setVariant("play");
      if (explicit === "magnetic") return setVariant("magnetic");
      return setVariant("hover");
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setDown(true);
      const id = ++rippleId.current;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      play("click");
      window.setTimeout(() => {
        setRipples((r) => r.filter((p) => p.id !== id));
      }, 650);
    };
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ring =
    variant === "hide"
      ? { w: 0, h: 0, r: 0, border: 0, bg: 0, opacity: 0 }
      : variant === "view" || variant === "drag" || variant === "play"
        ? { w: 64, h: 64, r: 32, border: 1, bg: 0.08, opacity: 1 }
        : variant === "hover" || variant === "magnetic"
          ? { w: 48, h: 48, r: 14, border: 1, bg: 0.06, opacity: 1 }
          : { w: 22, h: 22, r: 8, border: 1, bg: 0, opacity: 0.9 };

  const label = LABELS[variant];
  const showDot = variant === "default";
  const pressScale = down ? 0.82 : 1;

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: 99 }}>
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ opacity: 0.55, scale: 0 }}
              animate={{ opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute block rounded-full border border-gold-400/60"
              style={{ left: r.x, top: r.y, width: 80, height: 80, marginLeft: -40, marginTop: -40 }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0"
        style={{ x: rx, y: ry, zIndex: 100 }}
      >
        <motion.div
          animate={{
            width: ring.w,
            height: ring.h,
            borderRadius: ring.r,
            opacity: ring.opacity,
            scale: pressScale,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.4 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            borderWidth: ring.border,
            borderStyle: "solid",
            borderColor: "rgba(242,242,239,0.55)",
            background: "rgba(242,242,239," + ring.bg + ")",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            boxShadow:
              variant === "view" || variant === "drag" || variant === "play"
                ? "0 0 24px rgba(242,242,239,0.18)"
                : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-100"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {variant === "default" && (
            <>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-1.5 bg-gold-300/70" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-1.5 bg-gold-300/70" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 h-1.5 w-px bg-gold-300/70" />
              <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-1.5 w-px bg-gold-300/70" />
            </>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 mix-blend-difference"
        style={{ x, y, zIndex: 101 }}
      >
        <motion.div
          animate={{ scale: showDot ? (down ? 0.6 : 1) : 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 32 }}
          className="-translate-x-1/2 -translate-y-1/2 h-[5px] w-[5px] rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}
